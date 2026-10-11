// Bat-Clawd's suits as text maps (the #95 verdict, after the idea in ticlins-claude-monitor): rows
// of letters on his 16-column grid at half-row resolution, and a legend saying which color each
// letter paints. A map is readable and diffable in a PR, and lets a Theme change his anatomy (longer
// ears, a broader chest), not only his colors. Details under a grid cell (his hands holding the
// wrapped cape, the shut eyes) are drawn as layers beside the map, not snapped into it.

/** One half-row tall: the map's resolution. */
export const HALF_ROW = 0.5

export interface OutfitMap {
  /** The grid y of the first row. */
  top: number
  /** Half-rows of 16 letters; "." is empty. */
  rows: readonly string[]
  /** The color each letter paints, as a CSS value (a Theme variable). */
  legend: Readonly<Record<string, string>>
}

export interface Rect {
  x: number
  y: number
  w: number
  h: number
  fill: string
}

/**
 * The rects that draw a map: each run of one letter is a rect, and a run that repeats on the next
 * half-row (same span, same letter) grows taller instead of starting another.
 */
export function mapRects({ top, rows, legend }: OutfitMap): Rect[] {
  const rects: Rect[] = []
  let open = new Map<string, Rect>()
  rows.forEach((row, r) => {
    const next = new Map<string, Rect>()
    for (let x = 0; x < row.length;) {
      const letter = row[x]!
      let end = x + 1
      while (row[end] === letter) end++
      if (letter !== '.') {
        const fill = legend[letter]
        if (!fill) throw new Error(`outfit map: no color for "${letter}"`)
        const key = `${x}:${end}:${letter}`
        const above = open.get(key)
        if (above) above.h += HALF_ROW
        const rect = above ?? { x, y: top + r * HALF_ROW, w: end - x, h: HALF_ROW, fill }
        if (!above) rects.push(rect)
        next.set(key, rect)
      }
      x = end
    }
    open = next
  })
  return rects
}
