import { EventEmitter } from 'node:events'
import { isDeepStrictEqual } from 'node:util'
import { obj, str } from '../shared/guards'
import type { SessionSignals, SessionView, StoreSnapshot, Subagent } from '../shared/types'
import { deriveAttention } from './model/attention'
import { applyHookEvent } from './model/hookSignals'
import {
  applySubagentLine,
  applyTranscriptLine,
  createSession,
  isTranscriptOf,
  toSessionState,
  type TrackedSession,
} from './model/sessionReducer'
import type { RegistryEntry } from './sources/sessionRegistry'
import type { SubagentTranscript } from './sources/transcriptLocator'
import type { TranscriptTailer } from './sources/transcriptTailer'

type Tail = Pick<TranscriptTailer, 'readNew'>

/** Where the store gets its data; injected so tests can run without disk or processes. */
export interface StoreSources {
  /** `deep`: also search every project folder, not just the one named after the cwd. */
  locateTranscript(entry: RegistryEntry, deep: boolean): Promise<string | null>
  tailer(path: string): Tail
  /** Subagent transcripts not in `known` (by agent id), with their meta.json links. */
  listSubagentTranscripts(transcriptPath: string, known: ReadonlySet<string>): Promise<SubagentTranscript[]>
  clock(): Date
}

interface LiveSession {
  entry: RegistryEntry
  tracked: TrackedSession
  transcript?: { path: string; tail: Tail }
  /** Subagent transcripts by agent id; `settled` once read after the subagent finished. */
  subagentFiles: Map<string, { link: SubagentTranscript; tail: Tail; settled: boolean }>
  /** While no transcript is found, the folder-by-folder search waits until then (epoch ms). */
  nextDeepScanAt: number
  /** When the user last looked at this session. */
  seenAt?: string
  /** Its transcript has been read once: until then it is left out of snapshots. */
  read?: boolean
  /** The read in progress, and the one queued behind it (see readTranscript). */
  reading?: Promise<void>
  queued?: Promise<void>
}

/**
 * Joins the session registry, transcripts and hook events into what the window shows.
 * Emits `update` only when something it shows changed.
 */
export class SessionStore extends EventEmitter<{ update: [] }> {
  private readonly sessions = new Map<string, LiveSession>()
  /** Hook-derived signals, kept apart because hooks can arrive before the registry lists the session. */
  private readonly signals = new Map<string, { signals: SessionSignals; at: number }>()

  /**
   * Resolves once the first registry listing has been read. Snapshots taken before it are not the
   * state yet, only part of it, so nothing should treat them as a baseline.
   */
  readonly ready: Promise<void>
  private markReady!: () => void

  constructor(private readonly sources: StoreSources) {
    super()
    this.ready = new Promise((resolve) => (this.markReady = resolve))
  }

  /** Mirrors the registry: new sessions are read, known ones keep their state, gone ones are dropped. */
  async setLiveSessions(entries: RegistryEntry[]): Promise<void> {
    const live = new Set(entries.map((e) => e.sessionId))
    let changed = false
    for (const id of this.sessions.keys()) {
      if (live.has(id)) continue
      this.sessions.delete(id)
      this.signals.delete(id)
      changed = true
    }
    // Hooks from sessions the registry never lists (headless runs, late SessionEnd) expire.
    const now = this.sources.clock().getTime()
    for (const [id, { at }] of this.signals) {
      if (!live.has(id) && now - at > UNLISTED_SIGNALS_TTL_MS) this.signals.delete(id)
    }

    const added: LiveSession[] = []
    for (const entry of entries) {
      const known = this.sessions.get(entry.sessionId)
      if (known) {
        if (!isDeepStrictEqual(known.entry, entry)) changed = true
        known.entry = entry
        continue
      }
      const session: LiveSession = {
        entry,
        tracked: createSession(entry.sessionId),
        subagentFiles: new Map(),
        nextDeepScanAt: 0,
      }
      this.sessions.set(entry.sessionId, session)
      added.push(session)
    }
    try {
      await Promise.all(
        added.map(async (s) => {
          try {
            await this.readChanged(s)
          } finally {
            s.read = true // even an unreadable transcript must not hide the session forever
          }
        }),
      )
    } finally {
      this.markReady()
    }
    if (changed || added.length) this.emit('update')
  }

  /** Reads whatever was appended to every live session's transcript. */
  async refresh(): Promise<void> {
    const changed = await Promise.all([...this.sessions.values()].map((s) => this.readChanged(s)))
    if (changed.includes(true)) this.emit('update')
  }

  /** Applies a Claude Code hook payload, then reads that session's transcript for fresh detail. */
  async handleHook(event: unknown): Promise<void> {
    const sessionId = str(obj(event)['session_id'])
    if (!sessionId) return
    const before = this.signals.get(sessionId)?.signals ?? {}
    const after = applyHookEvent(before, event, this.sources.clock().toISOString())
    this.signals.set(sessionId, { signals: after, at: this.sources.clock().getTime() })
    const session = this.sessions.get(sessionId)
    const read = session ? await this.readChanged(session) : false
    if (session && (read || after !== before)) this.emit('update')
  }

  /** The user looked at this session: its replies so far no longer need attention. */
  markSeen(sessionId: string): void {
    const session = this.sessions.get(sessionId)
    if (!session) return
    session.seenAt = this.sources.clock().toISOString()
    this.emit('update')
  }

  snapshot(): StoreSnapshot {
    const views = [...this.sessions.values()]
      .filter((s) => s.read)
      .map(({ entry, tracked, seenAt }): SessionView & { entry: RegistryEntry } => ({
        state: toSessionState(tracked),
        signals: this.signals.get(entry.sessionId)?.signals ?? {},
        status: entry.status,
        seenAt,
        entry,
      }))
    return {
      sessions: views.map(({ state, signals, status, entry }) => ({
        ...state,
        pid: entry.pid,
        name: entry.name,
        status,
        signals,
      })),
      attention: deriveAttention(views, this.sources.clock()),
    }
  }

  /** Reads a session and says whether anything it shows changed. */
  private async readChanged(session: LiveSession): Promise<boolean> {
    const before = session.tracked
    try {
      await this.readTranscript(session)
    } catch (err) {
      // One unreadable transcript (e.g. locked by an antivirus) must not hold back the others.
      console.warn(`[bat-signal] could not read session ${session.entry.sessionId}:`, err)
    }
    // The reducers return the same object when a line changes nothing.
    return session.tracked !== before
  }

  /**
   * Reads one session at a time: a hook and the refresh timer often ask together, and two
   * reads interleaving would apply the same lines twice. A request made during a read joins
   * the single read queued behind it, which starts afterwards and so sees what was appended.
   */
  private readTranscript(session: LiveSession): Promise<void> {
    session.queued ??= (session.reading ?? Promise.resolve())
      .catch(() => undefined)
      .then(() => {
        session.queued = undefined
        return (session.reading = this.readNow(session))
      })
    return session.queued
  }

  private async readNow(session: LiveSession): Promise<void> {
    if (!session.transcript) {
      const now = this.sources.clock().getTime()
      const deep = now >= session.nextDeepScanAt
      const path = await this.sources.locateTranscript(session.entry, deep)
      if (!path) {
        if (deep) session.nextDeepScanAt = now + DEEP_SCAN_EVERY_MS
        return
      }
      session.transcript = { path, tail: this.sources.tailer(path) }
    }
    const { lines, restarted } = await session.transcript.tail.readNew()
    if (restarted) {
      session.tracked = createSession(session.entry.sessionId)
      session.subagentFiles.clear() // re-read them from the start against the rebuilt state
    }
    session.tracked = lines.reduce(applyTranscriptLine, session.tracked)
    await this.readSubagents(session, session.transcript.path)
  }

  /** Reads subagent transcripts, skipping the ones already read to the end after their subagent finished. */
  private async readSubagents(session: LiveSession, transcriptPath: string): Promise<void> {
    const files = session.subagentFiles
    const alreadyRead = (a: Subagent) =>
      [...files.values()].some((f) => f.settled && isTranscriptOf(f.link, a))
    if (!session.tracked.subagents.some((a) => a.status === 'running' || !alreadyRead(a))) return

    for (const link of await this.sources.listSubagentTranscripts(transcriptPath, new Set(files.keys()))) {
      files.set(link.agentId, { link, tail: this.sources.tailer(link.path), settled: false })
    }
    for (const file of files.values()) {
      if (file.settled) continue
      const { lines } = await file.tail.readNew()
      session.tracked = lines.reduce<TrackedSession>(
        (s, line) => applySubagentLine(s, file.link, line),
        session.tracked,
      )
      const subagent = session.tracked.subagents.find((a) => isTranscriptOf(file.link, a))
      file.settled = subagent !== undefined && subagent.status !== 'running'
    }
  }
}

const DEEP_SCAN_EVERY_MS = 30_000
const UNLISTED_SIGNALS_TTL_MS = 5 * 60_000
