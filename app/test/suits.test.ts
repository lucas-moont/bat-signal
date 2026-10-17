import { describe, expect, it } from 'vitest'
import {
  ANCIENT_GRACE_SUIT,
  BECOME_A_BAT_SUIT,
  BLUE_COLLAR_SUIT,
  scriptAt,
  stillStep,
  VENGEANCE_SUIT,
  watchOn,
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
      expect([step.transform, step.pose.transform].join(' ')).toMatch(/rotate\(12deg\)/)
  })
})

// A watch holds the Signature pose's final nudge through every step, its glances and its beat too:
// a beat of its own (a ping, a crossing bat) must not snap a tilted pose level.
describe('a watch on a nudged Signature pose', () => {
  it('keeps the nudge in its glances and its beat', () => {
    const tilted: Script = [
      { pose, look: 0 },
      { pose, look: 0, transform: 'rotate(-15deg)' },
    ]
    const watch = watchOn(tilted, [{ look: 0.3 }, { look: -0.3 }], [{ pose, look: 0 }])
    for (const step of watch) expect(step.transform).toBe('rotate(-15deg)')
  })
})

// BLUE COLLAR's working suit (absolute-batman.md, section 7, and its built note): his black shoulder
// pads in every pose; the block on his chest until it comes off as the axe; and the stand on the #1
// cover as his Signature pose, his head lowered at the end.
describe("BLUE COLLAR's suit", () => {
  const { poses, signature, watch } = BLUE_COLLAR_SUIT
  const front = (p: Pose) => p.front.flatMap((layer) => (layer.kind === 'path' ? [layer] : []))
  const hasPads = (p: Pose) => front(p).some((layer) => layer.d.startsWith('M3.6 5 L3.6 6.1'))
  const hasBlock = (p: Pose) => front(p).some((layer) => layer.className === 'clawd__emblem')
  const every = [...poses.sleeping, ...poses.flying, ...poses.alarmed, ...signature!.map((step) => step.pose)]

  it('wears his shoulder pads in every pose', () => {
    for (const p of every) expect(hasPads(p)).toBe(true)
  })

  it('takes the block off his chest only when it is the axe he raises', () => {
    expect(poses.flying.every(hasBlock)).toBe(true)
    expect(signature!.every((step) => hasBlock(step.pose))).toBe(true)
    expect(poses.alarmed.some(hasBlock)).toBe(false)
  })

  // The watch looks ahead between its glances, as every Theme's does; his glances stay low.
  it('ends his stand with his head lowered, and glances along the street from under it', () => {
    expect(scriptAt(signature!, Infinity).lookY).toBeGreaterThan(0)
    const glances = watch.filter((step) => step.look !== 0)
    expect(glances).toHaveLength(2)
    for (const step of glances) expect(step.lookY).toBeGreaterThan(0)
  })
})
