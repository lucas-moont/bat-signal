import { join } from 'node:path'
import { BrowserWindow, screen } from 'electron'
import { num, obj } from '../shared/guards'
import { IPC } from '../shared/ipc'
import type { Settings, WindowMode } from '../shared/settings'
import type { StoreSnapshot } from '../shared/types'
import { jsonFile } from './jsonFile'
import { anchoredRect, resolveAnchor, type Anchor } from './windowState'

const MARGIN = 16
const PANEL = { width: 360, height: 520, minWidth: 300, minHeight: 360 }
/** The signal window: just the disc, or the disc with a notice card above it. */
const DISC = { width: 96, height: 96 }
const NOTICE = { width: 320, height: 230 }
const SAVE_DEBOUNCE_MS = 500

type Size = { width: number; height: number }

interface Place {
  anchor?: Anchor
  panel: Size
}

const pair = <A extends string, B extends string>(o: Record<string, unknown>, a: A, b: B) => {
  const [x, y] = [num(o[a]), num(o[b])]
  return x === undefined || y === undefined ? undefined : ({ [a]: x, [b]: y } as Record<A | B, number>)
}

/** Reads window.json, including the { x, y, width, height } that the single window used to save. */
function parsePlace(raw: unknown): Place {
  const o = obj(raw)
  const old = pair(o, 'x', 'y')
  const oldSize = pair(o, 'width', 'height')
  const anchor =
    pair(obj(o['anchor']), 'x', 'y') ??
    (old && oldSize ? { x: old.x + oldSize.width, y: old.y + oldSize.height } : undefined)
  const panel = pair(obj(o['panel']), 'width', 'height') ??
    oldSize ?? { width: PANEL.width, height: PANEL.height }
  return { anchor, panel }
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
  private readonly panel: BrowserWindow
  private readonly signal: BrowserWindow
  private current: WindowMode = 'signal'
  private anchor: Anchor
  private panelSize: Size
  private noticeOut = false
  private latest?: StoreSnapshot
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
    this.signal.webContents.once('did-finish-load', () => this.setMode(this.current))
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
  private broadcast(channel: string, payload: unknown): void {
    for (const win of [this.panel, this.signal])
      if (!win.isDestroyed()) win.webContents.send(channel, payload)
  }

  /**
   * A new store snapshot. The signal always gets it (it compares snapshots to find news); the
   * hidden panel gets only the latest one, when it opens, instead of re-rendering for nothing.
   */
  publish(snapshot: StoreSnapshot): void {
    this.latest = snapshot
    if (!this.signal.isDestroyed()) this.signal.webContents.send(IPC.snapshot, snapshot)
    if (this.current === 'panel' && !this.panel.isDestroyed())
      this.panel.webContents.send(IPC.snapshot, snapshot)
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
      if (this.latest) this.panel.webContents.send(IPC.snapshot, this.latest)
      this.panel.setBounds(this.rect(this.panelSize))
      this.panel.show()
      this.panel.focus()
      this.signal.hide()
      if (focusSessionId) this.panel.webContents.send(IPC.focusCase, focusSessionId)
    } else {
      this.panel.hide()
      this.placeSignal()
      this.signal.showInactive()
    }
    if (mode !== this.current) {
      this.current = mode
      this.broadcast(IPC.mode, mode)
    }
  }

  /** The signal page shows or hides a notice card: grow the window upward, or shrink it back. */
  setNoticeOut(out: boolean): void {
    if (out === this.noticeOut) return
    this.noticeOut = out
    if (this.current === 'signal') this.placeSignal()
  }

  /** The disc is dragged by hand (a drag region would swallow its clicks). */
  moveSignalBy(dx: number, dy: number): void {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return
    this.anchor = { x: this.anchor.x + dx, y: this.anchor.y + dy }
    this.placeSignal()
    // Where the window really went (kept on screen) is the corner, so dragging back works at once.
    const b = this.signal.getBounds()
    this.anchor = { x: b.x + b.width, y: b.y + b.height }
    this.scheduleSave()
  }

  private rect(size: Size) {
    return anchoredRect(this.anchor, size, displaysPrimaryFirst())
  }

  /** The signal window at its current size: the disc, or the disc with a notice card. */
  private placeSignal(): void {
    this.signal.setBounds(this.rect(this.noticeOut ? NOTICE : DISC))
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
