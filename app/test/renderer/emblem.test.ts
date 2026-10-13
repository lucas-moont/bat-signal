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

  it('stays unlit at rest', () => {
    expect(draw()).not.toContain('<radialGradient')
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
    const uses = [
      ...markup.matchAll(/class="emblem__plate emblem__plate--lit"[^>]*fill="url\(#([^)]+)\)"/g),
    ].map((m) => m[1])
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(uses).toEqual(ids)
  })
})
