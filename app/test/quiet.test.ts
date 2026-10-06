import { describe, expect, it } from 'vitest'
import { wantsQuiet } from '../src/main/quiet'

// SHQueryUserNotificationState's answers, as Windows numbers them.
describe('wantsQuiet', () => {
  it.each([
    [2, 'an app is full screen'],
    [3, 'a game runs full screen'],
    [4, 'a presentation is on'],
    [6, 'Windows is in its quiet time'],
    [7, 'a Store app is full screen'],
  ])('keeps quiet for %i: %s', (state) => {
    expect(wantsQuiet(`${state}\r\n`)).toBe(true)
  })

  it.each([
    [1, 'the screen is locked or away'],
    [5, 'Windows takes notifications'],
  ])('plays for %i: %s', (state) => {
    expect(wantsQuiet(`${state}\r\n`)).toBe(false)
  })

  it('plays when Windows gave no answer: a missed sound is worse than one too many', () => {
    expect(wantsQuiet('')).toBe(false)
    expect(wantsQuiet('PS-ERROR: blocked')).toBe(false)
  })
})
