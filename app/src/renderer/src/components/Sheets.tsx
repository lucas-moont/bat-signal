import { useEffect, useId, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  everyToast,
  NEWS_GROUPS,
  OPACITY_MAX,
  OPACITY_MIN,
  type NewsGroup,
  type Settings,
  type SettingsPatch,
  toastsOn,
} from '@shared/settings'
import type { AppStatus } from '@shared/status'
import type { BackgroundJob, SessionSnapshot, Subagent, Task } from '@shared/types'
import { ago, RUN_STATUS_LABEL, TASK_STATUS_LABEL } from '@shared/view'
import type { SheetTarget } from './CaseDetail'
import { batSignal } from '../bridge'
import { playCue } from '../cues'
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
  warn,
  on,
  onChange,
}: {
  label: string
  hint: string
  warn?: boolean
  on: boolean
  onChange: (on: boolean) => void
}) {
  return (
    <SettingRow as="label" className="toggle" label={label} hint={hint} warn={warn}>
      <input type="checkbox" role="switch" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span className="toggle__track" aria-hidden />
    </SettingRow>
  )
}

/**
 * One switch for every kind of news below it: on when all are, and a click from any other state
 * turns them all on (from all on, all off). Some on reads as a count, so it is never a mystery.
 */
function AllToasts({
  toast,
  onChange,
}: {
  toast: Settings['announce']['toast']
  onChange: (patch: SettingsPatch) => void
}) {
  const on = toastsOn(toast)
  const all = on === NEWS_GROUPS.length
  return (
    <Toggle
      label="All notifications"
      hint={on === 0 || all ? 'Every kind of news below' : `${on} of ${NEWS_GROUPS.length} on`}
      on={all}
      onChange={(next) => onChange(everyToast(next))}
    />
  )
}

/** A value from 0 to 1 set in steps of 5%, shown as a percentage; `children` sit at its end. */
function PercentSlider({
  label,
  min = 0,
  max = 1,
  value,
  onChange,
  children,
}: {
  label: string
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
  children?: ReactNode
}) {
  const id = useId()
  const percent = Math.round(value * 100)
  return (
    <div className="slider">
      <label className="setting__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min * 100}
        max={max * 100}
        step={5}
        value={percent}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
      />
      <span className="card__time">{percent}%</span>
      {children}
    </div>
  )
}

/** A Windows notification switch per kind of news (none while the panel is in front). */
const TOAST_SWITCHES: Record<NewsGroup, { label: string; hint: string }> = {
  needsYou: { label: 'Claude needs you', hint: 'A permission, an error or a question' },
  reply: { label: 'Reply ready', hint: 'Claude finished replying' },
  taskDone: { label: 'Task done', hint: 'A task checked off on a case' },
  sessions: { label: 'Case opened or closed', hint: 'A session starts or ends' },
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
  // What Windows has may have moved since (Task Manager): read it again as the sheet opens.
  useEffect(() => batSignal.refreshStatus(), [])
  const blocked = status.startup === 'blocked'
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
          <PercentSlider
            label="Opacity"
            min={OPACITY_MIN}
            max={OPACITY_MAX}
            value={settings.opacity}
            onChange={(opacity) => onChange({ opacity })}
          />
        </Section>
        <Section title="Comfort">
          <ShortcutField status={status.shortcut} onChange={(shortcut) => onChange({ shortcut })} />
          <Toggle
            label="Start with Windows"
            hint={
              blocked
                ? 'Turned off in Task Manager: switch it on here to allow it again'
                : 'Wakes as the disc when you sign in'
            }
            warn={blocked}
            on={status.startup === 'on'}
            onChange={batSignal.setStartWithWindows}
          />
        </Section>
        <Section title="Windows notifications">
          <AllToasts toast={settings.announce.toast} onChange={onChange} />
          <div className="toggle-group">
            {NEWS_GROUPS.map((group) => (
              <Toggle
                key={group}
                {...TOAST_SWITCHES[group]}
                on={settings.announce.toast[group]}
                onChange={(on) => onChange({ announce: { toast: { [group]: on } } })}
              />
            ))}
          </div>
        </Section>
        <Section title="Sound">
          <Toggle
            label="Sound"
            hint="A spotlight coming on when Claude needs you or replies"
            on={settings.announce.sound}
            onChange={(sound) => onChange({ announce: { sound } })}
          />
          <PercentSlider
            label="Volume"
            value={settings.announce.volume}
            onChange={(volume) => onChange({ announce: { volume } })}
          >
            <button
              className="icon-button icon-button--labelled"
              onClick={() => playCue('light', settings.announce.volume)}
              title="Play the spotlight at this volume"
            >
              <Icon name="sound" />
              Test
            </button>
          </PercentSlider>
        </Section>
      </div>
    </Sheet>
  )
}
