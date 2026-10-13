// The Themes Bat-Signal can wear, each one version of Batman (CONTEXT.md, Theme). The id is what
// settings.json keeps; it names the film or comic, while each Theme's display name alludes to it.
// A Theme's colors live in its stylesheet (renderer/src/styles/themes/<id>.css); what the main
// process or the renderer's code needs lives here.
import {
  KNIGHTMARE_ASH,
  PALE_MOONLIGHT_SNOW,
  VENGEANCE_RAIN,
  WATCHFUL_PROTECTOR_WINDOWS,
  type Atmosphere,
} from './atmospheres'
import { BAT_1989, BAT_2008, BAT_2016, emblem, OVAL_1989, WINGS, type Emblem } from './emblems'
import {
  KNIGHTMARE_SUIT,
  PALE_MOONLIGHT_SUIT,
  VENGEANCE_SUIT,
  WATCHFUL_PROTECTOR_SUIT,
  type Suit,
} from './suits'
import {
  KNIGHTMARE_WORDS,
  PALE_MOONLIGHT_WORDS,
  STANDARD_WORDS,
  WATCHFUL_PROTECTOR_WORDS,
  withLexicon,
  type Words,
} from './words'

export const THEME_IDS = [
  'the-batman-2022',
  'batman-1989',
  'the-dark-knight-2008',
  'batman-v-superman-2016',
] as const
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
  /** What its canvas paints behind the panel (shared/atmospheres.ts). */
  atmosphere: Atmosphere
}

export const THEMES: Record<ThemeId, Theme> = {
  'the-batman-2022': {
    flag: 'vengeance',
    ground: '#000000',
    words: STANDARD_WORDS,
    emblem: emblem(WINGS, 'wear'),
    suit: VENGEANCE_SUIT,
    atmosphere: VENGEANCE_RAIN,
  },
  /** Tim Burton's Batman (1989), PALE MOONLIGHT: gold over smog, and snow. */
  'batman-1989': {
    flag: 'moonlight',
    ground: '#0d0906',
    words: PALE_MOONLIGHT_WORDS,
    emblem: emblem(BAT_1989, 'none', OVAL_1989),
    suit: PALE_MOONLIGHT_SUIT,
    atmosphere: PALE_MOONLIGHT_SNOW,
  },
  /** Christopher Nolan's The Dark Knight (2008), WATCHFUL PROTECTOR: steel blue, lit windows. */
  'the-dark-knight-2008': {
    flag: 'protector',
    ground: '#04070b',
    words: WATCHFUL_PROTECTOR_WORDS,
    emblem: emblem(BAT_2008, 'none'),
    suit: WATCHFUL_PROTECTOR_SUIT,
    atmosphere: WATCHFUL_PROTECTOR_WINDOWS,
  },
  /** Zack Snyder's Batman v Superman (2016) and Justice League, KNIGHTMARE: grey ash, one red. */
  'batman-v-superman-2016': {
    flag: 'knightmare',
    ground: '#100804',
    words: KNIGHTMARE_WORDS,
    emblem: emblem(BAT_2016, 'none'),
    suit: KNIGHTMARE_SUIT,
    atmosphere: KNIGHTMARE_ASH,
  },
}

/** The words the panel and the Signal speak in a Theme, with its Lexicon on or off. */
export const wordsOf = (theme: ThemeId, lexicon: boolean): Words => withLexicon(THEMES[theme].words, lexicon)

/** The Theme a demo page's hash names by its flag (#demo-vengeance), if any. */
export const themeFromFlags = (flags: ReadonlySet<string>): ThemeId | undefined =>
  THEME_IDS.find((id) => flags.has(THEMES[id].flag))
