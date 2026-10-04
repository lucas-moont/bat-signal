import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { ProcessProbe } from './sessionRegistry'

const run = promisify(execFile)

/**
 * ProcessProbe backed by the real OS. Start times are looked up once per pid,
 * with one PowerShell call per batch, and cached for as long as the pid lives.
 */
export function createWindowsProbe(): ProcessProbe {
  const cache = new Map<number, Promise<string | null>>()

  const isRunning = (pid: number): boolean => {
    try {
      process.kill(pid, 0)
      return true
    } catch (err) {
      // EPERM: the process exists but belongs to someone else.
      return (err as NodeJS.ErrnoException).code === 'EPERM'
    }
  }

  async function lookup(pids: number[]): Promise<Map<number, string>> {
    const script =
      `Get-Process -Id ${pids.join(',')} -ErrorAction SilentlyContinue | ` +
      `ForEach-Object { "$($_.Id) $($_.StartTime.ToFileTimeUtc())" }`
    const { stdout } = await run('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', script], {
      windowsHide: true,
      timeout: 10_000,
    })
    const found = new Map<number, string>()
    for (const line of stdout.split(/\r?\n/)) {
      const [pid, start] = line.trim().split(' ')
      if (pid && start) found.set(Number(pid), start)
    }
    return found
  }

  return {
    isRunning(pid) {
      const running = isRunning(pid)
      if (!running) cache.delete(pid) // the pid may be reused later
      return running
    },

    async startTimes(pids) {
      const missing = pids.filter((pid) => Number.isInteger(pid) && !cache.has(pid))
      if (missing.length) {
        // Store the in-flight promise so overlapping callers share one PowerShell run.
        const batch = lookup(missing)
        for (const pid of missing) {
          const one = batch.then((found) => found.get(pid) ?? null)
          one.catch(() => cache.delete(pid)) // failed lookup: retry on the next call
          cache.set(pid, one)
        }
      }
      const entries = await Promise.all(
        pids.map(async (pid) => [pid, await (cache.get(pid) ?? null)?.catch(() => null)] as const),
      )
      return new Map(entries.map(([pid, start]) => [pid, start ?? null]))
    },
  }
}
