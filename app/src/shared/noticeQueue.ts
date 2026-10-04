// The order in which the Bat-Signal shows its notice cards. Pure: callers pass the time.
import type { Notice, NoticeKind } from './notices'

/** How long each notice card stays out before the next one (or the signal alone). */
export const NOTICE_MS = 6000

const URGENCY: Record<NoticeKind, number> = {
  permission: 0,
  error: 1,
  waiting: 2,
  reply: 3,
  'task-done': 4,
  'session-opened': 5,
  'session-closed': 6,
}

export interface NoticeQueue {
  showing?: { notice: Notice; since: number }
  waiting: Notice[]
  /** Keys already queued or shown, so the same news never comes back. */
  announced: ReadonlySet<string>
}

export const emptyQueue = (): NoticeQueue => ({ waiting: [], announced: new Set() })

/** Shows the next waiting notice from `now`, or nothing. */
function showNext(queue: NoticeQueue, now: number): NoticeQueue {
  const [next, ...rest] = queue.waiting
  return { ...queue, showing: next && { notice: next, since: now }, waiting: rest }
}

/** Adds news; the most urgent waits first (a stable sort keeps arrival order among equals). */
export function enqueue(queue: NoticeQueue, notices: Notice[], now: number): NoticeQueue {
  const fresh = notices.filter((n) => !queue.announced.has(n.key))
  if (!fresh.length) return queue
  const waiting = [...queue.waiting, ...fresh].sort((a, b) => URGENCY[a.kind] - URGENCY[b.kind])
  const next = { ...queue, waiting, announced: new Set([...queue.announced, ...fresh.map((n) => n.key)]) }
  return next.showing ? next : showNext(next, now)
}

/** Moves on once the card on screen has had its NOTICE_MS. */
export function advance(queue: NoticeQueue, now: number): NoticeQueue {
  return queue.showing && now - queue.showing.since >= NOTICE_MS ? showNext(queue, now) : queue
}

/** The user dealt with the card on screen: show the next one now. */
export const dismiss = (queue: NoticeQueue, now: number): NoticeQueue => showNext(queue, now)
