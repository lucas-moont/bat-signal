// One slow clock for every looping effect.
//
// An infinite CSS animation keeps Chromium's compositor producing 60 frames a second for as
// long as it exists, even when stepped or GPU-only: that alone cost ~10% of a core per loop.
// Instead, loops are sampled a few times a second from a single timer, and nothing animates
// between ticks, so the compositor sleeps. Values are written straight onto the few elements
// that pulse: a CSS variable on the root would restyle the whole page on every tick.
import { useEffect, useRef, useState, type RefObject } from 'react'

const FPS = 8
const PULSE_PERIOD_MS = 2600 // breathing glow on urgent cards
const BEAT_PERIOD_MS = 1400 // heartbeat of "working" dots

type Listener = (tick: number, now: number) => void
const listeners = new Set<Listener>()
let timer: ReturnType<typeof setInterval> | undefined
let tick = 0

/** Breathing: 0.25 → 1 → 0.25 over the period, smooth. */
export const pulseAt = (now: number): number =>
  0.25 + 0.75 * (0.5 - 0.5 * Math.cos((2 * Math.PI * (now % PULSE_PERIOD_MS)) / PULSE_PERIOD_MS))

/** Heartbeat: a strong beat, a smaller echo, then rest (0 → 1). */
export function beatAt(now: number): number {
  const phase = (now % BEAT_PERIOD_MS) / BEAT_PERIOD_MS
  if (phase < 0.1) return phase / 0.1
  if (phase < 0.2) return 1 - ((phase - 0.1) / 0.1) * 0.6
  if (phase < 0.28) return 0.4 + ((phase - 0.2) / 0.08) * 0.2
  if (phase < 0.45) return 0.6 * (1 - (phase - 0.28) / 0.17)
  return 0
}

function step(): void {
  tick++
  const now = performance.now()
  listeners.forEach((l) => l(tick, now))
}

function sync(): void {
  const run = listeners.size > 0 && !document.hidden
  if (run && !timer) timer = setInterval(step, 1000 / FPS)
  if (!run && timer) {
    clearInterval(timer)
    timer = undefined
  }
}
document.addEventListener('visibilitychange', sync)

function onTick(listener: Listener): () => void {
  listeners.add(listener)
  sync()
  return () => {
    listeners.delete(listener)
    sync()
  }
}

/**
 * Restyles one element on every tick while `active`, bypassing React. When inactive the
 * element is reset with `apply(el, null)`.
 */
export function useLiveStyle<T extends HTMLElement>(
  active: boolean,
  apply: (el: T, now: number | null) => void,
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const applyRef = useRef(apply)
  useEffect(() => {
    applyRef.current = apply
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!active) {
      applyRef.current(el, null)
      return
    }
    return onTick((_tick, now) => applyRef.current(el, now))
  }, [active])
  return ref
}

/** A frame counter that advances every `every` ticks (8 ticks a second) while `active`. */
export function useFrame(active: boolean, every = 1): number {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    if (!active) return
    return onTick((t) => {
      if (t % every === 0) setFrame((f) => f + 1)
    })
  }, [active, every])
  return active ? frame : 0
}
