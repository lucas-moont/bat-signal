import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

// The settings sheet reaches the main process through the bridge; a static render calls none of it.
vi.mock('../../src/renderer/src/bridge', () => ({
  batSignal: new Proxy({}, { get: () => () => () => undefined }),
}))
vi.mock('../../src/renderer/src/cues', () => ({ playCue: () => undefined }))

import { SettingsSheet } from '../../src/renderer/src/components/Sheets'
import { Wearing } from '../../src/renderer/src/theme'
import { useWords } from '../../src/renderer/src/words'
import { DEFAULT_SETTINGS } from '../../src/shared/settings'
import type { AppStatus } from '../../src/shared/status'
import { THEMES } from '../../src/shared/themes'
import { STANDARD_TERMS, STANDARD_VOICE } from '../../src/shared/words'

// A Theme with a Lexicon and a Voice of its own stands in for VENGEANCE, which has neither.
const theme = THEMES['the-batman-2022']
beforeAll(() => {
  THEMES['the-batman-2022'] = {
    ...theme,
    words: {
      terms: { ...STANDARD_TERMS, case: { one: 'Op', many: 'Ops' } },
      voice: { ...STANDARD_VOICE, wordmark: 'Watchful Protector' },
    },
  }
})
afterAll(() => {
  THEMES['the-batman-2022'] = theme
})

/** What a panel component says: a term, and a line of the Voice. */
function Speaker() {
  const { terms, voice } = useWords()
  return `${terms.case.many} / ${voice.wordmark}`
}

const wearing = (lexicon: boolean) =>
  renderToStaticMarkup(
    createElement(Wearing, { theme: 'the-batman-2022', lexicon, children: createElement(Speaker) }),
  )

describe('the panel and the Signal', () => {
  it("speak the Theme's terms while the Lexicon is on", () => {
    expect(wearing(true)).toBe('Ops / Watchful Protector')
  })

  it("speak the standard terms in the Theme's Voice while it is off", () => {
    expect(wearing(false)).toBe('Cases / Watchful Protector')
  })
})

describe('the Lexicon switch', () => {
  const status: AppStatus = { shortcut: { accelerator: 'Ctrl+Alt+B', state: 'active' }, startup: 'off' }
  const sheet = (lexicon: boolean) =>
    renderToStaticMarkup(
      createElement(SettingsSheet, {
        settings: { ...DEFAULT_SETTINGS, lexicon },
        status,
        onChange: () => undefined,
        onClose: () => undefined,
      }),
    )
  /** The Look section's markup: from its heading to the next section's. */
  const look = (html: string) => html.slice(html.indexOf('>Look<'), html.indexOf('>Comfort<'))
  const lexiconRow = (html: string) =>
    look(html)
      .split('<label')
      .find((row) => row.includes('Theme words')) ?? ''

  it('sits in Look', () => {
    expect(lexiconRow(sheet(true))).not.toBe('')
  })

  it('shows whether it is on', () => {
    expect(lexiconRow(sheet(true))).toContain('checked')
    expect(lexiconRow(sheet(false))).not.toContain('checked')
  })
})
