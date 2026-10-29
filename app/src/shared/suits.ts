// Bat-Clawd's suit per Theme, as data: the outfit maps (shared/outfits.ts) for his body and cowl,
// the layers drawn behind and in front of them (the cape, the cowl's edge, the chest emblem, and
// details under a grid cell), the Poses of each Mood, his watch on the perch and, if the Theme has
// one, his Signature pose. Every Theme keeps Clawd's shape, white eyes, orange jaw and three Moods
// (CONTEXT.md, Bat-Clawd); the Bat-Clawd Costume Rule is in DESIGN.md.
import { flock, type BatAt } from './bats'
import { EMBLEM_1966, EMBLEM_1989, EMBLEM_1992, plateGlows, type Plate, type PlatedEmblem } from './emblems'
import type { OutfitMap } from './outfits'
import type { MascotMood } from './view'

/** A rect on his 16x11 grid (layers may reach past it): x, y, width and height in units (1 by default). */
export type Px = readonly [x: number, y: number, w?: number, h?: number]

/**
 * Something drawn around the map, in a Theme variable a Theme's stylesheet sets: named as a fill, or
 * through a class whose suit variable BatClawd.css reads (--cape, --cape-rim, --thread, --cowl-edge,
 * --chest).
 */
export type Layer =
  /**
   * A path in one color, or in a class's; mirrored, it is drawn again flipped across his middle (a
   * cape's two open halves); smooth, it is drawn like the chest emblem, not snapped to pixels (an
   * oval beside it); at an opacity, faint (a ring fading as it spreads).
   */
  | {
      kind: 'path'
      d: string
      fill?: string
      className?: string
      mirrored?: boolean
      smooth?: boolean
      opacity?: number
    }
  /** Rects in one color, or in a class's, at an opacity if faint (a faint light behind his eyes). */
  | { kind: 'rects'; px: readonly Px[]; fill?: string; className?: string; opacity?: number }
  /**
   * The Theme's emblem, centred on (cx, cy), `width` units wide, and as tall as its shape makes it
   * unless given a `height` (BLUE COLLAR's block, flattened to a slab): across his chest, in the chest's
   * ink, or held, in a class's colors (BLUE COLLAR's axe, in the cape's).
   */
  | { kind: 'emblem'; cx: number; cy: number; width: number; height?: number; className?: string }
  /**
   * A cape behind him (the Costume Rule): its cloth, with its rim cut away over his body (BODY_BOX)
   * so it reads as behind him. Mirrored like a path.
   */
  | { kind: 'cape'; d: string; mirrored?: boolean }

/** His frame on his grid, the viewBox he is drawn in: x, y, width and height. */
export const VIEW = [-6, -1, 28, 13] as const

/** His body below the cowl, where a cape behind him shows no rim: x, y, width and height. */
export const BODY_BOX = [3, 5, 10, 7] as const

/** How he is drawn in a Mood or a moment. */
export interface Pose {
  /** The outfit map that draws his body and cowl in this pose. */
  map: OutfitMap
  behind: readonly Layer[]
  front: readonly Layer[]
  /** His suit's open or shut eyes, or eyes of the pose's own (looking up, say): white whatever. */
  eyes: 'open' | 'shut' | readonly Px[]
  /** A nudge on top of the Mood's motion while this pose shows (a wingsuit banking). */
  transform?: string
}

/** A Mood's poses, shown one a frame in turn (BatClawd.tsx, moodFrame); the first is the resting one. */
export type Poses = readonly [Pose, ...Pose[]]

/** One step of a script on the shared clock: a pose, and where his eyes look (along the street, and down or up). */
export interface Step {
  pose: Pose
  look: number
  /** How far his eyes look down (up, when negative), in grid units: to the street, to the sky. */
  lookY?: number
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
  /**
   * His watch on the perch, one step a second, while nothing needs the user. A suit with a Signature
   * pose reveals it there first, then keeps its watch on it: the watch starts on its final step.
   */
  watch: Script
  /**
   * The Theme's most iconic Pose (CONTEXT.md, Signature pose), revealed in steps on the shared
   * clock and then held: on the perch in place of the watch, in the intro, and on a click in place
   * of the hop. A Theme without one keeps the watch and the hop.
   */
  signature?: Script
  /**
   * The Theme's Alarm color around him (CONTEXT.md, Aura), only while something needs the user or
   * while he reveals his Signature pose; 'alarmed', only while something needs the user (a Theme
   * whose Alarm color never shows at rest). What it costs is in DESIGN.md (Bat-Clawd).
   */
  aura?: boolean | 'alarmed'
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

/** The cowl's brow, with its shine. */
const BROW = '....chhccccc....'
/** The cowl down to his eyes, with its shine and two ear tips, and Clawd's orange as his jaw. */
const HEAD = twice(['....c......c....', BROW, '...cccccccccc...', '...cccccccccc...', '...cc######cc...'])
const SUIT = '...SSSSSSSSSS...'
/** The belt and its buckle, then the suit's last half-row and his four booted legs. */
const BELOW_WAIST = [
  '...bbbbkkbbbb...',
  SUIT,
  '....S.S..S.S....',
  '....g.g..g.g....',
  ...twice(['....g.g..g.g....']),
]
const map = (
  chest: readonly string[],
  rows: readonly string[] = BELOW_WAIST,
  legend: OutfitMap['legend'] = LEGEND,
  head: readonly string[] = HEAD,
): OutfitMap => ({
  top: 0,
  rows: [...head, ...twice(chest), ...rows],
  legend,
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
/**
 * A pose: the cape and cowl's edge (or a cowl's own) behind him, his chest emblem (or a Theme's own)
 * and the rest in front.
 */
const pose = (
  map: OutfitMap,
  behind: Layer[],
  front: Layer[] = [],
  {
    chest = [CHEST],
    eyes = 'open',
    edge = COWL_EDGE,
  }: { chest?: Layer[]; eyes?: Pose['eyes']; edge?: Layer } = {},
): Pose => ({
  map,
  behind: [...behind, edge],
  front: [...chest, ...front],
  eyes,
})

/** Sitting, wrapped in a cape closed in front of him: only his gloved hands and boots show. */
const seated = (map: OutfitMap, wrapped: string, behind: Layer[] = [COWL_EDGE]): Pose => ({
  map,
  behind,
  front: [
    {
      kind: 'rects',
      px: [
        [4.5, 10.2, 2, 0.8],
        [9.5, 10.2, 2, 0.8],
      ],
      fill: 'var(--gloves)',
    },
    { kind: 'path', d: wrapped, className: 'clawd__cape' },
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
})

/** An oval as a path: centred on (cx, cy), rx by ry. */
const oval = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`

/** A plate's oval rx wide either side of (cx, cy), in the plate's proportions. */
const plateOval = ({ box }: Plate, cx: number, cy: number, rx: number) =>
  oval(cx, cy, rx, (rx * box.height) / box.width)

/**
 * The Theme's bat across its plate's oval rx wide either side of (cx, cy), spanning the oval inside
 * its rim as it does on the emblem, so a re-trace carries over to his chest.
 */
const plateBat = ({ bat, plate }: PlatedEmblem, cx: number, cy: number, rx: number): Layer => ({
  kind: 'emblem',
  cx,
  cy,
  width: (2 * rx * bat.width) / (plate.box.width - 2 * plate.rim),
})

/**
 * How far the cowl-black rim of an oval on his chest reaches past its plate, in units: PALE
 * MOONLIGHT's, which keeps its oval clear of his jaw (y 5) and his belt (y 8.5) so the two never
 * merge into one brass apron. A Theme that needs another width brings it with its oval.
 */
const CHEST_RIM = 0.35

/**
 * A Theme's emblem as an oval on his chest, rx wide either side of (cx, cy): a cowl-black rim if its
 * plate has one, the plate (lit in the Alarm color with its light in the middle, if lit and the
 * plate ever lights), and the Theme's bat across it. PALE MOONLIGHT's brass oval lights when he is
 * alarmed; The Animated Series' yellow one never does.
 */
export function chestPlate(
  emblem: PlatedEmblem,
  { cx, cy, rx, lit = false }: { cx: number; cy: number; rx: number; lit?: boolean },
): Layer[] {
  const { plate } = emblem
  const glows = plateGlows(plate, lit)
  const at = (r: number, fill: string): Layer => ({
    kind: 'path',
    d: plateOval(plate, cx, cy, r),
    fill,
    smooth: true,
  })
  return [
    ...(plate.rim > 0 ? [at(rx + CHEST_RIM, 'var(--cowl)')] : []),
    at(rx, glows ? 'var(--signal)' : 'var(--emblem-plate)'),
    ...(glows ? [at((rx * 2) / 3, 'var(--signal-hot)')] : []),
    plateBat(emblem, cx, cy, rx),
  ]
}

/** How many steps a beat of his own may take, at the end of his watch. */
const BEAT_ROOM = 4

/**
 * His watch on the perch, twelve steps of a second each, held on his Signature pose's final step (so
 * the reveal ends where the watch begins): six seconds still, two glances, then the last four
 * still, or a beat of his own (a sonar's ping) in their place. Last, so a reveal that just played
 * its own beat isn't followed by another a moment later.
 */
export const watchOn = (
  signature: Script,
  glances: [Partial<Step>, Partial<Step>],
  beat: readonly Step[] = [],
): Script => {
  // The final step's pose and nudge (a leap's tilt), its eyes back to looking ahead.
  const { pose, transform } = scriptAt(signature, Infinity)
  const STILL: Step = { pose, look: 0, transform }
  const still = (n: number) => Array<Step>(n).fill(STILL)
  return [
    STILL,
    ...still(5),
    { ...STILL, ...glances[0] },
    { ...STILL, ...glances[1] },
    ...still(BEAT_ROOM - Math.min(beat.length, BEAT_ROOM)),
    // The beat keeps the nudge unless a step brings its own.
    ...beat.slice(0, BEAT_ROOM).map((step) => ({ transform, ...step })),
  ]
}

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
/** Standing with the cape draped, his shadow from `shadowTop` down. */
const draped = (shadowTop: number) =>
  pose(ARMS_AWAY, [BACK, { kind: 'cape', d: CAPE.drapedLeft, mirrored: true }], [shadowFrom(shadowTop)])
const FOOTSTEP = 'translateY(1px)'

/**
 * Out of the dark (the subway fight): the shadow slides down off him in a second and a half (six
 * steps, four a second), two footsteps landing on the way, until only his feet stay in it.
 */
const OUT_OF_THE_DARK: Script = [
  { pose: draped(3), look: 0 },
  { pose: draped(4.25), look: 0 },
  { pose: draped(5.5), look: 0, transform: FOOTSTEP },
  { pose: draped(6.75), look: 0 },
  { pose: draped(8), look: 0, transform: FOOTSTEP },
  { pose: draped(8), look: 0 },
]

/** Level, then banked one way, level, then the other: a frame each, over the bob. */
const flying = [
  glide,
  { ...glide, transform: 'rotate(4deg)' },
  glide,
  { ...glide, transform: 'rotate(-4deg)' },
] as const

/** Clawd's white eyes, open under the cowl, or shut to a line: every suit's so far. */
const EYES: Suit['eyes'] = {
  open: [
    [5, 3, 2, 1],
    [9, 3, 2, 1],
  ],
  shut: [
    [5, 3.6, 2, 0.3],
    [9, 3.6, 2, 0.3],
  ],
}

export const VENGEANCE_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(SEATED, CAPE.wrapped)],
    flying,
    // The flame flickers between Hot Signal and a smaller Pen Hot, a frame each.
    alarmed: [flare([12.75, -1, 1.5, 1], 'var(--flame)'), flare([13, -1, 1, 1], 'var(--flame-low)')],
  },
  // On the perch, out of the dark, he glances along the street.
  watch: watchOn(OUT_OF_THE_DARK, [{ look: -GAZE }, { look: -GAZE }]),
  signature: OUT_OF_THE_DARK,
  aura: true,
}

// --- PALE MOONLIGHT: outfit I (#95), after Tim Burton's Batman (1989). Burton's black rubber suit
// lifted to a plum-grey so it reads on the smog, a steel sheen on the cowl and shoulders, the brass
// belt, the bat in its oval on his chest (old brass at rest, lit gold when something needs the
// user), and a black cape with rounded scallops rimmed in the snow's steel (burton-1989.md, 7). ---

/** The suit's last half-row, the brass belt and its buckle, and his four booted legs. */
const MOON_BELOW = [
  SUIT,
  '...bbbbkkbbbb...',
  '....S.S..S.S....',
  '....g.g..g.g....',
  ...twice(['....g.g..g.g....']),
]
/** His shoulders take the cowl's steel sheen. */
const SHOULDERS = '...hSSSSSSSSh...'
const MOON_ARMS_OUT = map([SHOULDERS, '.gSSSSSSSSSSSSg.', SUIT], MOON_BELOW)
/** Arms raised to hold the cape up (drawn beside the map). */
const MOON_ARMS_UP = map([SHOULDERS, SUIT, SUIT], MOON_BELOW)
const MOON_SEATED = map([SHOULDERS, SUIT, SUIT, SUIT], [])

/** The 1989 emblem on his chest: in old brass at rest, lit in the Alarm color when alarmed. */
const CHEST_OVAL = { cx: 8, cy: 6.9, rx: 2.25 }
const OVAL_AT_REST = chestPlate(EMBLEM_1989, CHEST_OVAL)
const OVAL_LIT = chestPlate(EMBLEM_1989, { ...CHEST_OVAL, lit: true })

/**
 * Keaton's cape, cut from eight panels (burton-1989-cape.md): sharp tips hang at the seams, about two
 * cells apart, with shallow arcs curving up between them; not 2022's zigzag.
 */
const SCALLOPED = {
  wrapped:
    'M2.6 6.4 L13.4 6.4 L14.2 10.6 Q13.3 9.7 12.2 10.3 Q11.2 9.6 10.1 10.6 Q9 9.8 8 10.4 Q7 9.8 5.9 10.6 Q4.8 9.6 3.8 10.3 Q2.7 9.7 1.8 10.6 Z',
  trailA:
    'M3 5 L13 5 L13.4 9.2 Q11.8 8.9 11 10.4 Q9 9.3 7 10 Q5.1 9.5 3 10.8 Q0.9 9.5 -1 10 Q-2.9 9.5 -4.6 10.8 L-3.6 8.8 L-5.6 7.4 L-1.4 6.6 Z',
  trailB:
    'M3 5 L13 5 L13.6 8.6 Q12.2 8.6 11.2 10 Q9.2 9.6 7.2 10.6 Q5.2 9.7 3.2 10.2 Q1.3 9.7 -0.6 10.9 Q-2.6 9.4 -4.2 9.6 L-3 8.2 L-5 5.8 L-1.2 5.9 Z',
  /**
   * Held up on its rod to one point above his head, its four panels' tips running down to his feet
   * (left half; mirrored for the right): the giant bat.
   */
  wingLeft: 'M3.4 5.2 L1.2 3 L-2.4 0 Q-3 4.2 -5.4 5.8 Q-2.9 7 -2.2 9.6 Q-0.4 8.8 0.8 10.4 Q2.2 9.5 3.4 11 Z',
  /** The near half swung in front of him, three-quarter (the Signature pose). */
  nearFront: 'M2.6 5 L5.6 5 Q5.9 8 5.6 10.6 Q4.8 9.8 4 10.6 Q3.2 9.8 2.4 10.6 Q1.6 9.8 0.8 10.6 L1.6 7 Z',
  /** The far half, behind him, a cell of it beside his far arm. */
  farBehind: 'M12.6 5 L14.6 5.4 L15.2 10.4 Q14.5 9.7 13.8 10.4 Q13.2 9.8 12.6 10.6 Z',
}

/** Flying with the cape trailing, in two frames of the same flutter. */
const [trailA, trailB] = [SCALLOPED.trailA, SCALLOPED.trailB].map((d) =>
  pose(MOON_ARMS_OUT, [{ kind: 'cape', d }], [], { chest: OVAL_AT_REST }),
) as [Pose, Pose]

/** The giant bat (alarmed): arms raised, the cape held up in two wings, the oval lit. */
const giantBat = pose(
  MOON_ARMS_UP,
  [BACK, { kind: 'cape', d: SCALLOPED.wingLeft, mirrored: true }],
  [
    {
      kind: 'rects',
      px: [
        [1.5, 4, 1.5, 1.5],
        [13, 4, 1.5, 1.5],
      ],
      fill: 'var(--suit)',
    },
    {
      kind: 'rects',
      px: [
        [1, 3, 1, 1],
        [14, 3, 1, 1],
      ],
      fill: 'var(--gloves)',
    },
  ],
  { chest: OVAL_LIT },
)

/**
 * Under the Signal (the Signature pose): the film's last image, standing watch while the Signal
 * shines, turned three-quarter. The near half of the cape swings in front of him, his eyes look up
 * to the Signal in the clouds, and the Signal stays old brass: it is not an alarm.
 */
const underTheSignal = pose(
  MOON_ARMS_OUT,
  [{ kind: 'cape', d: SCALLOPED.farBehind }],
  [
    { kind: 'path', d: SCALLOPED.nearFront, className: 'clawd__cape' },
    { kind: 'path', d: plateOval(EMBLEM_1989.plate, 19, -1.5, 3), fill: 'var(--emblem-plate)', smooth: true },
    plateBat(EMBLEM_1989, 19, -1.5, 3),
  ],
  {
    chest: OVAL_AT_REST,
    eyes: [
      [6, 2.5, 2, 1],
      [10, 2.5, 2, 1],
    ],
  },
)

/** Revealed as he turns from the street to look up at the Signal; held there on the perch. */
const UNDER_THE_SIGNAL: Script = [
  { pose: trailB, look: 0 },
  { pose: underTheSignal, look: 0 },
]

export const PALE_MOONLIGHT_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(MOON_SEATED, SCALLOPED.wrapped)],
    flying: [trailA, trailB],
    alarmed: [giantBat],
  },
  // On the perch, under the Signal, he glances down to the street and back up (burton-1989.md, 7).
  watch: watchOn(UNDER_THE_SIGNAL, [{ lookY: 0.4 }, { look: GAZE, lookY: -0.4 }]),
  signature: UNDER_THE_SIGNAL,
  // Gold, the Alarm color, never at rest: no aura as he looks up at the Signal (#95, outfit I).
  aura: 'alarmed',
}

// --- WATCHFUL PROTECTOR: outfit N (#95), after Christopher Nolan's The Dark Knight (2008). The black
// screen suit, its plates catching the light at the shoulders, the chest bat and the knees, open
// mesh at the waist, the smoked-bronze belt and its pale buckle, and a matte black cape that
// stiffens into a three-point glide wing (bat-clawd-nolan-suit.md). ---

/** Outfit N's legend: V's, with the plates' sheen and the waist's open mesh. */
const NOLAN_LEGEND = { ...LEGEND, p: 'var(--plate)', m: 'var(--mesh)' }
/** Lit plates on his shoulders, then the suit, then the mesh at his waist. */
const PLATED = '...pSSSSSSSSp...'
const MESH = '...mSSSSSSSSm...'
/** V's belt, buckle and booted legs, with lit plates on his knees. */
const NOLAN_BELOW = BELOW_WAIST.map((row) => (row === '....S.S..S.S....' ? '....p.p..p.p....' : row))
const nolanMap = (chest: readonly string[], rows = NOLAN_BELOW) => map(chest, rows, NOLAN_LEGEND)
const NOLAN_ARMS_OUT = nolanMap([PLATED, '.gSSSSSSSSSSSSg.', MESH])
const NOLAN_ARMS_HIDDEN = nolanMap([PLATED, SUIT, MESH])
const NOLAN_SEATED = nolanMap([PLATED, SUIT, SUIT, SUIT], [])

/** The sculpted chest bat, in the plates' sheen: a lit relief on the black chest. */
const RELIEF: Layer = { kind: 'emblem', cx: 8, cy: 6.3, width: 6 }

/** The matte cape, its hem straight: no zigzag, no scallop. */
const MATTE = {
  /** Closed around him, asleep. */
  wrapped: 'M2.6 6.4 L13.4 6.4 L13.8 10.5 L2.2 10.5 Z',
  /**
   * The memory-cloth glide (flying): a rigid batwing with a straight leading edge from the shoulder
   * to a high tip and three points on its trailing edge (left half; mirrored for the right).
   */
  glide: 'M3 5 L-5.2 4.3 L-4.5 6.9 L-3 6.2 L-1.9 8.1 L0.2 7.3 L1.5 9.2 L3 8.8 Z',
  /** Flung open (alarmed), ankle-length, its hem flat at his feet (left half; mirrored). */
  open: 'M3.4 5 L0.2 5.2 L-2.8 11 L3.4 11 Z',
  /** Hanging straight behind him, a cell of it either side (the Signature pose). */
  hanging: 'M2 5 L14 5 L14 10.5 L2 10.5 Z',
}

const nolanPose = (map: OutfitMap, behind: Layer[], front: Layer[] = []) =>
  pose(map, behind, front, { chest: [RELIEF] })

/** The glide, level, then the whole frame a pixel lower: a bank on the bob. */
const memoryCloth = nolanPose(NOLAN_ARMS_HIDDEN, [{ kind: 'cape', d: MATTE.glide, mirrored: true }])

/** The cape flung open, his gauntlets out (alarmed). */
const flungOpen = nolanPose(NOLAN_ARMS_OUT, [BACK, { kind: 'cape', d: MATTE.open, mirrored: true }])

/** The lenses' light behind his eyes, still white (the Sonar). */
const LENS_LIGHT: Layer = { kind: 'rects', px: [[4.6, 2.7, 6.8, 1.6]], fill: 'var(--bone)', opacity: 0.25 }

/** Standing front-on, arms at his sides, the cape hanging behind him, his lenses lit. */
const sonarWith = (ring: Layer[] = []) =>
  nolanPose(
    NOLAN_ARMS_HIDDEN,
    [{ kind: 'cape', d: MATTE.hanging }],
    [
      {
        kind: 'rects',
        px: [
          [2, 6, 1, 2],
          [13, 6, 1, 2],
        ],
        fill: 'var(--suit)',
      },
      LENS_LIGHT,
      ...ring,
    ],
  )
const sonar = sonarWith()

/**
 * The ping: one ring from his eyes, spreading and fading over four steps, in their white. It grows
 * past the edges of his frame, which shows what it draws outside them.
 */
const ping = (r: number, opacity: number): Step => ({
  pose: sonarWith([{ kind: 'path', d: oval(8, 3, r, r), className: 'clawd__ping', opacity }]),
  look: 0,
})
const PINGS: Script = [ping(4, 0.4), ping(8, 0.28), ping(12, 0.16), ping(16, 0.06)]

/**
 * Sonar (the Signature pose), from The Dark Knight's climax, Fox's city-wide sonar seen through the
 * cowl's lenses (nolan.md, section 7): a ring goes out from his eyes, then he stands watch, the
 * lenses lit. Under reduced motion, the lenses without the ring.
 */
const SONAR: Script = [...PINGS, { pose: sonar, look: 0 }]

export const WATCHFUL_PROTECTOR_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(NOLAN_SEATED, MATTE.wrapped)],
    flying: [memoryCloth, { ...memoryCloth, transform: 'translateY(1px)' }],
    alarmed: [flungOpen],
  },
  // On the perch, standing watch, the sonar pings once a cycle (where another cape would lift in the
  // wind: this one is heavy), then he glances along the street both ways.
  watch: watchOn(SONAR, [{ look: -GAZE }, { look: GAZE }], PINGS),
  signature: SONAR,
  // Blue Flame is the Alarm color and never shows at rest: no aura as the sonar pings.
  aura: 'alarmed',
}

// --- KNIGHTMARE: outfit M (#95), after the Knightmare in Batman v Superman and Zack Snyder's Justice
// League. Desert gear over the suit and no cape: a brown leather duster worn open, its sleeves a
// shade darker so both arms read on it, a rust scarf, flying goggles pushed up on the cowl, a belt
// with a brass buckle, olive cargo pants, black gauntlets and boots, and the BvS bat on his chest
// between the lapels (bat-clawd-knightmare-suit.md). ---

/** Outfit M's legend: the coat, its sleeves, the scarf, the goggles and the pants join V's. */
const KNIGHTMARE_LEGEND = {
  ...LEGEND,
  f: 'var(--goggles)',
  l: 'var(--goggle-lens)',
  r: 'var(--scarf)',
  C: 'var(--coat)',
  v: 'var(--sleeve)',
  p: 'var(--pants)',
}
/**
 * V's cowl with the goggles pushed up across the brow in place of its shine, then the scarf at his
 * neck, the coat's collar either side.
 */
const KNIGHTMARE_HEAD = [
  ...HEAD.map((row) => (row === BROW ? '...ffllffllff...' : row)),
  '...CrrrrrrrrC...',
  '...CCrrrrrrCC...',
]
/** His torso between the lapels; his arms out in the coat's darker sleeves, gloved. */
const LAPELS = '...CSSSSSSSSC...'
const SLEEVES = '.gvCSSSSSSSSCvg.'
const knightmareMap = (rows: readonly string[]) =>
  map([SLEEVES, LAPELS], rows, KNIGHTMARE_LEGEND, KNIGHTMARE_HEAD)
/** The coat closed down to his shins, his legs under it. */
const COAT_SHUT = knightmareMap([
  '...CbbbkkbbbC...',
  '...CppppppppC...',
  '...Cp.p..p.pC...',
  ...twice(['...Cg.g..g.gC...']),
  '....g.g..g.g....',
])
/** The coat swung open: its front edges leave his legs. */
const COAT_OPEN = knightmareMap([
  '...CbbbkkbbbC...',
  '...CppppppppC...',
  '....p.p..p.p....',
  ...twice(['....g.g..g.g....']),
  '....g.g..g.g....',
])
/** Sitting, the coat wrapped round him: his torso, and nothing below (seated draws his feet). */
const KNIGHTMARE_SEATED = map([LAPELS, LAPELS, LAPELS], [], KNIGHTMARE_LEGEND, KNIGHTMARE_HEAD)

/** The BvS bat on his chest, between the lapels, below the scarf and above the belt (y 6 to 8). */
const CHEST_BAT: Layer = { kind: 'emblem', cx: 8, cy: 7, width: 4.4 }

/** The duster, its hem straight with a few heavy points (bat-clawd-knightmare-suit.md, section 4). */
const DUSTER = {
  /** Flying: it streams back in a heavy tail, hemmed at the knees (two frames of a flutter). */
  trailA:
    'M3 5 L13 5 L13.4 10.7 L3.2 10.7 L1 10.9 L-1.2 10.3 L-3.4 10.7 L-2.6 9.2 L-4.4 8.1 L-3 7.1 L-4.6 6.1 L-0.6 5.3 Z',
  trailB:
    'M3 5 L13 5 L13.4 10.7 L3.2 10.7 L1 10.6 L-1.2 10.8 L-3.4 10.2 L-2.8 8.9 L-4.6 7.7 L-3.2 6.8 L-4.8 5.9 L-0.6 5.3 Z',
  /** Its dark lining, behind his legs in the gaps between them. */
  lining: 'M4 9 L12 9 L12 10.6 L4 10.6 Z',
  /** Its back, behind him when it swings open. */
  back: 'M3.4 5 L12.6 5 L12.6 10.9 L3.4 10.9 Z',
  /** A front panel swung open (left; mirrored for the right). */
  open: 'M3.4 5 L1.6 5.3 L-1.4 10.9 L-0.2 10.4 L1 10.9 L2.2 10.5 L3.4 10.9 Z',
  /** Wrapped round him, asleep. */
  wrapped: 'M2.6 6.4 L13.4 6.4 L13.8 10.6 L2.2 10.6 Z',
  /** The Knightmare: the right panel streams downwind, the left hangs close. */
  blownRight: 'M13 5 L19.5 6.5 L21.5 10.4 L17.5 9.8 L13 10.8 Z',
  /** The right panel caught a unit higher by a gust. */
  gustRight: 'M13 5 L19.5 5.5 L21.5 9.4 L17.5 8.8 L13 10.8 Z',
  hangingLeft: 'M3 5 L1.6 5.6 L1.4 10.6 L3 10.8 Z',
}
const LINING: Layer = { kind: 'path', d: DUSTER.lining, fill: 'var(--coat-lining)' }

const knightmarePose = (map: OutfitMap, behind: Layer[], eyes: Pose['eyes'] = 'open') =>
  pose(map, behind, [], { chest: [CHEST_BAT], eyes })

/** Flying, the duster streaming behind him, to the left (picked on screen). */
const flyingIn = (trail: string) => knightmarePose(COAT_SHUT, [{ kind: 'cape', d: trail }, LINING])

/** Alarmed: the coat swung open, its lining behind his legs. */
const swungOpen = knightmarePose(COAT_OPEN, [
  { kind: 'path', d: DUSTER.back, fill: 'var(--coat-lining)' },
  { kind: 'cape', d: DUSTER.open, mirrored: true },
])

/** Eyes on the horizon the coat streams at. */
const TO_THE_HORIZON: Px[] = [
  [6, 3, 2, 1],
  [10, 3, 2, 1],
]
/** The Knightmare: standing in the desert wind, the coat blown out to the right like a flag. */
const knightmareWith = (rightPanel: string) =>
  knightmarePose(
    COAT_SHUT,
    [{ kind: 'cape', d: rightPanel }, { kind: 'cape', d: DUSTER.hangingLeft }, LINING],
    TO_THE_HORIZON,
  )
const knightmare = knightmareWith(DUSTER.blownRight)
const gusted = knightmareWith(DUSTER.gustRight)

/**
 * The Knightmare (the Signature pose), the desert vision of Batman v Superman and the resistance of
 * Zack Snyder's Justice League (snyder.md, section 7): the coat snaps in the wind for a second,
 * then he stands watching the horizon.
 */
const KNIGHTMARE: Script = [
  { pose: gusted, look: 0 },
  { pose: knightmare, look: 0 },
  { pose: gusted, look: 0 },
  { pose: knightmare, look: 0 },
]

export const KNIGHTMARE_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(KNIGHTMARE_SEATED, DUSTER.wrapped)],
    flying: [flyingIn(DUSTER.trailA), flyingIn(DUSTER.trailB)],
    alarmed: [swungOpen],
  },
  // On the perch he watches the horizon; once a cycle a gust lifts the coat.
  watch: watchOn(KNIGHTMARE, [{ look: 0.3 }, { look: -0.3 }], [{ pose: gusted, look: 0 }]),
  signature: KNIGHTMARE,
  // S-shield crimson is the Alarm color and never shows at rest: no aura as the coat snaps.
  aura: 'alarmed',
}

// --- BECOME A BAT: the first suit, after Batman: Year One (year-one.md, section 7). The grey suit of
// the 1987 covers, with a cowl-black collar under his orange jaw so the jaw reads on it (picked on
// screen over a lighter chalk suit); a neutral near-black cowl, cape, gloves, boots and trunks; a
// full unit of solid canary capsule belt; Year One's own small black bat between the collar and the
// belt; and a cape whose hem falls in four deep, uneven points a side. ---

/** The canary belt, a full unit and solid, then the dark trunks at his thighs and his four boots. */
const YEAR_ONE_BELOW = [
  ...twice(['...bbbbbbbbbb...']),
  '....c.c..c.c....',
  '....g.g..g.g....',
  ...twice(['....g.g..g.g....']),
]
/** The cowl-black collar under his jaw, a unit tall. */
const COLLAR = '...cccccccccc...'
const yearOneMap = (chest: readonly string[], rows: readonly string[] = YEAR_ONE_BELOW) =>
  map([COLLAR, ...chest], rows)
const YEAR_ONE_STANDING = yearOneMap([SUIT, SUIT])
/** His arms out, gloved, holding the cape open. */
const YEAR_ONE_ARMS_OUT = yearOneMap(['.gSSSSSSSSSSSSg.', SUIT])
const YEAR_ONE_SEATED = yearOneMap([SUIT, SUIT, SUIT], [])
/** His right arm thrown ahead, gloved. */
const REACHING = '...SSSSSSSSSSSSg'
/** One arm reaching ahead as he flies to the right. */
const YEAR_ONE_REACHING = yearOneMap([REACHING, SUIT])

/**
 * Year One's own bat on the grey, 2.73 units wide so it stands a full unit tall (the Wave's floor),
 * from y 7 to 8: a unit of suit below the collar
 * (the Wave rule), resting on the canary belt.
 */
const FIRST_SUIT_BAT: Layer = { kind: 'emblem', cx: 8, cy: 7.5, width: 2.73 }

/**
 * The hanging cape from its left shoulder round its right half and middle, its hem's points uneven;
 * each way it hangs ends with its own left half.
 */
const HEM_RIGHT =
  'M1.6 5 L14.4 5 L14.6 9.2 L14.1 11.5 L13.3 9.0 L12.6 10.5 L11.6 9.0 L10.0 11.5 L9.2 9.9 L8.5 11.4 ' +
  'L7.5 8.9 L6.3 10.6 L5.5 9.1 L4.8 11.4 L3.9 9.4'

/** The cape's hem: four deep points a side, of unequal depth and spacing, and the two halves unlike. */
const FIRST_CAPE = {
  /** Hanging behind him from the shoulders. */
  hanging: `${HEM_RIGHT} L3.1 11.5 L2.4 10.0 L1.6 11.5 L1.4 9.4 Z`,
  /** Hanging, its left half lifted out under the swarm as if the bats' wingbeat pulled it. */
  flared: `${HEM_RIGHT} L2.6 11.0 L1.0 9.3 L-0.6 10.6 L-2.0 9.6 Z`,
  /** Half lifted, on the way. */
  lifting: `${HEM_RIGHT} L3.0 11.3 L1.8 9.4 L0.4 11.0 L-0.2 9.4 Z`,
  /** Trailing behind him to the left as he flies right, its points as uneven as the hanging hem's. */
  trailA:
    'M3 5 L13 5 L13.4 9.2 L12.4 10.9 L11.4 9.4 L9.6 11.1 L8.4 8.9 L6.8 11.3 L5.4 9.7 L2.6 11.2 ' +
    'L1.2 9.0 L-1.0 10.8 L-2.2 8.9 L-4.4 10.4 L-3.6 8.6 L-5.4 7.2 L-1.4 6.4 Z',
  /** The same a beat later, the trailing points lifted on the air. */
  trailB:
    'M3 5 L13 5 L13.4 9.0 L12.4 10.5 L11.4 9.1 L9.6 10.6 L8.4 8.6 L6.8 10.7 L5.4 9.2 L2.6 10.5 ' +
    'L1.2 8.5 L-1.0 9.9 L-2.2 8.2 L-4.4 9.3 L-3.6 7.8 L-5.4 6.4 L-1.4 6.0 Z',
  /** Flung open and hanging from his outstretched arms: the left half, then the right, unalike. */
  openLeft: 'M3.4 5 L0 5.2 L-2.6 11.3 L-1.4 9.9 L-0.4 11.4 L0.9 10.0 L2.0 11.2 L3.4 10.4 Z',
  openRight: 'M12.6 5 L16 5.2 L18.4 11.0 L17.0 10.1 L16.2 11.4 L14.6 9.8 L13.6 11.3 L12.6 10.5 Z',
  /** Closed around him, asleep: the hem's uneven points at his feet. */
  wrapped:
    'M2.6 6.4 L13.4 6.4 L14.3 10.8 L13.0 9.2 L12.1 10.3 L10.4 9.5 L9.0 10.9 L7.8 9.3 L6.2 10.6 ' +
    'L5.1 9.6 L3.7 10.9 L2.8 9.2 L1.7 10.1 Z',
}

/**
 * A swarm: the bats lit from the street in the khaki Ash, so they read on the dark (picked on screen
 * over bats in the cape's black with a rim, which vanished at his real size).
 */
const swarmOf = (bats: readonly BatAt[]): Layer[] => [
  {
    kind: 'path',
    d: flock(bats),
    fill: 'var(--swarm)',
    smooth: true,
  },
]

/** The cloud: seven bats up and to his left, over his left ear and shoulder, clear of his eyes. */
const CLOUD: readonly BatAt[] = [
  [-3.8, 0.8, 3.4, 'up'],
  [-1.6, -0.1, 3, 'down'],
  [0.6, 1, 3.2, 'up'],
  [-2.6, 2.2, 2.8, 'down'],
  [3.4, 0.5, 2.8, 'up'],
  [3.6, 1.4, 2.6, 'down'],
  [0, 2.6, 2.4, 'up'],
]
/**
 * Two stragglers broken off the cloud, a little in from where year-one.md puts them so they stay
 * inside his box.
 */
const STRAGGLER_HIGH: BatAt = [-4.8, -0.3, 2, 'down']
const STRAGGLER_LOW: BatAt = [-3.2, 4.6, 2.2, 'up']
/** The cloud a beat before it closes: the same bats, spread wider round it. */
const CLOSING: readonly BatAt[] = [
  [-4.4, 0.9, 3, 'up'],
  [-2, -0.4, 2.8, 'down'],
  [0.9, 0.9, 3, 'up'],
  [-3.1, 2.7, 2.6, 'down'],
  [3.4, 0.5, 2.6, 'up'],
  [4.2, 1.9, 2.4, 'down'],
  [-0.2, 3.2, 2.2, 'up'],
]

/** A pose in the first suit, Year One's bat on his chest. */
const yearOnePose = (map: OutfitMap, behind: Layer[], front: Layer[] = []) =>
  pose(map, behind, front, { chest: [FIRST_SUIT_BAT] })

/** Standing in the swarm, the bats in front of him, his cape flared under them unless it says otherwise. */
const inSwarm = (bats: readonly BatAt[], cape = FIRST_CAPE.flared) =>
  yearOnePose(YEAR_ONE_STANDING, [{ kind: 'cape', d: cape }], swarmOf(bats))

/** His eyes up and to the left, at the cloud. */
const UP_LEFT = { look: -GAZE, lookY: -0.4 }

/**
 * The swarm (the tenement siege, where he calls the bats from the cave and goes out in them): bats
 * rise from his feet up his left side, close into one lopsided cloud over his left ear, and his cape
 * lifts out under them (six steps, four a second).
 */
const THE_SWARM: Script = [
  {
    pose: inSwarm(
      [
        [-2.4, 10, 2.4, 'up'],
        [-0.4, 10.8, 2.2, 'down'],
        [1.4, 9.6, 2.4, 'up'],
      ],
      FIRST_CAPE.hanging,
    ),
    look: -GAZE,
    lookY: 0.4,
  },
  {
    pose: inSwarm(
      [
        [-2.6, 8.4, 2.4, 'down'],
        [-0.6, 9.4, 2.4, 'up'],
        [-3.4, 6.6, 2.6, 'up'],
        [-1, 7, 2.4, 'down'],
        [-2.2, 4.8, 2.6, 'down'],
        [0.4, 5.4, 2.4, 'up'],
      ],
      FIRST_CAPE.lifting,
    ),
    look: -GAZE,
  },
  {
    pose: inSwarm([
      [-3.6, 5.6, 2.6, 'up'],
      [-1.4, 6.4, 2.4, 'down'],
      [-2.8, 3.8, 2.8, 'down'],
      [-0.4, 4, 2.6, 'up'],
      [1.6, 3.4, 2.4, 'down'],
      [-4, 2, 2.6, 'up'],
      [-1.6, 1.8, 2.8, 'up'],
      [0.8, 1.6, 2.6, 'down'],
      [2.8, 0.8, 2.4, 'up'],
    ]),
    look: -GAZE,
    lookY: -0.2,
  },
  { pose: inSwarm(CLOSING), ...UP_LEFT },
  { pose: inSwarm([...CLOUD, STRAGGLER_HIGH]), ...UP_LEFT },
  { pose: inSwarm([...CLOUD, STRAGGLER_HIGH, STRAGGLER_LOW]), ...UP_LEFT },
]
/**
 * Once a watch, one more bat leaves the cloud and crosses over his head to the right, his eyes
 * following it, until it is gone past his shoulder; the cloud and its stragglers stay as they are.
 */
const CROSSING: readonly Step[] = (
  [
    [[6.5, -0.4, 2, 'up'], 0],
    [[13, 0.2, 2, 'down'], GAZE],
    [[19.5, 0.6, 1.8, 'up'], GAZE],
  ] as const
).map(([bat, look]) => ({
  pose: inSwarm([...CLOUD, STRAGGLER_HIGH, STRAGGLER_LOW, bat]),
  look,
  lookY: -0.4,
}))

/** Flying right, one arm reaching ahead, the cape trailing to the left. */
const yearOneFlying = (trail: string) => yearOnePose(YEAR_ONE_REACHING, [{ kind: 'cape', d: trail }])

export const BECOME_A_BAT_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(YEAR_ONE_SEATED, FIRST_CAPE.wrapped)],
    // Two frames on the flying cadence: the hem lifts on the air.
    flying: [yearOneFlying(FIRST_CAPE.trailA), yearOneFlying(FIRST_CAPE.trailB)],
    // The cape flung open from his outstretched arms.
    alarmed: [
      yearOnePose(YEAR_ONE_ARMS_OUT, [
        BACK,
        { kind: 'cape', d: FIRST_CAPE.openLeft },
        { kind: 'cape', d: FIRST_CAPE.openRight },
      ]),
    ],
  },
  // On the perch he stands in the swarm, looks up at it and back; once a watch, a bat crosses.
  watch: watchOn(THE_SWARM, [UP_LEFT, { look: 0 }], CROSSING),
  signature: THE_SWARM,
  // Trade Paperback Red is the Alarm color and never shows at rest: no aura as the bats gather.
  aura: 'alarmed',
}

// --- ANCIENT GRACE: the second suit, after Frank Miller's The Dark Knight Returns
// (dark-knight-returns.md, section 7). The old man's bulk: a neutral grey suit with the second suit's
// big black bat on the chest, a suit-grey belt so the bat never merges with it, a black cowl whose
// short ears are set wide on a broad, boxy head, and a heavy black cape with two long tails, worn
// over his shoulders when something needs the user. ---

/** The cowl's crown, down to his eyes: short ears set wide, at the head's outer corners, a heavy brow. */
const GRACE_CROWN = [...twice(['...c........c...', '...cccchhcccc...']), ...HEAD.slice(4, 7)]
/** The cowl's outline with the wide-set ears, behind the face, so only its outer edge shows. */
const GRACE_COWL_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 0 L4 0 L4 1 L12 1 L12 0 L13 0 L13 5 Z',
  className: 'clawd__cowl-edge',
}
/**
 * The old man's bulk (dkr-rework.md, section 4): his shoulders two units past his body each side,
 * rising beside the cowl to his jaw, so his head sits sunk between them and reads small; a barrel
 * chest over a narrower waist. In the suit's grey, so the cowl doesn't widen into a bigger black head.
 */
const BULKY_HEAD = [...GRACE_CROWN, '..SccccccccccS..', '.SScc######ccSS.', '.SScc######ccSS.']
/** The barrel, x 1 to 15: its half-rows from his shoulders down, before the waist. */
const WIDE = '.SSSSSSSSSSSSSS.'
const BARREL = [WIDE, WIDE, WIDE, WIDE, WIDE]
/** The belt between the gloves hanging beside him, then the suit's last half-row and his legs. */
const HANGING_BELOW = ['.g.bbbbkkbbbb.g.', ...BELOW_WAIST.slice(1)]
const graceMap = (rows: readonly string[]) => map([], rows, LEGEND, BULKY_HEAD)
/** Standing: the barrel, his gloves hanging beside it, the waist back to x 3–13 at the belt. */
const GRACE_STANDING = graceMap([
  ...BARREL.slice(0, 3),
  '.gSSSSSSSSSSSSg.',
  '.gSSSSSSSSSSSSg.',
  '.g.SSSSSSSSSS.g.',
  ...HANGING_BELOW,
])
/** His arms raised or away: the barrel, then the waist. */
const GRACE_ARMS_AWAY = graceMap([...BARREL, SUIT, ...BELOW_WAIST])
const GRACE_SEATED = graceMap([...BARREL, WIDE, SUIT, SUIT])
/** In the air: the barrel and the waist, his legs drawn up out of sight under it. */
const GRACE_LEAPING = graceMap([...BARREL, SUIT, ...BELOW_WAIST.slice(0, 2)])

/**
 * The second suit's bat across his barrel chest, wide as the films draw it (BAT_1986, 2.3:1):
 * 6.9 units wide and 3 tall, from y 6 to 9, a unit of suit under his jaw.
 */
const SECOND_SUIT_BAT: Layer = { kind: 'emblem', cx: 8, cy: 7.5, width: 6.9 }

/** The heavy cape's hem: straight between two long tails at its outer corners, ending at y 11.5. */
const TAIL_HEM = 'L16.6 11.5 L14.6 10.8 L1.4 10.8 L-0.6 11.5 Z'
const TAILS = {
  /** Hanging behind him from his shoulders. */
  hanging: `M1 4.5 L15 4.5 ${TAIL_HEM}`,
  /**
   * Closed around him, asleep: over his shoulders up beside the cowl, as the comic and the films drape
   * it, a collar dipping under his jaw, its tails at his feet.
   */
  wrapped:
    'M3 3.4 L3 5.2 L13 5.2 L13 3.4 L15 4 L15.4 6.4 L16.6 11.5 L14.6 10.8 L1.4 10.8 L-0.6 11.5 L0.6 6.4 ' +
    'L1 4 Z',
  /** The drop: spread over his head like a canopy, its tails hanging at his sides (two frames). */
  canopyA: 'M1 4.5 L-1.4 4.6 L-3 8 L-3 2.4 Q8 -4.4 19 2.4 L19 8 L17.4 4.6 L15 4.5 Z',
  canopyB: 'M1 4.5 L-1.4 5.2 L-3 8.4 L-3 3.2 Q8 -3.2 19 3.2 L19 8.4 L17.4 5.2 L15 4.5 Z',
  /** On the ledge, gathered behind him before the leap: its tails tucked in. */
  bunched: 'M1.4 4.5 L14.6 4.5 L15 10.6 L1 10.6 Z',
  /**
   * The leap: one heavy wedge trailing up and back, out of his frame at the left, its lower edge at
   * his knees, ragged at the hem (drawn before his tilt, which lifts its left end further).
   */
  wedge: 'M4 4.5 L-6 -1 L-6 11 L-4.6 10.2 L-3.4 11.2 L-1.8 10.1 L-0.6 10.9 L1 9.7 L3.5 9 Z',
}

/** A pose in the second suit: its own cowl edge, the big bat on his chest. */
const gracePose = (map: OutfitMap, behind: Layer[], front: Layer[] = []) =>
  pose(map, behind, front, { chest: [SECOND_SUIT_BAT], edge: GRACE_COWL_EDGE })

/**
 * The drop (flying): his arms raised from his shoulders out to the cape's edges, holding it spread
 * over his head like a canopy that peaks a unit above the frame (the overlay draws past it); a frame
 * later it is a unit lower, its edge sinking on the air.
 */
const drop = (canopy: string) =>
  gracePose(
    GRACE_ARMS_AWAY,
    [{ kind: 'cape', d: canopy }],
    [
      {
        kind: 'rects',
        px: [
          [0, 3.5, 1, 1],
          [-1, 3, 1, 1],
          [-2, 2.5, 1, 1],
          [15, 3.5, 1, 1],
          [16, 3, 1, 1],
          [17, 2.5, 1, 1],
        ],
        fill: 'var(--suit)',
      },
      {
        kind: 'rects',
        px: [
          [-3, 2, 1, 1],
          [18, 2, 1, 1],
        ],
        fill: 'var(--gloves)',
      },
    ],
  )

/**
 * Alarmed: the suit, the cape over his shoulders as the films drape it, from beside the cowl down his
 * sides to its tails, open in front over his chest and its bat (one half, mirrored); its back hangs
 * behind him.
 */
const OVER_SHOULDERS = 'M3 3.4 L3 5.2 L3.4 5.8 L3.4 10.8 L1.4 10.8 L-0.6 11.5 L0.6 6.4 L0.8 3.6 Z'
const caped = gracePose(
  GRACE_STANDING,
  [{ kind: 'cape', d: TAILS.hanging }],
  [{ kind: 'path', d: OVER_SHOULDERS, className: 'clawd__cape', mirrored: true }],
)

/** How far the leap leans him forward, in degrees, clockwise as CSS turns. */
const TILT = 12
/** Where CSS turns him (the mover's default transform-origin): the middle of his frame, on his grid. */
const PIVOT = [VIEW[0] + VIEW[2] / 2, VIEW[1] + VIEW[3] / 2] as const
/**
 * A path turned `degrees` about the pivot, a decimal kept. Its points must be absolute x y pairs
 * (M and L): a relative command, H, V or a comma would be turned wrong.
 */
const turned = (d: string, degrees: number) => {
  const [cx, cy] = PIVOT
  const [cos, sin] = [Math.cos((degrees * Math.PI) / 180), Math.sin((degrees * Math.PI) / 180)]
  const at = (v: number) => String(Number(v.toFixed(1)))
  return d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x: string, y: string) => {
    const [dx, dy] = [Number(x) - cx, Number(y) - cy]
    return `${at(cx + dx * cos - dy * sin)} ${at(cy + dx * sin + dy * cos)}`
  })
}
/**
 * The bolt behind the leap, top right to bottom left as on the Book One cover: from above his fist
 * down through the gap between his legs, a jagged path a unit wide, white with a blue light around
 * it, never a flash. Drawn as seen, then turned back by his tilt about the pivot, so it stands 14
 * degrees off vertical once he leans into the leap.
 */
const BOLT = turned(
  'M11.6 -6 L12.6 -6 L11.4 -1.6 L12.6 -1.2 L9.6 5 L10.6 5.4 L7.6 14 L6.6 14 L9.2 6.2 L8.2 5.8 ' +
    'L11.2 -0.4 L10 -0.8 Z',
  -TILT,
)
/** His fists in the leap: one above his trailing shoulder, one ahead and below his leading one. */
const LEAP_FISTS: Px[] = [
  [0.5, 0.4, 1.5, 1.6],
  [16.4, 7, 1.3, 1.3],
]
/**
 * In the leap, one arm from each shoulder, short: his trailing arm straight up beside the cowl, its
 * fist above his shoulder; his leading arm reaching down and forward. The fists are black on a dark
 * ground, so they wear the cape's rim, drawn first so only its outer half shows past them.
 */
const LEAP_LIMBS: Layer[] = [
  {
    kind: 'rects',
    px: [
      // Down to his shoulder's top at y 4, and step to step by an edge, never a corner, so no cape
      // shows through a gap in either arm.
      [1, 2, 1, 2],
      [15, 5, 1, 1.5],
      [16, 6, 1, 1.2],
    ],
    fill: 'var(--suit)',
  },
  { kind: 'rects', px: LEAP_FISTS, className: 'clawd__cape-rim' },
  { kind: 'rects', px: LEAP_FISTS, fill: 'var(--gloves)' },
]
/** Leaping, the bolt behind him at a strength, or not yet there. */
const leaping = (bolt?: number) => {
  const behind: Layer[] = [{ kind: 'cape', d: TAILS.wedge }]
  // White, lit blue around it by the Theme's stylesheet, which gives the bolt's class its glow.
  if (bolt !== undefined)
    behind.unshift({
      kind: 'path',
      d: BOLT,
      fill: 'var(--lens-core)',
      className: 'clawd__bolt',
      opacity: bolt,
    })
  return gracePose(GRACE_LEAPING, behind, LEAP_LIMBS)
}
/**
 * Launched: raised about two units at the header's size (a nudge is in px) and leaning into the
 * leap, top forward toward where he faces, as the cover's figure leans 24 degrees (rotate turns
 * clockwise; half that reads on a body that is all head and torso).
 */
const LAUNCH = `translateY(-4px) rotate(${TILT}deg)`

/**
 * The lightning leap (the Signature pose), after the Book One cover: on the ledge facing right, then
 * launched, leaning forward, an arm up and an arm ahead, the cape a wedge trailing up and back;
 * then the bolt appears behind him all at once, never drawn stroke by stroke or flashed, and stays,
 * dimming a step later as he holds the leap like a freeze-frame on a screen.
 */
const THE_LEAP: Script = [
  {
    pose: gracePose(GRACE_STANDING, [{ kind: 'cape', d: TAILS.bunched }]),
    look: GAZE,
    transform: 'translateY(2px)',
  },
  { pose: leaping(), look: GAZE, transform: LAUNCH },
  { pose: leaping(1), look: GAZE, transform: LAUNCH },
  { pose: leaping(0.85), look: GAZE, transform: LAUNCH },
]

export const ANCIENT_GRACE_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(GRACE_SEATED, TAILS.wrapped, [GRACE_COWL_EDGE])],
    flying: [drop(TAILS.canopyA), drop(TAILS.canopyB)],
    alarmed: [caped],
  },
  // On the perch he holds the leap, looks ahead, then down to the street.
  watch: watchOn(THE_LEAP, [{ look: GAZE }, { look: 0, lookY: 0.4 }]),
  signature: THE_LEAP,
  // Lightning Cyan is the Alarm color and never shows at rest: the bolt is white, lit blue.
  aura: 'alarmed',
}

// --- BLUE COLLAR: the working suit, after Scott Snyder and Nick Dragotta's Absolute Batman
// (absolute-batman.md, section 7). The hulking city engineer: a cold teal suit over huge round
// shoulders, black stripes on his forearms, the block across his chest that comes off as an axe's
// head, an olive belt with its pouches, and a black cape whose hem ends in long blades. ---

/**
 * Below the cowl, his shoulders: round, past his body each side, wider than his waist, so he tapers
 * to the belt as the #1 cover draws him (DKR's bulk is a barrel; his is a wedge).
 */
const COLLAR_SHOULDERS = ['..SSSSSSSSSSSS..', '.SSSSSSSSSSSSSS.', 'SSSSSSSSSSSSSSSS', 'SSSSSSSSSSSSSSSS']
/** His arms hanging apart from his body, black stripes across the forearms, down to his gloves. */
const ARMS_DOWN = ['.g.SSSSSSSSSS.g.', '.S.SSSSSSSSSS.S.', '.g.SSSSSSSSSS.g.']
/** The olive belt, its pouches darker. */
const BELT = '...bbkbbbbkbb...'
/**
 * The belt a full unit, his gloves hanging beside it; then the black trunks he wears over the suit,
 * his teal legs and black boots.
 */
const COLLAR_BELOW = ['.g.bbkbbbbkbb.g.', BELT, '...cccccccccc...', '....S.S..S.S....', '....g.g..g.g....']
/** A row with one of his arms raised out of the map: its three columns at that side blanked. */
const armRaised = (side: 'left' | 'right') => (row: string) =>
  side === 'left' ? `...${row.slice(3)}` : `${row.slice(0, 13)}...`
const collarMap = (arms: readonly string[], below: readonly string[] = COLLAR_BELOW) =>
  map([], [...COLLAR_SHOULDERS, ...arms, ...below])
/** One arm raised, the other hanging, its glove beside the belt. */
const oneArmUp = (side: 'left' | 'right') =>
  collarMap(ARMS_DOWN.map(armRaised(side)), [armRaised(side)(COLLAR_BELOW[0]!), ...COLLAR_BELOW.slice(1)])
const COLLAR_STANDING = collarMap(ARMS_DOWN)
const COLLAR_SEATED = collarMap([SUIT, SUIT, SUIT, SUIT], [])
/** Standing wide as on the #1 cover: his arms drawn in front of him, his feet planted apart. */
const COLLAR_WIDE = collarMap(
  [SUIT, SUIT, SUIT],
  [BELT, BELT, COLLAR_BELOW[2]!, '...SS......SS...', '...gg......gg...'],
)

/**
 * The block across his chest, a flat slab 8 units wide and 3 tall, from under his jaw to the belt
 * (picked on screen, #121: the insignia's own 1.65:1 read as a mouth under the orange jaw).
 */
const CHEST_BLOCK: Layer = { kind: 'emblem', cx: 8, cy: 6.6, width: 8, height: 3 }

/**
 * A path in the cape's black and rim (the cape, and what is made like it: his pads), mirrored
 * across him unless it says otherwise, smooth if curved.
 */
const inCape = (d: string, { mirrored = true, smooth = false } = {}): Layer => ({
  kind: 'path',
  d,
  className: 'clawd__cape',
  mirrored,
  smooth,
})

/** The cape's hem in long blades, the outer one hooked. */
const BLADES = {
  /** Hanging behind him, three blades a side (left half; mirrored). */
  hanging:
    'M8 5 L1 5 L0.2 8.6 L-0.6 11.9 L0.2 11.3 L0.8 10.5 L1.6 11.9 L2.4 10.5 L3.2 11.9 L4 10.4 L8 10.4 Z',
  /** Closed round him, asleep. */
  wrapped:
    'M2.6 6.4 L13.4 6.4 L14.6 11.6 L13.6 10.4 L12.8 11.6 L12 10.4 L11.2 11.4 L4.8 11.4 L4 10.4 ' +
    'L3.2 11.6 L2.4 10.4 L1.4 11.6 Z',
  /** Swinging out behind him on the line, its blades trailing to the left. */
  swung:
    'M3 5 L13 5 L13 10 L10 10.4 L8 11.6 L7 10.2 L5 11.6 L4.4 10 L2 11.4 L1.4 9.6 L-1.4 10.8 L-1 9 ' +
    'L-3.8 9.6 L-2.6 7.6 L-5.6 7.6 Z',
}

/** A shoulder pad's plate, capping his shoulder and running a little way down his arm (left half). */
const PAD = 'M3.6 5 L3.6 6.1 Q1.9 6.3 0.3 7.3 L-0.1 6.3 Q0.3 4.8 2.2 4.6 Z'
/** Where each of a pad's three spikes stands on it: its left and right foot (left half). */
const SPIKE_FEET = [
  [0.6, 5.4, 1, 5.1],
  [1.6, 4.8, 2.1, 4.7],
  [2.8, 4.7, 3.3, 4.7],
] as const
/** His pads with their spikes out to these tips. */
const padsTo = (tips: readonly (readonly [number, number])[]) =>
  inCape(
    [
      PAD,
      ...SPIKE_FEET.map(
        ([x0, y0, x1, y1], i) => `M${x0} ${y0} L${tips[i]![0]} ${tips[i]![1]} L${x1} ${y1} Z`,
      ),
    ].join(' '),
    { smooth: true },
  )
/**
 * His shoulder pads, as on the #1 cover: black plates over his arms (mirrored), small spikes along
 * their tops, or the spikes out long when something needs the user.
 */
const PADS = {
  rest: padsTo([
    [0.2, 4.6],
    [1.5, 4],
    [2.9, 3.9],
  ]),
  out: padsTo([
    [-0.2, 3.6],
    [1.2, 3.2],
    [3, 3],
  ]),
}

/** A pose in the working suit: the block on his chest and his pads at rest, unless it says otherwise. */
const collarPose = (
  map: OutfitMap,
  behind: Layer[],
  front: Layer[] = [],
  { chest = [CHEST_BLOCK], pads = PADS.rest }: { chest?: Layer[]; pads?: Layer } = {},
) => pose(map, behind, [...front, pads], { chest })

/**
 * An arm raised at column `x`, its glove at `top` (a unit above his shoulder unless told), the suit
 * `length` units down from it, holding `held` under the glove.
 */
const raisedArm = (x: number, held: Layer[] = [], top = 2, length = 3): Layer[] => [
  { kind: 'rects', px: [[x, top + 1, 1, length]], fill: 'var(--suit)' },
  ...held,
  { kind: 'rects', px: [[x, top, 1, 1]], fill: 'var(--gloves)' },
]

/** The tether up from his raised right hand, past the frame's top. */
const LINE: Layer = { kind: 'path', d: 'M14 4 L14.5 4 L16.5 -2 L16 -2 Z', fill: 'var(--cowl-edge)' }
/** On a line (flying): his right hand up on the tether, the cape swung out behind him. */
const onALine = collarPose(oneArmUp('right'), [{ kind: 'cape', d: BLADES.swung }, LINE], raisedArm(14))

/**
 * The axe (alarmed): the block gone from his chest, its head raised over his left shoulder on a
 * short handle down to his hand, his shoulder spikes out.
 */
const theAxe = collarPose(
  oneArmUp('left'),
  [{ kind: 'cape', d: BLADES.hanging, mirrored: true }],
  [
    ...raisedArm(1, [{ kind: 'rects', px: [[1.2, 0.8, 0.6, 2.2]], fill: 'var(--buckle)' }]),
    // Its head, the block itself, inside the frame's top.
    { kind: 'emblem', cx: 1.5, cy: 0.25, width: 4, className: 'clawd__cape' },
  ],
  { chest: [], pads: PADS.out },
)

/** Standing, the cape hanging in its blades. */
const standing = collarPose(COLLAR_STANDING, [{ kind: 'cape', d: BLADES.hanging, mirrored: true }])

/**
 * His arms on the #1 cover: from the shoulder down and in to the hand at his hip, a straight
 * diagonal, two black stripes across the forearm, then the glove (left; mirrored).
 */
const ARM_IN: Layer[] = [
  { kind: 'path', d: 'M1.63 5.6 L5.22 8.05 L4.61 8.97 L0.97 6.6 Z', fill: 'var(--suit)', mirrored: true },
  {
    kind: 'path',
    d:
      'M3.73 7 L4.15 7.28 L3.49 8.28 L3.07 8 Z M4.48 7.52 L4.9 7.8 L4.25 8.77 L3.83 8.49 Z ' +
      'M5.17 7.94 L5.84 8.38 L5.16 9.42 L4.48 8.97 Z',
    fill: 'var(--gloves)',
    mirrored: true,
  },
]
/**
 * The cape on the #1 cover (drawn with the maintainer on screen, #121): none of it hangs behind him,
 * so the night shows past his sides and between his legs; in front, a strip along each arm from the
 * shoulder to the hand at his hip, then the cloth running on past the hand and crossing to the
 * opposite foot. Its edges curve as the cover's cloth does (left halves; mirrored).
 */
const STAND_CAPE = {
  /** A narrow strip along the outside of his arm, shoulder to hand (drawn under the arm). */
  sleeve: 'M1.02 6.52 Q3 7.6 4.8 9.04 L4.55 9.41 Q2.6 8.2 0.75 6.93 Z',
  /** Just taken in his hand: a short fall below it. */
  gripped: 'M4.6 8.8 L6.2 8.8 Q6.4 9.8 7.2 10.6 Q5.4 10.2 4.6 8.8 Z',
  /**
   * Pulled across him: from his left hand down and across to his right foot, curving, wide as a wing,
   * its lower edge scalloped to a wing tip at the outer corner; mirrored, the right hand's crosses
   * over it to his left foot, an X in front of his legs. Its tips stop above the frame's last row,
   * which the perch keeps below the window's edge.
   */
  taut: 'M4.6 9 L6.2 9 Q9.4 10.1 13.8 10.8 L13 11.25 L12 10.95 L11.2 11.25 L10 11 L9 11.25 Q6.8 10.6 4.6 9 Z',
}
/** Standing as on the #1 cover, the cape's fall from his hands as `fall` draws it. */
const holding = (fall: string) =>
  collarPose(
    COLLAR_WIDE,
    [],
    [inCape(STAND_CAPE.sleeve, { smooth: true }), ...ARM_IN, inCape(fall, { smooth: true })],
  )
const pulledTaut = holding(STAND_CAPE.taut)
/**
 * The stand on the #1 cover (the Signature pose, picked on screen, #121): feet planted wide, he
 * takes the cape's edges at his hips and pulls it taut in front of him. His eyes stay level: lowered,
 * they would sit on his jaw (the Costume Rule keeps them in the cowl).
 */
const THE_STAND: Script = [
  { pose: standing, look: 0 },
  { pose: holding(STAND_CAPE.gripped), look: 0 },
  { pose: pulledTaut, look: 0 },
]

/** Asleep, wrapped in the cape, his shoulder pads over it. */
const wrapped = seated(COLLAR_SEATED, BLADES.wrapped)
const asleep: Pose = { ...wrapped, front: [...wrapped.front, PADS.rest] }

export const BLUE_COLLAR_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [asleep],
    flying: [
      { ...onALine, transform: 'rotate(3deg)' },
      { ...onALine, transform: 'rotate(-3deg)' },
    ],
    alarmed: [theAxe],
  },
  watch: watchOn(THE_STAND, [{ look: -GAZE }, { look: GAZE }]),
  signature: THE_STAND,
  // SFX Lemon is the Alarm color and never shows at rest.
  aura: 'alarmed',
}

// --- HOLIDAY: Batman as Tim Sale draws him in The Long Halloween (long-halloween.md, section 8):
// a blue cowl with long ears tapering from wide roots, a blue mantle over his shoulders, the lit
// chest blue-grey with the book's Signal bat on it, a full unit of gold capsule belt, and a huge blue
// bell of a cape to the ground. Alarmed, a jack-o'-lantern lights at his feet. ---

/**
 * His head under the long ears: no ear tips on the grid (the ears are drawn behind it), and the brow
 * a unit narrower each side, so the ears run down to it and stand taller.
 */
const HOLIDAY_HEAD = twice([
  '................',
  '.....chcccc.....',
  '...cccccccccc...',
  '...cccccccccc...',
  '...cc######cc...',
])
/** The blue mantle over his shoulders, wider than the suit, a unit tall under his jaw. */
const MANTLE = '..cccccccccccc..'
/** The gold capsule belt, a full unit, its pouches darker; the trunks; his legs; his boots. */
const HOLIDAY_BELOW = [
  ...twice(['...bbkbbbbkbb...']),
  '....c.c..c.c....',
  '....S.S..S.S....',
  ...twice(['....g.g..g.g....']),
]
const holidayMap = (chest: readonly string[], rows: readonly string[] = HOLIDAY_BELOW) =>
  map([MANTLE, ...chest], rows, LEGEND, HOLIDAY_HEAD)
const HOLIDAY_STANDING = holidayMap([SUIT, SUIT])
const HOLIDAY_ARMS_OUT = holidayMap(['.gSSSSSSSSSSSSg.', SUIT])
const HOLIDAY_SEATED = holidayMap([SUIT, SUIT, SUIT], [])
const HOLIDAY_REACHING = holidayMap([REACHING, SUIT])

/**
 * The cowl's outline without ears: they are drawn behind it, long, outlined on their own. Across
 * their roots it runs under the head's cells, so it draws no seam over them.
 */
const HOLIDAY_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 3 L5 3 L5 1 L11 1 L11 3 L13 3 L13 5 Z',
  className: 'clawd__cowl-edge',
}
/**
 * Sale's long ears: from roots two units wide on the cowl's sides, from under the narrow brow up to
 * thin tips at the frame's top, three units tall, their outer edges in line with the cowl's sides.
 */
const LONG_EARS_D = 'M3 3 L3 -0.9 L3.5 -0.9 L5 1.4 L5 3 Z M13 3 L13 -0.9 L12.5 -0.9 L11 1.4 L11 3 Z'
/** A shape outlined in the cowl's neutral edge, then filled: so it stands off the dark behind it. */
const outlined = (d: string, fill: string): Layer[] => [
  { kind: 'path', d, className: 'clawd__cowl-edge' },
  { kind: 'path', d, fill },
]
/** Ears drawn behind the cowl: their outline in the cowl's edge, then their cloth in its black. */
const earsOf = (d: string): Layer[] => outlined(d, 'var(--cowl)')
const LONG_EARS = earsOf(LONG_EARS_D)

/** The book's Signal bat on his chest, a unit and a half tall, between the mantle and the belt. */
const SIGNAL_BAT: Layer = { kind: 'emblem', cx: 8, cy: 7.25, width: 2.2 }

/** The cape: a huge bell from the shoulders to the ground, its hem curved, never toothed. */
const BELL = {
  /** Hanging behind him, flaring wide to a hem just above the perch's edge. */
  hanging:
    'M2 4.6 L14 4.6 Q15.6 4.8 16.1 6.2 Q17 8.8 17.6 11 Q8 11.4 -1.6 11 Q-1 8.8 -0.1 6.2 Q0.4 4.8 2 4.6 Z',
  /** Its long soft folds, from the shoulders to the hem, either side of him. */
  folds: 'M1.4 5.6 Q0.4 8.2 0 10.9 M14.6 5.6 Q15.6 8.2 16 10.9',
  /** Closed round him, asleep, pooling wider than his feet. */
  wrapped: 'M2.6 6.2 L13.4 6.2 Q14.8 8.4 15.4 10.9 Q8 11.3 0.6 10.9 Q1.2 8.4 2.6 6.2 Z',
  /** Thrown open behind his outstretched arms (left half; mirrored for the right). */
  openLeft: 'M3.4 4.8 L0.2 5 Q-1.2 7.6 -2 11 Q0.6 10.6 3.4 11 Z',
  /** Trailing behind him to the left as he flies right, huge and unpointed, in three soft folds. */
  trailA:
    'M3 4.8 L13 4.8 L13.2 9 Q12 10.8 9 10.6 Q5.6 11 2.4 10.4 Q-1.4 10.4 -5.6 9.4 Q-3.6 8.4 -4.6 7.2 ' +
    'Q-2.2 6.6 -2.8 5.6 Q0 5 3 4.8 Z',
  /** The same a beat later, its hem lifted on the air. */
  trailB:
    'M3 4.8 L13 4.8 L13.2 8.8 Q12 10.4 9 10.2 Q5.6 10.5 2.4 9.8 Q-1.4 9.6 -5.8 8.4 Q-3.8 7.6 -4.8 6.4 ' +
    'Q-2.2 6 -2.8 5.2 Q0 4.9 3 4.8 Z',
}

/** A pose in Sale's suit: the long ears behind the cowl, the Signal bat on his chest. */
const holidayPose = (map: OutfitMap, behind: Layer[], front: Layer[] = []) =>
  pose(map, [...LONG_EARS, ...behind], front, { chest: [SIGNAL_BAT], edge: HOLIDAY_EDGE })

/** The bell hanging behind him, its folds drawn on it. */
const HANGING: Layer[] = [
  { kind: 'cape', d: BELL.hanging },
  { kind: 'path', d: BELL.folds, className: 'clawd__rib' },
]

/**
 * A jack-o'-lantern lit at his right foot (the #1 and #13 covers): a pumpkin in the Alarm color, its
 * carved eyes and grin lit from inside in the lens's core. Only while something needs the user.
 */
const LANTERN: Layer[] = [
  { kind: 'rects', px: [[14.75, 8.75, 0.35, 0.45]], fill: 'var(--cape)' },
  {
    kind: 'path',
    d: 'M13.6 10.1 a1.3 1.05 0 1 0 2.6 0 a1.3 1.05 0 1 0 -2.6 0 Z',
    fill: 'var(--signal)',
    smooth: true,
  },
  {
    kind: 'path',
    d:
      'M14.1 9.95 L14.6 9.5 L14.75 10.05 Z M15.7 9.95 L15.2 9.5 L15.05 10.05 Z ' +
      'M14.1 10.45 L15.7 10.45 L15.3 10.85 L14.5 10.85 Z',
    fill: 'var(--lens-core)',
    smooth: true,
  },
]

/** The lantern: his arms out, the bell thrown open behind him, the pumpkin lit at his foot. */
const lantern = holidayPose(
  HOLIDAY_ARMS_OUT,
  [BACK, { kind: 'cape', d: BELL.openLeft, mirrored: true }],
  LANTERN,
)

/** Flying right, one arm reaching ahead, the bell trailing far behind him. */
const holidayFlying = (trail: string) => holidayPose(HOLIDAY_REACHING, [{ kind: 'cape', d: trail }])

/** His right arm up at his shoulder, in the suit's blue-grey, its glove gathering the cape. */
const GATHERING: Layer[] = [
  { kind: 'rects', px: [[13, 5.6, 1, 1]], fill: 'var(--suit)' },
  { kind: 'rects', px: [[12.6, 4.9, 1.2, 0.8]], fill: 'var(--gloves)' },
]

/**
 * The long cape (the collected edition's cover): gathered at his right shoulder, it sweeps down and
 * left in one great wedge to the ground, its hem rippled in long folds. Its outline is a right
 * triangle, upright on his right side, open above the slope (long-halloween.md, section 8.3, B).
 */
const SWEEP = {
  half: 'M14 4 L14.2 11 Q11 10.6 8 11 Q5 10.6 2 11 Q0 10.7 -2.4 11 Q1.6 4.8 14 4 Z',
  /** Swept to the ground: its top bowing up and out over his left like the cover's, a great curve. */
  full: 'M14.2 3.4 L14.2 11 Q11.2 10.6 8.4 11 Q5.2 10.5 2.2 11 Q-1.2 10.5 -5.5 11 Q-2.6 3.6 14.2 3.4 Z',
  /** The same, its hem lifted a unit by a gust. */
  lifted: 'M14.2 3.4 L14.2 10.2 Q11.2 9.8 8.4 10.2 Q5.2 9.6 2.2 10 Q-1.2 9.4 -5.5 9.8 Q-2.6 3.4 14.2 3.4 Z',
  /** The light along its top, as the cover lights it from the moon. */
  lit: 'M14.2 3.4 Q-2.6 3.6 -5.5 11 Q-1.6 5 14.2 4.4 Z',
  folds: 'M12.4 5.4 Q4 6.6 -1.6 10.8 M12.8 6.4 Q6.4 8 2.4 10.8 M12.6 7.6 Q9.4 9 7.4 10.9',
  /** The light and the folds on the lifted cape, ending on its higher hem. */
  liftedLit: 'M14.2 3.4 Q-2.6 3.4 -5.5 9.8 Q-1.6 4.8 14.2 4.4 Z',
  liftedFolds: 'M12.4 5.4 Q4 6.4 -1.6 9.6 M12.8 6.4 Q6.4 7.8 2.4 9.9 M12.6 7.6 Q9.4 8.8 7.4 10',
}
/** Its long folds, and the light along its top. */
const ripples = (lit: string, folds: string): Layer[] => [
  { kind: 'path', d: lit, fill: 'var(--cowl-shine)' },
  { kind: 'path', d: folds, className: 'clawd__rib' },
]
const RIPPLES = ripples(SWEEP.lit, SWEEP.folds)
const sweptWith = (cape: string, folds: Layer[] = RIPPLES): Pose =>
  holidayPose(HOLIDAY_STANDING, [{ kind: 'cape', d: cape }, ...folds], GATHERING)
const DOWN_LEFT = { look: -GAZE, lookY: 0.3 }

/** Four steps: standing in the pooled bell; the glove rises to the shoulder; half swept; swept to the ground. */
const THE_LONG_CAPE: Script = [
  { pose: holidayPose(HOLIDAY_STANDING, HANGING), look: 0 },
  { pose: holidayPose(HOLIDAY_STANDING, HANGING, GATHERING), look: -GAZE },
  { pose: sweptWith(SWEEP.half, []), ...DOWN_LEFT },
  { pose: sweptWith(SWEEP.full), ...DOWN_LEFT },
]

/** Once a watch, a gust lifts the hem a unit and lets it fall. */
const GUST: readonly Step[] = [
  { pose: sweptWith(SWEEP.lifted, ripples(SWEEP.liftedLit, SWEEP.liftedFolds)), ...DOWN_LEFT },
  { pose: sweptWith(SWEEP.full), ...DOWN_LEFT },
]

export const HOLIDAY_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(HOLIDAY_SEATED, BELL.wrapped, [...LONG_EARS, HOLIDAY_EDGE])],
    // Two frames on the flying cadence: the hem lifts on the air.
    flying: [holidayFlying(BELL.trailA), holidayFlying(BELL.trailB)],
    alarmed: [lantern],
  },
  // On the perch he stands with the cape swept to the ground, looks along the street and back; once
  // a watch, a gust lifts its hem.
  watch: watchOn(THE_LONG_CAPE, [{ look: -GAZE }, { look: GAZE }], GUST),
  signature: THE_LONG_CAPE,
  // The jack-o'-lantern is the Alarm color and never shows at rest: no aura as he sweeps the cape.
  aura: 'alarmed',
}

// --- DARK DECO: Batman as Bruce Timm drew him for The Animated Series (animated-series.md, section 8;
// dark-deco-build.md, section 4), black with navy only where the light touches (the maintainer, on
// screen): a black cowl with navy at its brow and taller ears flush with its sides, the blue-grey
// suit with the yellow oval that never lights, a full unit of gold belt, black gloves, trunks and
// boots, and a black cape close behind him, its hem in a few soft scallops. ---

/** His head with the ears drawn behind it: no ear tips on the grid. */
const DECO_HEAD = twice([
  '................',
  BROW,
  '...cccccccccc...',
  '...cccccccccc...',
  '...cc######cc...',
])
/** The gold belt, a full unit; the trunks; his legs; his boots. */
const DECO_BELOW = [
  ...twice(['...bbbbbbbbbb...']),
  '....g.g..g.g....',
  '....S.S..S.S....',
  ...twice(['....g.g..g.g....']),
]
/**
 * His map: the head, the collar's half-row and the suit to the waist with his arms on its second
 * unit, then the belt, the trunks, his legs and boots (or, seated, the suit down to the cape's hem).
 */
const decoMap = (arms = SUIT, below: readonly string[] = DECO_BELOW) =>
  map([arms], [SUIT, SUIT, ...below], LEGEND, [...DECO_HEAD, COLLAR, SUIT])
const DECO_STANDING = decoMap()
const DECO_ARMS_OUT = decoMap('.gSSSSSSSSSSSSg.')
const DECO_SEATED = decoMap(SUIT, twice([SUIT, SUIT]))

/** Timm's ears: flush with the cowl's sides, the outer edge straight up, the inner slanting in. */
const TIMM_EARS = earsOf('M3 2 L3 -0.6 L3.4 -0.6 L4.6 1 L4.6 2 Z M13 2 L13 -0.6 L12.6 -0.6 L11.4 1 L11.4 2 Z')
const DECO_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 2 L4.6 2 L4.6 1 L11.4 1 L11.4 2 L13 2 L13 5 Z',
  className: 'clawd__cowl-edge',
}

/**
 * The 1992 oval on his chest, 5 units across, between the collar and the belt, its rim resting on the
 * belt; with his arms crossed over its foot, a little smaller and higher, clear of his jaw.
 */
const DECO_CHEST = chestPlate(EMBLEM_1992, { cx: 8, cy: 6.75, rx: 2.3 })
const DECO_CHEST_HIGH = chestPlate(EMBLEM_1992, { cx: 8, cy: 6.6, rx: 2 })

/** A half of the cape behind him (the left; mirrored for the right), and where the light turns it navy. */
interface CapeHalf {
  cloth: string
  light: string
}
/** The black cape, its light along its top as it spreads and over his shoulder as it falls. */
const DECO_CAPE: Record<'hanging' | 'wing' | 'wingLifted' | 'open', CapeHalf> = {
  /** Hanging close behind him, just past his sides, its hem in one soft scallop. */
  hanging: {
    cloth: 'M3 4.8 L2.4 5.2 Q2 7.8 2 10.9 Q2.7 10.3 3.4 10.9 L5.4 10.9 L5.4 5 Z',
    light: 'M3 4.8 L2.4 5.2 Q2.1 6.2 2.1 7.2 Q2.8 5.9 3.4 5.8 Z',
  },
  /** Spread from the hands at his shoulders, legs together under it: the storyboard's drop [97]. */
  wing: {
    cloth: 'M3 5 L1 4.6 L-4.6 5.2 Q-4.2 7.6 -3.2 9 Q-2 8.2 -0.8 9.8 Q0.6 9 1.6 10.4 Q2.4 10 3 10.4 Z',
    light: 'M3 5 L1 4.6 L-4.6 5.2 L-4.5 6.3 L1 5.7 L3 6.1 Z',
  },
  /** The same a beat later, its tips lifted on the air. */
  wingLifted: {
    cloth: 'M3 5 L1 4.4 L-4.8 4.6 Q-4.4 7 -3.4 8.4 Q-2.2 7.6 -1 9.2 Q0.4 8.4 1.4 9.8 Q2.2 9.4 3 9.8 Z',
    light: 'M3 5 L1 4.4 L-4.8 4.6 L-4.7 5.7 L1 5.5 L3 5.9 Z',
  },
  /** Thrown open behind him, alarmed, not too wide, its hem in two soft scallops. */
  open: {
    cloth: 'M4.8 5 L1.2 5.2 Q-0.4 7.6 -1.4 10.9 Q0 10.2 1 10.9 Q2.2 10.2 4.8 10.9 Z',
    light: 'M3.4 5 L1.2 5.2 Q0.4 6.4 -0.2 7.8 Q1.2 6 3.4 5.9 Z',
  },
}
/** The cape closed round him, asleep, its hem in soft scallops (whole, in front of him). */
const DECO_WRAPPED =
  'M2.6 6.2 L13.4 6.2 L14.2 10.9 Q12.6 10.2 11 10.9 Q9.4 10.2 8 10.9 Q6.6 10.2 5 10.9 Q3.4 10.2 1.8 10.9 Z'
/** A cape's two halves behind him, and the navy where the light touches them. */
const decoCaped = ({ cloth, light }: CapeHalf): Layer[] => [
  { kind: 'cape', d: cloth, mirrored: true },
  { kind: 'path', d: light, fill: 'var(--cowl-shine)', mirrored: true },
]
/**
 * The cape's back between his legs: the same cloth and rim as the rest of it, hidden at its sides
 * behind his outer legs so only its scalloped hem shows; his legs edged in the rim's blue so his black
 * boots read in front of it (the maintainer, on screen).
 */
const DECO_BACK: Layer[] = [
  {
    kind: 'path',
    d: 'M4.5 8.8 L11.5 8.8 L11.5 10.9 Q10.6 10.2 9.6 10.9 Q8 10.1 6.4 10.9 Q5.4 10.2 4.5 10.9 Z',
    className: 'clawd__cape',
  },
  {
    kind: 'rects',
    px: [
      [3.8, 9, 1.4, 2.1],
      [5.8, 9, 1.4, 2.1],
      [8.8, 9, 1.4, 2.1],
      [10.8, 9, 1.4, 2.1],
    ],
    fill: 'var(--cowl-edge)',
  },
]

const decoPose = (map: OutfitMap, behind: Layer[], front: Layer[] = [], chest: Layer[] = DECO_CHEST) =>
  pose(map, [...TIMM_EARS, ...behind], front, { chest, edge: DECO_EDGE })

/** Flying, the drop: the cape spread from his hands at his shoulders, two frames lifting its tips. */
const decoFlying = (wing: CapeHalf) => decoPose(DECO_ARMS_OUT, decoCaped(wing))
/** Alarmed: his arms out as in most Themes, the cape thrown open behind him, the aura lit. */
const decoAlarmed = decoPose(DECO_ARMS_OUT, [...DECO_BACK, ...decoCaped(DECO_CAPE.open)])
/**
 * His upper arms down his sides and his forearms crossed over his chest, each edged in the rim's blue
 * so they read as arms on the suit (the maintainer, on screen).
 */
const CROSSED: Layer[] = [
  {
    kind: 'rects',
    px: [
      [2.3, 5.3, 1.6, 2.9],
      [12.1, 5.3, 1.6, 2.9],
      [2.6, 7.1, 10.8, 1.2],
    ],
    fill: 'var(--cowl-edge)',
  },
  {
    kind: 'rects',
    px: [
      [2.5, 5.5, 1.2, 2.5],
      [12.3, 5.5, 1.2, 2.5],
    ],
    fill: 'var(--suit)',
  },
  { kind: 'rects', px: [[2.8, 7.3, 10.4, 0.8]], fill: 'var(--gloves)' },
]
/** The cape hanging straight down behind him. */
const HANGING_CAPE = [...DECO_BACK, ...decoCaped(DECO_CAPE.hanging)]

/**
 * Arms crossed, the official key art of the 2004 Volume One DVD, still HBO Max's [76] [77]: standing
 * in his cape, then his forearms crossed over his chest at the oval's foot.
 */
const ARMS_CROSSED: Script = [
  { pose: decoPose(DECO_STANDING, HANGING_CAPE), look: 0 },
  { pose: decoPose(DECO_STANDING, HANGING_CAPE, CROSSED, DECO_CHEST_HIGH), look: 0 },
]

export const DARK_DECO_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(DECO_SEATED, DECO_WRAPPED, [...TIMM_EARS, DECO_EDGE])],
    flying: [decoFlying(DECO_CAPE.wing), decoFlying(DECO_CAPE.wingLifted)],
    alarmed: [decoAlarmed],
  },
  // On the perch, his arms crossed, he looks along the roof and back.
  watch: watchOn(ARMS_CROSSED, [{ look: -GAZE }, { look: GAZE }]),
  signature: ARMS_CROSSED,
  aura: 'alarmed',
}

// --- SILENT PREDATOR: the armoured suit of Rocksteady's Arkham Asylum (arkham-games.md, section 8.1;
// silent-predator-build.md, section 4): dark-grey plates over his body, a black cowl with tall ears,
// gloves and cape, the cape worn over his shoulders like a mantle, the trilogy's bat tone on tone
// across his chest, a brass-khaki pouch belt, and three fins on his gauntlet. On the perch he
// crouches on a stone gargoyle, the cape spread over its back. ---

/**
 * Asylum's ears [04] [05]: tall, about two fifths of his head, narrow and nearly upright, set in from
 * the cowl's sides; drawn behind the cowl, so his head carries no ear tips on the grid (picked on
 * screen over the standard ears).
 */
const EARS = earsOf('M4.2 1.4 L4.5 -1 L5.1 -1 L5.7 1.4 Z M11.8 1.4 L11.5 -1 L10.9 -1 L10.3 1.4 Z')
/** The cowl's outline without ears, behind the face, so only its outer edge shows. */
const PREDATOR_EDGE: Layer = {
  kind: 'path',
  d: 'M3 5 L3 2 L4 2 L4 1 L12 1 L12 2 L13 2 L13 5 Z',
  className: 'clawd__cowl-edge',
}
/** His map under the earless head that DARK DECO's ears also stand behind. */
const predatorMap = (chest: readonly string[], rows: readonly string[] = []) =>
  map(chest, rows, LEGEND, DECO_HEAD)

/** The pouch belt's band, a unit tall (its pouches and buckle are drawn on it); then his four booted legs. */
const PREDATOR_BELOW = [...twice(['...bbbbbbbbbb...']), ...BELOW_WAIST.slice(2)]
const PREDATOR_STANDING = predatorMap([SUIT, SUIT, SUIT], PREDATOR_BELOW)
const PREDATOR_SEATED = predatorMap([SUIT, SUIT, SUIT, SUIT])

/** The wide flat bat across his chest, 6.5 units wide, tone on tone in the armour, under the mantle. */
const PREDATOR_CHEST: Layer = { kind: 'emblem', cx: 8, cy: 6.6, width: 6.5 }

/**
 * On a belt at y, `tall` units deep, two square pouches each side and the wide buckle plate between
 * them [04] [05], all inside the band.
 */
const pouchesAt = (y: number, tall = 1): Layer => ({
  kind: 'rects',
  px: [
    [3.5, y + 0.1 * tall, 0.8, 0.8 * tall],
    [5, y + 0.1 * tall, 0.8, 0.8 * tall],
    [7.2, y + 0.05 * tall, 1.6, 0.9 * tall],
    [10.2, y + 0.1 * tall, 0.8, 0.8 * tall],
    [11.7, y + 0.1 * tall, 0.8, 0.8 * tall],
  ],
  fill: 'var(--buckle)',
})

/** The cape's top worn over his shoulders, in front of the armour: a block of cape on each. */
const PREDATOR_MANTLE: Layer = {
  kind: 'rects',
  px: [
    [3, 5, 1.5, 1],
    [11.5, 5, 1.5, 1],
  ],
  className: 'clawd__cape',
}

/** The cape's hem in two long points a side, as Asylum's artwork shows it [04]. */
const POINTS = {
  /** Closed round him, asleep. */
  wrapped:
    'M2.6 6.4 L13.4 6.4 L14.2 11.1 L12.8 10.1 L11.6 11.1 L10.4 10.1 L5.6 10.1 L4.4 11.1 L3.2 10.1 L1.8 11.1 Z',
  /** Flung back and hanging open (left half; mirrored). */
  openLeft: 'M3.4 5 L0.4 5.2 L-2.6 10.6 L-0.8 10 L0.2 11.2 L1.6 10.2 L3.4 11 Z',
  /** Hanging under him on the line (flying), flaring out past his legs. */
  falling: 'M3 5 L13 5 L15 11.2 L13.4 10.4 L12 11.2 L10.4 10.2 L5.6 10.2 L4 11.2 L2.6 10.4 L1 11.2 Z',
}

/**
 * Fins on a forearm, three short blades along its edge from (x, y) toward his hand (`toward`), each
 * leaning back toward his elbow [04] [05]: up from the top edge of an arm held out, or out from the
 * outer side of an arm raised (`upright`, his hand above).
 */
const fins = (x: number, y: number, toward: 1 | -1, upright = false): Layer => {
  const at = (along: number, out: number) => (upright ? `${x + out} ${y + along}` : `${x + along} ${y - out}`)
  return {
    kind: 'path',
    d: [0, 0.7, 1.4]
      .map((step) => {
        const root = step * toward
        return `M${at(root, 0)} L${at(root - 0.5 * toward, 0.7)} L${at(root + 0.4 * toward, 0)} Z`
      })
      .join(' '),
    fill: 'var(--gloves)',
  }
}

/**
 * A pose in the armour: his ears, the mantle on his shoulders, the pouches on his belt and the bat on
 * his chest (the crouch's belt sits higher and narrower, and its bat is smaller).
 */
const predatorPose = (
  map: OutfitMap,
  behind: Layer[],
  front: Layer[] = [],
  { chest = PREDATOR_CHEST, belt = pouchesAt(8) }: { chest?: Layer; belt?: Layer } = {},
) =>
  pose(map, [...EARS, ...behind], [PREDATOR_MANTLE, belt, ...front], {
    chest: [chest],
    edge: PREDATOR_EDGE,
  })

/** His right arm straight up at column 13 to the glove a unit over his head, fins up its outer side. */
const GRAPNEL_ARM: Layer[] = [...raisedArm(13, [], 0, 5), fins(14, 3.6, -1, true)]
/** His left arm hanging at his side, under the mantle, the glove by his belt. */
const HANGING_ARM: Layer[] = [
  { kind: 'rects', px: [[2, 6, 1, 2]], fill: 'var(--suit)' },
  { kind: 'rects', px: [[2, 8, 1, 1]], fill: 'var(--gloves)' },
]
/** The grapnel's line, straight up from his glove past the frame's top. */
const GRAPNEL_LINE: Layer = { kind: 'rects', px: [[13.35, -6, 0.3, 6]], fill: 'var(--ash)' }

/** On the grapnel (flying): rising on the line, his legs hanging, the cape falling straight under him. */
const onTheGrapnel = predatorPose(
  PREDATOR_STANDING,
  [{ kind: 'cape', d: POINTS.falling }],
  [...HANGING_ARM, ...GRAPNEL_ARM, GRAPNEL_LINE],
)

/**
 * The counter (alarmed): his right forearm thrust out, its fins up, his left fist raised by his
 * shoulder, the cape flung open behind him (away from SAME BAT-TIME's two raised fists, decision 14;
 * picked on screen).
 */
const theCounter = predatorPose(
  PREDATOR_STANDING,
  [BACK, { kind: 'cape', d: POINTS.openLeft, mirrored: true }],
  [
    { kind: 'rects', px: [[13, 5.5, 3, 1]], fill: 'var(--suit)' },
    { kind: 'rects', px: [[16, 5.5, 1, 1]], fill: 'var(--gloves)' },
    fins(14, 5.5, 1),
    ...raisedArm(2, [], 3, 2),
  ],
)

/**
 * Crouched (the Signature), face on, after the licensed statue [65]: his arms close down his sides
 * to his hands at his hips, the belt there, his thighs filled in to his knees drawn up under him, the
 * dark only between his shins, grey down to the stone (black boots vanish into the cape behind him).
 * The maintainer, on screen: torso, hips and legs must read apart, no splits, no floating arms.
 */
const KNEES_UP = predatorMap(
  [],
  [
    SUIT,
    ...Array<string>(3).fill('..SSSSSSSSSSSS..'),
    '..gbbbbbbbbbbg..',
    ...twice([SUIT]),
    ...Array<string>(3).fill('...SSS....SSS...'),
  ],
)
/** The cape behind his crouch, down to the gargoyle's back. */
const CAPE_BEHIND: Layer = { kind: 'cape', d: 'M3 5 L13 5 L14 9.6 L2 9.6 Z' }
/** Spread from his shoulders down both sides as he lands (left half; mirrored). */
const LANDING: Layer = {
  kind: 'cape',
  d: 'M3.4 5 L1.4 5.4 L-1.6 7.6 L-3.6 11.2 L-2 10.6 L-1 11.4 L0.4 10.6 L1.6 11.2 L3.4 10.4 Z',
  mirrored: true,
}
/** Over the gargoyle's back on our left, away from its head, spread like a wing to pointed tips. */
const OVER_ITS_BACK: Layer = {
  kind: 'cape',
  d: 'M3.4 5 L1.2 5.2 L-1.6 7.2 L-4.4 10.4 L-5.4 12.4 L-3.4 11.6 L-2.2 12.6 L-0.8 11.4 L0.6 12.4 L2.2 11 L3.4 11.4 Z',
}

/**
 * The stone gargoyle he crouches on, after City's key art [24] (the maintainer, on screen: "a real
 * gargoyle under him"): a beast's back under his boots, its horned head jutting out on our right,
 * its jaws open; our own drawing.
 */
const GARGOYLE_D =
  'M0.4 13.8 L0.6 10.8 Q1.6 9.9 3.6 10 L12.6 10 L13.6 9.5 L13.9 7.8 L14.9 9.2 L15.6 8.2 L16.2 9.4 L18.6 9.6 ' +
  'L21 10.5 L19.4 11 L17 11 L17.8 11.4 L20.2 11.5 L19.2 12.3 L16.4 12.3 L16 13.8 Z'
const GARGOYLE: Layer[] = [
  // Outlined in the cowl's neutral edge, so the stone stands off the dark and off his suit.
  ...outlined(GARGOYLE_D, 'var(--stone)'),
  { kind: 'rects', px: [[1.2, 10, 11.6, 0.3]], fill: 'var(--stone-lit)' },
  { kind: 'rects', px: [[16.8, 9.95, 0.7, 0.45]], fill: 'var(--abyss)' },
]
/** Crouched on the gargoyle, the cape as `cape` lays it, a small bat on his chest under his jaw. */
const crouched = (cape: Layer): Pose => ({
  ...predatorPose(KNEES_UP, [...GARGOYLE, CAPE_BEHIND, cape], [], {
    // Under his jaw (rows 4 and 5), and the belt a half-row band at y 7.
    chest: { kind: 'emblem', cx: 8, cy: 5.8, width: 3.4 },
    belt: pouchesAt(7, 0.5),
  }),
  // Up on the gargoyle's back, by a share of his own height so it holds at every size.
  transform: 'translateY(-10%)',
})

/**
 * The gargoyle (the Signature, City's key art [23] [24]): he lands on its back with the cape spread,
 * then lets it fall over the side away from the gargoyle's head, and looks down past its jaws.
 */
const THE_GARGOYLE: Script = [
  { pose: crouched(LANDING), look: 0 },
  { pose: crouched(OVER_ITS_BACK), look: GAZE, lookY: 0.4 },
]

export const SILENT_PREDATOR_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [seated(PREDATOR_SEATED, POINTS.wrapped, [...EARS, PREDATOR_EDGE])],
    // Rising on the line, a pixel higher every other frame.
    flying: [onTheGrapnel, { ...onTheGrapnel, transform: 'translateY(-1px)' }],
    alarmed: [theCounter],
  },
  // On the perch he watches the street below, then past the gargoyle's jaws.
  watch: watchOn(THE_GARGOYLE, [
    { look: 0, lookY: 0.4 },
    { look: GAZE, lookY: 0.4 },
  ]),
  signature: THE_GARGOYLE,
  // Amber is the Alarm color and never shows at rest.
  aura: 'alarmed',
}

// --- SAME BAT-TIME: Batman as Adam West wore him in the 1966 series (adam-west.md, section 8;
// same-bat-time-build.md, section 4): a lavender suit; cowl, cape, gloves, trunks and boots in one
// violet satin with a sheen down the cowl and a neutral rim, as the TV's flat light gives; a satin
// collar under his jaw; the yellow oval with no rim, which never lights; a yellow belt with a square
// buckle; the cape to mid-calf, three points a side. On the perch he does the Batusi. ---

/** His map: the head, the satin collar's half-row, the suit with his arms on its second unit. */
const westMap = (arms = SUIT, below: readonly string[] = WEST_BELOW) =>
  map([arms], [SUIT, SUIT, ...below], LEGEND, [...HEAD, COLLAR, SUIT])
/** The belt and its buckle, a full unit; the high-cut satin trunks; his legs; his short satin boots. */
const WEST_BELOW = [
  ...twice(['...bbbbkkbbbb...']),
  '....c.c..c.c....',
  '....S.S..S.S....',
  ...twice(['....g.g..g.g....']),
]
const WEST_STANDING = westMap()
const WEST_SEATED = westMap(SUIT, twice([SUIT, SUIT]))
/** Walking up the wall, one knee up (the left, then the right): its boot a unit higher. */
const westStepping = (side: 'left' | 'right') =>
  westMap(SUIT, [
    ...WEST_BELOW.slice(0, 4),
    '....g.g..g.g....',
    side === 'left' ? '.........g.g....' : '....g.g.........',
  ])

/** The square buckle, a little taller than the belt [21] [48]. */
const BUCKLE: Layer = { kind: 'rects', px: [[7, 7.85, 2, 1.3]], fill: 'var(--buckle)' }
/** The 1966 oval on his chest, no rim, clear of the collar and the belt. */
const WEST_CHEST = [...chestPlate(EMBLEM_1966, { cx: 8, cy: 6.65, rx: 1.9 }), BUCKLE]

/** The satin cape's halves (the left; mirrored for the right), each hem in three points. */
const WEST_CAPE = {
  /** Hanging just past his sides to mid-calf. */
  hanging: 'M3 4.8 L2.2 5.3 L1.6 10.6 L2.4 10 L3.2 10.8 L4 10.1 L4.8 10.8 L5.4 10.2 L5.4 5 Z',
  /** Flung back and open behind his raised fists. */
  open: 'M3.4 5 L0.6 5.2 L-2.6 10.8 L-1.4 10.2 L-0.4 11 L0.8 10.3 L2 11 L3.4 10.4 Z',
}
/** Its back between his legs, its hem in points. */
const WEST_BACK: Layer = {
  kind: 'path',
  d: 'M4.5 8.8 L11.5 8.8 L11.5 10.2 L10.8 10.8 L9.9 10.1 L8 10.8 L6.1 10.1 L5.2 10.8 L4.5 10.2 Z',
  className: 'clawd__cape',
}
/** Closed round him, asleep, its hem in points. */
const WEST_WRAPPED =
  'M2.6 6.2 L13.4 6.2 L14.2 10.6 L12.8 10 L11.4 10.8 L9.6 10 L8 10.8 L6.4 10 L4.6 10.8 L3.2 10 L1.8 10.6 Z'
/**
 * The cowl's painted brows [38] [47]: pale strokes rising outward from beside the nose, over the eyes
 * (picked on screen, in every pose).
 */
const BROWS: Layer = {
  kind: 'path',
  d: 'M7.1 2.85 L4.8 2.05 L4.6 1.7 L5 1.75 L7.2 2.45 Z',
  fill: 'var(--ink)',
  mirrored: true,
}
/** A Zzz rising beside him, the letters growing as they go. */
const ZZZ =
  'M13.40 1.60 L14.40 1.60 L14.40 1.82 L13.76 2.38 L14.40 2.38 L14.40 2.60 L13.40 2.60 L13.40 2.38 L14.04 1.82 L13.40 1.82 Z M15.20 -0.20 L16.50 -0.20 L16.50 0.09 L15.67 0.81 L16.50 0.81 L16.50 1.10 L15.20 1.10 L15.20 0.81 L16.03 0.09 L15.20 0.09 Z M17.40 -1.00 L19.00 -1.00 L19.00 -0.65 L17.98 0.25 L19.00 0.25 L19.00 0.60 L17.40 0.60 L17.40 0.25 L18.42 -0.65 L17.40 -0.65 Z'
/**
 * Asleep, played for laughs (picked on screen): wrapped in his cape under a long satin nightcap with a
 * pompom over the cowl, and a Zzz rising beside him.
 */
const WEST_ASLEEP: Pose = (() => {
  const seat = seated(WEST_SEATED, WEST_WRAPPED)
  return {
    ...seat,
    front: [
      ...seat.front,
      BROWS,
      {
        kind: 'path',
        d: 'M3.6 1.4 Q8 -1.6 13.6 -0.4 Q15.8 0.4 16 2.4 L15.2 2.4 Q14.6 1.2 12.4 1.2 L12.4 1.6 Z',
        fill: 'var(--cowl-shine)',
      },
      { kind: 'rects', px: [[3.2, 1.2, 9.6, 0.8]], fill: 'var(--bone)' },
      { kind: 'path', d: 'M14.8 2.6 a0.8 0.8 0 1 0 1.6 0 a0.8 0.8 0 1 0 -1.6 0', fill: 'var(--bone)' },
      { kind: 'path', d: ZZZ, fill: 'var(--bone)' },
    ],
  }
})()
const WEST_HANGING: Layer[] = [WEST_BACK, { kind: 'cape', d: WEST_CAPE.hanging, mirrored: true }]

const westPose = (map: OutfitMap, behind: Layer[], front: Layer[] = []) =>
  pose(map, behind, [...front, BROWS], { chest: WEST_CHEST })

/** An arm in the suit's lavender, outlined so it reads on the cowl's violet (left; mirrored). */
const satinArm = (arm: string): Layer[] => [
  { kind: 'path', d: arm, className: 'clawd__cowl-edge', mirrored: true },
  { kind: 'path', d: arm, fill: 'var(--suit)', mirrored: true },
]
/** Satin gloves, each edged in the neutral rim so they stand off the cowl of the same violet. */
const satinGloves = (gloves: Px[]): Layer[] => [
  {
    kind: 'rects',
    px: gloves.map(([x, y, w = 1, h = 1]) => [x - 0.25, y - 0.25, w + 0.5, h + 0.5] as const),
    className: 'clawd__cowl-edge',
  },
  { kind: 'rects', px: gloves, fill: 'var(--gloves)' },
]

/**
 * The fight's burst [04] [30], behind him in the Alarm color, its lit heart over its shade: eight
 * points past his head and sides, no word at this size (picked on screen over a smaller and a
 * larger one).
 */
const FIGHT_BURST: Layer[] = [
  {
    kind: 'path',
    d: 'M8.0 -1.8 L10.0 0.8 L14.8 -0.3 L12.9 2.3 L17.6 3.4 L12.9 4.5 L14.8 7.1 L10.0 6.0 L8.0 8.6 L6.0 6.0 L1.2 7.1 L3.1 4.5 L-1.6 3.4 L3.1 2.3 L1.2 -0.3 L6.0 0.8 Z',
    fill: 'var(--signal)',
  },
  {
    kind: 'path',
    d: 'M8.0 -0.2 L9.3 1.7 L12.7 0.9 L11.0 2.7 L14.6 3.4 L11.0 4.1 L12.7 5.9 L9.3 5.1 L8.0 7.0 L6.7 5.1 L3.3 5.9 L5.0 4.1 L1.4 3.4 L5.0 2.7 L3.3 0.9 L6.7 1.7 Z',
    fill: 'var(--signal-hot)',
  },
]
/**
 * His arms raised from the shoulders to fists at `top` beside or over his head, outlined so they read
 * on the cowl.
 */
const armsUp = (top: number, sides: 'left' | 'right' | 'both' = 'both'): Layer[] => {
  const xs = { left: [1.5], right: [13.1], both: [1.5, 13.1] }[sides]
  return [
    {
      kind: 'rects',
      px: xs.map((x) => [x - 0.3, top + 1, 2, 5.4 - top - 1] as const),
      className: 'clawd__cowl-edge',
    },
    { kind: 'rects', px: xs.map((x) => [x, top + 1.4, 1.4, 5.4 - top - 1.4] as const), fill: 'var(--suit)' },
    ...satinGloves(xs.map((x) => [x - 0.1, top, 1.6, 1.5] as const)),
  ]
}
/** Alarmed, the fight: both fists up beside his head, the cape flung back, the burst lit behind him. */
const westAlarmed = westPose(
  WEST_STANDING,
  [...FIGHT_BURST, WEST_BACK, { kind: 'cape', d: WEST_CAPE.open, mirrored: true }],
  armsUp(1.4),
)

/**
 * The Batusi's held step, the V across his eyes [21] (adam-west.md, section 8.3): his upper arms out
 * from the shoulders to elbows at eye height, his forearms back in to the gloves beside the cowl,
 * the eyes left clear between them. Left half, mirrored.
 */
const V_ARM = 'M3 5.2 L3 6.2 L0.4 4.6 L-0.6 3.6 L-0.2 2.9 L2.6 2.4 L3.6 2.4 L3.6 3.6 L2.6 3.6 L0.8 3.9 Z'
/** The V drawn out to the temples: the gloves beside the cowl, or a unit further out on the beat. */
const theV = (out = 0): Layer[] => [
  ...satinArm(V_ARM),
  ...satinGloves([
    [2.4 - out, 2.2, 1.6, 1.6],
    [12 + out, 2.2, 1.6, 1.6],
  ]),
]
/** The V meeting at his nose, a beat before it is drawn out: the gloves together under his eyes. */
const V_AT_NOSE_ARM = 'M3 5.2 L3 6.2 L1 5.4 L0.6 4.4 L1.4 3.8 L6.4 4 L7.4 4 L7.4 5 L6.4 5 L2.2 4.8 Z'
const AT_THE_NOSE: Layer[] = [
  ...satinArm(V_AT_NOSE_ARM),
  ...satinGloves([
    [6.4, 4, 1.2, 1],
    [8.4, 4, 1.2, 1],
  ]),
]
const batusi = (front: Layer[]) => westPose(WEST_STANDING, WEST_HANGING, front)
const HELD_V = batusi(theV())

/** A step of the dance, held two ticks of the reveal's clock. */
const twoBeats = (front: Layer[]): [Step, Step] => {
  const step = { pose: batusi(front), look: 0 }
  return [step, step]
}
/**
 * The Batusi (same-bat-time-build.md, section 5): an arm up, both arms overhead, the V at his nose,
 * then the V drawn out to his temples and held. The show changes pose every two beats (about seven
 * ticks), so each step holds a few of the clock's.
 */
const THE_BATUSI: Script = [
  ...twoBeats(armsUp(-0.4, 'right')),
  ...twoBeats(armsUp(-0.4)),
  ...twoBeats(AT_THE_NOSE),
  { pose: HELD_V, look: 0 },
]

/** The cape on the climb, hanging from his side toward the street, its hem in three points. */
const CLIMB_CAPE = 'M13 4.8 L16.4 4.4 L17.6 5.6 L16.8 6.4 L18 7.4 L17 8.2 L17.8 9.4 L13 9.6 Z'
/** The Bat-climb's turn: nearly lying out from the wall, as the series shot it (picked on screen). */
const CLIMB_ANGLE = 80
/**
 * The Bat-climb [63] [64] (flying): up the side of a building on a rope, his body out from the wall,
 * his boots on it, walking up (the set lay on its side), the cape hanging down toward the street.
 * Drawn upright and turned as a whole, so the rope and the wall are drawn to stand upright on
 * screen, and the cape to hang from his side that faces the street.
 */
const westClimb = (side: 'left' | 'right', angle = CLIMB_ANGLE, scale = 0.72): Pose => {
  const t = (angle * Math.PI) / 180
  // Straight up on screen, in the turned frame he is drawn in.
  const [ux, uy] = [-Math.sin(t), -Math.cos(t)]
  const at = (x: number, y: number, d: number) => `${(x + ux * d).toFixed(2)} ${(y + uy * d).toFixed(2)}`
  const line = (x: number, y: number, from: number, to: number, w: number) => {
    const [nx, ny] = [-uy * w, ux * w]
    return `M${at(x + nx, y + ny, from)} L${at(x + nx, y + ny, to)} L${at(x - nx, y - ny, to)} L${at(x - nx, y - ny, from)} Z`
  }
  const climb = westPose(
    westStepping(side),
    [],
    [
      ...satinGloves([
        [6.6, 6.2, 1.2, 1.2],
        [8.2, 6.2, 1.2, 1.2],
      ]),
    ],
  )
  return {
    ...climb,
    behind: [
      { kind: 'path', d: line(8, 11.3, -12, 14, 0.5), fill: 'var(--ash)' },
      { kind: 'path', d: line(8, 6.8, 0, 16, 0.12), fill: 'var(--bone)' },
      { kind: 'cape', d: CLIMB_CAPE },
      ...climb.behind,
    ],
    transform: `rotate(${angle}deg) scale(${scale})`,
  }
}

export const SAME_BAT_TIME_SUIT: Suit = {
  eyes: EYES,
  poses: {
    sleeping: [WEST_ASLEEP],
    flying: [westClimb('left'), westClimb('right')],
    alarmed: [westAlarmed],
  },
  // On the perch he holds the V, glances along the street, and draws it out once more on the beat.
  watch: watchOn(
    THE_BATUSI,
    [{ look: -GAZE }, { look: GAZE }],
    [
      { pose: batusi(theV(0.6)), look: 0 },
      { pose: HELD_V, look: 0 },
    ],
  ),
  signature: THE_BATUSI,
  // Violet is the Alarm color: the satin is its unlit relative, so the aura shows only when alarmed.
  aura: 'alarmed',
}
