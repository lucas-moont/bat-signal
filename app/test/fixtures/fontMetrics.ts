import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

/**
 * A font's advance widths, read from a WOFF file (the Fontsource packages ship one beside each
 * WOFF2): enough to measure a word in it as the page lays it out, kerning aside. Kerning only ever
 * tightens our stamp words' pairs a little, so a width read without it errs on the wide side.
 */
export interface FontMetrics {
  /** A text's width at a size in px, before any letter spacing. */
  width(text: string, size: number): number
}

export function fontMetrics(file: string): FontMetrics {
  const woff = readFileSync(file)
  if (woff.toString('latin1', 0, 4) !== 'wOFF') throw new Error(`${file} is not a WOFF font`)
  /** Each table's entry in the directory, by tag: only the four tables read are inflated. */
  const entries = new Map(
    Array.from({ length: woff.readUInt16BE(12) }, (_, i) => 44 + i * 20).map(
      (entry) => [woff.toString('latin1', entry, entry + 4), entry] as const,
    ),
  )
  const table = (tag: string) => {
    const entry = entries.get(tag)
    if (entry === undefined) throw new Error(`${file} has no ${tag} table`)
    const [offset, compressed, length] = [4, 8, 12].map((at) => woff.readUInt32BE(entry + at)) as [
      number,
      number,
      number,
    ]
    const data = woff.subarray(offset, offset + compressed)
    return compressed < length ? inflateSync(data) : data
  }

  const unitsPerEm = table('head').readUInt16BE(18)
  const metrics = table('hhea').readUInt16BE(34)
  const hmtx = table('hmtx')
  const advance = (glyph: number) => hmtx.readUInt16BE(4 * Math.min(glyph, metrics - 1))
  const glyphOf = cmap(table('cmap'))

  return {
    width: (text, size) =>
      ([...text].reduce((sum, char) => sum + advance(glyphOf(char.codePointAt(0)!)), 0) * size) / unitsPerEm,
  }
}

/** The character-to-glyph map of a cmap table's Unicode subtable (format 4 or 12). */
function cmap(data: Buffer): (code: number) => number {
  const subtables = Array.from({ length: data.readUInt16BE(2) }, (_, i) => ({
    platform: data.readUInt16BE(4 + i * 8),
    encoding: data.readUInt16BE(6 + i * 8),
    at: data.readUInt32BE(8 + i * 8),
  }))
  const unicode = subtables.filter(
    ({ platform, encoding }) => platform === 0 || (platform === 3 && encoding <= 10),
  )
  for (const { at } of unicode) {
    const format = data.readUInt16BE(at)
    if (format === 12) {
      const groups = data.readUInt32BE(at + 12)
      return (code) => {
        for (let g = 0; g < groups; g++) {
          const [start, end, glyph] = [0, 4, 8].map((o) => data.readUInt32BE(at + 16 + g * 12 + o)) as [
            number,
            number,
            number,
          ]
          if (code >= start && code <= end) return glyph + code - start
        }
        return 0
      }
    }
    if (format === 4) {
      const segments = data.readUInt16BE(at + 6) / 2
      const ends = at + 14
      const starts = ends + 2 * segments + 2
      const deltas = starts + 2 * segments
      const offsets = deltas + 2 * segments
      return (code) => {
        for (let s = 0; s < segments; s++) {
          if (code > data.readUInt16BE(ends + 2 * s)) continue
          const start = data.readUInt16BE(starts + 2 * s)
          if (code < start) return 0
          const delta = data.readInt16BE(deltas + 2 * s)
          const offset = data.readUInt16BE(offsets + 2 * s)
          if (!offset) return (code + delta) & 0xffff
          const glyph = data.readUInt16BE(offsets + 2 * s + offset + 2 * (code - start))
          return glyph ? (glyph + delta) & 0xffff : 0
        }
        return 0
      }
    }
  }
  throw new Error('no Unicode cmap subtable in format 4 or 12')
}
