import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { THEMES, wordsOf } from '../src/shared/themes'
import type { AttentionItem } from '../src/shared/types'
import { attentionCopy } from '../src/shared/view'
import { STANDARD_TERMS, STANDARD_VOICE, STANDARD_WORDS, type Words } from '../src/shared/words'

/** A Theme's words in the style of the jury's §5: Nolan's ops and clearance, and a Voice of its own. */
const opsWords: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Op', many: 'Ops' },
    needsYou: { label: 'On you', count: (n) => `${n} on you` },
    stamp: { ...STANDARD_TERMS.stamp, permission: 'Clearance' },
  },
  voice: { ...STANDARD_VOICE, wordmark: 'Watchful Protector' },
}

const permission: AttentionItem = {
  sessionId: 's1',
  kind: 'permission',
  at: '2026-10-10T20:00:00.000Z',
  toolName: 'Bash',
  detail: 'npm test',
}

// VENGEANCE has no Lexicon of its own: a Theme with one stands in for it.
const theme = THEMES['the-batman-2022']
beforeAll(() => {
  THEMES['the-batman-2022'] = { ...theme, words: opsWords }
})
afterAll(() => {
  THEMES['the-batman-2022'] = theme
})

describe('the Lexicon', () => {
  it("renames the terms with the Theme's own when it is on", () => {
    const words = wordsOf('the-batman-2022', true)
    expect(words.terms.case.many).toBe('Ops')
    expect(words.terms.needsYou.label).toBe('On you')
  })

  it('brings the standard terms back when it is off', () => {
    const words = wordsOf('the-batman-2022', false)
    expect(words.terms).toBe(STANDARD_TERMS)
  })

  // The stamp words are terms (CONTEXT.md, Lexicon), so they follow the switch.
  it('holds the stamp words', () => {
    expect(attentionCopy(permission, wordsOf('the-batman-2022', true)).stamp).toBe('Clearance')
    expect(attentionCopy(permission, wordsOf('the-batman-2022', false)).stamp).toBe('Permission')
  })

  // The Voice is the Theme's tone, not its names: the switch leaves it alone.
  it("leaves the Theme's Voice as it is", () => {
    expect(wordsOf('the-batman-2022', false).voice.wordmark).toBe('Watchful Protector')
  })

  // A Voice line that names a term takes it from the Terms, so off leaves no themed name behind.
  it('leaves no themed term in a Voice line when it is off', () => {
    const { terms, voice } = wordsOf('the-batman-2022', false)
    expect(voice.empty.noCases.title(terms)).toBe('No open cases.')
  })

  // Words are compared by identity downstream (a notice is diffed again only for new words).
  it('gives the same words each time it is asked', () => {
    expect(wordsOf('the-batman-2022', false)).toBe(wordsOf('the-batman-2022', false))
    expect(wordsOf('the-batman-2022', true)).toBe(opsWords)
  })
})

describe('a Theme without a Lexicon', () => {
  it('speaks the same words with the switch on or off', () => {
    THEMES['the-batman-2022'] = theme
    expect(wordsOf('the-batman-2022', false)).toBe(STANDARD_WORDS)
    expect(wordsOf('the-batman-2022', true)).toBe(STANDARD_WORDS)
    THEMES['the-batman-2022'] = { ...theme, words: opsWords }
  })
})
