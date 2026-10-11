import { describe, expect, it } from 'vitest'
import { mapRects } from '../src/shared/outfits'

const legend = { '#': 'var(--clawd)', c: 'var(--cowl)' }

describe("an outfit map's rects", () => {
  it('cover a run once, however many half-rows it repeats on', () => {
    expect(mapRects({ top: 2, rows: ['.##.', '.##.'], legend })).toEqual([
      { x: 1, y: 2, w: 2, h: 1, fill: 'var(--clawd)' },
    ])
  })

  it('start again where a run changes its span or its color', () => {
    expect(mapRects({ top: 0, rows: ['cc', '#c', '##'], legend })).toEqual([
      { x: 0, y: 0, w: 2, h: 0.5, fill: 'var(--cowl)' },
      { x: 0, y: 0.5, w: 1, h: 0.5, fill: 'var(--clawd)' },
      { x: 1, y: 0.5, w: 1, h: 0.5, fill: 'var(--cowl)' },
      { x: 0, y: 1, w: 2, h: 0.5, fill: 'var(--clawd)' },
    ])
  })

  it('leave the dots empty', () => {
    expect(mapRects({ top: 0, rows: ['#..#'], legend })).toEqual([
      { x: 0, y: 0, w: 1, h: 0.5, fill: 'var(--clawd)' },
      { x: 3, y: 0, w: 1, h: 0.5, fill: 'var(--clawd)' },
    ])
  })

  // A letter with no color would silently drop a part of the suit.
  it('refuse a letter the legend does not name', () => {
    expect(() => mapRects({ top: 0, rows: ['#x'], legend })).toThrow(/"x"/)
  })
})
