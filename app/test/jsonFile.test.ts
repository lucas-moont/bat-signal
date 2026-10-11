import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it, vi } from 'vitest'

const dir = vi.hoisted(() => ({ path: '' }))
vi.mock('electron', () => ({ app: { getPath: () => dir.path } }))

import { jsonFile } from '../src/main/jsonFile'

dir.path = mkdtempSync(join(tmpdir(), 'bat-signal-json-'))
afterAll(() => rmSync(dir.path, { recursive: true, force: true }))

const parse = (raw: unknown) => (typeof raw === 'object' && raw ? (raw as { theme?: string }) : {})
const settle = () => new Promise((r) => setTimeout(r, 400))

describe('a JSON file someone edits by hand', () => {
  // Until the Theme picker, editing settings.json is how a Theme changes; it must apply at once.
  it('is read again, and what it now holds handed over as written', async () => {
    const file = jsonFile('settings.json', parse)
    const seen: unknown[] = []
    const stop = file.watch((value) => seen.push(value))
    await settle()
    writeFileSync(join(dir.path, 'settings.json'), JSON.stringify({ theme: 'burton-1989' }))
    await vi.waitFor(() => expect(seen).toEqual([{ theme: 'burton-1989' }]), { timeout: 2000 })
    stop()
  })

  // A trailing comma, or a read caught mid-save: taking it for "no settings" would reset them all,
  // and the next save would write the defaults over the user's file.
  it("isn't news while it doesn't parse", async () => {
    const file = jsonFile('broken.json', parse)
    const seen: unknown[] = []
    const stop = file.watch((value) => seen.push(value))
    await settle()
    writeFileSync(join(dir.path, 'broken.json'), '{ "theme": "burton-1989", }')
    await settle()
    stop()
    expect(seen).toEqual([])
  })

  it("isn't news when the app wrote it itself", async () => {
    const file = jsonFile('window.json', parse)
    const seen: unknown[] = []
    const stop = file.watch((value) => seen.push(value))
    await settle()
    file.save({ theme: 'the-batman-2022' })
    await settle()
    stop()
    expect(seen).toEqual([])
  })
})
