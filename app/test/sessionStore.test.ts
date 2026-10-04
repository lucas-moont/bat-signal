import { beforeEach, describe, expect, it } from 'vitest'
import { SessionStore, type StoreSources } from '../src/main/store'
import type { RegistryEntry } from '../src/main/sources/sessionRegistry'
import type { SubagentTranscript } from '../src/main/sources/transcriptLocator'
import {
  aiTitle,
  assistantText,
  hookEvent as hook,
  permissionRequest,
  registryEntry as entry,
  resetClock,
  SESSION_ID,
  toolResult,
  toolUse,
} from './fixtures/lines'

/** In-memory stand-in for the transcript files on disk. */
class FakeDisk implements StoreSources {
  files = new Map<string, unknown[]>()
  restarts = new Set<string>()
  subagents = new Map<string, SubagentTranscript[]>()
  deepScans = 0
  metaReads = 0
  reads = new Map<string, number>()
  failing = new Set<string>()
  now = new Date('2026-01-01T12:00:00.000Z')

  async locateTranscript(entry: RegistryEntry, deep: boolean) {
    if (deep) this.deepScans++
    const path = `${entry.sessionId}.jsonl`
    return this.files.has(path) ? path : null
  }
  tailer(path: string) {
    let read = 0
    return {
      readNew: async () => {
        this.reads.set(path, (this.reads.get(path) ?? 0) + 1)
        if (this.failing.has(path)) throw new Error(`EBUSY: ${path}`)
        const lines = this.files.get(path) ?? []
        const restarted = this.restarts.delete(path)
        if (restarted) read = 0
        const fresh = lines.slice(read)
        await new Promise((r) => setTimeout(r, 1)) // like real I/O: concurrent reads can interleave here
        read = lines.length
        return { lines: fresh, restarted }
      },
    }
  }
  async listSubagentTranscripts(transcriptPath: string, known: ReadonlySet<string>) {
    const fresh = (this.subagents.get(transcriptPath) ?? []).filter((s) => !known.has(s.agentId))
    this.metaReads += fresh.length
    return fresh
  }
  clock() {
    return this.now
  }
  append(sessionId: string, ...lines: unknown[]) {
    const path = `${sessionId}.jsonl`
    this.files.set(path, [...(this.files.get(path) ?? []), ...lines])
  }
}

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

describe('SessionStore hooks and attention', () => {
  it('shows a permission prompt from a hook in the needs-you list', async () => {
    await store.setLiveSessions([entry()])
    await store.handleHook(permissionRequest('Bash', { command: 'rm -rf build' }))
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

describe('SessionStore concurrent reads', () => {
  it('applies each transcript line once when a hook and a refresh read at the same time', async () => {
    await store.setLiveSessions([entry()])
    disk.append(SESSION_ID, assistantText('once'))
    await Promise.all([store.refresh(), store.handleHook(hook('PostToolUse')), store.refresh()])
    expect(store.snapshot().sessions[0]?.messages.map((m) => m.text)).toEqual(['once'])
  })
})

describe('SessionStore updates', () => {
  const countUpdates = () => {
    let n = 0
    store.on('update', () => n++)
    return () => n
  }

  it('stays quiet when a refresh finds nothing new', async () => {
    disk.append(SESSION_ID, assistantText('hi'))
    await store.setLiveSessions([entry()])
    const updates = countUpdates()
    await store.refresh()
    await store.setLiveSessions([entry()])
    await store.handleHook(hook('SubagentStart'))
    expect(updates()).toBe(0)
  })

  it('speaks up when new lines arrive or a hook changes something', async () => {
    await store.setLiveSessions([entry()])
    const updates = countUpdates()
    disk.append(SESSION_ID, assistantText('new'))
    await store.refresh()
    await store.handleHook(hook('Stop'))
    await store.setLiveSessions([entry({ status: 'busy' })])
    expect(updates()).toBe(3)
  })
})

describe('SessionStore disk work', () => {
  it('searches every project folder at most every 30s while a transcript is missing', async () => {
    await store.setLiveSessions([entry()])
    await store.refresh()
    await store.refresh()
    expect(disk.deepScans).toBe(1)
    disk.now = new Date(disk.now.getTime() + 31_000)
    await store.refresh()
    expect(disk.deepScans).toBe(2)
  })

  const withSubagent = (status: 'async_launched' | 'completed') => {
    disk.append(
      SESSION_ID,
      toolUse('toolu_a', 'Agent', { description: 'Search', subagent_type: 'Explore' }),
      toolResult('toolu_a', status === 'completed' ? { status } : { isAsync: true, status, agentId: 'a1' }),
    )
    disk.subagents.set(`${SESSION_ID}.jsonl`, [
      { agentId: 'a1', path: 'agent-a1.jsonl', toolUseId: 'toolu_a' },
    ])
    disk.files.set('agent-a1.jsonl', [assistantText('Found it')])
  }

  it("reads a subagent's meta.json only once", async () => {
    withSubagent('async_launched')
    await store.setLiveSessions([entry()])
    await store.refresh()
    await store.refresh()
    expect(disk.metaReads).toBe(1)
  })

  it('stops re-reading a finished subagent once its transcript was read', async () => {
    withSubagent('completed')
    await store.setLiveSessions([entry()])
    await store.refresh()
    await store.refresh()
    expect(disk.reads.get('agent-a1.jsonl')).toBe(1)
    expect(store.snapshot().sessions[0]?.subagents[0]?.lastMessage).toBe('Found it')
  })
})

describe('SessionStore resilience', () => {
  it("keeps updating other sessions when one session's transcript can't be read", async () => {
    const other = entry({ sessionId: 'other', pid: 5 })
    disk.append('other', assistantText('hello'))
    disk.append(SESSION_ID, assistantText('hi'))
    await store.setLiveSessions([entry(), other])
    disk.failing.add(`${SESSION_ID}.jsonl`)
    disk.append('other', assistantText('still here'))
    await store.refresh()
    const texts = store.snapshot().sessions.map((s) => s.messages.at(-1)?.text)
    expect(texts).toContain('still here')
  })

  it('forgets hooks from a session the registry never lists after 5 minutes', async () => {
    await store.handleHook({
      ...hook('Notification', { notification_type: 'idle_prompt' }),
      session_id: 'ghost',
    })
    disk.now = new Date(disk.now.getTime() + 6 * 60_000)
    await store.setLiveSessions([entry()])
    await store.setLiveSessions([entry(), entry({ sessionId: 'ghost', pid: 6 })])
    expect(store.snapshot().attention.filter((a) => a.sessionId === 'ghost')).toEqual([])
  })
})

describe('SessionStore first reads', () => {
  it('leaves a new session out of the snapshot until its transcript has been read', async () => {
    disk.append(SESSION_ID, aiTitle('Fix the Batmobile'))
    const listing = store.setLiveSessions([entry()])
    expect(store.snapshot().sessions).toEqual([]) // mid-read: no half-built session
    await listing
    expect(store.snapshot().sessions.map((s) => s.title)).toEqual(['Fix the Batmobile'])
  })

  it('is ready once the first registry listing has been read', async () => {
    let ready = false
    void store.ready.then(() => (ready = true))
    await Promise.resolve()
    expect(ready).toBe(false)
    await store.setLiveSessions([entry()])
    await Promise.resolve()
    expect(ready).toBe(true)
  })
})
