// A Theme's Atmosphere (CONTEXT.md) as data: what its canvas paints behind the panel, on the shared
// 8 fps clock: VENGEANCE's rain, PALE MOONLIGHT's snow, WATCHFUL PROTECTOR's lit windows, ash on a
// desert wind, smoke off the street, noise on a screen; each kind has its painter
// (renderer/src/painters.ts).

// Each kind names the Theme variables it is painted in; its painter reads them from the page by
// name (a canvas can't use a variable).

/** What every kind has. */
interface Scene {
  /**
   * A still scene stays on the page, frozen, while it doesn't move (under reduced motion, and once
   * the pointer has left); 'calm', it stays frozen under reduced motion only, and otherwise leaves
   * with its motion; by default it leaves either way.
   */
  still?: boolean | 'calm'
}

/** Rain slanting in the wind, in depths that differ in strength, length and speed. */
export interface RainAtmosphere extends Scene {
  kind: 'rain'
  /** The variable its drops are stroked in. */
  color: string
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
  /** The variable its flakes are filled in. */
  color: string
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
  /** The variable the towers and their dark windows are filled in. */
  glass: string
  /** The variable their 1px edges are stroked in, if they have one. */
  edge?: string
  /** The tallest tower's height, a share of the canvas's. */
  tallest: number
  /** How many towers stand along it. */
  towers: number
  /** The share of the windows lit. */
  litShare: number
  /** Each light: its variable, its share of the lit windows and its strength (alpha). */
  lights: readonly { color: string; share: number; alpha: number }[]
  /** Seconds between one window switching and the next. */
  switchEvery: number
  still: true
}

/**
 * Ash blown on a desert wind: flakes cross the panel at a shallow slant, left to right, in depths
 * that differ in strength, size and speed, a share of them dust. Or bats on the wind in its place
 * (BLUE COLLAR's colony): a few in a band of the panel, flapping every tick, each on an arc that
 * rises and dips as it crosses; the drawing BECOME A BAT's swarm flies (shared/bats.ts).
 */
export interface AshAtmosphere extends Scene {
  kind: 'ash'
  /** The variable the ash, or the bats, are filled in. */
  color: string
  /** The dust among the ash, if any: its variable, and its share of the flakes. */
  dust?: { color: string; share: number }
  /** Flakes per 1000 square pixels: of the band and as far past its ends as they fly, for bats. */
  density: number
  /**
   * Each depth from the farthest to the nearest: its alpha, its flakes' size (a bat's width), and
   * how far the wind carries them and they fall in a tick, in px (against the wind, from the right).
   */
  depths: readonly { alpha: number; size: number; wind: number; fall: number }[]
  /**
   * Bats in place of the flakes: the band their lines lie in, its top and bottom in px from the
   * panel's top; how far a bat rises above its line and dips below it as it crosses, in px (its
   * wings reach a quarter of its width further); and how far it flies on past the panel's edge
   * before it comes back, in px, so only a few of the colony are in the panel at once.
   */
  bats?: { band: readonly [number, number]; arc: number; away: number }
}

/**
 * Smoke off the street: soft round puffs rise from the bottom edge, a few at a time, each swelling
 * and fading to nothing as it rises, swaying a little on the clock.
 */
export interface SmokeAtmosphere extends Scene {
  kind: 'smoke'
  /** The variable the puffs are filled in. */
  color: string
  /** How many puffs rise at once. */
  puffs: number
  /** A puff's width as it leaves the street, and as it is gone, in px. */
  size: readonly [number, number]
  /**
   * Its strength (alpha) as it leaves the street, about that at its heart and softer toward its
   * edge (its discs overlap there, so their alphas compound rather than add); it fades to nothing.
   */
  alpha: number
  /** How far it rises a tick, in px. */
  rise: number
  /** Seconds from the street to nothing. */
  life: number
  /** How far it sways either way as it rises, in px. */
  sway: number
}

/**
 * Noise on a screen: marks scattered over the panel that stay put for their life and then appear
 * somewhere else, never falling, born a tick apart so the noise never pulses; and, if it asks for
 * one, a soft band rolling down the panel, as an old set's picture rolls.
 */
export interface NoiseAtmosphere extends Scene {
  kind: 'noise'
  /** The variable its marks and its band are filled in. */
  color: string
  /** Its marks' size: each a speck, a square this many px wide. */
  size: number
  /** Marks per 1000 square pixels. */
  density: number
  /** The strengths (alphas) a mark may have, one picked for each. */
  alphas: readonly number[]
  /**
   * How long a mark stays put, in seconds, counted in whole ticks of the clock (one at least): a
   * tick for static, which flickers in place.
   */
  life: number
  /**
   * The band: its height and how far it rolls down a tick, in px, and its strength (alpha), about
   * that at its middle and softer toward its edges (its boxes overlap there, so their alphas
   * compound rather than add).
   */
  band?: { height: number; alpha: number; fall: number }
}

export type Atmosphere =
  RainAtmosphere | SnowAtmosphere | LitWindowsAtmosphere | AshAtmosphere | SmokeAtmosphere | NoiseAtmosphere

/** The Batman (2022)'s rain. */
export const VENGEANCE_RAIN: RainAtmosphere = {
  kind: 'rain',
  color: '--rain',
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
  color: '--snow',
  density: 0.25,
  depths: [
    { alpha: 0.18, size: 1, fall: 1 },
    { alpha: 0.28, size: 1.5, fall: 2 },
    { alpha: 0.4, size: 2, fall: 3 },
  ],
  drift: 0.5,
}

/**
 * WATCHFUL PROTECTOR's lit windows (nolan.md, section 9): five slab towers along the bottom fifth,
 * about one window in twelve lit, most in fluorescent white and the rest in mercury, never in an
 * Alarm or a warm color; one switches every second.
 */
export const WATCHFUL_PROTECTOR_WINDOWS: LitWindowsAtmosphere = {
  kind: 'lit-windows',
  // Masses without an edge: with one, the towers read as boxes (picked on screen, #82).
  glass: '--tower',
  tallest: 0.2,
  towers: 5,
  litShare: 0.08,
  lights: [
    { color: '--bone', share: 0.7, alpha: 0.22 },
    { color: '--mercury', share: 0.3, alpha: 0.28 },
  ],
  switchEvery: 1,
  still: true,
}

/**
 * KNIGHTMARE's ash and sand on the desert wind (knightmare-palette.md, section 5): about a dozen flakes in the default
 * panel, in three depths, half of them grey ash and half sand, blown 3 to 5 pixels sideways a tick and
 * falling 1 to 2.
 */
export const KNIGHTMARE_ASH: AshAtmosphere = {
  kind: 'ash',
  color: '--ash-fall',
  dust: { color: '--dust', share: 0.5 },
  density: 0.08,
  depths: [
    { alpha: 0.1, size: 1, wind: 3, fall: 1 },
    { alpha: 0.16, size: 1.5, wind: 4, fall: 1.5 },
    { alpha: 0.22, size: 2, wind: 5, fall: 2 },
  ],
  still: 'calm',
}

/**
 * BECOME A BAT's smoke off the street (year-one.md, section 9): five soft olive puffs, one leaving
 * the bottom edge every eight-tenths of a second, swelling from 12 to 40 pixels and fading from a
 * tenth to nothing as they rise 2 pixels a tick over four seconds.
 */
export const BECOME_A_BAT_SMOKE: SmokeAtmosphere = {
  kind: 'smoke',
  color: '--smoke-puff',
  puffs: 5,
  size: [12, 40],
  alpha: 0.1,
  rise: 2,
  life: 4,
  sway: 1,
}

/**
 * ANCIENT GRACE's static between channels (dark-knight-returns.md, section 9): about 85 specks of the
 * screen's white in the default panel, each living a tick of the clock so they flicker in place, at
 * three strengths (made stronger on screen than the dossier's 0.04 to 0.10), and a soft roll bar 24px
 * tall moving down 3 pixels a tick, as an old set's picture rolls. Under reduced motion it stands as
 * one frozen frame.
 */
export const ANCIENT_GRACE_STATIC: NoiseAtmosphere = {
  kind: 'noise',
  color: '--static',
  size: 1,
  density: 0.6,
  alphas: [0.08, 0.12, 0.18],
  life: 1 / 8,
  band: { height: 24, alpha: 0.045, fall: 3 },
  still: 'calm',
}
