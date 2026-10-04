import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { OPACITY_MAX, OPACITY_MIN, type Settings } from '@shared/settings'
import type { BackgroundJob, SessionSnapshot, Subagent, Task } from '@shared/types'
import { relativeTime, TASK_STATUS_LABEL } from '@shared/view'
import type { SheetTarget } from './CaseDetail'
import { Icon } from './Icon'
import './Sheets.css'

/** A drawer that rises from the bottom over a dimmed backdrop. */
export function Sheet({
  title,
  kicker,
  calm,
  onClose,
  children,
}: {
  title: string
  kicker: string
  calm: boolean
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="sheet-layer" role="dialog" aria-modal aria-label={title}>
      <motion.div
        className="sheet-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: calm ? 0 : 0.2 }}
      />
      <motion.div
        className="sheet"
        initial={calm ? { y: 0 } : { y: '100%' }}
        animate={{ y: 0 }}
        exit={calm ? { opacity: 0 } : { y: '100%' }}
        transition={calm ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }}
      >
        <div className="sheet__grip" aria-hidden />
        <div className="sheet__head">
          <div className="sheet__titles">
            <span className="case-number">{kicker}</span>
            <h2 className="sheet__title">{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
      </motion.div>
    </div>
  )
}

function Field({ label, children, mono }: { label: string; children: ReactNode; mono?: boolean }) {
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      <div className={`field__value${mono ? ' field__value--mono' : ''}`}>{children}</div>
    </div>
  )
}

function TaskBody({ task, now }: { task: Task; now: Date }) {
  return (
    <>
      {task.description && <Field label="Brief">{task.description}</Field>}
      {task.activeForm && task.status === 'in_progress' && <Field label="Right now">{task.activeForm}</Field>}
      <Field label="Timeline">
        <ol className="timeline">
          {[...task.history].reverse().map((h, i) => (
            <li key={`${h.at}:${i}`} className={`timeline__step timeline__step--${h.status}`}>
              <span className="timeline__what">{TASK_STATUS_LABEL[h.status]}</span>
              <span className="card__time">{relativeTime(h.at, now)} ago</span>
            </li>
          ))}
        </ol>
      </Field>
    </>
  )
}

function SubagentBody({ agent, now }: { agent: Subagent; now: Date }) {
  return (
    <>
      <Field label="Type">
        <span className="chip">{agent.agentType}</span>
      </Field>
      {agent.lastMessage && <Field label="Latest word">{agent.lastMessage}</Field>}
      {agent.summary && <Field label="Outcome">{agent.summary}</Field>}
      {agent.prompt && (
        <Field label="Orders" mono>
          {agent.prompt}
        </Field>
      )}
      <Field label="Timing">
        Started {relativeTime(agent.startedAt, now)} ago
        {agent.endedAt && ` · finished ${relativeTime(agent.endedAt, now)} ago`}
      </Field>
    </>
  )
}

function JobBody({ job, now }: { job: BackgroundJob; now: Date }) {
  return (
    <>
      <Field label="Command" mono>
        {job.command}
      </Field>
      <Field label="Timing">
        Started {relativeTime(job.startedAt, now)} ago
        {job.endedAt && ` · ended ${relativeTime(job.endedAt, now)} ago`}
      </Field>
    </>
  )
}

/** The drawer for a task, subagent or background command of a session. */
export function DetailSheet({
  session,
  target,
  now,
  calm,
  onClose,
}: {
  session: SessionSnapshot
  target: SheetTarget
  now: Date
  calm: boolean
  onClose: () => void
}) {
  if (target.kind === 'task') {
    const task = session.tasks.find((t) => t.id === target.id)
    if (!task) return null
    return (
      <Sheet
        kicker={`Task ${task.id} · ${TASK_STATUS_LABEL[task.status]}`}
        title={task.subject}
        calm={calm}
        onClose={onClose}
      >
        <TaskBody task={task} now={now} />
      </Sheet>
    )
  }
  if (target.kind === 'subagent') {
    const agent = session.subagents.find((a) => a.toolUseId === target.id)
    if (!agent) return null
    return (
      <Sheet kicker={`Subagent · ${agent.status}`} title={agent.description} calm={calm} onClose={onClose}>
        <SubagentBody agent={agent} now={now} />
      </Sheet>
    )
  }
  const job = session.background.find((j) => j.id === target.id)
  if (!job) return null
  return (
    <Sheet
      kicker={`Background · ${job.status}`}
      title={job.description ?? job.command}
      calm={calm}
      onClose={onClose}
    >
      <JobBody job={job} now={now} />
    </Sheet>
  )
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string
  hint: string
  on: boolean
  onChange: (on: boolean) => void
}) {
  return (
    <label className="toggle">
      <span className="toggle__text">
        <span className="toggle__label">{label}</span>
        <span className="toggle__hint">{hint}</span>
      </span>
      <input type="checkbox" role="switch" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle__track" aria-hidden />
    </label>
  )
}

export function SettingsSheet({
  settings,
  calm,
  onChange,
  onClose,
}: {
  settings: Settings
  calm: boolean
  onChange: (patch: Partial<Settings>) => void
  onClose: () => void
}) {
  return (
    <Sheet kicker="Bat-Computer" title="Settings" calm={calm} onClose={onClose}>
      <Toggle
        label="Animations"
        hint="Intro, flying mascot, typewriter and transitions"
        on={settings.animations}
        onChange={(animations) => onChange({ animations })}
      />
      <Toggle
        label="Rain"
        hint="Gotham weather behind the cases"
        on={settings.rain}
        onChange={(rain) => onChange({ rain })}
      />
      <Toggle
        label="Always on top"
        hint="Keep the window above everything else"
        on={settings.alwaysOnTop}
        onChange={(alwaysOnTop) => onChange({ alwaysOnTop })}
      />
      <label className="slider">
        <span className="toggle__label">Opacity</span>
        <input
          type="range"
          min={OPACITY_MIN * 100}
          max={OPACITY_MAX * 100}
          step={5}
          value={Math.round(settings.opacity * 100)}
          onChange={(e) => onChange({ opacity: Number(e.target.value) / 100 })}
        />
        <span className="card__time">{Math.round(settings.opacity * 100)}%</span>
      </label>
    </Sheet>
  )
}
