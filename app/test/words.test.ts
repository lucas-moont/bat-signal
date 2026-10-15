import { describe, expect, it } from 'vitest'
import { trayLook } from '../src/main/trayMenu'
import { announce, emptyAnnouncer, toastFor } from '../src/shared/announcer'
import { diffNotices } from '../src/shared/notices'
import { DEFAULT_SETTINGS } from '../src/shared/settings'
import type { AttentionItem, SessionSnapshot, StoreSnapshot } from '../src/shared/types'
import { attentionCopy, caseHeader } from '../src/shared/view'
import { THEME_IDS, THEMES } from '../src/shared/themes'
import {
  ANCIENT_GRACE_WORDS,
  BECOME_A_BAT_WORDS,
  KNIGHTMARE_WORDS,
  STANDARD_TERMS,
  STANDARD_WORDS,
  WATCHFUL_PROTECTOR_WORDS,
  withLexicon,
} from '../src/shared/words'
import { standInTheme } from './fixtures/themes'
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
  standInTheme({ words: opsWords })

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
  it("leaves no themed term in the Theme's Voice lines when it is off", () => {
    const on = withLexicon(opsWords, true)
    const off = withLexicon(opsWords, false)
    expect(on.voice.empty.noCases.title(on.terms)).toBe('No ops on the board.')
    expect(off.voice.empty.noCases.title(off.terms)).toBe('No cases on the board.')
  })
})

describe("WATCHFUL PROTECTOR's Voice", () => {
  const { voice, terms } = WATCHFUL_PROTECTOR_WORDS

  // Harvey Dent's fragment, the Theme's one film line, only when nothing waits (nolan.md, section 5).
  it('ends the report on the dawn only when nothing waits', () => {
    expect(voice.report.end(0)).toBe('End of report. Darkest just before the dawn.')
    expect(voice.report.end(2)).toBe("End of report. You're needed.")
  })

  it('dates its Sitrep from Gotham, in the 24-hour clock', () => {
    expect(voice.report.name).toBe('Sitrep')
    expect(voice.report.dateline(new Date(2026, 9, 13, 2, 14))).toBe('GOTHAM · 02:14')
  })

  // A term inside a sentence is lowered: Ops reads "ops", and nothing it names needs a capital.
  it('names its ops in a sentence', () => {
    expect(voice.empty.noCases.title(terms)).toBe('No ops running. Get some rest.')
  })
})

describe("KNIGHTMARE's Voice", () => {
  const { voice } = KNIGHTMARE_WORDS

  // Alfred sends him to bed only when nothing is left waiting on him.
  it('ends the report with sleep only when nothing waits', () => {
    expect(voice.report.end(0)).toBe("That's the lot. Get some sleep.")
    expect(voice.report.end(3)).toBe("That's the lot. Some of it still needs you.")
  })

  it('dates its report as every report is, day and time', () => {
    expect(voice.report.name).toBe('Still standing')
    expect(voice.report.dateline(new Date(2026, 9, 13, 2, 14))).toBe('TUE 13 OCT · 02:14')
  })
})

describe("BECOME A BAT's Voice", () => {
  const { terms, voice } = BECOME_A_BAT_WORDS

  // Gordon's notebook, dated as Year One's scene breaks are: the month and the day, no time.
  it('dates its Notebook as the book dates a scene', () => {
    expect(voice.report.name).toBe('Notebook')
    expect(voice.report.dateline(new Date(2026, 9, 14, 2, 14))).toBe('October 14')
  })

  // His close says whether a name is still on anything, never sends anyone to bed (year-one.md, section 5).
  it('ends the report on whether your name is still on anything', () => {
    expect(voice.report.end(0)).toBe("That's all I've got. Nothing here has your name on it.")
    expect(voice.report.end(2)).toBe("That's all I've got. Your name's still on some of it.")
  })

  it('names its cases in a sentence', () => {
    expect(voice.empty.noCases.title(terms)).toBe('No cases open. Enjoy it while it lasts.')
  })

  // A case closing is a small win in a crooked city (year-one.md, section 5).
  it('marks a case closing as one honest thing', () => {
    expect(voice.noticeLine.closed).toBe('Case closed. One honest thing today.')
  })

  // The swarm on the perch is read aloud for what it is.
  it('names Bat-Clawd in his swarm for a screen reader', () => {
    expect(voice.mascot.watching).toBe('Bat-Clawd in a swarm of bats')
  })

  // Quiet means all clear; he just doesn't trust it.
  it('doubts an all-clear, and keeps the hint plain', () => {
    expect(voice.empty.quiet).toEqual({
      title: "Quiet so far. I don't trust it.",
      hint: 'Nothing needs you right now.',
    })
  })
})

describe("ANCIENT GRACE's words", () => {
  const { terms, voice } = ANCIENT_GRACE_WORDS

  // A TV station's control room (dark-knight-returns.md, section 6): cases are channels, what needs
  // you is your cue, and every stamp is a broadcast word a tired reader still gets at a glance.
  it('speak a broadcast Lexicon', () => {
    expect(terms.case).toEqual({ one: 'Channel', many: 'Channels' })
    expect(terms.needsYou.label).toBe('Your cue')
    expect([terms.needsYou.count(1), terms.needsYou.count(3)]).toEqual(['1 cue for you', '3 cues for you'])
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'OK to air?',
      error: 'Dead air',
      waiting: "You're on",
      reply: 'Latest',
      stalled: 'Frozen',
      'session-opened': 'On air',
      'session-closed': 'Off air',
    })
    expect(terms.live).toEqual({ busy: 'Live', idle: 'Standby', shell: 'Shell' })
  })

  // Live, not an edition: the time only, no place (WATCHFUL PROTECTOR's says Gotham).
  it('dates its Bulletin live, in the 24-hour clock', () => {
    expect(voice.report.name).toBe('Bulletin')
    expect(voice.report.dateline(new Date(2026, 9, 14, 2, 14))).toBe('LIVE · 02:14')
  })

  // "You're still on" picks up the YOU'RE ON stamp; the sign-off only when nothing waits.
  it('signs off only when nothing waits', () => {
    expect(voice.report.end(2)).toBe("Stay tuned. You're still on.")
    expect(voice.report.end(0)).toBe("That's the bulletin. Good night, Gotham.")
  })

  // The pundits finally agree, which is the joke; the hint stays plain.
  it('lets its panel agree on an all-clear', () => {
    expect(voice.empty.quiet).toEqual({
      title: 'Our panel agrees: a quiet night.',
      hint: 'Nothing needs you right now.',
    })
    expect(voice.empty.noCases.title(terms)).toBe('No channels on the air.')
  })

  it('interrupts the program only when the disc is lit', () => {
    expect(voice.signal.openTip(false)).toMatch(/^Nothing on tonight\. /)
    expect(voice.signal.openTip(true)).toMatch(/^We interrupt this program\. /)
  })

  it('names its static and its control room', () => {
    expect(voice.settings.kicker).toBe('Control room')
    expect(voice.settings.atmosphere.label).toBe('Static')
    expect(voice.settings.atmosphere.hint(terms)).toBe('TV static behind the channels')
  })
})

// Parallel writing converges: two Wave 2 closes copied KNIGHTMARE's word for word (jury-wave-2.md,
// section 3.13). A Theme's own lines are its own; only the standard ones are shared.
describe("each Theme's Voice", () => {
  /** The lines a Voice speaks: its sentences, and what its sentence-makers say for a few cases. */
  const lines = ({ terms, voice }: typeof STANDARD_WORDS) => [
    voice.tagline,
    voice.empty.quiet.title,
    voice.empty.unheard.title,
    voice.empty.noCases.title(terms),
    voice.report.name,
    voice.report.signature,
    voice.report.nil(terms),
    voice.report.caseNotes(terms),
    voice.report.end(0),
    voice.report.end(2),
    voice.signal.openTip(false),
    voice.signal.openTip(true),
    voice.settings.kicker,
  ]
  const standard = new Set(lines(STANDARD_WORDS))

  it('repeats no line of another Theme', () => {
    const said = new Map<string, string>()
    for (const theme of THEME_IDS)
      for (const line of lines(THEMES[theme].words)) {
        if (line === undefined || standard.has(line)) continue
        expect(said.get(line) ?? theme, `"${line}" in ${theme}`).toBe(theme)
        said.set(line, theme)
      }
  })
})
