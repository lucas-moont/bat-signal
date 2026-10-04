import { describe, expect, it } from 'vitest'
import { anchoredRect, resolveAnchor } from '../src/main/windowState'

// Primary display first, as Electron's screen API is queried by the caller.
const laptop = { workArea: { x: 0, y: 0, width: 1536, height: 816 } }
const external = { workArea: { x: 1536, y: 0, width: 1920, height: 1040 } }
describe('signal geometry', () => {
  const disc = { width: 88, height: 88 }

  it('puts the default corner at the bottom right of the primary display, inside the margin', () => {
    expect(resolveAnchor(undefined, [laptop], 16)).toEqual({ x: 1520, y: 800 })
  })

  it('keeps a saved corner that is on a connected display', () => {
    expect(resolveAnchor({ x: 3000, y: 900 }, [laptop, external], 16)).toEqual({ x: 3000, y: 900 })
  })

  it('falls back to the default corner when that display is gone', () => {
    expect(resolveAnchor({ x: 3000, y: 900 }, [laptop], 16)).toEqual({ x: 1520, y: 800 })
  })

  it('hangs a window from the corner by its bottom-right edge', () => {
    expect(anchoredRect({ x: 1520, y: 800 }, disc, [laptop])).toEqual({
      x: 1432,
      y: 712,
      width: 88,
      height: 88,
    })
  })

  it('pushes a window that would cross the top or left edge back on screen', () => {
    expect(anchoredRect({ x: 200, y: 300 }, { width: 360, height: 520 }, [laptop])).toEqual({
      x: 0,
      y: 0,
      width: 360,
      height: 520,
    })
  })

  it('shrinks a window larger than the display to fit', () => {
    expect(anchoredRect({ x: 1520, y: 800 }, { width: 2000, height: 2000 }, [laptop])).toMatchObject({
      width: 1536,
      height: 816,
    })
  })
})
