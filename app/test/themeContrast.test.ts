import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { RENDERER, rendererSources } from './rendererSources'

type Rgb = [number, number, number]

const theme = readFileSync(join(RENDERER, 'styles/theme.css'), 'utf8')

/** The Theme's variables, as written in its :root block. */
const variables = new Map(
  [...(/:root\s*\{([^}]*)\}/.exec(theme)?.[1] ?? '').matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(
    (m) => [m[1]!, m[2]!.trim()] as const,
  ),
)

/** A variable's colour as [r, g, b], following var() aliases down to a hex value. */
function rgb(name: string): Rgb {
  const value = variables.get(name)
  if (!value) throw new Error(`theme.css: no ${name}`)
  const alias = /^var\((--[\w-]+)\)$/.exec(value)
  if (alias) return rgb(alias[1]!)
  const hex = /^#([0-9a-f]{6})$/i.exec(value)
  if (!hex) throw new Error(`theme.css: ${name} is ${value}, not an opaque colour`)
  return [0, 2, 4].map((i) => parseInt(hex[1]!.slice(i, i + 2), 16)) as Rgb
}

/** WCAG 2 relative luminance. */
function luminance(colour: Rgb): number {
  const [r, g, b] = colour.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }) as Rgb
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2 contrast ratio between two colours. */
function ratio(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** The contrast between two of the Theme's variables. */
const contrast = (a: string, b: string) => ratio(rgb(a), rgb(b))

/** Every variable the renderer's CSS paints text (or an icon) with. */
function textColours(): string[] {
  const used = rendererSources('.css').flatMap(({ text }) =>
    [...text.matchAll(/(?:^|[\s;{])color:\s*var\((--[\w-]+)\)/g)].map((m) => m[1]!),
  )
  return [...new Set(used)].sort()
}

const GROUNDS = ['--abyss', '--surface', '--raised']

/**
 * VENGEANCE's approved colours that read under 4.5:1, with the reason each was kept, so the test
 * can hold every other text colour, and every new Theme, to the line. Nothing on screen changed
 * when colours became variables (#72); whether to lift these is decided in #97.
 */
const VENGEANCE_EXCEPTIONS: Record<string, string> = {
  '--accent': 'the wordmark, in the red measured from the film title logo, at display size',
  '--signal-hot': 'small lit marks and warnings; the files-layout stamp ink',
  '--stamp-hot': 'the approved files-layout stamp ink (the Night Report lifts it to --ink-hot)',
  '--brick': 'the approved soft stamp ink, also on the failed state',
  '--stamp-soft': 'the approved files-layout soft stamp ink (the Night Report lifts it to --ink-soft)',
  '--ash-dim': 'struck-through done tasks, meant to recede',
  '--line': 'the case-detail row chevron, a decorative icon',
  '--ink-hot': 'the pen ink, tuned to 4.5:1 on black where the report sits; short only on hover tints',
  '--ink-soft': 'the soft pen ink, tuned to 4.5:1 on black where the report sits; short only on hover tints',
}

describe("the Theme's text colours", () => {
  const colours = textColours()

  it.each(colours.filter((c) => !(c in VENGEANCE_EXCEPTIONS)))(
    '%s reads at 4.5:1 or better on every ground',
    (colour) => {
      for (const ground of GROUNDS)
        expect(contrast(colour, ground), `on ${ground}`).toBeGreaterThanOrEqual(4.5)
    },
  )

  // A stale exception would hide a colour that no longer needs one, or no longer exists.
  it.each(Object.keys(VENGEANCE_EXCEPTIONS))(
    '%s is a text colour that still needs its exception',
    (colour) => {
      expect(colours).toContain(colour)
      expect(Math.min(...GROUNDS.map((ground) => contrast(colour, ground)))).toBeLessThan(4.5)
    },
  )
})

describe('the contrast ratio', () => {
  // Worked values: white on black is 21:1, and #777777 on white is the textbook 4.48:1.
  it('follows WCAG 2', () => {
    expect(ratio([255, 255, 255], [0, 0, 0])).toBeCloseTo(21, 5)
    expect(ratio([0x77, 0x77, 0x77], [255, 255, 255])).toBeCloseTo(4.48, 2)
  })
})
