// Linux's process table, as /proc shows it: one stat line per pid. The parsing is pure, so it is
// tested without Linux; reading is one small file per pid, with no process to start.
import { readFile } from 'node:fs/promises'

export interface ProcStat {
  pid: number
  /** The executable's name, cut to 15 characters by the kernel. */
  name: string
  ppid: number
  /** When the process started, in clock ticks since boot: what Claude Code writes as procStart. */
  startTime: string
}

/**
 * One /proc/<pid>/stat line. The name sits in parentheses and may itself hold spaces and
 * parentheses, so the fields after it are counted from the last ')'.
 */
export function parseStat(text: string): ProcStat | undefined {
  const open = text.indexOf('(')
  const close = text.lastIndexOf(')')
  if (open < 0 || close < open) return undefined
  // After the name: field 3 (the state) first, so field n is at n - 3.
  const fields = text
    .slice(close + 1)
    .trim()
    .split(/\s+/)
  const pid = Number(text.slice(0, open).trim())
  const ppid = Number(fields[1])
  const startTime = fields[19]
  if (!Number.isInteger(pid) || !Number.isInteger(ppid) || !startTime || !/^\d+$/.test(startTime))
    return undefined
  return { pid, name: text.slice(open + 1, close), ppid, startTime }
}

/** A process's stat line, read and parsed; undefined once the process is gone. */
export const readStat = (pid: number): Promise<ProcStat | undefined> =>
  readFile(`/proc/${pid}/stat`, 'utf8').then(parseStat, () => undefined)

/** The process and its ancestors, nearest first, as far as /proc goes (at most `limit` of them). */
export async function ancestry(pid: number, limit = 64): Promise<ProcStat[]> {
  const line: ProcStat[] = []
  const seen = new Set<number>()
  for (let next = pid; next > 0 && line.length < limit && !seen.has(next);) {
    seen.add(next)
    const stat = await readStat(next)
    if (!stat) break
    line.push(stat)
    next = stat.ppid
  }
  return line
}
