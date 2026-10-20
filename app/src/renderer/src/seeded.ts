// Numbers drawn from a seed: the same ones every time, for whatever is laid out at random but must
// look the same each run (the Atmospheres' skylines and panes, a scribbled emblem's strokes).

/** The same numbers in [0, 1) every time from the same seed in [0, 1) (Park and Miller's). */
export function seededFrom(seed: number): () => number {
  let state = Math.floor(seed * 2147483646) + 1
  return () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646
}

/** A number between the two, picked by `next`. */
export const between = ([low, high]: readonly [number, number], next: () => number) =>
  low + next() * (high - low)
