import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CalmContext } from '../../src/renderer/src/calm'
import { Atmosphere, isShown } from '../../src/renderer/src/components/Atmosphere'
import type { AshAtmosphere, LitWindowsAtmosphere, SmokeAtmosphere } from '../../src/shared/atmospheres'
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

  // The haze, the grain and a Theme's decor (SILENT PREDATOR's stains and fence) are still: they stay
  // whether the Atmosphere moves or not.
  it('keeps the haze, the grain and the decor either way', () => {
    const off = draw(false)
    expect(off).toContain('atmosphere__glow')
    expect(off).toContain('atmosphere__grain')
    expect(off).toContain('atmosphere__decor')
    expect(draw(true, true)).toContain('atmosphere__decor')
  })

  // A Theme's failing light (SILENT PREDATOR's) dims the scene now and then: only while it moves, never
  // under reduced motion or while it is off, so a window parked in a corner never pays for it.
  it('lets its light fail only while it moves', () => {
    expect(draw(true)).toContain('atmosphere__flicker')
    expect(draw(true, true)).not.toContain('atmosphere__flicker')
    expect(draw(false)).not.toContain('atmosphere__flicker')
  })
})

describe('a still Atmosphere', () => {
  standInTheme({
    atmosphere: {
      kind: 'lit-windows',
      glass: '--smoke',
      edge: '--line',
      tallest: 0.2,
      towers: 4,
      litShare: 0.08,
      lights: [{ color: '--bone', share: 1, alpha: 0.2 }],
      switchEvery: 1,
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

// The Knightmare's ash leaves with its motion as rain does, but under reduced motion it stands as
// one frozen frame (snyder.md, section 9).
describe('an Atmosphere frozen under reduced motion', () => {
  standInTheme({
    atmosphere: {
      kind: 'ash',
      color: '--ash',
      dust: { color: '--bone', share: 0.25 },
      density: 0.08,
      depths: [{ alpha: 0.2, size: 1, wind: 3, fall: 1 }],
      still: 'calm',
    } satisfies AshAtmosphere,
  })

  it('stays under reduced motion, frozen', () => {
    expect(draw(true, true)).toContain('atmosphere__canvas')
  })
})

// Once it stops moving (the pointer gone, or reduced motion), what each kind does.
describe('an Atmosphere at rest', () => {
  const rest = { on: true, moving: false }

  it('leaves, rain or snow', () => {
    expect(isShown(undefined, { ...rest, calm: false })).toBe(false)
    expect(isShown(undefined, { ...rest, calm: true })).toBe(false)
  })

  it('stays, a still scene', () => {
    expect(isShown(true, { ...rest, calm: false })).toBe(true)
    expect(isShown(true, { ...rest, calm: true })).toBe(true)
  })

  it('stays under reduced motion only, the ash', () => {
    expect(isShown('calm', { ...rest, calm: true })).toBe(true)
    expect(isShown('calm', { ...rest, calm: false })).toBe(false)
  })

  it('is never on the page while it is off', () => {
    expect(isShown(true, { on: false, moving: false, calm: true })).toBe(false)
  })
})

// A still drawing behind the motion (HOLIDAY's moon behind its fog): it stays whenever the
// Atmosphere is on, moving or not, under reduced motion too, since nothing in it moves.
describe('an Atmosphere with a backdrop', () => {
  standInTheme({
    atmosphere: {
      kind: 'smoke',
      color: '--smoke',
      puffs: 3,
      size: [40, 80],
      alpha: 0.1,
      rise: 0.1,
      life: 30,
      sway: 0,
      wind: 2,
      aspect: 0.3,
      backdrop: { kind: 'moon', color: '--bone', alpha: 0.2, at: [0.75, 80], radius: 30 },
    } satisfies SmokeAtmosphere,
  })

  it('paints its backdrop under the motion while it is on', () => {
    const page = draw(true)
    expect(page).toContain('atmosphere__backdrop')
    expect(page.indexOf('atmosphere__backdrop')).toBeLessThan(page.indexOf('atmosphere__layer'))
  })

  it('keeps its backdrop under reduced motion, when the fog has left', () => {
    const page = draw(true, true)
    expect(page).toContain('atmosphere__backdrop')
    expect(page).not.toContain('atmosphere__layer')
  })

  it('takes its backdrop away when it is off', () => {
    expect(draw(false)).not.toContain('atmosphere__backdrop')
  })
})
