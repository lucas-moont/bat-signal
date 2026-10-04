// What the Bat-Signal announces: news found by comparing two snapshots.
import type { AttentionItem, StoreSnapshot } from './types'
import { attentionCopy, caseHeader, folderName } from './view'

export type NoticeKind =
  'permission' | 'error' | 'waiting' | 'reply' | 'task-done' | 'session-opened' | 'session-closed'

export interface Notice {
  /** Stable identity, so the same news is never announced twice. */
  key: string
  kind: NoticeKind
  sessionId: string
  at: string
  /** The case it is about. */
  title: string
  /** One line of detail. */
  line: string
}

const ANNOUNCED_ALERTS = new Set<AttentionItem['kind']>(['permission', 'error', 'waiting', 'reply'])

const alertKey = (a: AttentionItem) => `${a.sessionId}:${a.kind}:${a.at}`

/** News between two snapshots. The first snapshot announces nothing: it is the state, not news. */
export function diffNotices(prev: StoreSnapshot | undefined, next: StoreSnapshot): Notice[] {
  if (!prev) return []
  const titleOf = (id: string) => {
    const s = next.sessions.find((x) => x.sessionId === id) ?? prev.sessions.find((x) => x.sessionId === id)
    return s ? caseHeader(s).title : 'Unknown case'
  }

  const known = new Set(prev.attention.map(alertKey))
  const alerts: Notice[] = next.attention
    .filter((a) => ANNOUNCED_ALERTS.has(a.kind) && !known.has(alertKey(a)))
    .map((a) => ({
      key: alertKey(a),
      kind: a.kind as NoticeKind,
      sessionId: a.sessionId,
      at: a.at,
      title: titleOf(a.sessionId),
      line: attentionCopy(a).line,
    }))

  const before = new Map(prev.sessions.map((s) => [s.sessionId, s]))
  const after = new Set(next.sessions.map((s) => s.sessionId))
  const tasks: Notice[] = []
  const opened: Notice[] = []
  for (const s of next.sessions) {
    const old = before.get(s.sessionId)
    if (!old) {
      // A session that just appeared: announce it, not the work it already finished.
      opened.push({
        key: `${s.sessionId}:opened`,
        kind: 'session-opened',
        sessionId: s.sessionId,
        at: s.lastActivityAt ?? '',
        title: titleOf(s.sessionId),
        line: folderName(s.cwd ?? '') || 'New session',
      })
      continue
    }
    const wasDone = new Set(old.tasks.filter((t) => t.status === 'completed').map((t) => t.id))
    for (const t of s.tasks) {
      if (t.status !== 'completed' || wasDone.has(t.id)) continue
      tasks.push({
        key: `${s.sessionId}:task:${t.id}`,
        kind: 'task-done',
        sessionId: s.sessionId,
        at: t.history.at(-1)?.at ?? '',
        title: titleOf(s.sessionId),
        line: t.subject,
      })
    }
  }
  const closed: Notice[] = prev.sessions
    .filter((s) => !after.has(s.sessionId))
    .map((s) => ({
      key: `${s.sessionId}:closed`,
      kind: 'session-closed',
      sessionId: s.sessionId,
      at: s.lastActivityAt ?? '',
      title: titleOf(s.sessionId),
      line: 'Session ended',
    }))

  return [...alerts, ...tasks, ...opened, ...closed]
}

export const NOTICE_STAMP: Record<NoticeKind, string> = {
  permission: 'Permission',
  error: 'Error',
  waiting: 'Waiting',
  reply: 'New reply',
  'task-done': 'Task done',
  'session-opened': 'Case opened',
  'session-closed': 'Case closed',
}

/** News that needs the user, not just news. */
export const isUrgent = (kind: NoticeKind): boolean =>
  kind === 'permission' || kind === 'error' || kind === 'waiting'
