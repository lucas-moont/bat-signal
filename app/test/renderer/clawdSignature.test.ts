import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, describe, expect, it, vi } from 'vitest'
// The shared animation clock listens to the page's visibility as it loads; a hidden page keeps it stopped.
vi.hoisted(() => vi.stubGlobal('document', { hidden: true, addEventListener: () => {} }))
afterAll(() => vi.unstubAllGlobals())

import { CalmContext } from '../../src/renderer/src/calm'
import { BatClawd } from '../../src/renderer/src/components/BatClawd'
import { BatSignalIntro } from '../../src/renderer/src/components/BatSignalIntro'
import { VENGEANCE_SUIT, type Pose } from '../../src/shared/suits'
import { wearingTheme } from '../fixtures/themes'

/** A pose told apart in the markup by a path no real suit draws. */
const marked = (mark: string): Pose => ({
  ...VENGEANCE_SUIT.poses.flying[0],
  behind: [{ kind: 'path', d: `M0 0 L${mark} 0 Z`, className: 'clawd__cape' }],
})

// A Theme in the jury's style stands in for VENGEANCE: a homage in place of a pose, a Signature
// pose in three ticks, and an aura.
wearingTheme({
  suit: {
    ...VENGEANCE_SUIT,
    poses: { ...VENGEANCE_SUIT.poses, sleeping: [marked('1.11')] },
    signature: [
      { pose: marked('2.22'), look: 0 },
      { pose: marked('3.33'), look: 0 },
      { pose: marked('4.44'), look: 0 },
    ],
    aura: true,
  },
})

const draw = (props: Parameters<typeof BatClawd>[0], calm = false) =>
  renderToStaticMarkup(createElement(CalmContext, { value: calm }, createElement(BatClawd, props)))

describe("a Theme's poses", () => {
  it('may swap any pose for a homage', () => {
    expect(draw({ mood: 'sleeping' })).toContain('M0 0 L1.11 0 Z')
  })
})

describe("a Theme's Signature pose", () => {
  it('shows on the perch, in place of the watch', () => {
    expect(draw({ mood: 'sleeping', perched: true })).toContain('M0 0 L2.22 0 Z')
  })

  it('shows its final step on the perch under reduced motion', () => {
    expect(draw({ mood: 'sleeping', perched: true }, true)).toContain('M0 0 L4.44 0 Z')
  })

  // Something needs the user: the alarm's open cape and shiver win over any reveal.
  it('gives way to the alarm on the perch', () => {
    const alarmed = draw({ mood: 'alarmed', perched: true })
    expect(alarmed).not.toContain('M0 0 L2.22 0 Z')
    expect(alarmed).toContain('needs you')
  })

  it('opens the intro', () => {
    expect(renderToStaticMarkup(createElement(BatSignalIntro))).toContain('M0 0 L2.22 0 Z')
  })
})

describe("a Theme's aura", () => {
  // In the Alarm color, only while something needs the user (CONTEXT.md, Aura).
  it('glows while he is alarmed', () => {
    expect(draw({ mood: 'alarmed' })).toContain('clawd--aura')
  })

  // The other iconic moment the verdict names: a Signature pose being revealed, wherever.
  it('glows while he reveals his Signature pose on the perch', () => {
    expect(draw({ mood: 'sleeping', perched: true })).toContain('clawd--aura')
  })

  it('stays off at rest', () => {
    expect(draw({ mood: 'flying' })).not.toContain('clawd--aura')
    expect(draw({ mood: 'sleeping' })).not.toContain('clawd--aura')
  })
})
