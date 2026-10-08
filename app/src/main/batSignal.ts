import { homedir } from 'node:os'
import { join } from 'node:path'
import { beforeNewsDemoSnapshot, demoSnapshot, quietDemoSnapshot } from '../shared/demo'
import { IPC } from '../shared/ipc'
import type { StoreSnapshot, TerminalOutcome } from '../shared/types'
import { HookServer } from './sources/hookServer'
import { goToTerminal, warmTerminal } from './sources/windowsTerminal'
import { isSessionId, SessionRegistry } from './sources/sessionRegistry'
import { listSubagentTranscripts, locateTranscript } from './sources/transcriptLocator'
import { TranscriptTailer } from './sources/transcriptTailer'
import { createWindowsProbe } from './sources/windowsProbe'
import { SessionStore } from './store'
import { handleIpc, onIpc } from './appIpc'

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

/**
 * Serves the made-up Gotham night instead of real sessions (screenshots, demos). With
 * BAT_SIGNAL_DEMO=quiet it serves the calm night, nothing pending and no news coming: Bat-Signal
 * at rest, to measure.
 */
function startDemo(publish: Publish): () => void {
  const quiet = process.env['BAT_SIGNAL_DEMO'] === 'quiet'
  const before = quiet ? quietDemoSnapshot() : beforeNewsDemoSnapshot()
  let news = false
  publish(before) // the state to find news against, as for a live start
  const newsTimer = quiet
    ? undefined
    : setTimeout(() => {
        news = true
        publish(demoSnapshot())
      }, DEMO_NEWS_MS)
  const off = [
    handleIpc(IPC.getSnapshot, () => (news ? demoSnapshot() : before)),
    onIpc(IPC.markSeen, () => undefined),
    // The demo's sessions have no terminal: always the resume command, for one of them only.
    handleIpc(IPC.goToTerminal, (_event, sessionId: unknown) =>
      demoSnapshot().sessions.some((s) => s.sessionId === sessionId)
        ? goToTerminal({ pid: -1, sessionId: String(sessionId) })
        : undefined,
    ),
  ]
  return () => {
    clearTimeout(newsTimer)
    for (const undo of off) undo()
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
  // The state at start goes out once, so everything that compares snapshots (the toasts) finds
  // news against what the pages loaded, even when nothing changes before the first news.
  void store.ready.then(() => publish(store.snapshot()))

  const off = [
    handleIpc(IPC.getSnapshot, async () => {
      await store.ready
      return store.snapshot()
    }),
    onIpc(IPC.markSeen, (_event, sessionId: unknown) => {
      if (typeof sessionId === 'string') store.markSeen(sessionId)
    }),
    handleIpc(IPC.goToTerminal, async (_event, sessionId: unknown): Promise<TerminalOutcome | undefined> => {
      // It becomes part of a command on the clipboard: a session id, or nothing.
      if (!isSessionId(sessionId)) return undefined
      // A session that left the snapshot can still be resumed by its id.
      const session = store.snapshot().sessions.find((s) => s.sessionId === sessionId)
      return goToTerminal(session ?? { pid: -1, sessionId })
    }),
    onIpc(IPC.warmTerminal, warmTerminal),
  ]

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
    for (const undo of off) undo()
  }
}
