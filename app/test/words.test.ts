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
  BLUE_COLLAR_WORDS,
  DARK_DECO_WORDS,
  HOLIDAY_WORDS,
  KNIGHTMARE_WORDS,
  SAME_BAT_TIME_WORDS,
  SILENT_PREDATOR_WORDS,
  STANDARD_TERMS,
  STANDARD_VOICE,
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

describe("BLUE COLLAR's words", () => {
  const { terms, voice } = BLUE_COLLAR_WORDS

  // A work site (absolute-batman.md, section 6): Case and Needs you stay; the stamps are a permit
  // asked for, a fuse blown, a machine jammed. PERMIT? keeps its question mark: bare, it reads granted.
  it('speak a work-site Lexicon', () => {
    expect(terms.case).toEqual(STANDARD_TERMS.case)
    expect(terms.needsYou).toEqual(STANDARD_TERMS.needsYou)
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'Permit?',
      error: 'Blown',
      waiting: 'Asking',
      stalled: 'Jammed',
    })
  })

  it('dates its shift notes on the night shift, in the 24-hour clock', () => {
    expect(voice.report.name).toBe('Shift notes')
    expect(voice.report.dateline(new Date(2026, 9, 14, 2, 14))).toBe('NIGHT SHIFT · 02:14')
  })

  it('sends you home only when nothing waits on your bench', () => {
    expect(voice.report.end(2)).toBe("Tools stay out. There's work on your bench.")
    expect(voice.report.end(0)).toBe('Tools down. Go home.')
  })

  it('holds the grid when all is clear', () => {
    expect(voice.empty.quiet.title).toBe("The grid's holding.")
    expect(voice.empty.noCases.title(terms)).toBe('No cases running. Clock out.')
    expect(voice.signal.openTip(false)).toMatch(/^The grid's holding\. /)
    expect(voice.signal.openTip(true)).not.toMatch(/grid/)
  })

  it('names its bats and its toolbox', () => {
    expect(voice.settings.kicker).toBe('Toolbox')
    expect(voice.settings.atmosphere.label).toBe('Bats')
    expect(voice.settings.atmosphere.hint(terms)).toBe('Bats over Gotham behind the cases')
  })
})

describe("HOLIDAY's words", () => {
  const { terms, voice } = HOLIDAY_WORDS

  // The Roman's table (long-halloween.md, sections 6 and 7; jury-wave-3.md, section 9, decision 13):
  // Case and Needs you stay; a blessing asked for, a job botched, a word wanted, a message, a job on
  // ice. BLESSING? and A WORD? keep their question marks: bare, they read as granted and as a pause.
  it("speak the Roman household's Lexicon", () => {
    expect(terms.case).toEqual(STANDARD_TERMS.case)
    expect(terms.needsYou).toEqual(STANDARD_TERMS.needsYou)
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'Blessing?',
      error: 'Botched',
      waiting: 'A word?',
      reply: 'Message',
      stalled: 'On ice',
    })
  })

  // The book's named days, counted: never a date, never the time.
  it.each([
    [new Date(2026, 9, 22, 2, 14), 'HALLOWEEN IN 9 DAYS'],
    [new Date(2026, 9, 30, 23, 59), 'HALLOWEEN TOMORROW'],
    [new Date(2026, 9, 31, 0, 1), 'HALLOWEEN'],
    // Thanksgiving is the fourth Thursday of November: the 26th in 2026.
    [new Date(2026, 10, 1, 12, 0), 'THANKSGIVING IN 25 DAYS'],
    [new Date(2026, 11, 26, 12, 0), "NEW YEAR'S EVE IN 5 DAYS"],
    // Past New Year's Eve, the year turns: Valentine's Day.
    [new Date(2027, 0, 1, 12, 0), "VALENTINE'S DAY IN 44 DAYS"],
    // Mother's Day is the second Sunday of May: the 9th in 2027.
    [new Date(2027, 3, 2, 12, 0), "MOTHER'S DAY IN 37 DAYS"],
    // Labor Day is the first Monday of September: the 7th in 2026.
    [new Date(2026, 6, 5, 12, 0), 'LABOR DAY IN 64 DAYS'],
  ])('dates its calendar by the next holiday (%s)', (now, line) => {
    expect(voice.report.name).toBe('Calendar')
    expect(voice.report.dateline(now)).toBe(line)
  })

  it('counts by the calendar, not by the hour, across a change of clocks', () => {
    // US clocks fall back on 1 November 2026; Thanksgiving is still 25 days off on the 1st.
    expect(voice.report.dateline(new Date(2026, 10, 1, 23, 30))).toBe('THANKSGIVING IN 25 DAYS')
  })

  it('keeps the family waiting while anything waits on you', () => {
    expect(voice.report.end(2)).toBe('The family is still waiting on you.')
    expect(voice.report.end(0)).toBe("That's the calendar. See you next holiday.")
  })

  it('wishes you a quiet holiday when all is clear', () => {
    expect(voice.empty.quiet.title).toBe('A quiet night. Enjoy the holiday.')
    expect(voice.signal.openTip(false)).toMatch(/^No holiday tonight\. /)
    expect(voice.signal.openTip(true)).not.toMatch(/holiday/)
  })

  // The Atmosphere's own name, not the report's: the Calendar is the night report.
  it('names its Atmosphere after the night, apart from the Calendar', () => {
    expect(voice.settings.atmosphere.label).toBe('Halloween')
    expect(voice.settings.atmosphere.label).not.toBe(voice.report.name)
    expect(voice.settings.atmosphere.hint(terms)).toBe('Torn pages under a pumpkin moon behind the cases')
  })
})

describe("DARK DECO's words", () => {
  const { terms, voice } = DARK_DECO_WORDS

  // The title card (animated-series.md, sections 6 and 7; jury-wave-3.md, section 4): Case stays;
  // someone paging you, a request to go ahead, a job busted, a demand for an answer, a new lead, a
  // job held up. GO AHEAD? keeps its question mark: bare, it reads as permission already given.
  it("speak the title card's Lexicon", () => {
    expect(terms.case).toEqual(STANDARD_TERMS.case)
    expect(terms.needsYou.label).toBe('Paging you')
    expect(terms.needsYou.count(1)).toBe('1 paging you')
    expect(terms.needsYou.count(3)).toBe('3 paging you')
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'Go ahead?',
      error: 'Busted',
      waiting: 'Answer me',
      reply: 'New lead',
      stalled: 'Held up',
    })
  })

  // An episode title said as a phrase means all clear; the report ends as an episode does.
  it('says nothing to fear when all is clear, and fades out at the end', () => {
    expect(voice.empty.quiet.title).toBe('Nothing to fear.')
    expect(voice.empty.quiet.hint).toBe(STANDARD_VOICE.empty.quiet.hint)
    expect(voice.report.end(0)).toBe('Fade out.')
    expect(voice.report.end(2)).toBe('Fade out. Something still needs you.')
  })

  // Not West's "No cases tonight.", which opens its own empty line (jury-wave-3.md, section 3.9).
  it('empties its card in words of its own', () => {
    expect(voice.empty.noCases.title(terms)).toBe('No cases on the card tonight.')
    expect(voice.empty.noCases.title(terms)).not.toMatch(/^No cases tonight\./)
  })

  // The makers' names in front, as every shipped credit has them (jury-wave-3.md, section 3.9).
  it('credits the series by its makers', () => {
    expect(voice.theme.name).toBe('DARK DECO')
    expect(voice.theme.film).toBe("Timm & Radomski's Batman:\u00a0The\u00a0Animated\u00a0Series")
  })

  it('names its Atmosphere after the sky, with the blimps over the city', () => {
    expect(voice.settings.atmosphere.label).toBe('Red sky')
    expect(voice.settings.atmosphere.hint(terms)).toBe('Police blimps over the city behind the cases')
  })
})

describe("SILENT PREDATOR's words", () => {
  const { terms, voice } = SILENT_PREDATOR_WORDS

  // The games' objective log (arkham-games.md, sections 6 and 7; jury-wave-3.md, section 4): a
  // Mission, an Objective that needs you, ACCESS? asking to be let through, a FAILED mission, a
  // RESPOND waiting on you. STALLED keeps the standard word: dark and quiet mean all clear.
  it("speak the objective log's Lexicon", () => {
    expect(terms.case).toEqual({ one: 'Mission', many: 'Missions' })
    expect(terms.needsYou.label).toBe('Objectives')
    expect(terms.needsYou.count(1)).toBe('1 objective')
    expect(terms.needsYou.count(3)).toBe('3 objectives')
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'Access?',
      error: 'Failed',
      waiting: 'Respond',
      reply: 'Incoming',
      'session-opened': 'Mission start',
      'session-closed': 'Mission over',
    })
  })

  // The Voice never borrows the Lexicon's words: with the Lexicon off the tabs say Needs you and Cases.
  it('reads a quiet city as all clear, and closes the field log on what still waits', () => {
    expect(voice.empty.quiet.title).toBe('Nothing to report. The city is quiet.')
    expect(voice.report.end(0)).toBe('Area secure.')
    expect(voice.report.end(2)).toBe('Something still waits on you.')
    const lines = [
      voice.empty.quiet.title,
      voice.report.name,
      voice.report.signature,
      voice.report.end(0),
      voice.report.end(2),
    ]
    for (const line of lines) expect(line).not.toMatch(/objective|mission/i)
  })

  // The studio's name, as every credit names its makers, and "trilogy": a game, beside SERIOUS HOUSE's book.
  it('credits the games by their studio', () => {
    expect(voice.theme.name).toBe('SILENT PREDATOR')
    expect(voice.theme.film).toBe("Rocksteady's Arkham trilogy")
  })

  // The respect list SERIOUS HOUSE set: the games' asylum, its patients and villains are not in the Voice.
  it('keeps the respect list', () => {
    const lines = [
      JSON.stringify({ terms, voice }),
      voice.empty.noCases.title(terms),
      voice.report.nil(terms),
      voice.report.end(0),
      voice.report.end(1),
      voice.settings.atmosphere.hint(terms),
    ].join(' ')
    expect(lines).not.toMatch(/\b(mad|insane|lunatic|crazy|psycho|inmate|patient|cell|asylum)\b/i)
  })

  it('names its Atmosphere after the rain', () => {
    expect(voice.settings.atmosphere.label).toBe('Rain')
    expect(voice.settings.atmosphere.hint(terms)).toBe('Rain over Gotham behind the missions')
  })
})

describe("SAME BAT-TIME's words", () => {
  const { terms, voice } = SAME_BAT_TIME_WORDS

  // The serial's Lexicon (adam-west.md, section 7; jury-wave-3.md, section 9, decisions 13 and 20):
  // Case stays; the Hotline, not the Batphone (DC's live mark); FIASCO, not FOILED, which reads as
  // the villain stopped; WHAT NOW? kept on screen.
  it("speak the serial's Lexicon", () => {
    expect(terms.case).toEqual(STANDARD_TERMS.case)
    expect(terms.needsYou.label).toBe('Hotline')
    expect(terms.needsYou.count(1)).toBe('1 call on the hotline')
    expect(terms.needsYou.count(3)).toBe('3 calls on the hotline')
    expect(terms.stamp).toEqual({
      ...STANDARD_TERMS.stamp,
      permission: 'May I?',
      error: 'Fiasco',
      waiting: 'What now?',
      reply: 'New clue',
      stalled: 'Hanging',
    })
  })

  // The narrator, never the news (ANCIENT GRACE's): "Meanwhile", stately Wayne Manor, and the
  // serial's promise, cut before "Channel", only while something still waits.
  it('narrates the night as the serial does', () => {
    expect(voice.tagline).toBe('Meanwhile, in Gotham City…')
    expect(voice.report.dateline(new Date(2026, 9, 28, 21, 40))).toMatch(/^MEANWHILE · /)
    expect(voice.report.end(1)).toBe('Same Bat-time tomorrow!')
    expect(voice.report.end(0)).not.toMatch(/Bat-time/)
    for (const line of [voice.tagline, voice.report.name, voice.report.end(1), voice.empty.quiet.title])
      expect(line).not.toMatch(/\b(live|channel|anchor|news)\b/i)
  })

  // The fight cards' words, as balloons beside the stamp, only for what came in.
  it('pops POW! for what needs you now and BAM! for news', () => {
    expect(voice.balloon).toEqual({ permission: 'POW!', error: 'POW!', waiting: 'BAM!', reply: 'BAM!' })
  })

  it('names its Atmosphere after the opening titles, apart from the report', () => {
    expect(voice.settings.atmosphere.label).toBe('Opening titles')
    expect(voice.settings.atmosphere.label).not.toBe(voice.report.name)
  })
})
