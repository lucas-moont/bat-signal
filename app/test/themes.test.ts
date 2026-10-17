import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { THEME_IDS, themeFromFlags, THEMES } from '../src/shared/themes'
import { RENDERER, rendererSources, themeVariables } from './rendererSources'

describe('the Themes', () => {
  // The window's background shows before the page paints, then the page's --abyss covers it: a
  // mismatch flashes the wrong color at every opening.
  it.each(THEME_IDS)("%s paints the window in its stylesheet's ground", (id) => {
    expect(themeVariables(id).get('--abyss')?.toLowerCase()).toBe(THEMES[id].ground.toLowerCase())
  })

  // The picker names each Theme by its display name and credits the film or comic it follows
  // (jury §10: names allude to the film; the credit says which). Words, so they are its Voice's.
  it.each(THEME_IDS)('%s has a display name and the film it follows', (id) => {
    const { name, film } = THEMES[id].words.voice.theme
    expect(name).toMatch(/^[A-Z][A-Z ]+$/)
    expect(film).not.toBe('')
  })

  // A Theme whose words spread VENGEANCE's Voice without naming itself would show a second
  // VENGEANCE folder.
  it('each have a name of their own', () => {
    const names = THEME_IDS.map((id) => THEMES[id].words.voice.theme.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('names VENGEANCE after The Batman (2022)', () => {
    expect(THEMES['the-batman-2022'].words.voice.theme).toEqual({
      name: 'VENGEANCE',
      film: 'The Batman (2022)',
    })
  })

  it("names PALE MOONLIGHT after Tim Burton's Batman (1989)", () => {
    expect(THEMES['batman-1989'].words.voice.theme).toEqual({
      name: 'PALE MOONLIGHT',
      film: "Tim Burton's Batman (1989)",
    })
  })

  it("names WATCHFUL PROTECTOR after Christopher Nolan's Dark Knight trilogy", () => {
    expect(THEMES['the-dark-knight-2008'].words.voice.theme).toEqual({
      name: 'WATCHFUL PROTECTOR',
      film: "Christopher Nolan's Dark Knight trilogy",
    })
  })

  // Credited for the film the Knightmare first appeared in, short enough for its picker folder.
  it("names KNIGHTMARE after Zack Snyder's Batman v Superman", () => {
    expect(THEMES['batman-v-superman-2016'].words.voice.theme).toEqual({
      name: 'KNIGHTMARE',
      film: "Zack Snyder's Batman v Superman",
    })
  })

  // The credit names the work without "after", which the picker adds (jury-wave-2.md, section
  // 3.15), short enough for its folder.
  it("names BECOME A BAT after Frank Miller's Year One", () => {
    expect(THEMES['batman-year-one-1987'].words.voice.theme).toEqual({
      name: 'BECOME A BAT',
      film: "Frank Miller's Year\u00a0One",
    })
  })

  it("names ANCIENT GRACE after Frank Miller's The Dark Knight Returns", () => {
    expect(THEMES['the-dark-knight-returns-1986'].words.voice.theme).toEqual({
      name: 'ANCIENT GRACE',
      film: "Frank Miller's The\u00a0Dark\u00a0Knight\u00a0Returns",
    })
  })

  // With both creators' first names, or "and", the credit ran to a third line on its folder.
  it("names BLUE COLLAR after Snyder & Dragotta's Absolute Batman", () => {
    expect(THEMES['absolute-batman-2024'].words.voice.theme).toEqual({
      name: 'BLUE COLLAR',
      film: "Snyder & Dragotta's Absolute\u00a0Batman",
    })
  })

  // The demo page's hash splits on "-" (#demo-watch-report → demo, watch, report).
  it('each have a one-word demo flag of their own', () => {
    const flags = THEME_IDS.map((id) => THEMES[id].flag)
    for (const flag of flags) expect(flag).toMatch(/^[a-z]+$/)
    expect(new Set(flags).size).toBe(flags.length)
  })
})

// The pages find a Theme's stylesheet and fonts by file name: a missing or misnamed file would
// leave the Theme with no colors or faces, and nothing else would notice.
describe("the Themes' stylesheets and fonts", () => {
  const files = readdirSync(join(RENDERER, 'styles/themes'))

  it.each(THEME_IDS)('%s has both', (id) => {
    expect(files).toContain(`${id}.css`)
    expect(files).toContain(`${id}.fonts.ts`)
  })

  // The picker previews each Theme inside its folder: its stylesheet must dress any element that
  // wears its attribute, not only the page.
  it.each(THEME_IDS)("%s's colors dress any element that wears it, not only the page", (id) => {
    const css = readFileSync(join(RENDERER, `styles/themes/${id}.css`), 'utf8')
    expect(css).toMatch(new RegExp(String.raw`(^|[\s,}])\[data-theme='${id}'\]\s*\{`, 'm'))
  })

  it('belong to known Themes only', () => {
    const ids = files.flatMap((file) => /^(.+?)(?:\.fonts\.ts|\.css)$/.exec(file)?.[1] ?? [])
    for (const id of ids) expect(THEME_IDS).toContain(id)
  })
})

// A variable one Theme sets is inherited by everything under the page, a picker folder wearing
// another Theme included: if that Theme doesn't set it too, its folder takes the worn Theme's value
// (a fallback in var() never applies once an ancestor sets one). So every variable the shared
// stylesheets read, and don't set themselves, is every Theme's to set.
describe("the shared stylesheets' variables", () => {
  const shared = rendererSources('.css').filter(({ path }) => !path.startsWith('styles/themes/'))
  // The renderer's code reads some too, handing them to an SVG (fill="var(--lens-bat)").
  const code = rendererSources('.ts', '.tsx')
  const read = new Set(
    [...shared, ...code].flatMap(({ text }) => [...text.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]!)),
  )
  const setInShared = new Set([
    ...shared.flatMap(({ text }) => [...text.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]!)),
    // Set on an element by code (the click ripple), not by a Theme.
    ...rendererSources('.ts', '.tsx').flatMap(({ text }) =>
      [...text.matchAll(/setProperty\('(--[\w-]+)'/g)].map((m) => m[1]!),
    ),
  ])
  // Read only for an emblem on a plate, which only its own Theme draws (BatEmblem.tsx): a Theme
  // without one never paints them, in its folder or anywhere.
  const PLATE_ONLY = new Set(['--emblem-plate', '--emblem-plate-rim'])
  const themesSet = [...read].filter((name) => !setInShared.has(name) && !PLATE_ONLY.has(name)).sort()

  it.each(THEME_IDS)('are all set by %s', (id) => {
    const vars = themeVariables(id)
    expect(themesSet.filter((name) => !vars.has(name))).toEqual([])
  })
})

describe('a demo page', () => {
  it('wears the Theme its hash names', () => {
    expect(themeFromFlags(new Set(['demo', 'report', 'vengeance']))).toBe('the-batman-2022')
    expect(themeFromFlags(new Set(['demo', 'moonlight']))).toBe('batman-1989')
    expect(themeFromFlags(new Set(['demo', 'protector']))).toBe('the-dark-knight-2008')
    expect(themeFromFlags(new Set(['demo', 'knightmare']))).toBe('batman-v-superman-2016')
    expect(themeFromFlags(new Set(['demo', 'yearone']))).toBe('batman-year-one-1987')
    expect(themeFromFlags(new Set(['demo', 'grace']))).toBe('the-dark-knight-returns-1986')
    expect(themeFromFlags(new Set(['demo', 'collar']))).toBe('absolute-batman-2024')
  })

  it('names no Theme without a Theme flag', () => {
    expect(themeFromFlags(new Set(['demo', 'watch', 'report']))).toBeUndefined()
  })
})
