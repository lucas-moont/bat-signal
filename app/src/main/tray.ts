// Bat-Signal's icon by the clock: the way back when every window is hidden, lit while something
// needs you. What it shows and offers comes from trayMenu.ts; this only talks to Electron.
import { app, Menu, Tray } from 'electron'
import type { StoreSnapshot } from '../shared/types'
import { TRAY_WORDS } from '../shared/words'
import { trayLook, trayMenu, type TrayAction } from './trayMenu'
import type { BatSignalWindows } from './window'
import restIco from '../../resources/icons/tray.ico?asset'
import litIco from '../../resources/icons/tray-lit.ico?asset'
import restPng from '../../resources/icons/tray.png?asset'
import litPng from '../../resources/icons/tray-lit.png?asset'

/** Windows picks a size per DPI from the .ico; Linux trays read one PNG and scale it themselves. */
const [restIcon, litIcon] = process.platform === 'win32' ? [restIco, litIco] : [restPng, litPng]
/**
 * Linux trays (StatusNotifierItem) open the menu themselves and send no right-click: the menu is
 * handed over ahead, and handed over again whenever the view it ticks changes.
 */
const MENU_AHEAD = process.platform === 'linux'

/** Clicks closer than this are one double-click: the panel opens once, not open-and-shut. */
const DOUBLE_CLICK_MS = 500

export class BatSignalTray {
  /** Held here for the app's life: a Tray left to the garbage collector vanishes from the taskbar. */
  private readonly tray: Tray
  private lit = false
  private tooltip = ''
  private lastClick = 0

  constructor(private readonly windows: BatSignalWindows) {
    this.tray = new Tray(restIcon)
    this.tray.setToolTip(TRAY_WORDS.name)
    this.tray.on('click', () => {
      const now = Date.now()
      if (now - this.lastClick < DOUBLE_CLICK_MS) return
      this.lastClick = now
      windows.act('trayClick')
    })
    if (MENU_AHEAD) {
      this.tray.setContextMenu(this.menu())
      windows.onModeChange = () => this.tray.setContextMenu(this.menu())
    } else {
      // Built as it opens, so it always ticks the view on screen.
      this.tray.on('right-click', () => this.tray.popUpContextMenu(this.menu()))
    }
  }

  /** A new snapshot: light the icon (or put it out) and update the count in its tooltip. */
  update(snapshot: StoreSnapshot): void {
    const { lit, tooltip } = trayLook(snapshot)
    if (lit !== this.lit) {
      this.lit = lit
      this.tray.setImage(lit ? litIcon : restIcon)
    }
    // Each change is a call into the Windows shell: only make it when the text changes.
    if (tooltip !== this.tooltip) {
      this.tooltip = tooltip
      this.tray.setToolTip(tooltip)
    }
  }

  private menu(): Menu {
    return Menu.buildFromTemplate(
      trayMenu(this.windows.mode).map((item) =>
        item === 'separator'
          ? { type: 'separator' }
          : {
              label: item.label,
              type: item.checked === undefined ? 'normal' : 'radio',
              checked: item.checked,
              click: () => this.run(item.action),
            },
      ),
    )
  }

  private run(action: TrayAction): void {
    if (action === 'showHide') this.windows.act('trayShowHide')
    else if (action === 'settings') this.windows.openSettings()
    else if (action === 'quit') app.quit()
    else this.windows.setMode(action)
  }
}
