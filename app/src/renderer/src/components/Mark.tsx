// A Theme's mark, if it has one (a medallion, after the chronicles the asylum's warden left round
// Arkham): over an empty list, and at the night report's end one a Case in the report's order, lit one
// after another once found, as the game lights a chronicle once it is deciphered.
import { motion } from 'motion/react'
import type { AttentionItem, SessionSnapshot } from '@shared/types'
import { THEMES } from '@shared/themes'
import { taskProgress } from '@shared/view'
import { useTheme } from '../theme'
import './Mark.css'

/**
 * A Case found: every task on its list done; or, with no list (most sessions keep none), its turn
 * over and nothing on it waiting for the user.
 */
export function found(session: SessionSnapshot, attention: AttentionItem[]): boolean {
  const { done, total } = taskProgress(session)
  if (total > 0) return done === total
  return session.status === 'idle' && !attention.some((a) => a.sessionId === session.sessionId)
}

export function EmptyMark() {
  return THEMES[useTheme()].mark ? <span className="empty__mark" aria-hidden /> : null
}

/** How long each found mark waits after the one before it to light. */
const LIGHT_EACH_S = 0.3

export function CaseMarks({ cases, attention }: { cases: SessionSnapshot[]; attention: AttentionItem[] }) {
  if (!THEMES[useTheme()].mark || cases.length === 0) return null
  let lit = 0
  return (
    <span className="report__marks" aria-hidden>
      {cases.map((s) =>
        found(s, attention) ? (
          <span key={s.sessionId} className="report__mark report__mark--lit">
            <motion.span
              className="report__light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: lit++ * LIGHT_EACH_S, duration: 0.5 }}
            />
          </span>
        ) : (
          <span key={s.sessionId} className="report__mark" />
        ),
      )}
    </span>
  )
}
