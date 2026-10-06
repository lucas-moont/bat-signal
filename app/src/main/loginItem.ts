// Starting with Windows: the entry Windows keeps for Bat-Signal is the one record of the choice
// (Task Manager can turn it off too), so the settings switch reads and writes it, and nothing is
// saved in settings.json. Pure, so the entry and its reading are tested without Windows.
import type { StartupState } from '../shared/status'

/** Bat-Signal's app id: its Windows taskbar identity, and the name of its login entry. */
export const APP_ID = 'com.lucasmoont.bat-signal'

/** Where Task Manager records which login entries it lets run (one value per entry, by name). */
export const STARTUP_APPROVED = String.raw`HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run`

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
  name: string
}

/**
 * The entry to ask Windows for. Off passes the same path and arguments as on: Windows finds the
 * entry by them, so that is the entry it removes.
 */
export const loginItemFor = (enabled: boolean, env: LaunchEnv): LoginItem => ({
  openAtLogin: enabled,
  path: env.execPath,
  args: env.isPackaged ? [AT_LOGIN] : [env.appPath, AT_LOGIN],
  name: APP_ID,
})

export const launchOptions = (argv: readonly string[]): { atLogin: boolean } => ({
  atLogin: argv.includes(AT_LOGIN),
})

/**
 * Whether Task Manager lets Bat-Signal's entry run, from `reg query` of STARTUP_APPROVED for it.
 * Its first byte is even when switched on and odd when switched off; an entry Task Manager never
 * touched has no value and runs. (Electron's own reading misses entries with arguments.)
 */
export function approvedByTaskManager(regOutput: string): boolean {
  const bytes = new RegExp(`${APP_ID.replace(/\./g, '\\.')}\\s+REG_BINARY\\s+([0-9A-F]{2})`, 'i').exec(
    regOutput,
  )
  return !bytes || parseInt(bytes[1]!, 16) % 2 === 0
}

/** On, off, or blocked: the entry is there, but Task Manager turned it off. */
export const startupState = (windows: { openAtLogin: boolean; approved: boolean }): StartupState =>
  !windows.openAtLogin ? 'off' : windows.approved ? 'on' : 'blocked'
