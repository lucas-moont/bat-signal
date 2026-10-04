import { obj, str, type Json } from '../../shared/guards'
import type { SessionSignals } from '../../shared/types'

/** Every hook the plugin subscribes to (plugin/batcave/hooks/hooks.json must list exactly these). */
export const HOOK_EVENTS = [
  'SessionStart',
  'SessionEnd',
  'UserPromptSubmit',
  'Stop',
  'StopFailure',
  'Notification',
  'PermissionRequest',
  'PermissionDenied',
  'PostToolUse',
  'PostToolUseFailure',
  'SubagentStart',
  'SubagentStop',
  'TaskCreated',
  'TaskCompleted',
] as const
export type HookEvent = (typeof HOOK_EVENTS)[number]

type Handler = (signals: SessionSignals, event: Json, at: string) => SessionSignals

const withoutPermission = ({ pendingPermission: _gone, ...rest }: SessionSignals): SessionSignals => rest

/** Clears the pending permission if the event is about the tool call that asked for it. */
const resolvesPermission: Handler = (signals, event) => {
  const pending = signals.pendingPermission?.toolUseId
  const id = str(event['tool_use_id'])
  return !signals.pendingPermission || (pending && id && pending !== id)
    ? signals
    : withoutPermission(signals)
}

/** Claude is doing something again, so it is no longer waiting for the user. */
const working = ({ waitingSince: _gone, ...rest }: SessionSignals): SessionSignals => rest

/** A tool call finished: Claude is working, and it may have been the call waiting for permission. */
const toolFinished: Handler = (signals, event, at) => resolvesPermission(working(signals), event, at)

const keep: Handler = (signals) => signals

// Notification types that mean Claude is blocked on the user (other than a permission dialog).
const WAITING_FOR_USER = new Set([
  'idle_prompt',
  'agent_needs_input',
  'elicitation_dialog',
  'elicitation_url_dialog',
])

/**
 * What each hook does to a session's signals. Events mapped to `keep` change nothing here:
 * they are subscribed so the store re-reads the transcript the moment something happens.
 */
const HOOKS: Record<HookEvent, Handler> = {
  PermissionRequest: (signals, event, at) => ({
    ...working(signals),
    pendingPermission: {
      toolName: str(event['tool_name']) ?? 'a tool',
      detail: describeInput(event['tool_input']),
      toolUseId: str(event['tool_use_id']),
      at,
    },
  }),
  // The dialog is gone once its tool ran, failed or was denied. Other calls can finish meanwhile.
  PostToolUse: toolFinished,
  PostToolUseFailure: toolFinished,
  PermissionDenied: toolFinished,

  // permission_prompt is ignored: PermissionRequest already reported it with details, and a
  // notification arriving after the answer would bring back a prompt that is gone.
  Notification: (signals, event, at) =>
    WAITING_FOR_USER.has(str(event['notification_type']) ?? '') ? { ...signals, waitingSince: at } : signals,

  UserPromptSubmit: ({ pendingPermission: _p, waitingSince: _w, error: _e, ...rest }) => rest,
  Stop: (signals, _event, at) => ({ ...withoutPermission(working(signals)), lastStopAt: at }),
  StopFailure: (signals, event, at) => ({
    ...withoutPermission(working(signals)),
    lastStopAt: at,
    error: { type: str(event['error_type']) ?? 'unknown', at },
  }),
  // A new or cleared conversation: nothing pending carries over.
  SessionStart: () => ({}),

  SessionEnd: keep,
  SubagentStart: keep,
  SubagentStop: keep,
  TaskCreated: keep,
  TaskCompleted: keep,
}

/**
 * Folds one Claude Code hook payload into a session's signals.
 * Returns the same object when the event changes nothing.
 * @param at when the event arrived (hook payloads carry no timestamp)
 */
export function applyHookEvent(signals: SessionSignals, raw: unknown, at: string): SessionSignals {
  const event = obj(raw)
  const handler = HOOKS[str(event['hook_event_name']) as HookEvent] as Handler | undefined
  return handler ? handler(signals, event, at) : signals
}

const MAX_DETAIL = 120
// The input field that best says what a call is about, most telling first.
const DETAIL_FIELDS = [
  'command',
  'file_path',
  'notebook_path',
  'url',
  'pattern',
  'query',
  'description',
  'prompt',
]

/** A short, human summary of what a tool call is about to do. */
function describeInput(raw: unknown): string | undefined {
  const input = obj(raw)
  const value = DETAIL_FIELDS.map((field) => str(input[field])).find((v) => v?.trim())
  if (!value) return undefined
  const oneLine = value.replace(/\s+/g, ' ').trim()
  return oneLine.length > MAX_DETAIL ? oneLine.slice(0, MAX_DETAIL - 1) + '…' : oneLine
}
