/** Channel names shared by the main process and the preload bridge. */
export const IPC = {
  snapshot: 'batcave:snapshot',
  getSnapshot: 'batcave:get-snapshot',
  markSeen: 'batcave:mark-seen',
} as const
