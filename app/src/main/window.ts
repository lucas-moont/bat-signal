import { join } from 'node:path'
import { BrowserWindow, screen } from 'electron'
import { num, obj } from '../shared/guards'
import { IPC } from '../shared/ipc'
import type { Settings, WindowMode } from '../shared/settings'
import { jsonFile } from './jsonFile'
import { restoreBounds, type Rect } from './windowState'

const DEFAULTS = { width: 360, height: 520, minWidth: 300, minHeight: 360, margin: 16 }
const PILL = { width: 232, height: 60 }
const SAVE_DEBOUNCE_MS = 500

function parseRect(raw: unknown): Rect | undefined {
  const o = obj(raw)
  const [x, y, width, height] = [num(o['x']), num(o['y']), num(o['width']), num(o['height'])]
  return x === undefined || y === undefined || width === undefined || height === undefined
    ? undefined
    : { x, y, width, height }
}

const boundsFile = jsonFile('window.json', parseRect)

function displaysPrimaryFirst() {
  const primary = screen.getPrimaryDisplay()
  return [primary, ...screen.getAllDisplays().filter((d) => d.id !== primary.id)]
}

/**
 * The Batcave window: frameless and remembering its size and place. In pill mode it shrinks
 * to a small bar anchored at the same bottom-right corner, and grows back from there.
 */
export class BatcaveWindow {
  readonly win: BrowserWindow
  private current: WindowMode = 'full'
  private fullBounds: Rect
  private saveTimer?: NodeJS.Timeout

  constructor(settings: Settings) {
    this.fullBounds = restoreBounds(boundsFile.load(), displaysPrimaryFirst(), DEFAULTS)
    this.win = new BrowserWindow({
      ...this.fullBounds,
      minWidth: DEFAULTS.minWidth,
      minHeight: DEFAULTS.minHeight,
      frame: false,
      resizable: true,
      skipTaskbar: true,
      show: false,
      backgroundColor: '#000000',
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: true,
        contextIsolation: true,
      },
    })
    this.apply(settings)
    this.win.once('ready-to-show', () => this.win.show())
    this.win.on('moved', () => this.scheduleSave())
    this.win.on('resized', () => this.scheduleSave())

    if (process.env['ELECTRON_RENDERER_URL']) void this.win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    else void this.win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  apply(settings: Settings): void {
    this.win.setAlwaysOnTop(settings.alwaysOnTop, 'floating')
    this.win.setOpacity(settings.opacity)
  }

  /** The single source of truth for the mode; the window only reads it (and asks to change it). */
  get mode(): WindowMode {
    return this.current
  }

  setMode(mode: WindowMode): void {
    if (mode === this.current) return
    const now = this.win.getBounds()
    if (mode === 'pill') {
      this.fullBounds = now
      this.win.setMinimumSize(PILL.width, PILL.height)
      this.win.setResizable(false)
      this.win.setBounds({
        x: now.x + now.width - PILL.width,
        y: now.y + now.height - PILL.height,
        ...PILL,
      })
    } else {
      const { width, height } = this.fullBounds
      this.win.setResizable(true)
      this.win.setMinimumSize(DEFAULTS.minWidth, DEFAULTS.minHeight)
      // Grow from the pill's corner so the window stays where the user moved the pill.
      const next = { x: now.x + now.width - width, y: now.y + now.height - height, width, height }
      this.win.setBounds(restoreBounds(next, displaysPrimaryFirst(), DEFAULTS))
    }
    this.current = mode
    this.win.webContents.send(IPC.mode, mode)
  }

  private scheduleSave(): void {
    if (this.current !== 'full') return
    clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => {
      boundsFile.save(this.win.getBounds())
    }, SAVE_DEBOUNCE_MS)
  }
}
