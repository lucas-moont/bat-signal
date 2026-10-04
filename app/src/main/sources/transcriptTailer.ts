import { open, type FileHandle } from 'node:fs/promises'

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
      const length = size - this.offset
      if (length <= 0) return []
      const buffer = Buffer.alloc(length)
      await handle.read(buffer, 0, length, this.offset)
      // Claude may be mid-write: only consume up to the last complete line,
      // which also keeps multi-byte characters from being split.
      const end = buffer.lastIndexOf(0x0a) + 1
      this.offset += end
      return parseLines(buffer.subarray(0, end).toString('utf8'))
    } finally {
      await handle.close()
    }
  }
}

function parseLines(text: string): unknown[] {
  const out: unknown[] = []
  for (const line of text.split('\n')) {
    if (!line.trim()) continue
    try {
      out.push(JSON.parse(line))
    } catch {
      // A corrupted line shouldn't hide the rest of the session.
    }
  }
  return out
}
