import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, describe, expect, it, vi } from 'vitest'
// The shared animation clock listens to the page's visibility as it loads; a hidden page keeps it stopped.
vi.hoisted(() => vi.stubGlobal('document', { hidden: true, addEventListener: () => {} }))
afterAll(() => vi.unstubAllGlobals())

// A Theme in the jury's style stands in for VENGEANCE: a homage in place of a pose, and a
// Signature pose in three ticks, each pose told apart in the markup by a path no real suit draws.
vi.mock('../../src/shared/themes', async (real) => {
  const themes = (await real()) as typeof import('../../src/shared/themes')
  const { VENGEANCE_SUIT } = await import('../../src/shared/suits')
  const marked = (mark: string) => ({
    ...VENGEANCE_SUIT.poses.flying[0],
    behind: [{ kind: 'path' as const, d: `M0 0 L${mark} 0 Z`, className: 'clawd__cape' }],
  })
  const suit = {
    ...VENGEANCE_SUIT,
    poses: { ...VENGEANCE_SUIT.poses, sleeping: [marked('1.11')] as const },
    signature: { steps: ['2.22', '3.33', '4.44'].map((mark) => ({ pose: marked(mark), look: 0 })) },
  }
  return { ...themes, THEMES: { 'the-batman-2022': { ...themes.THEMES['the-batman-2022'], suit } } }
})

import { CalmContext } from '../../src/renderer/src/calm'
import { BatClawd } from '../../src/renderer/src/components/BatClawd'
import { BatSignalIntro } from '../../src/renderer/src/components/BatSignalIntro'
import { scriptAt } from '../../src/shared/suits'
import { THEMES } from '../../src/shared/themes'

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

  it('shows in its final frame on the perch under reduced motion', () => {
    expect(draw({ mood: 'sleeping', perched: true }, true)).toContain('M0 0 L4.44 0 Z')
  })

  it('opens the intro', () => {
    expect(renderToStaticMarkup(createElement(BatSignalIntro))).toContain('M0 0 L2.22 0 Z')
  })
})

describe('a script on the clock', () => {
  const steps = THEMES['the-batman-2022'].suit.signature!.steps

  it('plays its steps in order, then holds the last', () => {
    expect([0, 1, 2, 5].map((i) => scriptAt(steps, i, false))).toEqual([
      steps[0],
      steps[1],
      steps[2],
      steps[2],
    ])
  })

  it('is its final frame under reduced motion', () => {
    expect(scriptAt(steps, 0, true)).toBe(steps[2])
  })
})
