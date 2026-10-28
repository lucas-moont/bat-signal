// A Theme's Atmosphere (CONTEXT.md) as data: what its canvas paints behind the panel, on the shared
// 8 fps clock: VENGEANCE's rain, PALE MOONLIGHT's snow, WATCHFUL PROTECTOR's lit windows, ash on a
// desert wind, smoke off the street, noise on a screen; each kind has its painter
// (renderer/src/painters.ts). Behind its motion, a scene may have a backdrop: a still drawing, as
// HOLIDAY's moon.

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
  /**
   * A still drawing behind its motion, painted once (again only after a resize or new colors): it
   * stays while the Atmosphere is on, moving or not, under reduced motion too.
   */
  backdrop?: Backdrop
}

/**
 * A moon in the sky. Carved, it is a jack-o'-lantern (HOLIDAY's, after Sale's 2021 Deluxe cover): a
 * little wider than tall, a stem on top, two furious eyes and a grin in the bat's shape cut through it.
 */
export interface MoonBackdrop {
  kind: 'moon'
  /** The variable it is filled in. */
  color: string
  /** Its strength (alpha), from 0 to 1. */
  alpha: number
  /** Its centre: across the panel as a share of its width (0 to 1), and down from its top in px. */
  at: readonly [number, number]
  /** Its radius across, in px (a carved moon is a little less tall). */
  radius: number
  /** Whether it is a jack-o'-lantern: a stem, two eyes and a grin cut through it. Not by default. */
  carved?: boolean
  /** The variable a carved moon's candle lights its eyes and grin in from inside; unlit without one. */
  candle?: string
}

/**
 * A red sky over a black skyline (DARK DECO's, after the opening of Batman: The Animated Series): the
 * sky in bands from its top to the horizon, soft shadows of cloud only darker than it and never lit,
 * Deco towers cut out sharp along the foot with a few faint lit windows, and a mist over their foot.
 * The towers are the same city every time, whatever the panel's size. It fills the panel, over the
 * Theme's haze: a Theme with a skyline lights its sky in its bands, and leaves its haze clear.
 */
export interface SkylineBackdrop {
  kind: 'skyline'
  /**
   * The sky's bands, from its top down: how far above the foot each sits (px) and its variable. They
   * keep that height on a panel of any size, so the lit band stays just above the towers, where no
   * text sits; above the highest, the sky stays its top's color.
   */
  sky: readonly { above: number; color: string }[]
  /**
   * The clouds: the variable they are filled in, how soft they are (a blur, in px), and each mass, an
   * ellipse: its centre across and down the panel as shares of its size, its half-width and
   * half-height in px, its strength (alpha), and its own softness if not the clouds' (a flat streak
   * stays crisp where a billow is soft).
   */
  clouds: {
    color: string
    blur: number
    masses: readonly {
      at: readonly [x: number, y: number]
      size: readonly [rx: number, ry: number]
      alpha: number
      blur?: number
    }[]
  }
  /**
   * The towers: the variable they are cut out in, how tall the lowest roofs and the tallest spire
   * are above the foot (px), and their lit windows: a variable, a strength and how many.
   */
  towers: {
    color: string
    height: readonly [low: number, high: number]
    windows: { color: string; alpha: number; count: number }
  }
  /** The mist over the towers' foot: its variable, its strength at the bottom, and how high it rises (px). */
  mist: { color: string; alpha: number; height: number }
}

/** The still drawings a backdrop may be; each kind has its painter (renderer/src/painters.ts). */
export type Backdrop = MoonBackdrop | SkylineBackdrop

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
 * Bats in place of the flakes: the band their lines lie in, its top and bottom in px from the
 * panel's top; how far a bat rises above its line and dips below it as it crosses, in px (its
 * wings reach a quarter of its width further); and how far it flies on past the panel's edge
 * before it comes back, in px, so only a few of the colony are in the panel at once.
 */
export interface Colony {
  band: readonly [number, number]
  arc: number
  away: number
}

/**
 * The leaves of a tear-off calendar in place of the flakes (HOLIDAY's): each its depth's size wide
 * and a quarter taller, its month cut off across its top, its bottom edge torn ragged; hung from
 * its top, it swings like a pendulum as it falls, out of step with its neighbours.
 */
export interface Pages {
  /** How far it swings either way of its line, in px. */
  swing: number
  /** Seconds for a whole swing, out and back. */
  period: number
  /** How far it leans at the end of a swing, in radians: its bottom trails out past its top. */
  tilt: number
}

/**
 * Ash blown on a desert wind: flakes cross the panel at a shallow slant, left to right, in depths
 * that differ in strength, size and speed, a share of them dust. Or bats on the wind in its place
 * (BLUE COLLAR's colony): a few in a band of the panel, flapping every tick, each on an arc that
 * rises and dips as it crosses; the drawing BECOME A BAT's swarm flies (shared/bats.ts). Or the
 * pages of a calendar, swinging from side to side as they fall (HOLIDAY's).
 */
export type AshAtmosphere = AshScene & ({ bats?: Colony; pages?: never } | { pages?: Pages; bats?: never })

/** What an ash Atmosphere carries in place of its flakes: bats (a colony) or a calendar's pages, never both. */
interface AshScene extends Scene {
  kind: 'ash'
  /** The variable the ash, the bats or the pages are filled in. */
  color: string
  /** The dust among the ash, if any: its variable, and its share of the flakes. */
  dust?: { color: string; share: number }
  /** Flakes per 1000 square pixels: of the band and as far past its ends as they fly, for bats. */
  density: number
  /**
   * Each depth from the farthest to the nearest: its alpha, its flakes' size (a bat's width), and
   * how far the wind carries them and they fall in a tick, in px (a wind under 0 blows from the
   * right).
   */
  depths: readonly { alpha: number; size: number; wind: number; fall: number }[]
  bats?: Colony
  pages?: Pages
}

/**
 * Smoke off the street: soft round puffs rise from the bottom edge, a few at a time, each swelling
 * and fading to nothing as it rises, swaying a little on the clock. On a wind, and flattened, they
 * are fog or cloud banks drifting across the panel.
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
  /**
   * How far a wind carries it sideways a tick, in px (under 0 from the right): a puff blown past
   * one side comes back in at the other. None by default.
   */
  wind?: number
  /** A puff's height for its width: under 1, a flat bank of fog or cloud. Round by default. */
  aspect?: number
  /**
   * The band of the sky it is born in, its top and bottom in px from the panel's top: each puff at
   * a height of its own in it, again each time it is born. Off the street, by default.
   */
  band?: readonly [number, number]
}

/**
 * Police blimps hovering over a city at night (DARK DECO's, after the opening of Batman: The
 * Animated Series): black hulls, each with two beams under its nose that lean out either way and
 * sway a few degrees, never sweeping; drifting so slowly they hover, and round from the other side
 * once wholly past one.
 */
export interface BlimpsAtmosphere extends Scene {
  kind: 'blimps'
  /** The variable the hulls are cut out in. */
  color: string
  /**
   * Each blimp: how long it is (px), how far down the panel it hovers and where across it starts
   * (shares of the panel's height and width), how far it drifts a tick (px; under 0, from the
   * right), and, if not the fleet's, how far its beams lean out (under 0, in: from lamps apart they
   * cross, as the opening's far blimps' do).
   */
  fleet: readonly { length: number; at: number; from: number; drift: number; splay?: number }[]
  /**
   * The two beams under each nose: their variable and strength (alpha), how far they reach (in hull
   * lengths), how wide each opens either way of its axis, how far each leans out from straight down
   * and sways either way of that (radians, as the rain's angle), the seconds a sway takes, out and
   * back, and how far apart its two lamps hang (in hull lengths; together by default).
   */
  beams: {
    color: string
    alpha: number
    reach: number
    width: number
    splay: number
    sway: number
    period: number
    apart?: number
  }
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
  | RainAtmosphere
  | SnowAtmosphere
  | LitWindowsAtmosphere
  | AshAtmosphere
  | SmokeAtmosphere
  | NoiseAtmosphere
  | BlimpsAtmosphere

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

/**
 * BLUE COLLAR's colony (absolute-batman.md, section 9): about five bats crossing a band under the
 * masthead in three depths of lavender, a few in the panel at a time, the nearest from the right,
 * each on an arc that rises and dips, flying on past the edge before it comes back. Bigger and
 * stronger than the dossier's, which read as specks (picked on screen, #121).
 */
export const BLUE_COLLAR_COLONY: AshAtmosphere = {
  kind: 'ash',
  color: '--colony',
  density: 0.8,
  depths: [
    { alpha: 0.35, size: 14, wind: 3, fall: 0 },
    { alpha: 0.45, size: 18, wind: 4, fall: 0 },
    { alpha: 0.55, size: 22, wind: -5, fall: 0 },
  ],
  bats: { band: [64, 74], arc: 4, away: 160 },
}

/**
 * HOLIDAY's Halloween night (jury-wave-3.md, section 9, decisions 15 to 17): a still pumpkin moon in
 * a dim orange, upper right, after Sale's 2021 Deluxe cover, its furious eyes and bat-shaped grin lit
 * by a candle, and under it a tear-off calendar's
 * pages, torn and falling, swinging from side to side in three depths of Bone (the middle size of
 * three, picked on screen, #146).
 */
export const HOLIDAY_NIGHT: AshAtmosphere = {
  kind: 'ash',
  color: '--pages',
  density: 0.045,
  depths: [
    { alpha: 0.22, size: 8, wind: 0.3, fall: 1 },
    { alpha: 0.3, size: 10, wind: 0.65, fall: 1.5 },
    { alpha: 0.4, size: 12, wind: 1, fall: 2 },
  ],
  pages: { swing: 6, period: 3, tilt: 0.35 },
  backdrop: {
    kind: 'moon',
    color: '--moon',
    alpha: 0.6,
    at: [0.72, 68],
    radius: 34,
    carved: true,
    candle: '--candle',
  },
}

/**
 * DARK DECO's red sky, after the opening of Batman: The Animated Series (dark-deco-build.md, section 2;
 * jury-wave-3.md, section 9, decision 18): the sky in bands from its black top to the red-orange band
 * just above the skyline, black cloud shadows in it at the medium strength picked on screen (soft
 * billows and banks, a few flat streaks kept crisp), black Deco towers with a few Bone windows and a
 * blue street mist at their foot; over it the storyboard's three police blimps hovering, a near one
 * and two far, two Bone beams under each, the farthest's leaning in to cross (the beams' strength
 * picked on screen, "more visible"). Frozen under reduced motion, the sky kept.
 */
export const DARK_DECO_SKY: BlimpsAtmosphere = {
  kind: 'blimps',
  color: '--blimp',
  still: 'calm',
  fleet: [
    { length: 34, at: 0.2, from: 0.68, drift: 0.25 },
    { length: 22, at: 0.33, from: 0.18, drift: -0.15 },
    { length: 15, at: 0.5, from: 0.45, drift: 0.1, splay: -0.12 },
  ],
  beams: {
    color: '--beam',
    alpha: 0.14,
    reach: 5,
    width: 0.08,
    splay: 0.24,
    sway: 0.05,
    period: 12,
    apart: 0.25,
  },
  backdrop: {
    kind: 'skyline',
    sky: [
      { above: 440, color: '--sky-top' },
      { above: 387, color: '--sky-dark' },
      { above: 343, color: '--sky-crimson' },
      { above: 229, color: '--sky' },
      { above: 106, color: '--sky-lit' },
      { above: 53, color: '--sky-glow' },
    ],
    clouds: {
      color: '--sky-shadow',
      blur: 10,
      masses: [
        { at: [0.094, 0.091], size: [110, 55], alpha: 0.77 },
        { at: [0.938, 0.068], size: [120, 60], alpha: 0.77 },
        { at: [0.5, 0.0], size: [120, 40], alpha: 0.68 },
        { at: [-0.031, 0.455], size: [80, 40], alpha: 0.51 },
        { at: [1.031, 0.523], size: [70, 40], alpha: 0.51 },
        { at: [0.188, 0.723], size: [95, 22], alpha: 0.59 },
        { at: [0.781, 0.682], size: [90, 24], alpha: 0.55 },
        { at: [0.5, 0.795], size: [70, 14], alpha: 0.47 },
        { at: [0.031, 0.83], size: [60, 12], alpha: 0.42 },
        { at: [0.938, 0.8], size: [55, 12], alpha: 0.42 },
        { at: [0.281, 0.641], size: [140, 4], alpha: 0.42, blur: 2.5 },
        { at: [0.719, 0.768], size: [120, 3.5], alpha: 0.42, blur: 2.5 },
        { at: [0.125, 0.777], size: [90, 3], alpha: 0.38, blur: 2.5 },
      ],
    },
    towers: { color: '--skyline', height: [24, 120], windows: { color: '--window', alpha: 0.35, count: 14 } },
    mist: { color: '--mist', alpha: 0.55, height: 36 },
  },
}

/**
 * SILENT PREDATOR's rain, over Asylum's island and Knight's whole night (arkham-games.md, section 10, A1):
 * falling almost straight down, heavier and brighter than VENGEANCE's slant, under a green haze from
 * above; no searchlights, which went to DARK DECO's sky (jury-wave-3.md, section 9, decision 5).
 */
export const SILENT_PREDATOR_RAIN: RainAtmosphere = {
  kind: 'rain',
  color: '--rain',
  density: 0.4,
  angle: 0.06,
  depths: [0.1, 0.16, 0.25],
}
