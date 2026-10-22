// A scratched lamp's marks (DiscBat.tsx): scratches over its bat and glass, as keys and claws
// leave them, and its laugh gouged in, each stroke gone over two or three times as a blade does
// (SERIOUS HOUSE's Signal disc, #123). On the disc's face, 0 to 100 across, from a fixed seed, so
// the same lamp is scratched the same way every time.

import { type Outline, pathNumber } from '@shared/bats'
import type { Lamp } from '@shared/emblems'
import { between, pick, type Range, seededFrom } from './seeded'

type Point = Outline[number]

/** A lamp's marks, each a path of tapering scratches: those over the bat and glass, and its laugh. */
export interface Gouges {
  scratches: string
  laugh: string
}

/**
 * The scratches: this many groups of one to four near-parallel lines, each group's middle somewhere
 * `across` and `down` the face, tilted up to `tilt` degrees either way (and turned a quarter now and
 * then, `crossed` of the time), its lines as long as `length` (each `reach` of it, slipped along up
 * to `slip`) and as far apart as `gap`; and twice as many short nicks.
 */
const GROUPS = {
  count: 13,
  across: [20, 80] as Range,
  down: [29, 71] as Range,
  tilt: [-70, 70] as Range,
  crossed: 0.3,
  length: [12, 34] as Range,
  reach: [0.7, 1.05] as Range,
  slip: [-2, 2] as Range,
  gap: [1.2, 2.4] as Range,
  lines: [1, 1, 2, 3, 3, 4],
}
const NICKS = { across: [18, 82] as Range, down: [22, 78] as Range, length: [2, 6] as Range }
/** How wide a scratch is at its middle, a nick, and a stroke of the laugh. */
const WIDTH = { scratch: [0.55, 1.2] as Range, nick: [0.4, 0.75] as Range, laugh: [0.7, 1.35] as Range }
/** How far a scratch bends from straight, and a stroke of the laugh. */
const BEND = { scratch: [-1.5, 1.5] as Range, laugh: [-0.6, 0.6] as Range }
/**
 * A stroke of the laugh: how many times the blade goes over it, how far each time strays from it,
 * and where each starts and ends (shares of the stroke: before it and past it).
 */
const OVER = {
  times: [2, 3],
  stray: [-0.7, 0.7] as Range,
  start: [-0.12, 0.05] as Range,
  end: [0.95, 1.15] as Range,
}

/** A scratch from one point to another: widest in the middle, tapering to nothing at both ends, a little bent. */
function scratch([x0, y0]: Point, [x1, y1]: Point, width: number, bend: number): string {
  const length = Math.hypot(x1 - x0, y1 - y0) || 1
  const [nx, ny] = [-(y1 - y0) / length, (x1 - x0) / length]
  const [cx, cy] = [(x0 + x1) / 2 + nx * bend, (y0 + y1) / 2 + ny * bend]
  const at = (x: number, y: number) => `${pathNumber(x)} ${pathNumber(y)}`
  return (
    `M${at(x0, y0)} Q${at(cx + nx * width, cy + ny * width)} ${at(x1, y1)} ` +
    `Q${at(cx - nx * width, cy - ny * width)} ${at(x0, y0)}Z`
  )
}

function gouge(lamp: Lamp): Gouges {
  const random = seededFrom(0.37)
  const scratches: string[] = []
  for (let g = 0; g < GROUPS.count; g++) {
    const [cx, cy] = [between(GROUPS.across, random), between(GROUPS.down, random)]
    const turn = between(GROUPS.tilt, random) + pick([0, 180], random) + (random() < GROUPS.crossed ? 90 : 0)
    const angle = (turn * Math.PI) / 180
    const [dx, dy] = [Math.cos(angle), Math.sin(angle)]
    const length = between(GROUPS.length, random)
    const lines = pick(GROUPS.lines, random)
    const gap = between(GROUPS.gap, random)
    for (let k = 0; k < lines; k++) {
      const off = (k - (lines - 1) / 2) * gap
      const half = (length * between(GROUPS.reach, random)) / 2
      const along = between(GROUPS.slip, random)
      const [sx, sy] = [cx - dy * off + dx * along, cy + dx * off + dy * along]
      scratches.push(
        scratch(
          [sx - dx * half, sy - dy * half],
          [sx + dx * half, sy + dy * half],
          between(WIDTH.scratch, random),
          between(BEND.scratch, random),
        ),
      )
    }
  }
  for (let n = 0; n < GROUPS.count * 2; n++) {
    const [x, y] = [between(NICKS.across, random), between(NICKS.down, random)]
    const angle = between([0, Math.PI], random)
    const length = between(NICKS.length, random)
    scratches.push(
      scratch(
        [x, y],
        [x + Math.cos(angle) * length, y + Math.sin(angle) * length],
        between(WIDTH.nick, random),
        0,
      ),
    )
  }
  const laugh: string[] = []
  for (const [x0, y0, x1, y1] of lamp.laugh) {
    const times = pick(OVER.times, random)
    const stray = () => between(OVER.stray, random)
    for (let t = 0; t < times; t++) {
      const [ax, ay, bx, by] = [x0 + stray(), y0 + stray(), x1 + stray(), y1 + stray()]
      // A point `share` of the way from the stroke's start to its end, or before or past them.
      const on = (share: number): Point => [ax + (bx - ax) * share, ay + (by - ay) * share]
      const [s, e] = [between(OVER.start, random), between(OVER.end, random)]
      laugh.push(scratch(on(s), on(e), between(WIDTH.laugh, random), between(BEND.laugh, random)))
    }
  }
  return { scratches: scratches.join(' '), laugh: laugh.join(' ') }
}

const gouged = new WeakMap<Lamp, Gouges>()

/** A lamp's marks, worked out once for it. */
export function gougesOf(lamp: Lamp): Gouges {
  let marks = gouged.get(lamp)
  if (!marks) {
    marks = gouge(lamp)
    gouged.set(lamp, marks)
  }
  return marks
}
