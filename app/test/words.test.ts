import { describe, expect, it } from 'vitest'
import { trayLook } from '../src/main/trayMenu'
import { announce, emptyAnnouncer, toastFor } from '../src/shared/announcer'
import { diffNotices } from '../src/shared/notices'
import { DEFAULT_SETTINGS } from '../src/shared/settings'
import type { AttentionItem, SessionSnapshot, StoreSnapshot } from '../src/shared/types'
import { attentionCopy, caseHeader } from '../src/shared/view'
import { STANDARD_TERMS, STANDARD_WORDS, withLexicon } from '../src/shared/words'
import { wearingTheme } from './fixtures/themes'
import { opsWords, permission } from './fixtures/words'

const session = (id: string, over: Partial<SessionSnapshot> = {}): SessionSnapshot =>
  ({ sessionId: id, status: 'idle', tasks: [], messages: [], ...over }) as SessionSnapshot

const snapshot = (sessions: SessionSnapshot[], attention: AttentionItem[] = []): StoreSnapshot =>
  ({ sessions, attention }) as StoreSnapshot

describe('the standard needs-you count', () => {
  it('counts what needs you, in the singular for one', () => {
    expect(STANDARD_TERMS.needsYou.count(1)).toBe('1 needs you')
    expect(STANDARD_TERMS.needsYou.count(5)).toBe('5 need you')
  })
})

describe('the words', () => {
  it("are a Theme's own when it passes them", () => {
    expect(attentionCopy(permission, opsWords).stamp).toBe('Clearance')
    expect(caseHeader(session('s1'), opsWords).title).toBe('Untitled op')
    const [opened] = diffNotices(snapshot([]), snapshot([session('s2')]), opsWords)
    expect(opened?.stamp).toBe('Op opened')
  })
})

// Neither reads the worn Theme or the Lexicon switch: they stay standard while a Theme with a
// Lexicon is worn, the switch on as by default.
describe('the words in a Windows toast and the tray', () => {
  wearingTheme({ words: opsWords })

  // The announcer passes STANDARD_WORDS itself (CONTEXT.md, Lexicon).
  it('are always the standard ones in a toast', () => {
    const ctx = {
      prefs: {
        ...DEFAULT_SETTINGS.announce,
        toast: { needsYou: true, reply: true, taskDone: true, sessions: true },
      },
      panelFocused: false,
    }
    const { state } = announce(emptyAnnouncer(), snapshot([]), ctx)
    const { toast } = announce(state, snapshot([session('s2')]), ctx)
    expect(toastFor(toast)?.title).toBe('Case opened · Untitled case')
  })

  // The tray takes no words at all (CONTEXT.md, Lexicon).
  it('are always the standard ones in the tray', () => {
    expect(trayLook(snapshot([session('s1')], [permission])).tooltip).toBe('Bat-Signal · 1 needs you')
  })
})

describe('the Lexicon', () => {
  it("speaks the Theme's own terms when it is on", () => {
    expect(withLexicon(opsWords, true)).toBe(opsWords)
  })

  // The stamp words are terms, so they follow the switch; the Voice is the Theme's tone, so it stays.
  it("brings the standard terms back when it is off, stamps included, in the Theme's Voice", () => {
    const words = withLexicon(opsWords, false)
    expect(words.terms).toBe(STANDARD_TERMS)
    expect(attentionCopy(permission, words).stamp).toBe('Permission')
    expect(words.voice.wordmark).toBe('Watchful Protector')
  })

  // WatchStrip and NightReport memoize on the words: new ones each render would redo their work.
  it('gives the same words each time it is asked', () => {
    expect(withLexicon(opsWords, false)).toBe(withLexicon(opsWords, false))
    expect(withLexicon(STANDARD_WORDS, false)).toBe(STANDARD_WORDS)
  })

  // A Voice line that names a term takes it from the Terms (#73).
  it('leaves no themed term in a Voice line when it is off', () => {
    const { terms, voice } = withLexicon(opsWords, false)
    expect(voice.empty.noCases.title(terms)).toBe('No open cases.')
  })
})
