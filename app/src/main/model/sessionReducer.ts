import type { Message, PendingToolUse, SessionState, Task, TaskStatus } from '../../shared/types'

type Line = Record<string, unknown>
type Block = Record<string, unknown>

const MAX_MESSAGES = 20
// User-side lines that Claude Code writes itself (slash commands, their output, task notifications).
const INJECTED = /^<(command-|local-command-|task-notification)/

export function createSession(sessionId: string): SessionState {
  return { sessionId, messages: [], tasks: [], subagents: [], background: [], pendingToolUses: {} }
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

  if (line['isMeta'] === true) return state
  if (typeof content === 'string') {
    return INJECTED.test(content) ? state : pushMessage(state, { role, text: content, at })
  }
  if (!Array.isArray(content)) return state

  let next = state
  const texts: string[] = []
  for (const block of content as Block[]) {
    if (block['type'] === 'text' && typeof block['text'] === 'string') texts.push(block['text'])
    else if (block['type'] === 'tool_use') next = registerToolUse(next, block, at)
    else if (block['type'] === 'tool_result') next = resolveToolUse(next, block, line['toolUseResult'], at)
  }
  return texts.length ? pushMessage(next, { role, text: texts.join('\n'), at }) : next
}

function pushMessage(state: SessionState, message: Message): SessionState {
  return { ...state, messages: [...state.messages, message].slice(-MAX_MESSAGES) }
}

function registerToolUse(state: SessionState, block: Block, at: string): SessionState {
  const id = str(block['id'])
  const name = str(block['name'])
  if (!id || !name) return state
  const input = (block['input'] ?? {}) as Record<string, unknown>
  return { ...state, pendingToolUses: { ...state.pendingToolUses, [id]: { name, input, at } } }
}

function resolveToolUse(state: SessionState, block: Block, result: unknown, at: string): SessionState {
  const id = str(block['tool_use_id'])
  const pending = id ? state.pendingToolUses[id] : undefined
  if (!id || !pending) return state

  const { [id]: _done, ...rest } = state.pendingToolUses
  const next = { ...state, pendingToolUses: rest }
  if (block['is_error'] === true) return next

  const res = (result && typeof result === 'object' ? result : {}) as Record<string, unknown>
  switch (pending.name) {
    case 'TaskCreate':
      return onTaskCreated(next, pending, res, at)
    case 'TaskUpdate':
      return onTaskUpdated(next, pending, res, at)
    default:
      return next
  }
}

function onTaskCreated(
  state: SessionState,
  pending: PendingToolUse,
  res: Record<string, unknown>,
  at: string,
): SessionState {
  const created = res['task'] as { id?: unknown; subject?: unknown } | undefined
  const id = str(created?.id)
  if (!id) return state
  const task: Task = {
    id,
    subject: str(created?.subject) ?? str(pending.input['subject']) ?? '',
    description: str(pending.input['description']),
    activeForm: str(pending.input['activeForm']),
    status: 'pending',
    history: [{ status: 'pending', at }],
  }
  return { ...state, tasks: [...state.tasks.filter((t) => t.id !== id), task] }
}

function onTaskUpdated(
  state: SessionState,
  pending: PendingToolUse,
  res: Record<string, unknown>,
  at: string,
): SessionState {
  const id = str(res['taskId']) ?? str(pending.input['taskId'])
  const fields = Array.isArray(res['updatedFields']) ? (res['updatedFields'] as string[]) : []
  const to = str((res['statusChange'] as { to?: unknown } | undefined)?.to) as TaskStatus | undefined

  if (to === 'deleted') return { ...state, tasks: state.tasks.filter((t) => t.id !== id) }

  const tasks = state.tasks.map((task) => {
    if (task.id !== id) return task
    const updated: Task = { ...task }
    for (const field of ['subject', 'description', 'activeForm'] as const) {
      const value = str(pending.input[field])
      if (fields.includes(field) && value !== undefined) updated[field] = value
    }
    if (to && to !== task.status) {
      updated.status = to
      updated.history = [...task.history, { status: to, at }]
    }
    return updated
  })
  return { ...state, tasks }
}

const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined)
