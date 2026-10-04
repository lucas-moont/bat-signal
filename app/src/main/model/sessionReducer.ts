import { obj, str, type Json } from '../../shared/guards'
import type {
  BackgroundJob,
  Message,
  Run,
  RunStatus,
  SessionState,
  Subagent,
  Task,
  TaskStatus,
} from '../../shared/types'
import { TASK_STATUSES } from '../../shared/types'

/** Session state plus the reducer's own bookkeeping, which never leaves the main process. */
export interface TrackedSession extends SessionState {
  /** Tool calls still waiting for their result, keyed by tool_use id. Only tracked tools are kept. */
  pending: Record<string, { name: string; input: Json }>
}

interface ToolResult {
  id: string
  input: Json
  output: Json
  failed: boolean
  at: string
}

interface ToolHandler {
  onCall?(state: TrackedSession, id: string, input: Json, at: string): TrackedSession
  /** Called for every result, failed or not; most handlers ignore failures. */
  onResult(state: TrackedSession, result: ToolResult): TrackedSession
}

const MAX_MESSAGES = 20
// Claude Code wraps the user-side text it writes itself (slash commands, their output,
// notifications, reminders) in a leading <tag>. Real prompts practically never start that way.
const INJECTED = /^\s*<[a-z][\w-]*>/
// Background agents and teammates answer right away and finish later via a task notification.
const STILL_RUNNING = new Set(['async_launched', 'teammate_spawned'])
const NOTIFICATION_STATUS: Record<string, RunStatus> = {
  completed: 'completed',
  failed: 'failed',
  killed: 'stopped',
  stopped: 'stopped',
}

export function createSession(sessionId: string): TrackedSession {
  return { sessionId, messages: [], tasks: [], subagents: [], background: [], pending: {} }
}

/** The part of a tracked session that is safe to hand to the renderer. */
export function toSessionState({ pending: _pending, ...state }: TrackedSession): SessionState {
  return state
}

export function applyTranscriptLine(state: TrackedSession, raw: unknown): TrackedSession {
  const line = obj(raw)
  switch (line['type']) {
    case 'custom-title': {
      const title = str(line['customTitle'])
      return title ? { ...state, title, titleSource: 'custom' } : state
    }
    case 'ai-title': {
      const title = str(line['aiTitle'])
      return title && state.titleSource !== 'custom' ? { ...state, title, titleSource: 'ai' } : state
    }
    case 'user':
    case 'assistant':
      return line['isMeta'] === true ? state : applyConversationLine(state, line)
    case 'queue-operation':
      return line['operation'] === 'enqueue'
        ? applyTaskNotification(state, str(line['content']) ?? '', str(line['timestamp']) ?? '')
        : state
    default:
      return state
  }
}

function applyConversationLine(prev: TrackedSession, line: Json): TrackedSession {
  const at = str(line['timestamp']) ?? ''
  const role = line['type'] as Message['role']
  let state: TrackedSession = {
    ...prev,
    lastActivityAt: at || prev.lastActivityAt,
    cwd: str(line['cwd']) ?? prev.cwd,
  }

  const content = obj(line['message'])['content']
  const blocks = typeof content === 'string' ? [{ type: 'text', text: content }] : content
  if (!Array.isArray(blocks)) return state

  const texts: string[] = []
  for (const block of blocks.map(obj)) {
    const text = str(block['text'])
    if (block['type'] === 'text' && text) {
      // The same notification also arrives as a user line; finishing a run twice is harmless.
      if (role === 'user') state = applyTaskNotification(state, text, at)
      if (!(role === 'user' && INJECTED.test(text))) texts.push(text)
    } else if (block['type'] === 'tool_use') state = onToolUse(state, block, at)
    else if (block['type'] === 'tool_result') state = onToolResult(state, block, line['toolUseResult'], at)
  }
  if (!texts.length) return state
  const message: Message = { role, text: texts.join('\n'), at }
  return { ...state, messages: [...state.messages, message].slice(-MAX_MESSAGES) }
}

function onToolUse(state: TrackedSession, block: Json, at: string): TrackedSession {
  const id = str(block['id'])
  const name = str(block['name'])
  const handler = name ? TOOLS[name] : undefined
  if (!id || !name || !handler) return state
  const input = obj(block['input'])
  const next = { ...state, pending: { ...state.pending, [id]: { name, input } } }
  return handler.onCall ? handler.onCall(next, id, input, at) : next
}

function onToolResult(state: TrackedSession, block: Json, result: unknown, at: string): TrackedSession {
  const id = str(block['tool_use_id'])
  const call = id ? state.pending[id] : undefined
  if (!id || !call) return state
  const { [id]: _done, ...pending } = state.pending
  const failed = block['is_error'] === true
  return TOOLS[call.name]!.onResult(
    { ...state, pending },
    { id, input: call.input, output: obj(result), failed, at },
  )
}

const TOOLS: Record<string, ToolHandler> = {
  TaskCreate: {
    onResult(state, { input, output, failed, at }) {
      const created = obj(output['task'])
      const id = str(created['id'])
      if (failed || !id) return state
      const task: Task = {
        id,
        subject: str(created['subject']) ?? str(input['subject']) ?? '',
        description: str(input['description']),
        activeForm: str(input['activeForm']),
        status: 'pending',
        history: [{ status: 'pending', at }],
      }
      return { ...state, tasks: upsert(state.tasks, task) }
    },
  },

  TaskUpdate: {
    onResult(state, { input, output, failed, at }) {
      if (failed) return state
      const id = str(output['taskId']) ?? str(input['taskId'])
      const fields = Array.isArray(output['updatedFields']) ? (output['updatedFields'] as unknown[]) : []
      const to = asTaskStatus(str(obj(output['statusChange'])['to']))
      if (to === 'deleted') return { ...state, tasks: state.tasks.filter((t) => t.id !== id) }

      const tasks = state.tasks.map((task) => {
        if (task.id !== id) return task
        const updated: Task = { ...task }
        for (const field of ['subject', 'description', 'activeForm'] as const) {
          const value = str(input[field])
          if (fields.includes(field) && value !== undefined) updated[field] = value
        }
        if (to && to !== task.status) {
          updated.status = to
          updated.history = [...task.history, { status: to, at }]
        }
        return updated
      })
      return { ...state, tasks }
    },
  },

  Agent: {
    onCall(state, id, input, at) {
      if (state.subagents.some((a) => a.toolUseId === id)) return state
      const subagent: Subagent = {
        toolUseId: id,
        description: str(input['description']) ?? '',
        agentType: str(input['subagent_type']) ?? 'general-purpose',
        prompt: str(input['prompt']),
        status: 'running',
        startedAt: at,
      }
      return { ...state, subagents: [...state.subagents, subagent] }
    },
    onResult(state, { id, output, failed, at }) {
      const agentId = str(output['agentId']) ?? str(output['agent_id'])
      const stillRunning = !failed && STILL_RUNNING.has(str(output['status']) ?? '')
      const subagents = state.subagents.map((a) =>
        a.toolUseId !== id
          ? a
          : {
              ...a,
              agentId: agentId ?? a.agentId,
              ...(stillRunning
                ? {}
                : { status: (failed ? 'failed' : 'completed') as RunStatus, endedAt: at }),
            },
      )
      return { ...state, subagents }
    },
  },

  Bash: {
    onResult(state, { id, input, output, failed, at }) {
      const jobId = str(output['backgroundTaskId'])
      if (failed || !jobId) return state
      const job: BackgroundJob = {
        id: jobId,
        toolUseId: id,
        command: str(input['command']) ?? '',
        description: str(input['description']),
        status: 'running',
        startedAt: at,
      }
      return { ...state, background: upsert(state.background, job) }
    },
  },

  TaskStop: {
    onResult(state, { input, output, failed, at }) {
      const id = str(output['task_id']) ?? str(input['task_id'])
      return failed || !id ? state : finishRuns(state, [id], { status: 'stopped', endedAt: at })
    },
  },
}

/**
 * Applies a line from a subagent's own transcript (`<sessionId>/subagents/agent-<id>.jsonl`).
 * `link` comes from the file name and its `.meta.json`, which may lack the tool_use id.
 */
export function applySubagentLine(
  state: TrackedSession,
  link: { agentId: string; toolUseId?: string },
  raw: unknown,
): TrackedSession {
  const line = obj(raw)
  if (line['type'] !== 'assistant') return state
  const index = state.subagents.findIndex(
    (a) => (link.toolUseId !== undefined && a.toolUseId === link.toolUseId) || a.agentId === link.agentId,
  )
  const content = obj(line['message'])['content']
  const text = Array.isArray(content)
    ? content
        .map(obj)
        .filter((b) => b['type'] === 'text')
        .map((b) => str(b['text']) ?? '')
        .join('\n')
    : ''
  if (index < 0 || !text) return state
  const subagents = [...state.subagents]
  subagents[index] = {
    ...subagents[index]!,
    agentId: subagents[index]!.agentId ?? link.agentId,
    lastMessage: text,
  }
  return { ...state, subagents }
}

const NOTIFICATION_OPEN = '<task-notification>'
const XML_TAG = /<([\w-]+)>([\s\S]*?)<\/\1>/g

function applyTaskNotification(state: TrackedSession, content: string, at: string): TrackedSession {
  if (!content.startsWith(NOTIFICATION_OPEN)) return state
  // Match the inner tags only: the outer wrapper would swallow them all.
  const inner = content.slice(NOTIFICATION_OPEN.length)
  const tags = Object.fromEntries([...inner.matchAll(XML_TAG)].map((m) => [m[1], m[2]!.trim()]))
  const status = NOTIFICATION_STATUS[tags['status'] ?? '']
  if (!status) return state
  const ids = [tags['task-id'], tags['tool-use-id']].filter((x): x is string => !!x)
  return finishRuns(state, ids, {
    status,
    endedAt: at,
    summary: tags['summary'] || undefined,
  })
}

/** Finishes every running subagent or background job known by any of `ids`. */
function finishRuns(
  state: TrackedSession,
  ids: string[],
  end: { status: RunStatus; endedAt: string; summary?: string },
): TrackedSession {
  const finish = <T extends Run>(run: T, runIds: (string | undefined)[]): T =>
    run.status === 'running' && runIds.some((x) => x !== undefined && ids.includes(x))
      ? {
          ...run,
          status: end.status,
          endedAt: end.endedAt,
          ...('agentType' in run && end.summary ? { summary: end.summary } : {}),
        }
      : run
  return {
    ...state,
    subagents: state.subagents.map((a) => finish(a, [a.agentId, a.toolUseId])),
    background: state.background.map((j) => finish(j, [j.id, j.toolUseId])),
  }
}

const upsert = <T extends { id: string }>(list: T[], item: T): T[] => [
  ...list.filter((x) => x.id !== item.id),
  item,
]

const asTaskStatus = (v: string | undefined): TaskStatus | undefined =>
  TASK_STATUSES.includes(v as TaskStatus) ? (v as TaskStatus) : undefined
