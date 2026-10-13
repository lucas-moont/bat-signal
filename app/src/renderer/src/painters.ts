// The painters of the Atmospheres (shared/atmospheres.ts): each paints its kind on the canvas
// behind the panel, a step at a time on the shared 8 fps clock. Free of the DOM, so node tests
// drive them on a recording canvas.
import type { Atmosphere, RainAtmosphere, SnowAtmosphere } from '@shared/atmospheres'
import { FPS } from './clockRate'

export interface Painter {
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

export const painterFor = (atmosphere: Atmosphere, random: () => number = Math.random): Painter =>
  atmosphere.kind === 'rain' ? rain(atmosphere, random) : snow(atmosphere, random)

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
    resize(w, h) {
      ;[width, height] = [w, h]
      drops = Array.from({ length: Math.round(((width * height) / 1000) * density) }, () => spawn(true))
    },
    paint(ctx, dt) {
      const t = Math.min(dt, MAX_DT)
      ctx.clearRect(0, 0, width, height)
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
  depth: number
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
  let flakes: Flake[] = []
  let width = 0
  let height = 0
  /** Ticks of the clock since the snow began, fractional when a tick comes late. */
  let ticks = 0

  return {
    resize(w, h) {
      ;[width, height] = [w, h]
      ticks = 0
      flakes = Array.from({ length: Math.round(((width * height) / 1000) * density) }, () => ({
        x: random() * width,
        y: random() * height,
        depth: Math.floor(random() * depths.length),
        phase: Math.floor(random() * SWAY.length),
      }))
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      ticks += step
      ctx.clearRect(0, 0, width, height)
      depths.forEach(({ alpha, size, fall }, depth) => {
        ctx.globalAlpha = alpha
        ctx.beginPath()
        for (const f of flakes) {
          if (f.depth !== depth) continue
          f.y += fall * step
          // Gone below: it falls again from just above the top.
          if (f.y > height) f.y -= height + size
          const sway = drift * (SWAY[(Math.floor(ticks) + f.phase) % SWAY.length] ?? 0)
          ctx.rect(f.x + sway, f.y, size, size)
        }
        ctx.fill()
      })
    },
  }
}
