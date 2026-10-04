import { clamp } from '../shared/guards'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowDefaults {
  width: number
  height: number
  minWidth: number
  minHeight: number
  /** Gap kept from the screen edges when placing the window in the corner. */
  margin: number
}

/**
 * Where to open the window.
 * @param saved bounds remembered from last time, if any
 * @param displays work areas of the connected displays, primary first
 */
export function restoreBounds(
  saved: Rect | undefined,
  displays: { workArea: Rect }[],
  d: WindowDefaults,
): Rect {
  const primary = displays[0]!.workArea
  // The display the saved window overlaps most; none means that display is gone.
  const home = saved
    ? displays
        .map(({ workArea }) => ({ workArea, shared: overlap(saved, workArea) }))
        .filter((c) => c.shared > 0)
        .sort((a, b) => b.shared - a.shared)[0]?.workArea
    : undefined
  const area = home ?? primary
  const width = clamp(saved?.width ?? d.width, d.minWidth, area.width)
  const height = clamp(saved?.height ?? d.height, d.minHeight, area.height)

  if (!saved || !home) {
    return {
      x: area.x + area.width - width - d.margin,
      y: area.y + area.height - height - d.margin,
      width,
      height,
    }
  }
  return {
    x: clamp(saved.x, area.x, area.x + area.width - width),
    y: clamp(saved.y, area.y, area.y + area.height - height),
    width,
    height,
  }
}

const overlap = (a: Rect, b: Rect): number => {
  const w = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
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
