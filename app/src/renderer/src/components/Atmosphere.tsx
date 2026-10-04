// Rain, film grain and a low red street-light glow behind everything.
import { useEffect, useRef } from 'react'
import './Atmosphere.css'

const FPS = 24
const DROPS_PER_1000PX2 = 0.32
const ANGLE = 0.26 // radians from vertical, wind from the left

interface Drop {
  x: number
  y: number
  len: number
  speed: number
  alpha: number
}

function Rain() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    let drops: Drop[] = []
    let frame = 0
    let last = 0

    const spawn = (w: number, h: number, anywhere: boolean): Drop => ({
      x: Math.random() * (w + h * Math.tan(ANGLE)) - h * Math.tan(ANGLE),
      y: anywhere ? Math.random() * h : -20,
      len: 8 + Math.random() * 14,
      speed: 380 + Math.random() * 260,
      alpha: 0.05 + Math.random() * 0.12,
    })

    const resize = () => {
      const { width, height } = el.getBoundingClientRect()
      el.width = Math.round(width * devicePixelRatio)
      el.height = Math.round(height * devicePixelRatio)
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
      const count = Math.round(((width * height) / 1000) * DROPS_PER_1000PX2)
      drops = Array.from({ length: count }, () => spawn(width, height, true))
    }

    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (time - last < 1000 / FPS) return
      const dt = Math.min(0.1, (time - last) / 1000)
      last = time
      const { width, height } = el.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 1
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]!
        d.y += d.speed * dt
        d.x += d.speed * dt * Math.tan(ANGLE)
        if (d.y - d.len > height) drops[i] = spawn(width, height, false)
        ctx.strokeStyle = `rgba(232, 225, 217, ${d.alpha})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x - Math.sin(ANGLE) * d.len, d.y - Math.cos(ANGLE) * d.len)
        ctx.stroke()
      }
    }

    // Stop drawing entirely while the window is hidden or in the tray.
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    document.addEventListener('visibilitychange', onVisibility)
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvas} className="atmosphere__rain" aria-hidden />
}

export function Atmosphere({ rain }: { rain: boolean }) {
  return (
    <div className="atmosphere" aria-hidden>
      <div className="atmosphere__glow" />
      {rain && <Rain />}
      <div className="atmosphere__grain" />
    </div>
  )
}
