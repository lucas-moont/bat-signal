import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_IDS, THEMES, type ThemeId } from '../src/shared/themes'
import { fontMetrics, type FontMetrics } from './fixtures/fontMetrics'
import { componentCss, cssRule, declared, resolved, themeVariables } from './rendererSources'

// A Theme's stamp words, in its stamp face, must fit where they are stamped (#76): a word that
// overflows the Night Report's margin runs into the rule and the sentence after it. The room each
// place gives is read from its stylesheet, so a change there is measured too.

const px = (value: string) => parseFloat(value)
/** A padding shorthand's left and right, together. */
const sides = (padding: string) => {
  const [top, right = top, , left = right] = padding.split(/\s+/).map(px)
  return right! + left!
}

const cards = componentCss('Cards.css')
const report = componentCss('NightReport.css')
const strip = cssRule(componentCss('WatchStrip.css'), '.watch-row__stamp')
const signal = componentCss('Signal.css')
const stamp = cssRule(cards, '.stamp')
/** The narrowest panel's rules for the report (an @container). */
const narrow = /@container app \(max-width: 330px\) \{([\s\S]*?)\n\}/.exec(report)?.[1] ?? ''

/** A place a stamp sits: the room it gives, the letter spacing (em) there, and the size it sets. */
interface Room {
  width: number
  tracking: number
  /** The stamp's size there, from the Theme's --stamp-size. */
  size: (stampSize: number) => number
  /** Whether the stamp's padding and border count against the room (they do but in the strip). */
  boxed: boolean
  /** The words a stamp there may say. */
  words: (id: ThemeId) => string[]
}

/** Every word a stamp in the margin or the strip may say: what needs the user, and a case's state. */
function marginWords(id: ThemeId): string[] {
  const { stamp, live, needsYou } = THEMES[id].words.terms
  const alerts = [stamp.permission, stamp.error, stamp.waiting, stamp.reply, stamp.stalled]
  return [...alerts, ...Object.values(live), needsYou.label].map((word) => word.toUpperCase())
}

const MARGIN_PADDING = sides(declared(cssRule(report, '.entry__margin'), 'padding'))
const ROOMS: Record<string, Room> = {
  'the Night Report margin': {
    width: px(declared(cssRule(report, '.report'), '--margin')) - MARGIN_PADDING,
    tracking: px(declared(stamp, 'letter-spacing')),
    size: (s) => s,
    boxed: true,
    words: marginWords,
  },
  "the narrowest panel's Night Report margin": {
    width: px(declared(cssRule(narrow, '.report'), '--margin')) - MARGIN_PADDING,
    tracking: px(declared(cssRule(narrow, '.report .stamp'), 'letter-spacing')),
    size: (s) => s,
    boxed: true,
    words: marginWords,
  },
  // The notice card riding the disc's beam: any stamp, news of a case opening or closing too.
  'the notice card': {
    width:
      px(declared(cssRule(signal, '.notice-wrap'), 'width')) -
      sides(declared(cssRule(signal, '.notice'), 'padding')),
    tracking: px(declared(stamp, 'letter-spacing')),
    size: (s) => s,
    boxed: true,
    words: (id) => Object.values(THEMES[id].words.terms.stamp).map((word) => word.toUpperCase()),
  },
  // A fixed box: the word must fit inside its padding and border.
  'the watch strip': {
    width:
      px(declared(strip, 'width')) -
      sides(declared(strip, 'padding')) -
      2 * px(declared(strip, 'border-width')),
    tracking: px(declared(stamp, 'letter-spacing')),
    size: (s) =>
      s - px(/var\(--stamp-size\)\s*-\s*([\d.]+px)/.exec(declared(strip, 'font-size'))?.[1] ?? '0'),
    boxed: false,
    words: marginWords,
  },
}

/** A Theme's stamp face, size, weight and border, as its stylesheet sets them. */
function stampFace(id: ThemeId) {
  const vars = themeVariables(id)
  const value = (name: string) => resolved(vars, vars.get(name) ?? '')
  const family = /^'([^']+)'/.exec(value('--font-stamp'))?.[1] ?? ''
  const slug = family.toLowerCase().replaceAll(' ', '-')
  const weight = value('--stamp-weight')
  return {
    family,
    file: join(__dirname, `../node_modules/@fontsource/${slug}/files/${slug}-latin-${weight}-normal.woff`),
    size: px(value('--stamp-size')),
    border: px(value('--stamp-border')),
  }
}

describe.each(THEME_IDS)("%s's stamps", (id) => {
  const face = stampFace(id)
  // Read once a Theme, when a test first measures (a missing file fails its own test, below).
  let metrics: FontMetrics | undefined
  const width = (word: string, size: number, tracking: number) =>
    (metrics ??= fontMetrics(face.file)).width(word, size) + word.length * tracking * size

  it('come in a face the app ships', () => {
    expect(face.family).not.toBe('')
    expect(existsSync(face.file)).toBe(true)
  })

  describe.each(Object.entries(ROOMS))('fit %s', (_, room) => {
    const size = room.size(face.size)
    const box = room.boxed ? sides(declared(stamp, 'padding')) + 2 * face.border : 0
    it.each(room.words(id))('%s', (word) => {
      expect(width(word, size, room.tracking) + box).toBeLessThanOrEqual(room.width)
    })
  })
})
