import { describe, expect, it } from 'vitest'
import { addressWearing, themeFromSearch, wearTheme } from '../../src/renderer/src/theme'

describe('the Theme a page wears', () => {
  it('is the one in its address, as the main process opens a window', () => {
    expect(themeFromSearch('?view=panel&theme=the-batman-2022')).toBe('the-batman-2022')
  })

  // The demo pages and the screenshots open without one; an old or mistyped id must not leave
  // the page with no Theme at all (its colors are scoped to the attribute).
  it('is the default when the address names none, or one it does not know', () => {
    expect(themeFromSearch('?view=signal')).toBe('the-batman-2022')
    expect(themeFromSearch('?theme=arkham')).toBe('the-batman-2022')
  })

  it('is set as an attribute on the page, which scopes its stylesheet', () => {
    const root = { dataset: {} } as HTMLElement
    wearTheme(root, 'the-batman-2022')
    expect(root.dataset.theme).toBe('the-batman-2022')
  })

  // The main process opens each window with its Theme in the address; after a live switch a
  // reload must open in the new one, not the one the window started with.
  it('changes in the address too, keeping the view and the hash', () => {
    const href = 'file:///C:/app/out/renderer/index.html?view=panel&theme=the-batman-2022#demo-report'
    const next = new URL(addressWearing(href, 'the-batman-2022'))
    expect(next.searchParams.get('view')).toBe('panel')
    expect(next.searchParams.get('theme')).toBe('the-batman-2022')
    expect(next.hash).toBe('#demo-report')
  })
})
