import { pidExists, type ProcessProbe } from './sessionRegistry'
import { readStat } from './procfs'

/**
 * ProcessProbe backed by /proc. A pid's start time is a field of its stat line, read straight from
 * the file, so there is nothing to batch or cache: Linux reuses pids too, and the field tells them apart.
 */
export function createLinuxProbe(): ProcessProbe {
  return {
    isRunning: pidExists,
    async startTimes(pids) {
      const stats = await Promise.all(pids.map(readStat))
      return new Map(pids.map((pid, i) => [pid, stats[i]?.startTime ?? null]))
    },
  }
}
