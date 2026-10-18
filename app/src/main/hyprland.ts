// Hyprland's control socket, the one hyprctl talks to: one short connection per request. Bat-Signal
// speaks its Lua dialect (Hyprland 0.55 and later). An older Hyprland answers it with an error, and
// Bat-Signal then works as on any other Wayland desktop. The requests are built by pure functions
// here, so they are tested without Hyprland.
import { connect } from 'node:net'
import { join } from 'node:path'
import type { WindowRole } from './desktop'

/** Hyprland answers in a few milliseconds; past this, it is busy or gone, and the request fails. */
const TIMEOUT_MS = 1000

/** A window, as `j/clients` lists it: only the fields Bat-Signal reads. */
export interface HyprClient {
  address: string
  pid: number
  title: string
  initialTitle: string
  at: [number, number]
  size: [number, number]
  mapped: boolean
  hidden: boolean
  fullscreen: number
  /** 0 for the window in focus, then 1, 2… in the order they last had it. */
  focusHistoryID: number
}

/** A screen, as `j/monitors` lists it. Sizes are in pixels, before `scale`. */
export interface HyprMonitor {
  name: string
  x: number
  y: number
  width: number
  height: number
  scale: number
  transform: number
  /** What bars and docks keep: left, top, right, bottom, in layout pixels. */
  reserved: [number, number, number, number]
}

/** The control socket of the Hyprland this session runs in, if it runs in one. */
export function socketPath(env: NodeJS.ProcessEnv = process.env): string | undefined {
  const signature = env['HYPRLAND_INSTANCE_SIGNATURE']
  const runtime = env['XDG_RUNTIME_DIR']
  return signature && runtime ? join(runtime, 'hypr', signature, '.socket.sock') : undefined
}

/** A Lua string literal. The values are Bat-Signal's own (titles, names) or Hyprland's (addresses). */
export function lua(value: string): string {
  if ([...value].some((c) => c.charCodeAt(0) < 0x20))
    throw new Error('A Lua string for Hyprland cannot hold control characters')
  return `"${value.replace(/[\\"]/g, (c) => `\\${c}`)}"`
}

/** The window selector for one window, by its address. */
const at = (address: string) => `window = ${lua(`address:${address}`)}`

/** Dispatchers, as Hyprland's Lua dialect writes them. Each is one call to hl.dispatch. */
export const dispatchers = {
  float: (address: string) => `hl.dsp.window.float({ action = "on", ${at(address)} })`,
  pin: (address: string) => `hl.dsp.window.pin({ action = "on", ${at(address)} })`,
  /** To a point in the layout, which spans every screen (not relative to the window). */
  move: (address: string, x: number, y: number) =>
    `hl.dsp.window.move({ x = ${Math.round(x)}, y = ${Math.round(y)}, ${at(address)} })`,
  resize: (address: string, width: number, height: number) =>
    `hl.dsp.window.resize({ x = ${Math.round(width)}, y = ${Math.round(height)}, ${at(address)} })`,
  focus: (address: string) => `hl.dsp.focus({ ${at(address)} })`,
  /** One of a window's dynamic properties: the effects window rules have. */
  setProp: (address: string, prop: string, value: string) =>
    `hl.dsp.window.set_prop({ prop = ${lua(prop)}, value = ${lua(value)}, ${at(address)} })`,
}

/** How opaque a window is, focused or not, full screen or not, whatever the user's own rules say. */
export const opacityEffect = (opacity: number): string => {
  const o = String(Math.round(opacity * 100) / 100)
  return `${o} override ${o} override ${o} override`
}

/** The same, set on a window already on screen: set_prop takes one value per property. */
export const opacityProps = (address: string, opacity: number): string[] => {
  const o = String(Math.round(opacity * 100) / 100)
  return [
    ...['opacity', 'opacity_inactive', 'opacity_fullscreen'].map((prop) =>
      dispatchers.setProp(address, prop, o),
    ),
    ...['opacity_override', 'opacity_inactive_override', 'opacity_fullscreen_override'].map((prop) =>
      dispatchers.setProp(address, prop, '1'),
    ),
  ]
}

/** One request that runs several dispatchers, in order. */
export const batch = (calls: string[]): string =>
  `[[BATCH]]${calls.map((call) => `dispatch ${call}`).join(';')}`

/** Every answer to a batch is "ok", or something went wrong (an error is the line that says why). */
export const allOk = (reply: string): boolean =>
  reply
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .every((line) => line === 'ok')

export class Hyprland {
  constructor(private readonly path: string) {}

  request(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const socket = connect(this.path)
      let reply = ''
      socket.setEncoding('utf8')
      socket.setTimeout(TIMEOUT_MS, () => socket.destroy(new Error('Hyprland did not answer')))
      socket.on('connect', () => socket.write(command))
      socket.on('data', (chunk: string) => (reply += chunk))
      socket.on('end', () => resolve(reply))
      socket.on('error', reject)
    })
  }

  async clients(): Promise<HyprClient[]> {
    return JSON.parse(await this.request('j/clients')) as HyprClient[]
  }

  async monitors(): Promise<HyprMonitor[]> {
    return JSON.parse(await this.request('j/monitors')) as HyprMonitor[]
  }

  async activeWindow(): Promise<HyprClient | undefined> {
    const window = JSON.parse(await this.request('j/activewindow')) as Partial<HyprClient>
    return window.address ? (window as HyprClient) : undefined
  }

  /** Runs the dispatchers in one request; rejects if Hyprland refused any of them. */
  async dispatch(...calls: string[]): Promise<void> {
    if (!calls.length) return
    const reply = await this.request(batch(calls))
    if (!allOk(reply)) throw new Error(`Hyprland refused: ${reply.trim()}`)
  }

  /** Runs Lua in Hyprland's configuration; rejects with Hyprland's error. */
  async eval(code: string): Promise<void> {
    const reply = (await this.request(`eval ${code}`)).trim()
    if (reply !== 'ok') throw new Error(`Hyprland refused: ${reply}`)
  }

  /** Whether this Hyprland speaks Lua (0.55 and later): an older one does not know eval. */
  speaksLua(): Promise<boolean> {
    return this.eval('return true').then(
      () => true,
      () => false,
    )
  }
}

/** The Hyprland this session runs in, or undefined on any other desktop. */
export function sessionHyprland(env: NodeJS.ProcessEnv = process.env): Hyprland | undefined {
  const path = process.platform === 'linux' ? socketPath(env) : undefined
  return path ? new Hyprland(path) : undefined
}

/** A rectangle in Hyprland's layout, which spans every screen in logical pixels. */
export interface LayoutRect {
  x: number
  y: number
  width: number
  height: number
}

/** A screen's place in the layout: its pixels divided by its scale, turned when it is turned. */
export function monitorRect(m: HyprMonitor): LayoutRect {
  const sideways = m.transform % 2 === 1
  const [width, height] = sideways ? [m.height, m.width] : [m.width, m.height]
  return { x: m.x, y: m.y, width: Math.round(width / m.scale), height: Math.round(height / m.scale) }
}

/** The part of a screen left to windows, once bars and docks have what they reserve. */
export function workAreaOf(
  bounds: LayoutRect,
  [left, top, right, bottom]: HyprMonitor['reserved'],
): LayoutRect {
  return {
    x: bounds.x + left,
    y: bounds.y + top,
    width: bounds.width - left - right,
    height: bounds.height - top - bottom,
  }
}

/** The screen holding the middle of a rectangle, or the nearest one when it is off every screen. */
export function monitorFor(rect: LayoutRect, monitors: HyprMonitor[]): HyprMonitor | undefined {
  const [cx, cy] = [rect.x + rect.width / 2, rect.y + rect.height / 2]
  const away = (m: HyprMonitor) => {
    const r = monitorRect(m)
    return Math.hypot(
      Math.max(r.x - cx, 0, cx - (r.x + r.width)),
      Math.max(r.y - cy, 0, cy - (r.y + r.height)),
    )
  }
  return monitors.reduce<HyprMonitor | undefined>(
    (best, m) => (!best || away(m) < away(best) ? m : best),
    undefined,
  )
}

/** A window's place as Hyprland lists it. */
export const clientRect = (c: Pick<HyprClient, 'at' | 'size'>): LayoutRect => ({
  x: c.at[0],
  y: c.at[1],
  width: c.size[0],
  height: c.size[1],
})

/** Within a pixel: Hyprland and Electron round fractional scales each their own way. */
export const sameRect = (a: LayoutRect, b: LayoutRect): boolean =>
  Math.abs(a.x - b.x) <= 1 &&
  Math.abs(a.y - b.y) <= 1 &&
  Math.abs(a.width - b.width) <= 1 &&
  Math.abs(a.height - b.height) <= 1

/** The windows' titles, which the rules match: each is the title the window opens with. */
export const TITLES: Record<WindowRole, string> = { panel: 'Bat-Signal', signal: 'Bat-Signal Signal' }

/**
 * The named rule that opens a window at `rect`, on the screen that holds it: floating and pinned,
 * with no frame of Hyprland's around Bat-Signal's own, as opaque as the settings say (over the
 * user's own rules), taking the keyboard or not. It matches the window's first title exactly, and
 * sending a name Hyprland already has updates that rule, so it is sent again before each show.
 */
export function openingRule(
  role: WindowRole,
  rect: LayoutRect,
  monitor: HyprMonitor,
  { focus, opacity }: { focus: boolean; opacity: number },
): string {
  const screen = monitorRect(monitor)
  const pair = (a: number, b: number) => `{ ${Math.round(a)}, ${Math.round(b)} }`
  return [
    `hl.window_rule({ name = ${lua(`bat-signal-${role}`)}`,
    `match = { initial_title = ${lua(`^${TITLES[role]}$`)} }`,
    'float = true, pin = true, border_size = 0, no_shadow = true, no_blur = true, rounding = 0, no_anim = true',
    `no_initial_focus = ${!focus}`,
    `opacity = ${lua(opacityEffect(opacity))}`,
    `monitor = ${lua(monitor.name)}`,
    `move = ${pair(rect.x - screen.x, rect.y - screen.y)}`,
    `size = ${pair(rect.width, rect.height)} })`,
  ].join(', ')
}
