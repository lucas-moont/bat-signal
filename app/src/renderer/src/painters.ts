// The painters of the Atmospheres (shared/atmospheres.ts): each paints its kind on the canvas
// behind the panel, a step at a time on the shared 8 fps clock. Free of the DOM, so node tests
// drive them on a recording canvas.
import type { Atmosphere, LitWindowsAtmosphere, RainAtmosphere, SnowAtmosphere } from '@shared/atmospheres'
import { FPS } from './clockRate'

export interface Painter {
  /** The values of its Atmosphere's colors, in their order, as the page reads them. */
  recolor(colors: readonly string[]): void
  /** The canvas's new size in CSS pixels: the scene starts over to fill it. */
  resize(width: number, height: number): void
  /**
   * One tick of the clock, `dt` seconds after the last (0 right after a resize): move the scene
   * that far, then paint. A still scene may leave the canvas as it is on most ticks.
   */
  paint(ctx: CanvasRenderingContext2D, dt: number): void
}

/** One tick of the clock, in seconds. */
const STEP = 1 / FPS
/** The longest move painted: the page waking from a pause doesn't fling the scene across. */
const MAX_DT = 2 * STEP
/** The rain's frame rate on its own timer, before it joined the shared clock. */
const OLD_FPS = 15

/** How many drops or flakes a canvas this size holds at a density (per 1000 square pixels). */
const howMany = (width: number, height: number, density: number) =>
  Math.round(((width * height) / 1000) * density)

export function painterFor(atmosphere: Atmosphere, random: () => number = Math.random): Painter {
  switch (atmosphere.kind) {
    case 'rain':
      return rain(atmosphere, random)
    case 'snow':
      return snow(atmosphere, random)
    case 'lit-windows':
      return litWindows(atmosphere, random)
  }
}

interface Drop {
  x: number
  y: number
  len: number
  speed: number
  depth: number
}

/**
 * Rain: drops in depths, each depth stroked as one path a step. A streak is drawn as long as at the
 * old 15 frames a second relative to its step, so at 8 it covers the same share of the bigger
 * distance it falls between ticks and still reads as falling rain.
 */
function rain({ density, angle, depths }: RainAtmosphere, random: () => number): Painter {
  const slant = Math.tan(angle)
  const dx = Math.sin(angle)
  const dy = Math.cos(angle)
  const streak = STEP * OLD_FPS
  let drops: Drop[] = []
  let width = 0
  let height = 0
  let color = ''

  /** A drop in a depth (a random one by default): anywhere on the canvas, or just above it. */
  const spawn = (anywhere: boolean, depth = Math.floor(random() * depths.length), d = {} as Drop): Drop => {
    d.x = random() * (width + height * slant) - height * slant
    d.y = anywhere ? random() * height : -20
    d.len = (8 + depth * 5 + random() * 6) * streak
    d.speed = 380 + depth * 110 + random() * 80
    d.depth = depth
    return d
  }

  return {
    recolor([rain = '']) {
      color = rain
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      drops = Array.from({ length: howMany(width, height, density) }, () => spawn(true))
    },
    paint(ctx, dt) {
      const t = Math.min(dt, MAX_DT)
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = color
      depths.forEach((alpha, depth) => {
        ctx.globalAlpha = alpha
        ctx.beginPath()
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i]!
          if (d.depth !== depth) continue
          d.y += d.speed * t
          d.x += d.speed * t * slant
          // Gone below: it starts again above the top, in its depth, so this path still draws it.
          if (d.y - d.len > height) spawn(false, depth, d)
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d.x - dx * d.len, d.y - dy * d.len)
        }
        ctx.stroke()
      })
    },
  }
}

interface Flake {
  x: number
  y: number
  /** Where in the sway it starts, so the flakes don't sway in step. */
  phase: number
}

/** A flake's sway, a step a tick: out one way, back, out the other way, back. */
const SWAY = [0, 1, 0, -1]

/**
 * Snow: flakes in depths, each depth filled as one path a tick. They fall a few pixels a tick,
 * which at 8 steps a second reads as a slow snowfall, and sway on the clock (not at random), so a
 * flake never jitters.
 */
function snow({ density, depths, drift }: SnowAtmosphere, random: () => number): Painter {
  /** The flakes of each depth, from the farthest to the nearest. */
  let layers: Flake[][] = []
  let width = 0
  let height = 0
  /** Ticks of the clock since the snow began, fractional when a tick comes late. */
  let ticks = 0
  let color = ''

  return {
    recolor([snow = '']) {
      color = snow
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      ticks = 0
      layers = depths.map((): Flake[] => [])
      for (let i = howMany(width, height, density); i > 0; i--) {
        const [x, y, depth] = [random() * width, random() * height, Math.floor(random() * depths.length)]
        layers[depth]!.push({ x, y, phase: Math.floor(random() * SWAY.length) })
      }
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      ticks += step
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      // Each phase's sway this tick, worked out once for every flake.
      const sways = SWAY.map((_, phase) => drift * SWAY[(Math.floor(ticks) + phase) % SWAY.length]!)
      depths.forEach(({ alpha, size, fall }, depth) => {
        ctx.globalAlpha = alpha
        ctx.beginPath()
        for (const f of layers[depth]!) {
          f.y += fall * step
          // Gone below: it falls again from just above the top, in a column of its own.
          if (f.y > height) {
            f.y -= height + size
            f.x = random() * width
          }
          ctx.rect(f.x + sways[f.phase]!, f.y, size, size)
        }
        ctx.fill()
      })
    },
  }
}

/** A window: its top-left corner, and the light it shows (an index into the lights), if any. */
interface Window {
  x: number
  y: number
  light?: number
}

/** A window cell's size, and the mullion between two, in px. */
const CELL = { w: 3, h: 4, mullion: 1 }
/** The glass wall's margin inside a tower's edge, in px. */
const INSET = 3

/**
 * Lit windows: a still skyline, painted whole once (and again after a resize or new colors), then
 * a single window switching every so often: on while fewer than the share are lit, off while more,
 * so the night keeps its share however long it runs.
 */
function litWindows(
  { height, towers, lit, lights, every }: LitWindowsAtmosphere,
  random: () => number,
): Painter {
  let blocks: { x: number; y: number; w: number; h: number }[] = []
  let windows: Window[] = []
  let colors: readonly string[] = []
  let width = 0
  let canvasHeight = 0
  /** Whether the whole scene waits to be painted. */
  let whole = true
  /** Seconds since the last switch. */
  let since = 0

  /** One of the lights, by their shares. */
  const pickLight = () => {
    let r = random()
    const i = lights.findIndex(({ share }) => (r -= share) < 0)
    return i < 0 ? lights.length - 1 : i
  }
  /** One window afresh: the tower's glass, and its light over it if it has one. */
  const drawWindow = (ctx: CanvasRenderingContext2D, { x, y, light }: Window) => {
    ctx.globalAlpha = 1
    ctx.fillStyle = colors[0] ?? ''
    ctx.fillRect(x, y, CELL.w, CELL.h)
    if (light === undefined) return
    ctx.globalAlpha = lights[light]!.alpha
    ctx.fillStyle = colors[2 + light] ?? ''
    ctx.fillRect(x, y, CELL.w, CELL.h)
  }

  return {
    recolor(values) {
      colors = [...values]
      whole = true
    },
    resize(w, h) {
      ;[width, canvasHeight] = [w, h]
      ;[blocks, windows, whole, since] = [[], [], true, 0]
      const slot = w / towers
      const pitch = { x: CELL.w + CELL.mullion, y: CELL.h + CELL.mullion }
      for (let i = 0; i < towers; i++) {
        // A slab most of its slot wide, a gap either side, its flat roof in the band's top half.
        const bw = Math.round(slot * (0.72 + random() * 0.22))
        const bh = Math.round(h * height * (0.55 + random() * 0.45))
        const bx = Math.round(i * slot + random() * (slot - bw))
        const by = h - bh
        blocks.push({ x: bx, y: by, w: bw, h: bh })
        const cols = Math.floor((bw - 2 * INSET + CELL.mullion) / pitch.x)
        const rows = Math.floor((bh - INSET + CELL.mullion) / pitch.y)
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            windows.push({
              x: bx + INSET + c * pitch.x,
              y: by + INSET + r * pitch.y,
              light: random() < lit ? pickLight() : undefined,
            })
      }
    },
    paint(ctx, dt) {
      if (whole) {
        whole = false
        ctx.clearRect(0, 0, width, canvasHeight)
        ctx.globalAlpha = 1
        ctx.fillStyle = colors[0] ?? ''
        ctx.strokeStyle = colors[1] ?? ''
        for (const b of blocks) {
          ctx.fillRect(b.x, b.y, b.w, b.h)
          // On the half pixel, so the 1px edge lands on whole pixels.
          ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h)
        }
        lights.forEach(({ alpha }, light) => {
          ctx.globalAlpha = alpha
          ctx.fillStyle = colors[2 + light] ?? ''
          for (const w of windows) if (w.light === light) ctx.fillRect(w.x, w.y, CELL.w, CELL.h)
        })
        return
      }
      since += Math.min(dt, MAX_DT)
      if (since < every || !windows.length) return
      since -= every
      const on = windows.filter((w) => w.light !== undefined).length < lit * windows.length
      const start = Math.floor(random() * windows.length)
      for (let i = 0; i < windows.length; i++) {
        const w = windows[(start + i) % windows.length]!
        if ((w.light === undefined) !== on) continue
        w.light = on ? pickLight() : undefined
        drawWindow(ctx, w)
        return
      }
    },
  }
}
