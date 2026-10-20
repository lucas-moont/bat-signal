// A scribbled emblem's strokes (ScribbledBat.tsx): a pencil going up and down across the bat, as
// SERIOUS HOUSE's Signal is drawn on the book's opening page (#123), then a few scratches crossing
// them. Worked out on the bat's own box, so any outline on any grid can wear it, and from a fixed
// seed, so the same bat is scribbled the same way every time.

import { pathNumber } from '@shared/bats'
import type { Box } from '@shared/emblems'
import { clamp } from '@shared/guards'
import { between, seededFrom } from './seeded'

/** One stroke of the pencil: its points on the emblem's grid, its width as a share of the bat's, and how dark it is. */
export interface Stroke {
  points: string
  width: number
  opacity: number
}

/** A pencil's hand: how its zigzags lean, how far apart they turn, and how wide its strokes are, as shares of the bat. */
interface Hand {
  seed: number
  lean: number
  /** The step between turns, in the full sweep and in the passes after it. */
  sweep: number
  pass: number
  passes: number
  width: readonly [number, number]
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

type Range = readonly [number, number]

function scribble(bat: Box, hand: Hand): Stroke[] {
  const random = seededFrom(hand.seed)
  const tall = bat.height / bat.width
  // A run across the box from x to its end, turning between a top and a bottom (shares of the box).
  const run = (x: number, end: Range, top: Range, bottom: Range, step: number) => ({
    x,
    end: x + between(end, random),
    top: between(top, random),
    bottom: between(bottom, random),
    step,
  })
  // First one sweep from end to end, top to bottom, then passes over a stretch of it.
  const runs: ReturnType<typeof run>[] = []
  for (let x = FIRST; x < 1 - FIRST; x += 0.152)
    runs.push(run(x, [0.127, 0.2], [-0.05, 0], [1, 1.05], hand.sweep))
  for (let i = 0; i < hand.passes; i++)
    runs.push(run(between([FIRST, 0.98], random), [0.076, 0.18], [-0.05, 0.35], [0.58, 1.05], hand.pass))
  return runs.map(({ x, end, top, bottom, step }) => {
    const points: string[] = []
    let up = random() < 0.5
    for (let at = x; at < end; at += step * between([0.6, 1.4], random), up = !up) {
      const y = up ? top + between([-0.04, 0.08], random) : bottom + between([-0.08, 0.04], random)
      // The lean tips each stroke; its stray past the box is held to the share.
      const across = clamp(at + (y - 0.5) * hand.lean * tall, -STRAY, 1 + STRAY)
      const down = clamp(y, -STRAY / tall, 1 + STRAY / tall)
      points.push(`${pathNumber(bat.x + across * bat.width)},${pathNumber(bat.y + down * bat.height)}`)
    }
    return {
      points: points.join(' '),
      width: between(hand.width, random),
      opacity: between([0.55, 0.95], random),
    }
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
