// A Theme's Atmosphere (CONTEXT.md) as data: what its canvas paints behind the panel, on the shared
// 8 fps clock: VENGEANCE's rain, PALE MOONLIGHT's snow, a skyline's lit windows; ash arrives as
// another kind with its own painter (renderer/src/painters.ts).

/** What every kind has. */
interface Scene {
  /** The Theme variables it is painted in, read from the page (a canvas can't use a variable). */
  colors: readonly string[]
  /**
   * A still scene stays on the page, frozen, while it doesn't move (under reduced motion, and once
   * the pointer has left); a moving one leaves with its motion.
   */
  still?: boolean
}

/** Rain slanting in the wind, in depths that differ in strength, length and speed. */
export interface RainAtmosphere extends Scene {
  kind: 'rain'
  colors: readonly [rain: string]
  /** Drops per 1000 square pixels. */
  density: number
  /** Radians from vertical, the wind from the left. */
  angle: number
  /** Each depth's strength (alpha), from the farthest to the nearest. */
  depths: readonly number[]
}

/** Snow falling almost straight down, in depths that differ in strength, size and pace. */
export interface SnowAtmosphere extends Scene {
  kind: 'snow'
  colors: readonly [snow: string]
  /** Flakes per 1000 square pixels. */
  density: number
  /** Each depth from the farthest to the nearest: its alpha, its flakes' size and fall a tick, in px. */
  depths: readonly { alpha: number; size: number; fall: number }[]
  /** How far a flake sways either way as it falls, in px. */
  drift: number
}

/**
 * A skyline of flat-roofed slab towers along the bottom, lit from within: a grid of windows in
 * their glass walls, a few of them lit, one switching on or off every so often. A still scene.
 */
export interface LitWindowsAtmosphere extends Scene {
  kind: 'lit-windows'
  /** The towers', their edges', then each light's, in the order of `lights`. */
  colors: readonly [towers: string, edges: string, ...lights: string[]]
  /** The tallest tower's height, a share of the canvas's. */
  height: number
  /** How many towers stand along it. */
  towers: number
  /** The share of the windows lit. */
  lit: number
  /** Each light: its share of the lit windows and its strength (alpha). */
  lights: readonly { share: number; alpha: number }[]
  /** Seconds between one window switching and the next. */
  every: number
  still: true
}

export type Atmosphere = RainAtmosphere | SnowAtmosphere | LitWindowsAtmosphere

/** The Batman (2022)'s rain. */
export const VENGEANCE_RAIN: RainAtmosphere = {
  kind: 'rain',
  colors: ['--rain'],
  density: 0.32,
  angle: 0.26,
  depths: [0.06, 0.1, 0.16],
}

/**
 * PALE MOONLIGHT's snow, from Batman Returns over the 1989 smog (burton-1989.md, section 9): about
 * 35 flakes in the default panel, in three depths of bone, falling 1 to 3 pixels a tick.
 */
export const PALE_MOONLIGHT_SNOW: SnowAtmosphere = {
  kind: 'snow',
  colors: ['--snow'],
  density: 0.25,
  depths: [
    { alpha: 0.18, size: 1, fall: 1 },
    { alpha: 0.28, size: 1.5, fall: 2 },
    { alpha: 0.4, size: 2, fall: 3 },
  ],
  drift: 0.5,
}
