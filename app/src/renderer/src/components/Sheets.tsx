import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { OPACITY_MAX, OPACITY_MIN, type Settings, type SettingsPatch } from '@shared/settings'
import type { AppStatus } from '@shared/status'
import type { BackgroundJob, SessionSnapshot, Subagent, Task } from '@shared/types'
import { ago, RUN_STATUS_LABEL, TASK_STATUS_LABEL } from '@shared/view'
import type { SheetTarget } from './CaseDetail'
import { Icon } from './Icon'
import { Section } from './Section'
import { SettingRow } from './SettingRow'
import { ShortcutField } from './ShortcutField'
import './Sheets.css'

/** A drawer that rises from the bottom over a dimmed backdrop. */
function Sheet({
  title,
  kicker,
  onClose,
  children,
}: {
  title: string
  kicker: string
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
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 420, damping: 38 }}
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
              <span className="card__time">{ago(h.at, now)}</span>
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
      <Timing started={agent.startedAt} ended={agent.endedAt} endedWord="finished" now={now} />
    </>
  )
}

/** "Started 3m ago · finished just now", skipping times that are missing. */
function Timing({
  started,
  ended,
  endedWord,
  now,
}: {
  started: string
  ended?: string
  endedWord: string
  now: Date
}) {
  const parts = [
    ago(started, now) && `Started ${ago(started, now)}`,
    ended && ago(ended, now) && `${endedWord} ${ago(ended, now)}`,
  ].filter(Boolean)
  return parts.length ? <Field label="Timing">{parts.join(' · ')}</Field> : null
}

function JobBody({ job, now }: { job: BackgroundJob; now: Date }) {
  return (
    <>
      <Field label="Command" mono>
        {job.command}
      </Field>
      <Timing started={job.startedAt} ended={job.endedAt} endedWord="ended" now={now} />
    </>
  )
}

interface SheetContent {
  kicker: string
  title: string
  body: ReactNode
}

/** What the drawer shows for a target, or nothing if it is gone from the session. */
function resolve(session: SessionSnapshot, { kind, id }: SheetTarget, now: Date): SheetContent | undefined {
  switch (kind) {
    case 'task': {
      const task = session.tasks.find((t) => t.id === id)
      return (
        task && {
          kicker: `Task ${task.id} · ${TASK_STATUS_LABEL[task.status]}`,
          title: task.subject,
          body: <TaskBody task={task} now={now} />,
        }
      )
    }
    case 'subagent': {
      const agent = session.subagents.find((a) => a.toolUseId === id)
      return (
        agent && {
          kicker: `Subagent · ${RUN_STATUS_LABEL[agent.status]}`,
          title: agent.description,
          body: <SubagentBody agent={agent} now={now} />,
        }
      )
    }
    case 'job': {
      const job = session.background.find((j) => j.id === id)
      return (
        job && {
          kicker: `Background · ${RUN_STATUS_LABEL[job.status]}`,
          title: job.description ?? job.command,
          body: <JobBody job={job} now={now} />,
        }
      )
    }
  }
}

/** The drawer for a task, subagent or background command of a session. */
export function DetailSheet({
  session,
  target,
  now,
  onClose,
}: {
  session: SessionSnapshot
  target: SheetTarget
  now: Date
  onClose: () => void
}) {
  const content = resolve(session, target, now)
  if (!content) return null
  return (
    <Sheet kicker={content.kicker} title={content.title} onClose={onClose}>
      {content.body}
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
    <SettingRow as="label" className="toggle" label={label} hint={hint}>
      <input type="checkbox" role="switch" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle__track" aria-hidden />
    </SettingRow>
  )
}

export function SettingsSheet({
  settings,
  status,
  onChange,
  onClose,
}: {
  settings: Settings
  status: AppStatus
  onChange: (patch: SettingsPatch) => void
  onClose: () => void
}) {
  return (
    <Sheet kicker="Bat-Computer" title="Settings" onClose={onClose}>
      <div className="settings">
        <Section title="Look">
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
            label="Night report"
            hint="Read the panel as one typed report instead of case files"
            on={settings.layout === 'report'}
            onChange={(on) => onChange({ layout: on ? 'report' : 'files' })}
          />
          <Toggle
            label="Always on top"
            hint="Keep the window above everything else"
            on={settings.alwaysOnTop}
            onChange={(alwaysOnTop) => onChange({ alwaysOnTop })}
          />
          <label className="slider">
            <span className="setting__label">Opacity</span>
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
        </Section>
        <Section title="Comfort">
          <ShortcutField status={status.shortcut} onChange={(shortcut) => onChange({ shortcut })} />
        </Section>
      </div>
    </Sheet>
  )
}
