import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

/** How long a burst of changes (a slider being dragged, a window being moved) waits to be written once. */
const SAVE_SOON_MS = 500

/**
 * A small JSON file in the app's user-data folder. `parse` validates what was read, so a
 * missing, corrupted or hand-edited file just yields its fallback.
 */
export function jsonFile<T>(name: string, parse: (raw: unknown) => T) {
  const path = () => join(app.getPath('userData'), name)
  let pending: { value: T } | undefined
  let timer: NodeJS.Timeout | undefined

  /** Writes `value` now; a save still waiting is dropped, so the file never goes back to it. */
  const save = (value: T): void => {
    clearTimeout(timer)
    pending = undefined
    try {
      writeFileSync(path(), JSON.stringify(value, null, 2))
    } catch (err) {
      console.warn(`[bat-signal] could not save ${name}:`, err)
    }
  }
  /** Writes a save still waiting, now (the app is quitting). */
  const flush = (): void => {
    if (pending) save(pending.value)
  }

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
    save,
    /** Saves once the changes stop for SAVE_SOON_MS: a dragged slider writes the file once, not per step. */
    saveSoon(value: T): void {
      pending = { value }
      clearTimeout(timer)
      timer = setTimeout(flush, SAVE_SOON_MS)
    },
    flush,
  }
}
