// Pure presentation rules shared by the window and its tests.
import type {
  AttentionItem,
  LiveStatus,
  RunStatus,
  SessionSnapshot,
  StoreSnapshot,
  TaskStatus,
} from './types'

export type MascotMood = 'sleeping' | 'flying' | 'alarmed'

/** How Bat-Clawd should look given everything Batcave knows. */
export function mascotMood({ sessions, attention }: StoreSnapshot): MascotMood {
  if (attention.some((a) => a.kind === 'permission' || a.kind === 'error')) return 'alarmed'
  return sessions.some((s) => s.status === 'busy') ? 'flying' : 'sleeping'
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Compact age of a timestamp: "now", "2m", "3h", "1d". Empty for missing or invalid times. */
export function relativeTime(iso: string | undefined, now: Date): string {
  const at = iso ? Date.parse(iso) : NaN
  if (Number.isNaN(at)) return ''
  const age = now.getTime() - at
  if (age < MINUTE) return 'now'
  if (age < HOUR) return `${Math.floor(age / MINUTE)}m`
  if (age < DAY) return `${Math.floor(age / HOUR)}h`
  return `${Math.floor(age / DAY)}d`
}

export interface CardCopy {
  /** The red stamp on the card. */
  stamp: string
  /** One line saying what it is about. */
  line: string
}

const humanize = (code: string): string => {
  const words = code.replace(/[_-]+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/** The stamp and detail line of a needs-you card. */
export function attentionCopy(item: AttentionItem): CardCopy {
  switch (item.kind) {
    case 'permission':
      return {
        stamp: 'Permission',
        line: [item.toolName ?? 'A tool', item.detail].filter(Boolean).join(' · '),
      }
    case 'error':
      return { stamp: 'Error', line: item.detail ? humanize(item.detail) : 'The turn failed' }
    case 'waiting':
      return { stamp: 'Waiting', line: 'Claude is waiting for you' }
    case 'reply':
      return { stamp: 'New reply', line: 'Claude finished replying' }
    case 'stalled':
      return { stamp: 'Stalled', line: item.detail ? `No news on “${item.detail}”` : 'A task has gone quiet' }
  }
}

export interface CaseHeader {
  /** Short case number from the session id, e.g. "#b47c0d". */
  number: string
  title: string
  progress?: { done: number; total: number; label: string }
}

/** How a session is introduced on its card. */
export function caseHeader(session: SessionSnapshot): CaseHeader {
  const done = session.tasks.filter((t) => t.status === 'completed').length
  const total = session.tasks.length
  return {
    number: `#${session.sessionId.replace(/[^a-z0-9]/gi, '').slice(0, 6)}`,
    title: session.title ?? session.name ?? 'Untitled case',
    progress: total ? { done, total, label: `${done}/${total}` } : undefined,
  }
}

/**
 * Claude's markdown as a one-line preview: formatting marks removed, lines joined with " · ".
 * For short previews only; it doesn't try to be a full markdown parser.
 */
export function plainPreview(markdown: string): string {
  // Cards show a line or two: only clean the start of a reply that may be several KB.
  const long = markdown.length > PREVIEW_READ
  const preview = markdown
    .slice(0, PREVIEW_READ)
    .split('\n')
    .map((line) =>
      line
        .replace(/^\s*```.*$/, '') // code fence lines
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+[.)])\s+/, '') // headings, quotes, list markers
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links and images keep their text
        // Code spans are kept verbatim (my_var, __init__.py, **kwargs); only prose loses emphasis.
        .split(/(`[^`]*`)/)
        .map((part) => (part.startsWith('`') ? part.slice(1, -1) : stripEmphasis(part)))
        .join('')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean)
    .join(' · ')
  return long || preview.length > PREVIEW_MAX ? preview.slice(0, PREVIEW_MAX).trimEnd() + '…' : preview
}

/**
 * Removes **bold** and *italic* marks only where they hug a word from outside, so snake_case
 * names and arithmetic like "2 * 3" stay as written.
 */
const stripEmphasis = (text: string): string =>
  text
    .replace(/(^|[^\w*])(\*\*|__)(?=\S)(.+?)(?<=\S)\2(?![\w*])/g, '$1$3')
    .replace(/(^|[^\w*])([*_])(?=\S)(.+?)(?<=\S)\2(?![\w*])/g, '$1$3')

const PREVIEW_READ = 600
const PREVIEW_MAX = 280

/** How each status reads in the window, so a list row and its drawer always agree. */
export const LIVE_STATUS_LABEL: Record<LiveStatus, string> = { busy: 'Working', idle: 'Idle', shell: 'Shell' }
export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  pending: 'Pending',
  in_progress: 'In progress',
  completed: 'Completed',
  deleted: 'Deleted',
}
export const TASK_GLYPH: Record<TaskStatus, string> = {
  pending: '○',
  in_progress: '◐',
  completed: '✓',
  deleted: '×',
}
export const RUN_STATUS_LABEL: Record<RunStatus, string> = {
  running: 'Running',
  completed: 'Done',
  failed: 'Failed',
  stopped: 'Stopped',
}
