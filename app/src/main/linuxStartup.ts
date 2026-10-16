// Starting at sign-in, as Linux has it: the XDG autostart entry (rules in autostart.ts). This only
// reads and writes the file.
import { readFileSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname } from 'node:path'
import { app } from 'electron'
import type { StartupState } from '../shared/status'
import { autostartFile, autostartState, desktopEntry } from './autostart'
import type { Startup } from './startup'

const readEntry = (file: string): Promise<string | undefined> => readFile(file, 'utf8').catch(() => undefined)

/** onChange: the state may have changed; the status should go out (it is sent only if it did). */
export function createLinuxStartup(onChange: () => void): Startup {
  const file = autostartFile(app.isPackaged, { home: homedir(), configHome: process.env['XDG_CONFIG_HOME'] })
  const env = {
    isPackaged: app.isPackaged,
    execPath: process.execPath,
    appPath: app.getAppPath(),
    appImage: process.env['APPIMAGE'],
  }
  let state: StartupState = autostartState(
    (() => {
      try {
        return readFileSync(file, 'utf8')
      } catch {
        return undefined
      }
    })(),
  )
  // Readings can overlap (the sheet opens, the switch is clicked): only the latest one counts.
  let latest = 0

  const read = async (): Promise<void> => {
    const mine = ++latest
    const entry = await readEntry(file)
    if (mine !== latest) return
    state = autostartState(entry)
    onChange()
  }

  return {
    get state(): StartupState {
      return state
    },
    /** Reads the file again: the desktop's startup settings may have changed it. */
    refresh: (): Promise<void> => read(),
    /** Writes the entry (which also clears a block the desktop set), or removes it; then reads it back. */
    set(on: boolean): void {
      const change = on
        ? mkdir(dirname(file), { recursive: true }).then(() => writeFile(file, desktopEntry(env)))
        : rm(file, { force: true })
      void change
        .catch((err: unknown) => console.warn('[bat-signal] could not change the autostart entry:', err))
        .then(read)
    },
  }
}
