import { afterAll, beforeAll } from 'vitest'
import { THEMES, type Theme } from '../../src/shared/themes'

/**
 * Stands a Theme in for VENGEANCE for the tests of the enclosing describe (or file): VENGEANCE has
 * no Lexicon, Signature pose or aura of its own to test them on. Restored after, pass or fail.
 */
export function wearingTheme(patch: Partial<Theme>): void {
  const theme = THEMES['the-batman-2022']
  beforeAll(() => {
    THEMES['the-batman-2022'] = { ...theme, ...patch }
  })
  afterAll(() => {
    THEMES['the-batman-2022'] = theme
  })
}
