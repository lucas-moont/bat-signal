// Bat-Clawd's suit per Theme, as data: the outfit maps (shared/outfits.ts) for his body and cowl,
// the layers drawn behind and in front of them (the cape, the cowl's edge, the chest emblem, and
// details under a grid cell), the Poses of each Mood, his watch on the perch and, if the Theme has
// one, his Signature pose. Every Theme keeps Clawd's shape, white eyes, orange jaw and three Moods
// (CONTEXT.md, Bat-Clawd); the Bat-Clawd Costume Rule is in DESIGN.md.
import type { OutfitMap } from './outfits'
import type { MascotMood } from './view'

/** A rect on his 28x13 sprite: x, y, width and height in grid units (1 by default). */
export type Px = readonly [x: number, y: number, w?: number, h?: number]

/**
 * Something drawn around the map. The class names (BatClawd.css) give paths and rects their suit
 * variables (--cape, --cape-rim, --thread, --cowl-edge, --chest), so a Theme's stylesheet colors them.
 */
export type Layer =
  /** A path; mirrored, it is drawn again flipped across his middle (a cape's two open halves). */
  | { kind: 'path'; d: string; className: string; mirrored?: boolean }
  /** Rects in one color, or in a class's. */
  | { kind: 'rects'; px: readonly Px[]; fill?: string; className?: string }
  /** The Theme's emblem across his chest, centred on (cx, cy), `width` units wide. */
  | { kind: 'emblem'; cx: number; cy: number; width: number }

/** How he is drawn in a Mood or a moment. */
export interface Pose {
  /** The outfit map that draws his body and cowl in this pose. */
  map: OutfitMap
  behind: readonly Layer[]
  front: readonly Layer[]
  eyes: 'open' | 'shut'
  /** Always white (or a dimmer white, mid-blink): the Costume Rule keeps his eyes. */
  eyeColor: string
}

/** A Mood's poses; the first is the resting one. */
export type Poses = readonly [Pose, ...Pose[]]

/** One step of a script on the shared clock: a pose, and where his eyes look along the street. */
export interface Step {
  pose: Pose
  look: number
  /** A nudge on top of the pose for this step (a footstep down, say). */
  transform?: string
}

/** How far his eyes may slide toward the pointer, or glance along the street, in grid units. */
export const GAZE = 0.6

/** A script of steps, at least one. */
export type Script = readonly [Step, ...Step[]]

export interface Suit {
  eyes: { open: readonly Px[]; shut: readonly Px[] }
  poses: Readonly<Record<MascotMood, Poses>>
  /** His watch on the perch, one step a second, while nothing needs the user. */
  watch: Script
  /**
   * The Theme's most iconic Pose (CONTEXT.md, Signature pose), revealed in steps on the shared
   * clock and then held: on the perch in place of the watch, in the intro, and on a click in place
   * of the hop. A Theme without one keeps the watch and the hop.
   */
  signature?: Script
  /**
   * A glow in the Theme's Alarm color around him (CONTEXT.md, Aura), only while something needs
   * the user or while he reveals his Signature pose. What it costs is in DESIGN.md (Bat-Clawd).
   */
  aura?: boolean
}

/** A script's step at an index: its steps in order, then the last held (Infinity: the final frame). */
export const scriptAt = (steps: Script, index: number): Step =>
  steps[Math.min(index, steps.length - 1)] ?? steps[0]

// --- VENGEANCE: today's Bat-Clawd, a black cowl edged in red and a black cape with a red rim. ---

const BODY = 'var(--clawd)'
const SHADE = 'var(--clawd-shade)'
const LEGEND = { '#': BODY, s: SHADE, c: 'var(--cowl)', h: 'var(--cowl-shine)' }

/** Each unit row twice: the grid at half-row resolution. */
const twice = (rows: readonly string[]) => rows.flatMap((row) => [row, row])

/** The cowl down to the cheekbones, with its shine and two ear tips. */
const COWL_ROWS = [
  '....c......c....',
  '....chhccccc....',
  '...cccccccccc...',
  '...cccccccccc...',
  '...cccccccccc...',
]
const TORSO = '...##########...'

/** Awake: arms out at his sides and four legs. */
const AWAKE: OutfitMap = {
  top: 0,
  rows: twice([
    ...COWL_ROWS,
    TORSO,
    '.##############.',
    TORSO,
    TORSO,
    '....s.s..s.s....',
    '....s.s..s.s....',
  ]),
  legend: LEGEND,
}
/** Sitting, wrapped in the cape: no arms, and his feet are drawn under the hem. */
const SEATED: OutfitMap = { top: 0, rows: twice([...COWL_ROWS, TORSO, TORSO, TORSO, TORSO]), legend: LEGEND }

/** The cape hangs from the shoulders (y = 5) and ends in a jagged, bat-like hem. */
const CAPE = {
  /** Closed around the body, in front of it: asleep. */
  wrapped: 'M2.6 6.4 L13.4 6.4 L14.2 10.4 L12.2 9.9 L10 10.5 L8 10 L6 10.5 L3.8 9.9 L1.8 10.4 Z',
  /** Streaming back while flying, in two frames of the same flutter. */
  trailA: 'M3 5 L13 5 L13.4 9.2 L11 10.4 L7 10 L3 10.8 L-1 10 L-4.6 10.8 L-3.6 8.8 L-5.6 7.4 L-1.4 6.6 Z',
  trailB:
    'M3 5 L13 5 L13.6 8.6 L11.2 10 L7.2 10.6 L3.2 10.2 L-0.6 10.9 L-4.2 9.6 L-3 8.2 L-5 5.8 L-1.2 5.9 Z',
  /** Flung back and hanging open (left half; mirrored for the right), black inside too. */
  openLeft: 'M3.4 5 L0.2 5.2 L-2.8 11.2 L-1.2 10.5 L0.4 11.3 L1.9 10.6 L3.4 11.2 Z',
  /**
   * A red thread following the jagged hem a step above it, with black between: far enough from
   * the edge to read on its own at the header's size.
   */
  threadLeft: 'M-2 10.1 L-1.1 9.5 L0.4 10.2 L1.9 9.6 L3.4 10.1',
}

/** The cowl's outline (ears, crown and sides), behind the face, so only its outer edge shows. */
const COWL_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 2 L4 2 L4 0 L5 0 L5 1 L11 1 L11 0 L12 0 L12 2 L13 2 L13 5 Z',
  className: 'clawd__cowl-edge',
}
const CHEST: Layer = { kind: 'emblem', cx: 8, cy: 7, width: 7 }
const behindWith = (d: string): Layer[] => [{ kind: 'path', d, className: 'clawd__cape' }, COWL_EDGE]

const EYE = 'var(--clawd-eye)'
const EYE_DIM = 'var(--clawd-eye-dim)'
const awake = (behind: Layer[], eyeColor = EYE): Pose => ({
  map: AWAKE,
  behind,
  front: [CHEST],
  eyes: 'open',
  eyeColor,
})
const open: Layer[] = [
  { kind: 'path', d: CAPE.openLeft, className: 'clawd__cape', mirrored: true },
  { kind: 'path', d: CAPE.threadLeft, className: 'clawd__thread', mirrored: true },
  COWL_EDGE,
]
const flyingA = awake(behindWith(CAPE.trailA))
const flyingB = awake(behindWith(CAPE.trailB))

/** Mostly still, then a gust lifts the cape and he glances along the street: four changes in twelve seconds. */
const STILL: Step = { pose: flyingA, look: 0 }

export const VENGEANCE_SUIT: Suit = {
  eyes: {
    open: [
      [5, 3, 2, 1],
      [9, 3, 2, 1],
    ],
    shut: [
      [5, 3.6, 2, 0.3],
      [9, 3.6, 2, 0.3],
    ],
  },
  poses: {
    sleeping: [
      {
        map: SEATED,
        behind: [COWL_EDGE],
        front: [
          {
            kind: 'rects',
            px: [
              [4.5, 10.2, 2, 0.8],
              [9.5, 10.2, 2, 0.8],
            ],
            fill: SHADE,
          },
          { kind: 'path', d: CAPE.wrapped, className: 'clawd__cape' },
          { kind: 'rects', px: [[7.85, 8.4, 0.3, 1.6]], className: 'clawd__seam' },
          // Only the hands holding the cape shut show, in front of it.
          {
            kind: 'rects',
            px: [
              [6.9, 7.6, 1, 0.8],
              [8.1, 7.6, 1, 0.8],
            ],
            fill: BODY,
          },
        ],
        eyes: 'shut',
        eyeColor: EYE,
      },
    ],
    flying: [flyingA, flyingB],
    alarmed: [awake(open), awake(open, EYE_DIM)],
  },
  watch: [
    STILL,
    ...Array<Step>(5).fill(STILL),
    { pose: flyingB, look: 0 },
    STILL,
    { pose: flyingA, look: -GAZE },
    { pose: flyingA, look: -GAZE },
    STILL,
    STILL,
  ],
}
