// Going to a session's terminal: find the window that hosts it and, in Windows Terminal, its tab.

export interface ProcessInfo {
  pid: number
  ppid: number
  name: string
  /** The process owns a top-level window (its main window handle is not zero). */
  hasWindow: boolean
}

/** Where the walk stops: Windows' own service tree never hosts a terminal a session runs in. */
const SYSTEM = new Set(['system', 'wininit.exe', 'services.exe', 'svchost.exe', 'explorer.exe'])

/**
 * The nearest ancestor of `pid` (or `pid` itself) that owns a window: the terminal or editor.
 * Stops at the system's service tree and at parent loops, which a reused pid can leave behind.
 */
export function findWindowOwner(processes: ProcessInfo[], pid: number): number | undefined {
  const byPid = new Map(processes.map((p) => [p.pid, p]))
  const seen = new Set<number>()
  let current = byPid.get(pid)
  while (current && !seen.has(current.pid) && !SYSTEM.has(current.name.toLowerCase())) {
    if (current.hasWindow) return current.pid
    seen.add(current.pid)
    current = byPid.get(current.ppid)
  }
  return undefined
}
