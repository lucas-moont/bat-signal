// An original bat emblem in the spirit of The Batman (2022): angular, low wings,
// sharp ears and a scratched-metal finish. Not a trace of the official logo.

const WINGS =
  'M60 12 L65 2 L68 14 L78 15 L118 6 L106 26 L96 22 L86 34 L76 30 L60 46 ' +
  'L44 30 L34 34 L24 22 L14 26 L2 6 L42 15 L52 14 L55 2 Z'

export function BatEmblem({ size = 40, title = 'Batcave' }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={(size * 48) / 120}
      viewBox="0 0 120 48"
      role="img"
      aria-label={title}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Fine noise cut out of the fill reads as wear and scratches. */}
        <filter id="bat-wear" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4 0.25" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -6 4.6"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </defs>
      <path d={WINGS} fill="var(--signal)" filter="url(#bat-wear)" />
    </svg>
  )
}
