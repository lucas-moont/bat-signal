import { appendFile, mkdtemp, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { TranscriptTailer } from '../src/main/sources/transcriptTailer'

let dir: string
let file: string

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'batcave-'))
  file = join(dir, 'session.jsonl')
})
afterEach(() => rm(dir, { recursive: true, force: true }))

const read = async (t: TranscriptTailer) => (await t.readNew()).lines
const jsonl = (...objs: object[]) => objs.map((o) => JSON.stringify(o) + '\n').join('')

describe('TranscriptTailer.readNew', () => {
  it('returns every complete line on the first read', async () => {
    await writeFile(file, jsonl({ n: 1 }, { n: 2 }))
    expect(await read(new TranscriptTailer(file))).toEqual([{ n: 1 }, { n: 2 }])
  })
})

describe('TranscriptTailer.readNew on later reads', () => {
  it('returns only the lines appended since the last read', async () => {
    await writeFile(file, jsonl({ n: 1 }))
    const tailer = new TranscriptTailer(file)
    await read(tailer)
    await appendFile(file, jsonl({ n: 2 }, { n: 3 }))
    expect(await read(tailer)).toEqual([{ n: 2 }, { n: 3 }])
  })
})

describe('TranscriptTailer.readNew with a line still being written', () => {
  it('holds a partial last line until it is complete', async () => {
    await writeFile(file, jsonl({ n: 1 }) + '{"n":')
    const tailer = new TranscriptTailer(file)
    expect(await read(tailer)).toEqual([{ n: 1 }])
    await appendFile(file, '2}\n')
    expect(await read(tailer)).toEqual([{ n: 2 }])
  })

  it('handles a multi-byte character split across reads', async () => {
    const bytes = Buffer.from(JSON.stringify({ t: 'Gotham à noite' }) + '\n')
    const cut = bytes.indexOf(Buffer.from('à')) + 1
    await writeFile(file, bytes.subarray(0, cut))
    const tailer = new TranscriptTailer(file)
    expect(await read(tailer)).toEqual([])
    await appendFile(file, bytes.subarray(cut))
    expect(await read(tailer)).toEqual([{ t: 'Gotham à noite' }])
  })
})

describe('TranscriptTailer.readNew with bad input', () => {
  it('skips a corrupted line and keeps going', async () => {
    await writeFile(file, jsonl({ n: 1 }) + '{oops\n' + jsonl({ n: 2 }))
    expect(await read(new TranscriptTailer(file))).toEqual([{ n: 1 }, { n: 2 }])
  })

  it('returns nothing when the file does not exist yet', async () => {
    expect(await read(new TranscriptTailer(join(dir, 'missing.jsonl')))).toEqual([])
  })

  it('starts over when the file is replaced by a shorter one', async () => {
    await writeFile(file, jsonl({ n: 1 }, { n: 2 }, { n: 3 }))
    const tailer = new TranscriptTailer(file)
    await read(tailer)
    await writeFile(file, jsonl({ n: 9 }))
    expect(await read(tailer)).toEqual([{ n: 9 }])
  })
})

describe('TranscriptTailer.readNew with large transcripts', () => {
  it('reads lines longer than its internal chunk size', async () => {
    const big = 'x'.repeat(2_500_000)
    await writeFile(file, jsonl({ n: 1 }, { big }, { n: 3 }))
    const lines = await read(new TranscriptTailer(file))
    expect(lines).toHaveLength(3)
    expect((lines[1] as { big: string }).big).toHaveLength(2_500_000)
  })
})

describe('TranscriptTailer.readNew restarts', () => {
  it('says it restarted when the file was truncated', async () => {
    await writeFile(file, jsonl({ n: 1 }, { n: 2 }))
    const tailer = new TranscriptTailer(file)
    expect((await tailer.readNew()).restarted).toBe(false)
    await writeFile(file, jsonl({ n: 9 }))
    expect(await tailer.readNew()).toEqual({ lines: [{ n: 9 }], restarted: true })
  })

  it('notices a file replaced by a longer one', async () => {
    await writeFile(file, jsonl({ n: 1 }))
    const tailer = new TranscriptTailer(file)
    await tailer.readNew()
    const next = join(dir, 'next.jsonl')
    await writeFile(next, jsonl({ n: 7 }, { n: 8 }, { n: 9 }))
    await rename(next, file)
    expect(await tailer.readNew()).toEqual({ lines: [{ n: 7 }, { n: 8 }, { n: 9 }], restarted: true })
  })
})

describe('TranscriptTailer.readNew called concurrently', () => {
  it('returns each line exactly once', async () => {
    await writeFile(file, jsonl({ n: 1 }, { n: 2 }, { n: 3 }))
    const tailer = new TranscriptTailer(file)
    const [a, b] = await Promise.all([read(tailer), read(tailer)])
    expect([...a, ...b]).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }])
  })
})
