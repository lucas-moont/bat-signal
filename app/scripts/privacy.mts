// npm run privacy: scans every tracked file for what must never be committed. Static rules catch
// real user folders, personal emails and tokens; what only this machine knows (the username, the
// ids of real Claude sessions) is gathered at run time and never written anywhere.
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
  file: string
  line: number
  rule: string
}

/** The people (and placeholders) the docs and synthetic fixtures may use in a user folder. */
const FICTIONAL_USERS = new Set([
  'bruce',
  'alfred',
  'wayne',
  'you',
  'user',
  'username',
  'me',
  'public',
  'default',
])
const USER_FOLDER = /(?:\b[a-z]:|^|[\s"'`(=])(?:\\+|\/)(?:users|home)(?:\\+|\/)([^\\/\s"'`<>%$]+)/gi
const EMAIL = /[\w.%+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/gi
const ALLOWED_EMAIL =
  /^(?:noreply@anthropic\.com|[\w.+-]+@users\.noreply\.github\.com|[\w.+-]+@example\.(?:com|org))$/i
const TOKEN = /sk-ant-[\w-]{16,}|ghp_\w{30,}|github_pat_\w{30,}|xox[abp]-[\w-]{10,}|AKIA[0-9A-Z]{16}/
const UUID = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi

/** A test of this check marks its first line with this, so its made-up leaks are not reported. */
export const SYNTHETIC_MARK = 'privacy-check: synthetic leaks'

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Every rule a line breaks, each once, in rule order. */
export function findLeaks(file: string, text: string, personal: Personal): Leak[] {
  if (text.split('\n', 1)[0]!.includes(SYNTHETIC_MARK)) return []
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
    ['session id', (l) => [...l.matchAll(UUID)].some((m) => ids.has(m[0].toLowerCase()))],
  ]
  return text
    .split(/\r?\n/)
    .flatMap((line, i) =>
      rules.filter(([, breaks]) => breaks(line)).map(([rule]) => ({ file, line: i + 1, rule })),
    )
}

/** Ids of the Claude Code sessions on this machine, from transcript file names (never their contents). */
function localSessionIds(): string[] {
  const projects = join(homedir(), '.claude', 'projects')
  try {
    return readdirSync(projects).flatMap((dir) => {
      try {
        return readdirSync(join(projects, dir))
          .map((name) => /^([0-9a-f-]{36})\.jsonl$/i.exec(name)?.[1])
          .filter((id): id is string => !!id)
      } catch {
        return []
      }
    })
  } catch {
    return []
  }
}

function main(): void {
  const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' })
  const root = git('rev-parse', '--show-toplevel').trim()
  const personal: Personal = { names: [userInfo().username], ids: localSessionIds() }
  const leaks = git('-C', root, 'ls-files', '-z')
    .split('\0')
    .filter(Boolean)
    .flatMap((file) => {
      const bytes = readFileSync(join(root, file))
      if (bytes.subarray(0, 8000).includes(0)) return [] // binary
      return findLeaks(file, bytes.toString('utf8'), personal)
    })
  for (const { file, line, rule } of leaks) console.error(`${file}:${line}: ${rule}`)
  if (leaks.length) {
    console.error(
      `\n${leaks.length} possible leak${leaks.length === 1 ? '' : 's'}. Use fictional data instead.`,
    )
    process.exit(1)
  }
  console.log('privacy: clean')
}

if (import.meta.main) main()
