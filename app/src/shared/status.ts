// What is happening now, as opposed to what the user chose (settings): pushed by the main
// process to the pages, never saved.

/** The global shortcut: the one held, and whether it works (taken: another app has it). */
export interface ShortcutStatus {
  accelerator: string
  state: 'off' | 'active' | 'taken'
}

export interface AppStatus {
  shortcut: ShortcutStatus
}

export const DEFAULT_STATUS: AppStatus = { shortcut: { accelerator: '', state: 'off' } }
