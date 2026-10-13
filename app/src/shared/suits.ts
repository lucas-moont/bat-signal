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
 * Something drawn around the map, in a Theme variable a Theme's stylesheet sets: named as a fill, or
 * through a class whose suit variable BatClawd.css reads (--cape, --cape-rim, --thread, --cowl-edge,
 * --chest).
 */
export type Layer =
  /**
   * A path in one color, or in a class's; mirrored, it is drawn again flipped across his middle (a
   * cape's two open halves); smooth, it is drawn like the chest emblem, not snapped to pixels (an
   * oval beside it).
   */
  | { kind: 'path'; d: string; fill?: string; className?: string; mirrored?: boolean; smooth?: boolean }
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
   * pose holds that pose there instead, and only the watch's glances play.
   */
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
/** A pose: the cape and cowl's edge behind him, his chest emblem (or a Theme's own) and the rest in front. */
const pose = (
  map: OutfitMap,
  behind: Layer[],
  front: Layer[] = [],
  { chest = [CHEST], eyes = 'open' }: { chest?: Layer[]; eyes?: Pose['eyes'] } = {},
): Pose => ({
  map,
  behind: [...behind, COWL_EDGE],
  front: [...chest, ...front],
  eyes,
})

/** Sitting, wrapped in a cape closed in front of him: only his gloved hands and boots show. */
const seated = (map: OutfitMap, wrapped: string): Pose => ({
  map,
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

/**
 * His watch on the perch: mostly still, then a flutter (the cape lifting, the wingsuit banking) and
 * two glances, four changes in twelve seconds. A Signature pose held there takes only the glances.
 */
const watchOf = (still: Pose, flutter: Pose, glances: [Partial<Step>, Partial<Step>]): Script => {
  const STILL: Step = { pose: still, look: 0 }
  return [
    STILL,
    ...Array<Step>(5).fill(STILL),
    { pose: flutter, look: 0 },
    STILL,
    { ...STILL, ...glances[0] },
    { ...STILL, ...glances[1] },
    STILL,
    STILL,
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

/** Level, then banked one way, level, then the other: a frame each, over the bob. */
const flying = [
  glide,
  { ...glide, transform: 'rotate(4deg)' },
  glide,
  { ...glide, transform: 'rotate(-4deg)' },
] as const

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
    sleeping: [seated(SEATED, CAPE.wrapped)],
    flying,
    // The flame flickers between Hot Signal and a smaller Pen Hot, a frame each.
    alarmed: [flare([12.75, -1, 1.5, 1], 'var(--flame)'), flare([13, -1, 1, 1], 'var(--flame-low)')],
  },
  watch: watchOf(glide, flying[1], [{ look: -GAZE }, { look: -GAZE }]),
  // Out of the dark (the subway fight): the shadow slides down off him in a second and a half (six
  // steps, four a second), two footsteps landing on the way, until only his feet stay in it.
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

// --- PALE MOONLIGHT: outfit I (#95), after Tim Burton's Batman (1989). Burton's black rubber suit
// lifted to a plum-grey so it reads on the smog, a steel sheen on the cowl and shoulders, the brass
// belt, the bat in its oval on his chest (old brass at rest, lit gold when something needs the
// user), and a black cape with rounded scallops rimmed in the snow's steel (burton-1989.md, 7). ---

/** The suit's last half-row, the brass belt and its buckle, and his four booted legs. */
const MOON_BELOW = [
  SUIT,
  '...bbbbkbbbbb...',
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

/** An oval as a path: centred on (cx, cy), rx by ry. */
const oval = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`

/**
 * The 1989 emblem on his chest: a cowl-black rim, the oval in old brass (or lit, the Alarm color
 * with its light in the middle), and the film's own bat across it, reaching the rim.
 */
const CHEST_OVAL = { cx: 8, cy: 6.9 }
const chestOval = (lit: boolean): Layer[] => {
  const { cx, cy } = CHEST_OVAL
  const light: Layer = { kind: 'path', d: oval(cx, cy, 1.5, 0.75), fill: 'var(--signal-hot)', smooth: true }
  return [
    { kind: 'path', d: oval(cx, cy, 2.6, 1.62), fill: 'var(--cowl)', smooth: true },
    {
      kind: 'path',
      d: oval(cx, cy, 2.25, 1.27),
      fill: lit ? 'var(--signal)' : 'var(--emblem-plate)',
      smooth: true,
    },
    ...(lit ? [light] : []),
    { kind: 'emblem', cx, cy, width: 4.33 },
  ]
}
const OVAL_AT_REST = chestOval(false)
const OVAL_LIT = chestOval(true)

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
    { kind: 'path', d: oval(19, -1.5, 3, 1.5), fill: 'var(--emblem-plate)', smooth: true },
    { kind: 'emblem', cx: 19, cy: -1.5, width: 5.2 },
  ],
  {
    chest: OVAL_AT_REST,
    eyes: [
      [6, 2.5, 2, 1],
      [10, 2.5, 2, 1],
    ],
  },
)

export const PALE_MOONLIGHT_SUIT: Suit = {
  eyes: VENGEANCE_SUIT.eyes,
  poses: {
    sleeping: [seated(MOON_SEATED, SCALLOPED.wrapped)],
    flying: [trailA, trailB],
    alarmed: [giantBat],
  },
  // On the perch he glances down to the street and back up to the Signal (burton-1989.md, 7).
  watch: watchOf(trailA, trailB, [{ lookY: 0.4 }, { look: GAZE, lookY: -0.4 }]),
  // Revealed as he turns from the street to look up at the Signal; held there on the perch.
  signature: [
    { pose: trailB, look: 0 },
    { pose: underTheSignal, look: 0 },
  ],
  aura: true,
}
