import { describe, expect, it } from 'vitest'
import { isAppPage } from '../src/main/trust'

const installed = {
  page: 'file:///C:/Users/bruce/AppData/Local/Programs/bat-signal/resources/app.asar/out/renderer/index.html',
}
const dev = { ...installed, devServer: 'http://localhost:5173' }

describe("isAppPage: whether a URL is Bat-Signal's own page", () => {
  it('is the built page, with any view or demo', () => {
    expect(isAppPage(`${installed.page}?view=panel`, installed)).toBe(true)
    expect(isAppPage(`${installed.page}?view=signal#demo-news`, installed)).toBe(true)
  })

  it('is the development server, while there is one', () => {
    expect(isAppPage('http://localhost:5173/?view=panel', dev)).toBe(true)
    expect(isAppPage('http://localhost:5173/?view=panel', installed)).toBe(false)
  })

  it('is the built page however Windows spells its path (case and drive letter do not matter there)', () => {
    expect(isAppPage(`${installed.page.replace('file:///C:', 'file:///c:')}?view=panel`, installed)).toBe(
      true,
    )
    expect(isAppPage(`${installed.page.replace('Programs', 'PROGRAMS')}?view=panel`, installed)).toBe(true)
  })

  it('is not the same path on another machine', () => {
    const share = { page: 'file://nas/apps/bat-signal/resources/app.asar/out/renderer/index.html' }
    expect(isAppPage(`${share.page}?view=panel`, share)).toBe(true)
    expect(isAppPage(share.page.replace('//nas/', '//elsewhere/'), share)).toBe(false)
  })

  it('is no other page: not the web, not another file, not a look-alike', () => {
    for (const url of [
      'https://example.com/',
      'file:///C:/Users/bruce/Downloads/page.html',
      `${installed.page}.html`,
      'file:///C:/Users/bruce/AppData/Local/Programs/bat-signal/resources/app.asar/out/renderer/other.html',
      'http://localhost:5174/?view=panel',
      'http://localhost:5173.example.com/',
      'data:text/html,<p>hi</p>',
      'not a url',
    ])
      expect(isAppPage(url, dev), url).toBe(false)
  })
})
