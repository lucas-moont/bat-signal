// The bat emblem, after the symbol of The Batman (2022): wide wings set high above the head, their
// upper edges sweeping down to dropped tips, a stepped lower edge, two sharp ears and a short, square
// tail, with a scratched-metal finish. The symbol is DC's trademark; this is a fan project.
// The outline was traced from the film's symbol, simplified, and made exactly symmetric (the left
// half mirrored at x=60), on a 120x48 grid; icons.mts draws the tray and toast icons from it, and
// Bat-Clawd wears it on his chest.

export const WINGS =
  'M2 20 L4.5 18 L13.5 13.5 L23.5 10 L34 7 L35.5 14 L44 22.5 L46.5 23 L54.5 28.5 L55.5 24.5 ' +
  'L57.5 20 L58.5 25.5 L60 26 L61.5 25.5 L62.5 20 L64.5 24.5 L65.5 28.5 L73.5 23 L76 22.5 ' +
  'L84.5 14 L86 7 L96.5 10 L106.5 13.5 L115.5 18 L118 20 L118 21.5 L111.5 19.5 L101.5 22.5 ' +
  'L97 24.5 L94 31 L78 32 L73 34.5 L64 41 L56 41 L47 34.5 L42 32 L26 31 L23 24.5 L18.5 22.5 ' +
  'L8.5 19.5 L2 21.5 Z'

/** The box around the bat, a unit of air on each side: the width a place gives is the bat's. */
const BOX = { y: 6, width: 120, height: 36 }

export function BatEmblem({
  size = 40,
  title = 'Bat-Signal',
  fill = 'var(--signal)',
}: {
  size?: number
  title?: string
  fill?: string
}) {
  return (
    <svg
      width={size}
      height={(size * BOX.height) / BOX.width}
      viewBox={`0 ${BOX.y} ${BOX.width} ${BOX.height}`}
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
      <path d={WINGS} fill={fill} filter="url(#bat-wear)" />
    </svg>
  )
}
