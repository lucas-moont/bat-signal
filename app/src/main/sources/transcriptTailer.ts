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

  constructor(readonly path: string) {}

  async readNew(): Promise<TailRead> {
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
    const buffer = Buffer.allocUnsafe(CHUNK)
    let carry = Buffer.alloc(0)
    let position = this.offset
    while (position < size) {
      const { bytesRead } = await handle.read(buffer, 0, Math.min(CHUNK, size - position), position)
      if (bytesRead === 0) break
      position += bytesRead
      const data = carry.length
        ? Buffer.concat([carry, buffer.subarray(0, bytesRead)])
        : buffer.subarray(0, bytesRead)
      const end = data.lastIndexOf(NEWLINE) + 1
      if (end > 0) {
        parseLines(data.subarray(0, end).toString('utf8'), out)
        this.offset += end
      }
      carry = Buffer.from(data.subarray(end)) // copy: `buffer` is reused by the next read
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
