// Each Theme's faces (<id>.fonts.ts), a separate chunk per Theme, loaded when the Theme is worn or
// previewed (the picker loads every Theme's as it opens): they come from disk, never the network.
import type { ThemeId } from '@shared/themes'

const FONTS = import.meta.glob('./*.fonts.ts')

/**
 * Loads a Theme's faces; resolves once their stylesheet is in (the files follow as text uses them).
 * Never rejects: a Theme whose fonts fail to load still wears its colors, in the fallback faces.
 */
export const loadFonts = (theme: ThemeId): Promise<unknown> =>
  (FONTS[`./${theme}.fonts.ts`]?.() ?? Promise.resolve()).catch((err: unknown) =>
    console.warn(`[bat-signal] could not load the ${theme} fonts:`, err),
  )
