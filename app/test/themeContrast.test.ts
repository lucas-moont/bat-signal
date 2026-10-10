import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const RENDERER = join(__dirname, '../src/renderer/src')
const theme = readFileSync(join(RENDERER, 'styles/theme.css'), 'utf8')

/** The Theme's variables, as written in its :root block. */
const variables = new Map(
  [...(/:root\s*\{([^}]*)\}/.exec(theme)?.[1] ?? '').matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(
    (m) => [m[1]!, m[2]!.trim()] as const,
  ),
)

/** A variable's colour as [r, g, b], following var() aliases down to a hex value. */
function rgb(name: string): [number, number, number] {
  const value = variables.get(name)
  if (!value) throw new Error(`theme.css: no ${name}`)
  const alias = /^var\((--[\w-]+)\)$/.exec(value)
  if (alias) return rgb(alias[1]!)
  const hex = /^#([0-9a-f]{6})$/i.exec(value)
  if (!hex) throw new Error(`theme.css: ${name} is ${value}, not an opaque colour`)
  return [0, 2, 4].map((i) => parseInt(hex[1]!.slice(i, i + 2), 16)) as [number, number, number]
}

/** WCAG 2 contrast ratio between two colours. */
function contrast(a: string, b: string): number {
  const luminance = (name: string) => {
    const [r, g, bl] = rgb(name).map((c) => {
      const s = c / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }) as [number, number, number]
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

/** Every variable the renderer's CSS paints text (or an icon) with. */
function textColours(): string[] {
  const css = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) return css(path)
      return entry.name.endsWith('.css') ? [readFileSync(path, 'utf8')] : []
    })
  const used = css(RENDERER).flatMap((file) =>
    [...file.matchAll(/(?:^|[\s;{])color:\s*var\((--[\w-]+)\)/g)].map((m) => m[1]!),
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

  it('are found in the CSS', () => {
    expect(colours).toContain('--bone')
    expect(colours).toContain('--ash')
  })

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

describe('contrast', () => {
  // Worked values: white on black is 21:1, and #777777 on white is the textbook 4.48:1.
  it('measures the WCAG ratio', () => {
    variables.set('--test-white', '#ffffff')
    variables.set('--test-grey', '#777777')
    expect(contrast('--test-white', '--abyss')).toBeCloseTo(21, 5)
    expect(contrast('--test-grey', '--test-white')).toBeCloseTo(4.48, 2)
  })
})
