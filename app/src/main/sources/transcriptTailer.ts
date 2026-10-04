import { open, type FileHandle } from 'node:fs/promises'

const CHUNK = 1024 * 1024
const NEWLINE = 0x0a

export interface TailRead {
  lines: unknown[]
  /** The file was truncated or replaced, so `lines` start from its beginning: rebuild state from scratch. */
  restarted: boolean
}

/** Reads a growing JSONL transcript, returning only what was appended since the last read. */
export class TranscriptTailer {
  private offset = 0
  private identity?: string
  private queue: Promise<unknown> = Promise.resolve()

  constructor(readonly path: string) {}

  /** Calls are serialized: overlapping reads would otherwise both start from the same offset. */
  readNew(): Promise<TailRead> {
    const next = this.queue.then(() => this.read())
    this.queue = next.catch(() => undefined)
    return next
  }

  private async read(): Promise<TailRead> {
    let handle: FileHandle
    try {
      handle = await open(this.path, 'r')
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return { lines: [], restarted: false }
      throw err
    }
    try {
      const stat = await handle.stat({ bigint: true })
      const size = Number(stat.size)
      const identity = `${stat.ino}:${stat.birthtimeNs}`
      const restarted = this.offset > 0 && (size < this.offset || identity !== this.identity)
      if (restarted) this.offset = 0
      this.identity = identity
      return { lines: await this.readFrom(handle, size), restarted }
    } finally {
      await handle.close()
    }
  }

  /**
   * Reads in fixed chunks so a large transcript is never held whole in memory.
   * Claude may be mid-write, so only complete lines are consumed; the tail waits
   * for the next read, which also keeps multi-byte characters from being split.
   */
  private async readFrom(handle: FileHandle, size: number): Promise<unknown[]> {
    const out: unknown[] = []
    let pending: Buffer[] = [] // pieces of a line that spans several chunks
    let position = this.offset
    while (position < size) {
      const chunk = Buffer.allocUnsafe(Math.min(CHUNK, size - position))
      const { bytesRead } = await handle.read(chunk, 0, chunk.length, position)
      if (bytesRead === 0) break
      position += bytesRead
      const data = chunk.subarray(0, bytesRead)
      const end = data.lastIndexOf(NEWLINE) + 1
      if (end === 0) {
        pending.push(data)
        continue
      }
      const complete = pending.length
        ? Buffer.concat([...pending, data.subarray(0, end)])
        : data.subarray(0, end)
      parseLines(complete.toString('utf8'), out)
      this.offset += complete.length
      pending = end < data.length ? [data.subarray(end)] : []
    }
    return out
  }
}

function parseLines(text: string, out: unknown[]): void {
  for (const line of text.split('\n')) {
    if (!line) continue
    try {
      out.push(JSON.parse(line))
    } catch {
      // A corrupted line shouldn't hide the rest of the session.
    }
  }
}
