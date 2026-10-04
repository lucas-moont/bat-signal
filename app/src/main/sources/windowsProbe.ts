import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { ProcessProbe } from './sessionRegistry'

const execFileAsync = promisify(execFile)

const POWERSHELL_TIMEOUT_MS = 10_000
/** "Not found / not accessible" answers are re-checked after this long. */
const NOT_FOUND_TTL_MS = 60_000

interface CachedStart {
  start: Promise<string | null>
  expiresAt: number
}

/**
 * ProcessProbe backed by the real OS. Start times are looked up with one PowerShell
 * call per batch and cached while the pid keeps being asked about.
 */
export function createWindowsProbe(): ProcessProbe {
  const cache = new Map<number, CachedStart>()

  const pidExists = (pid: number): boolean => {
    try {
      process.kill(pid, 0)
      return true
    } catch (err) {
      // EPERM: the process exists but belongs to someone else.
      return (err as NodeJS.ErrnoException).code === 'EPERM'
    }
  }

  async function lookup(pids: number[]): Promise<Map<number, string>> {
    // One try/catch per pid: a single protected process (StartTime: access denied)
    // must not fail the whole batch.
    const script =
      `foreach ($id in @(${pids.join(',')})) { try { $p = Get-Process -Id $id -ErrorAction Stop; ` +
      `"$id $($p.StartTime.ToFileTimeUtc())" } catch {} }`
    const { stdout } = await execFileAsync(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', script],
      {
        windowsHide: true,
        timeout: POWERSHELL_TIMEOUT_MS,
      },
    )
    const found = new Map<number, string>()
    for (const line of stdout.split(/\r?\n/)) {
      const [pid, start] = line.trim().split(' ')
      if (pid && start) found.set(Number(pid), start)
    }
    return found
  }

  return {
    isRunning(pid) {
      const running = pidExists(pid)
      if (!running) cache.delete(pid) // the pid may be reused later
      return running
    },

    /** Rejects if PowerShell itself fails, so callers can keep their last known state. */
    async startTimes(pids) {
      const now = Date.now()
      const wanted = new Set(pids)
      // Forget pids nobody asks about any more: their session file is gone, and
      // the pid could come back later as a different process.
      for (const pid of cache.keys()) if (!wanted.has(pid)) cache.delete(pid)

      const missing = pids.filter((pid) => {
        const cached = cache.get(pid)
        return Number.isInteger(pid) && (!cached || cached.expiresAt <= now)
      })
      if (missing.length) {
        // Store the in-flight promise so overlapping callers share one PowerShell run.
        const batch = lookup(missing)
        batch.catch(() => missing.forEach((pid) => cache.delete(pid)))
        for (const pid of missing) {
          const entry: CachedStart = {
            start: batch.then((found) => found.get(pid) ?? null),
            expiresAt: Infinity,
          }
          entry.start.then(
            (value) => {
              if (value === null) entry.expiresAt = Date.now() + NOT_FOUND_TTL_MS
            },
            () => undefined,
          )
          cache.set(pid, entry)
        }
      }
      const entries = await Promise.all(
        pids.map(async (pid) => [pid, (await cache.get(pid)?.start) ?? null] as const),
      )
      return new Map(entries)
    },
  }
}
