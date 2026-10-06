// Starting with Windows, as Windows has it: the login entry (Electron writes and reads it) and
// whether Task Manager lets it run (read from the registry: Electron's own reading misses entries
// with arguments). The rules are in loginItem.ts; this only asks Windows.
import { execFile } from 'node:child_process'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { app } from 'electron'
import type { StartupState } from '../shared/status'
import { approvedByTaskManager, loginItemFor, startupState, STARTUP_APPROVED } from './loginItem'

const execFileAsync = promisify(execFile)
const REG_TIMEOUT_MS = 5_000
/** reg.exe by its full path, not whatever a PATH lookup finds. */
const REG = join(process.env['SystemRoot'] ?? String.raw`C:\Windows`, 'System32', 'reg.exe')

/**
 * Task Manager's value for the entry, as reg prints it: '' when there is none (reg exits with 1),
 * undefined when reg could not answer (then the last reading stands).
 */
const readApproval = (name: string): Promise<string | undefined> =>
  execFileAsync(REG, ['query', STARTUP_APPROVED, '/v', name], { timeout: REG_TIMEOUT_MS, windowsHide: true })
    .then(({ stdout }) => stdout)
    .catch((error: { code?: unknown }) => (error.code === 1 ? '' : undefined))

/** onChange: the state may have changed; the status should go out (it is sent only if it did). */
export function createStartup(onChange: () => void) {
  const env = { isPackaged: app.isPackaged, execPath: process.execPath, appPath: app.getAppPath() }
  let approved = true
  // On or off from the start (a cheap read, no process), so the switch does not flicker when the
  // sheet first opens; whether Task Manager blocks it comes with the first full reading.
  let state: StartupState = startupState({
    openAtLogin: app.getLoginItemSettings(loginItemFor(true, env)).openAtLogin,
    approved,
  })
  // Readings can overlap (the sheet opens, the switch is clicked): only the latest one counts.
  let latest = 0

  const read = async (): Promise<void> => {
    const mine = ++latest
    const entry = loginItemFor(true, env)
    const { openAtLogin } = app.getLoginItemSettings(entry)
    if (openAtLogin) {
      const answer = await readApproval(entry.name)
      if (mine !== latest) return
      if (answer !== undefined) approved = approvedByTaskManager(answer)
    }
    state = startupState({ openAtLogin, approved })
    onChange()
  }

  return {
    get state(): StartupState {
      return state
    },
    /** Reads Windows again: the switch may have moved in Task Manager. */
    refresh: (): Promise<void> => read(),
    /**
     * Asks Windows to start Bat-Signal at sign-in, or not. Turning it on also clears a Task
     * Manager block (Electron approves the entry it writes), then reads the result back.
     */
    set(on: boolean): void {
      app.setLoginItemSettings(loginItemFor(on, env))
      void read()
    },
  }
}
