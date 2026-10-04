// What the Bat-Signal announces: news found by comparing two snapshots.
import {
  ATTENTION_URGENCY,
  type AttentionItem,
  type AttentionKind,
  type SessionSnapshot,
  type StoreSnapshot,
} from './types'
import { attentionCopy, caseHeader, folderName } from './view'

/** The needs-you alerts worth announcing; a stalled task is not news. */
const ALERT_KINDS = ['permission', 'error', 'waiting', 'reply'] as const satisfies readonly AttentionKind[]
type AlertKind = (typeof ALERT_KINDS)[number]

export type NoticeKind = AlertKind | 'task-done' | 'session-opened' | 'session-closed'

export interface Notice {
  /** Stable identity, so the same news is never announced twice. */
  key: string
  kind: NoticeKind
  sessionId: string
  at: string
  /** The red ink stamp: the same words as on the panel's cards. */
  stamp: string
  /** The case it is about. */
  title: string
  /** One line of detail. */
  line: string
}

/** Most urgent first; alerts keep the needs-you list's order. */
export const NOTICE_URGENCY: Record<NoticeKind, number> = {
  ...(Object.fromEntries(ALERT_KINDS.map((k) => [k, ATTENTION_URGENCY[k]])) as Record<AlertKind, number>),
  'task-done': 10,
  'session-opened': 11,
  'session-closed': 12,
}

/** News that needs the user, not just news. */
export const isUrgent = (kind: NoticeKind): boolean => NOTICE_URGENCY[kind] <= NOTICE_URGENCY.waiting

const isAnnounced = (a: AttentionItem): a is AttentionItem & { kind: AlertKind } =>
  (ALERT_KINDS as readonly string[]).includes(a.kind)

const alertKey = (a: AttentionItem) => `${a.sessionId}:${a.kind}:${a.at}`

/** News between two snapshots. The first snapshot announces nothing: it is the state, not news. */
export function diffNotices(prev: StoreSnapshot | undefined, next: StoreSnapshot): Notice[] {
  if (!prev) return []
  const before = new Map(prev.sessions.map((s) => [s.sessionId, s]))
  const after = new Map(next.sessions.map((s) => [s.sessionId, s]))
  const title = (id: string) => {
    const s = after.get(id) ?? before.get(id)
    return s ? caseHeader(s).title : 'Unknown case'
  }
  const notice = (
    s: Pick<SessionSnapshot, 'sessionId'>,
    fields: Omit<Notice, 'sessionId' | 'title'>,
  ): Notice => ({
    ...fields,
    sessionId: s.sessionId,
    title: title(s.sessionId),
  })

  const known = new Set(prev.attention.map(alertKey))
  const alerts = next.attention
    .filter(isAnnounced)
    .filter((a) => !known.has(alertKey(a)))
    .map((a) => notice(a, { key: alertKey(a), kind: a.kind, at: a.at, ...attentionCopy(a) }))

  const tasks: Notice[] = []
  const opened: Notice[] = []
  for (const s of next.sessions) {
    const old = before.get(s.sessionId)
    if (!old) {
      // A session that just appeared: announce it, not the work it already finished.
      opened.push(
        notice(s, {
          key: `${s.sessionId}:opened`,
          kind: 'session-opened',
          at: s.lastActivityAt ?? '',
          stamp: 'Case opened',
          line: folderName(s.cwd ?? '') || 'New session',
        }),
      )
      continue
    }
    const wasDone = new Set(old.tasks.filter((t) => t.status === 'completed').map((t) => t.id))
    for (const t of s.tasks) {
      if (t.status !== 'completed' || wasDone.has(t.id)) continue
      tasks.push(
        notice(s, {
          key: `${s.sessionId}:task:${t.id}`,
          kind: 'task-done',
          at: t.history.at(-1)?.at ?? '',
          stamp: 'Task done',
          line: t.subject,
        }),
      )
    }
  }
  const closed = prev.sessions
    .filter((s) => !after.has(s.sessionId))
    .map((s) =>
      notice(s, {
        key: `${s.sessionId}:closed`,
        kind: 'session-closed',
        at: s.lastActivityAt ?? '',
        stamp: 'Case closed',
        line: 'Session ended',
      }),
    )

  return [...alerts, ...tasks, ...opened, ...closed]
}
