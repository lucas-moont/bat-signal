// PROTOTYPE, throwaway (#95 / LUC-97). Never merge to main.
//
// Question: can Bat-Clawd be drawn from text "outfit" maps on a half-unit grid (rows of
// characters plus a colour legend, the idea from ticlins-claude-monitor), so a theme can change
// his anatomy and not only his costume? Four outfits, switchable with ?variant=A..D and the
// floating bar (or the arrow keys), each at the real sizes next to today's BatClawd.
// Open: out/renderer/index.html?variant=A#prototype-clawd
import { useEffect, useState, type ReactNode } from 'react'
import { batAt, WINGS } from '../components/BatEmblem'
import { BatClawd } from '../components/BatClawd'

type Mood = 'flying' | 'alarmed'

interface Outfit {
  key: string
  name: string
  note: string
  /** Half-rows (0.5 unit tall), 16 columns (1 unit wide), starting at y = top. */
  rows: string[]
  /** Other half-rows for a mood (the Knightmare's armour when alarmed). */
  rowsFor?: (mood: Mood) => string[] | undefined
  top: number
  /** The theme's page colour, behind the previews. */
  ground?: string
  /** The approval set, shown together in the strip. */
  group?: 'wave1'
  legend: Record<string, string>
  /** Vector layers: behind the map (the cape) and in front of it (chest symbol, accessories). */
  behind: (mood: Mood) => ReactNode
  front: (mood: Mood) => ReactNode
  /** A CSS filter on the whole figure, per mood (an aura). */
  aura?: (mood: Mood) => string | undefined
}

/** Each unit row twice: the same drawing as today, at half-row resolution. */
const twice = (unitRows: string[]) => unitRows.flatMap((r) => [r, r])

// Today's cape, copied from BatClawd.tsx.
const CAPE = {
  trailA: 'M3 5 L13 5 L13.4 9.2 L11 10.4 L7 10 L3 10.8 L-1 10 L-4.6 10.8 L-3.6 8.8 L-5.6 7.4 L-1.4 6.6 Z',
  openLeft: 'M3.4 5 L0.2 5.2 L-2.8 11.2 L-1.2 10.5 L0.4 11.3 L1.9 10.6 L3.4 11.2 Z',
  threadLeft: 'M-2 10.1 L-1.1 9.5 L0.4 10.2 L1.9 9.6 L3.4 10.1',
}
const MIRROR = 'translate(16 0) scale(-1 1)'
const COWL_EDGE = 'M3 5 L3 2 L4 2 L4 0 L5 0 L5 1 L11 1 L11 0 L12 0 L12 2 L13 2 L13 5 Z'

function Cape(props: {
  mood: Mood
  trail: string
  open: string
  fill: string
  stroke: string
  thread?: string
}) {
  const style = {
    fill: props.fill,
    stroke: props.stroke,
    strokeWidth: 0.35,
    strokeLinejoin: 'round' as const,
  }
  if (props.mood === 'flying') return <path d={props.trail} style={style} />
  return (
    <>
      {[undefined, MIRROR].map((t) => (
        <g key={t ?? 'l'} transform={t}>
          <path d={props.open} style={style} />
          {props.thread && <path d={CAPE.threadLeft} fill="none" stroke={props.thread} strokeWidth={0.45} />}
        </g>
      ))}
    </>
  )
}

const VENGEANCE_LEGEND = {
  '#': 'var(--clawd)',
  s: '#b85f42',
  c: '#0b0908',
  h: 'var(--raised)',
  e: 'var(--bone)',
}

const VENGEANCE_BODY = twice([
  '....c......c....',
  '....chhccccc....',
  '...cccccccccc...',
  '...cceecceecc...',
  '...cccccccccc...',
  '...##########...',
  '.##############.',
  '...##########...',
  '...##########...',
  '....s.s..s.s....',
  '....s.s..s.s....',
])

const vengeanceBehind = (mood: Mood) => (
  <>
    <Cape
      mood={mood}
      trail={CAPE.trailA}
      open={CAPE.openLeft}
      fill="#000"
      stroke="var(--signal)"
      thread="var(--blood)"
    />
    <path d={COWL_EDGE} fill="none" stroke="var(--signal)" strokeWidth={0.7} />
  </>
)

const RIM = 'rgb(232 225 217 / 22%)'

/** The full suit with the orange jaw (outfit E), shared by G and H. */
const SUIT_ROWS = [
  ...twice([
    '....c......c....',
    '....chhccccc....',
    '...cccccccccc...',
    '...cceecceecc...',
    '...cc######cc...',
    '...SSSSSSSSSS...',
    '.gSSSSSSSSSSSSg.',
    '...SSSSSSSSSS...',
  ]),
  '...bbbbkkbbbb...',
  '...SSSSSSSSSS...',
  '....S.S..S.S....',
  '....g.g..g.g....',
  ...twice(['....g.g..g.g....']),
]
const SUIT_LEGEND = { ...VENGEANCE_LEGEND, S: '#34302d', g: '#141110', b: '#1e1916', k: '#7d6d62' }

/**
 * A black cape whose rim is drawn only outside the body: over the body's box the mask hides it,
 * so the gaps between the legs show black cloth and no line, and the cape reads as behind them.
 */
function SuitCape({ mood }: { mood: Mood }) {
  const id = `behind-${mood}`
  const halves = mood === 'flying' ? [undefined] : [undefined, MIRROR]
  const d = mood === 'flying' ? CAPE.trailA : CAPE.openLeft
  return (
    <>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-10} y={-5} width={40} height={20}>
          <rect x={-10} y={-5} width={40} height={20} fill="white" />
          <rect x={3} y={5} width={10} height={7} fill="black" />
        </mask>
      </defs>
      {/* Open, the cape's back still hangs behind him, so black cloth fills the gaps between the legs. */}
      {mood === 'alarmed' && <path d="M3.4 5 L12.6 5 L12.6 11.4 L3.4 11.4 Z" fill="#000" />}
      {halves.map((t) => (
        <g key={t ?? 'l'} transform={t}>
          <path d={d} fill="#000" />
        </g>
      ))}
      <g mask={`url(#${id})`}>
        {halves.map((t) => (
          <g key={t ?? 'l'} transform={t}>
            <path d={d} fill="none" stroke={RIM} strokeWidth={0.35} strokeLinejoin="round" />
          </g>
        ))}
      </g>
      <path d={COWL_EDGE} fill="none" stroke={RIM} strokeWidth={0.7} />
    </>
  )
}

/** The theme's Alarm color as an aura, only while something needs you. */
const alarmAura = (rgb: string) => (mood: Mood) =>
  mood === 'alarmed'
    ? `drop-shadow(0 0 1.5px rgb(${rgb} / 90%)) drop-shadow(0 0 5px rgb(${rgb} / 55%))`
    : undefined

/** A theme's cape on the suit: black cloth, a neutral rim outside the body only, the back behind the legs. */
function suitCape(o: {
  trail: string
  trailMirrored?: boolean
  open: string
  rim: string
  edge?: (mood: Mood) => string
}) {
  return function Behind(mood: Mood) {
    const id = `behind-${mood}-${o.rim.length}-${o.open.length}`
    const d = mood === 'flying' ? o.trail : o.open
    const halves = mood === 'flying' && !o.trailMirrored ? [undefined] : [undefined, MIRROR]
    return (
      <>
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x={-10} y={-5} width={40} height={20}>
            <rect x={-10} y={-5} width={40} height={20} fill="white" />
            <rect x={3} y={5} width={10} height={7} fill="black" />
          </mask>
        </defs>
        {mood === 'alarmed' && <path d="M3.4 5 L12.6 5 L12.6 11.4 L3.4 11.4 Z" fill="#000" />}
        {halves.map((t) => (
          <path key={t ?? 'l'} transform={t} d={d} fill="#000" />
        ))}
        <g mask={`url(#${id})`}>
          {halves.map((t) => (
            <path
              key={t ?? 'l'}
              transform={t}
              d={d}
              fill="none"
              stroke={o.rim}
              strokeWidth={0.35}
              strokeLinejoin="round"
            />
          ))}
        </g>
        <path d={o.edge?.(mood) ?? COWL_EDGE} fill="none" stroke={o.rim} strokeWidth={0.7} />
      </>
    )
  }
}

/** The Knightmare's coat: a brown duster, its dark lining behind the legs, a neutral rim outside the body. */
function KnightmareCoat({ mood }: { mood: Mood }) {
  const coat = '#6e5338'
  const lining = '#3b2a1b'
  const rim = 'rgb(196 170 130 / 32%)'
  const id = `coat-${mood}`
  const shapes =
    mood === 'flying'
      ? [
          {
            d: 'M3 5 L13 5 L13.4 10.7 L3.2 10.7 L1 10.9 L-1.2 10.3 L-3.4 10.7 L-2.6 9.2 L-4.4 8.1 L-3 7.1 L-4.6 6.1 L-0.6 5.3 Z',
            t: undefined,
          },
        ]
      : [undefined, MIRROR].map((t) => ({
          d: 'M3.4 5 L1.6 5.3 L-1.4 10.9 L-0.2 10.4 L1 10.9 L2.2 10.5 L3.4 10.9 Z',
          t,
        }))
  return (
    <>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x={-10} y={-5} width={40} height={20}>
          <rect x={-10} y={-5} width={40} height={20} fill="white" />
          <rect x={3} y={5} width={10} height={7} fill="black" />
        </mask>
      </defs>
      {mood === 'alarmed' && <path d="M3.4 5 L12.6 5 L12.6 10.9 L3.4 10.9 Z" fill={lining} />}
      {shapes.map(({ d, t }) => (
        <path key={t ?? 'l'} transform={t} d={d} fill={coat} />
      ))}
      {mood === 'flying' && <path d="M4 9 L12 9 L12 10.6 L4 10.6 Z" fill={lining} />}
      <g mask={`url(#${id})`}>
        {shapes.map(({ d, t }) => (
          <path
            key={t ?? 'l'}
            transform={t}
            d={d}
            fill="none"
            stroke={rim}
            strokeWidth={0.35}
            strokeLinejoin="round"
          />
        ))}
      </g>
      <path d={COWL_EDGE} fill="none" stroke="rgb(150 146 140 / 35%)" strokeWidth={0.7} />
    </>
  )
}

const OUTFITS: Outfit[] = [
  {
    key: 'A',
    name: 'VENGEANCE today, as a map',
    note: 'Must match today: the same pixels, written as text.',
    rows: VENGEANCE_BODY,
    top: 0,
    legend: VENGEANCE_LEGEND,
    behind: vengeanceBehind,
    front: () => <path d={WINGS} transform={batAt(8, 7, 7)} fill="#0b0908" />,
  },
  {
    key: 'B',
    name: 'VENGEANCE with the uniform (a)',
    note: 'Dark gloves on the hands, boots on the lower legs, a half-row belt with a buckle, the chest bat on a dull metal plate.',
    rows: [
      ...VENGEANCE_BODY.slice(0, 12),
      '.g############g.',
      '.g############g.',
      ...twice(['...##########...']),
      '...bbbbkkbbbb...',
      '...##########...',
      '....s.s..s.s....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    top: 0,
    legend: { ...VENGEANCE_LEGEND, g: '#1b1715', b: '#241d1a', k: '#7d6d62' },
    behind: vengeanceBehind,
    front: () => (
      <>
        <path d={WINGS} transform={batAt(8, 6.9, 8.2)} fill="#5c4d45" />
        <path d={WINGS} transform={batAt(8, 6.9, 7)} fill="#0b0908" />
      </>
    ),
  },
  {
    key: 'C',
    name: 'PALE MOONLIGHT (Burton)',
    note: 'Matte cowl with a steel sheen, a rimmed chest oval (brass at rest, gold when alarmed), a brass belt on the lower half-row, a scalloped cape.',
    rows: [
      ...twice([
        '....c......c....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cccccccccc...',
        '...##########...',
        '.##############.',
        '...##########...',
      ]),
      '...##########...',
      '...bbbbkbbbbb...',
      ...twice(['....s.s..s.s....', '....s.s..s.s....']),
    ],
    top: 0,
    legend: { ...VENGEANCE_LEGEND, c: '#0b0a0b', h: '#3c4652', b: '#7a5420', k: '#948b7f' },
    behind: (mood) => (
      <>
        <Cape
          mood={mood}
          trail="M3 5 L13 5 L13.4 9.2 Q12.2 10.9 11 10.4 Q9 11.2 7 10 Q5 11.2 3 10.8 Q1 11.4 -1 10 Q-2.8 11.6 -4.6 10.8 L-3.6 8.8 L-5.6 7.4 L-1.4 6.6 Z"
          open="M3.4 5 L0.2 5.2 L-2.8 11.2 Q-2 10.1 -1.2 10.5 Q-0.4 11.7 0.4 11.3 Q1.1 10.1 1.9 10.6 Q2.6 11.7 3.4 11.2 Z"
          fill="#000"
          stroke="rgb(143 176 211 / 45%)"
        />
        <path d={COWL_EDGE} fill="none" stroke="rgb(143 176 211 / 35%)" strokeWidth={0.7} />
      </>
    ),
    front: (mood) => (
      <>
        <ellipse cx={8} cy={6.5} rx={2.5} ry={1} fill="#0b0a0b" />
        <ellipse cx={8} cy={6.5} rx={2} ry={0.55} fill={mood === 'alarmed' ? '#d29336' : '#7a5420'} />
        {mood === 'alarmed' && (
          <>
            <rect x={6.3} y={6.2} width={0.6} height={0.6} fill="#f0c24b" />
            <rect x={9.1} y={6.2} width={0.6} height={0.6} fill="#f0c24b" />
          </>
        )}
        <rect x={7} y={6.25} width={2} height={0.5} fill="#0b0a0b" />
      </>
    ),
  },
  {
    key: 'D',
    name: 'Lego Batman (anatomy change)',
    note: 'A minifig: taller ears, a narrower head with an orange jaw, a trapezoid torso, arms hanging at the sides with gloved hands, a yellow belt, hips and block legs in very, very dark grey. One row taller than today.',
    rows: twice([
      '....c......c....',
      '....c......c....',
      '....cccccccc....',
      '....chhccccc....',
      '....ceecceec....',
      '....c######c....',
      '...a########a...',
      '..a##########a..',
      '..a##########a..',
      '..g#bbbkkbbb#g..',
      '...LLLLLLLLLL...',
      '...LLLL..LLLL...',
      '...LLLL..LLLL...',
    ]),
    top: -1,
    legend: {
      '#': 'var(--clawd)',
      a: '#c4694b',
      c: '#0b0908',
      h: '#3a3a40',
      e: 'var(--bone)',
      g: '#141416',
      b: '#f2c230',
      k: '#c9971a',
      L: '#2b2b30',
    },
    behind: (mood) => (
      <>
        {legoCape(mood)}
        <path
          d="M4 5 L4 -1 L5 -1 L5 1 L11 1 L11 -1 L12 -1 L12 5 Z"
          fill="none"
          stroke="#6b6b73"
          strokeWidth={0.7}
        />
      </>
    ),
    front: () => <path d={WINGS} transform={batAt(8, 7, 6)} fill="#0b0908" />,
  },
  {
    key: 'E',
    name: 'VENGEANCE in a full suit, orange jaw',
    note: "A charcoal suit over the body, arms and legs; the cowl stops under the eyes and Clawd's orange shows as the jaw, like every Batman's chin. Gloves, belt and boots on the suit.",
    rows: [
      ...twice([
        '....c......c....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...SSSSSSSSSS...',
        '.gSSSSSSSSSSSSg.',
        '...SSSSSSSSSS...',
      ]),
      '...bbbbkkbbbb...',
      '...SSSSSSSSSS...',
      '....S.S..S.S....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    top: 0,
    legend: { ...VENGEANCE_LEGEND, S: '#34302d', g: '#141110', b: '#1e1916', k: '#7d6d62' },
    behind: vengeanceBehind,
    front: () => <path d={WINGS} transform={batAt(8, 6.9, 7)} fill="#0b0908" />,
  },
  {
    key: 'F',
    name: 'PALE MOONLIGHT in a full suit, orange jaw',
    note: "Burton's all-black rubber suit with a steel sheen on the shoulders so it reads on the dark page, the rimmed oval, the brass belt, orange only at the jaw.",
    rows: [
      ...twice([
        '....c......c....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...hSSSSSSSSh...',
        '.SSSSSSSSSSSSSS.',
        '...SSSSSSSSSS...',
      ]),
      '...SSSSSSSSSS...',
      '...bbbbkbbbbb...',
      ...twice(['....S.S..S.S....', '....S.S..S.S....']),
    ],
    top: 0,
    legend: { ...VENGEANCE_LEGEND, c: '#0b0a0b', h: '#3c4652', S: '#1f1d22', b: '#7a5420', k: '#948b7f' },
    behind: (mood) => OUTFITS_C_BEHIND(mood),
    front: (mood) => OUTFITS_C_FRONT(mood),
  },
  {
    key: 'G',
    name: 'VENGEANCE suit, no red: a neutral rim',
    note: "The full suit with the orange jaw. No red on Bat-Clawd: the cowl and the cape carry a faint bone rim so they read on black. The cape's rim is masked over the body, so between the legs you see only black cape: it passes behind them.",
    rows: SUIT_ROWS,
    top: 0,
    legend: SUIT_LEGEND,
    behind: (mood) => <SuitCape mood={mood} />,
    front: () => <path d={WINGS} transform={batAt(8, 6.9, 7)} fill="#0b0908" />,
  },
  {
    key: 'H',
    name: 'VENGEANCE suit, neutral rim, red aura when alarmed',
    note: 'As G, and red returns as an aura around him only while something needs you: the Alarm color, never at rest.',
    rows: SUIT_ROWS,
    top: 0,
    legend: SUIT_LEGEND,
    behind: (mood) => <SuitCape mood={mood} />,
    front: () => <path d={WINGS} transform={batAt(8, 6.9, 7)} fill="#0b0908" />,
    aura: (mood) =>
      mood === 'alarmed'
        ? 'drop-shadow(0 0 1.5px rgb(227 18 27 / 90%)) drop-shadow(0 0 5px rgb(227 18 27 / 55%))'
        : undefined,
  },
  {
    key: 'I',
    group: 'wave1',
    name: 'PALE MOONLIGHT',
    note: "Burton's black rubber suit, lifted to a dark plum-grey with a steel sheen on the shoulders so it reads on the smog black; the rimmed oval (brass at rest, gold lit), the brass belt, the scalloped cape with a steel rim. The aura is the theme's Alarm color: gold.",
    rows: [
      ...twice([
        '....c......c....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...hSSSSSSSSh...',
        '.gSSSSSSSSSSSSg.',
        '...SSSSSSSSSS...',
      ]),
      '...SSSSSSSSSS...',
      '...bbbbkbbbbb...',
      '....S.S..S.S....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    top: 0,
    ground: '#0d0906',
    legend: {
      ...VENGEANCE_LEGEND,
      c: '#0b0a0b',
      h: '#4a5664',
      S: '#2a2730',
      g: '#0b0a0b',
      b: '#7a5420',
      k: '#948b7f',
    },
    behind: suitCape({
      trail:
        'M3 5 L13 5 L13.4 9.2 Q12.2 10.9 11 10.4 Q9 11.2 7 10 Q5 11.2 3 10.8 Q1 11.4 -1 10 Q-2.8 11.6 -4.6 10.8 L-3.6 8.8 L-5.6 7.4 L-1.4 6.6 Z',
      open: 'M3.4 5 L0.2 5.2 L-2.8 11.2 Q-2 10.1 -1.2 10.5 Q-0.4 11.7 0.4 11.3 Q1.1 10.1 1.9 10.6 Q2.6 11.7 3.4 11.2 Z',
      rim: 'rgb(143 176 211 / 40%)',
    }),
    front: (mood) => OUTFITS_C_FRONT(mood),
    aura: alarmAura('240 194 75'),
  },
  {
    key: 'J',
    name: 'WATCHFUL PROTECTOR',
    note: "The Dark Knight's segmented suit in blue-steel, the helmet cowl on a steel collar with cheek guards, black gauntlets, a flat-topped chest bat, the straight-hemmed cape gliding when flying. The aura is the draft Alarm color, Burning Bat (still to be judged next to the orange jaw).",
    rows: [
      ...twice([
        '.....c....c.....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...cnnnnnnnnc...',
        '.gSSSSSSSSSSSSg.',
        '...SSSSSSSSSS...',
      ]),
      '...bbbbkkbbbb...',
      '...SSSSSSSSSS...',
      '....S.S..S.S....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    top: 0,
    ground: '#04070b',
    legend: {
      ...VENGEANCE_LEGEND,
      c: '#0a0d11',
      h: '#2a3644',
      n: '#3a4754',
      S: '#27313d',
      g: '#0a0d11',
      b: '#1a222b',
      k: '#56636f',
    },
    behind: suitCape({
      trail: 'M3 5 L-5 4.2 L-4.3 5.4 L-4.2 7.2 L0 7.4 L2.4 8.6 L3 9 Z',
      trailMirrored: true,
      open: 'M3.4 5 L0.2 5.2 L-2.8 11 L3.4 11 Z',
      rim: 'rgb(160 178 196 / 32%)',
      edge: () => 'M3 5 L3 2 L4 2 L4 1 L5 1 L5 0 L6 0 L6 1 L10 1 L10 0 L11 0 L11 1 L12 1 L12 2 L13 2 L13 5 Z',
    }),
    front: () => <path d="M5.4 6.1 L10.6 6.1 L10 7 L8.7 7.1 L8 7.9 L7.3 7.1 L6 7 Z" fill="#0a0d11" />,
    aura: alarmAura('255 83 64'),
  },
  {
    key: 'K',
    name: 'KNIGHTMARE',
    note: "Affleck's grey suit with the big black bat, short wide-set ears, a heavy straight-hemmed cape. Alarmed, he wears the armour: a squared helmet with ear nubs and a plate seam, steel pauldrons. The aura is carmine.",
    rows: [
      ...twice([
        '................',
        '....cc....cc....',
        '...chhccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...SSSSSSSSSS...',
        '.gSSSSSSSSSSSSg.',
        '...SSSSSSSSSS...',
      ]),
      '...bbbbkkbbbb...',
      '...SSSSSSSSSS...',
      '....S.S..S.S....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    rowsFor: (mood) =>
      mood === 'alarmed'
        ? [
            ...twice([
              '....c......c....',
              '...cccccccccc...',
              '...cllllllllc...',
              '...cceecceecc...',
              '...cc######cc...',
              '.pppSSSSSSSSppp.',
              '.gSSSSSSSSSSSSg.',
              '...SSSSSSSSSS...',
            ]),
            '...bbbbkkbbbb...',
            '...SSSSSSSSSS...',
            '....S.S..S.S....',
            '....g.g..g.g....',
            ...twice(['....g.g..g.g....']),
          ]
        : undefined,
    top: 0,
    ground: '#0c0c0b',
    legend: {
      ...VENGEANCE_LEGEND,
      c: '#1d1c1a',
      h: '#2e2c29',
      e: '#fcffff',
      l: '#3a3835',
      p: '#6e6b66',
      S: '#5a5751',
      g: '#141413',
      b: '#1d1c1a',
      k: '#6b665e',
    },
    behind: suitCape({
      trail: 'M3 5 L13 5 L13.4 9.6 L8 10.8 L2 10.4 L-4.4 10.9 L-3.6 8.6 L-5.4 7.2 L-1.4 6.4 Z',
      open: 'M3.4 5 L0.2 5.2 L-2.6 11.2 L0.4 10.7 L3.4 11.2 Z',
      rim: 'rgb(150 146 140 / 35%)',
      edge: (mood) =>
        mood === 'alarmed'
          ? 'M3 5 L3 1 L4 1 L4 0 L5 0 L5 1 L11 1 L11 0 L12 0 L12 1 L13 1 L13 5 Z'
          : 'M3 5 L3 2 L4 2 L4 1 L6 1 L6 2 L10 2 L10 1 L12 1 L12 2 L13 2 L13 5 Z',
    }),
    front: () => (
      <g fill="#141413">
        {[4, 6, 9, 11].map((x) => (
          <rect key={x} x={x} y={5} width={1} height={1} />
        ))}
        <rect x={4} y={6} width={8} height={1} />
        <rect x={5} y={7} width={1} height={1} />
        <rect x={7} y={7} width={2} height={1} />
        <rect x={10} y={7} width={1} height={1} />
      </g>
    ),
    aura: alarmAura('229 18 50'),
  },
  {
    key: 'N',
    group: 'wave1',
    name: 'WATCHFUL PROTECTOR (round 5)',
    note: "After the screen suit on display: black, not blue. Lit shoulder and chest plates, near-black abs and legs, a waist mesh, the smoked-bronze belt with an oval buckle (the only warm piece), the sculpted chest bat catching light, a matte cape gliding as a three-point batwing. The aura is Blue Flame, after the blue flames that form the bat in The Dark Knight's opening.",
    rows: [
      ...twice([
        '....c......c....',
        '....chhccccc....',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
        '...pSSSSSSSSp...',
        '.gSSSSSSSSSSSSg.',
        '...mSSSSSSSSm...',
      ]),
      '...bbbbkkbbbb...',
      '...SSSSSSSSSS...',
      '....p.p..p.p....',
      '....g.g..g.g....',
      ...twice(['....g.g..g.g....']),
    ],
    top: 0,
    ground: '#04070b',
    legend: {
      ...VENGEANCE_LEGEND,
      c: '#0b0d10',
      h: '#3a4047',
      S: '#22262a',
      p: '#485058',
      m: '#0e1013',
      g: '#0b0d10',
      b: '#8a7866',
      k: '#c4ab8a',
    },
    behind: suitCape({
      trail: 'M3 5 L-5.2 4.3 L-4.5 6.9 L-3 6.2 L-1.9 8.1 L0.2 7.3 L1.5 9.2 L3 8.8 Z',
      trailMirrored: true,
      open: 'M3.4 5 L0.2 5.2 L-2.8 11 L3.4 11 Z',
      rim: 'rgb(178 186 194 / 30%)',
    }),
    front: () => (
      <path
        d="M5 5.5 L11 5.5 L10.1 6 L10.1 6.5 L9.1 6.55 L8 7.15 L6.9 6.55 L5.9 6.5 L5.9 6 Z"
        fill="#485058"
      />
    ),
    aura: alarmAura('61 139 255'),
  },
  {
    key: 'M',
    group: 'wave1',
    name: 'KNIGHTMARE (round 5)',
    note: "The Knightmare's desert gear over a charcoal suit, no cape: a long brown leather duster worn open (its dark lining hangs behind the legs), a frayed rust scarf, flying goggles pushed up on the cowl, a utility belt with a brass buckle, olive cargo pants, black gauntlets and boots. Alarmed, the coat swings open. The aura is Heat Vision: the Knightmare is Superman's world, so its red is his.",
    rows: [
      ...twice([
        '....c......c....',
        '...ffllffllff...',
        '...cccccccccc...',
        '...cceecceecc...',
        '...cc######cc...',
      ]),
      '...CrrrrrrrrC...',
      '...CCrrrrrrCC...',
      ...twice(['.gCCSSSSSSSSCCg.', '...CSSSSSSSSC...']),
      '...CbbbkkbbbC...',
      '...CppppppppC...',
      '...Cp.p..p.pC...',
      ...twice(['...Cg.g..g.gC...']),
      '....g.g..g.g....',
    ],
    rowsFor: (mood) =>
      mood === 'alarmed'
        ? [
            ...twice([
              '....c......c....',
              '...ffllffllff...',
              '...cccccccccc...',
              '...cceecceecc...',
              '...cc######cc...',
            ]),
            '...CrrrrrrrrC...',
            '...CCrrrrrrCC...',
            ...twice(['.gCCSSSSSSSSCCg.', '...CSSSSSSSSC...']),
            '...CbbbkkbbbC...',
            '...CppppppppC...',
            '....p.p..p.p....',
            ...twice(['....g.g..g.g....']),
            '....g.g..g.g....',
          ]
        : undefined,
    top: 0,
    ground: '#0c0c0b',
    legend: {
      ...VENGEANCE_LEGEND,
      e: '#e4e2de',
      c: '#1d1c1a',
      f: '#8a6d45',
      l: '#3e4038',
      r: '#5c4435',
      C: '#6e5338',
      S: '#34322e',
      b: '#2a2520',
      k: '#a08850',
      p: '#4b4530',
      g: '#141413',
    },
    behind: (mood) => <KnightmareCoat mood={mood} />,
    front: () => null,
    aura: alarmAura('230 15 0'),
  },
]

const WAVE1_VENGEANCE: Outfit = {
  ...OUTFITS.find((o) => o.key === 'H')!,
  key: 'V',
  name: 'VENGEANCE',
  group: 'wave1',
  ground: '#000000',
}
OUTFITS.splice(
  OUTFITS.findIndex((o) => o.key === 'I'),
  0,
  WAVE1_VENGEANCE,
)

const OUTFITS_C_BEHIND = (mood: Mood) => OUTFITS.find((o) => o.key === 'C')!.behind(mood)
const OUTFITS_C_FRONT = (mood: Mood) => OUTFITS.find((o) => o.key === 'C')!.front(mood)

function legoCape(mood: Mood) {
  return mood === 'flying' ? (
    <path
      d="M3 5 L13 5 L13.6 11.6 L4 11.2 L-4.8 10.8 L-4 6.2 Z"
      fill="#000"
      stroke="#55555c"
      strokeWidth={0.35}
    />
  ) : (
    <>
      {[undefined, MIRROR].map((t) => (
        <path
          key={t ?? 'l'}
          transform={t}
          d="M3.6 5 L1.4 5 L-1.8 12 L3.6 12 Z"
          fill="#000"
          stroke="#55555c"
          strokeWidth={0.35}
        />
      ))}
    </>
  )
}

/**
 * One rect per run of the same character in a half-row, and a run that repeats exactly on the
 * next half-row grows down instead of adding a rect: the whole outfit as SVG.
 */
function mapRects(o: Outfit, mood: Mood = 'flying') {
  const out: { x: number; y: number; w: number; h: number; fill: string }[] = []
  let open = new Map<string, (typeof out)[number]>()
  ;(o.rowsFor?.(mood) ?? o.rows).forEach((row, r) => {
    const next = new Map<string, (typeof out)[number]>()
    let x = 0
    while (x < row.length) {
      const ch = row[x]!
      let end = x + 1
      while (end < row.length && row[end] === ch) end++
      const fill = o.legend[ch]
      if (ch !== '.' && fill) {
        const key = `${x}:${end}:${ch}`
        const above = open.get(key)
        if (above) {
          above.h += 0.5
          next.set(key, above)
        } else {
          const rect = { x, y: o.top + r * 0.5, w: end - x, h: 0.5, fill }
          out.push(rect)
          next.set(key, rect)
        }
      }
      x = end
    }
    open = next
  })
  return out
}

function OutfitSvg({
  outfit,
  mood,
  size,
  grid = false,
}: {
  outfit: Outfit
  mood: Mood
  size: number
  grid?: boolean
}) {
  const rects = mapRects(outfit, mood)
  return (
    <svg
      viewBox="-6 -2 28 14"
      width={size}
      height={(size * 14) / 28}
      shapeRendering="crispEdges"
      style={{ overflow: 'visible', display: 'block', filter: outfit.aura?.(mood) }}
    >
      {outfit.behind(mood)}
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
      ))}
      <g shapeRendering="geometricPrecision">{outfit.front(mood)}</g>
      {grid &&
        Array.from({ length: 29 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={-6}
            x2={22}
            y1={-2 + i * 0.5}
            y2={-2 + i * 0.5}
            stroke="#ffffff14"
            strokeWidth={0.03}
          />
        ))}
      {grid &&
        Array.from({ length: 29 }, (_, i) => (
          <line key={`v${i}`} x1={-6 + i} x2={-6 + i} y1={-2} y2={12} stroke="#ffffff14" strokeWidth={0.03} />
        ))}
    </svg>
  )
}

const SIZES = [54, 60, 72, 78]
const label: React.CSSProperties = {
  font: '600 11px var(--font-body)',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--ash)',
}

export function ClawdOutfitsPrototype() {
  const params = new URLSearchParams(location.search)
  const [variant, setVariant] = useState(params.get('variant') ?? 'A')
  const index = Math.max(
    0,
    OUTFITS.findIndex((o) => o.key === variant),
  )
  const outfit = OUTFITS[index]!

  const go = (step: number) => {
    const next = OUTFITS[(index + step + OUTFITS.length) % OUTFITS.length]!.key
    const url = new URL(location.href)
    url.searchParams.set('variant', next)
    history.replaceState(null, '', url)
    setVariant(next)
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const rectCount = mapRects(outfit).length
  return (
    <div
      style={{
        background: 'var(--abyss)',
        color: 'var(--bone)',
        minHeight: '100vh',
        padding: '20px 24px 90px',
        font: '13px var(--font-body)',
        overflow: 'auto',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ ...label, color: 'var(--signal-hot)' }}>Prototype · #95 · throwaway</div>

      {/* All four at the header's size, side by side, in a header-like strip. */}
      <div
        id="strip"
        style={{
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          borderBottom: '1px solid var(--line)',
          padding: '14px 0',
          margin: '6px 0 18px',
        }}
      >
        <span style={{ font: '21px var(--font-display)', letterSpacing: '2.5px', color: 'var(--signal)' }}>
          BAT-SIGNAL
        </span>
        {OUTFITS.filter((o) => o.group === outfit.group).map((o) => (
          <div
            key={o.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: o.ground ?? 'var(--abyss)',
              padding: '6px 10px',
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <OutfitSvg outfit={o} mood="flying" size={54} />
              <OutfitSvg outfit={o} mood="alarmed" size={54} />
            </div>
            <span style={label}>{o.key}</span>
          </div>
        ))}
      </div>

      <h2 style={{ font: '20px var(--font-display)', letterSpacing: '0.6px', margin: '0 0 4px' }}>
        {outfit.key} · {outfit.name}
      </h2>
      <p style={{ color: 'var(--ink)', margin: '0 0 6px', maxWidth: 720 }}>{outfit.note}</p>
      <p style={{ font: '11px var(--font-mono)', color: 'var(--ash)', margin: '0 0 18px' }}>
        {outfit.rows.length} half-rows from y = {outfit.top} · {rectCount} map rects (today&apos;s BatClawd:
        14 rects + 4 paths)
      </p>

      {(['flying', 'alarmed'] as Mood[]).map((mood) => (
        <div key={mood} style={{ marginBottom: 22 }}>
          <div style={label}>{mood}</div>
          <div
            style={{
              display: 'flex',
              gap: 36,
              alignItems: 'flex-end',
              marginTop: 8,
              background: outfit.ground ?? 'var(--abyss)',
              padding: 12,
            }}
          >
            {SIZES.map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <OutfitSvg outfit={outfit} mood={mood} size={s} />
                <span style={{ font: '10px var(--font-mono)', color: 'var(--ash)' }}>map · {s}px</span>
              </div>
            ))}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'center',
                borderLeft: '1px solid var(--line)',
                paddingLeft: 24,
              }}
            >
              <BatClawd mood={mood} size={60} />
              <span style={{ font: '10px var(--font-mono)', color: 'var(--ash)' }}>today · 60px</span>
            </div>
            <OutfitSvg outfit={outfit} mood={mood} size={336} grid />
          </div>
        </div>
      ))}

      <div style={{ ...label, marginTop: 8 }}>The map</div>
      <pre
        style={{
          font: '12px/1.15 Consolas, "Cascadia Mono", monospace',
          color: 'var(--ink)',
          margin: '6px 0 0',
        }}
      >
        {outfit.rows.map((r, i) => `${(outfit.top + i * 0.5).toFixed(1).padStart(5)}  ${r}`).join('\n')}
      </pre>

      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 16,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          background: '#f2f2f2',
          color: '#111',
          padding: '8px 14px',
          borderRadius: 999,
          boxShadow: '0 6px 20px rgb(0 0 0 / 60%)',
          font: '600 13px system-ui, sans-serif',
        }}
      >
        <button
          onClick={() => go(-1)}
          style={{ border: 0, background: 'none', fontSize: 18, cursor: 'pointer', color: '#111' }}
          aria-label="Previous variant"
        >
          ←
        </button>
        <span>
          {outfit.key} ({outfit.name})
        </span>
        <button
          onClick={() => go(1)}
          style={{ border: 0, background: 'none', fontSize: 18, cursor: 'pointer', color: '#111' }}
          aria-label="Next variant"
        >
          →
        </button>
      </div>
    </div>
  )
}
