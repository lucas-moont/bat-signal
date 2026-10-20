// A scribbled emblem's strokes (BatEmblem.tsx): a pencil going up and down across the bat, as SERIOUS
// HOUSE's Signal is drawn on the book's opening page (#123), then a few scratches crossing them.
// Worked out on the bat's own box, so any outline on any grid can wear it, and from a fixed seed,
// so the same bat is scribbled the same way every time.

import type { Box, Emblem } from '@shared/emblems'
import { seededFrom } from './painters'

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
export const STRAY = 0.05

function scribble(bat: Box, hand: Hand): Stroke[] {
  const random = seededFrom(hand.seed)
  const between = (lo: number, hi: number) => lo + random() * (hi - lo)
  const tall = bat.height / bat.width
  // Runs across the box, each from x to its end, turning between a top and a bottom (shares of the
  // box): first one sweep from end to end, top to bottom, then passes over a stretch of it.
  const runs: { x: number; end: number; top: number; bottom: number; step: number }[] = []
  for (let x = -STRAY * 0.9; x < 1 + STRAY * 0.9; x += 0.152)
    runs.push({
      x,
      end: x + between(0.127, 0.2),
      top: between(-0.05, 0),
      bottom: between(1, 1.05),
      step: hand.sweep,
    })
  for (let i = 0; i < hand.passes; i++) {
    const x = between(-STRAY * 0.9, 0.98)
    runs.push({
      x,
      end: x + between(0.076, 0.18),
      top: between(-0.05, 0.35),
      bottom: between(0.58, 1.05),
      step: hand.pass,
    })
  }
  return runs.map(({ x, end, top, bottom, step }) => {
    const points: string[] = []
    let up = random() < 0.5
    for (let at = x; at < end; at += step * between(0.6, 1.4), up = !up) {
      const y = up ? top + between(-0.04, 0.08) : bottom + between(-0.08, 0.04)
      // The lean tips each stroke; its stray past the box is held to the share.
      const across = Math.min(Math.max(at + (y - 0.5) * hand.lean * tall, -STRAY), 1 + STRAY)
      const down = Math.min(Math.max(y, -STRAY / tall), 1 + STRAY / tall)
      points.push(`${(bat.x + across * bat.width).toFixed(2)},${(bat.y + down * bat.height).toFixed(2)}`)
    }
    return { points: points.join(' '), width: between(...hand.width), opacity: between(0.55, 0.95) }
  })
}

const drawn = new WeakMap<Emblem, Stroke[]>()

/** An emblem's strokes, worked out once for it. */
export function strokesOf(emblem: Emblem): Stroke[] {
  let strokes = drawn.get(emblem)
  if (!strokes) {
    strokes = HANDS.flatMap((hand) => scribble(emblem.bat, hand))
    drawn.set(emblem, strokes)
  }
  return strokes
}
