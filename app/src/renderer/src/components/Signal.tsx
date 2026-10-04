// The resting form: a Bat-Signal disc in the corner. News lights it and sends a notice card
// up its beam; a click on either opens the panel.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { diffNotices, isUrgent, NOTICE_STAMP, type Notice } from '@shared/notices'
import { advance, emptyQueue, enqueue, NOTICE_MS, silence } from '@shared/noticeQueue'
import type { StoreSnapshot } from '@shared/types'
import { batcave } from '../bridge'
import { CalmContext, useCalm, useIsCalm } from '../calm'
import { useSettings, useSnapshotState, useWindowMode } from '../hooks'
import { pulseAt, useLiveStyle } from '../ticker'
import { BatEmblem } from './BatEmblem'
import './Cards.css'
import './Signal.css'

/** Pointer travel (px) that turns a press on the disc into a drag instead of a click. */
const DRAG_THRESHOLD = 4

/** Turns snapshot changes into the notice card on screen, while the signal is the window showing. */
function useNotices(snapshot: StoreSnapshot, loaded: boolean, listening: boolean) {
  const [queue, setQueue] = useState(emptyQueue)
  const prev = useRef<StoreSnapshot | undefined>(undefined)

  useEffect(() => {
    if (!loaded) return // the empty placeholder is not a state to compare against
    const news = diffNotices(prev.current, snapshot)
    prev.current = snapshot
    if (listening && news.length) setQueue((q) => enqueue(q, news, Date.now()))
  }, [snapshot, loaded, listening])

  // Opening the panel silences the cards: the user is looking at everything already.
  const [wasListening, setWasListening] = useState(listening)
  if (wasListening !== listening) {
    setWasListening(listening)
    if (!listening) setQueue(silence)
  }

  const [hovered, setHovered] = useState(false)
  const showing = queue.showing
  useEffect(() => {
    if (!showing || hovered) return // a card being read stays out
    const timer = setTimeout(
      () => setQueue((q) => advance(q, Date.now())),
      Math.max(0, showing.since + NOTICE_MS - Date.now()),
    )
    return () => clearTimeout(timer)
  }, [showing, hovered])

  return { notice: showing?.notice, setHovered }
}

export function Signal() {
  const [snapshot, loaded] = useSnapshotState()
  const [settings, , settingsLoaded] = useSettings()
  const calm = useCalm(settings)
  const mode = useWindowMode()
  const { notice, setHovered } = useNotices(snapshot, loaded, mode === 'signal')

  // The window grows upward before a card comes out and shrinks back once it has left.
  useEffect(() => {
    if (notice) batcave.setNoticeOut(true)
  }, [notice])

  if (!settingsLoaded) return null
  const needsYou = snapshot.attention.length
  const urgent = notice ? isUrgent(notice.kind) : needsYou > 0

  return (
    <CalmContext value={calm}>
      <MotionConfig reducedMotion={calm ? 'always' : 'never'}>
        <main className="signal">
          <AnimatePresence onExitComplete={() => batcave.setNoticeOut(false)}>
            {notice && (
              <NoticeCard
                key={notice.key}
                notice={notice}
                onOpen={() => batcave.setMode('panel', notice.sessionId)}
                onHover={setHovered}
              />
            )}
          </AnimatePresence>
          <Disc
            lit={needsYou > 0 || !!notice}
            urgent={urgent}
            count={needsYou}
            onOpen={() => batcave.setMode('panel')}
          />
        </main>
      </MotionConfig>
    </CalmContext>
  )
}

function NoticeCard({
  notice,
  onOpen,
  onHover,
}: {
  notice: Notice
  onOpen: () => void
  onHover: (hovered: boolean) => void
}) {
  return (
    <motion.div
      className="notice-wrap"
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
    >
      <span className="notice__beam" aria-hidden />
      <button
        className={`notice${isUrgent(notice.kind) ? ' notice--urgent' : ''}`}
        onClick={onOpen}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        title="Open this case"
      >
        <span className="stamp">{NOTICE_STAMP[notice.kind]}</span>
        <strong className="notice__title">{notice.title}</strong>
        {notice.line && <span className="notice__line">{notice.line}</span>}
      </button>
    </motion.div>
  )
}

/** The disc: click to open the panel, drag to move it (a drag region would swallow the click). */
function Disc({
  lit,
  urgent,
  count,
  onOpen,
}: {
  lit: boolean
  urgent: boolean
  count: number
  onOpen: () => void
}) {
  const calm = useIsCalm()
  const halo = useLiveStyle<HTMLSpanElement>(lit && urgent && !calm, (el, now) => {
    el.style.opacity = now === null ? '' : pulseAt(now).toFixed(2)
  })
  const press = useRef<{ x: number; y: number } | null>(null)
  const dragged = useRef(false)

  return (
    <button
      className={`disc${lit ? ' disc--lit' : ''}${urgent ? ' disc--urgent' : ''}`}
      aria-label={count ? `Open Batcave: ${count} need${count === 1 ? 's' : ''} you` : 'Open Batcave'}
      title="Open Batcave · drag to move"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        press.current = { x: e.screenX, y: e.screenY }
        dragged.current = false
      }}
      onPointerMove={(e) => {
        const p = press.current
        if (!p) return
        const [dx, dy] = [e.screenX - p.x, e.screenY - p.y]
        if (!dragged.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
        dragged.current = true
        batcave.moveSignalBy(dx, dy)
        press.current = { x: e.screenX, y: e.screenY }
      }}
      onPointerUp={() => (press.current = null)}
      onClick={() => {
        if (!dragged.current) onOpen()
      }}
    >
      <span ref={halo} className="disc__halo" aria-hidden />
      <span className="disc__face">
        <BatEmblem size={46} title="" fill={lit ? '#050000' : 'var(--raised)'} />
      </span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            className="disc__count"
            initial={{ scale: 1.8, opacity: 0, rotate: -14 }}
            animate={{ scale: 1, opacity: 1, rotate: -6 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 22 }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
