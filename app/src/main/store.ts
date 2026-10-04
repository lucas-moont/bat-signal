import { EventEmitter } from 'node:events'
import { obj, str } from '../shared/guards'
import type { SessionSignals, SessionView, StoreSnapshot } from '../shared/types'
import { deriveAttention } from './model/attention'
import { applyHookEvent } from './model/hookSignals'
import {
  applySubagentLine,
  applyTranscriptLine,
  createSession,
  toSessionState,
  type TrackedSession,
} from './model/sessionReducer'
import type { RegistryEntry } from './sources/sessionRegistry'
import type { SubagentTranscript } from './sources/transcriptLocator'
import type { TranscriptTailer } from './sources/transcriptTailer'

type Tail = Pick<TranscriptTailer, 'readNew'>

/** Where the store gets its data; injected so tests can run without disk or processes. */
export interface StoreSources {
  locateTranscript(entry: RegistryEntry): Promise<string | null>
  tailer(path: string): Tail
  listSubagentTranscripts(transcriptPath: string): Promise<SubagentTranscript[]>
  clock(): Date
}

interface LiveSession {
  entry: RegistryEntry
  tracked: TrackedSession
  transcript?: { path: string; tail: Tail }
  subagentTails: Map<string, Tail>
  /** When the user last looked at this session. */
  seenAt?: string
}

/**
 * Joins the session registry, transcripts and hook events into what the window shows.
 * Emits `update` whenever the snapshot may have changed.
 */
export class SessionStore extends EventEmitter<{ update: [] }> {
  private readonly sessions = new Map<string, LiveSession>()
  /** Hook-derived signals, kept apart because hooks can arrive before the registry lists the session. */
  private readonly signals = new Map<string, SessionSignals>()

  constructor(private readonly sources: StoreSources) {
    super()
  }

  /** Mirrors the registry: new sessions are read, known ones keep their state, gone ones are dropped. */
  async setLiveSessions(entries: RegistryEntry[]): Promise<void> {
    const live = new Set(entries.map((e) => e.sessionId))
    for (const id of this.sessions.keys()) {
      if (live.has(id)) continue
      this.sessions.delete(id)
      this.signals.delete(id)
    }

    const added: LiveSession[] = []
    for (const entry of entries) {
      const known = this.sessions.get(entry.sessionId)
      if (known) {
        known.entry = entry
        continue
      }
      const session: LiveSession = {
        entry,
        tracked: createSession(entry.sessionId),
        subagentTails: new Map(),
      }
      this.sessions.set(entry.sessionId, session)
      added.push(session)
    }
    await Promise.all(added.map((s) => this.readTranscript(s)))
    this.emit('update')
  }

  /** Reads whatever was appended to every live session's transcript. */
  async refresh(): Promise<void> {
    await Promise.all([...this.sessions.values()].map((s) => this.readTranscript(s)))
    this.emit('update')
  }

  /** Applies a Claude Code hook payload, then reads that session's transcript for fresh detail. */
  async handleHook(event: unknown): Promise<void> {
    const sessionId = str(obj(event)['session_id'])
    if (!sessionId) return
    const before = this.signals.get(sessionId) ?? {}
    this.signals.set(sessionId, applyHookEvent(before, event, this.sources.clock().toISOString()))
    const session = this.sessions.get(sessionId)
    if (session) await this.readTranscript(session)
    this.emit('update')
  }

  /** The user looked at this session: its replies so far no longer need attention. */
  markSeen(sessionId: string): void {
    const session = this.sessions.get(sessionId)
    if (!session) return
    session.seenAt = this.sources.clock().toISOString()
    this.emit('update')
  }

  snapshot(): StoreSnapshot {
    const views = [...this.sessions.values()].map(
      ({ entry, tracked, seenAt }): SessionView & { entry: RegistryEntry } => ({
        state: toSessionState(tracked),
        signals: this.signals.get(entry.sessionId) ?? {},
        status: entry.status,
        seenAt,
        entry,
      }),
    )
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

  private async readTranscript(session: LiveSession): Promise<void> {
    if (!session.transcript) {
      const path = await this.sources.locateTranscript(session.entry)
      if (!path) return
      session.transcript = { path, tail: this.sources.tailer(path) }
    }
    const { lines, restarted } = await session.transcript.tail.readNew()
    if (restarted) {
      session.tracked = createSession(session.entry.sessionId)
      session.subagentTails.clear() // re-read them from the start against the rebuilt state
    }
    session.tracked = lines.reduce(applyTranscriptLine, session.tracked)
    await this.readSubagents(session, session.transcript.path)
  }

  private async readSubagents(session: LiveSession, transcriptPath: string): Promise<void> {
    if (!session.tracked.subagents.length) return
    for (const sub of await this.sources.listSubagentTranscripts(transcriptPath)) {
      let tail = session.subagentTails.get(sub.agentId)
      if (!tail) {
        tail = this.sources.tailer(sub.path)
        session.subagentTails.set(sub.agentId, tail)
      }
      const { lines } = await tail.readNew()
      session.tracked = lines.reduce<TrackedSession>(
        (s, line) => applySubagentLine(s, sub, line),
        session.tracked,
      )
    }
  }
}
