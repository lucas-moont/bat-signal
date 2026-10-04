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

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

const overlap = (a: Rect, b: Rect): number => {
  const w = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}
