import { describe, expect, it } from 'vitest'
import { mascotMood, relativeTime } from '../src/shared/view'
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
