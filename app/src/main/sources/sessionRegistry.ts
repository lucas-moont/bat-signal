import { EventEmitter } from 'node:events'
import { watch, type FSWatcher } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { LiveStatus } from '../../shared/types'

/** One `~/.claude/sessions/<pid>.json` file. */
export interface RegistryEntry {
  pid: number
  sessionId: string
  cwd: string
  procStart?: string
  status: LiveStatus
  name?: string
  startedAt?: number
  updatedAt?: number
}

/** The OS boundary: lets tests fake which processes exist. */
export interface ProcessProbe {
  isRunning(pid: number): boolean
  /** Process creation time as a Windows FILETIME string, or null if the process is gone. */
  startTime(pid: number): Promise<string | null>
}

export async function isSessionAlive(entry: RegistryEntry, probe: ProcessProbe): Promise<boolean> {
  if (!probe.isRunning(entry.pid)) return false
  if (!entry.procStart) return true
  // A crashed session leaves its file behind, and Windows reuses pids:
  // only trust the pid if the process started when the file says it did.
  return (await probe.startTime(entry.pid)) === entry.procStart
}

const ENTRY_FILE = /^\d+\.json$/ // never touch the sibling *.key files: they hold secrets
const STATUSES: readonly LiveStatus[] = ['busy', 'idle', 'shell']

function parseEntry(text: string): RegistryEntry | null {
  let raw: Record<string, unknown>
  try {
    raw = JSON.parse(text) as Record<string, unknown>
  } catch {
    return null
  }
  const { pid, sessionId, cwd, procStart, status, name, startedAt, updatedAt } = raw
  if (typeof pid !== 'number' || typeof sessionId !== 'string' || typeof cwd !== 'string') return null
  return {
    pid,
    sessionId,
    cwd,
    procStart: typeof procStart === 'string' ? procStart : undefined,
    status: STATUSES.includes(status as LiveStatus) ? (status as LiveStatus) : 'idle',
    name: typeof name === 'string' ? name : undefined,
    startedAt: typeof startedAt === 'number' ? startedAt : undefined,
    updatedAt: typeof updatedAt === 'number' ? updatedAt : undefined,
  }
}

/**
 * Watches `~/.claude/sessions/` and reports the sessions that are really alive.
 * Emits `change` with the full list whenever it differs from the last one.
 */
export class SessionRegistry extends EventEmitter<{ change: [RegistryEntry[]] }> {
  private watcher?: FSWatcher
  private timer?: NodeJS.Timeout
  private debounce?: NodeJS.Timeout
  private last = ''
  private current: RegistryEntry[] = []

  constructor(
    private readonly dir: string,
    private readonly probe: ProcessProbe & { prefetch?(pids: number[]): Promise<void> },
    private readonly pollMs = 5000,
  ) {
    super()
  }

  get entries(): RegistryEntry[] {
    return this.current
  }

  start(): void {
    try {
      this.watcher = watch(this.dir, () => this.schedule())
      this.watcher.on('error', () => undefined) // folder removed: polling still runs
    } catch {
      // ~/.claude/sessions doesn't exist yet: polling picks it up later.
    }
    this.timer = setInterval(() => void this.refresh(), this.pollMs)
    void this.refresh()
  }

  stop(): void {
    this.watcher?.close()
    clearInterval(this.timer)
    clearTimeout(this.debounce)
  }

  private schedule(): void {
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => void this.refresh(), 150)
  }

  async refresh(): Promise<void> {
    let names: string[]
    try {
      names = (await readdir(this.dir)).filter((n) => ENTRY_FILE.test(n))
    } catch {
      names = []
    }
    const parsed = await Promise.all(
      names.map(async (n) => parseEntry(await readFile(join(this.dir, n), 'utf8').catch(() => ''))),
    )
    const entries = parsed.filter((e): e is RegistryEntry => e !== null)
    await this.probe.prefetch?.(entries.filter((e) => this.probe.isRunning(e.pid)).map((e) => e.pid))
    const alive = await Promise.all(entries.map((e) => isSessionAlive(e, this.probe)))
    const live = entries.filter((_, i) => alive[i]).sort((a, b) => (a.startedAt ?? 0) - (b.startedAt ?? 0))

    const snapshot = JSON.stringify(live)
    if (snapshot === this.last) return
    this.last = snapshot
    this.current = live
    this.emit('change', live)
  }
}
