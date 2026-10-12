import { describe, expect, it } from 'vitest'
import { painterFor } from '../../src/renderer/src/painters'
import { VENGEANCE_RAIN } from '../../src/shared/atmospheres'

type Segment = { x0: number; y0: number; x1: number; y1: number }

/** A canvas context that records the strokes it is asked for, one list of segments per stroke(). */
function recorder() {
  const strokes: { alpha: number; segments: Segment[] }[] = []
  let path: Segment[] = []
  let from = { x: 0, y: 0 }
  const ctx = {
    globalAlpha: 1,
    clearRect: () => undefined,
    beginPath: () => (path = []),
    moveTo: (x: number, y: number) => (from = { x, y }),
    lineTo: (x: number, y: number) => path.push({ x0: from.x, y0: from.y, x1: x, y1: y }),
    stroke: () => strokes.push({ alpha: ctx.globalAlpha, segments: path }),
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes }
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
    painter.paint(first.ctx, false)
    painter.paint(next.ctx)
    return [first.strokes, next.strokes] as const
  }

  /** The rain after a while (200 ticks: drops have left the bottom and come back). */
  const later = () => {
    const painter = rain()
    for (let i = 0; i < 200; i++) painter.paint(recorder().ctx)
    const { ctx, strokes } = recorder()
    painter.paint(ctx)
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
      const longest = (8 + depth * 5 + 6) * (15 / 8)
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
