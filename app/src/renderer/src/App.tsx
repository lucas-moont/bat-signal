import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import type { AttentionItem } from '@shared/types'
import { mascotMood } from '@shared/view'
import { batSignal } from './bridge'
import { Atmosphere } from './components/Atmosphere'
import { BatSignalIntro } from './components/BatSignalIntro'
import { AttentionList, CaseList } from './components/Cards'
import { CaseDetail, sheetExists, type SheetTarget } from './components/CaseDetail'
import { Header, Tabs, type Tab } from './components/Header'
import { DetailSheet, SettingsSheet } from './components/Sheets'
import { CalmContext, useCalm } from './calm'
import { useNow, useSettings, useSnapshot } from './hooks'
import './App.css'

export function App() {
  const snapshot = useSnapshot()
  const [settings, changeSettings, settingsLoaded] = useSettings()
  const calm = useCalm(settings)
  const now = useNow()

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
  const fold = () => batSignal.setMode('signal')
  // Open on whatever matters: the needs-you list when something is waiting.
  const activeTab: Tab = tab ?? (attention.length ? 'needs' : 'cases')
  // A case that ends while open simply disappears: no session, no detail.
  const session = openCase ? sessions.find((s) => s.sessionId === openCase) : undefined
  // A drawer whose task, subagent or job left the session is gone too (and must not eat an Esc).
  const activeSheet = session && sheet && sheetExists(session, sheet) ? sheet : null

  const open = (sessionId: string, target: SheetTarget | null = null) => {
    setOpenCase(sessionId)
    setSheet(target)
    batSignal.markSeen(sessionId)
  }
  // A click on a notice card opens the panel on that case.
  const onFocusCase = useEffectEvent((sessionId: string) => open(sessionId))
  useEffect(() => batSignal.onFocusCase((sessionId) => onFocusCase(sessionId)), [])

  const openAttention = (item: AttentionItem) =>
    open(item.sessionId, item.kind === 'stalled' && item.taskId ? { kind: 'task', id: item.taskId } : null)

  // Esc closes the top-most layer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (settingsOpen) setSettingsOpen(false)
      else if (activeSheet) setSheet(null)
      else if (openCase) setOpenCase(null)
      else fold()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [settingsOpen, activeSheet, openCase])

  // Until the saved settings arrive (one IPC round trip), show the empty dark window rather
  // than flashing an intro or rain the user may have turned off.
  if (!settingsLoaded) return <main className="app" />

  return (
    <CalmContext value={calm}>
      <MotionConfig reducedMotion={calm ? 'always' : 'never'}>
        <main className="app">
          <Atmosphere rain={settings.rain && !calm} activity={activity} />
          <Header
            needsYou={attention.length}
            mood={mood}
            onSettings={() => setSettingsOpen(true)}
            onFold={fold}
            onClose={batSignal.closeWindow}
          />
          <Tabs
            tab={activeTab}
            counts={{ needs: attention.length, cases: sessions.length }}
            onChange={setTab}
          />

          <div className="stage">
            <div className="stage__scroll">
              {activeTab === 'needs' ? (
                <AttentionList items={attention} sessions={sessions} now={now} onOpen={openAttention} />
              ) : (
                <CaseList sessions={sessions} attention={attention} now={now} onOpen={(id) => open(id)} />
              )}
            </div>

            <AnimatePresence>
              {session && (
                <motion.div
                  key="detail"
                  className="stage__layer"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                >
                  <CaseDetail
                    session={session}
                    attention={attention}
                    now={now}
                    onBack={() => setOpenCase(null)}
                    onOpen={setSheet}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {session && activeSheet && (
                <DetailSheet
                  key="sheet"
                  session={session}
                  target={activeSheet}
                  now={now}
                  onClose={() => setSheet(null)}
                />
              )}
              {settingsOpen && (
                <SettingsSheet
                  key="settings"
                  settings={settings}
                  onChange={changeSettings}
                  onClose={() => setSettingsOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {!calm && <BatSignalIntro />}
        </main>
      </MotionConfig>
    </CalmContext>
  )
}
