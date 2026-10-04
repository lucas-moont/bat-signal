// Interim list so the data layer can be checked end to end; phase 3 replaces it with the real screens.
import type { AttentionItem, SessionSnapshot } from '@shared/types'

const KIND_LABEL: Record<AttentionItem['kind'], string> = {
  permission: 'needs permission',
  error: 'error',
  waiting: 'waiting for you',
  reply: 'new reply',
  stalled: 'task stalled',
}

export function SessionList({
  sessions,
  attention,
}: {
  sessions: SessionSnapshot[]
  attention: AttentionItem[]
}) {
  if (!sessions.length) return <p className="session-empty">No Claude Code sessions running.</p>
  return (
    <ul className="session-list">
      {sessions.map((s) => {
        const needs = attention.filter((a) => a.sessionId === s.sessionId)
        const done = s.tasks.filter((t) => t.status === 'completed').length
        return (
          <li key={s.sessionId} className="session" onClick={() => window.batcave.markSeen(s.sessionId)}>
            <div className="session-top">
              <span className={`session-dot session-dot--${needs.length ? 'alert' : s.signals.status}`} />
              <span className="session-title">{s.title ?? s.name ?? s.sessionId.slice(0, 8)}</span>
            </div>
            <div className="session-meta">
              {s.signals.status}
              {s.tasks.length > 0 && ` · tasks ${done}/${s.tasks.length}`}
              {s.subagents.some((a) => a.status === 'running') && ' · subagents running'}
              {needs.map((n) => ` · ${KIND_LABEL[n.kind]}`).join('')}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
