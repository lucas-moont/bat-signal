import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { BatSignalIntro } from '../../src/renderer/src/components/BatSignalIntro'
import { STANDARD_WORDS } from '../../src/shared/words'
import { standInTheme } from '../fixtures/themes'

const intro = () => renderToStaticMarkup(createElement(BatSignalIntro))

describe('the intro', () => {
  it('shows only the wordmark under the Signal in VENGEANCE', () => {
    expect(intro()).not.toContain('intro__tagline')
  })

  // PALE MOONLIGHT's Voice adds a line under its wordmark: "The city after midnight."
  describe("with a tagline in the Theme's Voice", () => {
    standInTheme({
      words: { ...STANDARD_WORDS, voice: { ...STANDARD_WORDS.voice, tagline: 'A line of its own.' } },
    })

    it('shows it under the wordmark', () => {
      expect(intro()).toMatch(
        /class="intro__title">BAT-SIGNAL<\/div><div class="intro__tagline">A line of its own\.<\/div>/,
      )
    })
  })
})
