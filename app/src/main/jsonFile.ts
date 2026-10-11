import { readFileSync, watch, writeFileSync, type FSWatcher } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

/** How long a burst of changes (a slider being dragged, a window being moved) waits to be written once. */
const SAVE_SOON_MS = 500
/** An editor saves a file in a few writes (or as a new file moved over it): read it once they stop. */
const SETTLE_MS = 150

/**
 * A small JSON file in the app's user-data folder. `parse` validates what was read, so a
 * missing, corrupted or hand-edited file just yields its fallback.
 */
export function jsonFile<T>(name: string, parse: (raw: unknown) => T) {
  const path = () => join(app.getPath('userData'), name)
  let pending: { value: T } | undefined
  let timer: NodeJS.Timeout | undefined
  /** The text the app last wrote, so its own saves don't come back as edits. */
  let written: string | undefined
  const read = (): string | undefined => {
    try {
      return readFileSync(path(), 'utf8')
    } catch {
      return undefined
    }
  }
  const parsed = (text: string | undefined): T => {
    try {
      return parse(text === undefined ? undefined : JSON.parse(text))
    } catch {
      return parse(undefined)
    }
  }

  /** Writes `value` now; a save still waiting is dropped, so the file never goes back to it. */
  const save = (value: T): void => {
    clearTimeout(timer)
    pending = undefined
    try {
      written = JSON.stringify(value, null, 2)
      writeFileSync(path(), written)
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
      return parsed(read())
    },
    /**
     * Hands over the file's JSON, unvalidated, each time someone else changes it (edited by hand,
     * say), so the caller can lay it over what it holds; the app's own saves don't count, and
     * neither does a file that doesn't parse (a typo, or a read caught mid-save). Watches the
     * folder, since an editor may replace the file. Returns how to stop.
     */
    watch(onChange: (raw: unknown) => void): () => void {
      let settle: NodeJS.Timeout | undefined
      const changed = (_event: string, file: string | null) => {
        if (file !== name) return
        // Someone else is writing it: a save still waiting must not fire before the edit is read,
        // or it would write the old value over the edit and the edit would pass for the app's own.
        if (read() !== written) {
          clearTimeout(timer)
          pending = undefined
        }
        clearTimeout(settle)
        settle = setTimeout(() => {
          const text = read()
          if (text === undefined || text === written) return
          let raw: unknown
          try {
            raw = JSON.parse(text)
          } catch {
            return
          }
          written = text
          onChange(raw)
        }, SETTLE_MS)
      }
      let watcher: FSWatcher | undefined
      try {
        watcher = watch(join(path(), '..'), changed)
        // The folder went away (or Windows refused the handle): hand edits stop applying, nothing else.
        watcher.on('error', () => watcher?.close())
      } catch (err) {
        console.warn(`[bat-signal] can't watch ${name} for hand edits:`, err)
      }
      return () => {
        clearTimeout(settle)
        watcher?.close()
      }
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
