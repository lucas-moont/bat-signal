// The renderer's one way to the words. Its own module, free of the bridge, so any component
// (Bat-Clawd, the emblem) can speak without pulling in the main process's API.
import { wordsOf } from '@shared/themes'
import type { Words } from '@shared/words'
import { useLexicon, useTheme } from './theme'

/** The words the panel and the Signal speak: the worn Theme's, with its Lexicon or without. */
export const useWords = (): Words => wordsOf(useTheme(), useLexicon())
