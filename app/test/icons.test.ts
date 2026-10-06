import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { emblemPath, ico } from '../scripts/icons.mts'

describe('emblemPath', () => {
  it('joins the bat out of BatEmblem.tsx, the one place it is drawn', () => {
    const source = readFileSync(join(__dirname, '../src/renderer/src/components/BatEmblem.tsx'), 'utf8')
    const path = emblemPath(source)
    expect(path).toMatch(/^M60 12 L65 2 .* Z$/)
    expect(path).not.toContain("'")
  })

  it('fails loudly when the emblem is no longer where it was', () => {
    expect(() => emblemPath('export const Bat = 1')).toThrow(/WINGS/)
  })
})

describe('ico', () => {
  it('packs PNG images behind a directory Windows can read', () => {
    const small = Uint8Array.of(1, 2, 3)
    const large = Uint8Array.of(4, 5, 6, 7)
    const file = ico([
      { size: 16, png: small },
      { size: 256, png: large },
    ])
    expect([file.readUInt16LE(0), file.readUInt16LE(2), file.readUInt16LE(4)]).toEqual([0, 1, 2])
    // First entry: 16x16, 32 bits, 3 bytes, right after the two 16-byte entries.
    expect([file[6], file[7], file.readUInt16LE(12), file.readUInt32LE(14), file.readUInt32LE(18)]).toEqual([
      16, 16, 32, 3, 38,
    ])
    // 256 is written as 0, and its image follows the first.
    expect([file[22], file[23], file.readUInt32LE(34)]).toEqual([0, 0, 41])
    expect([...file.subarray(38)]).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})
