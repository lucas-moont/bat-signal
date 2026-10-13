import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CalmContext } from '../../src/renderer/src/calm'
import { Atmosphere } from '../../src/renderer/src/components/Atmosphere'
import type { LitWindowsAtmosphere } from '../../src/shared/atmospheres'
import { standInTheme } from '../fixtures/themes'

const draw = (on: boolean, calm = false) =>
  renderToStaticMarkup(
    createElement(CalmContext, { value: calm }, createElement(Atmosphere, { on, activity: 0 })),
  )

describe('the Atmosphere', () => {
  // Off in the settings: no canvas, no painting.
  it('paints nothing while it is off', () => {
    expect(draw(false)).not.toContain('<canvas')
  })

  // Under reduced motion, rain or snow would stand frozen mid-fall: they leave instead.
  it('leaves under reduced motion', () => {
    expect(draw(true, true)).not.toContain('<canvas')
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

describe('a still Atmosphere', () => {
  standInTheme({
    atmosphere: {
      kind: 'lit-windows',
      colors: ['--smoke', '--line', '--bone'],
      height: 0.2,
      towers: 4,
      lit: 0.08,
      lights: [{ share: 1, alpha: 0.2 }],
      every: 1,
      still: true,
    } satisfies LitWindowsAtmosphere,
  })

  // A skyline is a scene, not a motion: under reduced motion it stays, frozen.
  it('stays under reduced motion', () => {
    expect(draw(true, true)).toContain('atmosphere__canvas')
  })

  it('still leaves when it is off', () => {
    expect(draw(false, true)).not.toContain('<canvas')
  })
})
