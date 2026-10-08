// Which pages are Bat-Signal's own. Its windows may show only those, and only those may talk to the
// main process: a page that got into a window any other way (a dropped link, a redirect) would
// otherwise inherit the preload bridge, with every session's titles and messages behind it.

export interface AppPages {
  /** The built page's file:// URL. */
  page: string
  /** The development server's origin, in development only. */
  devServer?: string
}

/** Whether `url` is the built page (any query or hash) or, in development, the dev server. */
export function isAppPage(url: string, pages: AppPages): boolean {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return false
  }
  if (pages.devServer && parsed.origin === new URL(pages.devServer).origin) return true
  const built = new URL(pages.page)
  return parsed.protocol === 'file:' && parsed.host === built.host && samePath(parsed, built)
}

/** File paths compared as Windows does: decoded, and whatever their case (C: and c: are one drive). */
const samePath = (a: URL, b: URL): boolean =>
  decodeURIComponent(a.pathname).toLowerCase() === decodeURIComponent(b.pathname).toLowerCase()
