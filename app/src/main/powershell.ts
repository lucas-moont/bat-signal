// One PowerShell kept open for the app's lifetime, for the questions only Windows can answer
// (which window is a session's terminal, whether Windows wants quiet). Scripts carry what they
// need (each Add-Type guarded), so any of them can be the first the host runs.
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'

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
  /** Preludes already run in the current PowerShell: each user warms its own, once. */
  private warmed = new Set<string>()

  run(script: string): Promise<string> {
    const next = this.queue.then(() => this.send(script))
    this.queue = next.catch(() => undefined)
    return next
  }

  /**
   * Starts PowerShell ahead of a likely request and runs `prelude` in it, so even the first is
   * quick; once per PowerShell, whoever started it.
   */
  warm(prelude: string): void {
    if (this.child && this.warmed.has(prelude)) return
    this.warmed.add(prelude)
    void this.run(prelude).catch(() => this.warmed.delete(prelude))
  }

  close(): void {
    this.stop(this.child, new Error('PowerShell host closed'))
  }

  /** Kills `child` (only if it is still the current one) and fails what it was running. */
  private stop(child: ChildProcessWithoutNullStreams | undefined, err: Error): void {
    if (!child || child !== this.child) return
    this.child = undefined
    this.warmed.clear()
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

/** The one PowerShell the app keeps: the terminal button and the quiet check share it. */
export const powershell = new PowerShellHost()
