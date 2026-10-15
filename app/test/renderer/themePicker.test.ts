import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { ThemePicker, themeAfter } from '../../src/renderer/src/components/ThemePicker'
import { VENGEANCE_SUIT } from '../../src/shared/suits'
import { THEME_IDS } from '../../src/shared/themes'
import { markedPose, standInTheme } from '../fixtures/themes'

const draw = () =>
  renderToStaticMarkup(createElement(ThemePicker, { theme: 'the-batman-2022', onChange: () => undefined }))

// A radio group: the arrows move along the folders (and round), Home and End jump to the ends.
describe('the keys in the Theme picker', () => {
  const ids = ['a', 'b', 'c'] as const

  it('move to the next folder, and round from the last', () => {
    expect(themeAfter(ids, 'a', 'ArrowRight')).toBe('b')
    expect(themeAfter(ids, 'c', 'ArrowDown')).toBe('a')
  })

  it('move to the previous folder, and round from the first', () => {
    expect(themeAfter(ids, 'b', 'ArrowLeft')).toBe('a')
    expect(themeAfter(ids, 'a', 'ArrowUp')).toBe('c')
  })

  it('jump to the first and the last', () => {
    expect(themeAfter(ids, 'b', 'Home')).toBe('a')
    expect(themeAfter(ids, 'b', 'End')).toBe('c')
  })

  it('leave every other key alone', () => {
    expect(themeAfter(ids, 'b', 'Tab')).toBeUndefined()
    expect(themeAfter(ids, 'b', 'a')).toBeUndefined()
  })
})

describe('the Theme picker', () => {
  it('is a radio group named by its label', () => {
    const html = draw()
    const label = /id="([^"]+)"[^>]*>Theme</.exec(html)?.[1]
    expect(label).toBeDefined()
    expect(html).toContain(`role="radiogroup" aria-labelledby="${label}"`)
  })

  // One folder per Theme: the worn one (VENGEANCE, the default) checked and the only one in the tab order.
  it('shows each Theme as a folder, the worn one checked and in the tab order', () => {
    const radios = draw().match(/<button[^>]*role="radio"[^>]*>/g) ?? []
    expect(radios).toHaveLength(THEME_IDS.length)
    expect(radios.filter((r) => r.includes('aria-checked="true"'))).toHaveLength(1)
    expect(radios[0]).toContain('aria-checked="true"')
    expect(radios[0]).toContain('tabindex="0"')
    expect(radios.slice(1).every((r) => r.includes('tabindex="-1"'))).toBe(true)
  })

  it('names each Theme and credits its film', () => {
    const html = draw()
    expect(html).toContain('VENGEANCE')
    expect(html).toContain('after The Batman (2022)')
    expect(html).toContain('PALE MOONLIGHT')
    expect(html).toContain('after Tim Burton&#x27;s Batman (1989)')
  })

  // A folder's Bat-Clawd is his Signature pose's final step, its nudge included: ANCIENT GRACE holds
  // the leap tilted there, as on the perch, not standing level in mid-air.
  it("holds a Signature pose's final nudge in its folder", () => {
    expect(draw()).toMatch(/class="clawd__mover" style="transform:[^"]*rotate\(12deg\)/)
  })

  // Each folder wears its own Theme, so it shows that Theme's colors, stamp word and suit.
  it('dresses each folder in its own Theme, with its stamp and a still Bat-Clawd', () => {
    const html = draw()
    expect(html).toMatch(/role="radio"[^>]*data-theme="the-batman-2022"/)
    expect(html).toMatch(/role="radio"[^>]*data-theme="batman-1989"/)
    expect(html).toMatch(/role="radio"[^>]*data-theme="the-dark-knight-2008"/)
    expect(html).toMatch(/role="radio"[^>]*data-theme="batman-v-superman-2016"/)
    expect(html).toMatch(/role="radio"[^>]*data-theme="batman-year-one-1987"/)
    expect(html).toMatch(/role="radio"[^>]*data-theme="the-dark-knight-returns-1986"/)
    expect(html).toContain('>Permission<')
    expect(html).toContain('>Approval<')
    expect(html).toContain('>Clearance<')
    expect(html).toContain('>Authorize<')
    expect(html).toContain('>Sign here<')
    expect(html).toContain('>OK to air?<')
    expect(html).toContain('clawd__frame')
  })

  // The folder reads as its name and credit; the preview inside is decoration.
  it('hides the preview from assistive technology', () => {
    expect(draw()).toMatch(/aria-hidden="true"[^>]*>.*clawd/s)
  })
})

// The jury: a folder previews its Theme's Signature pose, and its flying pose when it has none.
describe("a folder's Bat-Clawd", () => {
  standInTheme({
    suit: {
      ...VENGEANCE_SUIT,
      signature: [
        { pose: markedPose('2.22'), look: 0 },
        { pose: markedPose('3.33'), look: 0 },
      ],
    },
  })

  it("strikes its Theme's Signature pose, in its final step", () => {
    expect(draw()).toContain('M0 0 L3.33 0 Z')
  })
})
