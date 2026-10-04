// Brings a session's terminal to the front on Windows: the Windows Terminal window and tab titled
// with its name, or else the window its process tree leads to. The decisions are the pure rules
// in ../terminal; this file only asks Windows and acts.
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { clipboard } from 'electron'
import type { TerminalOutcome } from '../../shared/types'
import { findWindowOwner, pickWindowTab, type ProcessInfo, type TerminalWindow } from '../terminal'

const SCRIPT_TIMEOUT_MS = 10_000

interface Pending {
  end: string
  out: string
  resolve: (out: string) => void
  reject: (err: Error) => void
  timer: NodeJS.Timeout
}

/**
 * One PowerShell kept open for the app's lifetime. Starting PowerShell costs ~270ms and Windows'
 * process queries are slow until warm, so a fresh one per click took ~3s; a warm one answers in a
 * fraction of that. Scripts run one at a time, each sent as one base64 line.
 */
class PowerShellHost {
  private child?: ChildProcessWithoutNullStreams
  private pending?: Pending
  private queue: Promise<unknown> = Promise.resolve()
  private runs = 0

  run(script: string): Promise<string> {
    const next = this.queue.then(() => this.send(script))
    this.queue = next.catch(() => undefined)
    return next
  }

  /** Starts PowerShell ahead of a likely request and runs `prelude`, so even the first is quick. */
  warm(prelude: string): void {
    if (!this.child) void this.run(prelude).catch(() => undefined)
  }

  close(): void {
    this.stop(this.child, new Error('PowerShell host closed'))
  }

  /** Kills `child` (only if it is still the current one) and fails what it was running. */
  private stop(child: ChildProcessWithoutNullStreams | undefined, err: Error): void {
    if (!child || child !== this.child) return
    this.child = undefined
    child.kill()
    const pending = this.pending
    this.pending = undefined
    if (pending) {
      clearTimeout(pending.timer)
      pending.reject(err)
    }
  }

  private start(): ChildProcessWithoutNullStreams {
    if (this.child) return this.child
    const child = spawn('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command', '-'], {
      windowsHide: true,
    })
    this.child = child
    child.stdout.setEncoding('utf8') // a glyph split across chunks must not turn into U+FFFD
    child.stdout.on('data', (chunk: string) => this.onOutput(chunk))
    child.stderr.resume() // nobody reads it, but an undrained pipe would block PowerShell
    const fail = (err: Error) => this.stop(child, err)
    child.on('error', fail) // PowerShell missing or blocked by policy
    child.stdin.on('error', fail) // the pipe broke under a write
    child.on('exit', () => fail(new Error('PowerShell exited')))
    child.stdin.write('[Console]::OutputEncoding = [Text.Encoding]::UTF8\n')
    return child
  }

  private onOutput(chunk: string): void {
    const pending = this.pending
    if (!pending) return
    pending.out += chunk
    const at = pending.out.indexOf(pending.end)
    if (at < 0) return
    this.pending = undefined
    clearTimeout(pending.timer)
    pending.resolve(pending.out.slice(0, at))
  }

  private send(script: string): Promise<string> {
    const child = this.start()
    const end = `<<bat-signal-end-${++this.runs}>>`
    const encoded = Buffer.from(script, 'utf8').toString('base64')
    return new Promise((resolve, reject) => {
      // A stuck script takes its own host with it; the next request starts afresh.
      const timer = setTimeout(
        () => this.stop(child, new Error('PowerShell did not answer in time')),
        SCRIPT_TIMEOUT_MS,
      )
      this.pending = { end, out: '', resolve, reject, timer }
      child.stdin.write(
        `try { iex ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${encoded}'))) | Out-String -Width 4096 } catch { "PS-ERROR: $($_.Exception.Message)" }; '${end}'\n`,
      )
    })
  }
}

const host = new PowerShellHost()

/**
 * Compiled once per host: a process table straight from the kernel, and every visible titled
 * top-level window with its process. WMI took ~0.5s per question even when warm, and
 * MainWindowHandle knows only one window per process; these take milliseconds and see them all.
 */
const PRELUDE = [
  "$ErrorActionPreference = 'SilentlyContinue'",
  "if (-not ('BatSignal.Native' -as [type])) {",
  'Add-Type -TypeDefinition @"',
  'using System; using System.Runtime.InteropServices; using System.Text;',
  'namespace BatSignal { public static class Native {',
  '  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)] struct Entry {',
  '    public uint size, usage, pid; public IntPtr heap; public uint module, threads, ppid;',
  '    public int priority; public uint flags;',
  '    [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)] public string exe; }',
  '  delegate bool EnumProc(IntPtr hwnd, IntPtr lparam);',
  '  [DllImport("kernel32.dll")] static extern IntPtr CreateToolhelp32Snapshot(uint flags, uint pid);',
  '  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] static extern bool Process32FirstW(IntPtr snap, ref Entry e);',
  '  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)] static extern bool Process32NextW(IntPtr snap, ref Entry e);',
  '  [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr h);',
  '  [DllImport("user32.dll")] static extern bool EnumWindows(EnumProc proc, IntPtr lparam);',
  '  [DllImport("user32.dll")] static extern bool IsWindowVisible(IntPtr hwnd);',
  '  [DllImport("user32.dll")] static extern int GetWindowTextLength(IntPtr hwnd);',
  '  [DllImport("user32.dll")] static extern uint GetWindowThreadProcessId(IntPtr hwnd, out uint pid);',
  '  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);',
  '  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);',
  '  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);',
  '  [DllImport("user32.dll")] public static extern bool IsWindow(IntPtr h);',
  '  [DllImport("user32.dll")] public static extern void keybd_event(byte vk, byte scan, uint flags, UIntPtr extra);',
  '  public static string Processes() {',
  '    var snap = CreateToolhelp32Snapshot(2, 0); var e = new Entry(); e.size = (uint)Marshal.SizeOf(e);',
  '    var sb = new StringBuilder();',
  "    if (Process32FirstW(snap, ref e)) do { sb.Append(e.pid).Append('\\t').Append(e.ppid).Append('\\t').Append(e.exe).Append('\\n'); } while (Process32NextW(snap, ref e));",
  '    CloseHandle(snap); return sb.ToString(); }',
  '  public static string Windows() {',
  '    var sb = new StringBuilder();',
  '    EnumWindows((h, l) => { if (IsWindowVisible(h) && GetWindowTextLength(h) > 0) { uint pid; GetWindowThreadProcessId(h, out pid);',
  "      sb.Append(h.ToInt64()).Append('\\t').Append(pid).Append('\\n'); } return true; }, IntPtr.Zero);",
  '    return sb.ToString(); } } }',
  '"@',
  '}',
  'Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes',
  '$tabType = New-Object System.Windows.Automation.PropertyCondition(' +
    '[System.Windows.Automation.AutomationElement]::ControlTypeProperty, ' +
    '[System.Windows.Automation.ControlType]::TabItem)',
  'function Tabs($handle) { ' +
    '[System.Windows.Automation.AutomationElement]::FromHandle([IntPtr][long]$handle).FindAll(' +
    '[System.Windows.Automation.TreeScope]::Descendants, $tabType) }',
].join('\n')

/**
 * The session's line of ancestors (up to the first with a window), every Windows Terminal window
 * with its tab titles, and the handle of each process's first window.
 */
const surveyScript = (pid: number) =>
  [
    PRELUDE,
    '$table = @{}',
    'foreach ($line in [BatSignal.Native]::Processes() -split "`n") { $f = $line -split "`t"; if ($f.Count -eq 3) { $table[[int]$f[0]] = $f } }',
    '$firstWindow = @{}',
    '$windows = @()',
    'foreach ($line in [BatSignal.Native]::Windows() -split "`n") { $f = $line -split "`t"; if ($f.Count -eq 2) {',
    // ConvertTo-Json only takes string keys.
    '  $wpid = [int]$f[1]; if (-not $firstWindow.ContainsKey([string]$wpid)) { $firstWindow[[string]$wpid] = [long]$f[0] }',
    '  if ($table.ContainsKey($wpid) -and $table[$wpid][2] -eq "WindowsTerminal.exe") {',
    '    $windows += [pscustomobject]@{ handle = [long]$f[0]; pid = $wpid; titles = @(Tabs $f[0] | ForEach-Object { $_.Current.Name }) } } } }',
    '$processes = @()',
    `$id = ${pid}`,
    'for ($i = 0; $i -lt 16 -and $table.ContainsKey($id); $i++) {',
    '  $f = $table[$id]',
    '  $processes += [pscustomobject]@{ pid = $id; ppid = [int]$f[1]; name = [string]$f[2]; hasWindow = $firstWindow.ContainsKey([string]$id) }',
    '  if ($firstWindow.ContainsKey([string]$id)) { break }',
    '  $id = [int]$f[1]',
    '}',
    '[pscustomobject]@{ processes = $processes; windows = $windows; firstWindow = $firstWindow } | ConvertTo-Json -Depth 5 -Compress',
  ].join('\n')

/** Restores window `handle` if minimized, brings it to the front, then selects tab `tab` (or none). */
const focusScript = (handle: number, tab: number) =>
  [
    PRELUDE,
    `$handle = [IntPtr][long]${handle}`,
    "if (-not [BatSignal.Native]::IsWindow($handle)) { 'gone' } else {",
    'if ([BatSignal.Native]::IsIconic($handle)) { [void][BatSignal.Native]::ShowWindow($handle, 9) }',
    // A tap of Alt lets a background process take the foreground (Windows' focus-stealing guard).
    '[BatSignal.Native]::keybd_event(0x12, 0, 0, [UIntPtr]::Zero)',
    '[void][BatSignal.Native]::SetForegroundWindow($handle)',
    '[BatSignal.Native]::keybd_event(0x12, 0, 2, [UIntPtr]::Zero)',
    ...(tab >= 0
      ? [
          `$tab = @(Tabs ${handle})[${tab}]`,
          'if ($tab) { $tab.GetCurrentPattern([System.Windows.Automation.SelectionItemPattern]::Pattern).Select() }',
        ]
      : []),
    "'focused' }",
  ].join('\n')

/** PowerShell 5.1's ConvertTo-Json writes a one-item array as the bare item. */
const list = <T>(raw: T | T[] | undefined): T[] => (raw === undefined ? [] : Array.isArray(raw) ? raw : [raw])

interface Survey {
  processes: ProcessInfo | ProcessInfo[]
  windows: (Omit<TerminalWindow, 'titles'> & { titles: string | string[] }) | TerminalWindow[]
  firstWindow: Record<string, number>
}

/** Which window to raise (and tab to select) for a session, from what Windows reported. */
function target(
  survey: Survey,
  session: { pid: number; name?: string },
): { handle: number; tab: number } | undefined {
  const windows = list(survey.windows).map((w) => ({ ...w, titles: list(w.titles) }))
  // The tab titled with the session's name wins: it also covers a terminal started from the Start
  // menu on Windows 11, whose shell descends from explorer, not from Windows Terminal.
  const tab = pickWindowTab(windows, session.name)
  if (tab) return { handle: tab.handle, tab: tab.tab }
  const owner = findWindowOwner(list(survey.processes), session.pid)
  const handle = owner === undefined ? undefined : survey.firstWindow[String(owner)]
  return handle === undefined ? undefined : { handle, tab: -1 }
}

/** Starts the PowerShell host before a request (the pointer reached a terminal button). */
export const warmTerminal = (): void => host.warm(PRELUDE)
/** Stops the PowerShell host (the app is quitting). */
export const closeTerminalHost = (): void => host.close()

/** Brings the terminal of a session to the front, or copies the command that resumes it. */
export async function goToTerminal(session: {
  pid: number
  name?: string
  sessionId: string
}): Promise<TerminalOutcome> {
  const copy = (): TerminalOutcome => {
    clipboard.writeText(`claude --resume ${session.sessionId}`)
    return 'copied'
  }
  try {
    if (session.pid <= 0) return copy()
    const found = target(JSON.parse(await host.run(surveyScript(session.pid))) as Survey, session)
    if (!found) return copy()
    const result = await host.run(focusScript(found.handle, found.tab))
    return result.includes('focused') ? 'focused' : copy()
  } catch (err) {
    console.warn('[bat-signal] could not reach the terminal:', err)
    return copy()
  }
}
