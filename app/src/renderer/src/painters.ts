// The painters of the Atmospheres (shared/atmospheres.ts): each paints its kind on the canvas
// behind the panel, a step at a time on the shared 8 fps clock. Free of the DOM, so node tests
// drive them on a recording canvas.
import type { Atmosphere, LitWindowsAtmosphere, RainAtmosphere, SnowAtmosphere } from '@shared/atmospheres'
import { FPS } from './clockRate'

export interface Painter {
  /** Its Atmosphere's colors afresh, each read from the page by its variable's name. */
  recolor(colorOf: (variable: string) => string): void
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
function rain({ color: variable, density, angle, depths }: RainAtmosphere, random: () => number): Painter {
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
    recolor(colorOf) {
      color = colorOf(variable)
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
function snow({ color: variable, density, depths, drift }: SnowAtmosphere, random: () => number): Painter {
  /** The flakes of each depth, from the farthest to the nearest. */
  let layers: Flake[][] = []
  let width = 0
  let height = 0
  /** Ticks of the clock since the snow began, fractional when a tick comes late. */
  let ticks = 0
  let color = ''

  return {
    recolor(colorOf) {
      color = colorOf(variable)
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

/** The same numbers in [0, 1) every time from the same seed in [0, 1) (Park and Miller's). */
function seededFrom(seed: number): () => number {
  let state = Math.floor(seed * 2147483646) + 1
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646
}

/**
 * Lit windows: a still skyline, painted whole once (and again after a resize or new colors), then
 * a single window switching every so often: on while fewer than the share are lit, off while more,
 * so the night keeps its share however long it runs.
 */
function litWindows(
  { glass, edge, tallest, towers, litShare, lights, switchEvery }: LitWindowsAtmosphere,
  random: () => number,
): Painter {
  let blocks: { x: number; y: number; w: number; h: number }[] = []
  let windows: Window[] = []
  /** The glass's, the edges' and each light's color, as last read. */
  let colors = { glass: '', edge: '', lights: [] as string[] }
  let width = 0
  let height = 0
  /** Whether the whole scene waits to be painted. */
  let repaintWhole = true
  /** Seconds since the last switch. */
  let since = 0
  /** How many windows are lit. */
  let litCount = 0

  /** Its city: the same towers and windows after every resize, so the skyline never jumps. */
  const seed = random()

  /** One of the lights, by their shares; none if it has none. */
  const pickLight = (next = random) => {
    if (!lights.length) return undefined
    let r = next()
    const i = lights.findIndex(({ share }) => (r -= share) < 0)
    return i < 0 ? lights.length - 1 : i
  }
  /** A window's light over its glass, if it has one: the light's strength in its color. */
  const lightUp = (ctx: CanvasRenderingContext2D, { x, y, light }: Window) => {
    if (light === undefined || !colors.lights[light]) return
    ctx.globalAlpha = lights[light]!.alpha
    ctx.fillStyle = colors.lights[light]!
    ctx.fillRect(x, y, CELL.w, CELL.h)
  }

  return {
    recolor(colorOf) {
      colors = { glass: colorOf(glass), edge: colorOf(edge), lights: lights.map((l) => colorOf(l.color)) }
      repaintWhole = true
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      ;[blocks, windows, repaintWhole, since, litCount] = [[], [], true, 0, 0]
      const layout = seededFrom(seed)
      const slot = w / towers
      const pitch = { x: CELL.w + CELL.mullion, y: CELL.h + CELL.mullion }
      for (let i = 0; i < towers; i++) {
        // A slab most of its slot wide, a gap either side, its flat roof in the band's top half.
        const bw = Math.round(slot * (0.72 + layout() * 0.22))
        const bh = Math.round(h * tallest * (0.55 + layout() * 0.45))
        const bx = Math.round(i * slot + layout() * (slot - bw))
        const by = h - bh
        blocks.push({ x: bx, y: by, w: bw, h: bh })
        const cols = Math.floor((bw - 2 * INSET + CELL.mullion) / pitch.x)
        const rows = Math.floor((bh - INSET + CELL.mullion) / pitch.y)
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++) {
            const light = layout() < litShare ? pickLight(layout) : undefined
            if (light !== undefined) litCount++
            windows.push({ x: bx + INSET + c * pitch.x, y: by + INSET + r * pitch.y, light })
          }
      }
    },
    paint(ctx, dt) {
      // Without its glass's color yet (an empty one would leave the canvas's last fill in place,
      // a light's), it waits: the colors' arrival asks for the whole scene.
      if (!colors.glass) return
      if (repaintWhole) {
        repaintWhole = false
        ctx.clearRect(0, 0, width, height)
        ctx.globalAlpha = 1
        ctx.fillStyle = colors.glass
        ctx.strokeStyle = colors.edge
        for (const b of blocks) {
          ctx.fillRect(b.x, b.y, b.w, b.h)
          // On the half pixel, so the 1px edge lands on whole pixels.
          ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h)
        }
        for (const w of windows) lightUp(ctx, w)
        return
      }
      since += Math.min(dt, MAX_DT)
      if (since < switchEvery || !windows.length || !lights.length) return
      since -= switchEvery
      const on = litCount < litShare * windows.length
      const start = Math.floor(random() * windows.length)
      for (let i = 0; i < windows.length; i++) {
        const w = windows[(start + i) % windows.length]!
        if ((w.light === undefined) !== on) continue
        w.light = on ? pickLight() : undefined
        litCount += on ? 1 : -1
        // The glass afresh, half a pixel past the cell all round (into the mullions, glass too), so
        // a light's soft edges on a scaled display go with it; then its new light over it.
        ctx.globalAlpha = 1
        ctx.fillStyle = colors.glass
        ctx.fillRect(w.x - 0.5, w.y - 0.5, CELL.w + 1, CELL.h + 1)
        lightUp(ctx, w)
        return
      }
    },
  }
}
