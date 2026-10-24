// The painters of the Atmospheres (shared/atmospheres.ts): each paints its kind on the canvas
// behind the panel, a step at a time on the shared 8 fps clock. Free of the DOM, so node tests
// drive them on a recording canvas.
import type {
  AshAtmosphere,
  Atmosphere,
  BlimpsAtmosphere,
  Backdrop,
  LitWindowsAtmosphere,
  MoonBackdrop,
  NoiseAtmosphere,
  RainAtmosphere,
  SkylineBackdrop,
  SmokeAtmosphere,
  SnowAtmosphere,
} from '@shared/atmospheres'
import { batOutline, type Wings } from '@shared/bats'
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
    case 'ash':
      return ash(atmosphere, random)
    case 'smoke':
      return smoke(atmosphere, random)
    case 'noise':
      return noise(atmosphere, random)
    case 'blimps':
      return blimps(atmosphere)
  }
}

/**
 * A shape in straight lines added to the path as its own closed shape: its points `scale` times as
 * far from (cx, cy).
 */
function trace(
  ctx: CanvasRenderingContext2D,
  points: readonly (readonly [number, number])[],
  cx: number,
  cy: number,
  scale = 1,
) {
  ctx.moveTo(cx + points[0]![0] * scale, cy + points[0]![1] * scale)
  for (let p = 1; p < points.length; p++) ctx.lineTo(cx + points[p]![0] * scale, cy + points[p]![1] * scale)
  ctx.closePath()
}

/**
 * Where something carried across a canvas `width` wide lands: past either side it runs on for
 * `margin` (as wide as it is, so it is wholly off the canvas), then comes round at the other.
 */
function wrapAcross(x: number, width: number, margin: number) {
  const span = width + 2 * margin
  return ((((x + margin) % span) + span) % span) - margin
}

/** The painter of an Atmosphere's backdrop: a still drawing, the same picture on every paint. */
export function backdropFor(backdrop: Backdrop): Painter {
  switch (backdrop.kind) {
    case 'moon':
      return moon(backdrop)
    case 'skyline':
      return skyline(backdrop)
  }
}

/** A carved moon's height for its width: a pumpkin is a little wider than tall. */
const PUMPKIN = 0.88

/**
 * A jack-o'-lantern's cuts, in radii from the moon's centre (y down): its stem standing on the
 * body's top, then two furious eyes slanting down to the middle and a grin cut in the shape of the
 * bat (the Deluxe cover's). The stem stands outside the body, so it fills; the face is inside it, so
 * the even-odd rule leaves it empty.
 */
const STEM = [
  [-0.08, -PUMPKIN - 0.22],
  [0.1, -PUMPKIN - 0.18],
  [0.08, -PUMPKIN],
  [-0.08, -PUMPKIN],
] as const
/** The left half of the bat the grin is cut as: from its head down its left side to its tail. */
const GRIN_LEFT = [
  [0, 0.24],
  [-0.04, 0.24],
  [-0.08, 0.14],
  [-0.13, 0.25],
  [-0.2, 0.27],
  [-0.62, 0.14],
  [-0.6, 0.36],
  [-0.5, 0.5],
  [-0.42, 0.4],
  [-0.32, 0.54],
  [-0.22, 0.44],
] as const
/** A shape's points, in order round its edge. */
type Points = readonly (readonly [number, number])[]
const FACE: readonly Points[] = [
  // The eyes, left and right.
  [
    [-0.6, -0.3],
    [-0.14, -0.04],
    [-0.3, 0.06],
    [-0.52, 0],
  ],
  [
    [0.6, -0.3],
    [0.14, -0.04],
    [0.3, 0.06],
    [0.52, 0],
  ],
  // The grin: the bat's left half, its tail, then its right half back up to its head.
  [
    ...GRIN_LEFT,
    [0, 0.64],
    ...GRIN_LEFT.slice(1)
      .reverse()
      .map(([x, y]) => [-x, y] as const),
  ],
]
const CUTS: readonly Points[] = [STEM, ...FACE]

/** A moon, carved or not: painted whole on every paint, since it never moves. */
function moon({ color: variable, alpha, at, radius, carved, candle: flame }: MoonBackdrop): Painter {
  let width = 0
  let height = 0
  let color = ''
  let candle = ''
  return {
    recolor(colorOf) {
      color = colorOf(variable)
      candle = flame ? colorOf(flame) : ''
    },
    resize(w, h) {
      ;[width, height] = [w, h]
    },
    paint(ctx) {
      const [cx, cy] = [at[0] * width, at[1]]
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.ellipse(cx, cy, radius, radius * (carved ? PUMPKIN : 1), 0, 0, 2 * Math.PI)
      if (carved) for (const cut of CUTS) trace(ctx, cut, cx, cy, radius)
      ctx.fill('evenodd')
      // The candle inside, lighting the eyes and the grin.
      if (carved && candle) {
        ctx.fillStyle = candle
        ctx.beginPath()
        for (const cut of FACE) trace(ctx, cut, cx, cy, radius)
        ctx.fill()
      }
    },
  }
}

/** The skyline's seeds (in [0, 1), as seededFrom takes them): the same city, and the same lit
 * windows in it, every time it is drawn. */
const SKYLINE_SEED = { city: 0.1992, windows: 0.0716 }

/** A lit window of the skyline: a dot taller than wide, in px. */
const WINDOW = { w: 1.5, h: 2 }

/** A tower of the skyline: where it stands, how wide, and its roof's height above the foot (px). */
interface Tower {
  x: number
  width: number
  roof: number
}

/**
 * A Deco skyline along the foot of a panel this size, as one outline from the left edge's foot along
 * the roofs to the right edge's: flat roofs, stepped setbacks, domes and, every fourth tower, a spire
 * rising toward the tallest. Its towers, for the windows lit in them.
 */
function decoSkyline(width: number, height: number, [low, high]: readonly [number, number]) {
  const random = seededFrom(SKYLINE_SEED.city)
  const outline: [number, number][] = [[-1, height]]
  const towers: Tower[] = []
  const up = (x: number, h: number) => outline.push([x, height - h])
  for (let x = -1, i = 0; x < width + 1; i++) {
    const w = 12 + random() * 22
    const roof = low + (high - low) * 0.55 * random()
    const kind = i % 4 === 3 ? 'spire' : (['flat', 'setback', 'dome'] as const)[Math.floor(random() * 3)]!
    up(x, roof)
    if (kind === 'setback') {
      // Two steps in, each a little higher, a third of the way across from either side.
      const step = w / 3
      up(x + step / 2, roof)
      up(x + step / 2, roof + 8)
      up(x + step, roof + 8)
      up(x + step, roof + 16)
      up(x + w - step, roof + 16)
      up(x + w - step, roof + 8)
      up(x + w - step / 2, roof + 8)
      up(x + w - step / 2, roof)
    } else if (kind === 'dome') {
      for (let a = 1; a < 8; a++) up(x + (w * a) / 8, roof + Math.sin((Math.PI * a) / 8) * (w / 3))
    } else if (kind === 'spire') {
      // A crown on the roof, then a needle toward the tallest spire.
      const tip = high * (0.8 + 0.2 * random())
      const mid = x + w / 2
      up(mid - w / 4, roof)
      up(mid - w / 4, roof + 10)
      up(mid - 1.5, roof + 10)
      up(mid, tip)
      up(mid + 1.5, roof + 10)
      up(mid + w / 4, roof + 10)
      up(mid + w / 4, roof)
    }
    up(x + w, roof)
    towers.push({ x, width: w, roof })
    x += w
  }
  outline.push([outline.at(-1)![0], height])
  return { outline, towers }
}

/** A red sky over a black skyline: painted whole on every paint, since it never moves. */
function skyline({ sky, clouds, towers: city, mist }: SkylineBackdrop): Painter {
  let width = 0
  let height = 0
  let colors: { sky: string[]; clouds: string; towers: string; windows: string; mist: string } | undefined
  let outline: [number, number][] = []
  let windows: { x: number; y: number }[] = []
  return {
    recolor(colorOf) {
      colors = {
        sky: sky.map(({ color }) => colorOf(color)),
        clouds: colorOf(clouds.color),
        towers: colorOf(city.color),
        windows: colorOf(city.windows.color),
        mist: colorOf(mist.color),
      }
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      const drawn = decoSkyline(w, h, city.height)
      outline = drawn.outline
      // The windows in the same towers every time, from a seed of their own.
      const random = seededFrom(SKYLINE_SEED.windows)
      windows = Array.from({ length: city.windows.count }, () => {
        const tower = drawn.towers[Math.floor(random() * drawn.towers.length)]!
        return {
          x: Math.round(tower.x + 2 + random() * Math.max(0, tower.width - 5)),
          y: Math.round(h - tower.roof + 3 + random() * Math.max(0, tower.roof - 9)),
        }
      })
    },
    paint(ctx) {
      if (!width || !colors) return
      ctx.clearRect(0, 0, width, height)
      ctx.globalAlpha = 1
      const bands = ctx.createLinearGradient(0, 0, 0, height)
      sky.forEach(({ at }, i) => bands.addColorStop(at, colors!.sky[i]!))
      ctx.fillStyle = bands
      ctx.fillRect(0, 0, width, height)
      // The clouds, soft, only ever darker than the sky.
      ctx.fillStyle = colors.clouds
      ctx.filter = `blur(${clouds.blur}px)`
      for (const {
        at: [x, y],
        size: [rx, ry],
        alpha,
      } of clouds.masses) {
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.ellipse(x * width, y * height, rx, ry, 0, 0, 2 * Math.PI)
        ctx.fill()
      }
      ctx.filter = 'none'
      ctx.globalAlpha = 1
      ctx.fillStyle = colors.towers
      ctx.beginPath()
      trace(ctx, outline, 0, 0)
      ctx.fill()
      ctx.fillStyle = colors.windows
      ctx.globalAlpha = city.windows.alpha
      for (const { x, y } of windows) ctx.fillRect(x, y, WINDOW.w, WINDOW.h)
      // The mist, rising from the bottom over the towers' foot.
      const rising = ctx.createLinearGradient(0, height - mist.height, 0, height)
      rising.addColorStop(0, 'transparent')
      rising.addColorStop(1, colors.mist)
      ctx.fillStyle = rising
      ctx.globalAlpha = mist.alpha
      ctx.fillRect(0, height - mist.height, width, mist.height)
    },
  }
}

/** A hull's height for its length: a cigar, about 3.3:1. */
const HULL = 0.3

/**
 * Police blimps hovering: each drifts by whole ticks, round from the other side once it and its
 * beams are wholly past one, its two beams leaning out under its nose and swaying on the clock.
 */
function blimps({ color: variable, fleet, beams }: BlimpsAtmosphere): Painter {
  let width = 0
  let height = 0
  let color = ''
  let beam = ''
  /** Whole ticks of the clock since the blimps began, and the part of one still to come. */
  let ticks = 0
  let part = 0

  return {
    recolor(colorOf) {
      color = colorOf(variable)
      beam = colorOf(beams.color)
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      ticks = 0
      part = 0
    },
    paint(ctx, dt) {
      part += Math.min(dt, MAX_DT) / STEP
      // Only whole ticks move them (a float's sum may land a hair under one).
      const whole = Math.floor(part + 1e-9)
      ticks += whole
      part -= whole
      ctx.clearRect(0, 0, width, height)
      if (!width || !color) return
      const sway = beams.sway * Math.sin((2 * Math.PI * ticks) / (beams.period * FPS))
      for (const { length, at, from, drift } of fleet) {
        const reach = beams.reach * length
        // Wholly past a side: the hull, and its beams leaning out under it.
        const margin = length / 2 + reach * Math.sin(beams.splay + beams.sway + beams.width)
        const x = wrapAcross(from * width + drift * ticks, width, margin)
        const y = at * height
        // Under the nose, a quarter of the hull ahead of its middle, the way it drifts.
        const nose = { x: x + (drift < 0 ? -1 : 1) * (length / 4), y: y + (length * HULL) / 2 }
        ctx.globalAlpha = beams.alpha
        ctx.fillStyle = beam
        for (const side of [-1, 1]) {
          const axis = side * beams.splay + sway
          const edges = [axis - beams.width, axis + beams.width]
          ctx.beginPath()
          trace(
            ctx,
            [[0, 0], ...edges.map((a) => [Math.sin(a) * reach, Math.cos(a) * reach] as const)],
            nose.x,
            nose.y,
          )
          ctx.fill()
        }
        ctx.globalAlpha = 1
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.ellipse(x, y, length / 2, (length * HULL) / 2, 0, 0, 2 * Math.PI)
        ctx.fill()
        // Its tail fin, at the end away from the way it drifts, and its gondola under it.
        const back = drift < 0 ? 1 : -1
        ctx.beginPath()
        trace(
          ctx,
          [
            [back * length * 0.38, 0],
            [back * length * 0.58, -length * 0.2],
            [back * length * 0.58, length * 0.2],
          ],
          x,
          y,
        )
        ctx.fill()
        ctx.fillRect(x - length * 0.1, y + (length * HULL) / 2 - 1, length * 0.2, length * 0.08 + 1)
      }
    },
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

/**
 * `count` flakes scattered over a canvas: each at a random spot, put in one of `lists` lists, the
 * one `pick` says (a depth, say), and made there by `make`.
 */
function scatter<T>(
  { count, lists, width, height }: { count: number; lists: number; width: number; height: number },
  random: () => number,
  pick: () => number,
  make: (x: number, y: number) => T,
): T[][] {
  const scattered = Array.from({ length: lists }, (): T[] => [])
  for (let i = count; i > 0; i--) {
    const [x, y] = [random() * width, random() * height]
    scattered[pick()]!.push(make(x, y))
  }
  return scattered
}

interface Flake {
  x: number
  y: number
  /** Where in the sway it starts, so the flakes don't sway in step. */
  phase: number
}

/** A flake's or a puff's sway, a step a tick: out one way, back, out the other way, back. */
const SWAY = [0, 1, 0, -1]

/** The frame of a cycle a tick each, `ticks` in, from a phase. */
function frameAt<T>(frames: readonly T[], ticks: number, phase: number): T {
  return frames[(Math.floor(ticks) + phase) % frames.length]!
}

/** How far something swaying `amount` either way is off its column, `ticks` in, from its phase. */
const swayAt = (amount: number, ticks: number, phase: number) => amount * frameAt(SWAY, ticks, phase)

/**
 * Snow: flakes in depths, each depth filled as one path a tick. They fall a few pixels a tick,
 * which at 8 steps a second reads as a slow snowfall, and sway on the clock (not at random), so a
 * flake never jitters.
 */
function snow({ color: variable, density, depths, drift }: SnowAtmosphere, random: () => number): Painter {
  /** The flakes of each depth, none until it has a size. */
  let layers: Flake[][] = depths.map((): Flake[] => [])
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
      layers = scatter(
        { count: howMany(width, height, density), lists: depths.length, width, height },
        random,
        () => Math.floor(random() * depths.length),
        (x, y) => ({ x, y, phase: Math.floor(random() * SWAY.length) }),
      )
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      ticks += step
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      // Each phase's sway this tick, worked out once for every flake.
      const sways = SWAY.map((_, phase) => swayAt(drift, ticks, phase))
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
  let colors: { glass: string; edge?: string; lights: string[] } = { glass: '', lights: [] }
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
      colors = {
        glass: colorOf(glass),
        edge: edge && colorOf(edge),
        lights: lights.map((l) => colorOf(l.color)),
      }
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
        const { edge } = colors
        if (edge) ctx.strokeStyle = edge
        for (const b of blocks) {
          ctx.fillRect(b.x, b.y, b.w, b.h)
          // On the half pixel, so the 1px edge lands on whole pixels.
          if (edge) ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h)
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

interface Mote {
  x: number
  y: number
  /** Its own pace, so the field looks gusty without a new random number every tick. */
  gust: number
}

/** How far a flake's pace may stray from its depth's, either way. */
const GUST = 0.2

/** A depth's ash or its dust: the motes of one color, filled as one path a tick. */
interface Drift {
  depth: AshAtmosphere['depths'][number]
  dust: boolean
  motes: Mote[]
}

/** The frames of a bat's wingbeat, a tick each. */
const BEAT: readonly Wings[] = ['up', 'down']

/**
 * A calendar leaf: its height for its width; its month's share of that height, cut off across its
 * top by a pixel's gap; and how deep the teeth of its torn bottom edge go, as a share of its height.
 */
const LEAF = { tall: 1.25, month: 0.25, gap: 1, tear: 0.15 }

/** How far apart neighbouring pages are in their swing: a golden-ratio share of it, so none fall in step. */
const SWING_STEP = 0.618

/**
 * A page of `size` hanging from the middle of its top edge at (cx, cy), leaning `angle` radians:
 * its month, then its leaf with the bottom edge torn in two teeth, each a shape of its own.
 */
function page(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, angle: number) {
  const [w, tall] = [size / 2, size * LEAF.tall]
  const month = tall * LEAF.month
  const tear = tall * LEAF.tear
  const [cos, sin] = [Math.cos(angle), Math.sin(angle)]
  const lean = (points: (readonly [number, number])[]) =>
    points.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos] as const)
  trace(
    ctx,
    lean([
      [-w, 0],
      [w, 0],
      [w, month],
      [-w, month],
    ]),
    cx,
    cy,
  )
  const top = month + LEAF.gap
  trace(
    ctx,
    lean([
      [-w, top],
      [w, top],
      [w, tall - tear / 2],
      [w / 2, tall],
      [0, tall - tear],
      [-w / 2, tall],
      [-w, tall - tear / 2],
    ]),
    cx,
    cy,
  )
}

/**
 * Ash: motes in depths, blown sideways more than they fall, each depth's ash and its dust filled as
 * a path each a tick. A mote that leaves at one edge comes back at the opposite one, somewhere new
 * along it, whichever way the wind blows. With bats in place of the motes, they keep to their band,
 * each drawn on its arc, flapping every tick, neighbours a beat apart. With pages, each swings from
 * side to side of its line as it falls, neighbours out of step.
 */
function ash(
  { color: variable, dust, density, depths, bats, pages }: AshAtmosphere,
  random: () => number,
): Painter {
  /** Whether each of a depth's drifts is dust: ash, and dust if it has any. */
  const dustiness = dust ? [false, true] : [false]
  const drifts = (lists: Mote[][] = []): Drift[] =>
    depths.flatMap((depth, d) =>
      dustiness.map((isDust, c) => ({ depth, dust: isDust, motes: lists[dustiness.length * d + c] ?? [] })),
    )
  /** None until it has a size. */
  let layers = drifts()
  let width = 0
  let height = 0
  /** Where the motes are blown: the whole canvas, or the bats' band. */
  let [top, bottom] = [0, 0]
  /** How far past the canvas's sides they go before coming back: the bats' way out, none for ash. */
  const away = bats?.away ?? (pages ? pages.swing + Math.max(...depths.map((d) => d.size)) : 0)
  /**
   * Whole ticks of the clock since it began, each counted to the nearest: a tick that comes a hair
   * early or late still turns the wings, so a beat never holds or skips.
   */
  let beats = 0
  /** Ticks of the clock since it began, fractional when a tick comes late: the pages' swing runs on it. */
  let ticks = 0
  let colors = { ash: '', dust: '' }

  /** Each depth's bat in each frame of the wingbeat, at (0, 0): drawn once, moved into place. */
  const outlines = new Map(
    depths.map(({ size }) => [
      size,
      { up: batOutline('up', 0, 0, size), down: batOutline('down', 0, 0, size) },
    ]),
  )

  /**
   * A mote of `size`, at (x, y): a square, or a bat on its arc with its wings in this tick's beat,
   * from its phase (its place in its depth, so neighbours beat a frame apart).
   */
  const draw = (ctx: CanvasRenderingContext2D, { x, y }: Mote, size: number, phase: number) => {
    if (pages) {
      // Its swing, from its own place in it, and its lean.
      const turn = Math.sin(2 * Math.PI * (ticks / (pages.period * FPS) + phase * SWING_STEP))
      // As a pendulum: swung right, its bottom trails right of its top.
      return page(ctx, x + size / 2 + pages.swing * turn, y, size, -pages.tilt * turn)
    }
    if (!bats) return ctx.rect(x, y, size, size)
    // Out past the panel's side: not drawn till it comes back.
    if (x > width || x < -size) return
    const along = (x + size) / (width + size)
    const [cx, cy] = [x + size / 2, y - bats.arc * Math.sin(2 * Math.PI * along)]
    trace(ctx, outlines.get(size)![frameAt(BEAT, beats, phase)], cx, cy)
  }

  return {
    recolor(colorOf) {
      colors = { ash: colorOf(variable), dust: dust ? colorOf(dust.color) : '' }
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      // The bats' band, as much of it as is on the canvas.
      bottom = Math.min(bats?.band[1] ?? h, h)
      top = Math.min(bats?.band[0] ?? 0, bottom)
      beats = 0
      ticks = 0
      layers = drifts(
        scatter(
          {
            count: howMany(width + 2 * away, bottom - top, density),
            lists: dustiness.length * depths.length,
            width: width + 2 * away,
            height: bottom - top,
          },
          random,
          () =>
            dustiness.length * Math.floor(random() * depths.length) + (dust && random() < dust.share ? 1 : 0),
          (x, y) => ({ x: x - away, y: top + y, gust: 1 - GUST + random() * 2 * GUST }),
        ),
      )
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      beats += Math.round(step)
      ticks += step
      ctx.clearRect(0, 0, width, height)
      for (const { depth, dust: isDust, motes } of layers) {
        const { alpha, size, wind, fall } = depth
        // A mote is gone once its whole square has left the top, a page once its whole leaf has; a
        // bat's line, once it has left the band.
        const rise = bats ? 0 : pages ? size * (LEAF.tall + 1) : size
        ctx.globalAlpha = alpha
        ctx.fillStyle = isDust ? colors.dust : colors.ash
        ctx.beginPath()
        motes.forEach((m, phase) => {
          m.x += wind * m.gust * step
          m.y += fall * m.gust * step
          // Gone past an edge: back in at the opposite one, somewhere new along it.
          if (m.x > width + away || m.x < -size - away) {
            m.x += m.x > width + away ? -(width + 2 * away + size) : width + 2 * away + size
            m.y = top + random() * (bottom - top)
          } else if (m.y > bottom || m.y < top - rise) {
            m.y += m.y > bottom ? -(bottom - top + rise) : bottom - top + rise
            m.x = random() * width
          }
          draw(ctx, m, size, phase)
        })
        ctx.fill()
      }
    },
  }
}

interface Puff {
  /** The column it rises in. */
  x: number
  /** Ticks since it left the street, fractional when a tick comes late. */
  age: number
  /** Where in the sway it starts, so the puffs don't sway in step. */
  phase: number
}

/** A puff's soft edge: the discs it is painted as, each a share of its width, the widest first. */
const PUFF_RINGS = [1, 0.7, 0.4]

/** The share of its life a puff on a wind takes to fade in. */
const FADE_IN = 0.2

/**
 * Smoke: a few puffs rise from the bottom edge, each swelling and fading to nothing over its life,
 * swaying on the clock as snow does. They leave the street one after another, so the smoke never
 * pulses; a puff that is gone leaves again from the street, in a column of its own. A wind carries
 * them sideways as they rise, round from one side to the other, and an aspect flattens them.
 */
function smoke(
  { color: variable, puffs: count, size, alpha, rise, life, sway, wind = 0, aspect = 1 }: SmokeAtmosphere,
  random: () => number,
): Painter {
  /**
   * How far past either side a puff may be blown before it comes back at the other: as wide as it
   * ever is, and as far as it sways, so it is wholly off the canvas when it comes round.
   */
  const reach = Math.max(...size) / 2 + sway
  /** A puff's life in ticks of the clock. */
  const lifeTicks = life / STEP
  let puffs: Puff[] = []
  let width = 0
  let height = 0
  /** Ticks of the clock since the smoke began. */
  let ticks = 0
  let color = ''

  return {
    recolor(colorOf) {
      color = colorOf(variable)
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      ticks = 0
      puffs = Array.from({ length: count }, (_, i) => ({
        x: random() * width,
        age: (i * lifeTicks) / count,
        phase: Math.floor(random() * SWAY.length),
      }))
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      ticks += step
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      for (const p of puffs) {
        p.age += step
        while (p.age >= lifeTicks) {
          p.age -= lifeTicks
          p.x = random() * width
        }
        const t = p.age / lifeTicks
        const radius = (size[0] + (size[1] - size[0]) * t) / 2
        // Blown along by the wind, and round again once past a side.
        const x = wrapAcross(p.x + wind * p.age + swayAt(sway, ticks, p.phase), width, reach)
        // It leaves with its center on the bottom edge, half of it still below.
        const y = height - rise * p.age
        // On a wind a bank is born wide, so it fades in as well as out, rather than blink on.
        const fade = wind ? Math.min(1, t / FADE_IN) * (1 - t) : 1 - t
        ctx.globalAlpha = (alpha * fade) / PUFF_RINGS.length
        for (const ring of PUFF_RINGS) {
          ctx.beginPath()
          ctx.ellipse(x, y, radius * ring, radius * ring * Math.abs(aspect), 0, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
    },
  }
}

interface Mark {
  x: number
  y: number
  /** Whole ticks since it appeared where it is. */
  age: number
}

/** A band's soft edge: the boxes it is painted as, about one middle, each a share of its height. */
const BAND_LAYERS = [1, 0.6, 0.3]

/**
 * Noise: marks at a few strengths, each strength filled as one path a tick. A mark stays put for its
 * life, then appears somewhere else on the canvas: it flickers in place and never falls. The marks
 * were born a tick apart, so a share of them moves each tick. A band, if it has one, rolls down
 * over them and comes in again from above the top once it has rolled off the bottom.
 */
function noise(
  { color: variable, size, density, alphas, life, band }: NoiseAtmosphere,
  random: () => number,
): Painter {
  /** A mark's life in whole ticks of the clock, one at least. */
  const lifeTicks = Math.max(1, Math.round(life / STEP))
  /** The marks at each strength, none until it has a size. */
  let layers: Mark[][] = alphas.map((): Mark[] => [])
  let width = 0
  let height = 0
  /** The band's top: none without a band, or until the canvas first has a size. */
  let bandTop: number | undefined
  let color = ''

  /** Somewhere new on the canvas, on whole pixels. */
  const place = (m: Mark) => {
    m.x = Math.floor(random() * width)
    m.y = Math.floor(random() * height)
  }

  return {
    recolor(colorOf) {
      color = colorOf(variable)
    },
    resize(w, h) {
      ;[width, height] = [w, h]
      // Anywhere along its roll the first time, so a new canvas doesn't always start it at the top;
      // a resize leaves it where it is.
      if (band && bandTop === undefined) bandTop = random() * (height + band.height) - band.height
      let born = 0
      layers = scatter(
        { count: howMany(width, height, density), lists: alphas.length, width, height },
        random,
        () => Math.floor(random() * alphas.length),
        (x, y) => ({ x: Math.floor(x), y: Math.floor(y), age: born++ % lifeTicks }),
      )
    },
    paint(ctx, dt) {
      const step = Math.min(dt, MAX_DT) / STEP
      // The timer runs a hair early or late: a mark counts the nearest whole tick, or static would
      // freeze whole on every early one.
      const ticks = Math.round(step)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      alphas.forEach((alpha, level) => {
        ctx.globalAlpha = alpha
        ctx.beginPath()
        for (const m of layers[level]!) {
          m.age += ticks
          if (m.age >= lifeTicks) {
            m.age %= lifeTicks
            place(m)
          }
          ctx.rect(m.x, m.y, size, size)
        }
        ctx.fill()
      })
      if (!band || bandTop === undefined) return
      bandTop += band.fall * step
      if (bandTop > height) bandTop -= height + band.height
      const middle = bandTop + band.height / 2
      ctx.globalAlpha = band.alpha / BAND_LAYERS.length
      for (const share of BAND_LAYERS) {
        const h = band.height * share
        ctx.fillRect(0, middle - h / 2, width, h)
      }
    },
  }
}
