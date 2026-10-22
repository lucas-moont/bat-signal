import { describe, expect, it } from 'vitest'
import {
  ANCIENT_GRACE_SUIT,
  BECOME_A_BAT_SUIT,
  BLUE_COLLAR_SUIT,
  scriptAt,
  SERIOUS_HOUSE_SUIT,
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
  const { poses, watch } = BLUE_COLLAR_SUIT
  const signature = BLUE_COLLAR_SUIT.signature!
  const every = [...poses.sleeping, ...poses.flying, ...poses.alarmed, ...signature.map((step) => step.pose)]
  /** The plate a pose's pads begin with: its last layer, in front of everything, is the pads. */
  const padPlate = (p: Pose) => {
    const pads = p.front.at(-1)
    return pads?.kind === 'path' && pads.mirrored ? pads.d.split(' M')[0] : undefined
  }
  /** The block on his chest: the emblem in the chest's ink (the axe's head wears the cape's). */
  const hasBlock = (p: Pose) => p.front.some((layer) => layer.kind === 'emblem' && !layer.className)

  it('wears the same shoulder pads over everything in every pose', () => {
    const plates = new Set(every.map(padPlate))
    expect(plates.size).toBe(1)
    expect([...plates][0]).toBeDefined()
  })

  it('takes the block off his chest only when it is the axe he raises', () => {
    expect(poses.flying.every(hasBlock)).toBe(true)
    expect(signature.every((step) => hasBlock(step.pose))).toBe(true)
    expect(poses.alarmed.some(hasBlock)).toBe(false)
  })

  // The perch holds the stand the reveal ends on, glancing along the street from it.
  it('holds his stand on the perch', () => {
    const stand = scriptAt(signature, Infinity).pose
    for (const step of watch) expect(step.pose).toBe(stand)
    expect(watch.filter((step) => step.look !== 0)).toHaveLength(2)
  })
})

// SERIOUS HOUSE's suit (arkham-horror-references.md, sections 5 and 6.8, picked on screen): at rest
// the cape closed over him, as the book shows him, open when he works or something needs you; a
// point from each shoulder in every pose, part of his outline; no belt and nothing on his chest.
describe("SERIOUS HOUSE's suit", () => {
  const { poses, watch } = SERIOUS_HOUSE_SUIT
  const atRest = [...poses.sleeping, ...watch.map((step) => step.pose)]
  const awake = [...poses.flying, ...poses.alarmed]
  const paths = (p: Pose) =>
    [...p.behind, ...p.front].flatMap((layer) => (layer.kind === 'path' ? [layer] : []))
  /** Whether his map draws legs: anything below the suit's last full row. */
  const hasLegs = (p: Pose) =>
    p.map.rows.slice((9 - p.map.top) * 2).some((row) => row.trim().replaceAll('.', ''))

  it('is wrapped in the closed cape at rest, only his head above it', () => {
    for (const p of atRest) {
      expect(hasLegs(p)).toBe(false)
      expect(p.front.some((layer) => layer.kind === 'path' && layer.className === 'clawd__cape')).toBe(true)
      expect(p.behind.some((layer) => layer.kind === 'cape')).toBe(false)
    }
  })

  it('opens the cape behind him when he works or is alarmed', () => {
    for (const p of awake) {
      expect(hasLegs(p)).toBe(true)
      expect(p.behind.some((layer) => layer.kind === 'cape')).toBe(true)
      expect(p.front).toEqual([])
    }
  })

  it('grows a point from each shoulder in every pose, out of the outline he is drawn in', () => {
    for (const p of [...atRest, ...awake]) {
      // Both tips, x 0.9 and 15.1, on one outline: the closed cape's, or the figure's with it open.
      const tips = paths(p).filter(
        (layer) => / 0\.9 3(\.2)? /.test(layer.d) && / 15\.1 3(\.2)? /.test(layer.d),
      )
      expect(tips.length).toBeGreaterThan(0)
    }
  })

  // With the cape open, his outline is drawn, then filled in the suit's black over its inner half.
  it('reads as one silhouette on the open cape', () => {
    for (const p of awake) {
      const [edge, fill] = p.behind.slice(-2)
      expect(edge).toMatchObject({ kind: 'path', className: 'clawd__cowl-edge' })
      expect(fill).toMatchObject({ kind: 'path', fill: 'var(--suit)' })
      expect(edge?.kind === 'path' && fill?.kind === 'path' && edge.d === fill.d).toBe(true)
    }
  })

  it('wears no belt and nothing on his chest', () => {
    for (const p of [...atRest, ...awake]) {
      expect(p.map.rows.join('')).not.toMatch(/[bk]/)
      expect([...p.behind, ...p.front].some((layer) => layer.kind === 'emblem')).toBe(false)
    }
  })
})
