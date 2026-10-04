import type { RegistryEntry } from '../../src/main/sources/sessionRegistry'

// Synthetic transcript lines that mirror the shape Claude Code writes to
// ~/.claude/projects/<cwd>/<sessionId>.jsonl. Content is invented on purpose.

export const SESSION_ID = '00000000-0000-4000-8000-000000000001'
export const CWD = '/home/bruce/wayne-enterprises'

let clock = Date.parse('2026-01-01T00:00:00.000Z')
export const resetClock = (): void => {
  clock = Date.parse('2026-01-01T00:00:00.000Z')
}
const tick = (): string => new Date((clock += 1000)).toISOString()

const base = () => ({ sessionId: SESSION_ID, cwd: CWD, timestamp: tick(), uuid: crypto.randomUUID() })

export const aiTitle = (aiTitle: string) => ({ type: 'ai-title', aiTitle, sessionId: SESSION_ID })
export const customTitle = (customTitle: string) => ({
  type: 'custom-title',
  customTitle,
  sessionId: SESSION_ID,
})

export const userText = (text: string) => ({
  ...base(),
  type: 'user',
  message: { role: 'user', content: text },
})

export const assistantText = (text: string) => ({
  ...base(),
  type: 'assistant',
  message: { role: 'assistant', content: [{ type: 'text', text }] },
})

export const toolUse = (id: string, name: string, input: Record<string, unknown>) => ({
  ...base(),
  type: 'assistant',
  message: { role: 'assistant', content: [{ type: 'tool_use', id, name, input }] },
})

export const toolResult = (toolUseId: string, toolUseResult: unknown, isError = false) => ({
  ...base(),
  type: 'user',
  message: {
    role: 'user',
    content: [
      { type: 'tool_result', tool_use_id: toolUseId, content: 'ok', ...(isError ? { is_error: true } : {}) },
    ],
  },
  toolUseResult,
})

export const taskNotification = (opts: {
  taskId: string
  toolUseId: string
  status: string
  summary?: string
  operation?: 'enqueue' | 'remove'
}) => ({
  type: 'queue-operation',
  operation: opts.operation ?? 'enqueue',
  timestamp: tick(),
  sessionId: SESSION_ID,
  content:
    `<task-notification>\n<task-id>${opts.taskId}</task-id>\n<tool-use-id>${opts.toolUseId}</tool-use-id>\n` +
    `<output-file>/tmp/claude/tasks/${opts.taskId}.output</output-file>\n<status>${opts.status}</status>\n` +
    `<summary>${opts.summary ?? ''}</summary>\n</task-notification>`,
})

/** A `~/.claude/sessions/<pid>.json` entry for the synthetic session. */
export const registryEntry = (overrides: Partial<RegistryEntry> = {}): RegistryEntry => ({
  pid: 4242,
  sessionId: SESSION_ID,
  cwd: CWD,
  procStart: '134355583899737171',
  status: 'idle',
  name: 'wayne-enterprises-1',
  ...overrides,
})

/** A Claude Code hook payload, as POSTed by the plugin. */
export const hookEvent = (hook_event_name: string, fields: Record<string, unknown> = {}) => ({
  session_id: SESSION_ID,
  hook_event_name,
  ...fields,
})

export const permissionRequest = (tool_name: string, tool_input: Record<string, unknown>) =>
  hookEvent('PermissionRequest', { tool_name, tool_input })
