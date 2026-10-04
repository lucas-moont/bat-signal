import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { ProcessProbe } from './sessionRegistry'

const run = promisify(execFile)

/**
 * ProcessProbe backed by the real OS. Start times are fetched once per pid
 * (one PowerShell call for the whole batch) and cached while the pid lives.
 */
export function createWindowsProbe(): ProcessProbe & { prefetch(pids: number[]): Promise<void> } {
  const cache = new Map<number, string | null>()

  const isRunning = (pid: number): boolean => {
    try {
      process.kill(pid, 0)
      return true
    } catch (err) {
      // EPERM: the process exists but belongs to someone else.
      return (err as NodeJS.ErrnoException).code === 'EPERM'
    }
  }

  async function prefetch(pids: number[]): Promise<void> {
    const missing = pids.filter((pid) => !cache.has(pid) && Number.isInteger(pid))
    if (!missing.length) return
    const script =
      `Get-Process -Id ${missing.join(',')} -ErrorAction SilentlyContinue | ` +
      `ForEach-Object { "$($_.Id) $($_.StartTime.ToFileTimeUtc())" }`
    const stdout = await run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], {
      windowsHide: true,
      timeout: 10_000,
    }).then(
      (r) => r.stdout,
      () => null,
    )
    if (stdout === null) return // try again on the next refresh
    const found = new Map<number, string>()
    for (const line of stdout.split(/\r?\n/)) {
      const [pid, start] = line.trim().split(' ')
      if (pid && start) found.set(Number(pid), start)
    }
    for (const pid of missing) cache.set(pid, found.get(pid) ?? null)
  }

  return {
    isRunning(pid) {
      const running = isRunning(pid)
      if (!running) cache.delete(pid)
      return running
    },
    async startTime(pid) {
      await prefetch([pid])
      return cache.get(pid) ?? null
    },
    prefetch,
  }
}
