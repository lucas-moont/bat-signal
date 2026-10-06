// Starting with Windows: the entry Windows keeps for Bat-Signal is the one record of the choice
// (Task Manager can turn it off too), so the settings switch reads and writes it, and nothing is
// saved in settings.json. Pure, so the entry and its reading are tested without Windows.
import type { StartupState } from '../shared/status'

/** The flag a launch at sign-in carries: Bat-Signal then wakes quietly, as the disc. */
export const AT_LOGIN = '--hidden'

export interface LaunchEnv {
  isPackaged: boolean
  /** The running executable: Bat-Signal.exe once installed, electron.exe in development. */
  execPath: string
  /** The app folder, which electron.exe needs in development. */
  appPath: string
}

export interface LoginItem {
  openAtLogin: boolean
  path: string
  args: string[]
}

/**
 * The entry to ask Windows for. Off passes the same path and arguments as on: Windows finds the
 * entry by them, so that is the entry it removes.
 */
export const loginItemFor = (enabled: boolean, env: LaunchEnv): LoginItem => ({
  openAtLogin: enabled,
  path: env.execPath,
  args: env.isPackaged ? [AT_LOGIN] : [env.appPath, AT_LOGIN],
})

export const launchOptions = (argv: readonly string[]): { atLogin: boolean } => ({
  atLogin: argv.includes(AT_LOGIN),
})

/** On, off, or blocked: the entry is there, but Task Manager turned it off. */
export const startupState = (windows: {
  openAtLogin: boolean
  executableWillLaunchAtLogin: boolean
}): StartupState => (!windows.openAtLogin ? 'off' : windows.executableWillLaunchAtLogin ? 'on' : 'blocked')
