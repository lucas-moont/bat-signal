import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, describe, expect, it, vi } from 'vitest'
// The shared clock listens to the page's visibility as it loads; a hidden page keeps it stopped.
vi.hoisted(() => vi.stubGlobal('document', { hidden: true, addEventListener: () => {} }))
afterAll(() => vi.unstubAllGlobals())

import { Atmosphere } from '../../src/renderer/src/components/Atmosphere'

const draw = (on: boolean) => renderToStaticMarkup(createElement(Atmosphere, { on, activity: 0 }))

describe('the Atmosphere', () => {
  // Off in the settings, or under reduced motion (App passes both as `on`): no canvas, no painting.
  it('paints nothing while it is off', () => {
    expect(draw(false)).not.toContain('<canvas')
  })

  it('paints on its canvas while it is on', () => {
    expect(draw(true)).toContain('atmosphere__canvas')
  })

  // The haze and the grain are still: they stay whether the Atmosphere moves or not.
  it('keeps the haze and the grain either way', () => {
    const off = draw(false)
    expect(off).toContain('atmosphere__glow')
    expect(off).toContain('atmosphere__grain')
  })
})
