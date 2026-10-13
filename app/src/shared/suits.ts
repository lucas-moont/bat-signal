// Bat-Clawd's suit per Theme, as data: the outfit maps (shared/outfits.ts) for his body and cowl,
// the layers drawn behind and in front of them (the cape, the cowl's edge, the chest emblem, and
// details under a grid cell), the Poses of each Mood, his watch on the perch and, if the Theme has
// one, his Signature pose. Every Theme keeps Clawd's shape, white eyes, orange jaw and three Moods
// (CONTEXT.md, Bat-Clawd); the Bat-Clawd Costume Rule is in DESIGN.md.
import type { OutfitMap } from './outfits'
import type { MascotMood } from './view'

/** A rect on his 16x11 grid (layers may reach past it): x, y, width and height in units (1 by default). */
export type Px = readonly [x: number, y: number, w?: number, h?: number]

/**
 * Something drawn around the map. The class names (BatClawd.css) give paths and rects their suit
 * variables (--cape, --cape-rim, --thread, --cowl-edge, --chest), so a Theme's stylesheet colors them.
 */
export type Layer =
  /**
   * A path in one color, or in a class's; mirrored, it is drawn again flipped across his middle (a
   * cape's two open halves).
   */
  | { kind: 'path'; d: string; fill?: string; className?: string; mirrored?: boolean }
  /** Rects in one color, or in a class's. */
  | { kind: 'rects'; px: readonly Px[]; fill?: string; className?: string }
  /** The Theme's emblem across his chest, centred on (cx, cy), `width` units wide. */
  | { kind: 'emblem'; cx: number; cy: number; width: number }
  /**
   * A cape behind him (the Costume Rule): its cloth, with its rim cut away over his body (BODY_BOX)
   * so it reads as behind him. Mirrored like a path.
   */
  | { kind: 'cape'; d: string; mirrored?: boolean }

/** His body below the cowl, where a cape behind him shows no rim: x, y, width and height. */
export const BODY_BOX = [3, 5, 10, 7] as const

/** How he is drawn in a Mood or a moment. */
export interface Pose {
  /** The outfit map that draws his body and cowl in this pose. */
  map: OutfitMap
  behind: readonly Layer[]
  front: readonly Layer[]
  eyes: 'open' | 'shut'
  /** A nudge on top of the Mood's motion while this pose shows (a wingsuit banking). */
  transform?: string
}

/** A Mood's poses, shown one a frame in turn (BatClawd.tsx, moodFrame); the first is the resting one. */
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
   * The Theme's Alarm color around him (CONTEXT.md, Aura), only while something needs
   * the user or while he reveals his Signature pose. What it costs is in DESIGN.md (Bat-Clawd).
   */
  aura?: boolean
}

/** A script's step at an index: its steps in order, then the last held (Infinity: the final step). */
export const scriptAt = (steps: Script, index: number): Step =>
  steps[Math.min(index, steps.length - 1)] ?? steps[0]

/** The suit's still portrait: its Signature pose's final step, or flying without one. */
export const stillStep = (suit: Suit): Step =>
  suit.signature ? scriptAt(suit.signature, Infinity) : { pose: suit.poses.flying[0], look: 0 }

// --- VENGEANCE: outfit V (#95). A charcoal suit with dark gloves, belt and boots, the cowl down to
// his eyes and Clawd's orange as his jaw, a faint bone rim on cowl and cape; red only as his aura
// and the flare he raises when something needs the user (the-batman-2022.md, section 5). ---

const LEGEND = {
  '#': 'var(--clawd)',
  c: 'var(--cowl)',
  h: 'var(--cowl-shine)',
  S: 'var(--suit)',
  g: 'var(--gloves)',
  b: 'var(--belt)',
  k: 'var(--buckle)',
}

/** Each unit row twice: the grid at half-row resolution. */
const twice = (rows: readonly string[]) => rows.flatMap((row) => [row, row])

/** The cowl down to his eyes, with its shine and two ear tips, and Clawd's orange as his jaw. */
const HEAD = twice([
  '....c......c....',
  '....chhccccc....',
  '...cccccccccc...',
  '...cccccccccc...',
  '...cc######cc...',
])
const SUIT = '...SSSSSSSSSS...'
/** The belt and its buckle, then the suit's last half-row and his four booted legs. */
const BELOW_WAIST = [
  '...bbbbkkbbbb...',
  SUIT,
  '....S.S..S.S....',
  '....g.g..g.g....',
  ...twice(['....g.g..g.g....']),
]
const map = (chest: readonly string[], rows = BELOW_WAIST): OutfitMap => ({
  top: 0,
  rows: [...HEAD, ...twice(chest), ...rows],
  legend: LEGEND,
})

/** No arms on the grid: held straight out past it (the wingsuit) or hidden under a draped cape. */
const ARMS_AWAY = map([SUIT, SUIT, SUIT])
/** The left arm out, the right one raised (drawn beside the map, past the grid's top). */
const RIGHT_ARM_UP = map([SUIT, '.gSSSSSSSSSSS...', SUIT])
/** Sitting, wrapped in the cape: his feet are drawn under the hem. */
const SEATED = map([SUIT, SUIT, SUIT, SUIT], [])

/** The cape hangs from the shoulders (y = 5) and ends in a jagged, bat-like hem. */
const CAPE = {
  /** Closed around the body, in front of it: asleep. */
  wrapped: 'M2.6 6.4 L13.4 6.4 L14.2 10.4 L12.2 9.9 L10 10.5 L8 10 L6 10.5 L3.8 9.9 L1.8 10.4 Z',
  /** Spread from wrist to ankle (left half; mirrored for the right): the wingsuit glide. */
  wingLeft: 'M3 5 L-3 5.5 L-2.4 7.2 L-1.2 7 L-0.8 8.6 L0.6 8.2 L1.2 9.8 L3 9.6 Z',
  /** The wingsuit's ribs, from the shoulder to the hem's points. */
  ribsLeft: 'M3 5.4 L-2.4 7.2 M3 5.4 L-0.8 8.6',
  /** Flung back and hanging open (left half; mirrored for the right). */
  openLeft: 'M3.4 5 L0.2 5.2 L-2.8 11.2 L-1.2 10.5 L0.4 11.3 L1.9 10.6 L3.4 11.2 Z',
  /** Its back, hanging behind him when it is open: cloth in the gaps between his legs. */
  back: 'M3.4 5 L12.6 5 L12.6 11.4 L3.4 11.4 Z',
  /** Draped from the shoulders over his arms (left half; mirrored for the right). */
  drapedLeft: 'M3 5 L1.6 5.4 L1.2 10.8 L3.2 10.6 Z',
}

/** The cowl's outline (ears, crown and sides), behind the face, so only its outer edge shows. */
const COWL_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 2 L4 2 L4 0 L5 0 L5 1 L11 1 L11 0 L12 0 L12 2 L13 2 L13 5 Z',
  className: 'clawd__cowl-edge',
}
const CHEST: Layer = { kind: 'emblem', cx: 8, cy: 7, width: 7 }
const BACK: Layer = { kind: 'path', d: CAPE.back, className: 'clawd__cape-cloth' }
const pose = (map: OutfitMap, behind: Layer[], front: Layer[] = []): Pose => ({
  map,
  behind: [...behind, COWL_EDGE],
  front: [CHEST, ...front],
  eyes: 'open',
})

/** The wingsuit glide (flying): arms straight out to the gloves, the cape spread under them. */
const glide = pose(
  ARMS_AWAY,
  [
    { kind: 'cape', d: CAPE.wingLeft, mirrored: true },
    { kind: 'path', d: CAPE.ribsLeft, className: 'clawd__rib', mirrored: true },
  ],
  [
    {
      kind: 'rects',
      px: [
        [0, 5.5, 3, 1],
        [13, 5.5, 3, 1],
      ],
      fill: 'var(--suit)',
    },
    {
      kind: 'rects',
      px: [
        [-1, 5.5, 1, 1],
        [16, 5.5, 1, 1],
      ],
      fill: 'var(--gloves)',
    },
  ],
)

/** The raised flare (alarmed), from the flooded arena: the cape open, a red light held up. */
const flare = (flame: Px, fill: string) =>
  pose(
    RIGHT_ARM_UP,
    [
      BACK,
      { kind: 'cape', d: CAPE.openLeft, mirrored: true },
      {
        kind: 'path',
        d: 'M11.9 -0.5 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0',
        fill: 'var(--signal-glow)',
      },
    ],
    [
      { kind: 'rects', px: [[13, 3, 1, 3]], fill: 'var(--suit)' },
      { kind: 'rects', px: [[13, 2, 1, 1]], fill: 'var(--gloves)' },
      { kind: 'rects', px: [[13.25, 0, 0.5, 2]], fill: 'var(--ash)' },
      { kind: 'rects', px: [flame], fill },
    ],
  )

/** Out of the dark: his shadow, from y down to his feet. It covers his body and never the air. */
const shadowFrom = (y: number): Layer => ({
  kind: 'path',
  d: y < 9 ? `M3 ${y} H13 V9 H12.6 V11 H3.4 V9 H3 Z` : `M3.4 ${y} H12.6 V11 H3.4 Z`,
  fill: 'var(--clawd-shadow)',
})
const draped = (shadow: number) =>
  pose(ARMS_AWAY, [BACK, { kind: 'cape', d: CAPE.drapedLeft, mirrored: true }], [shadowFrom(shadow)])
const FOOTSTEP = 'translateY(1px)'

const flying = [glide, { ...glide, transform: 'rotate(4deg)' }] as const

/** Mostly still, then the wingsuit banks and he glances along the street: four changes in twelve seconds. */
const STILL: Step = { pose: glide, look: 0 }

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
            fill: 'var(--gloves)',
          },
          { kind: 'path', d: CAPE.wrapped, className: 'clawd__cape' },
          { kind: 'rects', px: [[7.85, 8.4, 0.3, 1.6]], className: 'clawd__seam' },
          // Only the gloved hands holding the cape shut show, in front of it.
          {
            kind: 'rects',
            px: [
              [6.9, 7.6, 1, 0.8],
              [8.1, 7.6, 1, 0.8],
            ],
            fill: 'var(--gloves)',
          },
        ],
        eyes: 'shut',
      },
    ],
    flying,
    // The flame flickers between Hot Signal and a smaller Pen Hot, a frame each.
    alarmed: [flare([12.75, -1, 1.5, 1], 'var(--signal-hot)'), flare([13, -1, 1, 1], 'var(--stamp-hot)')],
  },
  watch: [
    STILL,
    ...Array<Step>(5).fill(STILL),
    { pose: flying[1], look: 0 },
    STILL,
    { pose: glide, look: -GAZE },
    { pose: glide, look: -GAZE },
    STILL,
    STILL,
  ],
  // Out of the dark (the subway fight): the shadow slides down off him over a second, two footsteps
  // landing on the way, until only his feet stay in it.
  signature: [
    { pose: draped(3), look: 0 },
    { pose: draped(4.25), look: 0 },
    { pose: draped(5.5), look: 0, transform: FOOTSTEP },
    { pose: draped(6.75), look: 0 },
    { pose: draped(8), look: 0, transform: FOOTSTEP },
    { pose: draped(8), look: 0 },
  ],
  aura: true,
}
