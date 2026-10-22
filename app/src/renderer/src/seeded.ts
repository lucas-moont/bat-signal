// Numbers drawn from a seed: the same ones every time, for whatever is laid out at random but must
// look the same each run (the Atmospheres' skylines and panes, a scribbled emblem's strokes, a
// scratched lamp's marks).

/** The same numbers in [0, 1) every time from the same seed in [0, 1) (Park and Miller's). */
export function seededFrom(seed: number): () => number {
  let state = Math.floor(seed * 2147483646) + 1
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646
}

/** The lowest and highest a number may be. */
export type Range = readonly [number, number]

/** A number between the two, picked by `next`. */
export const between = ([low, high]: Range, next: () => number) => low + next() * (high - low)

/** One of them, picked by `next`. */
export function pick<T>(some: readonly T[], next: () => number): T {
  return some[Math.floor(next() * some.length)]!
}
