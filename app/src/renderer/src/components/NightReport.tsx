// The panel read as tonight's typed case report: what awaits your signature first, then one
// paragraph per case, its stamp in the margin. A case opens in place into margin notes.
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { AttentionItem, SessionSnapshot, TaskStatus } from '@shared/types'
import {
  caseHeader,
  folderName,
  LIVE_STATUS_LABEL,
  lastReply,
  orderCases,
  plainPreview,
  relativeTime,
  reportCopy,
  RUN_STATUS_LABEL,
  taskLabel,
} from '@shared/view'
import type { SheetTarget } from './CaseDetail'
import type { Tab } from './Header'
import { TerminalButton } from './TerminalButton'
import { Typewriter } from './Typewriter'
import './Cards.css'
import './NightReport.css'

/** Tasks as a typist marks them. */
const TYPED_BOX: Record<TaskStatus, string> = {
  pending: '[ ]',
  in_progress: '[>]',
  completed: '[x]',
  deleted: '[-]',
}

/** How hard the pen presses: blocked work in hot ink, waiting work softer, quiet work unmarked. */
const INK: Record<AttentionItem['kind'], 'hot' | 'soft' | 'none'> = {
  permission: 'hot',
  error: 'hot',
  waiting: 'soft',
  reply: 'soft',
  stalled: 'none',
}

/** Last words are quoted, not reprinted: a report keeps to one line of them. */
const QUOTE_CHARS = 150

const caseAnchor = (sessionId: string) => `report-case-${sessionId}`

const dateline = (now: Date) => {
  const part = (o: Intl.DateTimeFormatOptions) => now.toLocaleString('en-GB', o).toUpperCase()
  return `${part({ weekday: 'short' })} ${part({ day: '2-digit' })} ${part({ month: 'short' })} · ${part({
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`
}

const quote = (text: string) => {
  const plain = plainPreview(text)
  return plain.length > QUOTE_CHARS ? `${plain.slice(0, QUOTE_CHARS).trimEnd()}…` : plain
}

export function NightReport({
  tab,
  sessions,
  attention,
  now,
  openCase,
  onToggleCase,
  onOpenAlert,
  onOpenSheet,
}: {
  /** Which half of the report: what awaits your signature, or the case notes. */
  tab: Tab
  sessions: SessionSnapshot[]
  attention: AttentionItem[]
  now: Date
  /** The case opened in place, if any. */
  openCase: string | null
  onToggleCase: (sessionId: string) => void
  onOpenAlert: (item: AttentionItem) => void
  onOpenSheet: (sessionId: string, target: SheetTarget) => void
}) {
  // A case opened from elsewhere (a notice card, an alert line) is brought into view.
  useEffect(() => {
    if (openCase) document.getElementById(caseAnchor(openCase))?.scrollIntoView({ block: 'start' })
  }, [openCase])

  const titles = new Map(sessions.map((s) => [s.sessionId, caseHeader(s).title]))
  const waiting = new Set(attention.map((a) => a.sessionId))
  const cases = orderCases(sessions, attention)

  return (
    <article className="report">
      <header className="report__dateline">
        <h2 className="report__name">Night report</h2>
        <span className="report__date">{dateline(now)}</span>
      </header>

      {tab === 'needs' ? (
        <section className="report__section" aria-labelledby="report-signature">
          <h3 id="report-signature" className="report__heading">
            Awaiting your signature
          </h3>
          {attention.length === 0 ? (
            <p className="report__nil">Nothing awaits your signature. Every case can carry on without you.</p>
          ) : (
            <ul className="report__lines">
              {attention.map((item) => {
                const { stamp, sentence } = reportCopy(item)
                return (
                  <li key={`${item.sessionId}:${item.kind}:${item.taskId ?? ''}`} className="report__line">
                    <button className="entry" onClick={() => onOpenAlert(item)}>
                      <span className="entry__margin">
                        <span className={`stamp stamp--${INK[item.kind]}`}>{stamp}</span>
                        <span className="entry__age">{relativeTime(item.at, now)}</span>
                      </span>
                      <span className="entry__body">
                        <strong>{titles.get(item.sessionId) ?? 'An unknown case'}</strong>{' '}
                        <span className={`pen pen--${INK[item.kind]}`}>{sentence}</span>.
                      </span>
                    </button>
                    <TerminalButton sessionId={item.sessionId} className="report__terminal" />
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      ) : (
        <section className="report__section" aria-labelledby="report-cases">
          <h3 id="report-cases" className="report__heading">
            Case notes
          </h3>
          {cases.length === 0 ? (
            <p className="report__nil">
              No cases open. Start Claude Code in a terminal and its session is filed here.
            </p>
          ) : (
            <ol className="report__lines">
              {cases.map((s) => (
                <CaseParagraph
                  key={s.sessionId}
                  session={s}
                  needsYou={waiting.has(s.sessionId)}
                  open={openCase === s.sessionId}
                  onToggle={() => onToggleCase(s.sessionId)}
                  onOpenSheet={(target) => onOpenSheet(s.sessionId, target)}
                />
              ))}
            </ol>
          )}
        </section>
      )}

      <footer className="report__end">End of report.</footer>
    </article>
  )
}

function CaseParagraph({
  session,
  needsYou,
  open,
  onToggle,
  onOpenSheet,
}: {
  session: SessionSnapshot
  needsYou: boolean
  open: boolean
  onToggle: () => void
  onOpenSheet: (target: SheetTarget) => void
}) {
  const { number, title, progress } = caseHeader(session)
  const folder = folderName(session.cwd ?? '')
  const current = session.tasks.find((t) => t.status === 'in_progress')
  const said = lastReply(session)
  const status = needsYou ? 'Needs you' : LIVE_STATUS_LABEL[session.status]

  return (
    <li id={caseAnchor(session.sessionId)} className={`case${open ? ' case--open' : ''}`}>
      <button className="entry" onClick={onToggle} aria-expanded={open}>
        <span className="entry__margin">
          <span
            className={`stamp stamp--${needsYou ? 'hot' : session.status === 'busy' ? 'working' : 'none'}`}
          >
            {status}
          </span>
        </span>
        {/* Only what a glance needs; the case number, folder and last words wait inside. */}
        <span className="entry__body">
          <strong>{title}.</strong>
          {current && ` Now ${taskLabel(current).toLowerCase()}.`}
          {progress && ` ${progress.done} of ${progress.total} filed.`}
        </span>
      </button>
      <TerminalButton sessionId={session.sessionId} className="report__terminal" />

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="notes"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="notes__file">
              Case {number}
              {folder && `, ${folder}`}.
              {said && (
                <>
                  {' '}
                  Last word: “<Typewriter text={quote(said)} />”
                </>
              )}
            </p>
            <TerminalButton sessionId={session.sessionId} label="Terminal" className="notes__terminal" />
            <Notes session={session} onOpenSheet={onOpenSheet} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function Notes({
  session,
  onOpenSheet,
}: {
  session: SessionSnapshot
  onOpenSheet: (target: SheetTarget) => void
}) {
  const empty = !session.tasks.length && !session.subagents.length && !session.background.length
  if (empty) return <p className="notes__nil">No tasks, subagents or background work on file.</p>
  return (
    <div className="notes__body">
      {session.tasks.length > 0 && (
        <NoteGroup title="Tasks">
          {session.tasks.map((t) => (
            <NoteLine
              key={t.id}
              mark={TYPED_BOX[t.status]}
              done={t.status === 'completed'}
              live={t.status === 'in_progress'}
              onClick={() => onOpenSheet({ kind: 'task', id: t.id })}
            >
              {taskLabel(t)}
            </NoteLine>
          ))}
        </NoteGroup>
      )}
      {session.subagents.length > 0 && (
        <NoteGroup title="Subagents">
          {session.subagents.map((a) => (
            <NoteLine
              key={a.toolUseId}
              mark={a.agentType}
              done={a.status !== 'running'}
              live={a.status === 'running'}
              state={RUN_STATUS_LABEL[a.status]}
              onClick={() => onOpenSheet({ kind: 'subagent', id: a.toolUseId })}
            >
              {a.description}
            </NoteLine>
          ))}
        </NoteGroup>
      )}
      {session.background.length > 0 && (
        <NoteGroup title="In the background">
          {session.background.map((j) => (
            <NoteLine
              key={j.id}
              mark="$"
              done={j.status !== 'running'}
              live={j.status === 'running'}
              state={RUN_STATUS_LABEL[j.status]}
              onClick={() => onOpenSheet({ kind: 'job', id: j.id })}
            >
              {j.description ?? j.command}
            </NoteLine>
          ))}
        </NoteGroup>
      )}
    </div>
  )
}

function NoteGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="notes__group">
      <h4 className="notes__title">{title}</h4>
      <ul>{children}</ul>
    </section>
  )
}

function NoteLine({
  mark,
  done,
  live,
  state,
  onClick,
  children,
}: {
  mark: string
  done: boolean
  live: boolean
  state?: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <li>
      <button className={`note${done ? ' note--done' : ''}${live ? ' note--live' : ''}`} onClick={onClick}>
        <span className="note__mark">{mark}</span>
        <span className="note__text">{children}</span>
        {state && <span className="note__state">{state}</span>}
      </button>
    </li>
  )
}
