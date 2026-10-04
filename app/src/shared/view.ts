// Pure presentation rules shared by the window and its tests.
import type { AttentionItem, SessionSnapshot, StoreSnapshot } from './types'

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
  /** Short case number from the session id, e.g. "#289380". */
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
