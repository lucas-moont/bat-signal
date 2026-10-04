import { clamp } from '../shared/guards'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

/** The bottom-right point every Batcave window hangs from: the signal disc, its notice, the panel. */
export interface Anchor {
  x: number
  y: number
}

const contains = (area: Rect, p: Anchor): boolean =>
  p.x >= area.x && p.x <= area.x + area.width && p.y >= area.y && p.y <= area.y + area.height

/** How far a point is from a rectangle (0 inside it). */
const distance = (area: Rect, p: Anchor): number =>
  Math.hypot(
    Math.max(area.x - p.x, 0, p.x - (area.x + area.width)),
    Math.max(area.y - p.y, 0, p.y - (area.y + area.height)),
  )

/** The work area holding the corner, or the nearest one when the corner slipped just off it. */
const areaOf = (anchor: Anchor, displays: { workArea: Rect }[]): Rect =>
  displays.reduce(
    (best, d) => (distance(d.workArea, anchor) < distance(best, anchor) ? d.workArea : best),
    displays[0]!.workArea,
  )

export type Size = { width: number; height: number }

/** The bottom-right corner of a rectangle: where a window hangs from. */
export const cornerOf = (r: Rect): Anchor => ({ x: r.x + r.width, y: r.y + r.height })

/** A saved corner if it still lies on a connected display, else the primary display's corner. */
export function resolveAnchor(
  saved: Anchor | undefined,
  displays: { workArea: Rect }[],
  margin: number,
): Anchor {
  if (saved && displays.some((d) => contains(d.workArea, saved))) return saved
  const area = displays[0]!.workArea
  return { x: area.x + area.width - margin, y: area.y + area.height - margin }
}

/** A window of `size` hanging from `anchor` by its bottom-right edge, kept on that display. */
export function anchoredRect(anchor: Anchor, size: Size, displays: { workArea: Rect }[]): Rect {
  const area = areaOf(anchor, displays)
  const width = Math.min(size.width, area.width)
  const height = Math.min(size.height, area.height)
  return {
    x: clamp(anchor.x - width, area.x, area.x + area.width - width),
    y: clamp(anchor.y - height, area.y, area.y + area.height - height),
    width,
    height,
  }
}

/**
 * The signal window with a notice card out. The disc stays where it is: the window grows up and
 * left from it, or down (`below`) and right (`right`) when the display has no room that way.
 */
export function noticePlacement(
  anchor: Anchor,
  { disc, notice }: { disc: Size; notice: Size },
  displays: { workArea: Rect }[],
): { rect: Rect; below: boolean; right: boolean } {
  const area = areaOf(anchor, displays)
  const below = anchor.y - area.y < notice.height
  const right = anchor.x - area.x < notice.width
  const x = right ? anchor.x - disc.width : anchor.x - notice.width
  const y = below ? anchor.y - disc.height : anchor.y - notice.height
  return {
    rect: {
      x: clamp(x, area.x, area.x + area.width - notice.width),
      y: clamp(y, area.y, area.y + area.height - notice.height),
      ...notice,
    },
    below,
    right,
  }
}
