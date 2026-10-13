import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_IDS, THEMES, type ThemeId } from '../src/shared/themes'
import { fontMetrics } from './fixtures/fontMetrics'
import { resolved, themeVariables } from './rendererSources'

// A Theme's stamp words, in its stamp face, must fit where they are stamped (#76): a word that
// overflows the Night Report's margin runs into the rule and the sentence after it.

/** Letter spacing on every stamp (Cards.css .stamp), in em: after each letter, the last one too. */
const TRACKING = 0.12
/** A stamp's padding, left and right together (Cards.css .stamp). */
const PADDING = 12
/** The Night Report's margin (NightReport.css --margin), less its padding either side. */
const MARGIN = 114 - 4 - 9
/** The watch strip's stamp box (WatchStrip.css): 82px with 4px padding and a 1px border either side. */
const STRIP = { width: 82 - 2 * 4 - 2 * 1, size: 9.5 }

/** A Theme's stamp face, size, weight and border, as its stylesheet sets them. */
function stampFace(id: ThemeId) {
  const vars = themeVariables(id)
  const value = (name: string) => resolved(vars, vars.get(name) ?? '')
  const family = /^'([^']+)'/.exec(value('--font-stamp'))?.[1] ?? ''
  const weight = value('--stamp-weight')
  const slug = family.toLowerCase().replaceAll(' ', '-')
  const file = join(
    __dirname,
    `../node_modules/@fontsource/${slug}/files/${slug}-latin-${weight}-normal.woff`,
  )
  return {
    family,
    file,
    size: parseFloat(value('--stamp-size')),
    border: parseFloat(value('--stamp-border')),
  }
}

/** Every word a stamp in the margin or the strip may say: what needs the user, and a case's state. */
function stampWords(id: ThemeId): string[] {
  const { stamp, live, needsYou } = THEMES[id].words.terms
  const alerts = [stamp.permission, stamp.error, stamp.waiting, stamp.reply, stamp.stalled]
  return [...alerts, ...Object.values(live), needsYou.label].map((word) => word.toUpperCase())
}

describe.each(THEME_IDS)("%s's stamps", (id) => {
  const face = stampFace(id)

  it('come in a face the app ships', () => {
    expect(face.family).not.toBe('')
    expect(existsSync(face.file)).toBe(true)
  })

  const metrics = () => fontMetrics(face.file)
  const width = (word: string, size: number) => metrics().width(word, size) + word.length * TRACKING * size

  it.each(stampWords(id))('fit the Night Report margin: %s', (word) => {
    expect(width(word, face.size) + PADDING + 2 * face.border).toBeLessThanOrEqual(MARGIN)
  })

  it.each(stampWords(id))('fit the watch strip: %s', (word) => {
    expect(width(word, STRIP.size)).toBeLessThanOrEqual(STRIP.width)
  })
})
