import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(join(__dirname, '../src/renderer/src/components/Sheets.css'), 'utf8')

/** The declarations of one CSS rule, by its exact selector. */
function rule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const found = new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`).exec(css)
  if (!found) throw new Error(`Sheets.css: no rule for ${selector}`)
  return found[1]!
}

describe("a switch's hidden checkbox", () => {
  // Unanchored, the checkbox is placed against the whole sheet, outside the list that scrolls: a
  // switch low in Settings hangs below the panel, and clicking it focused a checkbox the browser
  // scrolled the whole panel up to show, out of the window (it looked black).
  it('is placed inside its own switch, which anchors it', () => {
    expect(rule('.toggle input')).toMatch(/position:\s*absolute/)
    expect(rule('.toggle')).toMatch(/position:\s*relative/)
  })
})
