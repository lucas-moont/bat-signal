import { describe, expect, it } from 'vitest'
import { scriptAt, stillStep, VENGEANCE_SUIT, type Script } from '../src/shared/suits'

const pose = VENGEANCE_SUIT.poses.flying[0]
const steps: Script = [
  { pose, look: 0 },
  { pose, look: 0.1 },
  { pose, look: 0.2 },
]

describe('a script on the clock', () => {
  it('plays its steps in order, then holds the last', () => {
    expect([0, 1, 2, 5].map((i) => scriptAt(steps, i))).toEqual([steps[0], steps[1], steps[2], steps[2]])
  })

  it('gives its final step for Infinity, as under reduced motion', () => {
    expect(scriptAt(steps, Infinity)).toBe(steps[2])
  })
})

describe("a Theme's still portrait", () => {
  it('is the final step of its Signature pose', () => {
    expect(stillStep({ ...VENGEANCE_SUIT, signature: steps })).toBe(steps[2])
  })

  it('is its flying pose, looking ahead, without one', () => {
    const plain = { ...VENGEANCE_SUIT, signature: undefined }
    expect(stillStep(plain)).toEqual({ pose: VENGEANCE_SUIT.poses.flying[0], look: 0 })
  })
})
