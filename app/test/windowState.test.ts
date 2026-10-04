import { describe, expect, it } from 'vitest'
import { restoreBounds } from '../src/main/windowState'

// Primary display first, as Electron's screen API is queried by the caller.
const laptop = { workArea: { x: 0, y: 0, width: 1536, height: 816 } }
const external = { workArea: { x: 1536, y: 0, width: 1920, height: 1040 } }
const DEFAULTS = { width: 360, height: 520, minWidth: 300, minHeight: 360, margin: 16 }

describe('restoreBounds', () => {
  it('opens in the bottom-right corner of the primary display the first time', () => {
    expect(restoreBounds(undefined, [laptop], DEFAULTS)).toEqual({ x: 1160, y: 280, width: 360, height: 520 })
  })
})

describe('restoreBounds with saved bounds', () => {
  it('reopens where it was left', () => {
    const saved = { x: 100, y: 50, width: 400, height: 600 }
    expect(restoreBounds(saved, [laptop], DEFAULTS)).toEqual(saved)
  })

  it('reopens on a secondary display that is still connected', () => {
    const saved = { x: 2000, y: 100, width: 360, height: 520 }
    expect(restoreBounds(saved, [laptop, external], DEFAULTS)).toEqual(saved)
  })

  it('moves back to the primary corner, keeping its size, when its display is gone', () => {
    const saved = { x: 2000, y: 100, width: 400, height: 600 }
    expect(restoreBounds(saved, [laptop], DEFAULTS)).toEqual({ x: 1120, y: 200, width: 400, height: 600 })
  })

  it('pulls a window that hangs off the edge back on screen', () => {
    const saved = { x: 1400, y: 700, width: 360, height: 520 }
    expect(restoreBounds(saved, [laptop], DEFAULTS)).toEqual({ x: 1176, y: 296, width: 360, height: 520 })
  })

  it('never opens smaller than the minimum or larger than the display', () => {
    expect(restoreBounds({ x: 10, y: 10, width: 100, height: 100 }, [laptop], DEFAULTS)).toMatchObject({
      width: 300,
      height: 360,
    })
    expect(restoreBounds({ x: 0, y: 0, width: 5000, height: 5000 }, [laptop], DEFAULTS)).toMatchObject({
      width: 1536,
      height: 816,
    })
  })
})
