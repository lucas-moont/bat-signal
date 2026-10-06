// Starting with Windows, as Windows has it: the login entry (Electron writes and reads it) and
// whether Task Manager lets it run (read from the registry: Electron's own reading misses entries
// with arguments). The rules are in loginItem.ts; this only asks Windows.
import { execFile } from 'node:child_process'
import { app } from 'electron'
import type { StartupState } from '../shared/status'
import { APP_ID, approvedByTaskManager, loginItemFor, startupState, STARTUP_APPROVED } from './loginItem'

/** Task Manager's value for Bat-Signal's entry, as reg prints it ('' when it has none). */
const readApproval = () =>
  new Promise<string>((resolve) =>
    execFile('reg', ['query', STARTUP_APPROVED, '/v', APP_ID], { windowsHide: true }, (_error, stdout) =>
      resolve(stdout ?? ''),
    ),
  )

/** onChange: the state changed (after a refresh); the status should go out. */
export function createStartup(onChange: () => void) {
  const env = { isPackaged: app.isPackaged, execPath: process.execPath, appPath: app.getAppPath() }
  let state: StartupState = 'off'

  /** Reads Windows again: the switch may have moved in Task Manager since. */
  const refresh = async (): Promise<void> => {
    const { openAtLogin } = app.getLoginItemSettings(loginItemFor(true, env))
    const approved = !openAtLogin || approvedByTaskManager(await readApproval())
    const next = startupState({ openAtLogin, approved })
    if (next === state) return
    state = next
    onChange()
  }

  return {
    get state(): StartupState {
      return state
    },
    refresh,
    /** Asks Windows to start Bat-Signal at sign-in, or not. */
    set(on: boolean): void {
      app.setLoginItemSettings(loginItemFor(on, env))
      void refresh()
    },
  }
}
