// A hidden page for a renderer test: the shared animation clock (ticker.ts) listens to the page's
// visibility as it loads, and a hidden page keeps it stopped. Imported first, before any module that
// reaches the clock (Bat-Clawd, the Atmosphere), and undone after the file.
import { afterAll, vi } from 'vitest'

vi.stubGlobal('document', { hidden: true, addEventListener: () => {} })
afterAll(() => vi.unstubAllGlobals())
