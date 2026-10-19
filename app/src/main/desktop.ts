// Where Bat-Signal's windows land, and how it hears that the user moved them. Windows and X11 let
// an app put its windows anywhere and tell it when they move: that is this file's ElectronDesktop.
// Wayland does neither, so there the compositor is asked, where Bat-Signal knows how to ask it
// (hyprlandDesktop.ts); on any other Wayland desktop the windows open where the compositor puts them.
import { screen, type BrowserWindow, type BrowserWindowConstructorOptions } from 'electron'
import type { Rect } from './windowState'

/** Which of Bat-Signal's two windows: the compositor tells them apart by it. */
export type WindowRole = 'panel' | 'signal'

export interface Desktop {
  /** What every window is made with, beyond its own options. */
  readonly windowOptions: BrowserWindowConstructorOptions
  /** Screens, the primary first, each with the area windows may use. */
  displays(): { bounds: Rect; workArea: Rect }[]
  /** Called once per window, as it is made, before it first shows. */
  adopt(win: BrowserWindow, role: WindowRole): void
  setBounds(win: BrowserWindow, rect: Rect): void
  /** Where the window is: on Wayland only the compositor knows, and Electron's own answer is a guess. */
  getBounds(win: BrowserWindow): Rect
  /** Shows the window, taking the keyboard or leaving it where it is. */
  show(win: BrowserWindow, focus: boolean): void
  hide(win: BrowserWindow): void
  /** Whether the user may resize the window by its edges, and how small it may get. */
  setSizing(
    win: BrowserWindow,
    sizing: { resizable: boolean; minSize: { width: number; height: number } },
  ): void
  /** How opaque the window is, 0 to 1 (Electron alone does nothing on Linux). */
  setOpacity(win: BrowserWindow, opacity: number): void
  /**
   * Runs when the user moves or resizes the window by hand: with `settled` false while the move is
   * under way, and true once it is over and the window's place is worth keeping.
   */
  onUserMove(win: BrowserWindow, listener: (settled: boolean) => void): void
  /** Always-on-top must be set again now and then: Windows' screenshot overlay drops it. */
  readonly reassertsOnTop: boolean
}

/** How long a window must keep still, where no event says a move is over, before it counts as over. */
const SETTLE_MS = 300

function displaysPrimaryFirst() {
  const primary = screen.getPrimaryDisplay()
  return [primary, ...screen.getAllDisplays().filter((d) => d.id !== primary.id)]
}

/** The desktop as Electron sees it: right on Windows and X11, a guess on Wayland. */
export const electronDesktop: Desktop = {
  windowOptions: {},
  displays: displaysPrimaryFirst,
  adopt: () => undefined,
  setBounds: (win, rect) => win.setBounds(rect),
  getBounds: (win) => win.getBounds(),
  show(win, focus) {
    if (focus) {
      win.show()
      win.focus()
    } else {
      win.showInactive()
    }
  },
  hide: (win) => win.hide(),
  setSizing(win, { resizable, minSize }) {
    win.setResizable(resizable)
    win.setMinimumSize(minSize.width, minSize.height)
  },
  setOpacity: (win, opacity) => win.setOpacity(opacity),
  onUserMove(win, listener) {
    win.on('move', () => listener(false))
    if (process.platform === 'win32') {
      win.on('moved', () => listener(true))
      win.on('resized', () => listener(true))
      return
    }
    // X11 sends neither 'moved' nor 'resized': a move is over once the window has kept still a moment.
    let timer: NodeJS.Timeout | undefined
    const settle = () => {
      clearTimeout(timer)
      timer = setTimeout(() => listener(true), SETTLE_MS)
    }
    win.on('move', settle)
    win.on('resize', settle)
  },
  reassertsOnTop: process.platform === 'win32',
}
