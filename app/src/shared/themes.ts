// The Themes Bat-Signal can wear, each one version of Batman (CONTEXT.md, Theme). The id is what
// settings.json keeps; it names the film or comic, while each Theme's display name alludes to it.
// A Theme's colors live in its stylesheet (renderer/src/styles/themes/<id>.css); what the main
// process or the renderer's code needs lives here.
import { emblem, WINGS, type Emblem } from './emblems'
import { VENGEANCE_SUIT, type Suit } from './suits'
import { STANDARD_TERMS, STANDARD_WORDS, type Words } from './words'

export const THEME_IDS = ['the-batman-2022'] as const
export type ThemeId = (typeof THEME_IDS)[number]

/** The Batman (2022), VENGEANCE: the default Theme. */
export const DEFAULT_THEME: ThemeId = 'the-batman-2022'

export const isThemeId = (raw: unknown): raw is ThemeId => (THEME_IDS as readonly unknown[]).includes(raw)

export interface Theme {
  /** Its word in a demo page's hash (#demo-vengeance): one word, since the hash splits on "-". */
  flag: string
  /** The window's background before the page paints: the Theme's --abyss. */
  ground: string
  /** Its Lexicon and Voice: one object per Theme, so whatever memoises on the words stays put. */
  words: Words
  /** Its bat: in the panel's masthead, on the disc, in the intro and on Bat-Clawd's chest. */
  emblem: Emblem
  /** Bat-Clawd dressed as this version of Batman (shared/suits.ts). */
  suit: Suit
}

export const THEMES: Record<ThemeId, Theme> = {
  'the-batman-2022': {
    flag: 'vengeance',
    ground: '#000000',
    words: STANDARD_WORDS,
    emblem: emblem(WINGS, 'wear'),
    suit: VENGEANCE_SUIT,
  },
}

// A Theme's words with its Lexicon off, made once per Theme's words: they are compared by identity
// downstream (the Signal diffs notices again only for new words).
const standardTerms = new WeakMap<Words, Words>()

/**
 * The words the panel and the Signal speak in a Theme: its own, or with its Lexicon off its Voice
 * over the standard terms (CONTEXT.md, Lexicon). Windows toasts and the tray never ask: they speak
 * STANDARD_WORDS whatever the Theme.
 */
export function wordsOf(theme: ThemeId, lexicon: boolean): Words {
  const words = THEMES[theme].words
  if (lexicon || words.terms === STANDARD_TERMS) return words
  let plain = standardTerms.get(words)
  if (!plain) standardTerms.set(words, (plain = { terms: STANDARD_TERMS, voice: words.voice }))
  return plain
}

/** The Theme a demo page's hash names by its flag (#demo-vengeance), if any. */
export const themeFromFlags = (flags: ReadonlySet<string>): ThemeId | undefined =>
  THEME_IDS.find((id) => flags.has(THEMES[id].flag))
