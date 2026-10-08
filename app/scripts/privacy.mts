// npm run privacy: scans every tracked file for what must never be committed. Static rules catch
// real user folders, personal emails and tokens; what only this machine knows (the username, the
// ids of real Claude sessions) is gathered at run time and never written anywhere. npm test runs
// the same scan (test/privacy.test.ts), so it never depends on someone remembering this command.
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { homedir, userInfo } from 'node:os'
import { basename, join } from 'node:path'

/** What only this machine knows, gathered at run time and never written anywhere. */
export interface LocalIdentity {
  /** Local usernames and the profile folder name, matched as whole words. */
  names: readonly string[]
  /** Ids of real Claude Code sessions on this machine. */
  ids: readonly string[]
}

export type Rule = 'user folder' | 'email' | 'token' | 'username' | 'session id'

export interface Leak {
  line: number
  rule: Rule
}

/** The fictional people the docs and synthetic fixtures use in a user folder. */
const FICTIONAL_USERS = new Set(['bruce', 'alfred', 'public'])
// Each captures the user. Placeholders such as <you>, %USERNAME% or $HOME never match: a name
// stops at < % $.
const USER_FOLDERS = [
  // Windows, in any case and escaping: C:\Users\<you>, c:/users/<you>, C:\\Users\\<you>
  /\b[a-z]:[\\/]+users[\\/]+([^\\/\s"'`<>%$:]+)/gi,
  // macOS and Linux homes at a path root, wherever the path sits (file:///Users/<you>,
  // PATH=…:/home/<you>). Case-sensitive, so a web route such as /users/42 passes.
  /(?<![\w.~-])\/+(?:Users|home)\/+([^\\/\s"'`<>%$:]+)/g,
  // Claude Code's encoded project folders: C--Users-<you>-…, -Users-<you>-…, -home-<you>-…
  /(?:\b[A-Za-z]-|(?<![\w-]))-(?:Users|home)-([^-\\/\s"'`<>%$:]+)/g,
]
// Not after @2x. or @3x.: those are retina asset names (icon@2x.png).
const EMAIL = /[\w.%+-]+@(?!\d+x\.)[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/gi
/** Commit trailers, example addresses, and git@host, the SSH user of clone URLs. */
const ALLOWED_EMAIL =
  /^(?:noreply@anthropic\.com|[\w.+-]+@users\.noreply\.github\.com|[\w.+-]+@example\.(?:com|org)|git@[\w.-]+)$/i
/** npm writes the lockfile from the registry, copying in each package's deprecation notice. */
const NPM_LOCKFILE = /(?:^|\/)package-lock\.json$/
/** A deprecation notice: the package's own words, its author's address and all. */
const NPM_NOTICE = /^\s*"deprecated": "/
const TOKEN = new RegExp(
  [
    /sk-ant-[\w-]{16,}/, // Anthropic
    /gh[pousr]_\w{30,}|github_pat_\w{30,}/, // GitHub: personal, OAuth (gh auth token), app, refresh
    /npm_\w{36}/,
    /xox[abp]-[\w-]{10,}/, // Slack
    /AKIA[0-9A-Z]{16}/, // AWS
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  ]
    .map((re) => re.source)
    .join('|'),
)
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
const UUID_WORD = new RegExp(`\\b${UUID.source}\\b`, 'gi')
const TRANSCRIPT = new RegExp(`(?:^|[\\\\/])(${UUID.source})\\.jsonl$`, 'i')

/**
 * Account names that are also everyday words in code (containers run as root or node): matching
 * them would flag ordinary lines. Names under 4 letters are skipped for the same reason.
 */
const EVERYDAY_NAMES = new Set([
  'root',
  'node',
  'user',
  'admin',
  'guest',
  'owner',
  'test',
  'ubuntu',
  'vscode',
])

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Whether the line holds a match of `pattern` (a global regex) that is not allowed. */
const anyBut = (line: string, pattern: RegExp, allowed: (match: RegExpExecArray) => boolean) =>
  [...line.matchAll(pattern)].some((m) => !allowed(m))

/**
 * The scanner for one machine: built once, then run on each file (its path from the repository
 * root, which some rules skip). Returns every rule each line breaks, each once, in rule order.
 */
export function leakFinder(local: LocalIdentity): (text: string, file: string) => Leak[] {
  const ids = new Set(local.ids.map((id) => id.toLowerCase()))
  const own = local.names.filter((n) => n.length >= 4 && !EVERYDAY_NAMES.has(n.toLowerCase()))
  // Whole words in any script: \b alone treats an accented letter as a word boundary.
  const names = own.length
    ? new RegExp(`(?<![\\p{L}\\p{N}_])(?:${own.map(escapeRegExp).join('|')})(?![\\p{L}\\p{N}_])`, 'iu')
    : undefined
  const rules: [Rule, (line: string) => boolean][] = [
    [
      'user folder',
      (l) => USER_FOLDERS.some((re) => anyBut(l, re, (m) => FICTIONAL_USERS.has(m[1]!.toLowerCase()))),
    ],
    ['email', (l) => anyBut(l, EMAIL, (m) => ALLOWED_EMAIL.test(m[0]))],
    ['token', (l) => TOKEN.test(l)],
    ['username', (l) => names?.test(l) ?? false],
    ['session id', (l) => anyBut(l, UUID_WORD, (m) => !ids.has(m[0].toLowerCase()))],
  ]
  return (text, file) => {
    const lockfile = NPM_LOCKFILE.test(file)
    const spared = (rule: Rule, line: string) => lockfile && rule === 'email' && NPM_NOTICE.test(line)
    return text
      .split(/\r?\n/)
      .flatMap((line, i) =>
        rules
          .filter(([rule, breaks]) => !spared(rule, line) && breaks(line))
          .map(([rule]) => ({ line: i + 1, rule })),
      )
  }
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

/** A file's text, or undefined when it is binary, gone from disk or not a file (a submodule). */
function readText(path: string): string | undefined {
  try {
    if (!statSync(path).isFile()) return undefined
  } catch {
    return undefined // deleted, not yet staged
  }
  const bytes = readFileSync(path)
  return bytes.subarray(0, 8000).includes(0) ? undefined : bytes.toString('utf8')
}

/**
 * Scans the text files of the repository this runs in: the tracked ones and the new ones not yet
 * added (the rules only this machine knows never reach CI, so they must see a file before git does).
 */
export function scanRepo(): (Leak & { file: string })[] {
  const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8' })
  const root = git('rev-parse', '--show-toplevel').trim()
  // The profile folder can differ from the account name (renamed or Microsoft accounts).
  const names = [userInfo().username, basename(homedir())]
  const findLeaks = leakFinder({ names, ids: localSessionIds() })
  return git('-C', root, 'ls-files', '-z', '--cached', '--others', '--exclude-standard')
    .split('\0')
    .filter(Boolean)
    .flatMap((file) => {
      const text = readText(join(root, file))
      return text === undefined ? [] : findLeaks(text, file).map((leak) => ({ file, ...leak }))
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
