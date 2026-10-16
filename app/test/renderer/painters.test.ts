import { describe, expect, it } from 'vitest'
import { FPS } from '../../src/renderer/src/clockRate'
import { painterFor, type Painter } from '../../src/renderer/src/painters'
import { batOutline, type Wings } from '../../src/shared/bats'
import {
  PALE_MOONLIGHT_SNOW,
  VENGEANCE_RAIN,
  type LitWindowsAtmosphere,
  type AshAtmosphere,
  type NoiseAtmosphere,
  type SmokeAtmosphere,
  type SnowAtmosphere,
} from '../../src/shared/atmospheres'

type Segment = { x0: number; y0: number; x1: number; y1: number }

type Square = { x: number; y: number; size: number }

type Box = { x: number; y: number; w: number; h: number; color: string; alpha: number }

type Disc = { x: number; y: number; r: number }

/** A shape drawn in straight lines: its points in order round its edge. */
type Shape = (readonly [number, number])[]

/**
 * A canvas context that records what it is asked to draw, in which color and strength: one list of
 * segments per stroke() (the rain), one list of squares, of discs and of shapes per fill() (the snow,
 * the smoke, the bats), and each box filled or outlined on its own (the lit windows), and how often
 * it is cleared.
 */
function recorder() {
  const strokes: { alpha: number; color: string; segments: Segment[] }[] = []
  const fills: { alpha: number; color: string; rects: Square[]; discs: Disc[]; shapes: Shape[] }[] = []
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
    fillStyle: '#000000',
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
    arc: (x: number, y: number, r: number) => discs.push({ x, y, r }),
    fill: () => fills.push({ alpha: ctx.globalAlpha, color: ctx.fillStyle, rects, discs, shapes }),
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes, fills, boxes, outlines, cleared }
}

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
  it.each([VENGEANCE_RAIN, PALE_MOONLIGHT_SNOW, ASH, COLONY, SMOKE, NOISE])(
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
