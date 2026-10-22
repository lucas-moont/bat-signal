// The Themes Bat-Signal can wear, each one version of Batman (CONTEXT.md, Theme). The id is what
// settings.json keeps; it names the film or comic, while each Theme's display name alludes to it.
// A Theme's colors live in its stylesheet (renderer/src/styles/themes/<id>.css); what the main
// process or the renderer's code needs lives here.
import {
  ANCIENT_GRACE_STATIC,
  BECOME_A_BAT_SMOKE,
  BLUE_COLLAR_COLONY,
  KNIGHTMARE_ASH,
  PALE_MOONLIGHT_SNOW,
  SERIOUS_HOUSE_SCRATCHES,
  VENGEANCE_RAIN,
  WATCHFUL_PROTECTOR_WINDOWS,
  type Atmosphere,
} from './atmospheres'
import {
  BAT_1986,
  BAT_1987,
  BAT_1989,
  BAT_2008,
  BAT_2016,
  BLOCK_2024,
  emblem,
  OVAL_1989,
  JOKERS_LAUGH,
  SIGNAL_IN_PENCIL,
  WINGS,
  type Emblem,
} from './emblems'
import {
  ANCIENT_GRACE_SUIT,
  BECOME_A_BAT_SUIT,
  BLUE_COLLAR_SUIT,
  KNIGHTMARE_SUIT,
  PALE_MOONLIGHT_SUIT,
  VENGEANCE_SUIT,
  WATCHFUL_PROTECTOR_SUIT,
  type Suit,
} from './suits'
import {
  ANCIENT_GRACE_WORDS,
  BECOME_A_BAT_WORDS,
  BLUE_COLLAR_WORDS,
  KNIGHTMARE_WORDS,
  PALE_MOONLIGHT_WORDS,
  SERIOUS_HOUSE_WORDS,
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
  'batman-year-one-1987',
  'the-dark-knight-returns-1986',
  'absolute-batman-2024',
  'arkham-asylum-1989',
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
  /** Zack Snyder's Batman v Superman (2016) and Justice League, KNIGHTMARE: desert amber, one crimson. */
  'batman-v-superman-2016': {
    flag: 'knightmare',
    ground: '#100804',
    words: KNIGHTMARE_WORDS,
    emblem: emblem(BAT_2016, 'none'),
    suit: KNIGHTMARE_SUIT,
    atmosphere: KNIGHTMARE_ASH,
  },
  /** Frank Miller and David Mazzucchelli's Batman: Year One (1987), BECOME A BAT: olive grime, smoke. */
  'batman-year-one-1987': {
    flag: 'yearone',
    ground: '#0d0e06',
    words: BECOME_A_BAT_WORDS,
    emblem: emblem(BAT_1987, 'none'),
    suit: BECOME_A_BAT_SUIT,
    atmosphere: BECOME_A_BAT_SMOKE,
  },
  /** Frank Miller's The Dark Knight Returns (1986), ANCIENT GRACE: a TV left on, icy night, Lightning Cyan. */
  'the-dark-knight-returns-1986': {
    flag: 'grace',
    ground: '#000f12',
    words: ANCIENT_GRACE_WORDS,
    emblem: emblem(BAT_1986, 'none'),
    suit: ANCIENT_GRACE_SUIT,
    atmosphere: ANCIENT_GRACE_STATIC,
  },
  /** Scott Snyder and Nick Dragotta's Absolute Batman (2024), BLUE COLLAR: a violet night, SFX lemon. */
  'absolute-batman-2024': {
    flag: 'collar',
    ground: '#0a0812',
    words: BLUE_COLLAR_WORDS,
    emblem: emblem(BLOCK_2024, 'none'),
    suit: BLUE_COLLAR_SUIT,
    atmosphere: BLUE_COLLAR_COLONY,
  },
  /** Grant Morrison and Dave McKean's Arkham Asylum (1989), SERIOUS HOUSE: blue-black ink, the Joker's scarlet. */
  'arkham-asylum-1989': {
    flag: 'house',
    ground: '#05070a',
    words: SERIOUS_HOUSE_WORDS,
    emblem: { ...emblem(SIGNAL_IN_PENCIL, 'scribble'), lamp: JOKERS_LAUGH },
    suit: VENGEANCE_SUIT, // PLACEHOLDER until the suit is drawn from the references
    atmosphere: SERIOUS_HOUSE_SCRATCHES,
  },
}

/** The words the panel and the Signal speak in a Theme, with its Lexicon on or off. */
export const wordsOf = (theme: ThemeId, lexicon: boolean): Words => withLexicon(THEMES[theme].words, lexicon)

/** The Theme a demo page's hash names by its flag (#demo-vengeance), if any. */
export const themeFromFlags = (flags: ReadonlySet<string>): ThemeId | undefined =>
  THEME_IDS.find((id) => flags.has(THEMES[id].flag))
