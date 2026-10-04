import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

/**
 * A small JSON file in the app's user-data folder. `parse` validates what was read, so a
 * missing, corrupted or hand-edited file just yields its fallback.
 */
export function jsonFile<T>(name: string, parse: (raw: unknown) => T) {
  const path = () => join(app.getPath('userData'), name)
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
  }
}
