import { join } from 'node:path'
import { BrowserWindow, screen } from 'electron'
import { num, obj } from '../shared/guards'
import { IPC } from '../shared/ipc'
import type { Settings, WindowMode } from '../shared/settings'
import { jsonFile } from './jsonFile'
import { anchoredRect, resolveAnchor, type Anchor } from './windowState'

const MARGIN = 16
const PANEL = { width: 360, height: 520, minWidth: 300, minHeight: 360 }
/** The signal window: just the disc, or the disc with a notice card above it. */
const DISC = { width: 96, height: 96 }
const NOTICE = { width: 320, height: 230 }
const SAVE_DEBOUNCE_MS = 500

interface Place {
  anchor?: Anchor
  panel: { width: number; height: number }
}

/** Reads window.json, including the older { x, y, width, height } of the single window. */
function parsePlace(raw: unknown): Place {
  const o = obj(raw)
  const anchor = obj(o['anchor'])
  const panel = obj(o['panel'])
  const [ax, ay] = [num(anchor['x']), num(anchor['y'])]
  const [pw, ph] = [num(panel['width']), num(panel['height'])]
  if (ax !== undefined && ay !== undefined && pw !== undefined && ph !== undefined) {
    return { anchor: { x: ax, y: ay }, panel: { width: pw, height: ph } }
  }
  const [x, y, width, height] = [num(o['x']), num(o['y']), num(o['width']), num(o['height'])]
  if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
    return { anchor: { x: x + width, y: y + height }, panel: { width, height } }
  }
  return { panel: { width: PANEL.width, height: PANEL.height } }
}

const placeFile = jsonFile('window.json', parsePlace)

function displaysPrimaryFirst() {
  const primary = screen.getPrimaryDisplay()
  return [primary, ...screen.getAllDisplays().filter((d) => d.id !== primary.id)]
}

function load(win: BrowserWindow, view: 'panel' | 'signal'): void {
  if (process.env['ELECTRON_RENDERER_URL'])
    void win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}?view=${view}`)
  else void win.loadFile(join(__dirname, '../renderer/index.html'), { query: { view } })
}

const webPreferences = {
  preload: join(__dirname, '../preload/index.js'),
  sandbox: true,
  contextIsolation: true,
}

/**
 * Batcave's two windows, both hanging from one corner: the Bat-Signal disc (transparent, the
 * resting form, grows upward when a notice card comes out) and the panel. Only one shows at
 * a time; the main process owns which (the mode) and the corner.
 */
export class BatcaveWindows {
  readonly panel: BrowserWindow
  readonly signal: BrowserWindow
  private current: WindowMode = 'signal'
  private anchor: Anchor
  private panelSize: { width: number; height: number }
  private noticeOut = false
  private saveTimer?: NodeJS.Timeout

  constructor(settings: Settings) {
    const place = placeFile.load()
    this.anchor = resolveAnchor(place.anchor, displaysPrimaryFirst(), MARGIN)
    this.panelSize = place.panel

    this.panel = new BrowserWindow({
      ...this.rect(this.panelSize),
      minWidth: PANEL.minWidth,
      minHeight: PANEL.minHeight,
      frame: false,
      resizable: true,
      skipTaskbar: true,
      show: false,
      backgroundColor: '#000000',
      // Otherwise Electron reports the never-shown panel as visible and its loops keep running.
      paintWhenInitiallyHidden: false,
      webPreferences,
    })
    this.signal = new BrowserWindow({
      ...this.rect(DISC),
      frame: false,
      transparent: true,
      resizable: false,
      hasShadow: false,
      skipTaskbar: true,
      show: false,
      webPreferences,
    })
    this.apply(settings)

    // ready-to-show did not fire for this transparent window in testing; show it once it has loaded.
    this.signal.webContents.once('did-finish-load', () => {
      if (this.current === 'signal') this.signal.showInactive()
    })
    // The panel is moved and resized by hand: its bottom-right corner becomes the anchor.
    this.panel.on('moved', () => this.followPanel())
    this.panel.on('resized', () => this.followPanel())
    for (const win of [this.panel, this.signal]) win.on('close', () => this.saveNow())

    load(this.panel, 'panel')
    load(this.signal, 'signal')
  }

  get mode(): WindowMode {
    return this.current
  }

  /** Sends to every page (both windows render the same data). */
  broadcast(channel: string, payload: unknown): void {
    for (const win of [this.panel, this.signal])
      if (!win.isDestroyed()) win.webContents.send(channel, payload)
  }

  apply(settings: Settings): void {
    for (const win of [this.panel, this.signal]) {
      win.setAlwaysOnTop(settings.alwaysOnTop, 'floating')
      win.setOpacity(settings.opacity)
    }
    this.broadcast(IPC.settings, settings)
  }

  /** Shows the panel (optionally on one case) or folds back into the signal. */
  setMode(mode: WindowMode, focusSessionId?: string): void {
    if (mode === 'panel') {
      this.panel.setBounds(this.rect(this.panelSize))
      this.panel.show()
      this.panel.focus()
      this.signal.hide()
      if (focusSessionId) this.panel.webContents.send(IPC.focusCase, focusSessionId)
    } else {
      this.panel.hide()
      this.signal.setBounds(this.rect(this.noticeOut ? NOTICE : DISC))
      this.signal.showInactive()
    }
    if (mode !== this.current) {
      this.current = mode
      this.broadcast(IPC.mode, mode)
    }
  }

  /** The signal page shows or hides a notice card: grow the window upward, or shrink it back. */
  setNoticeOut(out: boolean): void {
    this.noticeOut = out
    if (this.current === 'signal') this.signal.setBounds(this.rect(out ? NOTICE : DISC))
  }

  /** The disc is dragged by hand (a drag region would swallow its clicks). */
  moveSignalBy(dx: number, dy: number): void {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return
    this.anchor = { x: this.anchor.x + dx, y: this.anchor.y + dy }
    this.signal.setBounds(this.rect(this.noticeOut ? NOTICE : DISC))
    this.scheduleSave()
  }

  private rect(size: { width: number; height: number }) {
    return anchoredRect(this.anchor, size, displaysPrimaryFirst())
  }

  private followPanel(): void {
    if (this.current !== 'panel') return
    const b = this.panel.getBounds()
    this.anchor = { x: b.x + b.width, y: b.y + b.height }
    this.panelSize = { width: b.width, height: b.height }
    this.scheduleSave()
  }

  private scheduleSave(): void {
    clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.saveNow(), SAVE_DEBOUNCE_MS)
  }

  private saveNow(): void {
    clearTimeout(this.saveTimer)
    placeFile.save({ anchor: this.anchor, panel: this.panelSize })
  }
}
