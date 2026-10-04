import type {
  BackgroundJob,
  Message,
  PendingToolUse,
  RunStatus,
  SessionState,
  Subagent,
  Task,
  TaskStatus,
} from '../../shared/types'

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
    case 'queue-operation':
      return line['operation'] === 'enqueue' ? applyTaskNotification(state, line) : state
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
  const next = { ...state, pendingToolUses: { ...state.pendingToolUses, [id]: { name, input, at } } }
  if (name !== 'Agent') return next

  const subagent: Subagent = {
    toolUseId: id,
    description: str(input['description']) ?? '',
    agentType: str(input['subagent_type']) ?? 'general-purpose',
    prompt: str(input['prompt']),
    status: 'running',
    startedAt: at,
  }
  return { ...next, subagents: [...next.subagents, subagent] }
}

function resolveToolUse(state: SessionState, block: Block, result: unknown, at: string): SessionState {
  const id = str(block['tool_use_id'])
  const pending = id ? state.pendingToolUses[id] : undefined
  if (!id || !pending) return state

  const { [id]: _done, ...rest } = state.pendingToolUses
  const next = { ...state, pendingToolUses: rest }
  const failed = block['is_error'] === true
  if (pending.name === 'Agent') return onAgentResult(next, id, result, failed, at)
  if (failed) return next

  const res = (result && typeof result === 'object' ? result : {}) as Record<string, unknown>
  switch (pending.name) {
    case 'TaskCreate':
      return onTaskCreated(next, pending, res, at)
    case 'TaskUpdate':
      return onTaskUpdated(next, pending, res, at)
    case 'Bash':
      return onBashResult(next, id, pending, res, at)
    case 'TaskStop':
      return finishJob(next, str(res['task_id']) ?? str(pending.input['task_id']), 'stopped', at)
    default:
      return next
  }
}

// Background agents and teammates answer right away and finish later via a task notification.
const STILL_RUNNING = new Set(['async_launched', 'teammate_spawned'])

function onAgentResult(
  state: SessionState,
  toolUseId: string,
  result: unknown,
  failed: boolean,
  at: string,
): SessionState {
  const res = (result && typeof result === 'object' ? result : {}) as Record<string, unknown>
  const agentId = str(res['agentId']) ?? str(res['agent_id'])
  const stillRunning = !failed && STILL_RUNNING.has(str(res['status']) ?? '')
  return updateSubagent(
    state,
    (a) => a.toolUseId === toolUseId,
    (a) =>
      stillRunning
        ? { ...a, agentId: agentId ?? a.agentId }
        : { ...a, agentId: agentId ?? a.agentId, status: failed ? 'failed' : 'completed', endedAt: at },
  )
}

function onBashResult(
  state: SessionState,
  toolUseId: string,
  pending: PendingToolUse,
  res: Record<string, unknown>,
  at: string,
): SessionState {
  const jobId = str(res['backgroundTaskId'])
  if (!jobId) return state
  const job: BackgroundJob = {
    id: jobId,
    toolUseId,
    command: str(pending.input['command']) ?? '',
    description: str(pending.input['description']),
    status: 'running',
    startedAt: at,
  }
  return { ...state, background: [...state.background.filter((j) => j.id !== jobId), job] }
}

const NOTIFICATION_STATUS: Record<string, RunStatus> = {
  completed: 'completed',
  failed: 'failed',
  killed: 'stopped',
  stopped: 'stopped',
}

function applyTaskNotification(state: SessionState, line: Line): SessionState {
  const content = str(line['content']) ?? ''
  if (!content.startsWith('<task-notification>')) return state
  const tag = (name: string) => content.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1]?.trim()
  const status = NOTIFICATION_STATUS[tag('status') ?? '']
  if (!status) return state

  const taskId = tag('task-id')
  const toolUseId = tag('tool-use-id')
  const summary = tag('summary') || undefined
  const at = str(line['timestamp']) ?? ''
  const matches = (ids: (string | undefined)[]) => ids.some((x) => x && (x === taskId || x === toolUseId))

  const withAgent = updateSubagent(
    state,
    (a) => a.status === 'running' && matches([a.agentId, a.toolUseId]),
    (a) => ({ ...a, status, endedAt: at, summary: summary ?? a.summary }),
  )
  const background = withAgent.background.map((j) =>
    j.status === 'running' && matches([j.id, j.toolUseId]) ? { ...j, status, endedAt: at } : j,
  )
  return { ...withAgent, background }
}

function finishJob(
  state: SessionState,
  jobId: string | undefined,
  status: RunStatus,
  at: string,
): SessionState {
  if (!jobId) return state
  const background = state.background.map((j) =>
    j.id === jobId && j.status === 'running' ? { ...j, status, endedAt: at } : j,
  )
  return { ...state, background }
}

function updateSubagent(
  state: SessionState,
  match: (a: Subagent) => boolean,
  update: (a: Subagent) => Subagent,
): SessionState {
  return { ...state, subagents: state.subagents.map((a) => (match(a) ? update(a) : a)) }
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
