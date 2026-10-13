import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CalmContext } from '../../src/renderer/src/calm'
import { BatClawd } from '../../src/renderer/src/components/BatClawd'
import { BatSignalIntro } from '../../src/renderer/src/components/BatSignalIntro'
import { VENGEANCE_SUIT } from '../../src/shared/suits'
import { markedPose, standInTheme } from '../fixtures/themes'

// A Theme in the jury's style stands in for VENGEANCE: a homage in place of a pose, a Signature
// pose in three ticks, and an aura.
standInTheme({
  suit: {
    ...VENGEANCE_SUIT,
    poses: { ...VENGEANCE_SUIT.poses, sleeping: [markedPose('1.11')] },
    signature: [
      { pose: markedPose('2.22'), look: 0 },
      { pose: markedPose('3.33'), look: 0 },
      { pose: markedPose('4.44'), look: 0 },
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

  // Burton's Signature looks up at the Signal: a pose may set where his eyes are, still white.
  describe('with eyes of their own', () => {
    standInTheme({
      suit: {
        ...VENGEANCE_SUIT,
        poses: {
          ...VENGEANCE_SUIT.poses,
          flying: [
            {
              ...markedPose('5.55'),
              eyes: [
                [6, 2.5, 2, 1],
                [10, 2.5, 2, 1],
              ],
            },
          ],
        },
      },
    })

    it('draws his eyes where the pose puts them', () => {
      const eyes = draw({ mood: 'flying' }).match(/<g class="clawd__eyes"[^>]*>(.*?)<\/g>/)?.[1] ?? ''
      expect(eyes).toBe(
        '<rect x="6" y="2.5" width="2" height="1"></rect><rect x="10" y="2.5" width="2" height="1"></rect>',
      )
    })
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

// Burton's perch glances down to the street and back up to the Signal: a step may move his eyes
// up or down as well as along the street.
describe('a step that looks down', () => {
  // On the perch, a Signature pose held takes its glances from the watch.
  standInTheme({
    suit: {
      ...VENGEANCE_SUIT,
      signature: [{ pose: markedPose('6.66'), look: 0 }],
      watch: [{ pose: markedPose('7.77'), look: 0.2, lookY: 0.3 }],
    },
  })

  it('moves his eyes down as well as along', () => {
    expect(draw({ mood: 'sleeping', perched: true })).toContain(
      'class="clawd__eyes" transform="translate(0.2 0.3)"',
    )
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
