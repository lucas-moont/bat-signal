import { describe, expect, it } from 'vitest'
import { attentionCopy, caseHeader, mascotMood, relativeTime } from '../src/shared/view'
import type { AttentionItem, SessionSnapshot, StoreSnapshot } from '../src/shared/types'
import { createSession } from '../src/main/model/sessionReducer'

const session = (status: SessionSnapshot['status']): SessionSnapshot => ({
  ...createSession(`s-${status}`),
  pid: 1,
  status,
  signals: {},
})
const item = (kind: AttentionItem['kind']): AttentionItem => ({
  sessionId: 's',
  kind,
  at: '2026-01-01T00:00:00.000Z',
})
const snapshot = (sessions: SessionSnapshot[], attention: AttentionItem[] = []): StoreSnapshot => ({
  sessions,
  attention,
})

describe('mascotMood', () => {
  it('sleeps when nothing is happening', () => {
    expect(mascotMood(snapshot([session('idle')]))).toBe('sleeping')
  })
})

describe('mascotMood when something happens', () => {
  it('flies while any session is working', () => {
    expect(mascotMood(snapshot([session('idle'), session('busy')]))).toBe('flying')
  })

  it.each(['permission', 'error'] as const)('is alarmed by a pending %s, even while working', (kind) => {
    expect(mascotMood(snapshot([session('busy')], [item(kind)]))).toBe('alarmed')
  })

  it('does not panic over a reply or a wait', () => {
    expect(mascotMood(snapshot([session('idle')], [item('reply'), item('waiting')]))).toBe('sleeping')
  })
})

describe('relativeTime', () => {
  const now = new Date('2026-03-10T15:00:00.000Z')
  const ago = (ms: number) => new Date(now.getTime() - ms).toISOString()
  const MIN = 60_000

  it.each([
    [ago(20_000), 'now'],
    [ago(2 * MIN), '2m'],
    [ago(59 * MIN), '59m'],
    [ago(3 * 60 * MIN), '3h'],
    [ago(30 * 60 * MIN), '1d'],
    [ago(9 * 24 * 60 * MIN), '9d'],
  ])('%s → %s', (iso, expected) => {
    expect(relativeTime(iso, now)).toBe(expected)
  })

  it('treats a time slightly in the future (clock skew) as now', () => {
    expect(relativeTime(new Date(now.getTime() + 5000).toISOString(), now)).toBe('now')
  })

  it('returns an empty string for a missing or broken time', () => {
    expect(relativeTime(undefined, now)).toBe('')
    expect(relativeTime('', now)).toBe('')
    expect(relativeTime('not a date', now)).toBe('')
  })
})

describe('attentionCopy', () => {
  const base = { sessionId: 's', at: '2026-01-01T00:00:00.000Z' }

  it.each<[AttentionItem, { stamp: string; line: string }]>([
    [
      { ...base, kind: 'permission', toolName: 'Bash', detail: 'npm install' },
      { stamp: 'Permission', line: 'Bash · npm install' },
    ],
    [
      { ...base, kind: 'permission', toolName: 'WebFetch' },
      { stamp: 'Permission', line: 'WebFetch' },
    ],
    [
      { ...base, kind: 'error', detail: 'rate_limit' },
      { stamp: 'Error', line: 'Rate limit' },
    ],
    [
      { ...base, kind: 'waiting' },
      { stamp: 'Waiting', line: 'Claude is waiting for you' },
    ],
    [
      { ...base, kind: 'reply' },
      { stamp: 'New reply', line: 'Claude finished replying' },
    ],
    [
      { ...base, kind: 'stalled', detail: 'Scan Gotham' },
      { stamp: 'Stalled', line: 'No news on “Scan Gotham”' },
    ],
  ])('%o', (attention, expected) => {
    expect(attentionCopy(attention)).toEqual(expected)
  })

  it('falls back gracefully when details are missing', () => {
    expect(attentionCopy({ ...base, kind: 'error' })).toEqual({ stamp: 'Error', line: 'The turn failed' })
    expect(attentionCopy({ ...base, kind: 'stalled' })).toEqual({
      stamp: 'Stalled',
      line: 'A task has gone quiet',
    })
  })
})

describe('caseHeader', () => {
  const task = (id: string, status: 'pending' | 'in_progress' | 'completed') => ({
    id,
    subject: id,
    status,
    history: [],
  })

  it('numbers the case from its session id and uses its title', () => {
    const s = { ...session('idle'), sessionId: '289380bc-e921-42d9', title: 'Fix the Batmobile' }
    expect(caseHeader(s)).toMatchObject({ number: '#289380', title: 'Fix the Batmobile' })
  })

  it('falls back to the session name, then to a placeholder', () => {
    expect(caseHeader({ ...session('idle'), name: 'wayne-enterprises-1' }).title).toBe('wayne-enterprises-1')
    expect(caseHeader(session('idle')).title).toBe('Untitled case')
  })

  it('counts finished tasks', () => {
    const s = {
      ...session('busy'),
      tasks: [task('1', 'completed'), task('2', 'in_progress'), task('3', 'pending')],
    }
    expect(caseHeader(s).progress).toEqual({ done: 1, total: 3, label: '1/3' })
  })

  it('has no progress without tasks', () => {
    expect(caseHeader(session('idle')).progress).toBeUndefined()
  })
})
