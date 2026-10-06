import { describe, expect, it } from 'vitest'
import { nextMode, type ModeAction, type ModeState } from '../src/main/modes'

const at = (mode: ModeState['mode'], more: Partial<ModeState> = {}): ModeState => ({
  mode,
  lastOpened: 'watch',
  beforeHidden: 'panel',
  ...more,
})
const after = (state: ModeState, action: ModeAction) => nextMode(state, action)

describe('nextMode: the global shortcut', () => {
  it('opens what the disc would open, and folds it back', () => {
    expect(after(at('signal'), 'shortcut')).toBe('watch')
    expect(after(at('signal', { lastOpened: 'panel' }), 'shortcut')).toBe('panel')
    expect(after(at('panel'), 'shortcut')).toBe('signal')
    expect(after(at('watch'), 'shortcut')).toBe('signal')
  })

  it('brings a hidden Bat-Signal back, opened', () => {
    expect(after(at('hidden'), 'shortcut')).toBe('watch')
  })
})

describe('nextMode: the tray', () => {
  it('toggles the panel on a click', () => {
    expect(after(at('signal'), 'trayClick')).toBe('panel')
    expect(after(at('watch'), 'trayClick')).toBe('panel')
    expect(after(at('hidden'), 'trayClick')).toBe('panel')
    expect(after(at('panel'), 'trayClick')).toBe('signal')
  })

  it('hides everything, and shows it again as it was', () => {
    expect(after(at('watch'), 'trayShowHide')).toBe('hidden')
    expect(after(at('signal'), 'trayShowHide')).toBe('hidden')
    expect(after(at('hidden', { beforeHidden: 'signal' }), 'trayShowHide')).toBe('signal')
    expect(after(at('hidden', { beforeHidden: 'watch' }), 'trayShowHide')).toBe('watch')
  })
})

describe('nextMode: closing', () => {
  it('hides to the tray from the disc, by Alt+F4 or the close button', () => {
    expect(after(at('signal'), 'closeDisc')).toBe('hidden')
    expect(after(at('panel'), 'closeButton')).toBe('hidden')
    expect(after(at('watch'), 'closeButton')).toBe('hidden')
  })
})

describe('nextMode: launching Bat-Signal again', () => {
  it('opens a resting or hidden Bat-Signal, and leaves an open one as it is', () => {
    expect(after(at('signal'), 'summon')).toBe('watch')
    expect(after(at('hidden'), 'summon')).toBe('watch')
    expect(after(at('panel'), 'summon')).toBe('panel')
    expect(after(at('watch'), 'summon')).toBe('watch')
  })
})
