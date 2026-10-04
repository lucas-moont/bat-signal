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

/**
 * A title without the status glyph Claude Code puts in front of it ("◑ name" → "name"). Both
 * sides of a comparison go through it, so a name that starts with punctuation still matches.
 */
const bareTitle = (title: string) => title.replace(/^[^\p{L}\p{N}]+/u, '').trim()

/** Index of the Windows Terminal tab titled with the session's name. */
export function pickTab(titles: string[], name: string | undefined): number | undefined {
  if (!name) return undefined
  const wanted = bareTitle(name)
  const index = titles.findIndex((t) => bareTitle(t) === wanted)
  return index < 0 ? undefined : index
}

/** A Windows Terminal window and its tab titles. One WindowsTerminal.exe hosts every window. */
export interface TerminalWindow {
  handle: number
  pid: number
  titles: string[]
}

/** The window holding the session's tab, and which tab: across every Windows Terminal window. */
export function pickWindowTab(
  windows: TerminalWindow[],
  name: string | undefined,
): { handle: number; pid: number; tab: number } | undefined {
  for (const w of windows) {
    const tab = pickTab(w.titles, name)
    if (tab !== undefined) return { handle: w.handle, pid: w.pid, tab }
  }
  return undefined
}
