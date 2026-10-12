// The Theme picker, at the top of the settings sheet's Look section: each Theme a case-file folder
// in a drawer that slides sideways, wearing its own Theme (its Bat-Clawd, its stamp word in its
// Alarm ink, its name and the film it follows). A radio group: a click or the arrows pick, and the
// panel re-dresses at once.
import { useEffect, useId, useRef, useState } from 'react'
import { THEME_IDS, type ThemeId } from '@shared/themes'
import { useIsCalm } from '../calm'
import { loadFonts } from '../styles/themes/fonts'
import { Previewing } from '../theme'
import { useWords } from '../words'
import { BatClawdStill } from './BatClawd'
import { SettingRow } from './SettingRow'
import './ThemePicker.css'

/** The Theme an arrow, Home or End moves to from `current` (round at the ends); none for another key. */
export function themeAfter<T>(ids: readonly T[], current: T, key: string): T | undefined {
  const i = ids.indexOf(current)
  const n = ids.length
  if (key === 'ArrowRight' || key === 'ArrowDown') return ids[(i + 1) % n]
  if (key === 'ArrowLeft' || key === 'ArrowUp') return ids[(i - 1 + n) % n]
  if (key === 'Home') return ids[0]
  if (key === 'End') return ids[n - 1]
  return undefined
}

export function ThemePicker({ theme, onChange }: { theme: ThemeId; onChange: (theme: ThemeId) => void }) {
  const say = useWords().voice.settings.theme
  const calm = useIsCalm()
  const labelId = useId()
  const folders = useRef(new Map<ThemeId, HTMLButtonElement>())
  // The folder just picked, whose stamp lands once.
  const [stamped, setStamped] = useState<ThemeId | null>(null)

  // Each folder speaks in its Theme's faces: load them as the picker opens.
  useEffect(() => {
    for (const id of THEME_IDS) void loadFonts(id)
  }, [])

  const pick = (id: ThemeId) => {
    const folder = folders.current.get(id)
    folder?.focus()
    folder?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    if (id === theme) return
    if (!calm) setStamped(id)
    onChange(id)
  }

  return (
    <SettingRow label={say.label} hint={say.hint} labelId={labelId} className="theme-picker">
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="theme-picker__drawer"
        onKeyDown={(e) => {
          const next = themeAfter(THEME_IDS, theme, e.key)
          if (next === undefined) return
          e.preventDefault()
          pick(next)
        }}
      >
        {THEME_IDS.map((id) => (
          // The folder reads as its Theme throughout: its words, its suit and (by data-theme) its colors.
          <Previewing key={id} theme={id}>
            <Folder
              id={id}
              worn={id === theme}
              stamped={stamped === id}
              credit={say.credit}
              onPick={() => pick(id)}
              onStamped={() => setStamped(null)}
              folderRef={(el) => {
                if (el) folders.current.set(id, el)
                else folders.current.delete(id)
              }}
            />
          </Previewing>
        ))}
      </div>
    </SettingRow>
  )
}

/** One Theme's folder, read inside its own Theme. */
function Folder({
  id,
  worn,
  stamped,
  credit,
  onPick,
  onStamped,
  folderRef,
}: {
  id: ThemeId
  worn: boolean
  stamped: boolean
  /** The credit line, in the page's own Voice: every folder is credited the same way. */
  credit: (film: string) => string
  onPick: () => void
  onStamped: () => void
  folderRef: (el: HTMLButtonElement | null) => void
}) {
  const { terms, voice } = useWords()
  return (
    <button
      ref={folderRef}
      type="button"
      role="radio"
      aria-checked={worn}
      tabIndex={worn ? 0 : -1}
      data-theme={id}
      className={`folder${worn ? ' folder--worn' : ''}${stamped ? ' folder--stamped' : ''}`}
      onClick={onPick}
      onAnimationEnd={onStamped}
    >
      <span className="folder__preview" aria-hidden="true">
        <BatClawdStill size={58} />
        <span className="stamp">{terms.stamp.permission}</span>
      </span>
      <span className="folder__name">{voice.theme.name}</span>
      <span className="folder__credit">{credit(voice.theme.film)}</span>
    </button>
  )
}
