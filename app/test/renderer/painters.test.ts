import { describe, expect, it } from 'vitest'
import { FPS } from '../../src/renderer/src/clockRate'
import { backdropFor, painterFor, type Painter } from '../../src/renderer/src/painters'
import { batOutline, type Wings } from '../../src/shared/bats'
import {
  PALE_MOONLIGHT_SNOW,
  VENGEANCE_RAIN,
  type LitWindowsAtmosphere,
  type MoonBackdrop,
  type SignalBackdrop,
  type SkylineBackdrop,
  type AshAtmosphere,
  type BlimpsAtmosphere,
  type NoiseAtmosphere,
  type SmokeAtmosphere,
  type SnowAtmosphere,
} from '../../src/shared/atmospheres'

type Segment = { x0: number; y0: number; x1: number; y1: number }

type Square = { x: number; y: number; size: number }

/** A linear gradient: from (x0, y0) to (x1, y1), with its stops, each a place (0 to 1) and a color. */
type Gradient = { x0: number; y0: number; x1: number; y1: number; stops: [number, string][] }

/** What a fill or a box is painted in: a color, or a gradient. */
type Paint = string | Gradient

type Box = { x: number; y: number; w: number; h: number; color: Paint; alpha: number }

/** A disc, or an ellipse: its width's half is `r`, its height's half `ry`. */
type Disc = { x: number; y: number; r: number; ry: number }

/** A shape drawn in straight lines: its points in order round its edge. */
type Shape = (readonly [number, number])[]

/**
 * A canvas context that records what it is asked to draw, in which color (or gradient), strength and
 * blur: one list of segments per stroke() (the rain), one list of squares, of discs and of shapes per
 * fill() (the snow, the smoke, the bats), and each box filled or outlined on its own (the lit
 * windows), and how often it is cleared.
 */
function recorder() {
  const strokes: { alpha: number; color: string; segments: Segment[] }[] = []
  const fills: {
    alpha: number
    color: Paint
    filter: string
    rule?: CanvasFillRule
    rects: Square[]
    discs: Disc[]
    shapes: Shape[]
  }[] = []
  const boxes: Box[] = []
  const outlines: Box[] = []
  const cleared = { times: 0 }
  let segments: Segment[] = []
  let rects: Square[] = []
  let discs: Disc[] = []
  let shapes: Shape[] = []
  let from = { x: 0, y: 0 }
  const ctx = {
    globalAlpha: 1,
    strokeStyle: '#000000',
    fillStyle: '#000000' as Paint,
    filter: 'none',
    createLinearGradient: (x0: number, y0: number, x1: number, y1: number) => {
      const gradient: Gradient & { addColorStop(at: number, color: string): void } = {
        x0,
        y0,
        x1,
        y1,
        stops: [],
        addColorStop: (at, color) => gradient.stops.push([at, color]),
      }
      return gradient
    },
    clearRect: () => cleared.times++,
    fillRect: (x: number, y: number, w: number, h: number) =>
      boxes.push({ x, y, w, h, color: ctx.fillStyle, alpha: ctx.globalAlpha }),
    strokeRect: (x: number, y: number, w: number, h: number) =>
      outlines.push({ x, y, w, h, color: ctx.strokeStyle, alpha: ctx.globalAlpha }),
    beginPath: () => ([segments, rects, discs, shapes] = [[], [], [], []]),
    moveTo: (x: number, y: number) => {
      from = { x, y }
      shapes.push([[x, y]])
    },
    lineTo: (x: number, y: number) => {
      segments.push({ x0: from.x, y0: from.y, x1: x, y1: y })
      shapes.at(-1)?.push([x, y])
      from = { x, y }
    },
    closePath: () => {},
    stroke: () => strokes.push({ alpha: ctx.globalAlpha, color: ctx.strokeStyle, segments }),
    rect: (x: number, y: number, size: number) => rects.push({ x, y, size }),
    arc: (x: number, y: number, r: number) => discs.push({ x, y, r, ry: r }),
    ellipse: (x: number, y: number, r: number, ry: number) => discs.push({ x, y, r, ry }),
    fill: (rule?: CanvasFillRule) =>
      fills.push({
        alpha: ctx.globalAlpha,
        color: ctx.fillStyle,
        filter: ctx.filter,
        rule,
        rects,
        discs,
        shapes,
      }),
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes, fills, boxes, outlines, cleared }
}

/** A variable's color, told apart by its name: `--sky` is painted in `#sky`. */
const namedColor = (variable: string) => variable.replace('--', '#')

/** The same "random" numbers every run. */
function seeded(seed = 7) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

const length = (d: Segment) => Math.hypot(d.x0 - d.x1, d.y0 - d.y1)

/** What a painter draws as it appears, then on each of `n` ticks of the clock `dt` apart. */
function framesOver(painter: Painter, n: number, dt = 1 / FPS) {
  const first = recorder()
  painter.paint(first.ctx, 0)
  const after = Array.from({ length: n }, () => {
    const r = recorder()
    painter.paint(r.ctx, dt)
    return r
  })
  return [first, ...after] as const
}

/** What a painter fills as it appears, then on each of `n` ticks of the clock `dt` apart. */
const fillsOver = (painter: Painter, n: number, dt = 1 / FPS) =>
  framesOver(painter, n, dt).map((r) => r.fills)

/** Two police blimps hovering, two beams under each (DARK DECO's). */
const BLIMPS: BlimpsAtmosphere = {
  kind: 'blimps',
  color: '--blimp',
  fleet: [
    { length: 28, at: 0.25, from: 0.7, drift: 0.5 },
    { length: 18, at: 0.45, from: 0.2, drift: -0.25 },
  ],
  beams: { color: '--beam', alpha: 0.07, reach: 5, width: 0.08, splay: 0.21, sway: 0.05, period: 8 },
}

/** Ash blown in two depths, a quarter of it dust. */
const ASH: AshAtmosphere = {
  kind: 'ash',
  color: '--ash',
  dust: { color: '--dust', share: 0.25 },
  density: 0.08,
  depths: [
    { alpha: 0.1, size: 1, wind: 3, fall: 1 },
    { alpha: 0.22, size: 2, wind: 5, fall: 2 },
  ],
}

/**
 * A colony: three bats in a band from 70 to 90px down, on 6px arcs, the near ones from the right,
 * each back in the panel as soon as it has left it.
 */
const COLONY: AshAtmosphere = {
  kind: 'ash',
  color: '--colony',
  density: 0.5,
  depths: [
    { alpha: 0.2, size: 8, wind: 3, fall: 0 },
    { alpha: 0.3, size: 12, wind: -5, fall: 0 },
  ],
  bats: { band: [70, 90], arc: 6, away: 0 },
}

/**
 * A tear-off calendar's pages: two depths falling 1 and 2px a tick, drifting a little right, each
 * swinging 3px either way and back every two seconds, upright (the tilt has tests of its own).
 */
const PAGES: AshAtmosphere = {
  kind: 'ash',
  color: '--pages',
  density: 0.05,
  depths: [
    { alpha: 0.16, size: 5, wind: 0.5, fall: 1 },
    { alpha: 0.3, size: 7, wind: 1.5, fall: 2 },
  ],
  pages: { swing: 3, period: 2, tilt: 0 },
}

/** Smoke: four puffs swelling from 12 to 40px as they rise 2px a tick and fade over four seconds. */
const SMOKE: SmokeAtmosphere = {
  kind: 'smoke',
  color: '--smoke-puff',
  puffs: 4,
  size: [12, 40],
  alpha: 0.1,
  rise: 2,
  life: 4,
  sway: 1,
}

/** Static: specks at three strengths that live a tick each, and a band 24px tall, its roll bar. */
const NOISE: NoiseAtmosphere = {
  kind: 'noise',
  color: '--static',
  size: 1,
  density: 0.5,
  alphas: [0.04, 0.07, 0.1],
  life: 1 / FPS,
  band: { height: 24, alpha: 0.03, fall: 3 },
}

// The page hands a painter its colors as the canvas mounts, and paints at once so a still scene
// shows them: that can come before the canvas has a size. PALE MOONLIGHT's snow threw there, and the
// whole panel went blank.
describe('a painter given its colors before its size', () => {
  it.each([VENGEANCE_RAIN, PALE_MOONLIGHT_SNOW, ASH, COLONY, SMOKE, NOISE, BLIMPS])(
    'paints nothing, and does not throw ($kind)',
    (atmosphere) => {
      const painter = painterFor(atmosphere, seeded())
      painter.recolor(() => '#ffffff')
      const { ctx, strokes, fills, boxes } = recorder()
      expect(() => painter.paint(ctx, 0)).not.toThrow()
      const drawn = [
        ...strokes.flatMap((s) => s.segments),
        ...fills.flatMap((f) => [...f.rects, ...f.discs, ...f.shapes]),
        ...boxes,
      ]
      expect(drawn).toHaveLength(0)
    },
  )
})

describe('the rain', () => {
  /** As many drops as the density asks of the panel's default size. */
  const DROPS = Math.round(((320 * 440) / 1000) * VENGEANCE_RAIN.density)

  const rain = () => {
    const painter = painterFor(VENGEANCE_RAIN, seeded())
    painter.resize(320, 440)
    return painter
  }

  /** The rain as it appears (painted without a step), then one tick of the clock later. */
  const twoTicks = () => {
    const painter = rain()
    const [first, next] = [recorder(), recorder()]
    painter.paint(first.ctx, 0)
    painter.paint(next.ctx, 1 / FPS)
    return [first.strokes, next.strokes] as const
  }

  /** The rain after a while (200 ticks: drops have left the bottom and come back). */
  const later = () => {
    const painter = rain()
    for (let i = 0; i < 200; i++) painter.paint(recorder().ctx, 1 / FPS)
    const { ctx, strokes } = recorder()
    painter.paint(ctx, 1 / FPS)
    return strokes
  }

  it('fills the canvas with drops, as many as its density asks', () => {
    const [first] = twoTicks()
    expect(first.reduce((n, s) => n + s.segments.length, 0)).toBe(DROPS)
  })

  // Each depth is one path, stroked once: a few strokes a tick, whatever the number of drops.
  it('strokes each depth once, in its own strength', () => {
    const [, next] = twoTicks()
    expect(next.map((s) => s.alpha)).toEqual(VENGEANCE_RAIN.depths)
  })

  // A canvas can't read the Theme's variables: the page hands their values to the painter.
  it('strokes its drops in the color it is given', () => {
    const painter = rain()
    painter.recolor(() => '#123456')
    const { ctx, strokes } = recorder()
    painter.paint(ctx, 1 / FPS)
    expect(new Set(strokes.map((s) => s.color))).toEqual(new Set(['#123456']))
  })

  it('falls along the wind', () => {
    const [first, next] = twoTicks()
    const [a, b] = [first[0]!.segments[0]!, next[0]!.segments[0]!]
    expect(b.y0).toBeGreaterThan(a.y0)
    expect((b.x0 - a.x0) / (b.y0 - a.y0)).toBeCloseTo(Math.tan(VENGEANCE_RAIN.angle))
  })

  // A late tick (a busy page) moves the drops as far as the time that passed, so the rain keeps its
  // speed; a long gap (the page waking) moves them two ticks at most, not across the window.
  it('falls as far as the time between ticks, up to two ticks', () => {
    const fall = (dt: number) => {
      const painter = rain()
      const [first, next] = [recorder(), recorder()]
      painter.paint(first.ctx, 0)
      painter.paint(next.ctx, dt)
      return next.strokes[0]!.segments[0]!.y0 - first.strokes[0]!.segments[0]!.y0
    }
    expect(fall(2 / FPS)).toBeCloseTo(2 * fall(1 / FPS))
    expect(fall(5)).toBeCloseTo(fall(2 / FPS))
  })

  // At 8 steps a second a drop falls further between ticks than it did at the old 15: a streak
  // too short for its step reads as dashes jumping, not rain falling. A quarter of the step, at
  // least, is the share the shortest streaks covered at 15.
  it('draws each streak long enough for the step it falls in a tick', () => {
    const [first, next] = twoTicks()
    first.forEach((stroke, depth) =>
      stroke.segments.slice(0, 20).forEach((a, i) => {
        const b = next[depth]!.segments[i]!
        if (b.y0 < a.y0) return // came back above the top in between
        expect(length(a) / Math.hypot(b.x0 - a.x0, b.y0 - a.y0)).toBeGreaterThan(0.25)
      }),
    )
  })

  // Nearer depths are longer and faster: a drop that comes back keeps its depth's length, not
  // another's, or a faint far drop would streak like a near one.
  it("keeps each drop's streak to its depth after it comes back", () => {
    later().forEach((stroke, depth) => {
      const longest = (8 + depth * 5 + 6) * (15 / FPS)
      for (const d of stroke.segments) expect(length(d)).toBeLessThanOrEqual(longest + 1e-9)
    })
  })

  it('keeps falling: a drop that leaves the bottom comes back above the top', () => {
    const ys = later().flatMap((s) => s.segments.map((d) => d.y0))
    expect(ys.length).toBe(DROPS)
    expect(Math.min(...ys)).toBeGreaterThan(-100)
    expect(Math.max(...ys)).toBeLessThan(440 + 100)
  })
})

describe('the snow', () => {
  const SNOW: SnowAtmosphere = {
    kind: 'snow',
    color: '--snow',
    density: 0.25,
    depths: [
      { alpha: 0.18, size: 1, fall: 1 },
      { alpha: 0.28, size: 1.5, fall: 2 },
      { alpha: 0.4, size: 2, fall: 3 },
    ],
    drift: 0.5,
  }
  const FLAKES = Math.round(((320 * 440) / 1000) * SNOW.density)

  const snow = () => {
    const painter = painterFor(SNOW, seeded())
    painter.resize(320, 440)
    return painter
  }

  /** The snow as it appears, then after each of `ticks` ticks of the clock. */
  const ticks = (n: number, dt = 1 / FPS) => fillsOver(snow(), n, dt)

  it('fills the canvas with flakes, as many as its density asks', () => {
    const [first] = ticks(0)
    expect(first!.reduce((n, f) => n + f.rects.length, 0)).toBe(FLAKES)
  })

  // Each depth is one path, filled once: a few fills a tick, whatever the number of flakes.
  it('fills each depth once, in its strength and size', () => {
    const [, next] = ticks(1)
    expect(next!.map((f) => f.alpha)).toEqual(SNOW.depths.map((d) => d.alpha))
    next!.forEach((f, depth) => {
      for (const r of f.rects) expect(r.size).toBe(SNOW.depths[depth]!.size)
    })
  })

  it('fills its flakes in the color it is given', () => {
    const painter = snow()
    painter.recolor(() => '#abcdef')
    const { ctx, fills } = recorder()
    painter.paint(ctx, 1 / FPS)
    expect(new Set(fills.map((f) => f.color))).toEqual(new Set(['#abcdef']))
  })

  // Almost straight down, each depth at its own pace: the far flakes slowest.
  it('falls its depth a few pixels a tick, swaying no further than its drift', () => {
    const [first, next] = ticks(1)
    first!.forEach((f, depth) =>
      f.rects.slice(0, 10).forEach((a, i) => {
        const b = next![depth]!.rects[i]!
        expect(b.y - a.y).toBeCloseTo(SNOW.depths[depth]!.fall)
        expect(Math.abs(b.x - a.x)).toBeLessThanOrEqual(2 * SNOW.drift + 1e-9)
      }),
    )
  })

  // A late tick moves the flakes as far as the time that passed; a long gap, two ticks at most.
  it('falls as far as the time between ticks, up to two ticks', () => {
    const fall = (dt: number) => {
      const [first, next] = ticks(1, dt)
      return next![0]!.rects[0]!.y - first![0]!.rects[0]!.y
    }
    expect(fall(2 / FPS)).toBeCloseTo(2 * fall(1 / FPS))
    expect(fall(5)).toBeCloseTo(fall(2 / FPS))
  })

  // A flake that comes back in its old column would draw the same streaks every cycle.
  it('brings a flake back in a column of its own', () => {
    const all = ticks(200)
    const near = all.map((fill) => fill.at(-1)!.rects[0]!)
    const back = near.findIndex((r, i) => i > 0 && r.y < near[i - 1]!.y)
    expect(back).toBeGreaterThan(0)
    expect(Math.abs(near[back]!.x - near[back - 1]!.x)).toBeGreaterThan(2 * SNOW.drift)
  })

  it('keeps falling: a flake that leaves the bottom comes back above the top', () => {
    const last = ticks(600).at(-1)!
    const ys = last.flatMap((f) => f.rects.map((r) => r.y))
    expect(ys.length).toBe(FLAKES)
    expect(Math.min(...ys)).toBeGreaterThan(-10)
    expect(Math.max(...ys)).toBeLessThan(440 + 10)
  })
})

describe('the ash', () => {
  const FLAKES = Math.round(((320 * 440) / 1000) * ASH.density)
  const colorOf = (variable: string) => ({ '--ash': '#928e88', '--dust': '#7a6a52' })[variable] ?? ''

  const ash = () => {
    const painter = painterFor(ASH, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    return painter
  }
  /** The ash as it appears, then after each of `n` ticks of the clock. */
  const ticks = (n: number, dt = 1 / FPS) => fillsOver(ash(), n, dt)
  const flakes = (fills: { rects: Square[] }[]) => fills.flatMap((f) => f.rects)

  it('fills the canvas with flakes, as many as its density asks', () => {
    expect(flakes(ticks(0)[0]!)).toHaveLength(FLAKES)
  })

  // The desert wind blows it across the panel at a shallow slant, left to right: Burton's snow falls.
  it('blows its flakes sideways more than it lets them fall', () => {
    const [first, next] = ticks(1)
    first!.forEach((f, i) =>
      f.rects.forEach((a, j) => {
        const b = next![i]!.rects[j]!
        if (b.x < a.x || b.y < a.y) return // came back at the left or the top in between
        expect(b.x - a.x).toBeGreaterThan(b.y - a.y)
        expect(b.y - a.y).toBeGreaterThan(0)
      }),
    )
  })

  // Dust is the only warm thing in the Atmosphere, a share of the flakes in each depth.
  it('fills a share of its flakes in dust, each depth in its strength', () => {
    // A big canvas, so the share is counted over enough flakes to mean something.
    const painter = painterFor(ASH, seeded())
    painter.recolor(colorOf)
    painter.resize(1200, 1200)
    const { ctx, fills } = recorder()
    painter.paint(ctx, 0)
    const dust = fills.filter((f) => f.color === '#7a6a52')
    const grey = fills.filter((f) => f.color === '#928e88')
    expect(dust.map((f) => f.alpha)).toEqual(ASH.depths.map((d) => d.alpha))
    expect(grey.map((f) => f.alpha)).toEqual(ASH.depths.map((d) => d.alpha))
    const share = flakes(dust).length / flakes(fills).length
    expect(share).toBeGreaterThan(0.1)
    expect(share).toBeLessThan(0.45)
  })

  it('blows as far as the time between ticks, up to two ticks', () => {
    const blown = (dt: number) => {
      const [first, next] = ticks(1, dt)
      return next![0]!.rects[0]!.x - first![0]!.rects[0]!.x
    }
    expect(blown(2 / FPS)).toBeCloseTo(2 * blown(1 / FPS))
    expect(blown(5)).toBeCloseTo(blown(2 / FPS))
  })

  // A wind from the right, or a drift that doesn't fall: whichever edge a flake leaves by, it
  // comes back at the opposite one.
  it('keeps its flakes on the canvas whichever way the wind blows', () => {
    const painter = painterFor({ ...ASH, depths: [{ alpha: 0.2, size: 1, wind: -4, fall: 0 }] }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const all = fillsOver(painter, 400)
    const last = flakes(all.at(-1)!)
    expect(last).toHaveLength(FLAKES)
    for (const r of last) expect(r.x).toBeGreaterThan(-10)
  })

  it('keeps blowing: a flake that leaves the right or the bottom comes back', () => {
    const last = flakes(ticks(600).at(-1)!)
    expect(last).toHaveLength(FLAKES)
    for (const r of last) {
      expect(r.x).toBeGreaterThan(-10)
      expect(r.x).toBeLessThan(320 + 10)
      expect(r.y).toBeGreaterThan(-10)
      expect(r.y).toBeLessThan(440 + 10)
    }
  })
})

// BLUE COLLAR's colony (absolute-batman.md, section 9): the ash painter flies bats in place of its
// motes, the drawing BECOME A BAT's swarm flies, on arcs across a band of the panel.
describe('the colony', () => {
  const BATS = Math.round(((320 * 20) / 1000) * COLONY.density)
  const { band, arc } = COLONY.bats!
  const colorOf = (variable: string) => ({ '--colony': '#b8b0e0' })[variable] ?? ''

  const colony = () => {
    const painter = painterFor(COLONY, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    return painter
  }
  /** What it fills as it appears, then after each of `n` ticks of the clock. */
  const ticks = (n: number) => fillsOver(colony(), n)

  /** A drawn bat's width, the middle of its body and which way its wings beat. */
  const read = (shape: Shape) => {
    const xs = shape.map(([x]) => x)
    const [left, right] = [Math.min(...xs), Math.max(...xs)]
    const width = right - left
    const cx = (left + right) / 2
    // Its first point is where the drawing puts it, either frame, about a body at (0, 0).
    const cy = shape[0]![1] - batOutline('up', 0, 0, width)[0]![1]
    const matches = (wings: Wings) =>
      batOutline(wings, cx, cy, width).every(
        ([x, y], i) => Math.hypot(x - shape[i]![0], y - shape[i]![1]) < 1e-6,
      )
    return { width, cx, cy, wings: matches('up') ? 'up' : matches('down') ? 'down' : null }
  }

  /** The first bat of the first depth, in each frame: the same bat throughout. */
  const firstBat = (n: number) => ticks(n).map((fills) => read(fills[0]!.shapes[0]!))

  it('flies bats, the shared drawing, as many as its density asks of its band', () => {
    for (const fills of ticks(50)) {
      const bats = fills.flatMap((f) => f.shapes)
      expect(bats).toHaveLength(BATS)
      for (const shape of bats) expect(read(shape).wings).not.toBeNull()
      for (const f of fills) expect(f.rects).toHaveLength(0)
    }
  })

  it('fills each depth in its strength, its bats as wide as its size', () => {
    for (const f of ticks(0)[0]!) {
      const depth = COLONY.depths.find((d) => d.alpha === f.alpha)!
      expect(f.color).toBe('#b8b0e0')
      for (const shape of f.shapes) expect(read(shape).width).toBeCloseTo(depth.size)
    }
  })

  // A window shorter than the band: the bats keep to what of it is on the canvas.
  it('keeps its band on the canvas', () => {
    const painter = painterFor(COLONY, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 80)
    const { ctx, fills } = recorder()
    painter.paint(ctx, 0)
    const bats = fills.flatMap((f) => f.shapes)
    expect(bats).toHaveLength(Math.round(((320 * 10) / 1000) * COLONY.density))
    for (const shape of bats) expect(read(shape).cy).toBeLessThanOrEqual(80 + arc)
  })

  // Under the masthead and above the first card: never behind Bat-Clawd or the wordmark. Bats
  // that drift down as they cross come back in at the band's top, not above it.
  it.each([0, 3])('keeps every bat to its band, its arc and its wings (falling %spx a tick)', (fall) => {
    const painter = painterFor({ ...COLONY, depths: COLONY.depths.map((d) => ({ ...d, fall })) }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    for (const fills of fillsOver(painter, 600))
      for (const { shapes } of fills)
        for (const shape of shapes) {
          const reach = arc + read(shape).width / 4
          for (const [, y] of shape) {
            expect(y).toBeGreaterThanOrEqual(band[0] - reach - 1e-9)
            expect(y).toBeLessThanOrEqual(band[1] + reach + 1e-9)
          }
        }
  })

  it('beats its wings every tick', () => {
    const beats = firstBat(20)
      .slice(1)
      .map((bat) => bat.wings)
    for (let i = 1; i < beats.length; i++) expect(beats[i]).not.toBe(beats[i - 1])
  })

  // The page's clock is a timer: its ticks come a hair early or late, and a beat must not hold.
  it('beats its wings every tick on a clock that runs a little early or late', () => {
    const painter = colony()
    painter.paint(recorder().ctx, 0)
    const beats = [0.97, 1.03, 0.98, 1.04, 0.96, 1.02, 0.99, 1.01, 0.97, 1.03].map((ticks) => {
      const r = recorder()
      painter.paint(r.ctx, ticks / FPS)
      return read(r.fills[0]!.shapes[0]!).wings
    })
    for (let i = 1; i < beats.length; i++) expect(beats[i]).not.toBe(beats[i - 1])
  })

  // An arc that rises and dips, not ash's straight slant (jury-wave-2.md, section 3.9).
  it('flies each crossing on an arc that rises and dips', () => {
    const bats = firstBat(400)
    // One whole crossing: from where it came back in at the left edge to where it next does.
    const comebacks = bats.flatMap((bat, i) => (i > 0 && bat.cx < bats[i - 1]!.cx ? [i] : []))
    const ys = bats.slice(comebacks[0], comebacks[1]).map((bat) => bat.cy)
    expect(ys.length).toBeGreaterThan(50)
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(1.8 * arc)
  })

  // At most a few at once, a new one coming in every so often (absolute-batman.md, section 9).
  it('flies its bats out past the edges before they come back, so fewer are in the panel at once', () => {
    const far: AshAtmosphere = { ...COLONY, density: 1, bats: { ...COLONY.bats!, away: 320 } }
    const colonySize = Math.round(((3 * 320 * 20) / 1000) * far.density)
    const painter = painterFor(far, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const inPanel = fillsOver(painter, 400).map(
      (fills) =>
        fills.flatMap((f) => f.shapes).filter((shape) => shape.some(([x]) => x >= 0 && x <= 320)).length,
    )
    // Only the bats on the canvas are drawn.
    for (const fills of fillsOver(painter, 50))
      for (const shape of fills.flatMap((f) => f.shapes))
        expect(shape.some(([x]) => x >= 0 && x <= 320)).toBe(true)
    expect(Math.max(...inPanel)).toBeLessThan(colonySize)
    expect(Math.min(...inPanel)).toBeLessThan(Math.max(...inPanel))
  })

  it('crosses with its depths, either way the wind blows', () => {
    const [first, next] = ticks(1)
    const ways = first!.map((f, d) => Math.sign(read(next![d]!.shapes[0]!).cx - read(f.shapes[0]!).cx))
    expect(ways).toEqual(COLONY.depths.map((d) => Math.sign(d.wind)))
  })
})

// HOLIDAY's torn calendar (long-halloween.md, section 10; jury-wave-3.md, section 9, decision 16):
// the ash painter drops the leaves of a tear-off calendar in place of its motes, under its pumpkin
// moon, and each one swings from side to side as it falls, as a torn leaf does (the maintainer's ask).
describe('the calendar pages', () => {
  const COUNT = Math.round(((320 * 440) / 1000) * PAGES.density)
  const colorOf = (variable: string) => ({ '--pages': '#efe8e6' })[variable] ?? ''

  const calendar = () => {
    const painter = painterFor(PAGES, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    return painter
  }

  const box = (shape: Shape) => {
    const [xs, ys] = [shape.map(([x]) => x), shape.map(([, y]) => y)]
    const [x, y] = [Math.min(...xs), Math.min(...ys)]
    return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y }
  }

  /** The pages a fill draws, in order: each as its month and its leaf below it (two shapes). */
  const pagesOf = (shapes: Shape[]) =>
    Array.from({ length: shapes.length / 2 }, (_, i) => {
      const [a, b] = [box(shapes[2 * i]!), box(shapes[2 * i + 1]!)]
      return { x: a.x, y: a.y, w: a.w, h: b.y + b.h - a.y, month: a.h, gap: b.y - (a.y + a.h) }
    })

  /** The first page of each depth, in each frame: the same pages throughout. */
  const firstPages = (frames: { shapes: Shape[] }[][]) =>
    frames.map((fills) => fills.map((f) => pagesOf(f.shapes)[0]!))

  /** A calendar with no wind and no fall, so a page's moves are its swing alone. */
  const still = () => {
    // Nor any fall: a page that fell off the bottom would come back somewhere new.
    const painter = painterFor(
      { ...PAGES, depths: PAGES.depths.map((d) => ({ ...d, wind: 0, fall: 0 })) },
      seeded(),
    )
    painter.recolor(colorOf)
    painter.resize(320, 440)
    return painter
  }
  const swing = PAGES.pages!.swing
  const period = PAGES.pages!.period * FPS

  it('drops as many pages as its density asks, and no squares', () => {
    for (const fills of fillsOver(calendar(), 20)) {
      expect(fills.flatMap((f) => pagesOf(f.shapes))).toHaveLength(COUNT)
      for (const f of fills) expect(f.rects).toHaveLength(0)
    }
  })

  it('fills each depth in its strength, in the color it is given', () => {
    const fills = fillsOver(calendar(), 0)[0]!
    expect(fills.map((f) => f.alpha)).toEqual(PAGES.depths.map((d) => d.alpha))
    for (const f of fills) expect(f.color).toBe('#efe8e6')
  })

  // A leaf a quarter taller than wide, the month torn across its top by a pixel's gap: at 5 to 7px
  // no number could be drawn, so the gap is what says "calendar".
  it('draws a page as a leaf its size wide, a quarter taller, its month torn off across the top', () => {
    for (const fills of fillsOver(calendar(), 3))
      fills.forEach((f, d) => {
        const { size } = PAGES.depths[d]!
        for (const page of pagesOf(f.shapes)) {
          expect(page.w).toBeCloseTo(size)
          expect(page.h).toBeCloseTo(size * 1.25)
          expect(page.gap).toBeCloseTo(1)
          expect(page.month).toBeGreaterThan(0)
          expect(page.month).toBeLessThan(page.h / 2)
        }
      })
  })

  it('swings each page from side to side as it falls, as far as its swing either way', () => {
    const xs = firstPages(fillsOver(still(), 2 * period)).map((pages) => pages[0]!.x)
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(2 * swing + 1e-9)
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(1.5 * swing)
  })

  it('swings back to where it began once a period', () => {
    const xs = firstPages(fillsOver(still(), period)).map((pages) => pages[0]!.x)
    expect(xs.at(-1)).toBeCloseTo(xs[0]!)
  })

  // Torn from the pad: its bottom edge is ragged, not cut straight.
  it('tears each leaf ragged along its bottom edge', () => {
    for (const { shapes } of fillsOver(calendar(), 0)[0]!)
      for (let i = 1; i < shapes.length; i += 2) {
        const leaf = shapes[i]!
        const bottom = Math.max(...leaf.map(([, y]) => y))
        const ragged = leaf.filter(([, y]) => y > bottom - 0.25 * box(leaf).h)
        // Up and down along it: more than two points, at more than one height.
        expect(ragged.length).toBeGreaterThan(3)
        expect(new Set(ragged.map(([, y]) => y.toFixed(3))).size).toBeGreaterThan(1)
      }
  })

  // A falling leaf swings like a pendulum hung from its top (the maintainer's ask): swung right, its
  // bottom trails right of its top, and it never leans past its tilt.
  it('swings like a pendulum hung from its top, never leaning past its tilt', () => {
    const tilt = 0.3
    const painter = painterFor(
      {
        ...PAGES,
        depths: PAGES.depths.map((d) => ({ ...d, wind: 0, fall: 0 })),
        pages: { ...PAGES.pages!, tilt },
      },
      seeded(),
    )
    painter.recolor(colorOf)
    painter.resize(320, 440)
    /** A page's top: the middle of its month's first two corners, and the angle between them. */
    const top = (shape: Shape) => ({
      x: (shape[0]![0] + shape[1]![0]) / 2,
      lean: Math.atan2(shape[1]![1] - shape[0]![1], shape[1]![0] - shape[0]![0]),
    })
    const tops = fillsOver(painter, period).map((fills) => top(fills[0]!.shapes[0]!))
    const line = (Math.max(...tops.map((t) => t.x)) + Math.min(...tops.map((t) => t.x))) / 2
    for (const { x, lean } of tops) {
      expect(Math.abs(lean)).toBeLessThanOrEqual(tilt + 1e-9)
      // Right of its line, it leans so its bottom trails right: its top edge rises to the right.
      if (Math.abs(x - line) > 0.5) expect(Math.sign(lean)).toBe(-Math.sign(x - line))
    }
    expect(Math.max(...tops.map((t) => Math.abs(t.lean)))).toBeGreaterThan(tilt / 2)
  })

  // Wholly off the canvas before it comes round, even swung and leaning toward the side it left by.
  it('comes back in at the far side only once wholly past the near one', () => {
    const painter = painterFor({ ...PAGES, pages: { ...PAGES.pages!, swing: 6, tilt: 0.35 } }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const frames = fillsOver(painter, 400).map((fills) => fills.flatMap((f) => pagesOf(f.shapes)))
    for (let t = 1; t < frames.length; t++)
      frames[t]!.forEach((page, i) => {
        const was = frames[t - 1]![i]!
        // Came round from the right (not fallen back to the top, somewhere new): where it was, it
        // was off the canvas already.
        if (page.x < was.x - 160 && page.y > was.y - 1) expect(was.x).toBeGreaterThanOrEqual(320 - 1e-9)
      })
  })

  // Not as one: neighbours swing out of step, so the calendar never sways like a curtain.
  it('swings its pages out of step', () => {
    const [first, next] = fillsOver(still(), 1)
    const moves = first!
      .flatMap((f, d) => pagesOf(f.shapes).map((a, i) => Math.sign(pagesOf(next![d]!.shapes)[i]!.x - a.x)))
      .filter((m) => m !== 0)
    expect(new Set(moves).size).toBe(2)
  })

  // Pages fall more than they drift: snow's way down, with ash's lean (long-halloween.md, section 10).
  it('falls each depth about its pace, drifting right with the wind', () => {
    const painter = painterFor({ ...PAGES, pages: { swing: 0, period: 2, tilt: 0 } }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const [first, next] = firstPages(fillsOver(painter, 1))
    PAGES.depths.forEach(({ wind, fall }, d) => {
      const [a, b] = [first![d]!, next![d]!]
      const [ax, bx] = [a.x, b.x]
      expect(b.y - a.y).toBeGreaterThanOrEqual(fall * 0.8 - 1e-9)
      expect(b.y - a.y).toBeLessThanOrEqual(fall * 1.2 + 1e-9)
      expect(bx - ax).toBeGreaterThanOrEqual(wind * 0.8 - 1e-9)
      expect(bx - ax).toBeLessThanOrEqual(wind * 1.2 + 1e-9)
    })
  })

  it('keeps falling: a page that leaves the bottom comes back above the top', () => {
    const last = fillsOver(calendar(), 600)
      .at(-1)!
      .flatMap((f) => pagesOf(f.shapes))
    expect(last).toHaveLength(COUNT)
    for (const page of last) {
      expect(page.x).toBeGreaterThan(-10)
      expect(page.x).toBeLessThan(320 + 10)
      expect(page.y).toBeGreaterThan(-10)
      expect(page.y).toBeLessThan(440 + 10)
    }
  })
})

describe('the smoke', () => {
  const smoke = (atmosphere = SMOKE) => {
    const painter = painterFor(atmosphere, seeded())
    painter.recolor(() => '#62664a')
    painter.resize(320, 440)
    return painter
  }

  type Puff = { x: number; y: number; r: number; alpha: number }
  /**
   * The puffs in a frame, in the order painted: a puff is a few discs about one center (its soft
   * edge), so its width is its widest disc's and its strength the sum of its discs' alphas.
   */
  const puffsIn = (fills: { alpha: number; discs: Disc[] }[]): Puff[] => {
    const puffs = new Map<string, Puff>()
    for (const { alpha, discs } of fills)
      for (const { x, y, r } of discs) {
        const key = `${x},${y}`
        const p = puffs.get(key) ?? { x, y, r: 0, alpha: 0 }
        puffs.set(key, { ...p, r: Math.max(p.r, r), alpha: p.alpha + alpha })
      }
    return [...puffs.values()]
  }
  const frames = (n: number, dt = 1 / FPS, painter = smoke()) => fillsOver(painter, n, dt).map(puffsIn)

  it('puts as many puffs on the canvas as it asks, in the color it is given, soft at the edge', () => {
    const painter = smoke()
    const { ctx, fills } = recorder()
    painter.paint(ctx, 0)
    expect(puffsIn(fills)).toHaveLength(SMOKE.puffs)
    for (const f of fills) expect(f.color).toBe('#62664a')
    // More than one disc a puff: it fades out toward its edge.
    expect(fills.flatMap((f) => f.discs).length).toBeGreaterThan(SMOKE.puffs)
  })

  // Off the street: every puff is in the bottom of the panel, below how far one can rise in its life.
  it('keeps its puffs near the bottom edge', () => {
    const highest = 440 - SMOKE.rise * SMOKE.life * FPS - SMOKE.size[1]
    for (const frame of frames(100))
      for (const p of frame) {
        expect(p.y).toBeGreaterThan(highest)
        expect(p.y - p.r).toBeLessThan(440)
      }
  })

  it('rises, swells and fades a tick at a time', () => {
    const [first, next] = frames(1)
    first!.forEach((a, i) => {
      const b = next![i]!
      if (b.y > a.y) return // gone, and back at the street
      expect(a.y - b.y).toBeCloseTo(SMOKE.rise)
      expect(b.r).toBeGreaterThan(a.r)
      expect(b.alpha).toBeLessThan(a.alpha)
    })
  })

  // Four seconds from the street to nothing: then it leaves the street again, somewhere new.
  it('fades a puff to nothing over its life, then sends it up again from the street', () => {
    const all = frames(SMOKE.life * FPS + 1)
    const lives = all.map((frame) => frame[0]!)
    const gone = lives.findIndex((p, i) => i > 0 && p.y > lives[i - 1]!.y)
    expect(gone).toBe(SMOKE.life * FPS)
    expect(lives[gone - 1]!.alpha).toBeLessThan(0.01)
    expect(lives[gone]!.y).toBe(440)
    expect(lives[gone]!.r).toBe(SMOKE.size[0] / 2)
    expect(lives[gone]!.alpha).toBeCloseTo(SMOKE.alpha)
    expect(all.at(-1)).toHaveLength(SMOKE.puffs)
  })

  // They leave the street one after another, never all at once: the smoke never pulses.
  it('keeps its puffs at different heights', () => {
    for (const frame of frames(50)) expect(new Set(frame.map((p) => p.y)).size).toBe(SMOKE.puffs)
  })

  it('sways a puff a little either way as it rises, never more', () => {
    const lives = frames(SMOKE.life * FPS - 1).map((frame) => frame[0]!)
    const xs = lives.map((p) => p.x)
    expect(Math.max(...xs) - Math.min(...xs)).toBe(2 * SMOKE.sway)
  })

  // A late tick may carry a short-lived puff past more than one whole life.
  it('never paints a puff past the end of its life, however short', () => {
    const brief = { ...SMOKE, life: 0.2 }
    for (const frame of frames(20, 2 / FPS, smoke(brief)))
      for (const p of frame) {
        expect(p.r).toBeLessThanOrEqual(brief.size[1] / 2)
        expect(p.alpha).toBeGreaterThanOrEqual(0)
      }
  })

  it('rises as far as the time between ticks, up to two ticks', () => {
    const risen = (dt: number) => {
      const [first, next] = frames(1, dt)
      return first![1]!.y - next![1]!.y
    }
    expect(risen(2 / FPS)).toBeCloseTo(2 * risen(1 / FPS))
    expect(risen(5)).toBeCloseTo(risen(2 / FPS))
  })

  it('paints round puffs and keeps them in their column when it asks for no wind', () => {
    for (const frame of fillsOver(smoke(), 10))
      for (const { discs } of frame) for (const d of discs) expect(d.ry).toBe(d.r)
    // One life of the first puff: it sways about its column, never further.
    const xs = frames(SMOKE.life * FPS - 1).map((frame) => frame[0]!.x)
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(2 * SMOKE.sway)
  })

  // Fog and cloud banks (jury-wave-3.md, section 6): low, wide puffs a wind carries across the panel.
  describe('on a wind', () => {
    /** Fog: long-lived puffs, three times as wide as tall, rising a hair and blown 3px a tick. */
    const FOG: SmokeAtmosphere = { ...SMOKE, life: 60, rise: 0.1, sway: 0, wind: 3, aspect: 1 / 3 }

    it('drifts its puffs across the panel with the wind, a tick at a time', () => {
      const [first, next] = frames(1, 1 / FPS, smoke(FOG))
      first!.forEach((a, i) => {
        const b = next![i]!
        if (b.x < a.x) return // blown past the right side, and back in at the left
        expect(b.x - a.x).toBeCloseTo(FOG.wind!)
      })
    })

    it('drifts as far as the time between ticks, up to two ticks', () => {
      const blown = (dt: number) => {
        const [first, next] = frames(1, dt, smoke(FOG))
        return next![1]!.x - first![1]!.x
      }
      expect(blown(2 / FPS)).toBeCloseTo(2 * blown(1 / FPS))
      expect(blown(5)).toBeCloseTo(blown(2 / FPS))
    })

    it.each([3, -3])('brings a puff blown past one side back in at the other (wind %spx)', (wind) => {
      const reach = FOG.size[1] / 2
      const xs = frames(400, 1 / FPS, smoke({ ...FOG, wind })).map((frame) => frame[0]!.x)
      for (const x of xs) {
        expect(x).toBeGreaterThanOrEqual(-reach)
        expect(x).toBeLessThanOrEqual(320 + reach)
      }
      // It came round at least once.
      expect(xs.some((x, i) => i > 0 && Math.sign(x - xs[i - 1]!) !== Math.sign(wind))).toBe(true)
    })

    // A bank is born wide: if it were born at full strength it would blink on mid-panel.
    it('fades a bank in as it is born, as well as out as it dies', () => {
      const brief = { ...FOG, life: 2 }
      const lives = frames(2 * brief.life * FPS, 1 / FPS, smoke(brief)).map((frame) => frame[0]!)
      // Reborn: back at the bottom edge, where it is born.
      const born = lives.findIndex((p, i) => i > 0 && p.y > lives[i - 1]!.y)
      expect(born).toBeGreaterThan(0)
      expect(lives[born]!.alpha).toBeLessThan(brief.alpha * 0.25)
      expect(Math.max(...lives.map((p) => p.alpha))).toBeLessThanOrEqual(brief.alpha + 1e-9)
    })

    // Puffs that shrink, or sway far: still wholly off the canvas when they come round.
    it.each([[{ size: [120, 40] as const, sway: 0 }], [{ size: [12, 20] as const, sway: 15 }]])(
      'comes round only once it is wholly past the side (%o)',
      (shape) => {
        const painter = smoke({ ...FOG, ...shape, life: 600, wind: 3 })
        const lives = frames(300, 1 / FPS, painter).map((frame) => frame[0]!)
        let wrapped = 0
        lives.forEach((p, i) => {
          // Come round: back across most of the canvas in one tick (a sway step is far shorter).
          if (i === 0 || p.x >= lives[i - 1]!.x - 160) return
          wrapped++
          // Where the wind would have carried it this tick, it is wholly past the right side; where it
          // comes back, wholly before the left one, a tick's wind from coming in.
          const was = lives[i - 1]!
          expect(was.x + 3 - was.r).toBeGreaterThanOrEqual(320 - 1e-9)
          expect(p.x + p.r).toBeLessThanOrEqual(3 + 1e-9)
        })
        expect(wrapped).toBeGreaterThan(0)
      },
    )

    it('flattens its puffs by its aspect, as wide as ever', () => {
      for (const frame of fillsOver(smoke(FOG), 5))
        for (const { discs } of frame) for (const d of discs) expect(d.ry).toBeCloseTo(d.r * FOG.aspect!)
    })
  })

  // SAME BAT-TIME's clouds (LUC-118's comment on LUC-89): banks across a navy sky, not off the street.
  describe('born in a band of the sky', () => {
    /** Cloud banks born 40 to 120px down, rising not at all, blown 1px a tick. */
    const CLOUDS: SmokeAtmosphere = {
      ...SMOKE,
      life: 30,
      rise: 0,
      sway: 0,
      wind: 1,
      aspect: 1 / 4,
      band: [40, 120],
    }

    it('keeps every bank that never rises in its band, each at a height of its own', () => {
      const ys = frames(3 * CLOUDS.life * FPS, 1 / FPS, smoke(CLOUDS))
        .flat()
        .map((p) => p.y)
      for (const y of ys) {
        expect(y).toBeGreaterThanOrEqual(40)
        expect(y).toBeLessThanOrEqual(120)
      }
      expect(new Set(ys).size).toBeGreaterThan(CLOUDS.puffs)
    })

    it('rises from where it is born, as far as it asks', () => {
      const [first, next] = frames(1, 1 / FPS, smoke({ ...CLOUDS, rise: 2 }))
      first!.forEach((a, i) => {
        const b = next![i]!
        if (b.y > a.y) return // gone, and born again lower in the band
        expect(a.y - b.y).toBeCloseTo(2)
      })
    })

    it('is born again at a new height in its band once it is gone', () => {
      const lives = frames(2 * CLOUDS.life * FPS - 1, 1 / FPS, smoke(CLOUDS)).map((frame) => frame[0]!)
      expect(new Set(lives.map((p) => p.y)).size).toBe(2)
    })
  })
})

describe('the noise', () => {
  const noise = (atmosphere: NoiseAtmosphere = NOISE) => {
    const painter = painterFor(atmosphere, seeded())
    painter.recolor(() => '#e9f2ee')
    painter.resize(320, 440)
    return painter
  }

  const over = (n: number, dt = 1 / FPS, painter = noise()) => framesOver(painter, n, dt)
  /** Where the specks are in a frame, as "x,y". */
  const spots = ({ fills }: ReturnType<typeof recorder>) =>
    fills.flatMap((f) => f.rects.map((r) => `${r.x},${r.y}`))

  it('scatters as many specks as its density asks, each its size, in its color and strengths', () => {
    const [frame] = over(0)
    const specks = frame!.fills.flatMap((f) => f.rects)
    expect(specks).toHaveLength(Math.round(((320 * 440) / 1000) * NOISE.density))
    for (const s of specks) {
      expect(s.size).toBe(NOISE.size)
      expect(s.x).toBeGreaterThanOrEqual(0)
      expect(s.x).toBeLessThan(320)
      expect(s.y).toBeGreaterThanOrEqual(0)
      expect(s.y).toBeLessThan(440)
    }
    for (const f of frame!.fills) {
      expect(f.color).toBe('#e9f2ee')
      expect(NOISE.alphas).toContain(f.alpha)
    }
    // Every strength is used, not only one.
    expect(new Set(frame!.fills.filter((f) => f.rects.length).map((f) => f.alpha)).size).toBe(
      NOISE.alphas.length,
    )
  })

  // Static flickers in place: a speck that lives a tick is somewhere else on the next, anywhere on
  // the screen, never a step down from where it was (that would be snow).
  it('puts every speck somewhere new each tick when it lives a tick', () => {
    const frames = over(5)
    for (let i = 1; i < frames.length; i++) {
      const before = new Set(spots(frames[i - 1]!))
      const now = spots(frames[i]!)
      expect(now).toHaveLength(before.size)
      expect(now.filter((s) => before.has(s)).length).toBeLessThan(now.length / 10)
    }
  })

  // A mark that lives longer stays put that long; they were born a tick apart, so a share of them
  // moves each tick and the noise never pulses.
  it('keeps each speck in place for its life, a share of them moving each tick', () => {
    const life = 3
    const at = over(9, 1 / FPS, noise({ ...NOISE, life: life / FPS })).map(spots)
    const n = at[0]!.length
    const movedAt = (k: number) => at.flatMap((frame, i) => (i > 0 && frame[k] !== at[i - 1]![k] ? [i] : []))
    for (let k = 0; k < n; k++) {
      const ticks = movedAt(k)
      expect(ticks.length).toBeGreaterThanOrEqual(2)
      for (let j = 1; j < ticks.length; j++) expect(ticks[j]! - ticks[j - 1]!).toBe(life)
    }
    for (let i = 1; i < at.length; i++) {
      const moved = at[i]!.filter((s, k) => s !== at[i - 1]![k]).length
      expect(Math.abs(moved - n / life)).toBeLessThanOrEqual(1)
    }
  })

  // The page's clock is a timer, a hair early or late each tick: static still flickers every tick,
  // and a longer life still lasts its whole ticks.
  it('counts whole ticks on a clock that runs a hair early or late', () => {
    const jittered = (life: number) => {
      const painter = noise({ ...NOISE, life: life / FPS })
      const first = recorder()
      painter.paint(first.ctx, 0)
      const frames = [spots(first)]
      for (let i = 0; i < 12; i++) {
        const r = recorder()
        painter.paint(r.ctx, (i % 2 ? 1.002 : 0.998) / FPS)
        frames.push(spots(r))
      }
      return frames
    }
    const statics = jittered(1)
    for (let i = 1; i < statics.length; i++) expect(statics[i]![0]).not.toBe(statics[i - 1]![0])
    const longer = jittered(3)
    const moves = longer.flatMap((frame, i) => (i > 0 && frame[0] !== longer[i - 1]![0] ? [i] : []))
    for (let j = 1; j < moves.length; j++) expect(moves[j]! - moves[j - 1]!).toBe(3)
  })

  it('stands still while no time passes', () => {
    const painter = noise()
    const [a, b] = [recorder(), recorder()]
    painter.paint(a.ctx, 0)
    painter.paint(b.ctx, 0)
    expect(spots(b)).toEqual(spots(a))
  })

  describe('its band', () => {
    const bars = (frames: ReturnType<typeof over>) => frames.map((f) => f.boxes)
    /** The bar's top and bottom in a frame: its tallest box's. */
    const span = (boxes: Box[]) => {
      const tall = boxes.reduce((a, b) => (b.h > a.h ? b : a))
      return { top: tall.y, bottom: tall.y + tall.h }
    }

    it('spans the canvas, as tall as it asks, soft at its edges, in its color', () => {
      const [boxes] = bars(over(0))
      expect(boxes!.length).toBeGreaterThan(1)
      for (const b of boxes!) {
        expect(b.x).toBe(0)
        expect(b.w).toBe(320)
        expect(b.color).toBe('#e9f2ee')
      }
      const { top, bottom } = span(boxes!)
      expect(bottom - top).toBe(NOISE.band!.height)
      // Its boxes stack about one middle, so it is strongest there; together as strong as it asks.
      const middles = new Set(boxes!.map((b) => b.y + b.h / 2))
      expect(middles.size).toBe(1)
      expect(boxes!.reduce((sum, b) => sum + b.alpha, 0)).toBeCloseTo(NOISE.band!.alpha)
    })

    it('rolls down a few pixels a tick, as far as the time between ticks, up to two', () => {
      const moved = (dt: number) => {
        const [a, b] = bars(over(1, dt))
        return span(b!).top - span(a!).top
      }
      expect(moved(1 / FPS)).toBeCloseTo(NOISE.band!.fall)
      expect(moved(2 / FPS)).toBeCloseTo(2 * NOISE.band!.fall)
      expect(moved(5)).toBeCloseTo(2 * NOISE.band!.fall)
    })

    // Off the bottom, it comes in again from above the top, as an old set's picture rolls.
    it('comes back from above the top once it has rolled off the bottom', () => {
      const ticks = Math.ceil((440 + NOISE.band!.height) / NOISE.band!.fall) + 2
      const tops = bars(over(ticks)).map((boxes) => span(boxes).top)
      const back = tops.findIndex((y, i) => i > 0 && y < tops[i - 1]!)
      expect(back).toBeGreaterThan(0)
      expect(tops[back - 1]!).toBeGreaterThan(440 - NOISE.band!.fall)
      expect(tops[back]!).toBeLessThan(0)
      for (const y of tops) expect(y).toBeGreaterThanOrEqual(-NOISE.band!.height)
    })

    // The canvas comes and goes with its motion, and a new one always started the bar at the top:
    // it starts anywhere along its roll, and a resize leaves it where it is.
    it('starts anywhere along its roll, and stays put through a resize', () => {
      const starts = [1, 2, 3, 4, 5].map((seed) => {
        const painter = painterFor(NOISE, seeded(seed))
        painter.recolor(() => '#e9f2ee')
        painter.resize(320, 440)
        return span(framesOver(painter, 0)[0].boxes).top
      })
      expect(new Set(starts).size).toBe(starts.length)
      for (const top of starts) {
        expect(top).toBeGreaterThanOrEqual(-NOISE.band!.height)
        expect(top).toBeLessThanOrEqual(440)
      }
      const painter = noise()
      const before = span(framesOver(painter, 0)[0].boxes).top
      painter.resize(300, 400)
      expect(span(framesOver(painter, 0)[0].boxes).top).toBe(before)
    })

    it('has none when it asks for none', () => {
      const { band: _, ...plain } = NOISE
      const [boxes] = bars(over(0, 1 / FPS, noise(plain)))
      expect(boxes).toHaveLength(0)
    })
  })
})

describe('the lit windows', () => {
  const WINDOWS: LitWindowsAtmosphere = {
    kind: 'lit-windows',
    glass: '--smoke',
    edge: '--line',
    tallest: 0.2,
    towers: 5,
    litShare: 0.08,
    lights: [
      { color: '--bone', share: 0.7, alpha: 0.22 },
      { color: '--ink-live', share: 0.3, alpha: 0.28 },
    ],
    switchEvery: 1,
    still: true,
  }
  const COLORS = ['#080d13', '#2b3743', '#e6ebee', '#7cc6c4']
  /** The page's values for the variables, in COLORS' order. */
  const colorOf = (variable: string) =>
    COLORS[['--smoke', '--line', '--bone', '--ink-live'].indexOf(variable)] ?? ''
  /** A window cell: 3 by 4 pixels. */
  const isWindow = (b: Box) => b.w === 3 && b.h === 4

  const city = () => {
    const painter = painterFor(WINDOWS, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    return painter
  }

  /** The skyline as it appears, then what each of `n` ticks of the clock draws. */
  const ticks = (n: number) => framesOver(city(), n)

  // Flat-roofed slabs along the bottom, about a fifth of the panel tall, edged in their own color.
  it('stands its towers along the bottom, as tall as its height at most', () => {
    const [{ boxes, outlines }] = ticks(0)
    const towers = boxes.filter((b) => b.color === COLORS[0] && !isWindow(b))
    expect(towers).toHaveLength(WINDOWS.towers)
    for (const t of towers) {
      expect(t.y + t.h).toBe(440)
      expect(t.h).toBeLessThanOrEqual(440 * WINDOWS.tallest)
    }
    expect(outlines).toHaveLength(WINDOWS.towers)
    for (const o of outlines) expect(o.color).toBe(COLORS[1])
  })

  it('lights about its share of windows, in its lights, mostly the first', () => {
    const painter = city()
    const { ctx, boxes } = recorder()
    painter.paint(ctx, 0)
    const lit = boxes.filter((b) => isWindow(b) && b.color !== COLORS[0])
    const first = lit.filter((b) => b.color === COLORS[2])
    for (const b of first) expect(b.alpha).toBe(0.22)
    for (const b of lit.filter((b) => b.color === COLORS[3])) expect(b.alpha).toBe(0.28)
    expect(lit.length).toBeGreaterThan(0)
    expect(first.length).toBeGreaterThan(lit.length / 2)
  })

  // A still scene: painted once, then a single window a second, never the whole canvas again.
  it('leaves the canvas alone between switches', () => {
    const [first, ...after] = ticks(7)
    expect(first.cleared.times).toBe(1)
    for (const r of after) {
      expect(r.cleared.times).toBe(0)
      expect(r.boxes).toEqual([])
    }
  })

  it('switches one window about once a second', () => {
    const after = ticks(16).slice(1)
    const drawn = after.map((r) => r.boxes)
    const switches = drawn.filter((boxes) => boxes.length > 0)
    expect(switches).toHaveLength(2)
    for (const boxes of switches) {
      // The cell goes dark (the tower's color), half a pixel past it all round so no light is
      // left at its edges, and, switching on, takes a light over it.
      const [glass, ...light] = boxes
      expect(glass).toMatchObject({ w: 4, h: 5, color: COLORS[0], alpha: 1 })
      for (const b of light) expect(b).toMatchObject({ x: glass!.x + 0.5, y: glass!.y + 0.5, w: 3, h: 4 })
    }
  })

  it('lights no window without lights', () => {
    const painter = painterFor({ ...WINDOWS, lights: [] }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const { ctx, boxes } = recorder()
    painter.paint(ctx, 0)
    for (let i = 0; i < 16; i++) painter.paint(ctx, 1 / FPS)
    expect(boxes.filter(isWindow)).toEqual([])
  })

  // No Theme on the page yet, or a variable it can't use: an empty color would leave the canvas's
  // last fill in place, and the towers would take a light's color.
  it('paints nothing until it has its colors, then the whole scene', () => {
    const painter = painterFor(WINDOWS, seeded())
    painter.recolor(() => '')
    painter.resize(320, 440)
    const before = recorder()
    painter.paint(before.ctx, 0)
    expect(before.boxes).toEqual([])
    painter.recolor(colorOf)
    const after = recorder()
    painter.paint(after.ctx, 1 / FPS)
    expect(after.boxes.some((b) => b.color === COLORS[0])).toBe(true)
  })

  // Switching at random would drift toward half the windows lit over a long night.
  it('keeps its share of windows lit', () => {
    const painter = city()
    painter.paint(recorder().ctx, 0)
    // An hour of switches, then the canvas painted afresh from what is lit.
    const { ctx: idle } = recorder()
    for (let i = 0; i < 3600 * FPS; i++) painter.paint(idle, 1 / FPS)
    painter.recolor(colorOf)
    const { ctx, boxes } = recorder()
    painter.paint(ctx, 0)
    // Painted whole, only the lit windows are drawn as cells.
    const lit = boxes.filter(isWindow).length
    const glass = boxes
      .filter((b) => b.color === COLORS[0] && !isWindow(b))
      .reduce((n, t) => n + Math.floor((t.w - 5) / 4) * Math.floor((t.h - 2) / 5), 0)
    expect(Math.abs(lit - WINDOWS.litShare * glass)).toBeLessThanOrEqual(1)
  })

  // The panel changes size as cases come and go: the city stays the same city.
  it('stands the same towers again after a resize', () => {
    const painter = city()
    const towersOf = () => {
      const { ctx, outlines } = recorder()
      painter.resize(320, 440)
      painter.paint(ctx, 0)
      return outlines
    }
    expect(towersOf()).toEqual(towersOf())
  })

  it('strokes no edge when its towers have none', () => {
    const painter = painterFor({ ...WINDOWS, edge: undefined }, seeded())
    painter.recolor(colorOf)
    painter.resize(320, 440)
    const { ctx, outlines } = recorder()
    painter.paint(ctx, 0)
    expect(outlines).toEqual([])
  })

  it('paints the whole scene again in new colors', () => {
    const painter = city()
    painter.paint(recorder().ctx, 0)
    painter.recolor(() => '#111111')
    const { ctx, boxes, cleared } = recorder()
    painter.paint(ctx, 1 / FPS)
    expect(cleared.times).toBe(1)
    expect(boxes.some((b) => b.color === '#111111')).toBe(true)
  })
})

// A still drawing behind the motion, painted once (jury-wave-3.md, section 6, item 2): HOLIDAY's
// pumpkin moon first (jury section 9, decision 15); TAS's skyline and West's Signal join it later.
describe('the moon behind the motion', () => {
  /** A carved moon three quarters across, 80px down, 30px across its middle, faint. */
  const MOON: MoonBackdrop = {
    kind: 'moon',
    color: '--moon',
    alpha: 0.35,
    at: [0.75, 80],
    radius: 30,
    carved: true,
  }
  const colorOf = (variable: string) => ({ '--moon': '#7a3a12', '--candle': '#e8a040' })[variable] ?? ''

  const moon = (backdrop: MoonBackdrop = MOON, width = 320) => {
    const painter = backdropFor(backdrop)
    painter.recolor(colorOf)
    painter.resize(width, 440)
    const { ctx, fills, cleared } = recorder()
    painter.paint(ctx, 0)
    return { painter, fills, cleared }
  }

  it('paints its moon where it is asked, as wide as it asks, in its color and strength', () => {
    const { fills } = moon()
    expect(fills).toHaveLength(1)
    const [{ color, alpha, discs }] = fills as [(typeof fills)[number]]
    expect(color).toBe('#7a3a12')
    expect(alpha).toBe(0.35)
    expect(discs).toHaveLength(1)
    expect(discs[0]!.x).toBeCloseTo(0.75 * 320)
    expect(discs[0]!.y).toBeCloseTo(80)
    expect(discs[0]!.r).toBeCloseTo(30)
  })

  it('keeps its place across the panel as the panel widens', () => {
    expect(moon(MOON, 400).fills[0]!.discs[0]!.x).toBeCloseTo(0.75 * 400)
  })

  it('paints a plain moon round, with nothing cut out of it', () => {
    const plain = moon({ ...MOON, carved: undefined }).fills[0]!
    expect(plain.discs[0]!.ry).toBeCloseTo(plain.discs[0]!.r)
    expect(plain.shapes).toHaveLength(0)
  })

  // A pumpkin: wider than tall, a stem on top, two eyes and a toothed grin cut through it, the
  // cuts left empty by the even-odd rule (long-halloween.md; Sale's 2021 Deluxe cover).
  it('carves a pumpkin: wider than tall, a stem, two eyes and a grin cut through it', () => {
    const { discs, shapes, rule } = moon().fills[0]!
    const { x, y, r, ry } = discs[0]!
    expect(ry).toBeLessThan(r)
    expect(rule).toBe('evenodd')
    const inside = ([px, py]: readonly [number, number]) =>
      ((px - x) / r) ** 2 + ((py - y) / ry) ** 2 <= 1 + 1e-9
    const [stem, ...cuts] = shapes
    // The stem stands on the top, above the body.
    expect(Math.min(...stem!.map(([, py]) => py))).toBeLessThan(y - ry)
    // Two eyes and a grin, each wholly inside the body, so each cut is a hole.
    expect(cuts).toHaveLength(3)
    for (const cut of cuts) for (const point of cut) expect(inside(point)).toBe(true)
    const [left, right, grin] = cuts as [Shape, Shape, Shape]
    const meanX = (shape: Shape) => shape.reduce((sum, [px]) => sum + px, 0) / shape.length
    const meanY = (shape: Shape) => shape.reduce((sum, [, py]) => sum + py, 0) / shape.length
    expect(meanX(left)).toBeLessThan(x)
    expect(meanX(right)).toBeGreaterThan(x)
    expect(meanY(grin)).toBeGreaterThan(Math.max(meanY(left), meanY(right)))
    // Teeth: the grin's edge goes up and down more than twice.
    const turns = grin.filter(
      (_, i) =>
        i > 0 && i < grin.length - 1 && (grin[i]![1] - grin[i - 1]![1]) * (grin[i + 1]![1] - grin[i]![1]) < 0,
    )
    expect(turns.length).toBeGreaterThan(2)
  })

  // The Deluxe cover's lantern (the maintainer, on screen): its eyes furious, slanting down to the
  // middle; its grin cut in the shape of the bat, its head and ears notched into the grin's top.
  it("carves furious eyes and a grin in the bat's shape", () => {
    const [, left, right, grin] = moon().fills[0]!.shapes as [Shape, Shape, Shape, Shape]
    const { x } = moon().fills[0]!.discs[0]!
    // Each eye's top corner nearest the middle is lower than its outer one.
    const topNearMiddle = (eye: Shape, side: number) => {
      const top = [...eye].sort((a, b) => a[1] - b[1]).slice(0, 2)
      const [inner, outer] = [...top].sort((a, b) => Math.abs(a[0] - x) - Math.abs(b[0] - x))
      return inner![1] > outer![1] && Math.sign(inner![0] - x) === side
    }
    expect(topNearMiddle(left, -1)).toBe(true)
    expect(topNearMiddle(right, 1)).toBe(true)
    // The grin is the bat: symmetric, its ears the two points along its top nearest the middle,
    // rising above the shoulders either side of them.
    const mirrored = new Set(grin.map(([px, py]) => `${(2 * x - px).toFixed(2)},${py.toFixed(2)}`))
    expect(new Set(grin.map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`))).toEqual(mirrored)
    const topEdge = grin.filter(([, py]) => py < Math.min(...grin.map(([, gy]) => gy)) + 6)
    const ears = topEdge.filter(([px]) => Math.abs(px - x) < 6)
    expect(ears.length).toBeGreaterThanOrEqual(2)
  })

  it('lights its carving from inside by its candle, if it has one, the stem left out', () => {
    const lit = moon({ ...MOON, candle: '--candle' })
    expect(lit.fills).toHaveLength(2)
    const [body, flame] = lit.fills as [(typeof lit.fills)[number], (typeof lit.fills)[number]]
    expect(flame.shapes).toEqual(body.shapes.slice(1))
    expect(moon().fills).toHaveLength(1)
  })

  // Still: nothing moves, so a tick paints the same picture, and the page only asks for one after
  // a resize or new colors.
  it('paints the same picture every time', () => {
    const { painter, fills } = moon()
    const again = recorder()
    painter.paint(again.ctx, 1 / FPS)
    expect(again.fills).toEqual(fills)
  })

  it('paints in its new color once recolored', () => {
    const { painter } = moon()
    painter.recolor(() => '#3d1b13')
    const again = recorder()
    painter.paint(again.ctx, 0)
    expect(again.fills[0]!.color).toBe('#3d1b13')
  })
})

// SAME BAT-TIME's Signal on the clouds, after the 1966 series [17]: a pale ellipse of light, high in
// the sky and never lit as the alarm, with the bat cut out of it so the sky shows through.
describe('the Signal behind the motion', () => {
  /** A diamond for a bat: 120 wide, 48 tall on the emblems' grid, its middle at (60, 24). */
  const DIAMOND = 'M0 24 L60 0 L120 24 L60 48 Z'
  const SIGNAL: SignalBackdrop = {
    kind: 'signal',
    color: '--sky-signal',
    alpha: 0.1,
    at: [0.6, 90],
    radius: 40,
    aspect: 0.6,
    bat: { d: DIAMOND, width: 0.8 },
  }

  const signal = (backdrop: SignalBackdrop = SIGNAL, width = 320) => {
    const painter = backdropFor(backdrop)
    painter.recolor(namedColor)
    painter.resize(width, 440)
    const { ctx, fills } = recorder()
    painter.paint(ctx, 0)
    return { painter, fills }
  }

  it('paints its light where it is asked, as wide as it asks and flattened, in its color and strength', () => {
    const { fills } = signal()
    expect(fills).toHaveLength(1)
    const [{ color, alpha, discs }] = fills as [(typeof fills)[number]]
    expect(color).toBe('#sky-signal')
    expect(alpha).toBe(0.1)
    expect(discs).toEqual([{ x: 0.6 * 320, y: 90, r: 40, ry: 24 }])
    expect(signal(SIGNAL, 400).fills[0]!.discs[0]!.x).toBeCloseTo(0.6 * 400)
  })

  it('cuts its bat out of the light, centred in it and as wide as it asks', () => {
    // A bat that fills only part of the grid, below its middle: measured by its own outline.
    const { rule, shapes } = signal({ ...SIGNAL, bat: { d: 'M40 14 L80 14 L80 38 L40 38 Z', width: 0.8 } })
      .fills[0]!
    expect(rule).toBe('evenodd')
    expect(shapes).toHaveLength(1)
    const bat = shapes[0]!
    const xs = bat.map(([x]) => x)
    const ys = bat.map(([, y]) => y)
    // 0.8 of the light's 80px: 64px, its own proportions kept (24 tall for 40 wide).
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(64)
    expect(Math.max(...ys) - Math.min(...ys)).toBeCloseTo(64 * 0.6)
    expect((Math.max(...xs) + Math.min(...xs)) / 2).toBeCloseTo(0.6 * 320)
    expect((Math.max(...ys) + Math.min(...ys)) / 2).toBeCloseTo(90)
  })

  it('paints the same picture every time', () => {
    const { painter, fills } = signal()
    const again = recorder()
    painter.paint(again.ctx, 1 / FPS)
    expect(again.fills).toEqual(fills)
  })

  // The bat is one traced outline in straight lines, each point after its own L: anything else would
  // be drawn as another shape, with no error.
  it.each([
    ['curves', 'M0 0 C10 10 20 10 30 0 Z'],
    ['points without their L', 'M0 0 L10 5 20 0 Z'],
    ['two outlines', 'M0 0 L10 0 L10 10 Z M20 0 L30 0 L30 10 Z'],
    ['nothing', ''],
  ])('will not take a bat drawn with %s', (_, d) => {
    expect(() => backdropFor({ ...SIGNAL, bat: { d, width: 0.8 } })).toThrow()
  })
})

// DARK DECO's sky, after the opening of Batman: The Animated Series (dark-deco-build.md, section 2):
// a red sky in bands from its black top to the horizon, shadows of cloud only darker than it, Deco
// towers cut out in black along the foot with a few lit windows, and a blue mist under them.
describe('the skyline behind the motion', () => {
  const SKYLINE: SkylineBackdrop = {
    kind: 'skyline',
    sky: [
      { above: 440, color: '--sky-top' },
      { above: 242, color: '--sky' },
      { above: 44, color: '--sky-lit' },
    ],
    clouds: {
      color: '--sky-shadow',
      blur: 12,
      masses: [
        { at: [0.1, 0.1], size: [110, 55], alpha: 0.75 },
        { at: [0.8, 0.7], size: [90, 24], alpha: 0.5 },
      ],
    },
    towers: { color: '--skyline', height: [30, 140], windows: { color: '--window', alpha: 0.35, count: 12 } },
    mist: { color: '--mist', alpha: 0.55, height: 36 },
  }
  const painted = (width = 320, height = 440, backdrop = SKYLINE) => {
    const painter = backdropFor(backdrop)
    painter.recolor(namedColor)
    painter.resize(width, height)
    const r = recorder()
    painter.paint(r.ctx, 0)
    return r
  }
  const towers = (r: ReturnType<typeof recorder>) => r.fills.filter((f) => f.color === '#skyline')
  const points = (r: ReturnType<typeof recorder>) => towers(r).flatMap((f) => f.shapes.flat())

  it('paints the sky from its top to the horizon in its bands', () => {
    const [sky] = painted().boxes
    expect(sky).toMatchObject({ x: 0, y: 0, w: 320, h: 440 })
    expect(sky!.color).toMatchObject({
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 440,
      stops: [
        [0, '#sky-top'],
        [0.45, '#sky'],
        [0.9, '#sky-lit'],
      ],
    })
  })

  it('shades it with soft clouds where they are asked, in their color and strength', () => {
    const clouds = painted().fills.filter((f) => f.color === '#sky-shadow')
    expect(clouds.map((f) => f.filter)).toEqual(['blur(12px)', 'blur(12px)'])
    expect(clouds.map((f) => f.alpha)).toEqual([0.75, 0.5])
    expect(clouds.map((f) => f.discs[0])).toEqual([
      { x: 32, y: 44, r: 110, ry: 55 },
      { x: 256, y: 308, r: 90, ry: 24 },
    ])
  })

  // The opening's flat streaks [17] stay crisp where its billows are soft (section 2.2).
  it('blurs a mass by its own softness, if it has one', () => {
    const streaked: SkylineBackdrop = {
      ...SKYLINE,
      clouds: {
        ...SKYLINE.clouds,
        masses: [...SKYLINE.clouds.masses, { at: [0.5, 0.6], size: [140, 3], alpha: 0.4, blur: 2.5 }],
      },
    }
    const clouds = painted(320, 440, streaked).fills.filter((f) => f.color === '#sky-shadow')
    expect(clouds.map((f) => f.filter)).toEqual(['blur(12px)', 'blur(12px)', 'blur(2.5px)'])
  })

  it('draws the towers sharp, over the clouds', () => {
    const r = painted()
    expect(towers(r).every((f) => f.filter === 'none' && f.alpha === 1)).toBe(true)
    expect(r.fills.findIndex((f) => f.color === '#skyline')).toBeGreaterThan(
      r.fills.findLastIndex((f) => f.color === '#sky-shadow'),
    )
  })

  it('cuts the towers out along the foot, across the whole width, none above the tallest', () => {
    const drawn = points(painted())
    const ys = drawn.map(([, y]) => y)
    const xs = drawn.map(([x]) => x)
    expect(Math.max(...ys)).toBe(440)
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(440 - 140)
    expect(Math.min(...ys)).toBeLessThan(440 - 100)
    expect(Math.min(...xs)).toBeLessThanOrEqual(0)
    expect(Math.max(...xs)).toBeGreaterThanOrEqual(320)
  })

  it('lights a few windows in the towers, faintly', () => {
    const windows = painted().boxes.filter((b) => b.color === '#window')
    expect(windows).toHaveLength(12)
    for (const w of windows) {
      expect(w.alpha).toBe(0.35)
      expect(w.y).toBeGreaterThanOrEqual(440 - 140)
      expect(w.y + w.h).toBeLessThanOrEqual(440)
    }
  })

  it("lays a mist over the towers' foot, rising from the bottom", () => {
    const mist = painted().boxes.filter((b) => b.color === '#mist')
    // In thin bands from 36px up down to the bottom, the whole width, stronger as they near it.
    expect(mist[0]!.y).toBe(440 - 36)
    expect(mist.at(-1)!.y + mist.at(-1)!.h).toBe(440)
    expect(mist.every((b) => b.x === 0 && b.w === 320)).toBe(true)
    const alphas = mist.map((b) => b.alpha)
    expect(alphas).toEqual([...alphas].sort((a, b) => a - b))
    expect(alphas.at(-1)).toBeLessThanOrEqual(0.55)
    expect(alphas[0]).toBeLessThan(0.1)
  })

  // A fixed city: the same towers after a resize or new colors, as the backdrop is painted afresh.
  it('draws the same city after a resize and after new colors', () => {
    const painter = backdropFor(SKYLINE)
    painter.recolor(namedColor)
    painter.resize(320, 440)
    const first = recorder()
    painter.paint(first.ctx, 0)
    painter.resize(400, 500)
    painter.resize(320, 440)
    painter.recolor(namedColor)
    const again = recorder()
    painter.paint(again.ctx, 0)
    expect(points(again)).toEqual(points(first))
  })

  it('keeps its towers to the foot of a taller panel', () => {
    const ys = points(painted(320, 600)).map(([, y]) => y)
    expect(Math.max(...ys)).toBe(600)
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(600 - 140)
  })

  // The lit band sits just above the towers whatever the panel's height: on a taller panel, the
  // black top grows, and nothing lit rises to where the cards' text sits (section 2.5's ceiling).
  it('keeps its bands as high above the foot on a taller panel', () => {
    const [sky] = painted(320, 600).boxes
    expect(sky).toMatchObject({ x: 0, y: 0, w: 320, h: 600 })
    expect(sky!.color).toMatchObject({
      x0: 0,
      y0: 600 - 440,
      x1: 0,
      y1: 600,
      stops: [
        [0, '#sky-top'],
        [0.45, '#sky'],
        [0.9, '#sky-lit'],
      ],
    })
  })

  // A variable the page doesn't set reads as '', which a gradient refuses with a throw.
  it.each(['--sky-lit', '--mist'])('paints nothing, and does not throw, while %s is missing', (missing) => {
    const painter = backdropFor(SKYLINE)
    painter.recolor((variable) => (variable === missing ? '' : namedColor(variable)))
    painter.resize(320, 440)
    const r = recorder()
    expect(() => painter.paint(r.ctx, 0)).not.toThrow()
    expect([...r.boxes, ...r.fills]).toHaveLength(0)
  })

  it('keeps every lit window on the panel, however wide it is', () => {
    for (let width = 260; width <= 480; width += 7) {
      const windows = painted(width).boxes.filter((b) => b.color === '#window')
      expect(windows).toHaveLength(12)
      for (const w of windows) {
        expect(w.x).toBeGreaterThanOrEqual(0)
        expect(w.x + w.w).toBeLessThanOrEqual(width)
      }
    }
  })

  // In its own color at a rising strength, not a gradient from transparent black, which a canvas
  // mixes in and greys the middle of the band.
  it('fades its mist in its own color', () => {
    const mist = painted().boxes.slice(-6)
    expect(mist.every((b) => b.color === '#mist')).toBe(true)
  })

  it('paints nothing before it has a size, and does not throw', () => {
    const painter = backdropFor(SKYLINE)
    painter.recolor(namedColor)
    const r = recorder()
    expect(() => painter.paint(r.ctx, 0)).not.toThrow()
    expect([...r.boxes, ...r.fills]).toHaveLength(0)
  })
})

// DARK DECO's police blimps (dark-deco-build.md, section 2.3): black hulls hovering over the red
// sky (two here; the storyboard has three), each with two beams under its nose, leaning out and
// swaying a little, never sweeping; drifting so slowly that they hover, and on whole ticks only.
describe('the blimps', () => {
  const blimps = (atmosphere = BLIMPS) => {
    const painter = painterFor(atmosphere, seeded())
    painter.recolor(namedColor)
    painter.resize(320, 440)
    return painter
  }
  type Frame = ReturnType<typeof recorder>
  const hulls = (r: Frame) => r.fills.filter((f) => f.color === '#blimp').flatMap((f) => f.discs)
  const beams = (r: Frame) => r.fills.filter((f) => f.color === '#beam' && f.shapes.length)
  /** A beam's lean from straight down, in radians (out to the right is positive): its axis to its far edge's middle. */
  const lean = ([nose, left, right]: Shape) =>
    Math.atan2((left![0] + right![0]) / 2 - nose![0], (left![1] + right![1]) / 2 - nose![1])
  const { splay, sway, reach } = BLIMPS.beams

  it('cuts each blimp out in its color, where it hovers, as long as it is', () => {
    const [first] = framesOver(blimps(), 0)
    const [big, small] = hulls(first)
    expect(big!.x).toBeCloseTo(0.7 * 320)
    expect(big!.y).toBeCloseTo(0.25 * 440)
    expect(big!.r).toBeCloseTo(14)
    expect(small!.x).toBeCloseTo(0.2 * 320)
    expect(small!.y).toBeCloseTo(0.45 * 440)
    expect(small!.r).toBeCloseTo(9)
  })

  it('hangs two beams from under each, in their color and strength, behind the hull', () => {
    const [first] = framesOver(blimps(), 0)
    const drawn = beams(first)
    expect(drawn.flatMap((f) => f.shapes)).toHaveLength(4)
    expect(drawn.every((f) => f.alpha === 0.07)).toBe(true)
    expect(first.fills.findIndex((f) => f.color === '#beam')).toBeLessThan(
      first.fills.findIndex((f) => f.color === '#blimp'),
    )
  })

  it('reaches its beams down as far as asked, leaning out either way within their sway', () => {
    for (const frame of framesOver(blimps(), 80)) {
      const shapes = beams(frame).flatMap((f) => f.shapes)
      const leans = shapes.map(lean)
      // One out to each side, each within its splay and sway.
      for (const pair of [leans.slice(0, 2), leans.slice(2, 4)]) {
        expect(pair.map(Math.sign).sort()).toEqual([-1, 1])
        for (const l of pair) expect(Math.abs(Math.abs(l) - splay)).toBeLessThanOrEqual(sway + 1e-9)
      }
      const [nose, edge] = shapes[0]!
      const length = BLIMPS.fleet[0]!.length
      expect(Math.hypot(edge![0] - nose![0], edge![1] - nose![1])).toBeCloseTo(reach * length)
    }
  })

  it('sways its beams over their period, rather than holding them', () => {
    const frames = framesOver(blimps(), BLIMPS.beams.period * FPS)
    const leans = frames.map((f) => lean(beams(f)[0]!.shapes[0]!))
    expect(Math.max(...leans) - Math.min(...leans)).toBeCloseTo(2 * sway, 2)
  })

  // The opening's far blimps light two lamps apart, their beams leaning in to cross in an M [17].
  it("crosses a blimp's beams when they lean in from two lamps apart", () => {
    const crossing: BlimpsAtmosphere = {
      ...BLIMPS,
      fleet: [{ length: 28, at: 0.25, from: 0.5, drift: 0, splay: -0.15 }],
      beams: { ...BLIMPS.beams, apart: 0.3 },
    }
    const [first] = framesOver(blimps(crossing), 0)
    const [a, b] = beams(first).flatMap((f) => f.shapes) as [Shape, Shape]
    const foot = (shape: Shape) => (shape[1]![0] + shape[2]![0]) / 2
    // The beams start apart and end on the other's side.
    expect(Math.sign(a[0]![0] - b[0]![0])).toBe(-Math.sign(foot(a) - foot(b)))
  })

  it("doesn't sway every blimp's beams in step", () => {
    const leansOf = (f: Frame) =>
      beams(f)
        .flatMap((g) => g.shapes)
        .map(lean)
    const frames = framesOver(blimps(), 8)
    const first = frames.map((f) => leansOf(f)[0]!)
    const third = frames.map((f) => leansOf(f)[2]!)
    const moved = (xs: number[]) => xs.map((x, i) => (i ? Math.sign(x - xs[i - 1]!) : 0))
    expect(moved(first)).not.toEqual(moved(third))
  })

  it('draws no beams while their color is missing, rather than in the hull', () => {
    const painter = painterFor(BLIMPS, seeded())
    painter.recolor((variable) => (variable === '--beam' ? '' : namedColor(variable)))
    painter.resize(320, 440)
    const [first, next] = framesOver(painter, 1)
    for (const frame of [first, next!]) {
      expect(frame.fills.filter((f) => f.alpha === BLIMPS.beams.alpha)).toHaveLength(0)
      expect(hulls(frame)).toHaveLength(2)
    }
  })

  it('drifts at its pace on whole ticks only', () => {
    const [first, half, whole] = framesOver(blimps(), 2, 1 / FPS / 2)
    expect(hulls(half!)[0]!.x).toBeCloseTo(hulls(first)[0]!.x)
    expect(hulls(whole!)[0]!.x).toBeCloseTo(hulls(first)[0]!.x + 0.5)
    expect(hulls(whole!)[1]!.x).toBeCloseTo(hulls(first)[1]!.x - 0.25)
  })

  // Wholly past a side, hull and beams, it comes back in from the other.
  it('comes back in from the other side once wholly past it', () => {
    const fast: BlimpsAtmosphere = { ...BLIMPS, fleet: [{ length: 28, at: 0.25, from: 0.9, drift: 9 }] }
    const xs = framesOver(blimps(fast), 60).map((f) => hulls(f)[0]!.x)
    const back = xs.findIndex((x, i) => i > 0 && x < xs[i - 1]!)
    expect(back).toBeGreaterThan(0)
    expect(xs[back - 1]!).toBeGreaterThan(320 + 14)
    expect(xs[back]!).toBeLessThan(-14)
  })
})
