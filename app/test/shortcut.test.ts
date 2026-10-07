import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createShortcut, SHORTCUT_RETRY_MS, type ShortcutHost } from '../src/main/shortcut'

/** Windows' global hotkeys, in miniature: some combinations already belong to other apps. */
function fakeHost(takenByOthers: string[] = []) {
  const registered = new Map<string, () => void>()
  const calls: string[] = []
  const host: ShortcutHost = {
    register(accelerator, callback) {
      calls.push(`register ${accelerator}`)
      if (takenByOthers.includes(accelerator) || registered.has(accelerator)) return false
      registered.set(accelerator, callback)
      return true
    },
    unregister(accelerator) {
      calls.push(`unregister ${accelerator}`)
      registered.delete(accelerator)
    },
  }
  const press = (accelerator: string) => registered.get(accelerator)?.()
  return { host, registered, calls, press, takenByOthers }
}

/** A shortcut on a fake host, for the tests that do not care about presses. */
function setup(takenByOthers: string[] = []) {
  const windows = fakeHost(takenByOthers)
  return { windows, shortcut: createShortcut(windows.host, () => undefined) }
}

describe('createShortcut', () => {
  it('registers the shortcut, and a press calls back', () => {
    const windows = fakeHost()
    let pressed = 0
    const shortcut = createShortcut(windows.host, () => pressed++)
    shortcut.apply('Ctrl+Alt+B')
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+B', state: 'active' })
    windows.press('Ctrl+Alt+B')
    expect(pressed).toBe(1)
  })

  it('leaves an unchanged shortcut alone', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('Ctrl+Alt+B')
    expect(windows.calls).toEqual(['register Ctrl+Alt+B'])
  })

  it('swaps an old shortcut for a new one', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('Ctrl+Alt+N')
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+N', state: 'active' })
    expect([...windows.registered.keys()]).toEqual(['Ctrl+Alt+N'])
  })

  it('says when another app already has the shortcut, holding nothing', () => {
    const { windows, shortcut } = setup(['Ctrl+Alt+B'])
    shortcut.apply('Ctrl+Alt+B')
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+B', state: 'taken' })
    expect(windows.registered.size).toBe(0)
  })

  it('tries a taken shortcut again, in case the other app let it go', () => {
    const { windows, shortcut } = setup(['Ctrl+Alt+B'])
    shortcut.apply('Ctrl+Alt+B')
    windows.takenByOthers.length = 0
    shortcut.apply('Ctrl+Alt+B')
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+B', state: 'active' })
  })

  it('turns off with no shortcut', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('')
    expect(shortcut.status).toEqual({ accelerator: '', state: 'off' })
    expect(windows.registered.size).toBe(0)
  })

  it('lets go while a new shortcut is recorded, so the current one reaches the page', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.pause(true)
    expect(windows.registered.size).toBe(0)
    shortcut.pause(false)
    expect([...windows.registered.keys()]).toEqual(['Ctrl+Alt+B'])
  })

  it('applies a shortcut changed while paused once recording ends', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.pause(true)
    shortcut.apply('Ctrl+Alt+N')
    expect(windows.registered.size).toBe(0)
    shortcut.pause(false)
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+N', state: 'active' })
  })

  it('lets go when the app quits', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.dispose()
    expect(windows.registered.size).toBe(0)
  })

  it('keeps the same status until something changes, so a change is cheap to spot', () => {
    const { shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    const before = shortcut.status
    shortcut.apply('Ctrl+Alt+B')
    expect(shortcut.status).toBe(before)
    shortcut.apply('Ctrl+Alt+N')
    expect(shortcut.status).not.toBe(before)
  })

  it('says it is off once turned off while recording', () => {
    const { shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    shortcut.pause(true)
    shortcut.apply('')
    shortcut.pause(false)
    expect(shortcut.status).toEqual({ accelerator: '', state: 'off' })
  })

  it('says it is off once a taken shortcut is turned off', () => {
    const { shortcut } = setup(['Ctrl+Alt+B'])
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('')
    expect(shortcut.status).toEqual({ accelerator: '', state: 'off' })
  })

  it('keeps the same status while a retry finds the shortcut still taken', () => {
    const { shortcut } = setup(['Ctrl+Alt+B'])
    shortcut.apply('Ctrl+Alt+B')
    const before = shortcut.status
    shortcut.apply('Ctrl+Alt+B')
    expect(shortcut.status).toBe(before)
  })
})

describe('createShortcut: telling and retrying', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('tells of each change, and of nothing else', () => {
    const windows = fakeHost()
    let told = 0
    const shortcut = createShortcut(
      windows.host,
      () => undefined,
      () => told++,
    )
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('Ctrl+Alt+B')
    expect(told).toBe(1)
    shortcut.pause(true)
    shortcut.pause(false)
    shortcut.apply('')
    expect(told).toBe(2)
  })

  it('tries a taken shortcut again every SHORTCUT_RETRY_MS, and tells once it holds it', () => {
    const windows = fakeHost(['Ctrl+Alt+B'])
    let told = 0
    const shortcut = createShortcut(
      windows.host,
      () => undefined,
      () => told++,
    )
    shortcut.apply('Ctrl+Alt+B')
    vi.advanceTimersByTime(SHORTCUT_RETRY_MS)
    expect(told).toBe(1) // still taken: nothing new to tell
    windows.takenByOthers.length = 0
    vi.advanceTimersByTime(SHORTCUT_RETRY_MS)
    expect(shortcut.status).toEqual({ accelerator: 'Ctrl+Alt+B', state: 'active' })
    expect(told).toBe(2)
  })

  it('tries again only while another app has it', () => {
    const { windows, shortcut } = setup()
    shortcut.apply('Ctrl+Alt+B')
    windows.calls.length = 0
    vi.advanceTimersByTime(SHORTCUT_RETRY_MS * 3)
    expect(windows.calls).toEqual([])
    expect(vi.getTimerCount()).toBe(0)
  })

  it('stops trying once the shortcut is turned off, or the app quits', () => {
    const { shortcut } = setup(['Ctrl+Alt+B'])
    shortcut.apply('Ctrl+Alt+B')
    shortcut.apply('')
    expect(vi.getTimerCount()).toBe(0)
    shortcut.apply('Ctrl+Alt+B')
    shortcut.dispose()
    expect(vi.getTimerCount()).toBe(0)
  })
})
