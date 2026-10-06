// What is happening now, as opposed to what the user chose (settings): pushed by the main
// process to the pages, never saved.

/** The global shortcut: the one held, and whether it works (taken: another app has it). */
export interface ShortcutStatus {
  accelerator: string
  state: 'off' | 'active' | 'taken'
}

/** Starting with Windows: on, off, or blocked (the entry is there, but Task Manager turned it off). */
export type StartupState = 'on' | 'off' | 'blocked'

export interface AppStatus {
  shortcut: ShortcutStatus
  startup: StartupState
}

export const SHORTCUT_OFF: ShortcutStatus = { accelerator: '', state: 'off' }

export const DEFAULT_STATUS: AppStatus = { shortcut: SHORTCUT_OFF, startup: 'off' }
