// Bat-Signal's windows on Hyprland. A Wayland window cannot place itself, so each one opens where a
// named window rule says (sent again before every show, with the place of the moment, so it never
// opens in the middle and jumps), and moves when Hyprland is told to move it. Floating and pinned,
// it stays above the tiles on every workspace, as always-on-top does elsewhere. Hyprland reports no
// move the user makes by hand, so while the panel shows, its place is read back every POLL_MS.
import type { BrowserWindow } from 'electron'
import { electronDesktop, type Desktop, type WindowRole } from './desktop'
import {
  clientRect,
  dispatchers,
  monitorFor,
  opacityProps,
  openingRule,
  sameRect,
  TITLES,
  workAreaOf,
  type Hyprland,
  type HyprMonitor,
  type LayoutRect,
} from './hyprland'

/** How often the shown panel's place is read back, to follow a drag or a resize made by hand. */
const POLL_MS = 250
/** How long a window may take to appear in Hyprland's list once it is shown. */
const MAP_WAIT_MS = 1000
const MAP_STEP_MS = 16

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface Tracked {
  role: WindowRole
  /** Where the window should be, or was last seen, in the layout. */
  rect: LayoutRect
  /** Hyprland's id for the window while it is on screen. A window shown again gets a new one. */
  address?: string
  /** Counts shows and hides: a show still on its way is dropped once a later one has come. */
  turn: number
  /** A move Bat-Signal asked for is on its way: what the poll reads meanwhile is not the user's. */
  placing: number
  listeners: ((settled: boolean) => void)[]
  /** The last poll saw the window move by hand, and the move may not be over. */
  moving: boolean
  opacity: number
}

export class HyprlandDesktop implements Desktop {
  readonly reassertsOnTop = false
  // Chromium sizes a Wayland window past what it was asked for: its own shadow widens it by 10
  // pixels once it shows, and a minimum size (from birth, or set later) or a fixed size comes out 20
  // pixels larger. So Chromium is given none of them, and the rules and dispatchers alone size the
  // windows. Hyprland's shadow is off too (LOOK).
  readonly windowOptions = { hasShadow: false, minWidth: 0, minHeight: 0 }
  private readonly tracked = new Map<BrowserWindow, Tracked>()
  private monitors: HyprMonitor[] = []
  private poll?: NodeJS.Timeout

  constructor(private readonly hyprland: Hyprland) {}

  /** Reads the screens before the first window is placed, so the corner is found on the right one. */
  async ready(): Promise<void> {
    await this.readMonitors()
  }

  private async readMonitors(): Promise<void> {
    this.monitors = await this.hyprland.monitors().catch(() => this.monitors)
  }

  displays() {
    return electronDesktop.displays().map((d) => {
      const monitor = this.monitors.find((m) => m.x === d.bounds.x && m.y === d.bounds.y)
      return monitor ? { ...d, workArea: workAreaOf(d.bounds, monitor.reserved) } : d
    })
  }

  adopt(win: BrowserWindow, role: WindowRole): void {
    // The page's own title would change the window's; the rules know it by this one.
    win.setTitle(TITLES[role])
    win.on('page-title-updated', (event) => event.preventDefault())
    this.tracked.set(win, {
      role,
      rect: win.getBounds(),
      turn: 0,
      placing: 0,
      listeners: [],
      moving: false,
      opacity: 1,
    })
  }

  private of(win: BrowserWindow): Tracked {
    const tracked = this.tracked.get(win)
    if (!tracked) throw new Error('A window Hyprland was not told about')
    return tracked
  }

  setBounds(win: BrowserWindow, rect: LayoutRect): void {
    const t = this.of(win)
    t.rect = rect
    // Electron keeps the size, and the place it believes the window is at.
    win.setBounds(rect)
    if (t.address) void this.place(t, t.address)
  }

  getBounds(win: BrowserWindow): LayoutRect {
    return this.of(win).rect
  }

  show(win: BrowserWindow, focus: boolean): void {
    const t = this.of(win)
    if (t.address && win.isVisible()) {
      // Already on screen: Electron alone would only raise it, and Hyprland would not hear of it.
      if (focus) void this.hyprland.dispatch(dispatchers.focus(t.address)).catch(warn)
      return
    }
    void this.open(win, t, ++t.turn, focus)
  }

  private async open(win: BrowserWindow, t: Tracked, turn: number, focus: boolean): Promise<void> {
    await this.readMonitors()
    const monitor = monitorFor(t.rect, this.monitors)
    if (monitor)
      await this.hyprland
        .eval(openingRule(t.role, t.rect, monitor, { focus, opacity: t.opacity }))
        .catch(warn)
    if (turn !== t.turn) return // hidden, or shown again, meanwhile
    electronDesktop.show(win, focus)
    const address = await this.mapped(t)
    if (turn !== t.turn || !address) return
    t.address = address
    // The rule opened it where it should be then; it may have been moved since. A Wayland window
    // cannot take the keyboard itself: Hyprland gives it.
    await this.place(t, address)
    if (focus) await this.hyprland.dispatch(dispatchers.focus(address)).catch(warn)
    if (t.role === 'panel') this.startPolling()
  }

  /** Hyprland's id for a window just shown, once it has appeared in Hyprland's list. */
  private async mapped(t: Tracked): Promise<string | undefined> {
    for (let waited = 0; waited < MAP_WAIT_MS; waited += MAP_STEP_MS) {
      const clients = await this.hyprland.clients().catch(() => [])
      const mine = clients.find((c) => c.pid === process.pid && c.initialTitle === TITLES[t.role] && c.mapped)
      if (mine) return mine.address
      await sleep(MAP_STEP_MS)
    }
    return undefined
  }

  /** Tells Hyprland where the window goes now. */
  private async place(t: Tracked, address: string): Promise<void> {
    const { x, y, width, height } = t.rect
    t.placing++
    try {
      await this.hyprland.dispatch(
        dispatchers.float(address),
        dispatchers.pin(address),
        dispatchers.resize(address, width, height),
        dispatchers.move(address, x, y),
      )
    } catch (err) {
      warn(err)
    } finally {
      t.placing--
    }
  }

  hide(win: BrowserWindow): void {
    const t = this.of(win)
    t.turn++
    t.address = undefined
    t.moving = false
    win.hide()
  }

  /**
   * Left resizable and without a minimum (see windowOptions). Hyprland resizes a window by hand only
   * with a held key, so the strip loses little by it.
   */
  setSizing(): void {}

  setOpacity(win: BrowserWindow, opacity: number): void {
    const t = this.of(win)
    t.opacity = opacity
    if (t.address) void this.hyprland.dispatch(...opacityProps(t.address, opacity)).catch(warn)
  }

  onUserMove(win: BrowserWindow, listener: (settled: boolean) => void): void {
    this.of(win).listeners.push(listener)
  }

  /** Reads the panel's place back while it shows, and stops once no window of ours is on screen. */
  private startPolling(): void {
    if (this.poll) return
    this.poll = setInterval(() => void this.readBack(), POLL_MS)
  }

  private async readBack(): Promise<void> {
    const watched = [...this.tracked.values()].filter((t) => t.address && t.role === 'panel')
    if (!watched.length) {
      clearInterval(this.poll)
      this.poll = undefined
      return
    }
    const clients = await this.hyprland.clients().catch(() => undefined)
    for (const t of watched) {
      const client = clients?.find((c) => c.address === t.address)
      if (!client || t.placing) continue
      const seen = clientRect(client)
      if (!sameRect(seen, t.rect)) {
        t.rect = seen
        t.moving = true
        for (const listener of t.listeners) listener(false)
      } else if (t.moving) {
        t.moving = false
        for (const listener of t.listeners) listener(true)
      }
    }
  }
}

const warn = (err: unknown) => console.warn('[bat-signal] Hyprland:', err)
