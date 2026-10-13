// The bat emblem, after the symbol of The Batman (2022): wide wings set high above the head, their
// upper edges sweeping down to dropped tips, a stepped lower edge, two sharp ears and a short, square
// tail, with a lightly scratched-metal finish. The symbol is DC's trademark; this is a fan project.
// The outline was traced from the film's symbol, simplified, and made exactly symmetric (the left
// half mirrored at x=60), on a 120x48 grid; icons.mts draws the tray and toast icons from it (the tray
// never follows a Theme), and VENGEANCE wears it in the panel, on the disc and on Bat-Clawd's chest.

export const WINGS =
  'M2 20 L4.5 18 L13.5 13.5 L23.5 10 L34 7 L35.5 14 L44 22.5 L46.5 23 L54.5 28.5 L55.5 24.5 ' +
  'L57.5 20 L58.5 25.5 L60 26 L61.5 25.5 L62.5 20 L64.5 24.5 L65.5 28.5 L73.5 23 L76 22.5 ' +
  'L84.5 14 L86 7 L96.5 10 L106.5 13.5 L115.5 18 L118 20 L118 21.5 L111.5 19.5 L101.5 22.5 ' +
  'L97 24.5 L94 31 L78 32 L73 34.5 L64 41 L56 41 L47 34.5 L42 32 L26 31 L23 24.5 L18.5 22.5 ' +
  'L8.5 19.5 L2 21.5 Z'

/**
 * PALE MOONLIGHT's bat, after Tim Burton's Batman (1989), on the same 120x48 grid, read from the
 * film's poster (burton-1989.md, section 8): a narrow head with short ears, a deep scoop either side
 * of it (the oval's upper windows), wings reaching the oval's rim, two rounded lobes a side
 * underneath and one sharp tail. Drawn as a left half and mirrored at x = 60.
 */
export const BAT_1989 =
  'M60 11 L57 11 L55.6 4.6 L54.2 13.5 C52 20.5 48 22.4 43.5 22 C37 21.4 30.5 17.5 27 11.6 Q20.6 22.6 24.2 33.8 Q29.5 27.8 36.6 38.4 Q45.5 28.6 53 36.2 L60 44.2 L67 36.2 Q74.5 28.6 83.4 38.4 Q90.5 27.8 95.8 33.8 Q99.4 22.6 93 11.6 C89.5 17.5 83 21.4 76.5 22 C72 22.4 68 20.5 65.8 13.5 L64.4 4.6 L63 11 L60 11 Z'

/**
 * WATCHFUL PROTECTOR's bat, after Christopher Nolan's Dark Knight trilogy, on the same 120x48 grid,
 * measured on a photograph of the Signal projected during The Dark Knight Rises' shoot (nolan.md,
 * section 8): about 3.7:1, a level top line with the wings above the head, short blunt ears, one
 * hook a side at the outer corners, a straight lower edge and a sharp V tail; the dip to the head
 * and the hooks smoothed into curves. Symmetric about x = 60.
 */
export const BAT_2008 =
  'M0 8 L38.5 8 C43 8 48 15.4 53.2 15.4 L55 9.4 L56.6 9 L57.4 12.4 L58.2 12.7 ' +
  'L60 12.7 L61.8 12.7 L62.6 12.4 L63.4 9 L65 9.4 L66.8 15.4 C72 15.4 77 8 81.5 8 ' +
  'L120 8 Q106 11.5 101 19.5 L101 27.2 L89 27.4 L81.5 28.2 ' +
  'L77.7 28.6 L73.8 30.5 L70 31.5 L66.2 34.5 L62.3 39 L60 40.5 L57.7 39 L53.8 34.5 L50 31.5 ' +
  'L46.2 30.5 L42.3 28.6 L38.5 28.2 L31 27.4 L19 27.2 L19 19.5 Q14 11.5 0 8 Z'

/**
 * KNIGHTMARE's bat, after Zack Snyder's Batman (2016–2021), on the same 120x48 grid (snyder.md,
 * section 8): its upper outline traced from the Batman v Superman poster, short ears with vertical
 * outer edges and a flat crown, wing tops rising to sharp horns set higher than the ears; its lower
 * edge drawn from a photographed sculpture, two deep scallops a side and the body tapering to a point,
 * all chunkier and wider than the first draft. Symmetric about x = 60.
 */
export const BAT_2016 =
  'M60 45 L54 40 Q49 32 41 32 Q35 33 30 38 Q26 30 17 29 Q10 29 3 34 L5 20 L9 3 Q26 9 40 14 L41.5 7 ' +
  'L43 3 L49 11 L71 11 L77 3 L78.5 7 L80 14 Q94 9 111 3 L115 20 L117 34 Q110 29 103 29 Q94 30 90 38 ' +
  'Q85 33 79 32 Q71 32 66 40 L60 45 Z'

/** The 1989 oval the bat sits on: about 1.75:1, centred on the grid, a 2-unit rim. */
export const OVAL_1989 = { box: { x: 18, y: 0, width: 84, height: 48 }, rim: 2 }

/** A rectangle on an outline's grid. */
export interface Box {
  x: number
  y: number
  width: number
  height: number
}

/** An oval the bat sits on (PALE MOONLIGHT's), inscribed in its box, with a rim this wide. */
export interface Plate {
  box: Box
  rim: number
}

/**
 * A Theme's emblem: its outline, on whatever grid it was traced on; where the outline lies on that
 * grid; its finish ("wear" is VENGEANCE's scratched metal, "none" a plain fill); and the plate it
 * sits on, if it has one.
 */
export interface Emblem {
  path: string
  bat: Box
  finish: 'wear' | 'none'
  plate?: Plate
}

/** An emblem from its outline, its box read from the outline's points so a re-trace can't leave it behind. */
export function emblem(path: string, finish: Emblem['finish'], plate?: Plate): Emblem {
  const points = [...path.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)]
  const xs = points.map((m) => Number(m[1]))
  const ys = points.map((m) => Number(m[2]))
  const bat = {
    x: Math.min(...xs),
    y: Math.min(...ys),
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  }
  return { path, bat, finish, plate }
}
