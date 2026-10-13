import { describe, expect, it } from 'vitest'
import { FPS } from '../../src/renderer/src/clockRate'
import { painterFor } from '../../src/renderer/src/painters'
import {
  PALE_MOONLIGHT_SNOW,
  VENGEANCE_RAIN,
  type LitWindowsAtmosphere,
  type SnowAtmosphere,
} from '../../src/shared/atmospheres'

type Segment = { x0: number; y0: number; x1: number; y1: number }

type Square = { x: number; y: number; size: number }

type Box = { x: number; y: number; w: number; h: number; color: string; alpha: number }

/**
 * A canvas context that records what it is asked to draw, in which color and strength: one list of
 * segments per stroke() (the rain), one list of squares per fill() (the snow), and each box filled
 * or outlined on its own (the lit windows), and how often it is cleared.
 */
function recorder() {
  const strokes: { alpha: number; color: string; segments: Segment[] }[] = []
  const fills: { alpha: number; color: string; rects: Square[] }[] = []
  const boxes: Box[] = []
  const outlines: Box[] = []
  const cleared = { times: 0 }
  let segments: Segment[] = []
  let rects: Square[] = []
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
    beginPath: () => ([segments, rects] = [[], []]),
    moveTo: (x: number, y: number) => (from = { x, y }),
    lineTo: (x: number, y: number) => segments.push({ x0: from.x, y0: from.y, x1: x, y1: y }),
    stroke: () => strokes.push({ alpha: ctx.globalAlpha, color: ctx.strokeStyle, segments }),
    rect: (x: number, y: number, size: number) => rects.push({ x, y, size }),
    fill: () => fills.push({ alpha: ctx.globalAlpha, color: ctx.fillStyle, rects }),
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, strokes, fills, boxes, outlines, cleared }
}

/** The same "random" numbers every run. */
function seeded(seed = 7) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

const length = (d: Segment) => Math.hypot(d.x0 - d.x1, d.y0 - d.y1)

// The page hands a painter its colors as the canvas mounts, and paints at once so a still scene
// shows them: that can come before the canvas has a size. PALE MOONLIGHT's snow threw there, and the
// whole panel went blank.
describe('a painter given its colors before its size', () => {
  it.each([VENGEANCE_RAIN, PALE_MOONLIGHT_SNOW])(
    'paints nothing, and does not throw ($kind)',
    (atmosphere) => {
      const painter = painterFor(atmosphere, seeded())
      painter.recolor(() => '#ffffff')
      const { ctx, strokes, fills } = recorder()
      expect(() => painter.paint(ctx, 0)).not.toThrow()
      expect(strokes.flatMap((s) => s.segments).length + fills.flatMap((f) => f.rects).length).toBe(0)
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
  const ticks = (n: number) => {
    const painter = city()
    const first = recorder()
    painter.paint(first.ctx, 0)
    const after = Array.from({ length: n }, () => {
      const r = recorder()
      painter.paint(r.ctx, 1 / FPS)
      return r
    })
    return [first, ...after] as const
  }

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
