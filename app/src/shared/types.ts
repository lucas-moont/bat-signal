export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'deleted'

export interface StatusChange<S> {
  status: S
  at: string
}

export interface Task {
  id: string
  subject: string
  description?: string
  activeForm?: string
  status: TaskStatus
  history: StatusChange<TaskStatus>[]
}

export type RunStatus = 'running' | 'completed' | 'failed' | 'stopped'

export interface Subagent {
  toolUseId: string
  agentId?: string
  description: string
  agentType: string
  prompt?: string
  status: RunStatus
  startedAt: string
  endedAt?: string
  summary?: string
}

export interface BackgroundJob {
  id: string
  toolUseId: string
  command: string
  description?: string
  status: RunStatus
  startedAt: string
  endedAt?: string
}

export interface Message {
  role: 'user' | 'assistant'
  text: string
  at: string
}

/** A tool call whose result hasn't been seen yet. */
export interface PendingToolUse {
  name: string
  input: Record<string, unknown>
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
  pendingToolUses: Record<string, PendingToolUse>
}
