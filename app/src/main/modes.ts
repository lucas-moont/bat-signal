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
 * - closeDisc / closeButton: Alt+F4 on the disc, and the header's close button: both hide to the
 *   tray (quitting is the tray's Quit).
 * - summon: Bat-Signal launched again while it runs.
 */
export type ModeAction = 'shortcut' | 'trayClick' | 'trayShowHide' | 'closeDisc' | 'closeButton' | 'summon'

export function nextMode({ mode, lastOpened, beforeHidden }: ModeState, action: ModeAction): WindowMode {
  switch (action) {
    case 'shortcut':
      return isOpenMode(mode) ? 'signal' : lastOpened
    case 'trayClick':
      return mode === 'panel' ? 'signal' : 'panel'
    case 'trayShowHide':
      return mode === 'hidden' ? beforeHidden : 'hidden'
    case 'closeDisc':
    case 'closeButton':
      return 'hidden'
    case 'summon':
      return isOpenMode(mode) ? mode : lastOpened
  }
}
