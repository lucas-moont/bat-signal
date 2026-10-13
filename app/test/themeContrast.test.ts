import { describe, expect, it } from 'vitest'
import { THEME_IDS, type ThemeId } from '../src/shared/themes'
import { channels, rendererSources, resolved, themeVariables } from './rendererSources'

type Rgb = [number, number, number]

/** A variable's color as [r, g, b], following var() aliases down to a hex value. */
function rgb(variables: Map<string, string>, name: string): Rgb {
  const value = resolved(variables, `var(${name})`)
  if (!/^#[0-9a-f]{6}$/i.test(value))
    throw new Error(
      `${name} is ${value}, not an opaque hex: the contrast test can't measure a color-mix() or translucent text color`,
    )
  return channels(value)
}

/** WCAG 2 relative luminance. */
function luminance(color: Rgb): number {
  const [r, g, b] = color.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }) as Rgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2 contrast ratio between two colors. */
function ratio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** Every variable the renderer's CSS paints text (or an icon) with. */
function textColors(): string[] {
  const used = rendererSources('.css').flatMap(({ text }) =>
    [...text.matchAll(/(?:^|[\s;{])color:\s*var\((--[\w-]+)\)/g)].map((m) => m[1]!),
  )
  return [...new Set(used)].sort()
}

/** Every dark ground text sits on: the page, the panels, the sheet and the notice card. */
const GROUNDS = [
  '--abyss',
  '--smoke',
  '--surface',
  '--surface-deep',
  '--raised',
  '--header-fade',
  '--sheet-top',
  '--notice-top',
  '--notice-foot',
  '--notice-hover-top',
  '--notice-hover-foot',
]

/**
 * Each Theme's approved colors that read under 4.5:1, with the reason each was kept, so the test
 * can hold every other text color, and every new Theme, to the line. Only VENGEANCE has any:
 * nothing on screen changed when colors became variables (#72), and whether to lift them is
 * decided in #97. A new Theme starts with none.
 */
const EXCEPTIONS: Record<ThemeId, Record<string, string>> = {
  'the-batman-2022': {
    '--accent': 'the wordmark, in the red measured from the film title logo, at display size',
    '--signal-hot': 'small lit marks and warnings; the files-layout stamp ink',
    '--in-progress': 'a running task in the files layout, lit in Hot Signal like the live dots',
    '--stamp-hot': 'the approved files-layout stamp ink (the Night Report lifts it to --ink-hot)',
    '--brick': 'the approved soft stamp ink, also on the failed state',
    '--stamp-soft': 'the approved files-layout soft stamp ink (the Night Report lifts it to --ink-soft)',
    '--ash-dim': 'struck-through done tasks, meant to recede',
    '--chevron': 'the case-detail row chevron, a decorative icon, as quiet as a rule',
    '--ink-hot': 'the pen ink, tuned to 4.5:1 on black where the report sits; short only on hover tints',
    '--ink-soft':
      'the soft pen ink, tuned to 4.5:1 on black where the report sits; short only on hover tints',
  },
  // PALE MOONLIGHT starts, as every new Theme does, with none.
  'batman-1989': {},
}
const colors = textColors()

describe.each(THEME_IDS)("%s's text colors", (theme) => {
  const variables = themeVariables(theme)
  const contrast = (a: string, b: string) => ratio(rgb(variables, a), rgb(variables, b))
  const exceptions = EXCEPTIONS[theme]

  it.each(colors.filter((c) => !(c in exceptions)))(
    '%s reads at 4.5:1 or better on every ground',
    (color) => {
      for (const ground of GROUNDS)
        expect(contrast(color, ground), `on ${ground}`).toBeGreaterThanOrEqual(4.5)
    },
  )

  // A stale exception would hide a color that no longer needs one, or no longer exists.
  it.each(Object.keys(exceptions))('%s is a text color that still needs its exception', (color) => {
    expect(colors).toContain(color)
    expect(Math.min(...GROUNDS.map((ground) => contrast(color, ground)))).toBeLessThan(4.5)
  })
})

describe('the contrast ratio', () => {
  // Worked values: white on black is 21:1, and #777777 on white is the textbook 4.48:1.
  it('follows WCAG 2', () => {
    expect(ratio([255, 255, 255], [0, 0, 0])).toBeCloseTo(21, 5)
    expect(ratio([0x77, 0x77, 0x77], [255, 255, 255])).toBeCloseTo(4.48, 2)
  })
})
