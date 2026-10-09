import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
// The shared animation clock listens to the page's visibility as it loads; a hidden page keeps it stopped.
vi.hoisted(() => {
  Object.assign(globalThis, { document: { hidden: true, addEventListener: () => {} } })
})

import { BatClawd } from '../src/renderer/src/components/BatClawd'
import { BatEmblem, WINGS } from '../src/renderer/src/components/BatEmblem'

const chest = (markup: string) => markup.includes(`class="clawd__emblem"`) && markup.includes(`d="${WINGS}"`)

describe('Bat-Clawd', () => {
  it('wears the bat on his chest whenever it shows', () => {
    expect(chest(renderToStaticMarkup(createElement(BatClawd, { mood: 'flying' })))).toBe(true)
    expect(chest(renderToStaticMarkup(createElement(BatClawd, { mood: 'alarmed' })))).toBe(true)
    expect(chest(renderToStaticMarkup(createElement(BatClawd, { mood: 'sleeping', perched: true })))).toBe(
      true,
    )
  })

  it('hides it asleep, under the wrapped cape', () => {
    expect(renderToStaticMarkup(createElement(BatClawd, { mood: 'sleeping' }))).not.toContain('clawd__emblem')
  })
})

describe('BatEmblem', () => {
  it('draws in a box that hugs the bat, so its size is the size of the bat', () => {
    const [x, y, w, h] = renderToStaticMarkup(createElement(BatEmblem))
      .match(/viewBox="([^"]+)"/)![1]
      .split(' ')
      .map(Number)
    const points = [...WINGS.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])])
    const xs = points.map((p) => p[0])
    const ys = points.map((p) => p[1])
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
