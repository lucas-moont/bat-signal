import { describe, expect, it } from 'vitest'
import { FPS } from '../../src/renderer/src/clockRate'
import { painterFor } from '../../src/renderer/src/painters'
import { VENGEANCE_RAIN, type SnowAtmosphere } from '../../src/shared/atmospheres'

type Segment = { x0: number; y0: number; x1: number; y1: number }

type Square = { x: number; y: number; size: number }

/**
 * A canvas context that records what it is asked to draw: one list of segments per stroke() (the
 * rain), and one list of squares per fill() (the snow).
 */
function recorder() {
  const strokes: { alpha: number; segments: Segment[] }[] = []
  const fills: { alpha: number; rects: Square[] }[] = []
  let segments: Segment[] = []
  let rects: Square[] = []
  let from = { x: 0, y: 0 }
  const ctx = {
    globalAlpha: 1,
    clearRect: () => undefined,
    beginPath: () => ([segments, rects] = [[], []]),
    moveTo: (x: number, y: number) => (from = { x, y }),
    lineTo: (x: number, y: number) => segments.push({ x0: from.x, y0: from.y, x1: x, y1: y }),
    stroke: () => strokes.push({ alpha: ctx.globalAlpha, segments }),
    rect: (x: number, y: number, size: number) => rects.push({ x, y, size }),
    fill: () => fills.push({ alpha: ctx.globalAlpha, rects }),
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes, fills }
}

/** The same "random" numbers every run. */
function seeded(seed = 7) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

const length = (d: Segment) => Math.hypot(d.x0 - d.x1, d.y0 - d.y1)

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
  const ticks = (n: number, dt = 1 / FPS) => {
    const painter = snow()
    const first = recorder()
    painter.paint(first.ctx, 0)
    const after = Array.from({ length: n }, () => {
      const r = recorder()
      painter.paint(r.ctx, dt)
      return r.fills
    })
    return [first.fills, ...after]
  }

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

  it('keeps falling: a flake that leaves the bottom comes back above the top', () => {
    const last = ticks(600).at(-1)!
    const ys = last.flatMap((f) => f.rects.map((r) => r.y))
    expect(ys.length).toBe(FLAKES)
    expect(Math.min(...ys)).toBeGreaterThan(-10)
    expect(Math.max(...ys)).toBeLessThan(440 + 10)
  })
})
