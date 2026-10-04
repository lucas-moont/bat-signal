/** Channel names shared by the main process and the preload bridge. */
export const IPC = {
  snapshot: 'bat-signal:snapshot',
  getSnapshot: 'bat-signal:get-snapshot',
  markSeen: 'bat-signal:mark-seen',
  getSettings: 'bat-signal:get-settings',
  setSettings: 'bat-signal:set-settings',
  settings: 'bat-signal:settings',
  getMode: 'bat-signal:get-mode',
  setMode: 'bat-signal:set-mode',
  mode: 'bat-signal:mode',
  focusCase: 'bat-signal:focus-case',
  noticeOut: 'bat-signal:notice-out',
  moveSignal: 'bat-signal:move-signal',
  interactive: 'bat-signal:interactive',
  closeWindow: 'bat-signal:close-window',
} as const
