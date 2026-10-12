import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(join(__dirname, '../src/renderer/src/components/ThemePicker.css'), 'utf8')

/** The declarations of one CSS rule, by its exact selector. */
function rule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const found = new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`).exec(css)
  if (!found) throw new Error(`ThemePicker.css: no rule for ${selector}`)
  return found[1]!
}

// The maintainer's decision (jury §10): the picker previews each Theme's Alarm color. A stamp's
// own ink is its tier's (--stamp-hot), which a Theme may keep off its Alarm color, so the folder's
// stamp names the Alarm color itself, as the aura does.
describe("a folder's stamp", () => {
  it("is in its Theme's Alarm color", () => {
    expect(rule('.folder .stamp')).toMatch(/color:\s*var\(--signal-hot\)/)
  })
})
