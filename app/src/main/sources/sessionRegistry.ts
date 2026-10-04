import type { LiveStatus } from '../../shared/types'

/** One `~/.claude/sessions/<pid>.json` file. */
export interface RegistryEntry {
  pid: number
  sessionId: string
  cwd: string
  procStart?: string
  status: LiveStatus
  name?: string
  startedAt?: number
  updatedAt?: number
}

/** The OS boundary: lets tests fake which processes exist. */
export interface ProcessProbe {
  isRunning(pid: number): boolean
  /** Process creation time as a Windows FILETIME string, or null if the process is gone. */
  startTime(pid: number): Promise<string | null>
}

export async function isSessionAlive(entry: RegistryEntry, probe: ProcessProbe): Promise<boolean> {
  if (!probe.isRunning(entry.pid)) return false
  if (!entry.procStart) return true
  // A crashed session leaves its file behind, and Windows reuses pids:
  // only trust the pid if the process started when the file says it did.
  return (await probe.startTime(entry.pid)) === entry.procStart
}
