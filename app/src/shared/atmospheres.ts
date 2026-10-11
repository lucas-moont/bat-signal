// A Theme's Atmosphere (CONTEXT.md) as data: what its canvas paints behind the panel, on the shared
// 8 fps clock. One kind today, VENGEANCE's rain; snow, ash or a still scene arrive as other kinds
// with their own painter (renderer/src/painters.ts). Its color is the Theme's --rain.

/** Rain slanting in the wind, in depths that differ in strength, length and speed. */
export interface RainAtmosphere {
  kind: 'rain'
  /** Drops per 1000 square pixels. */
  density: number
  /** Radians from vertical, the wind from the left. */
  angle: number
  /** Each depth's strength (alpha), from the farthest to the nearest. */
  depths: readonly number[]
}

export type Atmosphere = RainAtmosphere

/** The Batman (2022)'s rain. */
export const VENGEANCE_RAIN: RainAtmosphere = {
  kind: 'rain',
  density: 0.32,
  angle: 0.26,
  depths: [0.06, 0.1, 0.16],
}
