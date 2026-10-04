export const TASK_STATUSES = ['pending', 'in_progress', 'completed', 'deleted'] as const
export type TaskStatus = (typeof TASK_STATUSES)[number]

export interface Task {
  id: string
  subject: string
  description?: string
  activeForm?: string
  status: TaskStatus
  history: { status: TaskStatus; at: string }[]
}

export type RunStatus = 'running' | 'completed' | 'failed' | 'stopped'

/** Something Claude started that runs on its own and finishes later. */
export interface Run {
  /** The tool call that started it. */
  toolUseId: string
  status: RunStatus
  startedAt: string
  endedAt?: string
}

export interface Subagent extends Run {
  agentId?: string
  description: string
  agentType: string
  prompt?: string
  summary?: string
  /** Latest text reply from the subagent's own transcript. */
  lastMessage?: string
}

export interface BackgroundJob extends Run {
  id: string
  command: string
  description?: string
}

export interface Message {
  role: 'user' | 'assistant'
  text: string
  at: string
}

export interface SessionState {
  sessionId: string
  title?: string
  titleSource?: 'ai' | 'custom'
  cwd?: string
  messages: Message[]
  tasks: Task[]
  subagents: Subagent[]
  background: BackgroundJob[]
  lastActivityAt?: string
}

export const LIVE_STATUSES = ['busy', 'idle', 'shell'] as const
export type LiveStatus = (typeof LIVE_STATUSES)[number]

/** Live facts about a session that don't come from the transcript (registry + hooks). */
export interface SessionSignals {
  status: LiveStatus
  /** Claude is showing a permission dialog. */
  pendingPermission?: { toolName: string; detail?: string; at: string }
  /** Claude reported it is idle, waiting for your input. */
  waitingSince?: string
  /** The last turn ended because of an API error. */
  error?: { type: string; at: string }
  /** When Claude last finished a turn. */
  lastStopAt?: string
}

export interface SessionView {
  state: SessionState
  signals: SessionSignals
}

export type AttentionKind = 'permission' | 'error' | 'waiting' | 'reply' | 'stalled'

export interface AttentionItem {
  sessionId: string
  kind: AttentionKind
  at: string
  /** For permission prompts: the tool Claude wants to use. */
  toolName?: string
  detail?: string
  taskId?: string
}

/** Everything the window shows about one live session. */
export interface SessionSnapshot extends SessionState {
  pid: number
  name?: string
  signals: SessionSignals
}

export interface StoreSnapshot {
  sessions: SessionSnapshot[]
  attention: AttentionItem[]
}
