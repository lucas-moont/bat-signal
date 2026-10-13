import { describe, expect, it } from 'vitest'
import { componentCss, cssRule } from './rendererSources'

const css = componentCss('Sheets.css')
const rule = (selector: string) => cssRule(css, selector)

describe("a switch's hidden checkbox", () => {
  // Unanchored, the checkbox is placed against the whole sheet, outside the list that scrolls: a
  // switch low in Settings hangs below the panel, and clicking it focused a checkbox the browser
  // scrolled the whole panel up to show, out of the window (it looked black).
  it('is placed inside its own switch, which anchors it', () => {
    expect(rule('.toggle input')).toMatch(/position:\s*absolute/)
    expect(rule('.toggle')).toMatch(/position:\s*relative/)
  })
})
