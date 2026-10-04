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

const areaOf = (anchor: Anchor, displays: { workArea: Rect }[]): Rect =>
  displays.find((d) => contains(d.workArea, anchor))?.workArea ?? displays[0]!.workArea

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
export function anchoredRect(
  anchor: Anchor,
  size: { width: number; height: number },
  displays: { workArea: Rect }[],
): Rect {
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
