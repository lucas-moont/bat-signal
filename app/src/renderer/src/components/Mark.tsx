// A Theme's mark, if it has one (SILENT PREDATOR's medallion, after the chronicles the asylum's
// warden left round Arkham): over an empty list, and at the night report's end one a Case, found
// (lit) once every task on it is done, as the game lights a chronicle once it is deciphered.
import type { SessionSnapshot } from '@shared/types'
import { THEMES } from '@shared/themes'
import { useTheme } from '../theme'
import './Mark.css'

/** Every task on a Case done, and at least one: a Case with no tasks is not found. */
const done = ({ tasks }: SessionSnapshot) => tasks.length > 0 && tasks.every((t) => t.status === 'completed')

export function EmptyMark() {
  return THEMES[useTheme()].mark ? <span className="empty__mark" aria-hidden /> : null
}

export function CaseMarks({ sessions }: { sessions: SessionSnapshot[] }) {
  if (!THEMES[useTheme()].mark || sessions.length === 0) return null
  return (
    <span className="report__marks" aria-hidden>
      {sessions.map((s) => (
        <span key={s.sessionId} className={done(s) ? 'report__mark report__mark--lit' : 'report__mark'} />
      ))}
    </span>
  )
}
