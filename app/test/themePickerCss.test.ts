import { describe, expect, it } from 'vitest'
import { componentCss, cssRule } from './rendererSources'

const css = componentCss('ThemePicker.css')
const rule = (selector: string) => cssRule(css, selector)

// The maintainer's decision (jury §10): the picker previews each Theme's Alarm color. A stamp's
// own ink is its tier's (--stamp-hot), which a Theme may keep off its Alarm color, so the folder's
// stamp names the Alarm color itself, as the aura does.
describe("a folder's stamp", () => {
  it("is in its Theme's Alarm color", () => {
    expect(rule('.folder .stamp')).toMatch(/color:\s*var\(--signal-hot\)/)
  })
})
