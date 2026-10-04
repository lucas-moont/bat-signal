// A red ripple from the click point on cards, rows, tabs and buttons. One listener for the
// whole page and a one-off CSS animation per click, so it costs nothing at rest.
const TARGETS = '.card, .row, .icon-button, .tabs__tab'
const DURATION_MS = 450

export function installRipple(): () => void {
  const onDown = (e: PointerEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>(TARGETS)
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = el.getBoundingClientRect()
    el.style.setProperty('--rx', `${e.clientX - box.left}px`)
    el.style.setProperty('--ry', `${e.clientY - box.top}px`)
    el.classList.remove('rippling')
    void el.offsetWidth // restart the animation on quick repeated clicks
    el.classList.add('rippling')
    setTimeout(() => el.classList.remove('rippling'), DURATION_MS)
  }
  document.addEventListener('pointerdown', onDown)
  return () => document.removeEventListener('pointerdown', onDown)
}
