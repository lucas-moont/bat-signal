// A small bat in flight, one drawing shared by the Themes that show bats (jury-wave-2.md, section 6):
// BECOME A BAT's swarm flies it, on Bat-Clawd's grid, and BLUE COLLAR's colony on the panel's canvas. Ours, drawn plain
// so it reads at a few pixels: two short ears, a body, and scalloped wings in two frames of a beat.

/** Which frame of the wingbeat: the tips raised above the body, or swept below it. */
export type Wings = 'up' | 'down'

/** A drawing's points, in order round its edge. */
type Outline = readonly (readonly [number, number])[]

/**
 * Each frame's left half on a 12x6 box centered on the body, from the top of the head round the
 * wing to the tail, mirrored for the right: a short ear, the shoulder, the wing's leading edge to
 * its tip, then the scallops of its trailing edge back to the body.
 */
const HALVES: Record<Wings, Outline> = {
  up: [
    [0, -1],
    [-0.6, -1.6],
    [-0.8, -0.6],
    [-3.5, -2.2],
    [-6, -3],
    [-5, -1.2],
    [-4, -1.4],
    [-3.2, -0.4],
    [-2, -0.8],
    [-0.9, 0.6],
    [0, 1.6],
  ],
  down: [
    [0, -1],
    [-0.6, -1.6],
    [-0.8, -0.6],
    [-3, -0.8],
    [-6, 1.6],
    [-4.6, 1.2],
    [-3.8, 2.2],
    [-2.6, 1],
    [-1.6, 1.8],
    [-0.8, 0.8],
    [0, 1.6],
  ],
}

/** A whole outline from its left half: the half, then the same mirrored back up the right. */
const mirrored = (half: Outline): Outline => [
  ...half,
  ...half
    .slice(1, -1)
    .reverse()
    .map(([x, y]) => [-x, y] as const),
]

/** Each frame's whole outline. */
const OUTLINES: Record<Wings, Outline> = { up: mirrored(HALVES.up), down: mirrored(HALVES.down) }

/** The drawing's box: 12 wide, centered on the body. */
const BOX_WIDTH = 12

/** A number for a path: two decimals at most, and no "-0". */
const pathNumber = (value: number) => String(Number(value.toFixed(2)) || 0)

/**
 * The points round a bat in flight `width` wide, its body at (cx, cy), in its frame of the
 * wingbeat: what a canvas draws it from, line by line (BLUE COLLAR's colony).
 */
export const batOutline = (wings: Wings, cx: number, cy: number, width: number): Outline => {
  const scale = width / BOX_WIDTH
  return OUTLINES[wings].map(([x, y]) => [cx + x * scale, cy + y * scale] as const)
}

/** The path of a bat in flight `width` wide, its body at (cx, cy), in its frame of the wingbeat. */
export function flyingBat(wings: Wings, cx: number, cy: number, width: number): string {
  const points = batOutline(wings, cx, cy, width).map(([x, y]) => `${pathNumber(x)} ${pathNumber(y)}`)
  return `M${points.join(' L')} Z`
}

/** A bat in a flock: its body at (cx, cy), `width` units wide, in its frame of the wingbeat. */
export type BatAt = readonly [cx: number, cy: number, width: number, wings: Wings]

/** Many bats as one path, so they paint as one mass. */
export const flock = (bats: readonly BatAt[]): string =>
  bats.map(([cx, cy, width, wings]) => flyingBat(wings, cx, cy, width)).join(' ')
