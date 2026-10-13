import { afterAll, beforeAll } from 'vitest'
import { VENGEANCE_SUIT, type Pose } from '../../src/shared/suits'
import { THEMES, type Theme } from '../../src/shared/themes'

/**
 * Stands a Theme in for VENGEANCE for the tests of the enclosing describe (or file): VENGEANCE has
 * no Lexicon of its own to test one on, and a stand-in's marked poses tell a Signature pose's steps
 * apart in the markup. Laid over the Theme in place when the tests start, so an outer stand-in's
 * patch holds, and restored after, pass or fail.
 */
export function standInTheme(patch: Partial<Theme>): void {
  let before: Theme
  beforeAll(() => {
    before = THEMES['the-batman-2022']
    THEMES['the-batman-2022'] = { ...before, ...patch }
  })
  afterAll(() => {
    THEMES['the-batman-2022'] = before
  })
}

/** A pose told apart in the markup by a path no real suit draws: `M0 0 L<mark> 0 Z`. */
export const markedPose = (mark: string): Pose => ({
  ...VENGEANCE_SUIT.poses.flying[0],
  behind: [{ kind: 'path', d: `M0 0 L${mark} 0 Z`, className: 'clawd__cape' }],
})
