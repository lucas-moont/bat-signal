import { homedir } from 'node:os'
import { join } from 'node:path'
import { ipcMain } from 'electron'
import { beforeNewsDemoSnapshot, demoSnapshot } from '../shared/demo'
import { IPC } from '../shared/ipc'
import type { StoreSnapshot } from '../shared/types'
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

/** Hands a new store snapshot to the windows. */
type Publish = (snapshot: StoreSnapshot) => void

/** Wires the data sources to the store and the store to the windows. Returns a stop function. */
export function startBatSignal(publish: Publish): () => void {
  return process.env['BAT_SIGNAL_DEMO'] ? startDemo(publish) : startLive(publish)
}

/** A few seconds in, the demo night brings news, so the Bat-Signal has something to announce. */
const DEMO_NEWS_MS = 4000

/** Serves the made-up Gotham night instead of real sessions (screenshots, demos). */
function startDemo(publish: Publish): () => void {
  let news = false
  const newsTimer = setTimeout(() => {
    news = true
    publish(demoSnapshot())
  }, DEMO_NEWS_MS)
  ipcMain.handle(IPC.getSnapshot, () => (news ? demoSnapshot() : beforeNewsDemoSnapshot()))
  ipcMain.on(IPC.markSeen, () => undefined)
  return () => {
    clearTimeout(newsTimer)
    ipcMain.removeHandler(IPC.getSnapshot)
    ipcMain.removeAllListeners(IPC.markSeen)
  }
}

function startLive(publish: Publish): () => void {
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
  hooks.listen().catch((err: Error) => console.warn(`[bat-signal] hook server unavailable: ${err.message}`))

  let pushTimer: NodeJS.Timeout | undefined
  const schedulePush = () => {
    pushTimer ??= setTimeout(async () => {
      await store.ready // a snapshot from before the first full read is not news, only half the state
      pushTimer = undefined
      publish(store.snapshot())
    }, PUSH_THROTTLE_MS)
  }
  store.on('update', schedulePush)

  ipcMain.handle(IPC.getSnapshot, async () => {
    await store.ready
    return store.snapshot()
  })
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
