import { join } from 'node:path'
import { app, BrowserWindow, screen } from 'electron'
import { num, obj } from '../shared/guards'
import { IPC } from '../shared/ipc'
import type { NoticeLayout, Settings, WindowMode } from '../shared/settings'
import type { StoreSnapshot } from '../shared/types'
import { jsonFile } from './jsonFile'
import { anchoredRect, cornerOf, noticePlacement, resolveAnchor, type Anchor, type Size } from './windowState'

const MARGIN = 16
/** A corner companion, not a big-screen app: the panel opens small. */
const PANEL = { width: 320, height: 440, minWidth: 300, minHeight: 360 }
/** The watch strip: narrow, as tall as its rows ask for (see setWatchHeight). */
const WATCH = { width: 280, minHeight: 56, initialHeight: 160, maxShare: 0.7 }
/** The signal window: just the disc, or the disc with a notice card next to it. */
const SIGNAL = { disc: { width: 96, height: 96 }, notice: { width: 320, height: 230 } }
const SAVE_DEBOUNCE_MS = 500

/** What the disc opens: the full panel or the watch strip, whichever was used last. */
type OpenMode = Exclude<WindowMode, 'signal'>

interface Place {
  anchor?: Anchor
  panel: Size
  open: OpenMode
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
    pair(obj(o['anchor']), 'x', 'y') ?? (old && oldSize ? cornerOf({ ...old, ...oldSize }) : undefined)
  const panel = pair(obj(o['panel']), 'width', 'height') ??
    oldSize ?? { width: PANEL.width, height: PANEL.height }
  return { anchor, panel, open: o['open'] === 'watch' ? 'watch' : 'panel' }
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
 * Bat-Signal's two windows, both hanging from one corner: the signal disc (transparent, the
 * resting form, grows when a notice card comes out) and the panel. Only one shows at a time;
 * the main process owns which (the mode) and the corner.
 */
export class BatSignalWindows {
  private readonly panel: BrowserWindow
  private readonly signal: BrowserWindow
  private current: WindowMode = 'signal'
  private anchor: Anchor
  private panelSize: Size
  private open: OpenMode
  private watchHeight: number = WATCH.initialHeight
  private noticeOut = false
  private latest?: StoreSnapshot
  private quitting = false
  private saveTimer?: NodeJS.Timeout

  constructor(settings: Settings) {
    const place = placeFile.load()
    this.anchor = resolveAnchor(place.anchor, displaysPrimaryFirst(), MARGIN)
    this.panelSize = place.panel
    this.open = place.open

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
      ...this.rect(SIGNAL.disc),
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
    app.on('before-quit', () => {
      this.quitting = true
      this.saveNow()
    })
    // Alt+F4 on the panel folds it away (with no window left the app would run invisibly);
    // on the signal it quits, as the close button does.
    this.panel.on('close', (e) => {
      if (this.quitting) return
      e.preventDefault()
      this.setMode('signal')
    })
    this.signal.on('close', () => {
      if (!this.quitting) app.quit()
    })

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

  /** Opens what the disc opened last: the panel or the watch strip. */
  reopen(): void {
    this.setMode(this.open)
  }

  /** Shows the panel (optionally on one case) or the watch strip, or folds back into the signal. */
  setMode(mode: WindowMode, focusSessionId?: string): void {
    if (mode === 'panel' || mode === 'watch') {
      // Opening silences the cards; the hidden page may never finish their exit.
      this.setClickThrough(false)
      this.noticeOut = false
      if (this.latest) this.panel.webContents.send(IPC.snapshot, this.latest)
      if (mode === 'panel') {
        this.panel.setMinimumSize(PANEL.minWidth, PANEL.minHeight)
        this.panel.setResizable(true)
        this.panel.setBounds(this.rect(this.panelSize))
      } else {
        this.panel.setResizable(false)
        this.panel.setMinimumSize(WATCH.width, WATCH.minHeight)
        this.panel.setBounds(this.rect({ width: WATCH.width, height: this.watchHeight }))
      }
      this.panel.show()
      if (mode === 'panel') this.panel.focus()
      this.signal.hide()
      if (focusSessionId) this.panel.webContents.send(IPC.focusCase, focusSessionId)
      if (mode !== this.open) {
        this.open = mode
        this.scheduleSave()
      }
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

  /**
   * The signal page is about to show a card (or has hidden the last one): grow the window
   * around the disc, or shrink it back. Returns which way the card opens.
   */
  setNoticeOut(out: boolean): NoticeLayout {
    if (out !== this.noticeOut) {
      this.setClickThrough(out)
      this.noticeOut = out
      if (this.current === 'signal') this.placeSignal()
    }
    const { below, right } = noticePlacement(this.anchor, SIGNAL, displaysPrimaryFirst())
    return { below, right }
  }

  /** While a card is out, the page turns clicks back on when the pointer is over the disc or the card. */
  setInteractive(interactive: boolean): void {
    if (this.noticeOut) this.signal.setIgnoreMouseEvents(!interactive, { forward: true })
  }

  /**
   * While a card is out, clicks on the window's transparent parts fall through to whatever is
   * underneath. Only then: forwarding the pointer to the page costs ~10% of a core on Windows,
   * and the disc alone leaves only small transparent corners.
   */
  private setClickThrough(on: boolean): void {
    this.signal.setIgnoreMouseEvents(on, { forward: true })
  }

  /** The disc is dragged by hand (a drag region would swallow its clicks). */
  moveSignalBy(dx: number, dy: number): void {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return
    // Keep the disc itself on screen, so dragging back works at once.
    const moved = { x: this.anchor.x + dx, y: this.anchor.y + dy }
    this.anchor = cornerOf(anchoredRect(moved, SIGNAL.disc, displaysPrimaryFirst()))
    this.placeSignal()
    this.scheduleSave()
  }

  private rect(size: Size) {
    return anchoredRect(this.anchor, size, displaysPrimaryFirst())
  }

  /** The signal window at its current size: the disc, or the disc with a notice card. */
  private placeSignal(): void {
    this.signal.setBounds(
      this.noticeOut
        ? noticePlacement(this.anchor, SIGNAL, displaysPrimaryFirst()).rect
        : this.rect(SIGNAL.disc),
    )
  }

  /** The watch strip measured its rows: fit the window to them, growing up from the corner. */
  setWatchHeight(height: number): void {
    if (!Number.isFinite(height)) return
    const area = screen.getDisplayNearestPoint(this.anchor).workArea
    this.watchHeight = Math.round(Math.min(Math.max(height, WATCH.minHeight), area.height * WATCH.maxShare))
    if (this.current === 'watch')
      this.panel.setBounds(this.rect({ width: WATCH.width, height: this.watchHeight }))
  }

  private followPanel(): void {
    if (this.current === 'signal') return
    const b = this.panel.getBounds()
    this.anchor = cornerOf(b)
    if (this.current === 'panel') this.panelSize = { width: b.width, height: b.height }
    this.scheduleSave()
  }

  private scheduleSave(): void {
    clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => this.saveNow(), SAVE_DEBOUNCE_MS)
  }

  private saveNow(): void {
    clearTimeout(this.saveTimer)
    placeFile.save({ anchor: this.anchor, panel: this.panelSize, open: this.open })
  }
}
