// Which mode each thing the user does leads to: the disc, the panel, the watch strip, or hidden
// in the tray. Pure, so the moves are tested without windows (window.ts carries them out).
import { isOpenMode, type OpenMode, type ViewMode, type WindowMode } from '../shared/settings'

export interface ModeState {
  mode: WindowMode
  lastOpened: OpenMode
  /** What was on screen before hiding, to come back to. */
  beforeHidden: ViewMode
}

/**
 * - shortcut: the global shortcut, a "show me" key: opens what the disc would, folds it back.
 * - trayClick / trayShowHide: a click on the tray icon, and its Show/Hide item.
 * - close: Alt+F4 on the disc, or the header's close button: hides to the tray (quitting is the
 *   tray's Quit).
 * - fold: Alt+F4 on the panel: folds it back into the disc.
 * - summon: Bat-Signal launched again while it runs: brought back as it was, or forward.
 */
export type ModeAction = 'shortcut' | 'trayClick' | 'trayShowHide' | 'close' | 'fold' | 'summon'

export function nextMode({ mode, lastOpened, beforeHidden }: ModeState, action: ModeAction): WindowMode {
  switch (action) {
    case 'shortcut':
      return isOpenMode(mode) ? 'signal' : lastOpened
    case 'trayClick':
      return mode === 'panel' ? 'signal' : 'panel'
    case 'trayShowHide':
      return mode === 'hidden' ? beforeHidden : 'hidden'
    case 'close':
      return 'hidden'
    case 'fold':
      return 'signal'
    case 'summon':
      return mode === 'hidden' ? beforeHidden : mode
  }
}
