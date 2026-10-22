import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { batAt, BatEmblem, OUTLINE_SHARE } from '../../src/renderer/src/components/BatEmblem'
import { strokesOf } from '../../src/renderer/src/scribble'
import { emblem, WINGS } from '../../src/shared/emblems'
import { standInTheme } from '../fixtures/themes'

const draw = (props: Parameters<typeof BatEmblem>[0] = {}) =>
  renderToStaticMarkup(createElement(BatEmblem, props))

describe('an emblem without a plate (VENGEANCE)', () => {
  it('draws only its bat, in the Theme variable for it', () => {
    const markup = draw()
    expect(markup).not.toContain('<ellipse')
    expect(markup).toContain('fill="var(--emblem)"')
  })
})

// KNIGHTMARE's lit disc burns its bat red on a pale lens, which alone holds 2.6–3.2:1: an outline
// under the fill keeps its shape (snyder.md, section 8).
describe("an emblem's outline", () => {
  // Behind the bat, outside a worn bat's filter, which would clip it at the tips and streak it.
  it('outlines the bat behind its fill, in the color given, a share of its width', () => {
    const markup = draw({ outline: 'var(--lens-bat-edge)' })
    const width = emblem(WINGS, 'none').bat.width * OUTLINE_SHARE
    const outline = `fill="none" stroke="var(--lens-bat-edge)" stroke-width="${width}"`
    expect(markup).toContain(outline)
    // Drawn first, so the fill lies over it.
    expect(markup.indexOf(outline)).toBeLessThan(markup.lastIndexOf('<path'))
  })

  it('draws none unless given one', () => {
    expect(draw()).not.toContain('stroke=')
  })
})

// PALE MOONLIGHT's bat sits in an oval (burton-1989.md, section 8): old brass at rest, lit gold.
describe('an emblem on a plate', () => {
  const PLATE = { box: { x: 18, y: 0, width: 84, height: 48 }, rim: 2 }
  standInTheme({ emblem: emblem(WINGS, 'none', PLATE) })

  it('draws the plate behind the bat, an oval in its box', () => {
    const markup = draw()
    expect(markup).toMatch(
      /<ellipse class="emblem__plate" cx="60" cy="24" rx="41" ry="23"[^>]*><\/ellipse><path/,
    )
  })

  // The size a place gives is the plate's, with a unit of air, not the bat's inside it.
  it('frames the plate, not only the bat', () => {
    expect(draw()).toContain('viewBox="17 -1 86 50"')
  })

  it('stays unlit at rest, in the Theme variable for it', () => {
    const markup = draw()
    expect(markup).not.toContain('<radialGradient')
    expect(markup).toContain('fill="var(--emblem-plate)" stroke="var(--emblem-plate-rim)"')
  })

  // Lit, it glows from a gradient of the Theme's Alarm color; each drawing with an id of its own,
  // since the header, the intro and the disc can show at once.
  it('lights from a gradient of its own when lit', () => {
    const markup = renderToStaticMarkup(
      createElement(
        'div',
        null,
        createElement(BatEmblem, { lit: true }),
        createElement(BatEmblem, { lit: true }),
      ),
    )
    const ids = [...markup.matchAll(/<radialGradient id="([^"]+)"/g)].map((m) => m[1])
    const uses = [...markup.matchAll(/class="emblem__plate"[^>]*fill="url\(#([^)]+)\)"/g)].map((m) => m[1])
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(uses).toEqual(ids)
  })
})

describe("VENGEANCE's emblem", () => {
  it('wears scratches that dim the bat by 37.5%, never cutting through it', () => {
    const markup = renderToStaticMarkup(createElement(BatEmblem))
    const soft = markup.match(
      /<feComponentTransfer in="mask" result="([^"]+)"><feFuncA type="linear" slope="([^"]+)" intercept="([^"]+)"/,
    )
    expect(soft).not.toBeNull()
    const [, result, slope, intercept] = soft ?? []
    // A scratch takes the mask to 0; the floor keeps 62.5% of the bat there, and all of it elsewhere.
    expect([Number(slope), Number(intercept)]).toEqual([0.375, 0.625])
    // One composite, keeping the bat where the floored mask is: the raw, holed mask is not used.
    const composites = [...markup.matchAll(/<feComposite ([^>]*?)\/?>/g)].map((m) => m[1])
    expect(composites).toHaveLength(1)
    expect(composites[0]).toContain('in="SourceGraphic"')
    expect(composites[0]).toContain(`in2="${result}"`)
    expect(composites[0]).toContain('operator="in"')
  })

  it('gives every emblem its own wear filter, so none borrows another one', () => {
    const markup = renderToStaticMarkup(
      createElement('div', null, createElement(BatEmblem), createElement(BatEmblem)),
    )
    const ids = [...markup.matchAll(/<filter id="([^"]+)"/g)].map((m) => m[1])
    const uses = [...markup.matchAll(/filter="url\(#([^)]+)\)"/g)].map((m) => m[1])
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(uses).toEqual(ids)
  })

  it('draws in a box that hugs the bat, so its size is the size of the bat', () => {
    const box = renderToStaticMarkup(createElement(BatEmblem)).match(/viewBox="([^"]+)"/)?.[1] ?? ''
    const [x = NaN, y = NaN, w = NaN, h = NaN] = box.split(' ').map(Number)
    const points = [...WINGS.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => ({
      x: Number(m[1]),
      y: Number(m[2]),
    }))
    const xs = points.map((p) => p.x)
    const ys = points.map((p) => p.y)
    // Every point inside, and no more than 2 units of air on any side.
    expect(Math.min(...xs) - x).toBeGreaterThanOrEqual(0)
    expect(Math.min(...xs) - x).toBeLessThanOrEqual(2)
    expect(x + w - Math.max(...xs)).toBeGreaterThanOrEqual(0)
    expect(x + w - Math.max(...xs)).toBeLessThanOrEqual(2)
    expect(Math.min(...ys) - y).toBeGreaterThanOrEqual(0)
    expect(Math.min(...ys) - y).toBeLessThanOrEqual(2)
    expect(y + h - Math.max(...ys)).toBeGreaterThanOrEqual(0)
    expect(y + h - Math.max(...ys)).toBeLessThanOrEqual(2)
  })
})

// Bat-Clawd's chest wears the Theme's own emblem, placed on his grid: centred where asked, as wide
// as asked, and as tall as its shape makes it, or as a suit asks (BLUE COLLAR's slab).
describe('a bat on his chest', () => {
  const bat = emblem(WINGS, 'none')
  /** Where the transform puts the bat's box: its left, top, width and height. */
  const placed = (transform: string) => {
    const [tx = NaN, ty = NaN] = /translate\(([-\d.e]+) ([-\d.e]+)\)/.exec(transform)!.slice(1).map(Number)
    const [kx = NaN, ky = NaN] = /scale\(([-\d.e]+) ([-\d.e]+)\)/.exec(transform)!.slice(1).map(Number)
    const { x, y, width, height } = bat.bat
    return { x: tx + x * kx, y: ty + y * ky, w: width * kx, h: height * ky }
  }

  it('takes the height a suit asks for, still centred', () => {
    const box = placed(batAt(bat, 8, 6.6, 8, 3))
    expect(box.w).toBeCloseTo(8)
    expect(box.h).toBeCloseTo(3)
    expect(box.x + box.w / 2).toBeCloseTo(8)
    expect(box.y + box.h / 2).toBeCloseTo(6.6)
  })

  it('keeps its shape, centred and as wide as asked', () => {
    const box = placed(batAt(bat, 8, 7, 7))
    expect(box.w).toBeCloseTo(7)
    expect(box.h).toBeCloseTo((7 * bat.bat.height) / bat.bat.width)
    expect(box.x + box.w / 2).toBeCloseTo(8)
    expect(box.y + box.h / 2).toBeCloseTo(7)
  })
})

// SERIOUS HOUSE's bat is a pencil's scribble, the bat on the book's opening page (#123,
// arkham-horror-references.md): up-and-down strokes and crossing scratches, no fill under them and
// no outline round them, from a hand that aims at the bat's edge and misses it, pressing harder on
// the head and on one wing than on the other.
describe('a scribbled emblem', () => {
  const worn = emblem(WINGS, 'scribble')
  standInTheme({ emblem: worn })
  const { bat } = worn
  const strokes = (markup: string) =>
    [...markup.matchAll(/<polyline points="([^"]+)" stroke-width="([^"]+)" opacity="([^"]+)"/g)].map((m) => ({
      points: m[1]!.split(' ').map((p) => p.split(',').map(Number) as [number, number]),
      width: Number(m[2]),
      opacity: Number(m[3]),
    }))
  // The outline's corners, and how far a point lies outside it (0 inside).
  const corners = [...WINGS.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m): [number, number] => [
    Number(m[1]),
    Number(m[2]),
  ])
  const edges = corners.map((a, i) => [a, corners[(i + 1) % corners.length]!] as const)
  const outside = ([x, y]: [number, number]) => {
    const inside = edges.reduce(
      (odd, [[ax, ay], [bx, by]]) =>
        ay > y !== by > y && x < ax + ((y - ay) * (bx - ax)) / (by - ay) ? !odd : odd,
      false,
    )
    if (inside) return 0
    return Math.min(
      ...edges.map(([[ax, ay], [bx, by]]) => {
        const t = Math.max(
          0,
          Math.min(1, ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)),
        )
        return Math.hypot(x - ax - t * (bx - ax), y - ay - t * (by - ay))
      }),
    )
  }

  it('draws no solid bat, no outline and nothing to cut it, only strokes in its color', () => {
    const markup = draw()
    expect(markup).not.toContain('fill="var(--emblem)"')
    expect(markup).not.toContain('<mask')
    expect(markup).not.toContain('<filter')
    expect(markup).toContain('<g fill="none" stroke="var(--emblem)"')
    expect(strokes(markup).length).toBeGreaterThan(20)
  })

  it('draws no outline even where a place asks for one (the lit lens)', () => {
    expect(draw({ outline: 'var(--lens-bat-edge)' })).not.toContain('var(--lens-bat-edge)')
  })

  // Worked out twice, on two copies of the emblem, so neither is the other's kept strokes.
  it('scribbles the same way every time it is drawn', () => {
    expect(strokesOf({ ...worn })).toEqual(strokesOf({ ...worn }))
    expect(draw()).toBe(draw())
  })

  // A sweep from one end of the bat to the other, so no wingtip is left bare.
  it('covers the bat from end to end', () => {
    const xs = strokes(draw()).flatMap((s) => s.points.map(([x]) => x))
    expect(Math.min(...xs)).toBeLessThanOrEqual(bat.x + bat.width * 0.02)
    expect(Math.max(...xs)).toBeGreaterThanOrEqual(bat.x + bat.width * 0.98)
  })

  // Aimed at the edge, most turns land near it; some well past it, and none far from the bat.
  it('misses the edge now and then, and never strays far from the bat', () => {
    const away = strokes(draw()).flatMap((s) => s.points.map(outside))
    const past = away.filter((d) => d > bat.width * 0.02).length / away.length
    expect(past).toBeGreaterThan(0.03)
    expect(past).toBeLessThan(0.4)
    expect(Math.max(...away)).toBeLessThan(bat.width * 0.12)
  })

  // The book's bat is darkest at the head: the hand presses harder there than on the far wingtip.
  it('presses harder on the head than on the right wingtip', () => {
    const across = (s: { points: [number, number][] }) =>
      (s.points.reduce((sum, [x]) => sum + x, 0) / s.points.length - bat.x) / bat.width
    const all = strokes(draw())
    const head = all.filter((s) => Math.abs(across(s) - 0.5) < 0.06)
    const tip = all.filter((s) => across(s) > 0.92)
    const ink = (some: typeof all) => some.reduce((sum, s) => sum + s.opacity * s.width, 0)
    expect(head.length).toBeGreaterThan(tip.length)
    expect(ink(head) / head.length).toBeGreaterThan(ink(tip) / tip.length)
  })

  // SVG fills an outline as closed whether or not it ends in Z: so does the pencil.
  it('scribbles an outline left open as it would the closed one', () => {
    const open = 'M20 20 L100 20 L100 40 L20 40'
    expect(strokesOf(emblem(open, 'scribble'))).toEqual(strokesOf(emblem(`${open} Z`, 'scribble')))
  })

  // A command it can't follow would be dropped and the strokes aimed at the wrong edge: it says so.
  it("refuses an outline it can't follow", () => {
    expect(() => strokesOf(emblem('M0 0 H10 L10 10 Z', 'scribble'))).toThrow(/H is not/)
  })

  // Small on the disc, a fine stroke would fade to a smudge: none goes under half a pixel.
  it('keeps every stroke at least half a pixel wide, however small the bat is drawn', () => {
    for (const size of [28, 44, 120]) {
      const markup = draw({ size })
      const box = markup.match(/viewBox="[^ ]+ [^ ]+ ([^ ]+) /)?.[1]
      const px = Number(box) / size
      for (const { width } of strokes(markup)) expect(width).toBeGreaterThanOrEqual(px * 0.5 - 1e-9)
    }
  })
})
