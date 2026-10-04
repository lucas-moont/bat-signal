import { EventEmitter } from 'node:events'
import { watch, type FSWatcher } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { num, obj, str } from '../../shared/guards'
import { LIVE_STATUSES, type LiveStatus } from '../../shared/types'

/** One `~/.claude/sessions/<pid>.json` file. */
export interface RegistryEntry {
  pid: number
  sessionId: string
  cwd: string
  procStart?: string
  status: LiveStatus
  name?: string
  startedAt?: number
}

/** The OS boundary: lets tests fake which processes exist. */
export interface ProcessProbe {
  isRunning(pid: number): boolean
  /** Creation time of each pid as a Windows FILETIME string, or null if it is gone. */
  startTimes(pids: number[]): Promise<Map<number, string | null>>
}

/** The entries whose process is still the one that wrote them, looked up in one batch. */
export async function liveEntries(entries: RegistryEntry[], probe: ProcessProbe): Promise<RegistryEntry[]> {
  const running = entries.filter((e) => probe.isRunning(e.pid))
  const starts = await probe.startTimes(running.filter((e) => e.procStart).map((e) => e.pid))
  // A crashed session leaves its file behind, and Windows reuses pids:
  // only trust the pid if the process started when the file says it did.
  return running.filter((e) => !e.procStart || starts.get(e.pid) === e.procStart)
}

export async function isSessionAlive(entry: RegistryEntry, probe: ProcessProbe): Promise<boolean> {
  return (await liveEntries([entry], probe)).length === 1
}

const ENTRY_FILE = /^\d+\.json$/ // never touch the sibling *.key files: they hold secrets

function parseEntry(text: string): RegistryEntry | null {
  let raw
  try {
    raw = obj(JSON.parse(text))
  } catch {
    return null
  }
  const pid = num(raw['pid'])
  const sessionId = str(raw['sessionId'])
  const cwd = str(raw['cwd'])
  if (pid === undefined || !sessionId || !cwd) return null
  const status = str(raw['status']) as LiveStatus | undefined
  return {
    pid,
    sessionId,
    cwd,
    procStart: str(raw['procStart']),
    status: status && LIVE_STATUSES.includes(status) ? status : 'idle',
    name: str(raw['name']),
    startedAt: num(raw['startedAt']),
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
  /** undefined until the first scan, so the first result is always emitted, even when empty. */
  private current?: RegistryEntry[]
  private running?: Promise<void>
  private dirty = false

  constructor(
    private readonly dir: string,
    private readonly probe: ProcessProbe,
    private readonly pollMs = 5000,
  ) {
    super()
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

  /** Single-flight: a refresh requested while one runs is folded into one rerun. */
  refresh(): Promise<void> {
    if (this.running) {
      this.dirty = true
      return this.running
    }
    this.running = this.scan().finally(() => {
      this.running = undefined
      if (this.dirty) {
        this.dirty = false
        void this.refresh()
      }
    })
    return this.running
  }

  private async scan(): Promise<void> {
    const names = (await readdir(this.dir).catch(() => [] as string[])).filter((n) => ENTRY_FILE.test(n))
    const parsed = await Promise.all(
      names.map(async (n) => parseEntry(await readFile(join(this.dir, n), 'utf8').catch(() => ''))),
    )
    const entries = parsed.filter((e) => e !== null)
    let live: RegistryEntry[]
    try {
      live = await liveEntries(entries, this.probe)
    } catch {
      return // the OS lookup failed: keep the last known list rather than dropping every session
    }
    live.sort((a, b) => (a.startedAt ?? 0) - (b.startedAt ?? 0))

    if (isDeepStrictEqual(live, this.current)) return
    this.current = live
    this.emit('change', live)
  }
}
