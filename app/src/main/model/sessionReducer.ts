import type { Message, SessionState } from '../../shared/types'

type Line = Record<string, unknown>
type Block = Record<string, unknown>

const MAX_MESSAGES = 20

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
    case 'user':
    case 'assistant':
      return applyConversationLine(touch(state, line), line)
    default:
      return state
  }
}

function touch(state: SessionState, line: Line): SessionState {
  const at = str(line['timestamp'])
  const cwd = str(line['cwd'])
  return { ...state, lastActivityAt: at ?? state.lastActivityAt, cwd: cwd ?? state.cwd }
}

function applyConversationLine(state: SessionState, line: Line): SessionState {
  const message = line['message'] as { content?: unknown } | undefined
  const at = str(line['timestamp']) ?? ''
  const role = line['type'] as Message['role']
  const content = message?.content

  if (typeof content === 'string') return pushMessage(state, { role, text: content, at })
  if (!Array.isArray(content)) return state

  const text = (content as Block[])
    .filter((b) => b['type'] === 'text' && typeof b['text'] === 'string')
    .map((b) => b['text'] as string)
    .join('\n')
  return text ? pushMessage(state, { role, text, at }) : state
}

function pushMessage(state: SessionState, message: Message): SessionState {
  return { ...state, messages: [...state.messages, message].slice(-MAX_MESSAGES) }
}

const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)
