// Which Theme the page wears: an attribute on <html> that scopes the Theme's stylesheet
// (styles/themes/<id>.css), and a context for the code that reads the Theme (its words, its
// emblem). Free of the bridge, so any component can read it and still render in a node test.
import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_THEME, isThemeId, type ThemeId } from '@shared/themes'
import { loadFonts } from './styles/themes/fonts'

/** The Theme in the page's address (?theme=…), as the main process opens a window; else the default. */
export function themeFromSearch(search: string): ThemeId {
  const theme = new URLSearchParams(search).get('theme')
  return isThemeId(theme) ? theme : DEFAULT_THEME
}

/** Dresses the page in a Theme. main.tsx does it before the first render, so no frame paints bare. */
export function wearTheme(root: HTMLElement, theme: ThemeId): void {
  root.dataset.theme = theme
}

/** The page's address with its Theme changed, the rest (the view, a demo's hash) kept. */
export function addressWearing(href: string, theme: ThemeId): string {
  const url = new URL(href)
  url.searchParams.set('theme', theme)
  return url.href
}

const ThemeContext = createContext<ThemeId>(DEFAULT_THEME)

/** The Theme the page wears: the default outside a Wearing (a component rendered on its own). */
export const useTheme = (): ThemeId => useContext(ThemeContext)

/**
 * Wears the settings' Theme from here down, and on the page itself, changing live with the
 * setting: its faces load, then the page takes its colors and the components its words and
 * emblem, all at once, so no frame mixes two Themes and text never sits in a fallback face.
 */
export function Wearing({ theme, children }: { theme: ThemeId; children: ReactNode }) {
  // The page already wears the Theme it opened with (main.tsx): only a change waits for its faces.
  const [worn, setWorn] = useState(theme)
  useEffect(() => {
    let live = true
    void loadFonts(theme).finally(() => {
      if (!live) return
      wearTheme(document.documentElement, theme)
      // A reload (or a page recovering from a crash) then opens in the Theme it now wears.
      history.replaceState(history.state, '', addressWearing(location.href, theme))
      setWorn(theme)
    })
    return () => {
      live = false
    }
  }, [theme])
  return createElement(ThemeContext, { value: worn }, children)
}
