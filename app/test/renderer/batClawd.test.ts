import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { BatClawd, moodFrame } from '../../src/renderer/src/components/BatClawd'
import { WINGS } from '../../src/shared/emblems'
import { markedPose } from '../fixtures/themes'

const POINTS = [...WINGS.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => ({
  x: Number(m[1]),
  y: Number(m[2]),
}))

/** Where the chest emblem lands on Bat-Clawd's 16x11 grid, or nothing if he doesn't wear it. */
function chest(markup: string) {
  const path = markup.match(/<path class="clawd__emblem" d="([^"]+)" transform="([^"]+)"/)
  if (!path || path[1] !== WINGS) return undefined
  const [tx = NaN, ty = NaN, k = NaN] = (path[2] ?? '').match(/-?[\d.]+/g)?.map(Number) ?? []
  const xs = POINTS.map((p) => tx + p.x * k)
  const ys = POINTS.map((p) => ty + p.y * k)
  return { left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys) }
}

/** The bare chest: under the cowl (which ends at row 5), above the legs (row 9), between the arms. */
const onChest = (bat: ReturnType<typeof chest>) =>
  !!bat && bat.left >= 3 && bat.right <= 13 && bat.top >= 5 && bat.bottom <= 9 && bat.right - bat.left >= 6

describe('Bat-Clawd', () => {
  // VENGEANCE's red is no longer in his edges (the Costume Rule): it glows around him only while
  // something needs the user.
  it('wears the Alarm color as an aura in VENGEANCE, only alarmed', () => {
    expect(renderToStaticMarkup(createElement(BatClawd, { mood: 'alarmed' }))).toContain('clawd--aura')
    expect(renderToStaticMarkup(createElement(BatClawd, { mood: 'flying' }))).not.toContain('clawd--aura')
  })

  it('wears the bat on his chest whenever it shows', () => {
    for (const props of [
      { mood: 'flying' },
      { mood: 'alarmed' },
      { mood: 'sleeping', perched: true },
    ] as const)
      expect(onChest(chest(renderToStaticMarkup(createElement(BatClawd, props))))).toBe(true)
  })

  it('hides it asleep, under the wrapped cape', () => {
    expect(renderToStaticMarkup(createElement(BatClawd, { mood: 'sleeping' }))).not.toContain('clawd__emblem')
  })

  // The Costume Rule hangs the cape behind his legs: its rim is drawn only outside his body, so the
  // gaps between his legs show cloth and no line. The picker draws several of him on one page.
  it("cuts each cape's rim away over his body, with a clip of its own", () => {
    const markup = renderToStaticMarkup(
      createElement(
        'div',
        null,
        createElement(BatClawd, { mood: 'alarmed' }),
        createElement(BatClawd, { mood: 'alarmed' }),
      ),
    )
    const ids = [...markup.matchAll(/<clipPath id="([^"]+)"/g)].map((m) => m[1])
    const uses = [...markup.matchAll(/<g clip-path="url\(#([^)]+)\)"><path class="clawd__cape-rim"/g)].map(
      (m) => m[1],
    )
    expect(ids).toHaveLength(2)
    expect(new Set(ids).size).toBe(2)
    expect(uses).toEqual(ids)
  })
})

describe('his Moods on the clock', () => {
  const a = markedPose('1')
  const b = { ...markedPose('2'), transform: 'rotate(4deg)' }

  // Two frames of the same flutter (a cape, a wingsuit banking), while the body bobs.
  it('flies through his poses one frame each, tilting as a pose says', () => {
    expect(moodFrame('flying', 0, [a, b]).pose).toBe(a)
    const banked = moodFrame('flying', 1, [a, b])
    expect(banked.pose).toBe(b)
    expect(banked.transform).toMatch(/^translateY\(-?\d+px\) rotate\(4deg\)$/)
  })

  // A held flare flickers on every frame; his eyes blink on their own, every tenth.
  it('flickers through his alarmed poses every frame, and blinks every tenth', () => {
    expect([0, 1, 2].map((f) => moodFrame('alarmed', f, [a, b]).pose)).toEqual([a, b, a])
    expect([8, 9, 19].map((f) => moodFrame('alarmed', f, [a]).blink)).toEqual([false, true, true])
  })

  it('sits still asleep', () => {
    expect(moodFrame('sleeping', 3, [a, b])).toEqual({ pose: a, transform: '', blink: false })
  })
})
