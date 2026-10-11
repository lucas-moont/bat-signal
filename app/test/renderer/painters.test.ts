import { describe, expect, it } from 'vitest'
import { painterFor } from '../../src/renderer/src/painters'
import { VENGEANCE_RAIN } from '../../src/shared/atmospheres'

/** A canvas context that records the strokes it is asked for, one list of segments per stroke(). */
function recorder() {
  const strokes: { alpha: number; segments: { x0: number; y0: number; x1: number; y1: number }[] }[] = []
  let path: { x0: number; y0: number; x1: number; y1: number }[] = []
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

/** One tick of the shared clock: 8 a second. */
const TICK = 1 / 8

describe('the rain', () => {
  const rain = () => {
    const painter = painterFor(VENGEANCE_RAIN, seeded())
    painter.resize(320, 440)
    return painter
  }

  it('fills the canvas with drops, as many as its density asks', () => {
    const { ctx, strokes } = recorder()
    rain().paint(ctx, 0)
    const drawn = strokes.reduce((n, s) => n + s.segments.length, 0)
    expect(drawn).toBe(Math.round(((320 * 440) / 1000) * VENGEANCE_RAIN.density))
  })

  // Each depth is one path, stroked once: a few strokes a tick, whatever the number of drops.
  it('strokes each depth once, in its own strength', () => {
    const { ctx, strokes } = recorder()
    rain().paint(ctx, TICK)
    expect(strokes.map((s) => s.alpha)).toEqual(VENGEANCE_RAIN.depths)
  })

  it('falls along the wind', () => {
    const painter = rain()
    const first = recorder()
    painter.paint(first.ctx, 0)
    const next = recorder()
    painter.paint(next.ctx, TICK)
    const [a, b] = [first.strokes[0]!.segments[0]!, next.strokes[0]!.segments[0]!]
    expect(b.y0).toBeGreaterThan(a.y0)
    expect((b.x0 - a.x0) / (b.y0 - a.y0)).toBeCloseTo(Math.tan(VENGEANCE_RAIN.angle))
  })

  // At 8 steps a second a drop falls further between ticks than it did at the old 15: a streak
  // too short for its step reads as dashes jumping, not rain falling. A quarter of the step, at
  // least, is the share the shortest streaks covered at 15.
  it('draws each streak long enough for the step it falls in a tick', () => {
    const painter = rain()
    const first = recorder()
    painter.paint(first.ctx, 0)
    const next = recorder()
    painter.paint(next.ctx, TICK)
    first.strokes.forEach((stroke, depth) =>
      stroke.segments.slice(0, 20).forEach((a, i) => {
        const b = next.strokes[depth]!.segments[i]!
        if (b.y0 < a.y0) return // came back above the top in between
        const streak = Math.hypot(a.x0 - a.x1, a.y0 - a.y1)
        const step = Math.hypot(b.x0 - a.x0, b.y0 - a.y0)
        expect(streak / step).toBeGreaterThan(0.25)
      }),
    )
  })

  it('keeps falling: a drop that leaves the bottom comes back above the top', () => {
    const painter = rain()
    for (let i = 0; i < 200; i++) painter.paint(recorder().ctx, TICK)
    const { ctx, strokes } = recorder()
    painter.paint(ctx, TICK)
    const ys = strokes.flatMap((s) => s.segments.map((d) => d.y0))
    expect(ys.length).toBe(Math.round(((320 * 440) / 1000) * VENGEANCE_RAIN.density))
    expect(Math.min(...ys)).toBeGreaterThan(-100)
    expect(Math.max(...ys)).toBeLessThan(440 + 100)
  })
})
