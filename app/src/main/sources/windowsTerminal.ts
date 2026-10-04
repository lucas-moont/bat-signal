// Brings a session's terminal to the front on Windows: the window that hosts it and, in Windows
// Terminal, the tab titled with its name. The decisions are the pure rules in ../terminal.
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { clipboard } from 'electron'
import type { TerminalOutcome } from '../../shared/types'
import { findWindowOwner, pickTab, type ProcessInfo } from '../terminal'

const SCRIPT_TIMEOUT_MS = 10_000

/**
 * One PowerShell kept open for the app's lifetime. Starting PowerShell costs ~270ms and Windows'
 * process queries are slow until warm, so a fresh one per click took ~3-4s; a warm one answers in
 * a fraction of that. Scripts run one at a time, each sent as one base64 line.
 */
class PowerShellHost {
  private child?: ChildProcessWithoutNullStreams
  private queue: Promise<unknown> = Promise.resolve()
  private runs = 0

  run(script: string): Promise<string> {
    const next = this.queue.then(() => this.send(script))
    this.queue = next.catch(() => undefined)
    return next
  }

  /** Starts PowerShell ahead of a likely request and runs `prelude`, so even the first one is quick. */
  warm(prelude: string): void {
    if (this.child && this.child.exitCode === null) return
    void this.run(prelude).catch(() => undefined)
  }

  close(): void {
    this.child?.kill()
    this.child = undefined
  }

  private start(): ChildProcessWithoutNullStreams {
    if (this.child && this.child.exitCode === null) return this.child
    const child = spawn('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', '-'], {
      windowsHide: true,
    })
    child.stdin.write('[Console]::OutputEncoding = [Text.Encoding]::UTF8\n')
    child.on('exit', () => {
      if (this.child === child) this.child = undefined
    })
    this.child = child
    return child
  }

  private send(script: string): Promise<string> {
    const child = this.start()
    const end = `<<bat-signal-end-${++this.runs}>>`
    const encoded = Buffer.from(script, 'utf8').toString('base64')
    return new Promise((resolve, reject) => {
      let out = ''
      const timer = setTimeout(() => {
        cleanup()
        this.close() // a stuck script takes the host with it; the next request starts afresh
        reject(new Error('PowerShell did not answer in time'))
      }, SCRIPT_TIMEOUT_MS)
      const onData = (chunk: Buffer) => {
        out += chunk.toString('utf8')
        const at = out.indexOf(end)
        if (at < 0) return
        cleanup()
        resolve(out.slice(0, at))
      }
      const cleanup = () => {
        clearTimeout(timer)
        child.stdout.off('data', onData)
      }
      child.stdout.on('data', onData)
      child.stdin.write(
        `try { iex ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded}'))) | Out-String -Width 4096 } catch {}; '${end}'\n`,
      )
    })
  }
}

const host = new PowerShellHost()

/** Starts the PowerShell host before a request (the pointer reached a terminal button). */
export const warmTerminal = (): void => host.warm(PRELUDE)
/** Stops the PowerShell host (the app is quitting). */
export const closeTerminalHost = (): void => host.close()

const UIA = [
  'Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes',
  '$tabType = New-Object System.Windows.Automation.PropertyCondition(' +
    '[System.Windows.Automation.AutomationElement]::ControlTypeProperty, ' +
    '[System.Windows.Automation.ControlType]::TabItem)',
  'function Tabs($handle) { ' +
    '[System.Windows.Automation.AutomationElement]::FromHandle($handle).FindAll(' +
    '[System.Windows.Automation.TreeScope]::Descendants, $tabType) }',
].join('\n')

/**
 * Compiled once per host: a process table straight from the kernel (pid, parent, name). WMI took
 * ~0.5s per question even when warm; this takes milliseconds.
 */
const PRELUDE = [
  "if (-not ('BatSignal.Procs' -as [type])) {",
  'Add-Type -TypeDefinition @"',
  'using System; using System.Runtime.InteropServices; using System.Text;',
  'namespace BatSignal { public static class Procs {',
  '  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)] struct Entry {',
  '    public uint size, usage, pid; public IntPtr heap; public uint module, threads, ppid;',
  '    public int priority; public uint flags;',
  '    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)] public string exe; }',
  '  [DllImport("kernel32.dll")] static extern IntPtr CreateToolhelp32Snapshot(uint flags, uint pid);',
  '  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] static extern bool Process32FirstW(IntPtr snap, ref Entry e);',
  '  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] static extern bool Process32NextW(IntPtr snap, ref Entry e);',
  '  [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr h);',
  '  public static string Table() {',
  '    var snap = CreateToolhelp32Snapshot(2, 0); var e = new Entry(); e.size = (uint)Marshal.SizeOf(e);',
  '    var sb = new StringBuilder();',
  "    if (Process32FirstW(snap, ref e)) do { sb.Append(e.pid).Append('\\t').Append(e.ppid).Append('\\t').Append(e.exe).Append('\\n'); } while (Process32NextW(snap, ref e));",
  '    CloseHandle(snap); return sb.ToString(); } } }',
  '"@',
  '}',
].join('\n')

/**
 * The session's line of ancestors (up to the first with a window), plus the tab titles of a
 * Windows Terminal on that line.
 */
const surveyScript = (pid: number) =>
  [
    "$ErrorActionPreference = 'SilentlyContinue'",
    PRELUDE,
    '$windows = @{}',
    'Get-Process | Where-Object { $_.MainWindowHandle -ne 0 } | ForEach-Object { $windows[$_.Id] = $_.MainWindowHandle }',
    '$table = @{}',
    'foreach ($line in [BatSignal.Procs]::Table() -split "`n") { $f = $line -split "`t"; if ($f.Count -eq 3) { $table[[int]$f[0]] = $f } }',
    '$processes = @()',
    `$id = ${pid}`,
    'for ($i = 0; $i -lt 16 -and $table.ContainsKey($id); $i++) {',
    '  $f = $table[$id]',
    '  $processes += [pscustomobject]@{ pid = $id; ppid = [int]$f[1]; name = [string]$f[2]; hasWindow = $windows.ContainsKey($id) }',
    '  if ($windows.ContainsKey($id)) { break }',
    '  $id = [int]$f[1]',
    '}',
    UIA,
    '$tabs = @{}',
    '$terminal = $processes | Where-Object { $_.hasWindow -and $_.name -eq "WindowsTerminal.exe" } | Select-Object -First 1',
    'if ($terminal) { $tabs[[string]$terminal.pid] = @(Tabs $windows[$terminal.pid] | ForEach-Object { $_.Current.Name }) }',
    '[pscustomobject]@{ processes = $processes; tabs = $tabs } | ConvertTo-Json -Depth 4 -Compress',
  ].join('\n')

/** Restores the window if minimized, brings it to the front, then selects tab `tab` (or none). */
const focusScript = (pid: number, tab: number) =>
  [
    "$ErrorActionPreference = 'SilentlyContinue'",
    "if (-not ('BatSignal.Win' -as [type])) {",
    'Add-Type -Namespace BatSignal -Name Win -MemberDefinition @"',
    '[DllImport("user32.dll")] public static extern bool SetForegroundWindow(System.IntPtr h);',
    '[DllImport("user32.dll")] public static extern bool ShowWindow(System.IntPtr h, int cmd);',
    '[DllImport("user32.dll")] public static extern bool IsIconic(System.IntPtr h);',
    '[DllImport("user32.dll")] public static extern void keybd_event(byte vk, byte scan, uint flags, System.UIntPtr extra);',
    '"@',
    '}',
    `$handle = (Get-Process -Id ${pid}).MainWindowHandle`,
    "if (-not $handle -or $handle -eq 0) { 'gone' } else {",
    'if ([BatSignal.Win]::IsIconic($handle)) { [void][BatSignal.Win]::ShowWindow($handle, 9) }',
    // A tap of Alt lets a background process take the foreground (Windows' focus-stealing guard).
    '[BatSignal.Win]::keybd_event(0x12, 0, 0, [System.UIntPtr]::Zero)',
    '[void][BatSignal.Win]::SetForegroundWindow($handle)',
    '[BatSignal.Win]::keybd_event(0x12, 0, 2, [System.UIntPtr]::Zero)',
    ...(tab >= 0
      ? [
          UIA,
          `$tab = @(Tabs $handle)[${tab}]`,
          'if ($tab) { $tab.GetCurrentPattern([System.Windows.Automation.SelectionItemPattern]::Pattern).Select() }',
        ]
      : []),
    "'focused' }",
  ].join('\n')

interface Survey {
  processes: ProcessInfo[]
  tabs: Record<string, string[] | string>
}

/** Brings the terminal of the session running as `pid` to the front, or copies how to resume it. */
export async function goToTerminal(session: {
  pid: number
  name?: string
  sessionId: string
}): Promise<TerminalOutcome> {
  const copy = (): TerminalOutcome => {
    clipboard.writeText(`claude --resume ${session.sessionId}`)
    return 'copied'
  }
  if (session.pid <= 0) return copy()
  try {
    const survey = JSON.parse(await host.run(surveyScript(session.pid))) as Survey
    const owner = findWindowOwner(survey.processes, session.pid)
    if (owner === undefined) return copy()
    // ConvertTo-Json turns a one-item array into a bare string.
    const raw = survey.tabs[String(owner)]
    const titles = raw === undefined ? [] : Array.isArray(raw) ? raw : [raw]
    const result = await host.run(focusScript(owner, pickTab(titles, session.name) ?? -1))
    return result.includes('focused') ? 'focused' : copy()
  } catch (err) {
    console.warn('[bat-signal] could not reach the terminal:', err)
    return copy()
  }
}
