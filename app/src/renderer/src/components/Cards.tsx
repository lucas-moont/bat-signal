import { motion, AnimatePresence } from 'motion/react'
import type { AttentionItem, SessionSnapshot } from '@shared/types'
import {
  ALERT_INK,
  attentionCopy,
  caseHeader,
  folderName,
  LIVE_STATUS_LABEL,
  orderCases,
  relativeTime,
} from '@shared/view'
import { BatClawd } from './BatClawd'
import { Beat, Glow } from './Live'
import { TerminalButton } from './TerminalButton'
import './Cards.css'

function Empty({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="empty">
      <BatClawd mood="sleeping" size={72} />
      <p className="empty__title">{title}</p>
      <p className="empty__hint">{hint}</p>
    </div>
  )
}

/** Cards that glow: the blocked work the pen presses hardest on. */
const URGENT = new Set(
  (Object.keys(ALERT_INK) as AttentionItem['kind'][]).filter((k) => ALERT_INK[k] === 'hot'),
)

const listMotion = (index: number) => ({
  layout: true,
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay: Math.min(index, 8) * 0.045, duration: 0.28 } },
  exit: { opacity: 0, x: 24, transition: { duration: 0.18 } },
})

export function AttentionList({
  items,
  sessions,
  now,
  onOpen,
}: {
  items: AttentionItem[]
  sessions: SessionSnapshot[]
  now: Date
  onOpen: (item: AttentionItem) => void
}) {
  if (!items.length) {
    return <Empty title="All quiet in Gotham." hint="Nothing needs you right now." />
  }
  return (
    <ul className="cards">
      <AnimatePresence>
        {items.map((item, i) => {
          const session = sessions.find((s) => s.sessionId === item.sessionId)
          const { stamp, line } = attentionCopy(item)
          return (
            <motion.li
              key={`${item.sessionId}:${item.kind}:${item.taskId ?? ''}`}
              className="card-slot"
              {...listMotion(i)}
            >
              <button
                className={`card card--attention card--${item.kind}${URGENT.has(item.kind) ? ' card--urgent' : ''}`}
                onClick={() => onOpen(item)}
              >
                {URGENT.has(item.kind) && <Glow />}
                <span className="card__top">
                  <span className="stamp">{stamp}</span>
                  <span className="card__time">{relativeTime(item.at, now)}</span>
                </span>
                <span className="card__title">{session ? caseHeader(session).title : 'Unknown case'}</span>
                <span className="card__detail">{line}</span>
              </button>
              <TerminalButton sessionId={item.sessionId} className="card__terminal" />
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}

export function CaseList({
  sessions,
  attention,
  now,
  onOpen,
}: {
  sessions: SessionSnapshot[]
  attention: AttentionItem[]
  now: Date
  onOpen: (sessionId: string) => void
}) {
  if (!sessions.length) {
    return <Empty title="No open cases." hint="Start Claude Code in a terminal and it shows up here." />
  }
  return (
    <ul className="cards">
      <AnimatePresence>
        {orderCases(sessions, attention).map((s, i) => {
          const { number, title, progress } = caseHeader(s)
          const needsYou = attention.some((a) => a.sessionId === s.sessionId)
          const status = needsYou ? 'alert' : s.status
          return (
            <motion.li key={s.sessionId} className="card-slot" {...listMotion(i)}>
              <button
                className={`card card--case${needsYou ? ' card--urgent' : ''}`}
                onClick={() => onOpen(s.sessionId)}
              >
                {needsYou && <Glow />}
                <span className="card__top">
                  <span className="case-number">Case {number}</span>
                  <span className={`status status--${status}`}>
                    {status === 'alert' ? (
                      <Glow className="status__dot" />
                    ) : (
                      <Beat beating={status === 'busy'} className="status__dot" />
                    )}
                    {needsYou ? 'Needs you' : LIVE_STATUS_LABEL[s.status]}
                  </span>
                </span>
                <span className="card__title">{title}</span>
                {progress && (
                  <span className="progress" aria-label={`${progress.label} tasks done`}>
                    <span className="progress__track">
                      <motion.span
                        className="progress__fill"
                        initial={false}
                        animate={{ width: `${(progress.done / progress.total) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                      />
                    </span>
                    <span className="progress__label">{progress.label}</span>
                  </span>
                )}
                <span className="card__meta">
                  {s.cwd && <span className="card__cwd">{folderName(s.cwd)}</span>}
                  <span className="card__time">{relativeTime(s.lastActivityAt, now)}</span>
                </span>
              </button>
              <TerminalButton sessionId={s.sessionId} className="card__terminal" />
            </motion.li>
          )
        })}
      </AnimatePresence>
    </ul>
  )
}
