import { describe, expect, it } from 'vitest'
import type { Notice, NoticeKind } from '../src/shared/notices'
import { NOTICE_MS, advance, emptyQueue, enqueue, silence } from '../src/shared/noticeQueue'

const notice = (key: string, kind: NoticeKind = 'reply'): Notice => ({
  key,
  kind,
  sessionId: 's',
  at: '',
  stamp: '',
  title: `Case ${key}`,
  line: '',
})
const T0 = 1_000_000

describe('notice queue', () => {
  it('shows the first notice right away', () => {
    const q = enqueue(emptyQueue(), [notice('a')], T0)
    expect(q.showing).toEqual({ notice: notice('a'), since: T0 })
    expect(q.waiting).toEqual([])
  })
})

describe('notice queue order', () => {
  it('lines up the most urgent first, keeping arrival order among equals', () => {
    const q = enqueue(
      emptyQueue(),
      [notice('r1', 'reply'), notice('t', 'task-done'), notice('p', 'permission'), notice('r2', 'reply')],
      T0,
    )
    expect([q.showing?.notice.key, ...q.waiting.map((n) => n.key)]).toEqual(['p', 'r1', 'r2', 't'])
  })

  it('puts an urgent newcomer ahead of what is waiting, without cutting the card on screen', () => {
    let q = enqueue(emptyQueue(), [notice('r1'), notice('r2')], T0)
    q = enqueue(q, [notice('e', 'error')], T0 + 1000)
    expect(q.showing?.notice.key).toBe('r1')
    expect(q.waiting.map((n) => n.key)).toEqual(['e', 'r2'])
  })

  it('never announces the same news twice', () => {
    let q = enqueue(emptyQueue(), [notice('a')], T0)
    q = advance(q, T0 + NOTICE_MS)
    q = enqueue(q, [notice('a')], T0 + NOTICE_MS + 1)
    expect(q.showing).toBeUndefined()
    expect(q.waiting).toEqual([])
  })
})

describe('notice queue timing', () => {
  it('keeps a card out for NOTICE_MS, then shows the next', () => {
    let q = enqueue(emptyQueue(), [notice('a'), notice('b')], T0)
    expect(advance(q, T0 + NOTICE_MS - 1).showing?.notice.key).toBe('a')
    q = advance(q, T0 + NOTICE_MS)
    expect(q.showing).toEqual({ notice: notice('b'), since: T0 + NOTICE_MS })
  })

  it('goes quiet when the last card has had its time', () => {
    const q = advance(enqueue(emptyQueue(), [notice('a')], T0), T0 + NOTICE_MS)
    expect(q.showing).toBeUndefined()
  })
})

describe('silencing the queue', () => {
  it('drops the card on screen and everything waiting, but remembers what was announced', () => {
    let q = silence(enqueue(emptyQueue(), [notice('a'), notice('b')], T0))
    expect(q.showing).toBeUndefined()
    expect(q.waiting).toEqual([])
    q = enqueue(q, [notice('b'), notice('c')], T0 + 1)
    expect(q.showing?.notice.key).toBe('c')
  })
})

describe('notice queue memory', () => {
  it('remembers only the most recent announcements, so a long run does not grow it forever', () => {
    const many = Array.from({ length: 600 }, (_, i) => notice(`n${i}`))
    const q = enqueue(emptyQueue(), many, T0)
    expect(q.announced.size).toBe(500)
    expect(q.announced.has('n599')).toBe(true)
    expect(q.announced.has('n0')).toBe(false)
  })
})
