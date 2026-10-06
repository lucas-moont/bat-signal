// What news goes beyond the Bat-Signal itself, as a Windows toast: the switches the user turned
// on, and none while the panel is in front. Pure: the main process passes the snapshots and the
// moment's context, and gathers what comes out into one toast per burst.
import { byUrgency, diffNotices, freshen, type Notice, type NoticeKind } from './notices'
import type { AnnouncePrefs, NewsGroup } from './settings'
import type { StoreSnapshot } from './types'

/** The switch each kind of news answers to. */
export const GROUP_OF_KIND: Record<NoticeKind, NewsGroup> = {
  permission: 'needsYou',
  error: 'needsYou',
  waiting: 'needsYou',
  reply: 'reply',
  'task-done': 'taskDone',
  'session-opened': 'sessions',
  'session-closed': 'sessions',
}

export interface Announcer {
  /** The snapshot news is found against. */
  prev?: StoreSnapshot
  /** Keys already announced (or passed over), so the same news never comes back. */
  announced: ReadonlySet<string>
}

export const emptyAnnouncer = (): Announcer => ({ announced: new Set() })

export interface AnnounceContext {
  prefs: AnnouncePrefs
  /** The user sees the news already (see BatSignalWindows.panelFocused). */
  panelFocused: boolean
}

export interface Toast {
  /** The case a click opens; none for a case that closed. */
  sessionId?: string
  title: string
  body: string
}

/** Takes a new snapshot: all its news is remembered, and the news the user picked for a toast comes out. */
export function announce(
  state: Announcer,
  snapshot: StoreSnapshot,
  ctx: AnnounceContext,
): { state: Announcer; toast: Notice[] } {
  const { fresh, announced } = freshen(state.announced, diffNotices(state.prev, snapshot))
  const next = { prev: snapshot, announced }
  // With the panel in front, the news is remembered all the same: it was seen there.
  if (ctx.panelFocused) return { state: next, toast: [] }
  return { state: next, toast: fresh.filter((n) => ctx.prefs.toast[GROUP_OF_KIND[n.kind]]) }
}

/**
 * One toast for a burst of news, however many pushes it came in: the most urgent, in the cards'
 * own words (the stamp and the case, then the line), with a count of the rest.
 */
export function toastFor(news: readonly Notice[]): Toast | undefined {
  const [first, ...rest] = [...news].sort(byUrgency)
  if (!first) return undefined
  return {
    ...(first.kind !== 'session-closed' && { sessionId: first.sessionId }),
    title: `${first.stamp} · ${first.title}`,
    body: rest.length ? `${first.line}\n+${rest.length} more` : first.line,
  }
}
