import { describe, expect, it } from 'vitest'
import { batOutline, flock, flyingBat, type Wings } from '../src/shared/bats'

/** The points of a path drawn in straight lines, as [x, y] pairs. */
const pointsOf = (d: string) =>
  [...d.matchAll(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g)].map((m) => [Number(m[1]), Number(m[2])] as const)

const span = (values: number[]) => [Math.min(...values), Math.max(...values)] as const

// One bat drawing, shared: BECOME A BAT's swarm flies it, and so does BLUE COLLAR's colony (jury-wave-2.md, section 6).
describe.each<Wings>(['up', 'down'])('a flying bat, wings %s', (wings) => {
  it('spans the width it is given, centered where it is put', () => {
    const [left, right] = span(pointsOf(flyingBat(wings, 3, -1, 2.4)).map(([x]) => x))
    expect(left).toBeCloseTo(3 - 1.2)
    expect(right).toBeCloseTo(3 + 1.2)
  })

  it('is no taller than half its width', () => {
    const [top, bottom] = span(pointsOf(flyingBat(wings, 0, 0, 4)).map(([, y]) => y))
    expect(top).toBeGreaterThanOrEqual(-1)
    expect(bottom).toBeLessThanOrEqual(1)
  })

  // Its points are rounded to two decimals, so a mirrored point may land a hundredth off.
  it('is the same bat either side of its body', () => {
    const points = pointsOf(flyingBat(wings, 5, 2, 3))
    for (const [x, y] of points)
      expect(points.some(([u, v]) => Math.abs(u - 5 + (x - 5)) <= 0.011 && v === y)).toBe(true)
  })
})

describe('a flying bat', () => {
  // Two frames of one wingbeat: the tips above the body, then below it.
  it('beats its wings: their tips above its body, then below', () => {
    const tipY = (wings: Wings) => {
      const points = pointsOf(flyingBat(wings, 0, 0, 4))
      const [left] = span(points.map(([x]) => x))
      return points.find(([x]) => x === left)![1]
    }
    expect(tipY('up')).toBeLessThan(0)
    expect(tipY('down')).toBeGreaterThan(0)
  })
})

// A canvas draws the bat from its points: the same bat as the path, unrounded.
describe.each<Wings>(['up', 'down'])('a bat outline, wings %s', (wings) => {
  it("is the flying bat's path, point for point", () => {
    const outline = batOutline(wings, 7.3, -2.1, 9)
    const path = pointsOf(flyingBat(wings, 7.3, -2.1, 9))
    expect(outline).toHaveLength(path.length)
    outline.forEach(([x, y], i) => {
      expect(x).toBeCloseTo(path[i]![0], 2)
      expect(y).toBeCloseTo(path[i]![1], 2)
    })
  })
})

// A swarm or a colony is many bats in one path, so it paints as one mass.
describe('a flock', () => {
  it('is each of its bats, one path after another', () => {
    expect(
      flock([
        [0, 0, 2, 'up'],
        [4, 1, 3, 'down'],
      ]),
    ).toBe(`${flyingBat('up', 0, 0, 2)} ${flyingBat('down', 4, 1, 3)}`)
  })
})
