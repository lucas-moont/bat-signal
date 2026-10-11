import { afterAll, beforeAll } from 'vitest'
import { THEMES, type Theme } from '../../src/shared/themes'

/**
 * Stands a Theme in for VENGEANCE for the tests of the enclosing describe (or file): VENGEANCE has
 * no Lexicon, Signature pose or aura of its own to test them on. Laid over the Theme in place when
 * the tests start, so an outer stand-in's patch holds, and restored after, pass or fail.
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
