import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_IDS, THEMES, type ThemeId } from '../src/shared/themes'
import { fontMetrics } from './fixtures/fontMetrics'
import { cssRule, declared, RENDERER, resolved, themeVariables } from './rendererSources'

// At the compact default width (320px) the title bar holds the emblem, the wordmark, Bat-Clawd and
// the three buttons (App.css: "The title bar fits the compact default width with the mascot"). The
// mascot's box gives way to a wide wordmark, but his drawing keeps its size and spills over the
// buttons: in DARK DECO's wide Marcellus SC his body covered the menu (#157). So a Theme's wordmark
// may take at most the room that leaves his body, the middle 16 of his frame's 28 columns, clear of
// the buttons. The room is read from the stylesheet and the header, so a change there is measured.

const px = (value: string) => parseFloat(value)
const app = readFileSync(join(RENDERER, 'App.css'), 'utf8')
const header = readFileSync(join(RENDERER, 'components/Header.tsx'), 'utf8')
/** The compact panel's rules for the title bar (an @container). */
const compact = /@container app \(max-width: 360px\) \{([\s\S]*?)\n\}/.exec(app)?.[1] ?? ''

const WIDTH = 320
const BORDER = px(declared(cssRule(app, '.app'), 'border'))
const [, PAD_RIGHT, , PAD_LEFT] = declared(cssRule(app, '.header'), 'padding').split(/\s+/).map(px)
const GAP = px(declared(cssRule(compact, '.header'), 'gap'))
const BUTTON = px(declared(cssRule(app, ':where(.icon-button)'), 'width'))
const BUTTONS = 3 * BUTTON + 2 * px(declared(cssRule(app, '.header__actions'), 'gap'))
const BRAND = Number(/<BatEmblem size=\{(\d+)\}/.exec(header)![1])
const MASCOT = Number(/<BatClawd mood=\{mood\} size=\{(\d+)\}/.exec(header)![1])
/** His frame's margin each side of his body: 6 of its 28 columns. */
const MARGIN = (MASCOT * 6) / 28

/** The room left for the wordmark with Bat-Clawd's body clear of the buttons. */
const ROOM = WIDTH - 2 * BORDER - PAD_LEFT! - PAD_RIGHT! - BRAND - BUTTONS - 3 * GAP - (MASCOT - MARGIN)

/** The compact title bar's wordmark: the Theme's size and tracking, stepped down (App.css). */
const step = (name: string) =>
  px(/-\s*([\d.]+)px/.exec(declared(cssRule(compact, '.header__title'), name))![1]!)

/**
 * Themes shipped before this was measured whose wordmark already spills over (#158): their mascot's
 * cape, or his body by a few pixels, reaches the menu. Each comes off the list when it is fixed.
 */
const EXCEPTIONS: ThemeId[] = ['the-dark-knight-2008', 'batman-v-superman-2016', 'batman-year-one-1987']

function wordmarkWidth(id: ThemeId) {
  const vars = themeVariables(id)
  const value = (name: string) => resolved(vars, vars.get(name) ?? '')
  const family = /^'([^']+)'/.exec(value('--font-display'))![1]!
  const slug = family.toLowerCase().replaceAll(' ', '-')
  const file = join(
    __dirname,
    `../node_modules/@fontsource/${slug}/files/${slug}-latin-${value('--display-weight')}-normal.woff`,
  )
  const size = px(value('--wordmark-size')) - step('font-size')
  const tracking = px(value('--wordmark-tracking')) - step('letter-spacing')
  const word = THEMES[id].words.voice.wordmark
  return fontMetrics(file).width(word, size) + word.length * tracking
}

describe.each(THEME_IDS.filter((id) => !EXCEPTIONS.includes(id)))("%s's wordmark", (id) => {
  it(`leaves Bat-Clawd's body clear of the buttons at ${WIDTH}px`, () => {
    expect(wordmarkWidth(id)).toBeLessThanOrEqual(ROOM)
  })
})

describe.each(EXCEPTIONS)("%s's wordmark, a known spill (#158)", (id) => {
  it('still spills, or it comes off the list', () => {
    expect(wordmarkWidth(id)).toBeGreaterThan(ROOM)
  })
})

it(`leaves ${ROOM.toFixed(1)}px for the wordmark`, () => {
  expect(ROOM).toBeGreaterThan(90)
})
