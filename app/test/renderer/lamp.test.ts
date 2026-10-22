import '../fixtures/hiddenPage'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DiscBat } from '../../src/renderer/src/components/DiscBat'
import { gougesOf } from '../../src/renderer/src/gouge'
import { emblem, WINGS, type Lamp } from '../../src/shared/emblems'
import { standInTheme } from '../fixtures/themes'

// The transform the lamp draws its bat with, read from the clip that cuts the scratches to it.
const batTransform = (markup: string) =>
  markup.match(/<clipPath id="[^"]+"><path d="[^"]+" transform="([^"]+)"/)?.[1]

const draw = (lit: boolean, count = lit ? 1 : 0) =>
  renderToStaticMarkup(createElement(DiscBat, { lit, count }))

// Every Theme without a lamp keeps its disc as it was: its emblem, drawn by BatEmblem.
describe("a disc whose Theme has no lamp (VENGEANCE's)", () => {
  it('draws its emblem as everywhere else, lit and unlit', () => {
    expect(draw(true)).toContain('fill="var(--lens-bat)"')
    expect(draw(false)).toContain('fill="var(--disc-bat)"')
    expect(draw(true)).not.toContain('disc__lamp')
  })
})

// SERIOUS HOUSE's disc is the classic lamp, its bat solid, scratched over after it was made, with
// the Joker's laugh gouged in (#123).
describe('a disc whose Theme has a scratched lamp', () => {
  const lamp: Lamp = {
    laugh: [
      [20, 20, 20, 35],
      [30, 20, 30, 35],
    ],
  }
  const worn = { ...emblem(WINGS, 'scribble'), lamp }
  standInTheme({ emblem: worn })

  it('draws the bat solid, from its own outline, in the lens color when lit', () => {
    const markup = draw(true)
    expect(markup).toContain('class="disc__lamp"')
    expect(markup).toMatch(new RegExp(`<path d="${WINGS}" transform="[^"]+" fill="var\\(--lens-bat\\)"`))
    // Not the scribble the rest of the app wears.
    expect(markup).not.toContain('<polyline')
  })

  it('scratches through the bat to the light, and into the glass beside it', () => {
    const markup = draw(true)
    const clip = markup.match(/<clipPath id="([^"]+)"><path d="([^"]+)"/)
    expect(clip?.[2]).toBe(WINGS)
    expect(markup).toContain(`fill="var(--lens-core)" clip-path="url(#${clip?.[1]})"`)
    // Into the glass before the bat is laid over them, so they show only beside it.
    const glass = markup.search(/<path d="[^"]+" fill="var\(--lens-bat\)" opacity="[\d.]+"/)
    expect(glass).toBeGreaterThan(-1)
    expect(glass).toBeLessThan(markup.indexOf(`<path d="${WINGS}" transform="${batTransform(markup)}" fill=`))
  })

  // The Alarm Color Rule (DESIGN.md): the Joker's scarlet only while something needs you; for news
  // alone, or at rest, the laugh is dried blood.
  it('gouges the laugh in the Alarm color only while something needs you', () => {
    const markup = draw(true, 1)
    expect(markup).toContain('fill="var(--signal-hot)"')
    expect(markup).toMatch(/<clipPath id="[^"]+"><circle cx="50" cy="50" r="[\d.]+"/)
  })

  it('lights the lamp for news with no Alarm color in it', () => {
    const markup = draw(true, 0)
    expect(markup).not.toMatch(/var\(--signal(-hot)?\)/)
    expect(markup).toContain('fill="var(--blood)"')
  })

  it('keeps it all, faint, on the dark glass when unlit, the Alarm color nowhere', () => {
    const markup = draw(false)
    expect(markup).toMatch(new RegExp(`<path d="${WINGS}" transform="[^"]+" fill="var\\(--disc-bat\\)"`))
    expect(markup).toMatch(/fill="var\(--blood\)" opacity="[\d.]+"/)
    expect(markup).not.toMatch(/var\(--signal(-hot)?\)/)
    expect(markup).not.toContain('var(--lens-core)')
  })

  it('scratches the same way every time, worked out twice', () => {
    expect(gougesOf({ ...lamp })).toEqual(gougesOf({ ...lamp }))
    expect(draw(true)).toBe(draw(true))
  })

  // Each stroke of the laugh is gone over more than once, as a blade goes over a letter.
  it('goes over each stroke of the laugh two or three times', () => {
    const marks = gougesOf(lamp).laugh.match(/M/g)?.length ?? 0
    expect(marks).toBeGreaterThanOrEqual(2 * lamp.laugh.length)
    expect(marks).toBeLessThanOrEqual(3 * lamp.laugh.length)
  })

  it('gives every lamp its own clips, so none borrows another one', () => {
    const markup = renderToStaticMarkup(
      createElement(
        'div',
        null,
        createElement(DiscBat, { lit: true, count: 1 }),
        createElement(DiscBat, { lit: true, count: 1 }),
      ),
    )
    const ids = [...markup.matchAll(/<clipPath id="([^"]+)"/g)].map((m) => m[1])
    expect(new Set(ids).size).toBe(ids.length)
  })
})
