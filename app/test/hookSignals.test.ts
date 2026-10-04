import { describe, expect, it } from 'vitest'
import { applyHookEvent } from '../src/main/model/hookSignals'
import type { SessionSignals } from '../src/shared/types'
import { hookEvent as hook, permissionRequest } from './fixtures/lines'

const AT = '2026-01-01T12:00:00.000Z'
const idle: SessionSignals = {}

describe('applyHookEvent: permissions', () => {
  it('records what Claude wants to do when it asks for permission', () => {
    const s = applyHookEvent(idle, permissionRequest('Bash', { command: 'npm install' }), AT)
    expect(s.pendingPermission).toEqual({ toolName: 'Bash', detail: 'npm install', at: AT })
  })
})

describe('applyHookEvent: permission details', () => {
  it.each([
    ['Edit', { file_path: 'src/batmobile.ts', old_string: 'a', new_string: 'b' }, 'src/batmobile.ts'],
    ['WebFetch', { url: 'https://gotham.gov', prompt: 'x' }, 'https://gotham.gov'],
    ['Grep', { pattern: 'riddler', path: '.' }, 'riddler'],
  ])('summarizes a %s call', (tool_name, tool_input, expected) => {
    const s = applyHookEvent(idle, hook('PermissionRequest', { tool_name, tool_input }), AT)
    expect(s.pendingPermission?.detail).toBe(expected)
  })

  it('shortens very long details', () => {
    const command = 'echo ' + 'x'.repeat(300)
    const s = applyHookEvent(idle, permissionRequest('Bash', { command }), AT)
    expect(s.pendingPermission?.detail).toHaveLength(120)
    expect(s.pendingPermission?.detail?.endsWith('…')).toBe(true)
  })
})

describe('applyHookEvent: a pending permission goes away', () => {
  const pending = applyHookEvent(idle, permissionRequest('Bash', { command: 'ls' }), AT)

  it.each(['PostToolUse', 'PermissionDenied', 'UserPromptSubmit', 'Stop', 'StopFailure', 'SessionStart'])(
    'when %s arrives',
    (name) => {
      expect(applyHookEvent(pending, hook(name), AT).pendingPermission).toBeUndefined()
    },
  )
})

describe('applyHookEvent: turns', () => {
  it('remembers when Claude finished a turn', () => {
    expect(applyHookEvent(idle, hook('Stop', { last_assistant_message: 'Done.' }), AT).lastStopAt).toBe(AT)
  })

  it('records an error that ended the turn', () => {
    const s = applyHookEvent(
      idle,
      hook('StopFailure', { error_type: 'rate_limit', error_message: 'slow down' }),
      AT,
    )
    expect(s.error).toEqual({ type: 'rate_limit', at: AT })
    expect(s.lastStopAt).toBe(AT)
  })

  it('notes when Claude says it is waiting for you', () => {
    const s = applyHookEvent(
      idle,
      hook('Notification', { notification_type: 'idle_prompt', message: 'waiting' }),
      AT,
    )
    expect(s.waitingSince).toBe(AT)
  })

  it('clears waiting and errors once you send a prompt', () => {
    const before: SessionSignals = { waitingSince: AT, error: { type: 'overloaded', at: AT } }
    const s = applyHookEvent(before, hook('UserPromptSubmit', { prompt: 'go on' }), AT)
    expect(s.waitingSince).toBeUndefined()
    expect(s.error).toBeUndefined()
  })
})

describe('applyHookEvent: other events', () => {
  it('keeps the richer PermissionRequest details when the notification follows it', () => {
    const asked = applyHookEvent(idle, permissionRequest('Bash', { command: 'ls' }), AT)
    const s = applyHookEvent(
      asked,
      hook('Notification', { notification_type: 'permission_prompt', message: 'x' }),
      AT,
    )
    expect(s.pendingPermission).toEqual(asked.pendingPermission)
  })

  it('starts from a clean slate when a session starts or is cleared', () => {
    const busy: SessionSignals = {
      waitingSince: AT,
      error: { type: 'x', at: AT },
      lastStopAt: AT,
    }
    expect(applyHookEvent(busy, hook('SessionStart', { source: 'clear' }), AT)).toEqual({})
  })

  it('returns the same signals for events it does not use', () => {
    expect(applyHookEvent(idle, hook('PreCompact'), AT)).toBe(idle)
  })
})

describe('applyHookEvent: a permission belongs to one tool call', () => {
  const asked = applyHookEvent(
    idle,
    hook('PermissionRequest', {
      tool_name: 'Bash',
      tool_input: { command: 'npm test' },
      tool_use_id: 'toolu_bash',
    }),
    AT,
  )

  it('stays pending while other tool calls finish', () => {
    const s = applyHookEvent(asked, hook('PostToolUse', { tool_name: 'Read', tool_use_id: 'toolu_read' }), AT)
    expect(s.pendingPermission?.toolName).toBe('Bash')
  })

  it.each(['PostToolUse', 'PostToolUseFailure', 'PermissionDenied'])(
    'goes away on %s for that call',
    (name) => {
      const s = applyHookEvent(asked, hook(name, { tool_name: 'Bash', tool_use_id: 'toolu_bash' }), AT)
      expect(s.pendingPermission).toBeUndefined()
    },
  )

  it('is not brought back by a permission notification that arrives late', () => {
    const s = applyHookEvent(
      idle,
      hook('Notification', { notification_type: 'permission_prompt', message: 'x' }),
      AT,
    )
    expect(s).toBe(idle)
  })
})
