import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_IDS, THEMES, type ThemeId } from '../src/shared/themes'
import { fontMetrics, type FontMetrics } from './fixtures/fontMetrics'
import { componentCss, cssRule, declared, resolved, themeVariables } from './rendererSources'

// A Theme's credit on its picker folder must keep to two lines: BECOME A BAT's full credit ran to a
// third and spilled out of the folder's foot (#122). The folder's room and the credit's size are
// read from the stylesheet, so a change there is measured too.

const px = (value: string) => parseFloat(value)

const picker = componentCss('ThemePicker.css')
const folder = cssRule(picker, '.folder')
const [, right, , left] = declared(folder, 'padding').split(/\s+/).map(px) as number[]
/** The folder's width inside its padding and border. */
const ROOM =
  px(declared(folder, 'flex').split(/\s+/).at(-1)!) -
  right! -
  (left ?? right!) -
  2 * px(declared(folder, 'border'))
const CREDIT_SIZE = px(declared(cssRule(picker, '.folder__credit'), 'font-size'))

/** A Theme's body face, which sets its folder's credit, at its regular weight. */
function bodyFace(id: ThemeId): FontMetrics {
  const vars = themeVariables(id)
  const family = /^'([^']+)'/.exec(resolved(vars, vars.get('--font-body') ?? ''))?.[1] ?? ''
  const slug = family.toLowerCase().replaceAll(' ', '-')
  return fontMetrics(
    join(__dirname, `../node_modules/@fontsource/${slug}/files/${slug}-latin-400-normal.woff`),
  )
}

/** How many lines `text` takes `width` px wide, broken at its spaces (not at a no-break space). */
function lines(text: string, width: number, measure: (s: string) => number): number {
  let count = 1
  let line = ''
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
    if (line && measure(next) > width) {
      count++
      line = word
    } else line = next
  }
  return count
}

describe.each(THEME_IDS)("%s's picker folder", (id) => {
  it('fits its credit on two lines', () => {
    const face = bodyFace(id)
    const { voice } = THEMES[id].words
    const credit = voice.settings.theme.credit(voice.theme.film)
    expect(lines(credit, ROOM, (s) => face.width(s, CREDIT_SIZE))).toBeLessThanOrEqual(2)
  })
})

describe('the line count', () => {
  // Worked example: three 10px words in a 25px room, with a space 5px wide, take two lines.
  it('breaks at spaces, greedily', () => {
    expect(lines('aa bb cc', 25, (s) => s.length * 5)).toBe(2)
    expect(lines('aa\u00a0bb cc', 25, (s) => s.length * 5)).toBe(2)
    expect(lines('aa\u00a0bb\u00a0cc', 25, (s) => s.length * 5)).toBe(1)
  })
})
