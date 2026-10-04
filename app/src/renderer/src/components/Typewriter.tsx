import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 400

/** Types new text out over ~400ms; renders it at once when calm or unchanged. */
export function Typewriter({ text, calm }: { text: string; calm: boolean }) {
  const [shown, setShown] = useState(text)
  const previous = useRef(text)

  useEffect(() => {
    if (calm || text === previous.current) {
      previous.current = text
      setShown(text)
      return
    }
    previous.current = text
    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS)
      setShown(text.slice(0, Math.ceil(text.length * progress)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [text, calm])

  return <>{shown}</>
}
