import { obj, str } from '../../shared/guards'
import type { SessionSignals } from '../../shared/types'

/**
 * Folds one Claude Code hook payload into a session's live signals.
 * @param at when the event arrived (hook payloads carry no timestamp)
 */
export function applyHookEvent(signals: SessionSignals, raw: unknown, at: string): SessionSignals {
  const event = obj(raw)
  const name = str(event['hook_event_name']) ?? ''
  if (name === 'PermissionRequest') {
    const toolName = str(event['tool_name']) ?? 'a tool'
    return { ...signals, pendingPermission: { toolName, detail: describeInput(event['tool_input']), at } }
  }
  const next = ANSWERS_PERMISSION.has(name) ? withoutPermission(signals) : signals

  switch (name) {
    case 'Stop':
      return { ...next, lastStopAt: at }
    case 'StopFailure':
      return { ...next, lastStopAt: at, error: { type: str(event['error_type']) ?? 'unknown', at } }
    case 'SessionStart':
      return { status: next.status } // new or cleared conversation: nothing pending carries over
    case 'Notification': {
      const type = str(event['notification_type']) ?? ''
      if (type === 'permission_prompt' && !next.pendingPermission) {
        // Only the notification text is known; PermissionRequest, when it fires, has the details.
        return { ...next, pendingPermission: { toolName: str(event['message']) ?? 'a tool', at } }
      }
      return WAITING_FOR_USER.has(type) ? { ...next, waitingSince: at } : next
    }
    case 'UserPromptSubmit': {
      const { waitingSince: _w, error: _e, ...rest } = next
      return rest
    }
    default:
      return next
  }
}

// Notification types that mean Claude is blocked on the user (other than a permission dialog).
const WAITING_FOR_USER = new Set([
  'idle_prompt',
  'agent_needs_input',
  'elicitation_dialog',
  'elicitation_url_dialog',
])

// Events that mean the permission dialog is no longer on screen.
const ANSWERS_PERMISSION = new Set([
  'PostToolUse',
  'PermissionDenied',
  'UserPromptSubmit',
  'Stop',
  'StopFailure',
  'SessionStart',
])

const withoutPermission = ({ pendingPermission: _gone, ...rest }: SessionSignals): SessionSignals => rest

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
