import { describe, expect, it } from 'vitest'
import {
  ANCIENT_GRACE_SUIT,
  BECOME_A_BAT_SUIT,
  scriptAt,
  stillStep,
  VENGEANCE_SUIT,
  type Pose,
  type Script,
} from '../src/shared/suits'
import { THEME_IDS, THEMES } from '../src/shared/themes'

const pose = VENGEANCE_SUIT.poses.flying[0]
const steps: Script = [
  { pose, look: 0 },
  { pose, look: 0.1 },
  { pose, look: 0.2 },
]

describe('a script on the clock', () => {
  it('plays its steps in order, then holds the last', () => {
    expect([0, 1, 2, 5].map((i) => scriptAt(steps, i))).toEqual([steps[0], steps[1], steps[2], steps[2]])
  })

  it('gives its final step for Infinity, as under reduced motion', () => {
    expect(scriptAt(steps, Infinity)).toBe(steps[2])
  })
})

describe("a Theme's still portrait", () => {
  it('is the final step of its Signature pose', () => {
    expect(stillStep({ ...VENGEANCE_SUIT, signature: steps })).toBe(steps[2])
  })

  it('is its flying pose, looking ahead, without one', () => {
    const plain = { ...VENGEANCE_SUIT, signature: undefined }
    expect(stillStep(plain)).toEqual({ pose: VENGEANCE_SUIT.poses.flying[0], look: 0 })
  })
})

// WATCHFUL PROTECTOR's perch pings once a cycle (nolan.md, section 7). The reveal has just pinged
// as the watch begins, so its own ping comes last, not a few seconds after that one.
describe("WATCHFUL PROTECTOR's watch", () => {
  const { watch, signature } = THEMES['the-dark-knight-2008'].suit
  const held = scriptAt(signature!, Infinity).pose
  const pings = watch.flatMap((step, i) => (step.pose === held ? [] : [i]))

  it('pings once, at the end of its cycle', () => {
    expect(pings).toEqual([8, 9, 10, 11])
  })
})

// On the perch his watch takes over once his Signature pose is revealed: it starts on that pose, so
// the reveal ends where the watch begins (and under reduced motion, the watch's first step shows).
describe("a Theme's watch on the perch", () => {
  it.each(THEME_IDS.filter((id) => THEMES[id].suit.signature))(
    "%s keeps its watch on its Signature pose's final step",
    (id) => {
      const suit = THEMES[id].suit
      expect(suit.watch[0].pose).toEqual(stillStep(suit).pose)
    },
  )
})

// The perch's watch loops back to its first step: a bat that crossed in the last one must not jump
// back into the cloud. Every step keeps the held swarm; a crossing bat only adds to it.
describe("BECOME A BAT's watch", () => {
  const swarm = (pose: Pose) =>
    pose.front.find((layer) => layer.kind === 'path' && layer.fill === 'var(--swarm)')
  const held = swarm(stillStep(BECOME_A_BAT_SUIT).pose)

  it('keeps the held swarm in every step', () => {
    expect(held?.kind).toBe('path')
    for (const step of BECOME_A_BAT_SUIT.watch) {
      const here = swarm(step.pose)
      expect(here?.kind === 'path' && held?.kind === 'path' && here.d.startsWith(held.d)).toBe(true)
    }
  })
})

// The watch holds his Signature pose's final step, its nudge included: a tilt there (ANCIENT GRACE's
// leap) must not leave him standing upright on the perch.
describe("ANCIENT GRACE's watch", () => {
  it('holds the leap tilted in every step', () => {
    for (const step of ANCIENT_GRACE_SUIT.watch)
      expect([step.transform, step.pose.transform].join(' ')).toMatch(/rotate\(-15deg\)/)
  })
})
