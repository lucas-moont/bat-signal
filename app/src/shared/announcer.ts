// What news goes beyond the Bat-Signal itself, as a Windows toast: the switches the user turned
// on, and not while the panel is in front. Pure: the main process passes the snapshots and the
// moment's context, and shows what comes out.
import { freshen } from './noticeQueue'
import { byUrgency, diffNotices, type Notice, type NoticeKind } from './notices'
import type { AnnouncePrefs, NewsGroup } from './settings'
import type { StoreSnapshot } from './types'

/** The switch each kind of news answers to. */
export const NEWS_GROUP: Record<NoticeKind, NewsGroup> = {
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
  /** The panel (or the strip) is the window in front: the user sees the news already. */
  panelFocused: boolean
}

export interface Toast {
  /** The case a click opens. */
  sessionId: string
  title: string
  body: string
}

type Gate = (notice: Notice, ctx: AnnounceContext) => boolean

/** Every one must pass for news to become a toast. */
const TOAST_GATES: Gate[] = [
  (notice, ctx) => ctx.prefs.toast[NEWS_GROUP[notice.kind]],
  (_notice, ctx) => !ctx.panelFocused,
]

/** The cards' own words: the stamp and the case, then the line, then how much else came. */
const toastOf = (first: Notice, more: number): Toast => ({
  sessionId: first.sessionId,
  title: `${first.stamp} · ${first.title}`,
  body: more ? `${first.line}\n+${more} more` : first.line,
})

/** Takes a new snapshot: the news in it is remembered, and what passes the gates comes out as one toast. */
export function announce(
  state: Announcer,
  snapshot: StoreSnapshot,
  ctx: AnnounceContext,
): { state: Announcer; toast?: Toast } {
  const { fresh, announced } = freshen(state.announced, diffNotices(state.prev, snapshot))
  const next = { prev: snapshot, announced }
  const [first, ...rest] = fresh.filter((n) => TOAST_GATES.every((gate) => gate(n, ctx))).sort(byUrgency)
  return first ? { state: next, toast: toastOf(first, rest.length) } : { state: next }
}
