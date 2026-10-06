// A few 16px line icons, drawn to match the thin rules of the case files (the in-progress task
// mark alone is half filled, like the ◐ it replaced).
const RING = 'M12.5 8a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z'
const PATHS = {
  gear: 'M8 5.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm5.4 3.3.9.7-1.1 1.9-1.1-.4a4.7 4.7 0 0 1-1.2.7l-.2 1.2H8.5l-.2-1.2a4.7 4.7 0 0 1-1.2-.7l-1.1.4-1.1-1.9.9-.7a4.6 4.6 0 0 1 0-1.4l-.9-.7 1.1-1.9 1.1.4c.4-.3.8-.5 1.2-.7l.2-1.2h2.2l.2 1.2c.4.2.8.4 1.2.7l1.1-.4 1.1 1.9-.9.7a4.6 4.6 0 0 1 0 1.4Z',
  fold: 'M3 10.5h10',
  close: 'm4.5 4.5 7 7m0-7-7 7',
  back: 'M9.5 3.5 5 8l4.5 4.5',
  chevron: 'm6.5 3.5 4.5 4.5-4.5 4.5',
  terminal: 'M2.5 3.5h11v9h-11z M5 6.5 7 8l-2 1.5 M8.5 10H11',
  watch: 'M3 4.5h10 M3 8h10 M3 11.5h6',
  expand: 'M3 6.5V3h3.5 M9.5 3H13v3.5 M13 9.5V13H9.5 M6.5 13H3V9.5',
  // The task marks of a case: drawn, so they look the same wherever the app runs (the bundled
  // fonts have no ○ ◐ ✓, and a system fallback drew them in its own style).
  'task-pending': RING,
  'task-active': RING,
  'task-done': 'm3.5 8.5 3 3 6-7',
  'task-deleted': 'm5 5 6 6m0-6-6 6',
}

/** Parts filled solid, on top of the line drawing. */
const FILLS: Partial<Record<keyof typeof PATHS, string>> = {
  'task-active': 'M8 3.5a4.5 4.5 0 0 0 0 9Z',
}

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden fill="none">
      <path
        d={PATHS[name]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {FILLS[name] && <path d={FILLS[name]} fill="currentColor" />}
    </svg>
  )
}
