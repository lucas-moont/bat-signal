import { describe, expect, it } from 'vitest'
import { rendererSources } from './rendererSources'

/** The renderer's CSS and TS, without the Theme's own file, where every colour is defined. */
const sources = () => rendererSources('.css', '.ts', '.tsx').filter(({ path }) => path !== 'styles/theme.css')

/** Blanks out comments, keeping line breaks, so prose like "#b47c0d" in a comment isn't a colour. */
const withoutComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\/|(?<![:'"\w])\/\/.*$/gm, (comment) => comment.replace(/[^\n]/g, ' '))

const COLOUR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(/gi

/** Every colour written by hand outside the Theme, as `file:line  literal`. */
function literals(): string[] {
  return sources().flatMap(({ path, text }) =>
    withoutComments(text)
      .split('\n')
      .flatMap((line, i) => [...line.matchAll(COLOUR)].map((m) => `${path}:${i + 1}  ${m[0]}`)),
  )
}

describe("the renderer's colours", () => {
  // A new Theme swaps the variables in theme.css; a colour written anywhere else would stay behind.
  it('all come from a Theme variable', () => {
    expect(literals()).toEqual([])
  })
})
