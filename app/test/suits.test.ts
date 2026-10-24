import { describe, expect, it } from 'vitest'
import {
  ANCIENT_GRACE_SUIT,
  BECOME_A_BAT_SUIT,
  BLUE_COLLAR_SUIT,
  chestPlate,
  HOLIDAY_SUIT,
  PALE_MOONLIGHT_SUIT,
  scriptAt,
  stillStep,
  VENGEANCE_SUIT,
  watchOn,
  type Pose,
  type Script,
} from '../src/shared/suits'
import { BAT_1989, emblem, OVAL_1989, WINGS } from '../src/shared/emblems'
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

// HOLIDAY's suit (long-halloween.md, section 8, and its built note): the long ears in every pose,
// the jack-o'-lantern only while something needs the user, and the long cape's light and folds on
// the cloth, a gust lifting its hem or not.
describe("HOLIDAY's suit", () => {
  const { poses, watch } = HOLIDAY_SUIT
  const signature = HOLIDAY_SUIT.signature!
  const every = [
    ...poses.sleeping,
    ...poses.flying,
    ...poses.alarmed,
    ...signature.map((step) => step.pose),
    ...watch.map((step) => step.pose),
  ]
  const layers = (p: Pose) => [...p.behind, ...p.front]
  /** The ears: the one shape behind him whose path rises above the frame's top. */
  const ears = (p: Pose) =>
    p.behind.filter((layer) => layer.kind === 'path' && /-0\.9/.test(layer.d) && layer.fill)
  const lantern = (p: Pose) => layers(p).some((layer) => 'fill' in layer && layer.fill === 'var(--signal)')
  /** The lowest point a path reaches (its numbers run x, y). */
  const lowest = (d: string) => Math.max(...(d.match(/-?[\d.]+/g) ?? []).map(Number).filter((_, i) => i % 2))

  it('wears the long ears in every pose', () => {
    for (const p of every) expect(ears(p)).toHaveLength(1)
  })

  it('lights the jack-o-lantern only when alarmed', () => {
    expect(poses.alarmed.every(lantern)).toBe(true)
    expect(every.filter(lantern)).toHaveLength(poses.alarmed.length)
  })

  // The sweep's light along its top and its folds end on its hem, the gust's lifted one too.
  it("keeps the swept cape's light and folds on the cloth", () => {
    for (const p of every) {
      const cape = p.behind.find((layer) => layer.kind === 'cape')
      if (cape?.kind !== 'cape') continue
      const on = p.behind.filter(
        (layer) =>
          layer.kind === 'path' && (layer.className === 'clawd__rib' || layer.fill === 'var(--cowl-shine)'),
      )
      for (const layer of on)
        if (layer.kind === 'path') expect(lowest(layer.d)).toBeLessThanOrEqual(lowest(cape.d))
    }
  })
})

// An oval on his chest, as PALE MOONLIGHT wears it and the Wave 3 Themes will (jury-wave-3.md,
// section 6, item 1): a cowl-black rim, the plate, and the Theme's bat across it.
describe('an oval on his chest', () => {
  const fills = (layers: readonly { fill?: string }[]) => layers.map((layer) => layer.fill)
  const at = { cx: 8, cy: 7, rx: 2.1 }
  const OVAL = { box: { x: 18, y: 0, width: 84, height: 48 }, rim: 2 }

  it('lights in the Alarm color when lit, and rests in the plate color', () => {
    const plate = emblem(WINGS, 'none', OVAL)
    expect(fills(chestPlate(plate, { ...at, lit: true }))).toContain('var(--signal)')
    expect(fills(chestPlate(plate, at))).toEqual(['var(--cowl)', 'var(--emblem-plate)', undefined])
  })

  it('never lights if its plate never does', () => {
    const plate = emblem(WINGS, 'none', { ...OVAL, lights: false })
    expect(fills(chestPlate(plate, { ...at, lit: true }))).toEqual(fills(chestPlate(plate, at)))
  })

  it('has no rim if its plate has none', () => {
    const plate = emblem(WINGS, 'none', { ...OVAL, rim: 0 })
    expect(fills(chestPlate(plate, at))).toEqual(['var(--emblem-plate)', undefined])
  })

  // The bat spans the plate inside its rim as it does on the emblem: a re-trace carries over.
  it("spans the plate as the emblem's bat does", () => {
    const plate = emblem(WINGS, 'none', OVAL)
    const bat = chestPlate(plate, at).at(-1)
    expect(bat).toMatchObject({ kind: 'emblem', cx: 8, cy: 7 })
    expect(bat && 'width' in bat && bat.width).toBeCloseTo((2 * at.rx * plate.bat.width) / (84 - 4))
  })

  it("keeps PALE MOONLIGHT's oval lit only when alarmed", () => {
    const moon = emblem(BAT_1989, 'none', OVAL_1989)
    const lit = (p: Pose) => fills(p.front).includes('var(--signal)')
    expect(PALE_MOONLIGHT_SUIT.poses.alarmed.every(lit)).toBe(true)
    expect(PALE_MOONLIGHT_SUIT.poses.flying.some(lit)).toBe(false)
    expect(fills(PALE_MOONLIGHT_SUIT.poses.alarmed[0].front.slice(0, 4))).toEqual(
      fills(chestPlate(moon, { cx: 8, cy: 6.9, rx: 2.25, lit: true })),
    )
  })
})
