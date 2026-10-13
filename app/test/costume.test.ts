import { describe, expect, it } from 'vitest'
import type { Pose, Suit } from '../src/shared/suits'
import { THEME_IDS, THEMES } from '../src/shared/themes'
import { themeVariables } from './rendererSources'

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
      for (const row of rowsBetween(pose, 5, 11)) expect(body && row.includes(body)).toBeFalsy()
    }
  })

  it.each(THEME_IDS)('%s rims his cowl and cape in a neutral, never in a red', (id) => {
    const vars = themeVariables(id)
    for (const name of ['--cowl-edge', '--cape-rim', '--thread'])
      expect(vars.get(name)).not.toMatch(/--(signal|signal-hot|signal-glow|blood|brick|accent)\b/)
  })
})
