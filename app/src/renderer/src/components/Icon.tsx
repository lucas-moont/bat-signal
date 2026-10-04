// A few 16px line icons, drawn to match the thin rules of the case files.
const PATHS = {
  gear: 'M8 5.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Zm5.4 3.3.9.7-1.1 1.9-1.1-.4a4.7 4.7 0 0 1-1.2.7l-.2 1.2H8.5l-.2-1.2a4.7 4.7 0 0 1-1.2-.7l-1.1.4-1.1-1.9.9-.7a4.6 4.6 0 0 1 0-1.4l-.9-.7 1.1-1.9 1.1.4c.4-.3.8-.5 1.2-.7l.2-1.2h2.2l.2 1.2c.4.2.8.4 1.2.7l1.1-.4 1.1 1.9-.9.7a4.6 4.6 0 0 1 0 1.4Z',
  pill: 'M3 10.5h10',
  expand: 'M4 9.5 8 5.5l4 4',
  close: 'm4.5 4.5 7 7m0-7-7 7',
  back: 'M9.5 3.5 5 8l4.5 4.5',
  chevron: 'm6.5 3.5 4.5 4.5-4.5 4.5',
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
    </svg>
  )
}
