import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = join(__dirname, '../src')

/** The renderer's source folder. */
export const RENDERER = join(SRC, 'renderer/src')

/** Every source file under a folder of app/src with one of the extensions, as its path (relative to that folder, with "/") and text. */
export function sourcesUnder(dir: string, ...extensions: string[]): { path: string; text: string }[] {
  const root = join(SRC, dir)
  return readdirSync(root, { recursive: true, encoding: 'utf8' })
    .map((path) => path.replaceAll('\\', '/'))
    .filter((path) => extensions.some((ext) => path.endsWith(ext)))
    .map((path) => ({ path, text: readFileSync(join(root, path), 'utf8') }))
}

/** A Theme's variables, as written in its stylesheet's block scoped to [data-theme]. */
export function themeVariables(theme: string): Map<string, string> {
  const css = readFileSync(join(RENDERER, `styles/themes/${theme}.css`), 'utf8')
  const block = new RegExp(`\\[data-theme='${theme}'\\]\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? ''
  return new Map([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1]!, m[2]!.trim()] as const))
}

/** A value with every var() it names written out, as far as the Theme defines them. */
export function resolved(vars: Map<string, string>, value: string, depth = 0): string {
  if (depth > 10) return value
  return value.replace(/var\((--[\w-]+)\)/g, (call, name: string) => {
    const named = vars.get(name)
    return named === undefined ? call : resolved(vars, named, depth + 1)
  })
}

/** A hex color's channels, 0 to 255. */
export function channels(hex: string): [number, number, number] {
  const digits = hex.slice(1)
  const full = digits.length < 6 ? [...digits.slice(0, 3)].map((d) => d + d).join('') : digits
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number]
}

/** Every renderer source file with one of the extensions. */
export const rendererSources = (...extensions: string[]) => sourcesUnder('renderer/src', ...extensions)
