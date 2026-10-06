import { describe, expect, it } from 'vitest'
import {
  announce,
  emptyAnnouncer,
  GROUP_OF_KIND,
  toastFor,
  type AnnounceContext,
} from '../src/shared/announcer'
import type { Notice, NoticeKind } from '../src/shared/notices'
import { createSession } from '../src/main/model/sessionReducer'
import { DEFAULT_SETTINGS, NEWS_GROUPS, type NewsGroup } from '../src/shared/settings'
import type { AttentionItem, SessionSnapshot, StoreSnapshot, Task } from '../src/shared/types'

const session = (sessionId: string, extra: Partial<SessionSnapshot> = {}): SessionSnapshot => ({
  ...createSession(sessionId),
  title: `Case ${sessionId}`,
  pid: 1,
  status: 'idle',
  signals: {},
  ...extra,
})
const task = (id: string, status: Task['status']): Task => ({
  id,
  subject: `Task ${id}`,
  status,
  history: [],
})
const alert = (
  sessionId: string,
  kind: AttentionItem['kind'],
  at = '2026-01-01T00:00:00.000Z',
): AttentionItem => ({
  sessionId,
  kind,
  at,
})
const snap = (sessions: SessionSnapshot[], attention: AttentionItem[] = []): StoreSnapshot => ({
  sessions,
  attention,
})

/** Toasts on for the given groups only; the panel not in front. */
const ctx = (on: NewsGroup[] = [...NEWS_GROUPS], panelFocused = false): AnnounceContext => ({
  prefs: {
    ...DEFAULT_SETTINGS.announce,
    toast: Object.fromEntries(NEWS_GROUPS.map((g) => [g, on.includes(g)])) as Record<NewsGroup, boolean>,
  },
  panelFocused,
})

/** Feeds snapshots in order and returns the kinds of news that came out for a toast. */
function toastKinds(snapshots: StoreSnapshot[], context: AnnounceContext): NoticeKind[] {
  let state = emptyAnnouncer()
  return snapshots.flatMap((s) => {
    const out = announce(state, s, context)
    state = out.state
    return out.toast.map((n) => n.kind)
  })
}

const quiet = snap([session('a')])

/** One piece of news of each switch's kinds, from the quiet state. */
const NEWS_OF: Record<NewsGroup, { snapshot: StoreSnapshot; kind: NoticeKind }> = {
  needsYou: { snapshot: snap([session('a')], [alert('a', 'permission')]), kind: 'permission' },
  reply: { snapshot: snap([session('a')], [alert('a', 'reply')]), kind: 'reply' },
  taskDone: { snapshot: snap([session('a', { tasks: [task('1', 'completed')] })]), kind: 'task-done' },
  sessions: { snapshot: snap([session('a'), session('b')]), kind: 'session-opened' },
}
const before: Record<NewsGroup, StoreSnapshot> = {
  needsYou: quiet,
  reply: quiet,
  taskDone: snap([session('a', { tasks: [task('1', 'in_progress')] })]),
  sessions: quiet,
}

describe('announce', () => {
  it('says nothing on the first snapshot: it is the state, not news', () => {
    expect(toastKinds([snap([session('a')], [alert('a', 'permission')])], ctx())).toEqual([])
  })

  it.each(NEWS_GROUPS)('lets the %s switch alone decide its news', (group) => {
    const { snapshot, kind } = NEWS_OF[group]
    expect(toastKinds([before[group], snapshot], ctx([group]))).toEqual([kind])
    expect(toastKinds([before[group], snapshot], ctx(NEWS_GROUPS.filter((g) => g !== group)))).toEqual([])
  })

  it('stays quiet while the panel is in front: the user already sees it', () => {
    expect(toastKinds([quiet, snap([session('a')], [alert('a', 'error')])], ctx(undefined, true))).toEqual([])
  })

  it('never brings the same news back, even if it was not shown the first time', () => {
    const news = snap([session('a')], [alert('a', 'waiting')])
    // Seen while the panel was in front, gone, then back: still the same news.
    const steps: [StoreSnapshot, AnnounceContext][] = [
      [quiet, ctx()],
      [news, ctx(undefined, true)],
      [quiet, ctx()],
    ]
    let state = emptyAnnouncer()
    for (const [snapshot, context] of steps) state = announce(state, snapshot, context).state
    expect(announce(state, news, ctx()).toast).toEqual([])
  })
})

const notice = (kind: NoticeKind, sessionId = 'a'): Notice => ({
  key: `${sessionId}:${kind}`,
  kind,
  sessionId,
  at: '',
  stamp: kind === 'reply' ? 'New reply' : kind === 'permission' ? 'Permission' : 'Case closed',
  title: `Case ${sessionId}`,
  line: kind === 'reply' ? 'Claude finished replying' : 'A line',
})

describe('toastFor', () => {
  it('puts a piece of news in the cards’ own words, opening its case', () => {
    expect(toastFor([notice('reply')])).toEqual({
      sessionId: 'a',
      title: 'New reply · Case a',
      body: 'Claude finished replying',
    })
  })

  it('makes one toast of a burst, even one that came in several pushes: the most urgent, counting the rest', () => {
    const toast = toastFor([notice('reply', 'a'), notice('task-done', 'a'), notice('permission', 'b')])
    expect(toast?.sessionId).toBe('b')
    expect(toast?.title).toBe('Permission · Case b')
    expect(toast?.body).toBe('A line\n+2 more')
  })

  it('opens no case for a case that closed: it is gone from the panel', () => {
    expect(toastFor([notice('session-closed')])).not.toHaveProperty('sessionId')
  })

  it('is nothing for no news', () => {
    expect(toastFor([])).toBeUndefined()
  })
})

describe('GROUP_OF_KIND', () => {
  it.each([
    ['permission', 'needsYou'],
    ['error', 'needsYou'],
    ['waiting', 'needsYou'],
    ['reply', 'reply'],
    ['task-done', 'taskDone'],
    ['session-opened', 'sessions'],
    ['session-closed', 'sessions'],
  ] as [NoticeKind, NewsGroup][])('puts %s under the %s switch', (kind, group) => {
    expect(GROUP_OF_KIND[kind]).toBe(group)
  })
})
