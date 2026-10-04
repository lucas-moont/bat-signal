import { beforeEach, describe, expect, it } from 'vitest'
import { applyTranscriptLine, createSession } from '../src/main/model/sessionReducer'
import type { SessionState } from '../src/shared/types'
import { aiTitle, customTitle, resetClock, SESSION_ID } from './fixtures/lines'

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
