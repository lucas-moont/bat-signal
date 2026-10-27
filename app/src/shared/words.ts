// Every word Bat-Signal shows, in two parts (CONTEXT.md): the Terms, which a Theme's Lexicon may
// rename (Case, Needs you, the words inside a stamp), and the Voice, the rest of the text, whose
// tone a Theme may change but which never renames a term. A Voice line that names a term takes it
// from the Terms, so turning the Lexicon off can't leave a themed word behind.
//
// Every presenter takes the words it speaks, with no default, so no caller can fall back on the
// standard words by forgetting them. Windows notifications (the announcer) and the tray pass
// STANDARD_WORDS themselves; the panel and the Signal pass the Theme's (the renderer's useWords).
import type { NewsGroup } from './settings'
import type { ShortcutProblem } from './accelerator'
import type { ShortcutStatus } from './status'
import type { AttentionKind, LiveStatus, RunStatus, TaskStatus } from './types'
import type { MascotMood } from './view'

/** A noun in the singular and the plural: Case, Cases (or a Theme's Op, Ops). */
export interface Plural {
  one: string
  many: string
}

/** What a stamp can say: a needs-you alert, or news of a case opening, closing or a task done. */
export type StampKind = AttentionKind | 'task-done' | 'session-opened' | 'session-closed'

/** The named ideas a Lexicon may rename. */
export interface Terms {
  case: Plural
  needsYou: {
    label: string
    /** "1 needs you", "5 need you": the count the disc, the header, the strip and the tray show. */
    count: (n: number) => string
  }
  stamp: Record<StampKind, string>
  /** A case's state, as its card and the watch strip stamp it. */
  live: Record<LiveStatus, string>
  task: Record<TaskStatus, string>
  run: Record<RunStatus, string>
}

/** The text that is not a term: headings, sentences, empty states, labels. */
export interface Voice {
  /** The product's name on the masthead and in the intro. */
  wordmark: string
  /** A line over the wordmark in the intro, if the Theme has one. */
  tagline?: string
  /** The Theme's own name, alluding to its film or comic (jury §10), and that film, as the picker credits it. */
  theme: { name: string; film: string }
  /** The title bar's and tabs' buttons. */
  chrome: {
    toWatch: string
    toDisc: string
    toDiscTip: string
    hide: string
    settings: string
  }
  /** The case files' empty states. */
  empty: {
    quiet: { title: string; hint: string }
    /** Nothing reported, but the plugin misses some sessions, so that proves nothing. */
    unheard: { title: string; hint: string }
    noCases: { title: (t: Terms) => string; hint: string }
  }
  /** The case detail: its back button and its sections. */
  detail: {
    back: string
    tasks: string
    subagents: string
    background: string
    lastWords: string
    running: (n: number) => string
    /** A task row read aloud: its words, then its state. */
    taskRow: (task: string, state: string) => string
  }
  /** The night report layout. */
  report: {
    name: string
    /** The dateline's date and time, typed. */
    dateline: (now: Date) => string
    signature: string
    nil: (t: Terms) => string
    /** Nothing reported, but the plugin misses some sessions. */
    nilUnheard: string
    unknown: (t: Terms) => string
    caseNotes: (t: Terms) => string
    noCases: (t: Terms) => string
    /** "Now profiling the ignition sequence." */
    now: (task: string) => string
    filed: (done: number, total: number) => string
    /** "Case #b47c0d, batmobile." */
    file: (t: Terms, number: string, folder: string) => string
    lastWord: string
    nothingOnFile: string
    /** The report's last line, which a Theme may vary with how much still awaits the user. */
    end: (waiting: number) => string
  }
  /** The drawer for a task, a subagent or a background command. */
  drawer: {
    close: string
    brief: string
    rightNow: string
    timeline: string
    type: string
    latestWord: string
    outcome: string
    orders: string
    timing: string
    command: string
    started: (ago: string) => string
    finished: (ago: string) => string
    ended: (ago: string) => string
    taskKicker: (id: string, state: string) => string
    subagentKicker: (state: string) => string
    backgroundKicker: (state: string) => string
  }
  settings: {
    kicker: string
    title: string
    look: string
    comfort: string
    notifications: string
    sound: string
    animations: Setting
    atmosphere: TermSetting
    /** The Lexicon switch (CONTEXT.md, Lexicon). */
    lexicon: TermSetting
    /** The Theme picker: its label and hint, and each Theme's credit line under its name. */
    theme: Setting & { credit: (film: string) => string }
    layout: Setting
    onTop: Setting
    opacity: string
    startup: Setting & { blocked: string }
    allToasts: Setting & { some: (on: number, of: number) => string }
    eachKind: string
    /**
     * A Windows notification switch per kind of news (none while the panel is in front). Its lines
     * name the toasts' own words, the standard ones, whatever the Lexicon: the switch must match
     * the notification it turns on.
     */
    toast: Record<NewsGroup, Setting>
    soundOn: Setting
    volume: string
    test: string
    testTip: string
  }
  shortcut: {
    label: string
    hint: Record<ShortcutStatus['state'], string>
    recordingHint: string
    pressKeys: string
    off: string
    record: string
    change: string
    /** Why the keys pressed can't be a shortcut. */
    problem: (problem: ShortcutProblem) => string
  }
  /** The disc and the notice card riding its beam. */
  signal: {
    openCase: (t: Terms) => string
    open: (t: Terms, needsYou: number) => string
    /** The disc's tooltip, while something needs the user or not. */
    openTip: (lit: boolean) => string
  }
  watch: {
    openPanel: string
    nil: (t: Terms) => string
  }
  terminal: {
    /** The word beside the icon, where there is room for one. */
    label: string
    go: string
    /** No window hosts the session, so the command that resumes it went to the clipboard. */
    copied: string
  }
  /** Needs you's note while the plugin misses some sessions. */
  pluginHint: {
    title: (sessions: number) => string
    text: string
  }
  /** Bat-Clawd, read aloud. */
  mascot: Record<MascotMood, string> & { watching: string }
  /** Who spoke, in a case's last words. */
  speaker: { user: string; assistant: string }
  /** "Case #b47c0d". */
  caseNumber: (t: Terms, number: string) => string
  /** A case's progress bar, read aloud: "3/5 tasks done". */
  tasksDone: (progress: string) => string
  time: {
    justNow: string
    ago: (age: string) => string
  }
  /** The line under a needs-you card's title. */
  alertLine: {
    /** Who asks, when the hook names no tool. */
    someTool: string
    errorFallback: string
    waiting: string
    reply: string
    stalled: (task: string | undefined) => string
  }
  /** How an alert reads in the night report, after the case's title. */
  reportSentence: {
    permission: (tool: string | undefined, detail: string | undefined) => string
    error: (reason: string | undefined) => string
    waiting: string
    reply: string
    stalled: (task: string | undefined) => string
  }
  untitled: (t: Terms) => string
  unknown: (t: Terms) => string
  /** The line of a notice about a case opening or closing. */
  noticeLine: {
    opened: string
    closed: string
  }
}

/** A setting's label and the line under it. */
export interface Setting {
  label: string
  hint: string
}

/** A setting whose line names a term. */
export interface TermSetting {
  label: string
  hint: (t: Terms) => string
}

export interface Words {
  terms: Terms
  voice: Voice
}

/** A term inside a sentence: "Cases" reads "cases", a Theme's "Ops" reads "ops". */
const lower = (term: string): string => term.toLowerCase()

/** A label read inside a sentence ("Now profiling …"): first letter lowered, its end stop dropped. */
const asClause = (label: string) => (label.charAt(0).toLowerCase() + label.slice(1)).replace(/[.!?…]+$/, '')

// Built once, on first use: a formatter is costly to make, the dateline renders with every snapshot,
// and the main process, which loads this file for the tray, never types one.
let datelineFormats: { day: Intl.DateTimeFormat; time: Intl.DateTimeFormat } | undefined
const formats = () =>
  (datelineFormats ??= {
    day: new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short' }),
    time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }),
  })
/** "October 14", as Year One's scene breaks date a page: built only for the Theme that dates so. */
let monthDayFormat: Intl.DateTimeFormat | undefined
const monthDay = (now: Date) =>
  (monthDayFormat ??= new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' })).format(now)
/** A dateline with no day: a word, then the time in the 24-hour clock ("GOTHAM · 02:14"). */
const datelineOf = (word: string) => (now: Date) => `${word} · ${formats().time.format(now)}`
const dateline = (now: Date) => {
  const { day, time } = formats()
  return `${day.format(now).replace(',', '').toUpperCase()} · ${time.format(now)}`
}

/** The product's name, the same under every Theme. */
export const PRODUCT = 'Bat-Signal'

/**
 * Whether Bat-Signal runs on Windows, whose parts the settings name (Windows notifications, Task
 * Manager); elsewhere they name the desktop's. Read from the navigator, which the pages and Node have.
 */
const ON_WINDOWS = typeof navigator === 'undefined' || /^win/i.test(navigator.platform)

/** The command that installs the plugin: typed into a terminal, so never re-voiced. */
export const PLUGIN_INSTALL = 'claude plugin install bat-signal@bat-signal'

/** The tray's words. Not part of any Voice: the tray never follows a Theme (CONTEXT.md, Lexicon). */
export const TRAY_WORDS = {
  name: PRODUCT,
  allQuiet: 'all quiet',
  show: `Show ${PRODUCT}`,
  hide: `Hide ${PRODUCT}`,
  disc: 'Disc',
  panel: 'Panel',
  watch: 'Watch strip',
  settings: 'Settings…',
  quit: `Quit ${PRODUCT}`,
}

export const STANDARD_TERMS: Terms = {
  case: { one: 'Case', many: 'Cases' },
  needsYou: { label: 'Needs you', count: (n) => `${n} need${n === 1 ? 's' : ''} you` },
  stamp: {
    permission: 'Permission',
    error: 'Error',
    waiting: 'Waiting',
    reply: 'New reply',
    stalled: 'Stalled',
    'task-done': 'Task done',
    'session-opened': 'Case opened',
    'session-closed': 'Case closed',
  },
  live: { busy: 'Working', idle: 'Idle', shell: 'Shell' },
  task: { pending: 'Pending', in_progress: 'In progress', completed: 'Completed', deleted: 'Deleted' },
  run: { running: 'Running', completed: 'Done', failed: 'Failed', stopped: 'Stopped' },
}

// A Theme's words with its Lexicon off, made once per Theme's words.
const withoutLexicon = new WeakMap<Words, Words>()

/**
 * Words with a Theme's Lexicon on, or off: its Voice over the standard terms (CONTEXT.md, Lexicon).
 * The Voice is its tone, not its names, so it stays; its lines that name a term take it from the
 * Terms, so none of its names is left behind. Windows toasts and the tray never ask: they speak
 * STANDARD_WORDS whatever the Theme.
 *
 * The same object each time for the same words: the panel memoizes on them (WatchStrip, NightReport).
 */
export function withLexicon(words: Words, lexicon: boolean): Words {
  if (lexicon || words.terms === STANDARD_TERMS) return words
  let plain = withoutLexicon.get(words)
  if (!plain) withoutLexicon.set(words, (plain = { terms: STANDARD_TERMS, voice: words.voice }))
  return plain
}

export const STANDARD_VOICE: Voice = {
  wordmark: PRODUCT.toUpperCase(),
  // VENGEANCE's own: a Theme that spreads this Voice names itself over it.
  theme: { name: 'VENGEANCE', film: 'The Batman (2022)' },
  chrome: {
    toWatch: 'Shrink to the watch strip',
    toDisc: 'Fold into the signal disc',
    toDiscTip: 'Fold into the signal disc (Esc)',
    hide: 'Hide to tray',
    settings: 'Settings',
  },
  empty: {
    // "needs you" is a verb here, not the tab's name: a Lexicon's "Your desk" must not land in it.
    quiet: { title: 'All quiet in Gotham.', hint: 'Nothing needs you right now.' },
    unheard: { title: 'Nothing reported.', hint: 'The plugin does not reach every session yet.' },
    noCases: {
      title: (t) => `No open ${lower(t.case.many)}.`,
      hint: 'Start Claude Code in a terminal and it shows up here.',
    },
  },
  detail: {
    back: 'Back to the list',
    tasks: 'Tasks',
    subagents: 'Subagents',
    background: 'In the background',
    lastWords: 'Last words',
    running: (n) => `${n} running`,
    taskRow: (task, state) => `${task}, ${lower(state)}`,
  },
  report: {
    name: 'Night report',
    dateline,
    signature: 'Awaiting your signature',
    nil: (t) => `Nothing awaits your signature. Every ${lower(t.case.one)} can carry on without you.`,
    nilUnheard: 'Nothing reported from the sessions the plugin reaches.',
    unknown: (t) => `An unknown ${lower(t.case.one)}`,
    caseNotes: (t) => `${t.case.one} notes`,
    noCases: (t) =>
      `No ${lower(t.case.many)} open. Start Claude Code in a terminal and its session is filed here.`,
    now: (task) => `Now ${asClause(task)}.`,
    filed: (done, total) => `${done} of ${total} filed.`,
    file: (t, number, folder) => `${t.case.one} ${number}${folder ? `, ${folder}` : ''}.`,
    lastWord: 'Last word:',
    nothingOnFile: 'No tasks, subagents or background work on file.',
    end: () => 'End of report.',
  },
  drawer: {
    close: 'Close',
    brief: 'Brief',
    rightNow: 'Right now',
    timeline: 'Timeline',
    type: 'Type',
    latestWord: 'Latest word',
    outcome: 'Outcome',
    orders: 'Orders',
    timing: 'Timing',
    command: 'Command',
    started: (ago) => `Started ${ago}`,
    finished: (ago) => `finished ${ago}`,
    ended: (ago) => `ended ${ago}`,
    taskKicker: (id, state) => `Task ${id} · ${state}`,
    subagentKicker: (state) => `Subagent · ${state}`,
    backgroundKicker: (state) => `Background · ${state}`,
  },
  settings: {
    kicker: 'Bat-Computer',
    title: 'Settings',
    look: 'Look',
    comfort: 'Comfort',
    notifications: ON_WINDOWS ? 'Windows notifications' : 'Desktop notifications',
    sound: 'Sound',
    animations: { label: 'Animations', hint: 'Intro, flying mascot, typewriter and transitions' },
    atmosphere: { label: 'Rain', hint: (t) => `Gotham weather behind the ${lower(t.case.many)}` },
    theme: { label: 'Theme', hint: 'Which Batman Bat-Signal dresses as', credit: (film) => `after ${film}` },
    lexicon: {
      label: 'Theme words',
      hint: (t) => `The Theme's own names for ${lower(t.case.many)}, ${t.needsYou.label} and the stamps`,
    },
    // "Case files" and "Night report" are the two Layouts' names (CONTEXT.md, Layout), not the Case
    // term: a Lexicon that renames Case doesn't rename the Layout.
    layout: { label: 'Night report', hint: 'Read the panel as one typed report instead of case files' },
    onTop: { label: 'Always on top', hint: 'Keep the window above everything else' },
    opacity: 'Opacity',
    startup: {
      label: ON_WINDOWS ? 'Start with Windows' : 'Start at sign-in',
      hint: 'Wakes as the disc when you sign in',
      blocked: ON_WINDOWS
        ? 'Turned off in Task Manager: switch it on here to allow it again'
        : "Turned off in your desktop's startup settings: switch it on here to allow it again",
    },
    allToasts: {
      label: 'All notifications',
      hint: 'Every kind of news below',
      some: (on, of) => `${on} of ${of} on`,
    },
    eachKind: 'Each kind of news',
    toast: {
      // "needs you" is a verb here, as in the quiet hint, not the tab's name.
      needsYou: { label: 'Claude needs you', hint: 'A permission, an error or a question' },
      reply: { label: 'Reply ready', hint: 'Claude finished replying' },
      taskDone: {
        label: STANDARD_TERMS.stamp['task-done'],
        hint: `A task checked off on a ${lower(STANDARD_TERMS.case.one)}`,
      },
      sessions: { label: `${STANDARD_TERMS.case.one} opened or closed`, hint: 'A session starts or ends' },
    },
    soundOn: { label: 'Sound', hint: 'A spotlight coming on when Claude needs you or replies' },
    volume: 'Volume',
    test: 'Test',
    testTip: 'Play the spotlight at this volume',
  },
  shortcut: {
    label: 'Global shortcut',
    hint: {
      active: `Opens and folds ${PRODUCT} from any app`,
      off: 'Off: click to set one',
      taken: `Another app (or ${ON_WINDOWS ? 'Windows' : 'the desktop'}) already uses it: click to pick another`,
    },
    recordingHint: 'Esc cancels · Backspace turns it off',
    pressKeys: 'Press keys',
    off: 'Off',
    record: 'Press the new shortcut',
    change: 'Change the global shortcut',
    problem: (p) =>
      p.why === 'no-trigger'
        ? 'Add Ctrl or Alt, so typing never triggers it'
        : p.why === 'key'
          ? 'Use a letter, a number, an F key, an arrow or Space'
          : `On this keyboard that combination types "${p.char}"`,
  },
  signal: {
    openCase: (t) => `Open this ${lower(t.case.one)}`,
    open: (t, needsYou) => (needsYou ? `Open ${PRODUCT}: ${t.needsYou.count(needsYou)}` : `Open ${PRODUCT}`),
    openTip: () => `Open ${PRODUCT} · drag to move`,
  },
  watch: {
    openPanel: 'Open the full panel',
    nil: (t) => `No open ${lower(t.case.many)}. Start Claude Code in a terminal to follow it here.`,
  },
  terminal: {
    label: 'Terminal',
    go: 'Go to the terminal',
    copied: 'No window found. Resume command copied.',
  },
  pluginHint: {
    title: (sessions) =>
      `No word from the ${PRODUCT} plugin for ${sessions === 1 ? 'one session' : `${sessions} sessions`}.`,
    text: 'Their permission prompts and waits won’t show. Install the plugin once, then restart those sessions:',
  },
  mascot: {
    sleeping: 'Bat-Clawd is asleep',
    flying: 'Bat-Clawd is on patrol',
    alarmed: 'Bat-Clawd needs you',
    watching: 'Bat-Clawd keeps watch',
  },
  speaker: { user: 'You', assistant: 'Claude' },
  caseNumber: (t, number) => `${t.case.one} ${number}`,
  tasksDone: (progress) => `${progress} tasks done`,
  time: { justNow: 'just now', ago: (age) => `${age} ago` },
  alertLine: {
    someTool: 'A tool',
    errorFallback: 'The turn failed',
    waiting: 'Claude is waiting for you',
    reply: 'Claude finished replying',
    stalled: (task) => (task ? `No news on “${task}”` : 'A task has gone quiet'),
  },
  reportSentence: {
    permission: (tool, detail) =>
      detail ? `asks to run ${tool ?? 'a tool'}: ${detail}` : `asks to use ${tool ?? 'a tool'}`,
    error: (reason) => (reason ? `stopped: ${reason}` : 'stopped with an error'),
    waiting: 'is waiting for your answer',
    reply: 'finished replying',
    stalled: (task) => (task ? `has gone quiet on “${task}”` : 'has a task gone quiet'),
  },
  untitled: (t) => `Untitled ${lower(t.case.one)}`,
  unknown: (t) => `Unknown ${lower(t.case.one)}`,
  noticeLine: { opened: 'New session', closed: 'Session ended' },
}

/** A Windows toast's own words, beyond the cards' ones it reuses. Standard always, like the tray. */
export const TOAST_WORDS = {
  /** The other news in the same burst. */
  more: (n: number) => `+${n} more`,
}

/** The words of every surface that never follows a Theme, and of the default Theme. */
export const STANDARD_WORDS: Words = { terms: STANDARD_TERMS, voice: STANDARD_VOICE }

/**
 * PALE MOONLIGHT's words, after Tim Burton's Batman (1989): the night edition of a Gotham paper
 * (burton-1989.md, sections 5 and 6). Its Lexicon files Stories on Your desk under stamps a tired
 * reader still reads at a glance; its Voice is a night editor's, theatrical and a little wry.
 */
export const PALE_MOONLIGHT_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Story', many: 'Stories' },
    needsYou: { label: 'Your desk', count: (n) => `${n} on your desk` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Approval',
      error: 'Trouble',
      waiting: 'Question',
      reply: 'Just in',
      stalled: 'No word',
      'session-opened': 'Story opened',
      'session-closed': 'Story closed',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    theme: { name: 'PALE MOONLIGHT', film: "Tim Burton's Batman (1989)" },
    tagline: 'The city after midnight.',
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'Gotham sleeps. For now.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} on the wire tonight.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Late edition',
      signature: 'Above the fold',
      nil: (t) => `Nothing for the front page tonight. Every ${lower(t.case.one)} runs without you.`,
      caseNotes: () => 'On the beat',
      // The newsroom's end-of-copy mark.
      end: () => '— 30 —',
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) =>
        lit
          ? STANDARD_VOICE.signal.openTip(lit)
          : `All dark over Gotham. ${STANDARD_VOICE.signal.openTip(lit)}`,
    },
    settings: {
      ...STANDARD_VOICE.settings,
      atmosphere: { label: 'Snow', hint: (t) => `Gotham's snow behind the ${lower(t.case.many)}` },
    },
  },
}

/**
 * WATCHFUL PROTECTOR's words, after Christopher Nolan's Dark Knight trilogy (nolan.md, sections 5
 * and 6): an Applied Sciences operations board, read aloud as a dry briefing.
 */
export const WATCHFUL_PROTECTOR_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Op', many: 'Ops' },
    needsYou: { label: 'On you', count: (n) => `${n} on you` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Clearance',
      error: 'Fault',
      waiting: 'Your move',
      reply: 'Checked in',
      stalled: 'No contact',
      'session-opened': 'Op opened',
      'session-closed': 'Op closed',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    theme: { name: 'WATCHFUL PROTECTOR', film: "Christopher Nolan's Dark Knight trilogy" },
    empty: {
      ...STANDARD_VOICE.empty,
      // Dark is all clear here, its only meaning in the Wave.
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'The roof is dark.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} running. Get some rest.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Sitrep',
      dateline: datelineOf('GOTHAM'),
      signature: 'Waiting on you',
      caseNotes: () => 'In the field',
      // The Theme's one film line, a fragment of Harvey Dent's, only when nothing waits.
      end: (waiting) =>
        waiting ? "End of report. You're needed." : 'End of report. Darkest just before the dawn.',
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? "The light's on. " : '') + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'Applied Sciences',
      atmosphere: {
        label: 'Lit windows',
        hint: (t) => `Gotham's lit windows behind the ${lower(t.case.many)}`,
      },
    },
  },
}

/**
 * KNIGHTMARE's words, after Zack Snyder's Batman (snyder.md, sections 5 and 6): a veteran's
 * resistance in Superman's ruined world, Alfred's dry care in his ear. Cases stay cases.
 */
export const KNIGHTMARE_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    needsYou: { label: 'Your call', count: (n) => `${n} ${n === 1 ? 'awaits' : 'await'} your call` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Authorize',
      error: 'Damaged',
      waiting: 'Orders?',
      reply: 'New intel',
      stalled: 'Stuck',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    theme: { name: 'KNIGHTMARE', film: "Zack Snyder's Batman v Superman" },
    tagline: "The world isn't lost yet.",
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'Nothing needs you. Do try to sleep.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} running. Sit down, for once.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Still standing',
      signature: 'Yours to decide',
      caseNotes: () => 'Still out there',
      // Sleep only when nothing waits; otherwise, back to it.
      end: (waiting) =>
        waiting ? "That's the lot. Some of it still needs you." : "That's the lot. Get some sleep.",
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'The workshop',
      atmosphere: { label: 'Ash', hint: (t) => `Ash on the wind behind the ${lower(t.case.many)}` },
    },
  },
}

/**
 * BECOME A BAT's words, after Frank Miller and David Mazzucchelli's Batman: Year One (year-one.md,
 * sections 5 and 6): Gordon's notebook from his first year, plain, wry, tired and honest about being
 * scared. A precinct's plain words: a note left on a desk. Case, Needs you and Stalled stay.
 */
export const BECOME_A_BAT_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Sign here',
      error: 'Gone wrong',
      waiting: 'See me',
      reply: 'Memo',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    // Short enough for its picker folder (picked on screen): the full credit ran to a third line. A
    // no-break space keeps the book's title on one line.
    theme: { name: 'BECOME A BAT', film: "Frank Miller's Year\u00a0One" },
    // True of both men on January 4.
    tagline: 'New in town.',
    empty: {
      quiet: { ...STANDARD_VOICE.empty.quiet, title: "Quiet so far. I don't trust it." },
      unheard: { ...STANDARD_VOICE.empty.unheard, title: 'Nothing on the radio. That proves nothing.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} open. Enjoy it while it lasts.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Notebook',
      dateline: monthDay,
      signature: 'Needs your signature',
      nil: () => 'Nothing needs your signature. They can manage without you tonight.',
      caseNotes: () => 'On the street',
      // He doesn't send anyone to bed: he says whether your name is still on anything.
      end: (waiting) =>
        waiting
          ? "That's all I've got. Your name's still on some of it."
          : "That's all I've got. Nothing here has your name on it.",
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? '' : 'Quiet on the radio. ') + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'The squad room',
      atmosphere: { label: 'Smoke', hint: (t) => `Smoke off the street behind the ${lower(t.case.many)}` },
    },
    // On the perch he stands in his Signature pose.
    mascot: { ...STANDARD_VOICE.mascot, watching: 'Bat-Clawd in a swarm of bats' },
    noticeLine: { ...STANDARD_VOICE.noticeLine, closed: 'Case closed. One honest thing today.' },
  },
}

/**
 * ANCIENT GRACE's words, after Frank Miller's The Dark Knight Returns (dark-knight-returns.md,
 * sections 5 and 6): a television left on in a dark room in 1986. Its Lexicon is a control room's,
 * channels on the air and your cue; its Voice is the studio's, dry and a little satirical about its
 * talking heads. Broadcast, never print (PALE MOONLIGHT's) or an ops room (WATCHFUL PROTECTOR's).
 */
export const ANCIENT_GRACE_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Channel', many: 'Channels' },
    needsYou: { label: 'Your cue', count: (n) => `${n} cue${n === 1 ? '' : 's'} for you` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'OK to air?',
      error: 'Dead air',
      waiting: "You're on",
      reply: 'Latest',
      stalled: 'Frozen',
      'session-opened': 'On air',
      'session-closed': 'Off air',
    },
    live: { busy: 'Live', idle: 'Standby', shell: 'Shell' },
  },
  voice: {
    ...STANDARD_VOICE,
    // Short enough for its picker folder: with its year, the credit ran to a third line. No-break
    // spaces keep the book's title whole on the second.
    theme: { name: 'ANCIENT GRACE', film: "Frank Miller's The\u00a0Dark\u00a0Knight\u00a0Returns" },
    tagline: 'Live, from Gotham.',
    empty: {
      ...STANDARD_VOICE.empty,
      // The pundits finally agree, which is the joke.
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'Our panel agrees: a quiet night.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} on the air.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Bulletin',
      // Live, not an edition: the time only, no place.
      dateline: datelineOf('LIVE'),
      signature: 'Your segment',
      nil: (t) => `Nothing for your segment. Every ${lower(t.case.one)} stays on the air without you.`,
      caseNotes: () => 'Around the dial',
      // "You're still on" picks up the YOU'RE ON stamp; the station signs off only when nothing waits.
      end: (waiting) =>
        waiting ? "Stay tuned. You're still on." : "That's the bulletin. Good night, Gotham.",
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) =>
        (lit ? 'We interrupt this program. ' : 'Nothing on tonight. ') + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'Control room',
      atmosphere: { label: 'Static', hint: (t) => `TV static behind the ${lower(t.case.many)}` },
    },
  },
}

/** BLUE COLLAR's all-clear: the empty panel's title, and the quiet disc's tooltip begins with it. */
const GRID_HOLDING = "The grid's holding."

/**
 * BLUE COLLAR's words, after Scott Snyder and Nick Dragotta's Absolute Batman (absolute-batman.md,
 * sections 5 and 6): the night shift of a city engineer who keeps the grid and the sewers running,
 * plain, physical and hopeful. A work site's words: a permit asked for, a fuse blown, a machine
 * jammed. Case and Needs you stay.
 */

export const BLUE_COLLAR_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Permit?',
      error: 'Blown',
      waiting: 'Asking',
      stalled: 'Jammed',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    // Short enough for its picker folder: with their first names, or with "and", the credit ran to a
    // third line. A no-break space keeps the book's title whole.
    theme: { name: 'BLUE COLLAR', film: "Snyder & Dragotta's Absolute\u00a0Batman" },
    tagline: 'Built, not bought.',
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: GRID_HOLDING },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} running. Clock out.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Shift notes',
      dateline: datelineOf('NIGHT SHIFT'),
      signature: 'Needs your hands',
      nil: () => 'Nothing needs your hands. Everything on the board is running.',
      caseNotes: () => 'On the clock',
      end: (waiting) => (waiting ? "Tools stay out. There's work on your bench." : 'Tools down. Go home.'),
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? '' : `${GRID_HOLDING} `) + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'Toolbox',
      atmosphere: { label: 'Bats', hint: (t) => `Bats over Gotham behind the ${lower(t.case.many)}` },
    },
    // On the perch he stands as on the #1 cover.
    mascot: { ...STANDARD_VOICE.mascot, watching: 'Bat-Clawd holding his cape across him' },
  },
}

/** The date of a month's nth weekday (0 Sunday … 6 Saturday), counting from 1. */
const nthWeekday = (year: number, month: number, weekday: number, n: number) =>
  new Date(year, month, 1 + ((weekday - new Date(year, month, 1).getDay() + 7) % 7) + 7 * (n - 1))

/**
 * The Long Halloween's named days (long-halloween.md, section 6), in a year's order: the US days the
 * book turns on, each a year's date. "Roman Holiday" (#11) is no day of the calendar, so it is out.
 */
const HOLIDAYS: readonly { name: string; on: (year: number) => Date }[] = [
  { name: "VALENTINE'S DAY", on: (y) => new Date(y, 1, 14) },
  { name: "ST. PATRICK'S DAY", on: (y) => new Date(y, 2, 17) },
  { name: "APRIL FOOL'S DAY", on: (y) => new Date(y, 3, 1) },
  { name: "MOTHER'S DAY", on: (y) => nthWeekday(y, 4, 0, 2) },
  { name: "FATHER'S DAY", on: (y) => nthWeekday(y, 5, 0, 3) },
  { name: 'INDEPENDENCE DAY', on: (y) => new Date(y, 6, 4) },
  { name: 'LABOR DAY', on: (y) => nthWeekday(y, 8, 1, 1) },
  { name: 'HALLOWEEN', on: (y) => new Date(y, 9, 31) },
  { name: 'THANKSGIVING', on: (y) => nthWeekday(y, 10, 4, 4) },
  { name: 'CHRISTMAS', on: (y) => new Date(y, 11, 25) },
  { name: "NEW YEAR'S EVE", on: (y) => new Date(y, 11, 31) },
]

/**
 * HOLIDAY's dateline: the next of the book's named days, counted in calendar days, never a date or
 * the time ("HALLOWEEN IN 9 DAYS", "HALLOWEEN TOMORROW", and on the day, "HALLOWEEN").
 */
const holidayCountdown = (now: Date) => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  // The year's first holiday still to come, or next year's first.
  const year = today.getFullYear()
  const coming = HOLIDAYS.find((holiday) => holiday.on(year) >= today)
  const { name } = coming ?? HOLIDAYS[0]!
  const on = coming ? coming.on(year) : HOLIDAYS[0]!.on(year + 1)
  // Rounded: a day the clocks change on is an hour long or short.
  const days = Math.round((on.getTime() - today.getTime()) / 86_400_000)
  return days === 0 ? name : days === 1 ? `${name} TOMORROW` : `${name} IN ${days} DAYS`
}

/** HOLIDAY's all-clear on the Signal's tooltip (the empty panel wishes you a quiet holiday). */
const NO_HOLIDAY = 'No holiday tonight.'

/**
 * HOLIDAY's words, after Jeph Loeb and Tim Sale's The Long Halloween (long-halloween.md, sections 6
 * and 7; jury-wave-3.md, section 9): the Roman's table. His household speaks to a guest it
 * respects, courteous, quiet, Old-World, a little menacing, and always counting the days to the next
 * holiday. Batman, Gordon and Dent don't speak in it. Case and Needs you stay.
 */
export const HOLIDAY_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Blessing?',
      error: 'Botched',
      waiting: 'A word?',
      reply: 'Message',
      stalled: 'On ice',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    // Short enough for its picker folder; no-break spaces keep the book's title whole.
    theme: { name: 'HOLIDAY', film: "Loeb & Sale's The\u00a0Long\u00a0Halloween" },
    tagline: 'One holiday at a time.',
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'A quiet night. Enjoy the holiday.' },
      unheard: { ...STANDARD_VOICE.empty.unheard, title: "Nobody's talking tonight." },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} open. Nobody's asking favours.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Calendar',
      dateline: holidayCountdown,
      signature: 'Waiting on your word',
      nil: () => "Nobody's waiting on your word tonight.",
      caseNotes: () => 'Family business',
      end: (waiting) =>
        waiting ? 'The family is still waiting on you.' : "That's the calendar. See you next holiday.",
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? '' : `${NO_HOLIDAY} `) + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: "The Roman's table",
      atmosphere: {
        label: 'Halloween',
        hint: (t) => `Torn pages under a pumpkin moon behind the ${lower(t.case.many)}`,
      },
    },
    // On the perch he stands as on the collected edition's cover.
    mascot: { ...STANDARD_VOICE.mascot, watching: 'Bat-Clawd, his cape swept to the ground' },
    noticeLine: { ...STANDARD_VOICE.noticeLine, closed: 'Case closed. Cross off the day.' },
  },
}

// --- DARK DECO: Batman: The Animated Series (1992) speaks as its title cards do (animated-series.md,
// sections 6 and 7): a short title, no narrator and no broadcast, and an episode's end. ---

/**
 * DARK DECO's words: someone paging you, a request to go ahead, a job busted, a demand for an answer,
 * a new lead and a job held up; all clear is an episode's title said as a phrase, and the report
 * fades out as an episode does.
 */
export const DARK_DECO_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    needsYou: { label: 'Paging you', count: (n) => `${n} paging you` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Go ahead?',
      error: 'Busted',
      waiting: 'Answer me',
      reply: 'New lead',
      stalled: 'Held up',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    // The makers first, as every credit has them; no-break spaces keep the series' title whole.
    theme: { name: 'DARK DECO', film: "Timm & Radomski's Batman:\u00a0The\u00a0Animated\u00a0Series" },
    tagline: 'Gotham, under a red sky.',
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'Nothing to fear.' },
      unheard: { ...STANDARD_VOICE.empty.unheard, title: 'No word from the city.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} on the card tonight.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: "Tonight's episode",
      signature: 'On hold for you',
      nil: (t) => `Nothing to fear. Every ${lower(t.case.one)} carries on without you.`,
      caseNotes: (t) => `${t.case.one} card`,
      end: (waiting) => (waiting ? 'Fade out. Something still needs you.' : 'Fade out.'),
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? '' : 'The sky is quiet. ') + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'The Batcave',
      atmosphere: {
        label: 'Red sky',
        hint: (t) => `Police blimps over the city behind the ${lower(t.case.many)}`,
      },
    },
    // On the perch he stands with his arms crossed, as the series' key art has him.
    mascot: { ...STANDARD_VOICE.mascot, watching: 'Bat-Clawd, his arms crossed' },
    noticeLine: { ...STANDARD_VOICE.noticeLine, closed: 'Case closed. Roll the credits.' },
  },
}

/**
 * SILENT PREDATOR, after Rocksteady's Arkham trilogy (arkham-games.md, sections 6 and 7): the game itself
 * speaks, its objective log in the second person, short and practical. Quiet means all clear; the
 * respect list SERIOUS HOUSE set holds, though the games use some of its words.
 */
export const SILENT_PREDATOR_WORDS: Words = {
  terms: {
    ...STANDARD_TERMS,
    case: { one: 'Mission', many: 'Missions' },
    needsYou: { label: 'Objectives', count: (n) => `${n} objective${n === 1 ? '' : 's'}` },
    stamp: {
      ...STANDARD_TERMS.stamp,
      permission: 'Access?',
      error: 'Failed',
      waiting: 'Respond',
      reply: 'Incoming',
      'session-opened': 'Mission start',
      'session-closed': 'Mission over',
    },
  },
  voice: {
    ...STANDARD_VOICE,
    // The studio's name, as every credit names its makers, and "trilogy" tells a game from SERIOUS
    // HOUSE's book in the picker. A no-break space keeps the title whole.
    theme: { name: 'SILENT PREDATOR', film: "Rocksteady's Arkham trilogy" },
    tagline: 'Eyes open. Move silent.',
    empty: {
      ...STANDARD_VOICE.empty,
      quiet: { ...STANDARD_VOICE.empty.quiet, title: 'No objectives. The city is quiet.' },
      noCases: {
        ...STANDARD_VOICE.empty.noCases,
        title: (t) => `No ${lower(t.case.many)} running. Grapple out.`,
      },
    },
    report: {
      ...STANDARD_VOICE.report,
      name: 'Mission log',
      dateline: datelineOf('MISSION LOG'),
      signature: 'Objectives',
      nil: (t) => `No objectives waiting on you. Every ${lower(t.case.one)} is running.`,
      caseNotes: (t) => `${t.case.one} log`,
      end: (waiting) => (waiting ? 'Objectives remain.' : 'All objectives complete.'),
    },
    signal: {
      ...STANDARD_VOICE.signal,
      openTip: (lit) => (lit ? '' : 'Nothing highlighted. ') + STANDARD_VOICE.signal.openTip(lit),
    },
    settings: {
      ...STANDARD_VOICE.settings,
      kicker: 'Gadgets',
      atmosphere: { label: 'Rain', hint: (t) => `Rain over Gotham behind the ${lower(t.case.many)}` },
    },
    // On the perch he crouches on a gargoyle, as City's key art has him.
    mascot: { ...STANDARD_VOICE.mascot, watching: 'Bat-Clawd on a gargoyle' },
  },
}
