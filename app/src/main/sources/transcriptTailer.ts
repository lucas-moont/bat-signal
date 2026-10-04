import { open, type FileHandle } from 'node:fs/promises'

const CHUNK = 1024 * 1024
const NEWLINE = 0x0a

/** Reads a growing JSONL transcript, returning only what was appended since the last read. */
export class TranscriptTailer {
  private offset = 0

  constructor(readonly path: string) {}

  async readNew(): Promise<unknown[]> {
    let handle: FileHandle
    try {
      handle = await open(this.path, 'r')
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
      throw err
    }
    try {
      const { size } = await handle.stat()
      if (size < this.offset) this.offset = 0 // file was replaced or truncated
      return await this.readFrom(handle, size)
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
