import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { BatEmblem } from '../../src/renderer/src/components/BatEmblem'
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
  it('outlines the bat under its fill, in the color given, a share of its width', () => {
    const markup = draw({ outline: 'var(--lens-bat-edge)' })
    expect(markup).toMatch(/<path [^>]*stroke="var\(--lens-bat-edge\)"/)
    expect(markup).toMatch(/paint-order="stroke"/)
    expect(markup).toMatch(new RegExp(`stroke-width="${emblem(WINGS, 'none').bat.width * 0.035}"`))
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
