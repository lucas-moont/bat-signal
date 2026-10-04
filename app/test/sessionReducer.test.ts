import { beforeEach, describe, expect, it } from 'vitest'
import { applyTranscriptLine, createSession } from '../src/main/model/sessionReducer'
import type { SessionState } from '../src/shared/types'
import {
  aiTitle,
  assistantText,
  customTitle,
  resetClock,
  SESSION_ID,
  toolResult,
  toolUse,
  userText,
} from './fixtures/lines'

const replay = (lines: unknown[]): SessionState => lines.reduce(applyTranscriptLine, createSession(SESSION_ID))

beforeEach(resetClock)

describe('title', () => {
  it('uses the AI-generated title', () => {
    expect(replay([aiTitle('Fix the Batmobile')]).title).toBe('Fix the Batmobile')
  })

  it('prefers a custom title over the AI title, whatever the order', () => {
    expect(replay([customTitle('Gotham patrol'), aiTitle('Fix the Batmobile')]).title).toBe('Gotham patrol')
  })
})

describe('messages', () => {
  it('records user prompts and assistant replies in order', () => {
    const s = replay([userText('Where is the Riddler?'), assistantText('Checking the GCPD files.')])
    expect(s.messages).toEqual([
      { role: 'user', text: 'Where is the Riddler?', at: '2026-01-01T00:00:01.000Z' },
      { role: 'assistant', text: 'Checking the GCPD files.', at: '2026-01-01T00:00:02.000Z' },
    ])
  })

  it('ignores tool calls and tool results', () => {
    const s = replay([toolUse('toolu_1', 'Bash', { command: 'ls' }), toolResult('toolu_1', { stdout: 'x' })])
    expect(s.messages).toEqual([])
  })

  it('keeps only the 20 most recent messages', () => {
    const s = replay(Array.from({ length: 25 }, (_, i) => assistantText(`reply ${i}`)))
    expect(s.messages).toHaveLength(20)
    expect(s.messages[0]?.text).toBe('reply 5')
  })

  it('tracks cwd and the time of the latest activity', () => {
    const s = replay([userText('hi'), assistantText('hello')])
    expect(s.cwd).toBe('/home/bruce/wayne-enterprises')
    expect(s.lastActivityAt).toBe('2026-01-01T00:00:02.000Z')
  })
})
