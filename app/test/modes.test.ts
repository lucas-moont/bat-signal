import { describe, expect, it } from 'vitest'
import { nextMode, type ModeState } from '../src/main/modes'

const at = (mode: ModeState['mode'], more: Partial<ModeState> = {}): ModeState => ({
  mode,
  lastOpened: 'watch',
  beforeHidden: 'panel',
  ...more,
})

describe('nextMode: the global shortcut', () => {
  it('opens what the disc would open, and folds it back', () => {
    expect(nextMode(at('signal'), 'shortcut')).toBe('watch')
    expect(nextMode(at('signal', { lastOpened: 'panel' }), 'shortcut')).toBe('panel')
    expect(nextMode(at('panel'), 'shortcut')).toBe('signal')
    expect(nextMode(at('watch'), 'shortcut')).toBe('signal')
  })

  it('brings a hidden Bat-Signal back, opened', () => {
    expect(nextMode(at('hidden'), 'shortcut')).toBe('watch')
  })
})

describe('nextMode: the tray', () => {
  it('toggles the panel on a click', () => {
    expect(nextMode(at('signal'), 'trayClick')).toBe('panel')
    expect(nextMode(at('watch'), 'trayClick')).toBe('panel')
    expect(nextMode(at('hidden'), 'trayClick')).toBe('panel')
    expect(nextMode(at('panel'), 'trayClick')).toBe('signal')
  })

  it('hides everything, and shows it again as it was', () => {
    expect(nextMode(at('watch'), 'trayShowHide')).toBe('hidden')
    expect(nextMode(at('signal'), 'trayShowHide')).toBe('hidden')
    expect(nextMode(at('hidden', { beforeHidden: 'signal' }), 'trayShowHide')).toBe('signal')
    expect(nextMode(at('hidden', { beforeHidden: 'watch' }), 'trayShowHide')).toBe('watch')
  })
})

describe('nextMode: closing', () => {
  it('hides to the tray, from the disc (Alt+F4) or the close button', () => {
    expect(nextMode(at('signal'), 'close')).toBe('hidden')
    expect(nextMode(at('panel'), 'close')).toBe('hidden')
    expect(nextMode(at('watch'), 'close')).toBe('hidden')
  })

  it('folds the panel back into the disc on Alt+F4', () => {
    expect(nextMode(at('panel'), 'fold')).toBe('signal')
  })
})

describe('nextMode: launching Bat-Signal again', () => {
  it('brings a hidden Bat-Signal back as it was, like Show', () => {
    expect(nextMode(at('hidden', { beforeHidden: 'signal' }), 'summon')).toBe('signal')
    expect(nextMode(at('hidden', { beforeHidden: 'panel' }), 'summon')).toBe('panel')
  })

  it('leaves a Bat-Signal on screen as it is, brought forward', () => {
    expect(nextMode(at('signal'), 'summon')).toBe('signal')
    expect(nextMode(at('panel'), 'summon')).toBe('panel')
    expect(nextMode(at('watch'), 'summon')).toBe('watch')
  })
})
