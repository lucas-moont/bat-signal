import type { SessionState } from '../../shared/types'

type Line = Record<string, unknown>

export function createSession(sessionId: string): SessionState {
  return { sessionId, messages: [], tasks: [], subagents: [], background: [] }
}

export function applyTranscriptLine(state: SessionState, raw: unknown): SessionState {
  if (!raw || typeof raw !== 'object') return state
  const line = raw as Line

  switch (line['type']) {
    case 'custom-title':
      return typeof line['customTitle'] === 'string'
        ? { ...state, title: line['customTitle'], titleSource: 'custom' }
        : state
    case 'ai-title':
      return typeof line['aiTitle'] === 'string' && state.titleSource !== 'custom'
        ? { ...state, title: line['aiTitle'], titleSource: 'ai' }
        : state
    default:
      return state
  }
}
