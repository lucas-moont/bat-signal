// Starting with Windows, as Windows has it: the login entry (Electron writes and reads it) and
// whether Task Manager lets it run (read from the registry: Electron's own reading misses entries
// with arguments). The rules are in loginItem.ts; this only asks Windows.
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { app } from 'electron'
import type { StartupState } from '../shared/status'
import { approvedByTaskManager, loginItemFor, startupState, STARTUP_APPROVED } from './loginItem'

const execFileAsync = promisify(execFile)
const REG_TIMEOUT_MS = 5_000

/** Task Manager's value for the entry, as reg prints it ('' when it has none, or reg fails). */
const readApproval = (name: string): Promise<string> =>
  execFileAsync('reg', ['query', STARTUP_APPROVED, '/v', name], {
    timeout: REG_TIMEOUT_MS,
    windowsHide: true,
  })
    .then(({ stdout }) => stdout)
    .catch(() => '')

/** onChange: the state may have changed; the status should go out (it is sent only if it did). */
export function createStartup(onChange: () => void) {
  const env = { isPackaged: app.isPackaged, execPath: process.execPath, appPath: app.getAppPath() }
  let state: StartupState = 'off'
  let reading: Promise<void> | undefined

  const read = async (): Promise<void> => {
    const entry = loginItemFor(true, env)
    const { openAtLogin } = app.getLoginItemSettings(entry)
    const approved = !openAtLogin || approvedByTaskManager(await readApproval(entry.name))
    state = startupState({ openAtLogin, approved })
    onChange()
  }

  return {
    get state(): StartupState {
      return state
    },
    /** Reads Windows again (the switch may have moved in Task Manager); one reading at a time. */
    refresh(): Promise<void> {
      return (reading ??= read().finally(() => (reading = undefined)))
    },
    /** Asks Windows to start Bat-Signal at sign-in, or not. */
    set(on: boolean): void {
      app.setLoginItemSettings(loginItemFor(on, env))
      void this.refresh()
    },
  }
}
