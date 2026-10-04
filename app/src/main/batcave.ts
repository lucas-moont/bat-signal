import { homedir } from 'node:os'
import { join } from 'node:path'
import { ipcMain, type BrowserWindow } from 'electron'
import { demoSnapshot } from '../shared/demo'
import { IPC } from '../shared/ipc'
import { HookServer } from './sources/hookServer'
import { SessionRegistry } from './sources/sessionRegistry'
import { listSubagentTranscripts, locateTranscript } from './sources/transcriptLocator'
import { TranscriptTailer } from './sources/transcriptTailer'
import { createWindowsProbe } from './sources/windowsProbe'
import { SessionStore } from './store'

/** Transcripts are re-read this often, so the window stays current even without the plugin. */
const REFRESH_MS = 2000
/** Coalesces bursts of updates (a busy turn fires many hooks) into one message to the window. */
const PUSH_THROTTLE_MS = 100
/** Some needs-you items depend only on the clock ("stalled for 30 minutes"), so re-push this often. */
const CLOCK_TICK_MS = 60_000
/** Claude Code may fire a hook before it writes the matching transcript line, so look again shortly after. */
const AFTER_HOOK_REREAD_MS = 300

/** Wires the data sources to the store and the store to the window. Returns a stop function. */
export function startBatcave(win: BrowserWindow): () => void {
  return process.env['BATCAVE_DEMO'] ? startDemo(win) : startLive(win)
}

/** Serves the made-up Gotham night instead of real sessions (screenshots, demos). */
function startDemo(win: BrowserWindow): () => void {
  ipcMain.handle(IPC.getSnapshot, () => demoSnapshot())
  ipcMain.on(IPC.markSeen, () => undefined)
  const timer = setInterval(() => {
    if (!win.isDestroyed()) win.webContents.send(IPC.snapshot, demoSnapshot())
  }, CLOCK_TICK_MS)
  return () => {
    clearInterval(timer)
    ipcMain.removeHandler(IPC.getSnapshot)
    ipcMain.removeAllListeners(IPC.markSeen)
  }
}

function startLive(win: BrowserWindow): () => void {
  const claudeDir = join(homedir(), '.claude')
  const store = new SessionStore({
    locateTranscript: (entry, deep) =>
      locateTranscript(join(claudeDir, 'projects'), entry.cwd, entry.sessionId, deep),
    tailer: (path) => new TranscriptTailer(path),
    listSubagentTranscripts,
    clock: () => new Date(),
  })

  const registry = new SessionRegistry(join(claudeDir, 'sessions'), createWindowsProbe())
  registry.on('change', (entries) => void store.setLiveSessions(entries))

  let rereadTimer: NodeJS.Timeout | undefined
  const hooks = new HookServer(async (event) => {
    await store.handleHook(event)
    clearTimeout(rereadTimer)
    rereadTimer = setTimeout(() => void store.refresh(), AFTER_HOOK_REREAD_MS)
  })
  hooks.listen().catch((err: Error) => console.warn(`[batcave] hook server unavailable: ${err.message}`))

  let pushTimer: NodeJS.Timeout | undefined
  const schedulePush = () => {
    pushTimer ??= setTimeout(() => {
      pushTimer = undefined
      if (!win.isDestroyed()) win.webContents.send(IPC.snapshot, store.snapshot())
    }, PUSH_THROTTLE_MS)
  }
  store.on('update', schedulePush)

  ipcMain.handle(IPC.getSnapshot, () => store.snapshot())
  ipcMain.on(IPC.markSeen, (_event, sessionId: unknown) => {
    if (typeof sessionId === 'string') store.markSeen(sessionId)
  })

  registry.start()
  const refreshTimer = setInterval(() => void store.refresh(), REFRESH_MS)
  const clockTimer = setInterval(schedulePush, CLOCK_TICK_MS)

  return () => {
    clearInterval(refreshTimer)
    clearInterval(clockTimer)
    clearTimeout(pushTimer)
    clearTimeout(rereadTimer)
    registry.stop()
    void hooks.close()
    ipcMain.removeHandler(IPC.getSnapshot)
    ipcMain.removeAllListeners(IPC.markSeen)
  }
}
