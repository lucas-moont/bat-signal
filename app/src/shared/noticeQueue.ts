// The order in which the Bat-Signal shows its notice cards. Pure: callers pass the time.
import { byUrgency, type Notice } from './notices'

/** How long each notice card stays out before the next one (or the signal alone). */
export const NOTICE_MS = 6000
/** How many announced keys to remember: far more than ever change between two snapshots. */
const MEMORY = 500

export interface NoticeQueue {
  showing?: { notice: Notice; since: number }
  waiting: Notice[]
  /** Keys already queued or shown, so the same news never comes back. */
  announced: ReadonlySet<string>
}

export const emptyQueue = (): NoticeQueue => ({ waiting: [], announced: new Set() })

/**
 * The notices not announced before, and the memory with them added: the most recent MEMORY keys,
 * or the very same memory when nothing is new.
 */
export function freshen(
  announced: ReadonlySet<string>,
  notices: readonly Notice[],
): { fresh: Notice[]; announced: ReadonlySet<string> } {
  const fresh = notices.filter((n) => !announced.has(n.key))
  if (!fresh.length) return { fresh, announced }
  return { fresh, announced: new Set([...announced, ...fresh.map((n) => n.key)].slice(-MEMORY)) }
}

/** Shows the next waiting notice from `now`, or nothing. */
function showNext(queue: NoticeQueue, now: number): NoticeQueue {
  const [next, ...rest] = queue.waiting
  return { ...queue, showing: next && { notice: next, since: now }, waiting: rest }
}

/** Adds news; the most urgent waits first (a stable sort keeps arrival order among equals). */
export function enqueue(queue: NoticeQueue, notices: Notice[], now: number): NoticeQueue {
  const { fresh, announced } = freshen(queue.announced, notices)
  if (!fresh.length) return queue
  const next = { ...queue, waiting: [...queue.waiting, ...fresh].sort(byUrgency), announced }
  return next.showing ? next : showNext(next, now)
}

/** Moves on once the card on screen has had its NOTICE_MS. */
export function advance(queue: NoticeQueue, now: number): NoticeQueue {
  return queue.showing && now - queue.showing.since >= NOTICE_MS ? showNext(queue, now) : queue
}

/** The panel is open, so the user sees everything: drop the cards, keep the memory of them. */
export const silence = (queue: NoticeQueue): NoticeQueue => ({ waiting: [], announced: queue.announced })
