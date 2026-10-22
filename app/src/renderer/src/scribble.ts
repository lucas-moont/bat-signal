// A scribbled emblem's strokes (ScribbledBat.tsx): a pencil going up and down across the bat, as
// SERIOUS HOUSE's bat is drawn on the book's opening page (#123), then scratches crossing them. The
// hand aims each turn at the bat's edge and misses it, now short, now well past, and presses harder
// on the head and on one wing than on the other; nothing cuts the strokes to the shape. Worked out
// on the bat's own outline, so any emblem can wear it, and from a fixed seed, so the same bat is
// scribbled the same way every time.

import { type Outline, pathNumber } from '@shared/bats'
import type { Emblem } from '@shared/emblems'
import { between, type Range, seededFrom } from './seeded'

/** One stroke of the pencil: its points on the emblem's grid, its width as a share of the bat's, and how dark it is. */
export interface Stroke {
  points: string
  width: number
  opacity: number
}

type Point = Outline[number]

/** The pencil's measure: an eightieth of the bat's width. Every length below is in it. */
const UNITS = 80

/**
 * Where a hand presses harder: the middle of the stretch (a share of the bat's width), how far
 * either side it reaches, and how many passes more it makes there.
 */
interface Press {
  at: number
  reach: number
  passes: number
}

/** A pencil's hand. */
interface Hand {
  seed: number
  /** How far its strokes lean, across for each step down. */
  lean: number
  /** How far apart its turns are, before each run spaces them out. */
  step: number
  /** How many passes it makes after the sweep, anywhere along the bat. */
  passes: number
  /** How wide its strokes are. */
  width: Range
  /** How it misses an edge it aims at: how widely about it, how often well past it, and how far. */
  miss: { spread: number; past: number; far: number }
  /** How many long scratches it claws right across the bat, out past both edges. */
  slashes: number
  presses: readonly Press[]
}

/**
 * The up-and-down strokes, nearly upright, then the scratches crossing them, finer and wilder;
 * both darkest on the head, heavy on the left wing, light on the right but for its tip (picked on
 * screen, #123).
 */
const HANDS: readonly Hand[] = [
  {
    seed: 0.61,
    lean: 0.12,
    step: 1,
    passes: 12,
    width: [0.25, 0.5],
    miss: { spread: 0.5, past: 0.22, far: 2.5 },
    slashes: 3,
    presses: [
      { at: 0.5, reach: 7, passes: 12 },
      { at: 0.12, reach: 9, passes: 7 },
      { at: 0.96, reach: 3, passes: 2 },
    ],
  },
  {
    seed: 0.21,
    lean: -0.9,
    step: 1.6,
    passes: 14,
    width: [0.18, 0.35],
    miss: { spread: 0.7, past: 0.35, far: 5.5 },
    slashes: 2,
    presses: [
      { at: 0.5, reach: 7, passes: 5 },
      { at: 0.12, reach: 9, passes: 3 },
    ],
  },
]

/** A turn well past its edge lands at least this far past it. */
const WELL_PAST = 0.8
/** How often a turn falls short of its edge, and by how much. */
const SHORT = { odds: 0.08, by: [0.5, 2.2] as Range }
/** How far each step strays from the hand's, and a turn not aimed at an edge from its mark. */
const WANDER = { step: [0.6, 1.4] as Range, turn: [-1, 1] as Range }
/** A piece of the bat narrower than this is left alone. */
const NARROWEST = 0.4
/**
 * Where runs start: the sweep's one every `gap`, from `out` before the bat to `out` past it; a pass's
 * anywhere from `before` the bat to `short` of its far end.
 */
const STARTS = { out: 4, gap: 12, before: 3, short: 2 }
/** How closely a press's passes gather about its middle, as a share of its reach. */
const GATHER = 0.6
/** How dark a stroke is where the hand presses harder, and elsewhere; and how much wider it is there. */
const PRESSED: Range = [0.82, 1]
const LIGHT: Range = [0.25, 0.7]
const PRESSED_WIDTH = 1.15
/**
 * A long scratch: how much wider than the hand's strokes and how dark; how far in from the bat's
 * ends it may cross; how far past the bat it runs either side; how its middle sags, and its ends wander.
 */
const SLASH = {
  widen: 1.3,
  dark: [0.7, 0.95] as Range,
  inset: 8,
  past: [3, 8] as Range,
  sag: [-2, 2] as Range,
  wander: [-0.6, 0.6] as Range,
}

/**
 * A run's shape: how far it reaches; where its top and bottom turns fall, as shares of the bat's
 * height there (an edge, 0 or 1, is aimed at and missed); and how far apart its turns are, in steps.
 */
interface Shape {
  reach: Range
  top: (random: () => number) => number
  bottom: (random: () => number) => number
  spacing: number
}

/** First one sweep from end to end, then passes over stretches of it, then more where the hand presses. */
const SWEEP: Shape = { reach: [10, 16], top: () => 0, bottom: () => 1, spacing: 2.2 }
const PASS: Shape = {
  reach: [6, 14],
  top: (random) => (random() < 0.5 ? 0 : between([0, 0.35], random)),
  bottom: (random) => (random() < 0.5 ? 1 : between([0.58, 1], random)),
  spacing: 1.6,
}
const PRESS: Shape = {
  reach: [4, 9],
  top: (random) => (random() < 2 / 3 ? 0 : between([0, 0.3], random)),
  bottom: () => 1,
  spacing: 1.9,
}

/** A run across the bat from one line to another, and whether the hand presses harder over it. */
interface Run {
  from: number
  end: number
  top: number
  bottom: number
  spacing: number
  pressed: boolean
}

/** A curve's point `t` of the way along it (de Casteljau's). */
function along(points: readonly Point[], t: number): Point {
  let at = points
  while (at.length > 1)
    at = at
      .slice(1)
      .map(([x, y], i): Point => [at[i]![0] + (x - at[i]![0]) * t, at[i]![1] + (y - at[i]![1]) * t])
  return at[0]!
}

/** How many straight runs a curve is flattened into. */
const CURVE_STEPS = 12

/** An outline's edges, its curves flattened to short straight runs, and each shape closed, as SVG fills it. */
function edgesOf(path: string): (readonly [Point, Point])[] {
  const tokens = path.match(/[A-Za-z]|-?[\d.]+/g) ?? []
  const edges: (readonly [Point, Point])[] = []
  let start: Point = [0, 0]
  let at: Point = [0, 0]
  const to = (next: Point) => {
    edges.push([at, next])
    at = next
  }
  const close = () => {
    if (at[0] !== start[0] || at[1] !== start[1]) to(start)
  }
  for (let i = 0; i < tokens.length;) {
    const command = tokens[i++]
    const read = (): Point => [Number(tokens[i++]), Number(tokens[i++])]
    if (command === 'M') {
      close()
      start = at = read()
    } else if (command === 'L') to(read())
    else if (command === 'Q' || command === 'C') {
      const curve = [at, ...(command === 'Q' ? [read(), read()] : [read(), read(), read()])]
      for (let k = 1; k <= CURVE_STEPS; k++) to(along(curve, k / CURVE_STEPS))
    } else if (command === 'Z') close()
    else throw new Error(`An emblem's outline can't be scribbled: ${command} is not M, L, Q, C or Z`)
  }
  close()
  return edges
}

/** A number about 0, spread as a hand's errors are (Box and Muller's). */
const wavering = (random: () => number) =>
  Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random())

function scribble({ path, bat }: Emblem, hand: Hand): Stroke[] {
  const random = seededFrom(hand.seed)
  const unit = bat.width / UNITS
  const middle = bat.y + bat.height / 2
  const edges = edgesOf(path)
  // A line leaning as the hand does is named by where it crosses the bat's middle height, u.
  const toX = (u: number, y: number) => u + (y - middle) * hand.lean
  const toU = ([x, y]: Point) => x - (y - middle) * hand.lean
  // Where line u runs inside the bat, top to bottom.
  const spans = (u: number): Range[] => {
    const ys: number[] = []
    for (const [a, b] of edges) {
      const [au, bu] = [toU(a), toU(b)]
      if ((au <= u && u < bu) || (bu <= u && u < au)) ys.push(a[1] + ((u - au) / (bu - au)) * (b[1] - a[1]))
    }
    ys.sort((a, b) => a - b)
    return ys.flatMap((y, i) => (i % 2 ? [] : [[y, ys[i + 1]!] as const]))
  }
  // How far past an edge a turn aimed at it lands (short of it, below 0).
  const miss = () => {
    const roll = random()
    if (roll < hand.miss.past) return between([WELL_PAST, hand.miss.far], random) * unit
    if (roll < hand.miss.past + SHORT.odds) return -between(SHORT.by, random) * unit
    return wavering(random) * hand.miss.spread * unit
  }
  const pressedAt = (u: number, end: number) =>
    hand.presses.some(({ at, reach }) => Math.abs((u + end) / 2 - (bat.x + at * bat.width)) < reach * unit)
  const run = (from: number, { reach, top, bottom, spacing }: Shape, pressed?: boolean): Run => {
    const end = from + between(reach, random) * unit
    return {
      from,
      end,
      top: top(random),
      bottom: bottom(random),
      spacing,
      pressed: pressed ?? pressedAt(from, end),
    }
  }

  // The sweep, the passes, and the presses' passes, each centred on a point about its stretch's middle.
  const runs: Run[] = []
  const { out, gap, before, short } = STARTS
  for (let u = bat.x - out * unit; u < bat.x + bat.width + out * unit; u += gap * unit)
    runs.push(run(u, SWEEP))
  for (let i = 0; i < hand.passes; i++)
    runs.push(run(between([bat.x - before * unit, bat.x + bat.width - short * unit], random), PASS))
  for (const { at, reach, passes } of hand.presses)
    for (let i = 0; i < passes; i++) {
      const centre = bat.x + at * bat.width + wavering(random) * reach * GATHER * unit
      const pass = run(centre, PRESS, true)
      const half = (pass.end - pass.from) / 2
      runs.push({ ...pass, from: pass.from - half, end: pass.end - half })
    }

  const strokes: Stroke[] = []
  const draw = (points: string[], pressed: boolean, widen = 1, dark = pressed ? PRESSED : LIGHT) => {
    if (points.length > 1)
      strokes.push({
        points: points.join(' '),
        width: (between(hand.width, random) * widen * (pressed ? PRESSED_WIDTH : 1)) / UNITS,
        opacity: between(dark, random),
      })
  }
  for (const { from, end, top, bottom, spacing, pressed } of runs) {
    // One track for each piece of the bat the line crosses (a wing, and a tip below it), each
    // zigzagging on its own; where a piece ends, the pencil lifts.
    let tracks: { points: string[]; span: Range; up: boolean }[] = []
    for (let u = from; u < end; u += hand.step * spacing * between(WANDER.step, random) * unit) {
      const kept: typeof tracks = []
      for (const [a, b] of spans(u)) {
        if (b - a < NARROWEST * unit) continue
        const track = tracks.find((t) => !kept.includes(t) && t.span[0] < b && a < t.span[1]) ?? {
          points: [],
          span: [a, b],
          up: random() < 0.5,
        }
        track.span = [a, b] // where its piece of the bat runs now
        const y = track.up
          ? a + top * (b - a) - (top === 0 ? miss() : between(WANDER.turn, random) * unit)
          : a + bottom * (b - a) + (bottom === 1 ? miss() : between(WANDER.turn, random) * unit)
        track.points.push(`${pathNumber(toX(u, y))},${pathNumber(y)}`)
        track.up = !track.up
        kept.push(track)
      }
      for (const track of tracks) if (!kept.includes(track)) draw(track.points, pressed)
      tracks = kept
    }
    for (const track of tracks) draw(track.points, pressed)
  }

  // A few long scratches clawed right across, leaving the bat on both sides.
  for (let i = 0; i < hand.slashes; i++) {
    const u = between([bat.x + SLASH.inset * unit, bat.x + bat.width - SLASH.inset * unit], random)
    const widest = spans(u).reduce<Range | undefined>(
      (w, s) => (!w || s[1] - s[0] > w[1] - w[0] ? s : w),
      undefined,
    )
    if (!widest) continue
    const top = widest[0] - between(SLASH.past, random) * unit
    const bottom = widest[1] + between(SLASH.past, random) * unit
    const ys = [top, (top + bottom) / 2 + between(SLASH.sag, random) * unit, bottom]
    const points = ys.map(
      (y) => `${pathNumber(toX(u, y) + between(SLASH.wander, random) * unit)},${pathNumber(y)}`,
    )
    draw(points, false, SLASH.widen, SLASH.dark)
  }
  return strokes
}

const drawn = new WeakMap<Emblem, Stroke[]>()

/** An emblem's strokes, worked out once for it. */
export function strokesOf(emblem: Emblem): Stroke[] {
  let strokes = drawn.get(emblem)
  if (!strokes) {
    strokes = HANDS.flatMap((hand) => scribble(emblem, hand))
    drawn.set(emblem, strokes)
  }
  return strokes
}
