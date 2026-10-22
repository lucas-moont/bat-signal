// A scribbled emblem's strokes (ScribbledBat.tsx): a pencil going up and down across the bat, as
// SERIOUS HOUSE's bat is drawn on the book's opening page (#123), then a few scratches crossing
// them. Worked out on the bat's own box, so any outline on any grid can wear it, and from a fixed
// seed, so the same bat is scribbled the same way every time.

import { pathNumber } from '@shared/bats'
import type { Box } from '@shared/emblems'
import { clamp } from '@shared/guards'
import { between, type Range, seededFrom } from './seeded'

/** One stroke of the pencil: its points on the emblem's grid, its width as a share of the bat's, and how dark it is. */
export interface Stroke {
  points: string
  width: number
  opacity: number
}

/** A pencil's hand: its seed, and the rest as shares of the bat's box. */
interface Hand {
  seed: number
  /** How far its zigzags lean, across for each step down. */
  lean: number
  /** How far apart its zigzags turn in the sweep, and in the passes after it. */
  sweep: number
  pass: number
  /** How many passes it makes after the sweep. */
  passes: number
  /** How wide its strokes are. */
  width: Range
}

/** The up-and-down strokes, nearly upright, then the scratches crossing them, finer. */
const HANDS: readonly Hand[] = [
  { seed: 0.61, lean: 0.12, sweep: 0.028, pass: 0.02, passes: 12, width: [0.0032, 0.0063] },
  { seed: 0.21, lean: -0.9, sweep: 0.045, pass: 0.032, passes: 14, width: [0.0023, 0.0044] },
]

/** How far a zigzag strays past the bat's box, as a share of its width: enough to reach every tip. */
const STRAY = 0.05
/** Where the runs start, a little inside the stray. */
const FIRST = -STRAY * 0.9

/** A run's shape, as shares of the box: how far it reaches, and where its top and bottom turns fall. */
interface Shape {
  reach: Range
  top: Range
  bottom: Range
}

/** The sweep: a run every so often from end to end, each from the top of the bat to its bottom. */
const SWEEP: Shape & { gap: number } = { gap: 0.152, reach: [0.127, 0.2], top: [-0.05, 0], bottom: [1, 1.05] }
/** The passes after it: shorter, anywhere along the bat, some turning short of its top or bottom. */
const PASS: Shape = { reach: [0.076, 0.18], top: [-0.05, 0.35], bottom: [0.58, 1.05] }
/** How far each turn wanders from its run's top or bottom, and each step from the hand's. */
const WANDER: Record<'top' | 'bottom' | 'step', Range> = {
  top: [-0.04, 0.08],
  bottom: [-0.08, 0.04],
  step: [0.6, 1.4],
}
/** How dark a stroke is. */
const OPACITY: Range = [0.55, 0.95]

function scribble(bat: Box, hand: Hand): Stroke[] {
  const random = seededFrom(hand.seed)
  const tall = bat.height / bat.width
  // A run across the box from x, of a shape, turning a step apart.
  const run = (x: number, shape: Shape, step: number) => ({
    x,
    end: x + between(shape.reach, random),
    top: between(shape.top, random),
    bottom: between(shape.bottom, random),
    step,
  })
  // First one sweep from end to end, top to bottom, then passes over a stretch of it.
  const runs: ReturnType<typeof run>[] = []
  for (let x = FIRST; x < 1 - FIRST; x += SWEEP.gap) runs.push(run(x, SWEEP, hand.sweep))
  for (let i = 0; i < hand.passes; i++) runs.push(run(between([FIRST, 0.98], random), PASS, hand.pass))
  return runs.map(({ x, end, top, bottom, step }) => {
    const points: string[] = []
    let up = random() < 0.5
    for (let at = x; at < end; at += step * between(WANDER.step, random), up = !up) {
      const y = up ? top + between(WANDER.top, random) : bottom + between(WANDER.bottom, random)
      // The lean tips each stroke; its stray past the box is held to the share.
      const across = clamp(at + (y - 0.5) * hand.lean * tall, -STRAY, 1 + STRAY)
      const down = clamp(y, -STRAY / tall, 1 + STRAY / tall)
      points.push(`${pathNumber(bat.x + across * bat.width)},${pathNumber(bat.y + down * bat.height)}`)
    }
    return { points: points.join(' '), width: between(hand.width, random), opacity: between(OPACITY, random) }
  })
}

const drawn = new WeakMap<Box, Stroke[]>()

/** A bat's strokes, worked out once for it. */
export function strokesOf(bat: Box): Stroke[] {
  let strokes = drawn.get(bat)
  if (!strokes) {
    strokes = HANDS.flatMap((hand) => scribble(bat, hand))
    drawn.set(bat, strokes)
  }
  return strokes
}
