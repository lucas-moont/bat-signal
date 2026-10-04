import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { app, BrowserWindow, screen } from 'electron'
import { IPC } from '../shared/ipc'
import type { Settings, WindowMode } from '../shared/settings'
import { restoreBounds, type Rect } from './windowState'

const DEFAULTS = { width: 360, height: 520, minWidth: 300, minHeight: 360, margin: 16 }
const PILL = { width: 232, height: 60 }
const SAVE_DEBOUNCE_MS = 500

const boundsFile = () => join(app.getPath('userData'), 'window.json')

function loadSavedBounds(): Rect | undefined {
  try {
    const raw = JSON.parse(readFileSync(boundsFile(), 'utf8')) as Partial<Rect>
    const ok = ['x', 'y', 'width', 'height'].every((k) => typeof raw[k as keyof Rect] === 'number')
    return ok ? (raw as Rect) : undefined
  } catch {
    return undefined
  }
}

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
    this.fullBounds = restoreBounds(loadSavedBounds(), displaysPrimaryFirst(), DEFAULTS)
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
      try {
        writeFileSync(boundsFile(), JSON.stringify(this.win.getBounds()))
      } catch {
        // Losing the saved position is harmless.
      }
    }, SAVE_DEBOUNCE_MS)
  }
}
