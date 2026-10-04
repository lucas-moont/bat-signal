import type { ReactNode } from 'react'
import type { AttentionItem, RunStatus, SessionSnapshot, Task } from '@shared/types'
import { attentionCopy, caseHeader, plainPreview, relativeTime } from '@shared/view'
import { Icon } from './Icon'
import { Beat } from './Live'
import { Typewriter } from './Typewriter'
import './CaseDetail.css'

export type SheetTarget =
  { kind: 'task'; id: string } | { kind: 'subagent'; id: string } | { kind: 'job'; id: string }

const TASK_GLYPH: Record<Task['status'], string> = {
  pending: '○',
  in_progress: '◐',
  completed: '✓',
  deleted: '×',
}
const RUN_LABEL: Record<RunStatus, string> = {
  running: 'Running',
  completed: 'Done',
  failed: 'Failed',
  stopped: 'Stopped',
}

function Section({ title, aside, children }: { title: string; aside?: string; children: ReactNode }) {
  return (
    <section className="section">
      <h3 className="section__title">
        <span>{title}</span>
        {aside && <span className="section__aside">{aside}</span>}
      </h3>
      {children}
    </section>
  )
}

export function CaseDetail({
  session,
  attention,
  now,
  calm,
  onBack,
  onOpen,
}: {
  session: SessionSnapshot
  attention: AttentionItem[]
  now: Date
  calm: boolean
  onBack: () => void
  onOpen: (target: SheetTarget) => void
}) {
  const { number, title, progress } = caseHeader(session)
  const alerts = attention.filter((a) => a.sessionId === session.sessionId)
  const messages = session.messages.slice(-4)

  return (
    <div className="detail">
      <div className="detail__bar">
        <button className="icon-button" onClick={onBack} aria-label="Back to the list">
          <Icon name="back" />
        </button>
        <div className="detail__heading">
          <span className="case-number">Case {number}</span>
          <h2 className="detail__title">{title}</h2>
        </div>
      </div>

      <div className="detail__body">
        {alerts.map((a) => {
          const { stamp, line } = attentionCopy(a)
          return (
            <div key={`${a.kind}:${a.taskId ?? ''}`} className={`alert alert--${a.kind}`}>
              <span className="stamp">{stamp}</span>
              <span className="alert__line">{line}</span>
              <span className="card__time">{relativeTime(a.at, now)}</span>
            </div>
          )
        })}

        {session.tasks.length > 0 && (
          <Section title="Tasks" aside={progress?.label}>
            <ul className="rows">
              {session.tasks.map((t) => (
                <li key={t.id}>
                  <button
                    className={`row row--task row--${t.status}`}
                    onClick={() => onOpen({ kind: 'task', id: t.id })}
                  >
                    <Beat beating={t.status === 'in_progress' && !calm} strength={0.3} className="row__glyph">
                      {TASK_GLYPH[t.status]}
                    </Beat>
                    <span className="row__text">
                      {t.status === 'in_progress' ? (t.activeForm ?? t.subject) : t.subject}
                    </span>
                    <Icon name="chevron" size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {session.subagents.length > 0 && (
          <Section
            title="Subagents"
            aside={`${session.subagents.filter((a) => a.status === 'running').length} running`}
          >
            <ul className="rows">
              {session.subagents.map((a) => (
                <li key={a.toolUseId}>
                  <button
                    className={`row row--run row--${a.status}`}
                    onClick={() => onOpen({ kind: 'subagent', id: a.toolUseId })}
                  >
                    <span className="chip">{a.agentType}</span>
                    <span className="row__text">{a.description}</span>
                    <span className="row__state">{RUN_LABEL[a.status]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {session.background.length > 0 && (
          <Section title="In the background">
            <ul className="rows">
              {session.background.map((j) => (
                <li key={j.id}>
                  <button
                    className={`row row--run row--${j.status}`}
                    onClick={() => onOpen({ kind: 'job', id: j.id })}
                  >
                    <span className="row__text row__text--mono">{j.description ?? j.command}</span>
                    <span className="row__state">{RUN_LABEL[j.status]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {messages.length > 0 && (
          <Section title="Last words">
            <ol className="log">
              {messages.map((m, i) => (
                <li key={`${m.at}:${i}`} className={`log__entry log__entry--${m.role}`}>
                  <span className="log__who">{m.role === 'user' ? 'You' : 'Claude'}</span>
                  <span className="log__text">
                    {i === messages.length - 1 ? (
                      <Typewriter text={plainPreview(m.text)} calm={calm} />
                    ) : (
                      plainPreview(m.text)
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </div>
    </div>
  )
}
