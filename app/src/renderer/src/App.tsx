import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import type { AttentionItem } from '@shared/types'
import { mascotMood } from '@shared/view'
import { batcave } from './bridge'
import { Atmosphere } from './components/Atmosphere'
import { BatSignalIntro } from './components/BatSignalIntro'
import { AttentionList, CaseList } from './components/Cards'
import { CaseDetail, type SheetTarget } from './components/CaseDetail'
import { Header, Tabs, type Tab } from './components/Header'
import { Pill } from './components/Pill'
import { DetailSheet, SettingsSheet } from './components/Sheets'
import { useCalm, useNow, useSettings, useSnapshot, useWindowMode } from './hooks'
import './App.css'

export function App() {
  const snapshot = useSnapshot()
  const [settings, changeSettings] = useSettings()
  const calm = useCalm(settings)
  const now = useNow()

  const [intro, setIntro] = useState(true)
  const [mode, setMode] = useWindowMode()
  const [tab, setTab] = useState<Tab | null>(null)
  const [openCase, setOpenCase] = useState<string | null>(null)
  const [sheet, setSheet] = useState<SheetTarget | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const { sessions, attention } = snapshot
  // What counts as news for the rain: new alerts or new activity, not every snapshot push
  // (the main process re-sends an unchanged snapshot every minute for the clock).
  const activity = useMemo(
    () =>
      [
        ...attention.map((a) => `${a.sessionId}:${a.kind}:${a.at}`),
        ...sessions.map((s) => `${s.sessionId}:${s.status}:${s.lastActivityAt}`),
      ].join('|'),
    [attention, sessions],
  )
  const mood = mascotMood(snapshot)
  // Open on whatever matters: the needs-you list when something is waiting.
  const activeTab: Tab = tab ?? (attention.length ? 'needs' : 'cases')
  // A case that ends while open simply disappears: no session, no detail.
  const session = openCase ? sessions.find((s) => s.sessionId === openCase) : undefined

  const endIntro = useCallback(() => setIntro(false), [])
  const open = (sessionId: string, target: SheetTarget | null = null) => {
    setOpenCase(sessionId)
    setSheet(target)
    batcave.markSeen(sessionId)
  }
  const openAttention = (item: AttentionItem) =>
    open(item.sessionId, item.kind === 'stalled' && item.taskId ? { kind: 'task', id: item.taskId } : null)

  // Esc closes the top-most layer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (settingsOpen) setSettingsOpen(false)
      else if (sheet) setSheet(null)
      else if (openCase) setOpenCase(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen, sheet, openCase])

  if (mode === 'pill') {
    return <Pill needsYou={attention.length} mood={mood} calm={calm} onExpand={() => setMode('full')} />
  }

  return (
    <MotionConfig reducedMotion={calm ? 'always' : 'never'}>
      <main className="app">
        <Atmosphere rain={settings.rain && !calm} activity={activity} />
        <Header
          needsYou={attention.length}
          mood={mood}
          calm={calm}
          onSettings={() => setSettingsOpen(true)}
          onPill={() => setMode('pill')}
          onClose={batcave.closeWindow}
        />
        <Tabs
          tab={activeTab}
          counts={{ needs: attention.length, cases: sessions.length }}
          onChange={setTab}
        />

        <div className="stage">
          <div className="stage__scroll">
            {activeTab === 'needs' ? (
              <AttentionList
                items={attention}
                sessions={sessions}
                now={now}
                calm={calm}
                onOpen={openAttention}
              />
            ) : (
              <CaseList
                sessions={sessions}
                attention={attention}
                now={now}
                calm={calm}
                onOpen={(id) => open(id)}
              />
            )}
          </div>

          <AnimatePresence>
            {session && (
              <motion.div
                key="detail"
                className="stage__layer"
                initial={calm ? false : { x: '100%' }}
                animate={{ x: 0 }}
                exit={calm ? { opacity: 0 } : { x: '100%' }}
                transition={calm ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 36 }}
              >
                <CaseDetail
                  session={session}
                  attention={attention}
                  now={now}
                  calm={calm}
                  onBack={() => setOpenCase(null)}
                  onOpen={setSheet}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {session && sheet && (
              <DetailSheet
                key="sheet"
                session={session}
                target={sheet}
                now={now}
                calm={calm}
                onClose={() => setSheet(null)}
              />
            )}
            {settingsOpen && (
              <SettingsSheet
                key="settings"
                settings={settings}
                calm={calm}
                onChange={changeSettings}
                onClose={() => setSettingsOpen(false)}
              />
            )}
          </AnimatePresence>
        </div>

        {intro && !calm && <BatSignalIntro onDone={endIntro} />}
      </main>
    </MotionConfig>
  )
}
