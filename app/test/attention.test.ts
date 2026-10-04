import { describe, expect, it } from 'vitest'
import { deriveAttention } from '../src/main/model/attention'
import { createSession } from '../src/main/model/sessionReducer'
import type { SessionSignals, SessionView, Task } from '../src/shared/types'

const NOW = new Date('2026-01-01T12:00:00.000Z')

const view = (sessionId: string, signals: Partial<SessionSignals> = {}, tasks: Task[] = []): SessionView => ({
  state: { ...createSession(sessionId), tasks },
  signals: { status: 'idle', ...signals },
})

const task = (id: string, status: Task['status'], since: string): Task => ({
  id,
  subject: `Task ${id}`,
  status,
  history: [{ status, at: since }],
})

describe('deriveAttention', () => {
  it('is empty when nothing needs you', () => {
    expect(deriveAttention([view('s1')], {}, NOW)).toEqual([])
  })

  it('flags a pending permission prompt with what Claude wants to do', () => {
    const items = deriveAttention(
      [
        view('s1', {
          pendingPermission: { toolName: 'Bash', detail: 'npm install', at: '2026-01-01T11:59:00.000Z' },
        }),
      ],
      {},
      NOW,
    )
    expect(items).toEqual([
      {
        sessionId: 's1',
        kind: 'permission',
        toolName: 'Bash',
        detail: 'npm install',
        at: '2026-01-01T11:59:00.000Z',
      },
    ])
  })

  it('flags a turn that ended with an error', () => {
    const items = deriveAttention(
      [view('s1', { error: { type: 'rate_limit', at: '2026-01-01T11:00:00.000Z' } })],
      {},
      NOW,
    )
    expect(items).toEqual([
      { sessionId: 's1', kind: 'error', detail: 'rate_limit', at: '2026-01-01T11:00:00.000Z' },
    ])
  })

  it('flags a reply you have not seen yet', () => {
    const items = deriveAttention([view('s1', { lastStopAt: '2026-01-01T11:30:00.000Z' })], {}, NOW)
    expect(items).toEqual([{ sessionId: 's1', kind: 'reply', at: '2026-01-01T11:30:00.000Z' }])
  })

  it('stops flagging a reply once you have seen the session after it', () => {
    const items = deriveAttention(
      [view('s1', { lastStopAt: '2026-01-01T11:30:00.000Z' })],
      { s1: '2026-01-01T11:31:00.000Z' },
      NOW,
    )
    expect(items).toEqual([])
  })

  it('does not flag a reply while the session is busy again', () => {
    const items = deriveAttention(
      [view('s1', { status: 'busy', lastStopAt: '2026-01-01T11:30:00.000Z' })],
      {},
      NOW,
    )
    expect(items).toEqual([])
  })

  it('shows "waiting for you" instead of "reply" when Claude reports it is idle', () => {
    const items = deriveAttention(
      [view('s1', { lastStopAt: '2026-01-01T11:30:00.000Z', waitingSince: '2026-01-01T11:31:00.000Z' })],
      {},
      NOW,
    )
    expect(items).toEqual([{ sessionId: 's1', kind: 'waiting', at: '2026-01-01T11:31:00.000Z' }])
  })

  it('flags a task stuck in progress for 30 minutes while the session is idle', () => {
    const items = deriveAttention(
      [
        view('s1', {}, [
          task('1', 'in_progress', '2026-01-01T11:20:00.000Z'),
          task('2', 'in_progress', '2026-01-01T11:45:00.000Z'),
        ]),
      ],
      {},
      NOW,
    )
    expect(items).toEqual([
      { sessionId: 's1', kind: 'stalled', taskId: '1', detail: 'Task 1', at: '2026-01-01T11:20:00.000Z' },
    ])
  })

  it('orders by urgency, then newest first', () => {
    const items = deriveAttention(
      [
        view('reply', { lastStopAt: '2026-01-01T11:50:00.000Z' }),
        view('perm-old', { pendingPermission: { toolName: 'Edit', at: '2026-01-01T10:00:00.000Z' } }),
        view('error', { error: { type: 'overloaded', at: '2026-01-01T11:55:00.000Z' } }),
        view('perm-new', { pendingPermission: { toolName: 'Bash', at: '2026-01-01T11:00:00.000Z' } }),
      ],
      {},
      NOW,
    )
    expect(items.map((i) => i.sessionId)).toEqual(['perm-new', 'perm-old', 'error', 'reply'])
  })
})

describe('deriveAttention edge cases', () => {
  it('counts a session seen at the exact moment of the reply as seen', () => {
    const at = '2026-01-01T11:30:00.000Z'
    expect(deriveAttention([view('s1', { lastStopAt: at })], { s1: at }, NOW)).toEqual([])
  })

  it('keeps newest-first order when an item has no timestamp', () => {
    const items = deriveAttention(
      [
        view('old', { error: { type: 'x', at: '2026-01-01T10:00:00.000Z' } }),
        view('blank', { error: { type: 'x', at: '' } }),
        view('new', { error: { type: 'x', at: '2026-01-01T11:00:00.000Z' } }),
      ],
      {},
      NOW,
    )
    expect(items.map((i) => i.sessionId)).toEqual(['new', 'old', 'blank'])
  })

  it('does not call a task stalled while its session showed activity recently', () => {
    const v = view('s1', {}, [task('1', 'in_progress', '2026-01-01T11:00:00.000Z')])
    v.state.lastActivityAt = '2026-01-01T11:55:00.000Z'
    expect(deriveAttention([v], {}, NOW)).toEqual([])
  })
})
