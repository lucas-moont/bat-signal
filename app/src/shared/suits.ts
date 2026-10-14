// Bat-Clawd's suit per Theme, as data: the outfit maps (shared/outfits.ts) for his body and cowl,
// the layers drawn behind and in front of them (the cape, the cowl's edge, the chest emblem, and
// details under a grid cell), the Poses of each Mood, his watch on the perch and, if the Theme has
// one, his Signature pose. Every Theme keeps Clawd's shape, white eyes, orange jaw and three Moods
// (CONTEXT.md, Bat-Clawd); the Bat-Clawd Costume Rule is in DESIGN.md.
import { BAT_1989, emblem, OVAL_1989 } from './emblems'
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

/** How many steps a beat of his own may take, at the end of his watch. */
const BEAT_ROOM = 4

/**
 * His watch on the perch, twelve steps of a second each, held on his Signature pose's final step (so
 * the reveal ends where the watch begins): six seconds still, two glances, then the last four
 * still, or a beat of his own (a sonar's ping) in their place. Last, so a reveal that just played
 * its own beat isn't followed by another a moment later.
 */
const watchOn = (
  signature: Script,
  glances: [Partial<Step>, Partial<Step>],
  beat: readonly Step[] = [],
): Script => {
  const STILL: Step = { pose: scriptAt(signature, Infinity).pose, look: 0 }
  const still = (n: number) => Array<Step>(n).fill(STILL)
  return [
    STILL,
    ...still(5),
    { ...STILL, ...glances[0] },
    { ...STILL, ...glances[1] },
    ...still(BEAT_ROOM - Math.min(beat.length, BEAT_ROOM)),
    ...beat.slice(0, BEAT_ROOM),
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

/** An oval as a path: centred on (cx, cy), rx by ry. */
const oval = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0 Z`

/** The 1989 emblem's proportions, read from its data so a re-trace carries over to his chest. */
const OVAL_ASPECT = OVAL_1989.box.height / OVAL_1989.box.width
/** How wide the bat is across the oval, inside its rim. */
const BAT_SPAN = emblem(BAT_1989, 'none').bat.width / (OVAL_1989.box.width - 2 * OVAL_1989.rim)
/** A 1989 oval rx wide either side of (cx, cy), in the emblem's proportions. */
const oval1989 = (cx: number, cy: number, rx: number) => oval(cx, cy, rx, rx * OVAL_ASPECT)
/** The 1989 bat across an oval rx wide either side of (cx, cy). */
const bat1989 = (cx: number, cy: number, rx: number): Layer => ({
  kind: 'emblem',
  cx,
  cy,
  width: 2 * rx * BAT_SPAN,
})

/**
 * The 1989 emblem on his chest: a cowl-black rim, the oval in old brass (or lit, the Alarm color
 * with its light in the middle), and the film's own bat across it, reaching the rim.
 */
const CHEST_OVAL = { cx: 8, cy: 6.9 }
const chestOval = (lit: boolean): Layer[] => {
  const { cx, cy } = CHEST_OVAL
  const light: Layer = { kind: 'path', d: oval1989(cx, cy, 1.5), fill: 'var(--signal-hot)', smooth: true }
  return [
    // The rim clears his jaw (y 5) and the belt (y 8.5): the two never merge into one brass apron.
    { kind: 'path', d: oval1989(cx, cy, 2.6), fill: 'var(--cowl)', smooth: true },
    {
      kind: 'path',
      d: oval1989(cx, cy, 2.25),
      fill: lit ? 'var(--signal)' : 'var(--emblem-plate)',
      smooth: true,
    },
    ...(lit ? [light] : []),
    bat1989(cx, cy, 2.25),
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
    { kind: 'path', d: oval1989(19, -1.5, 3), fill: 'var(--emblem-plate)', smooth: true },
    bat1989(19, -1.5, 3),
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
  ...HEAD.map((row) => (row === '....chhccccc....' ? '...ffllffllff...' : row)),
  '...CrrrrrrrrC...',
  '...CCrrrrrrCC...',
]
/** His torso between the lapels; his arms out in the coat's darker sleeves, gloved. */
const LAPELS = '...CSSSSSSSSC...'
const SLEEVES = '.gvCSSSSSSSSCvg.'
const knightmareMap = (rows: readonly string[], chest = [SLEEVES, LAPELS]) =>
  map(chest, rows, KNIGHTMARE_LEGEND, KNIGHTMARE_HEAD)
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
const KNIGHTMARE_SEATED = knightmareMap([], [LAPELS, LAPELS, LAPELS])

/** The BvS bat on his chest, between the lapels, under the scarf. */
const CHEST_BAT: Layer = { kind: 'emblem', cx: 8, cy: 6.9, width: 5.6 }

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
  // Heat Vision is the Alarm color and never shows at rest: no aura as the coat snaps.
  aura: 'alarmed',
}
