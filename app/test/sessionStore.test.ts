import { beforeEach, describe, expect, it } from 'vitest'
import { SessionStore, type StoreSources } from '../src/main/store'
import type { RegistryEntry } from '../src/main/sources/sessionRegistry'
import { aiTitle, assistantText, CWD, resetClock, SESSION_ID, toolResult, toolUse } from './fixtures/lines'

/** In-memory stand-in for the transcript files on disk. */
class FakeDisk implements StoreSources {
  files = new Map<string, unknown[]>()
  restarts = new Set<string>()
  subagents = new Map<string, { agentId: string; path: string; toolUseId?: string }[]>()
  now = new Date('2026-01-01T12:00:00.000Z')

  async locateTranscript(entry: RegistryEntry) {
    const path = `${entry.sessionId}.jsonl`
    return this.files.has(path) ? path : null
  }
  tailer(path: string) {
    let read = 0
    return {
      readNew: async () => {
        const lines = this.files.get(path) ?? []
        const restarted = this.restarts.delete(path)
        if (restarted) read = 0
        const fresh = lines.slice(read)
        read = lines.length
        return { lines: fresh, restarted }
      },
    }
  }
  async listSubagentTranscripts(transcriptPath: string) {
    return this.subagents.get(transcriptPath) ?? []
  }
  clock() {
    return this.now
  }
  append(sessionId: string, ...lines: unknown[]) {
    const path = `${sessionId}.jsonl`
    this.files.set(path, [...(this.files.get(path) ?? []), ...lines])
  }
}

const entry = (overrides: Partial<RegistryEntry> = {}): RegistryEntry => ({
  pid: 4242,
  sessionId: SESSION_ID,
  cwd: CWD,
  status: 'idle',
  name: 'wayne-enterprises-1',
  ...overrides,
})

let disk: FakeDisk
let store: SessionStore

beforeEach(() => {
  resetClock()
  disk = new FakeDisk()
  store = new SessionStore(disk)
})

describe('SessionStore sessions', () => {
  it('lists a live session with what its transcript says', async () => {
    disk.append(SESSION_ID, aiTitle('Fix the Batmobile'), assistantText('On it.'))
    await store.setLiveSessions([entry()])
    const [session] = store.snapshot().sessions
    expect(session).toMatchObject({
      sessionId: SESSION_ID,
      pid: 4242,
      name: 'wayne-enterprises-1',
      title: 'Fix the Batmobile',
    })
    expect(session?.messages.at(-1)?.text).toBe('On it.')
  })
})

describe('SessionStore session lifecycle', () => {
  it('drops a session once the registry no longer lists it', async () => {
    await store.setLiveSessions([entry()])
    await store.setLiveSessions([])
    expect(store.snapshot().sessions).toEqual([])
  })

  it('keeps what it already read when the registry lists the session again', async () => {
    disk.append(SESSION_ID, assistantText('one'))
    await store.setLiveSessions([entry()])
    await store.setLiveSessions([entry({ status: 'busy' })])
    const [session] = store.snapshot().sessions
    expect(session?.messages.map((m) => m.text)).toEqual(['one'])
    expect(session?.status).toBe('busy')
  })

  it('picks up lines appended to the transcript on refresh', async () => {
    await store.setLiveSessions([entry()])
    disk.append(SESSION_ID, assistantText('later'))
    await store.refresh()
    expect(store.snapshot().sessions[0]?.messages.at(-1)?.text).toBe('later')
  })

  it('rebuilds a session from scratch when its transcript restarts', async () => {
    disk.append(SESSION_ID, assistantText('one'))
    await store.setLiveSessions([entry()])
    disk.restarts.add(`${SESSION_ID}.jsonl`)
    await store.refresh()
    expect(store.snapshot().sessions[0]?.messages.map((m) => m.text)).toEqual(['one'])
  })

  it('finds a transcript that did not exist yet when the session appeared', async () => {
    await store.setLiveSessions([entry()])
    disk.append(SESSION_ID, aiTitle('Late title'))
    await store.refresh()
    expect(store.snapshot().sessions[0]?.title).toBe('Late title')
  })
})

const hook = (hook_event_name: string, fields: Record<string, unknown> = {}) => ({
  session_id: SESSION_ID,
  hook_event_name,
  ...fields,
})

describe('SessionStore hooks and attention', () => {
  it('shows a permission prompt from a hook in the needs-you list', async () => {
    await store.setLiveSessions([entry()])
    await store.handleHook(
      hook('PermissionRequest', { tool_name: 'Bash', tool_input: { command: 'rm -rf build' } }),
    )
    expect(store.snapshot().attention).toEqual([
      {
        sessionId: SESSION_ID,
        kind: 'permission',
        toolName: 'Bash',
        detail: 'rm -rf build',
        at: disk.now.toISOString(),
      },
    ])
  })

  it('applies hooks that arrive before the registry lists the session', async () => {
    await store.handleHook(hook('Notification', { notification_type: 'idle_prompt' }))
    await store.setLiveSessions([entry()])
    expect(store.snapshot().attention.map((a) => a.kind)).toEqual(['waiting'])
  })

  it('reads the transcript right away when a hook says something happened', async () => {
    await store.setLiveSessions([entry()])
    disk.append(SESSION_ID, assistantText('All done.'))
    await store.handleHook(hook('Stop', { last_assistant_message: 'All done.' }))
    expect(store.snapshot().sessions[0]?.messages.at(-1)?.text).toBe('All done.')
  })

  it('stops flagging a reply once the session has been seen', async () => {
    await store.setLiveSessions([entry()])
    await store.handleHook(hook('Stop'))
    expect(store.snapshot().attention.map((a) => a.kind)).toEqual(['reply'])
    store.markSeen(SESSION_ID)
    expect(store.snapshot().attention).toEqual([])
  })

  it('ignores hook payloads without a session id', async () => {
    await store.setLiveSessions([entry()])
    await store.handleHook({ hook_event_name: 'Stop' })
    expect(store.snapshot().attention).toEqual([])
  })
})

describe('SessionStore subagents', () => {
  it("shows a subagent's latest reply from its own transcript", async () => {
    disk.append(
      SESSION_ID,
      toolUse('toolu_a', 'Agent', { description: 'Search', subagent_type: 'Explore' }),
      toolResult('toolu_a', { isAsync: true, status: 'async_launched', agentId: 'a1' }),
    )
    disk.subagents.set(`${SESSION_ID}.jsonl`, [
      { agentId: 'a1', path: 'agent-a1.jsonl', toolUseId: 'toolu_a' },
    ])
    disk.files.set('agent-a1.jsonl', [assistantText('Found it')])
    await store.setLiveSessions([entry()])
    expect(store.snapshot().sessions[0]?.subagents[0]?.lastMessage).toBe('Found it')
  })
})
