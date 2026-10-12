// The Theme picker, at the top of the settings sheet's Look section: each Theme a case-file folder
// in a drawer that slides sideways, wearing its own Theme (its Bat-Clawd, its stamp word in its
// Alarm ink, its name and the film it follows). A radio group: a click or the arrows pick, and the
// panel re-dresses at once.
import { useEffect, useId, useRef, useState } from 'react'
import { THEME_IDS, wordsOf, type ThemeId } from '@shared/themes'
import { CalmContext, useIsCalm } from '../calm'
import { loadFonts } from '../styles/themes/fonts'
import { Previewing, useLexicon } from '../theme'
import { useWords } from '../words'
import { BatClawd } from './BatClawd'
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
  const lexicon = useLexicon()
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
    <div className="theme-picker">
      <span className="setting__text">
        <span id={labelId} className="setting__label">
          {say.label}
        </span>
        <span className="setting__hint">{say.hint}</span>
      </span>
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
        {THEME_IDS.map((id) => {
          const worn = id === theme
          const { terms, voice } = wordsOf(id, lexicon)
          return (
            <button
              key={id}
              ref={(el) => {
                if (el) folders.current.set(id, el)
                else folders.current.delete(id)
              }}
              type="button"
              role="radio"
              aria-checked={worn}
              tabIndex={worn ? 0 : -1}
              data-theme={id}
              className={`folder${worn ? ' folder--worn' : ''}${stamped === id ? ' folder--stamped' : ''}`}
              onClick={() => pick(id)}
              onAnimationEnd={() => setStamped(null)}
            >
              <span className="folder__preview" aria-hidden="true">
                {/* Its own Theme's suit, still: its Signature pose's final step, or flying without one. */}
                <Previewing theme={id}>
                  <CalmContext value={true}>
                    <BatClawd mood="flying" size={58} reveal />
                  </CalmContext>
                </Previewing>
                <span className="stamp">{terms.stamp.permission}</span>
              </span>
              <span className="folder__name">{voice.theme.name}</span>
              <span className="folder__credit">{say.credit(voice.theme.film)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
