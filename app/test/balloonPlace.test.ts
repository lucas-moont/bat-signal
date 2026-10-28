import { describe, expect, it } from 'vitest'
import { rendererSources } from './rendererSources'

// Never in the night report's margin, the watch strip, a toast or the tray: only the notice card
// draws one (toasts and the tray are outside the renderer and never follow a Theme).
describe('where a balloon pops', () => {
  it('is the notice card alone', () => {
    const drawers = rendererSources('.tsx')
      .filter(({ text }) => /<Balloon\b/.test(text))
      .map(({ path }) => path)
    expect(drawers).toEqual(['components/Signal.tsx'])
  })
})
