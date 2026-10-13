import { describe, expect, it } from 'vitest'
import type { Pose, Suit } from '../src/shared/suits'
import { THEME_IDS, THEMES } from '../src/shared/themes'
import { CSS_COLOR_NAMES } from './cssColorNames'
import { channels, resolved, themeVariables } from './rendererSources'

/** The poses he wears awake: flying, alarmed, and his Signature pose's steps. */
const awakePoses = (suit: Suit): Pose[] => [
  ...suit.poses.flying,
  ...suit.poses.alarmed,
  ...(suit.signature ?? []).map((step) => step.pose),
]
const allPoses = (suit: Suit): Pose[] => [...suit.poses.sleeping, ...awakePoses(suit)]

/** The letter that paints Clawd's own orange in a pose's map. */
const bodyLetter = (pose: Pose) =>
  Object.entries(pose.map.legend).find(([, value]) => value === 'var(--clawd)')?.[0]

/** A pose's map from grid row y (inclusive) to row `to` (exclusive), as its half-rows. */
const rowsBetween = (pose: Pose, y: number, to: number) =>
  pose.map.rows.slice((y - pose.map.top) * 2, (to - pose.map.top) * 2)

/** A color's hue, in degrees. */
function hue(hex: string): number {
  const [r, g, b] = channels(hex)
  const max = Math.max(r, g, b)
  const span = max - Math.min(r, g, b) || 1
  const h = max === r ? (g - b) / span : max === g ? 2 + (b - r) / span : 4 + (r - g) / span
  return (h * 60 + 360) % 360
}

/**
 * Whether a color is neutral beside a Theme's Alarm color: a grey (its channels within 32 of each
 * other), or a hue at least 30 degrees off the alarm's, so it can't read as the alarm at his size
 * (Burton's steel against gold; Knightmare's dust against Heat Vision).
 */
function isNeutralBeside(alarm: string, hex: string): boolean {
  const [r, g, b] = channels(hex)
  if (Math.max(r, g, b) - Math.min(r, g, b) <= 32) return true
  const apart = Math.abs(hue(hex) - hue(alarm))
  return Math.min(apart, 360 - apart) >= 30
}

/** The colors a value is made of, once its var() calls are written out: hex, and named ones. */
function colorsIn(value: string) {
  return {
    hexes: value.match(/#[0-9a-f]{3,8}\b/gi) ?? [],
    names: CSS_COLOR_NAMES.filter((name) => new RegExp(`(?<![\\w-])${name}(?![\\w-])`, 'i').test(value)),
  }
}

// DESIGN.md, the Bat-Clawd Costume Rule: the suit over his body, arms and legs, the cowl down to his
// eyes, Clawd's orange as his jaw, and at rest a faint neutral rim (the red only as an aura).
describe('the Bat-Clawd Costume Rule', () => {
  it.each(THEME_IDS)('%s dresses him in its own variables', (id) => {
    for (const pose of allPoses(THEMES[id].suit))
      for (const value of Object.values(pose.map.legend)) expect(value).toMatch(/^var\(--[\w-]+\)$/)
  })

  it.each(THEME_IDS)("%s shows Clawd's orange as his jaw, under the cowl", (id) => {
    for (const pose of awakePoses(THEMES[id].suit)) {
      const body = bodyLetter(pose) ?? '?'
      // Row 3 is his eyes' (drawn over the map): cowl there, and his orange just under it.
      for (const row of rowsBetween(pose, 3, 4)) expect(row.slice(3, 13)).not.toContain(body)
      for (const row of rowsBetween(pose, 4, 5)) expect(row.slice(5, 11)).toBe(body.repeat(6))
    }
  })

  it.each(THEME_IDS)('%s wears its suit over his body, arms and legs', (id) => {
    for (const pose of allPoses(THEMES[id].suit)) {
      const body = bodyLetter(pose)
      expect(body).toBeDefined()
      for (const row of rowsBetween(pose, 5, 11)) expect(row).not.toContain(body)
    }
  })

  // Followed through its var() calls to the colors it is made of: each one neutral beside the Theme's
  // Alarm color, so neither the alarm written out nor one behind an alias passes.
  it.each(THEME_IDS)('%s rims his cowl and cape in a neutral, never in its Alarm color', (id) => {
    const vars = themeVariables(id)
    const alarm = resolved(vars, 'var(--signal-hot)')
    for (const name of ['--cowl-edge', '--cape-rim', '--thread']) {
      const value = resolved(vars, vars.get(name) ?? '')
      const { hexes, names } = colorsIn(value)
      expect(value, name).not.toContain('var(')
      expect(hexes.length, name).toBeGreaterThan(0)
      expect(
        hexes.filter((hex) => !isNeutralBeside(alarm, hex)),
        name,
      ).toEqual([])
      expect(
        names.filter((color) => color !== 'transparent'),
        name,
      ).toEqual([])
    }
  })

  it('reads a rim in the Alarm color as the alarm, written out or behind an alias', () => {
    const red = '#e3121b'
    const vars = new Map([
      ['--pen', '#ec2a2a'],
      ['--rim', 'color-mix(in srgb, var(--pen) 40%, transparent)'],
    ])
    const [pen = ''] = colorsIn(resolved(vars, 'var(--rim)')).hexes
    expect(isNeutralBeside(red, pen)).toBe(false)
    expect(isNeutralBeside(red, '#c00')).toBe(false)
    expect(isNeutralBeside(red, '#e8e1d9')).toBe(true)
    expect(colorsIn('crimson').names).toEqual(['crimson'])
  })

  it("lets a Theme rim him in a hue of its own, away from its alarm's", () => {
    expect(isNeutralBeside('#f0c24b', '#8fb0d3')).toBe(true)
    expect(isNeutralBeside('#e60f00', '#c4aa82')).toBe(true)
    expect(isNeutralBeside('#f0c24b', '#d29336')).toBe(false)
  })
})
