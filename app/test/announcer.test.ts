import { describe, expect, it } from 'vitest'
import { announce, emptyAnnouncer, NEWS_GROUP, type AnnounceContext } from '../src/shared/announcer'
import type { NoticeKind } from '../src/shared/notices'
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
const done = (id: string): Task => ({ id, subject: `Task ${id}`, status: 'completed', history: [] })
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

/** Feeds snapshots in order and returns every toast that came out. */
function toasts(snapshots: StoreSnapshot[], context: AnnounceContext) {
  let state = emptyAnnouncer()
  return snapshots.flatMap((s) => {
    const out = announce(state, s, context)
    state = out.state
    return out.toast ? [out.toast] : []
  })
}

const quiet = snap([session('a')])

describe('announce', () => {
  it('says nothing on the first snapshot: it is the state, not news', () => {
    expect(toasts([snap([session('a')], [alert('a', 'permission')])], ctx())).toEqual([])
  })

  it('turns news of a switched-on kind into a toast about its case', () => {
    expect(toasts([quiet, snap([session('a')], [alert('a', 'reply')])], ctx(['reply']))).toEqual([
      { sessionId: 'a', title: 'New reply · Case a', body: 'Claude finished replying' },
    ])
  })

  it('leaves news of a switched-off kind to the Bat-Signal alone', () => {
    expect(toasts([quiet, snap([session('a')], [alert('a', 'reply')])], ctx(['needsYou']))).toEqual([])
  })

  it('stays quiet while the panel is in front: the user already sees it', () => {
    expect(toasts([quiet, snap([session('a')], [alert('a', 'error')])], ctx(undefined, true))).toEqual([])
  })

  it('sends one toast per burst: the most urgent, with a count of the rest', () => {
    const burst = snap(
      [session('a', { tasks: [done('1')] }), session('b')],
      [alert('a', 'reply'), alert('b', 'permission')],
    )
    const before = snap([session('a', { tasks: [{ ...done('1'), status: 'in_progress' }] }), session('b')])
    const [toast] = toasts([before, burst], ctx())
    expect(toast?.sessionId).toBe('b')
    expect(toast?.title).toMatch(/· Case b$/)
    expect(toast?.body).toMatch(/\n\+2 more$/)
  })

  it('counts only the news that would have made a toast', () => {
    const burst = snap([session('a')], [alert('a', 'reply'), alert('a', 'permission')])
    const [toast] = toasts([quiet, burst], ctx(['reply']))
    expect(toast?.title).toBe('New reply · Case a')
    expect(toast?.body).not.toMatch(/more/)
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
    expect(announce(state, news, ctx()).toast).toBeUndefined()
  })
})

describe('NEWS_GROUP', () => {
  it.each([
    ['permission', 'needsYou'],
    ['error', 'needsYou'],
    ['waiting', 'needsYou'],
    ['reply', 'reply'],
    ['task-done', 'taskDone'],
    ['session-opened', 'sessions'],
    ['session-closed', 'sessions'],
  ] as [NoticeKind, NewsGroup][])('puts %s under the %s switch', (kind, group) => {
    expect(NEWS_GROUP[kind]).toBe(group)
  })
})
