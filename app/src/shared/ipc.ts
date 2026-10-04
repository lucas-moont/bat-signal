/** Channel names shared by the main process and the preload bridge. */
export const IPC = {
  snapshot: 'batcave:snapshot',
  getSnapshot: 'batcave:get-snapshot',
  markSeen: 'batcave:mark-seen',
  getSettings: 'batcave:get-settings',
  setSettings: 'batcave:set-settings',
  settings: 'batcave:settings',
  setMode: 'batcave:set-mode',
  closeWindow: 'batcave:close-window',
} as const
