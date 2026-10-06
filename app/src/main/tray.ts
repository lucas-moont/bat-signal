// Bat-Signal's icon by the clock: the way back when every window is hidden, lit while something
// needs you. What it shows and offers comes from trayMenu.ts; this only talks to Electron.
import { app, Menu, Tray } from 'electron'
import type { StoreSnapshot } from '../shared/types'
import { trayLook, trayMenu, type TrayAction } from './trayMenu'
import type { BatSignalWindows } from './window'
import restIcon from '../../resources/tray/tray.ico?asset'
import litIcon from '../../resources/tray/tray-lit.ico?asset'

export class BatSignalTray {
  /** Held here for the app's life: a Tray left to the garbage collector vanishes from the taskbar. */
  private readonly tray: Tray
  private lit = false

  constructor(private readonly windows: BatSignalWindows) {
    this.tray = new Tray(restIcon)
    this.tray.setToolTip('Bat-Signal')
    this.tray.on('click', () => windows.act('trayClick'))
    // Built as it opens, so it always ticks the view on screen.
    this.tray.on('right-click', () => this.tray.popUpContextMenu(this.menu()))
  }

  /** A new snapshot: light the icon (or put it out) and update the count in its tooltip. */
  update(snapshot: StoreSnapshot): void {
    const { lit, tooltip } = trayLook(snapshot)
    if (lit !== this.lit) {
      this.lit = lit
      this.tray.setImage(lit ? litIcon : restIcon)
    }
    this.tray.setToolTip(tooltip)
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
