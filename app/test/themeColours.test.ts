import { describe, expect, it } from 'vitest'
import { rendererSources } from './rendererSources'

/** The renderer's CSS and TS, without the Theme's own file, where every colour is defined. */
const sources = () => rendererSources('.css', '.ts', '.tsx').filter(({ path }) => path !== 'styles/theme.css')

/** Blanks out comments, keeping line breaks, so prose like "#b47c0d" in a comment isn't a colour. */
const withoutComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\/|(?<![:'"\w])\/\/.*$/gm, (comment) => comment.replace(/[^\n]/g, ' '))

const COLOUR =
  /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(|(?<![\w-])(?:black|white|red|gray|grey)(?![\w-])/gi

/** Every colour written by hand outside the Theme, as `file:line  literal`. */
function literals(): string[] {
  return sources().flatMap(({ path, text }) =>
    withoutComments(text)
      .split('\n')
      .flatMap((line, i) => [...line.matchAll(COLOUR)].map((m) => `${path}:${i + 1}  ${m[0]}`)),
  )
}

/** Every CSS gradient whose first argument doesn't name its interpolation space, as `file:line`. */
function gradientsWithoutSpace(): string[] {
  return rendererSources('.css').flatMap(({ path, text }) =>
    [...text.matchAll(/-gradient\(([^,]*)/g)]
      .filter((m) => !/\bin srgb\b/.test(m[1]!))
      .map((m) => `${path}:${text.slice(0, m.index).split('\n').length}`),
  )
}

describe("the renderer's colours", () => {
  // A new Theme swaps the variables in theme.css; a colour written anywhere else would stay behind.
  it('all come from a Theme variable', () => {
    expect(literals()).toEqual([])
  })

  // A colour-mix() is not a legacy colour, and one in a gradient switches it from sRGB to Oklab
  // interpolation, which shifts its pixels. Whether a token is a colour-mix() is up to each Theme,
  // so every gradient names its space and none depends on how a Theme writes its colours.
  it('blend in sRGB inside every gradient, whatever the Theme writes', () => {
    expect(gradientsWithoutSpace()).toEqual([])
  })
})
