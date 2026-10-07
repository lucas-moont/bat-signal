import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

/** How long a burst of changes (a slider being dragged) waits before it is written once. */
const SAVE_SOON_MS = 500

/**
 * A small JSON file in the app's user-data folder. `parse` validates what was read, so a
 * missing, corrupted or hand-edited file just yields its fallback.
 */
export function jsonFile<T>(name: string, parse: (raw: unknown) => T) {
  const path = () => join(app.getPath('userData'), name)
  let pending: { value: T } | undefined
  let timer: NodeJS.Timeout | undefined
  return {
    load(): T {
      let raw: unknown
      try {
        raw = JSON.parse(readFileSync(path(), 'utf8'))
      } catch {
        raw = undefined
      }
      return parse(raw)
    },
    save(value: T): void {
      try {
        writeFileSync(path(), JSON.stringify(value, null, 2))
      } catch (err) {
        console.warn(`[bat-signal] could not save ${name}:`, err)
      }
    },
    /** Saves once the changes stop for SAVE_SOON_MS: a dragged slider writes the file once, not per step. */
    saveSoon(value: T): void {
      pending = { value }
      clearTimeout(timer)
      timer = setTimeout(() => this.flush(), SAVE_SOON_MS)
    },
    /** Writes a pending save now (the app is quitting). */
    flush(): void {
      clearTimeout(timer)
      if (pending) this.save(pending.value)
      pending = undefined
    },
  }
}
