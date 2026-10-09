import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const RENDERER = join(__dirname, '../src/renderer/src')
// The Theme's own file, where every colour is defined; and the throwaway prototypes, never shipped.
const EXEMPT = [join(RENDERER, 'styles/theme.css'), join(RENDERER, 'prototype')]

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (EXEMPT.some((exempt) => path === exempt)) return []
    if (entry.isDirectory()) return sources(path)
    return /\.(css|tsx?)$/.test(entry.name) ? [path] : []
  })
}

/** Blanks out comments, keeping line breaks, so prose like "#b47c0d" in a comment isn't a colour. */
const withoutComments = (code: string) =>
  code.replace(/\/\*[\s\S]*?\*\/|(?<![:'"\w])\/\/.*$/gm, (comment) => comment.replace(/[^\n]/g, ' '))

const COLOUR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\(/gi

/** Every colour written by hand outside the Theme, as `file:line  literal`. */
function literals(): string[] {
  return sources(RENDERER).flatMap((file) =>
    withoutComments(readFileSync(file, 'utf8'))
      .split('\n')
      .flatMap((line, i) =>
        [...line.matchAll(COLOUR)].map(
          (m) => `${relative(RENDERER, file).replaceAll('\\', '/')}:${i + 1}  ${m[0]}`,
        ),
      ),
  )
}

describe("the renderer's colours", () => {
  // A new Theme swaps the variables in theme.css; a colour written anywhere else would stay behind.
  it('all come from a Theme variable', () => {
    expect(literals()).toEqual([])
  })
})
