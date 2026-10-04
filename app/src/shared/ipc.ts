/** Channel names shared by the main process and the preload bridge. */
export const IPC = {
  snapshot: 'batcave:snapshot',
  getSnapshot: 'batcave:get-snapshot',
  markSeen: 'batcave:mark-seen',
  getSettings: 'batcave:get-settings',
  setSettings: 'batcave:set-settings',
  settings: 'batcave:settings',
  getMode: 'batcave:get-mode',
  setMode: 'batcave:set-mode',
  mode: 'batcave:mode',
  focusCase: 'batcave:focus-case',
  noticeOut: 'batcave:notice-out',
  moveSignal: 'batcave:move-signal',
  closeWindow: 'batcave:close-window',
} as const
