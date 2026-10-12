import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, describe, expect, it, vi } from 'vitest'
// The shared clock listens to the page's visibility as it loads; a hidden page keeps it stopped.
vi.hoisted(() => vi.stubGlobal('document', { hidden: true, addEventListener: () => {} }))
afterAll(() => vi.unstubAllGlobals())

import { ThemePicker, themeAfter } from '../../src/renderer/src/components/ThemePicker'

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

  // One folder per Theme: VENGEANCE alone today.
  it('shows each Theme as a folder, the worn one checked and in the tab order', () => {
    const radios = draw().match(/<button[^>]*role="radio"[^>]*>/g) ?? []
    expect(radios).toHaveLength(1)
    expect(radios[0]).toContain('aria-checked="true"')
    expect(radios[0]).toContain('tabindex="0"')
  })

  it('names each Theme and credits its film', () => {
    const html = draw()
    expect(html).toContain('VENGEANCE')
    expect(html).toContain('after The Batman (2022)')
  })

  // Each folder wears its own Theme, so it shows that Theme's colors, stamp word and suit.
  it('dresses each folder in its own Theme, with its stamp and a still Bat-Clawd', () => {
    const html = draw()
    expect(html).toMatch(/role="radio"[^>]*data-theme="the-batman-2022"/)
    expect(html).toContain('>Permission<')
    expect(html).toContain('clawd__frame')
  })

  // The folder reads as its name and credit; the preview inside is decoration.
  it('hides the preview from assistive technology', () => {
    expect(draw()).toMatch(/aria-hidden="true"[^>]*>.*clawd/s)
  })
})
