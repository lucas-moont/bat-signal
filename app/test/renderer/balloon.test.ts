import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CalmContext } from '../../src/renderer/src/calm'
import { Balloon } from '../../src/renderer/src/components/Balloon'
import type { NoticeKind } from '../../src/shared/notices'
import { STANDARD_WORDS } from '../../src/shared/words'
import { standInTheme } from '../fixtures/themes'

const balloon = (kind: NoticeKind, calm = false) =>
  renderToStaticMarkup(createElement(CalmContext, { value: calm }, createElement(Balloon, { kind })))

// SAME BAT-TIME's POW! (adam-west.md, section 7): a balloon pops beside a fresh alert's stamp on
// the notice card. It is decoration, never the alert's name: the stamp beside it says what it is.
describe('a Theme without balloons', () => {
  it('pops none, whatever the alert', () => {
    for (const kind of ['permission', 'error', 'waiting', 'reply'] as const) expect(balloon(kind)).toBe('')
  })
})

describe('a Theme with balloons', () => {
  standInTheme({
    words: {
      ...STANDARD_WORDS,
      voice: { ...STANDARD_WORDS.voice, balloon: { permission: 'POW!', reply: 'BAM!' } },
    },
  })

  it('pops its word for the alert, waiting unseen while the card comes in', () => {
    expect(balloon('permission')).toContain('POW!')
    expect(balloon('permission')).toContain('balloon--wait')
    expect(balloon('reply')).toContain('BAM!')
  })

  it('pops none for news it has no word for', () => {
    expect(balloon('error')).toBe('')
    expect(balloon('task-done')).toBe('')
  })

  it('pops none under reduced motion', () => {
    expect(balloon('permission', true)).toBe('')
  })

  it('hides from a screen reader: the stamp already says what came', () => {
    expect(balloon('permission')).toContain('aria-hidden="true"')
  })
})
