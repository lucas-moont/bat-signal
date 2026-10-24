import { describe, expect, it } from 'vitest'
import { THEME_IDS, THEMES } from '../src/shared/themes'
import { channels, resolved, themeVariables } from './rendererSources'

// Words with no card under them (the night report, an empty list) sit on the Atmosphere through the
// Theme's --bare-veil (App.css). Over a skyline the sky's bands are held to the panel's foot in px,
// and so is the veil: both are read here, so a band retuned in atmospheres.ts or a stop moved in the
// stylesheet is measured. At every band the dimmest text, --ash, must keep 4.5:1 over the sky with a
// beam crossing it, under the veil. (Measured on screen too, for #157: 4.75:1 at worst, with clouds.)

type Rgb = [number, number, number]

const luminance = (color: Rgb) =>
  color
    .map((c) => {
      const s = c / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    })
    .reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i]!, 0)
const ratio = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}
/** `top` laid over `under` at an opacity. */
const over = (under: Rgb, top: Rgb, alpha: number) => under.map((c, i) => c + (top[i]! - c) * alpha) as Rgb

/** A veil's stops, from the foot up: its opacity at a height in px. */
function opacityOf(veil: string): (height: number) => number {
  const stops = [...veil.matchAll(/(?:(\d+)%, transparent\)|transparent) (\d+)px/g)].map((m) => ({
    at: Number(m[2]),
    alpha: m[1] === undefined ? 0 : Number(m[1]) / 100,
  }))
  return (height) => {
    const above = stops.findIndex((stop) => stop.at >= height)
    if (above === -1) return stops.at(-1)!.alpha
    if (above === 0) return stops[0]!.alpha
    const [lo, hi] = [stops[above - 1]!, stops[above]!]
    return lo.alpha + ((hi.alpha - lo.alpha) * (height - lo.at)) / (hi.at - lo.at)
  }
}

const skylines = THEME_IDS.filter((id) => THEMES[id].atmosphere.backdrop?.kind === 'skyline')

it('measures a Theme that paints a skyline', () => {
  expect(skylines.length).toBeGreaterThan(0)
})

describe.each(skylines)("%s's bare veil", (id) => {
  const atmosphere = THEMES[id].atmosphere
  const backdrop = atmosphere.backdrop
  const vars = themeVariables(id)
  const color = (name: string) => channels(resolved(vars, `var(${name})`))
  const veil = vars.get('--bare-veil') ?? ''
  const opacity = opacityOf(veil)
  const beam = atmosphere.kind === 'blimps' ? atmosphere.beams : undefined

  it('is a gradient of the ground', () => {
    expect(veil).toMatch(/^linear-gradient\(\s*to top in srgb,/)
    expect(veil).toContain('var(--abyss)')
  })

  if (backdrop?.kind !== 'skyline') return
  // The sky between its bands, as the canvas's gradient blends them, a px at a time from the foot.
  const bands = [...backdrop.sky].sort((a, b) => a.above - b.above)
  const skyAt = (height: number): Rgb => {
    const above = bands.findIndex((band) => band.above >= height)
    if (above <= 0) return color(bands[above === -1 ? bands.length - 1 : 0]!.color)
    const [lo, hi] = [bands[above - 1]!, bands[above]!]
    return over(color(lo.color), color(hi.color), (height - lo.above) / (hi.above - lo.above))
  }
  const heights = Array.from({ length: bands.at(-1)!.above + 1 }, (_, h) => h)

  it('keeps --ash at 4.5:1 over the sky at every height, a beam crossing it', () => {
    const worst = heights
      .map((height) => {
        const lit = beam ? over(skyAt(height), color(beam.color), beam.alpha) : skyAt(height)
        return { height, ratio: ratio(color('--ash'), over(lit, color('--abyss'), opacity(height))) }
      })
      .sort((a, b) => a.ratio - b.ratio)[0]!
    expect(worst.ratio, `at ${worst.height}px`).toBeGreaterThanOrEqual(4.5)
  })
})
