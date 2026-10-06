// npm run privacy: scans every tracked file for what must never be committed. Static rules catch
// real user folders, personal emails and tokens; what only this machine knows (the username, the
// ids of real Claude sessions) is gathered at run time and never written anywhere. npm test runs
// the same scan (test/privacy.test.ts), so it never depends on someone remembering this command.
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { homedir, userInfo } from 'node:os'
import { join } from 'node:path'

export interface Personal {
  /** Local usernames, matched as whole words. */
  names: readonly string[]
  /** Ids of real Claude Code sessions on this machine. */
  ids: readonly string[]
}

export interface Leak {
  line: number
  rule: string
}

/** The fictional people the docs and synthetic fixtures use in a user folder. */
const FICTIONAL_USERS = new Set(['bruce', 'alfred', 'public'])
// Placeholders such as <you>, %USERNAME% or $HOME never match: the name stops at < % $.
const USER_FOLDER = /(?:\b[a-z]:|^|[\s"'`(=])[\\/]+(?:users|home)[\\/]+([^\\/\s"'`<>%$]+)/gi
const EMAIL = /[\w.%+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/gi
const ALLOWED_EMAIL =
  /^(?:noreply@anthropic\.com|[\w.+-]+@users\.noreply\.github\.com|[\w.+-]+@example\.(?:com|org))$/i
const TOKEN = /sk-ant-[\w-]{16,}|ghp_\w{30,}|github_pat_\w{30,}|xox[abp]-[\w-]{10,}|AKIA[0-9A-Z]{16}/
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi
const UUID_WORD = new RegExp(`\\b${UUID.source}\\b`, 'gi')
const TRANSCRIPT = new RegExp(`(?:^|[\\\\/])(${UUID.source})\\.jsonl$`, 'i')

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Every rule each line breaks, each once, in rule order. */
export function findLeaks(text: string, personal: Personal): Leak[] {
  const ids = new Set(personal.ids.map((id) => id.toLowerCase()))
  const names = personal.names.length
    ? new RegExp(`\\b(?:${personal.names.map(escape).join('|')})\\b`, 'i')
    : undefined
  const rules: [string, (line: string) => boolean][] = [
    [
      'user folder',
      (l) => [...l.matchAll(USER_FOLDER)].some((m) => !FICTIONAL_USERS.has(m[1]!.toLowerCase())),
    ],
    ['email', (l) => [...l.matchAll(EMAIL)].some((m) => !ALLOWED_EMAIL.test(m[0]))],
    ['token', (l) => TOKEN.test(l)],
    ['username', (l) => names?.test(l) ?? false],
    ['session id', (l) => [...l.matchAll(UUID_WORD)].some((m) => ids.has(m[0].toLowerCase()))],
  ]
  return text
    .split(/\r?\n/)
    .flatMap((line, i) => rules.filter(([, breaks]) => breaks(line)).map(([rule]) => ({ line: i + 1, rule })))
}

/** Ids of the Claude Code sessions on this machine, from transcript file names (never their contents). */
function localSessionIds(): string[] {
  try {
    return readdirSync(join(homedir(), '.claude', 'projects'), { recursive: true, encoding: 'utf8' })
      .map((path) => TRANSCRIPT.exec(path)?.[1])
      .filter((id): id is string => !!id)
  } catch {
    return [] // no Claude Code here (as in CI)
  }
}

/** Scans every tracked text file of the repository this runs in. */
export function scanRepo(): (Leak & { file: string })[] {
  const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' })
  const root = git('rev-parse', '--show-toplevel').trim()
  const personal: Personal = { names: [userInfo().username], ids: localSessionIds() }
  return git('-C', root, 'ls-files', '-z')
    .split('\0')
    .filter(Boolean)
    .flatMap((file) => {
      const bytes = readFileSync(join(root, file))
      if (bytes.subarray(0, 8000).includes(0)) return [] // binary
      return findLeaks(bytes.toString('utf8'), personal).map((leak) => ({ file, ...leak }))
    })
}

if (import.meta.main) {
  const leaks = scanRepo()
  for (const { file, line, rule } of leaks) console.error(`${file}:${line}: ${rule}`)
  if (leaks.length) {
    console.error(
      `\n${leaks.length} possible leak${leaks.length === 1 ? '' : 's'}. Use fictional data instead.`,
    )
    process.exit(1)
  }
  console.log('privacy: clean')
}
