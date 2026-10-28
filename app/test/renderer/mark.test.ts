import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CaseMarks, EmptyMark } from '../../src/renderer/src/components/Mark'
import type { SessionSnapshot } from '../../src/shared/types'
import { standInTheme } from '../fixtures/themes'

const mission = (id: string, statuses: string[]) =>
  ({
    sessionId: id,
    status: 'idle',
    messages: [],
    tasks: statuses.map((status, i) => ({ id: `${i}`, status })),
  }) as unknown as SessionSnapshot
const marks = (sessions: SessionSnapshot[]) => renderToStaticMarkup(createElement(CaseMarks, { sessions }))

// A Theme's mark (SILENT PREDATOR's medallion, after Arkham's chronicles): drawn only for a Theme that
// has one, so every other Theme's empty list and report keep their shape.
describe('a Theme without a mark', () => {
  it('draws none, over an empty list or at the report end', () => {
    expect(renderToStaticMarkup(createElement(EmptyMark))).toBe('')
    expect(marks([mission('a', ['completed'])])).toBe('')
  })
})

describe('a Theme with a mark', () => {
  standInTheme({ mark: true })

  it('draws it over an empty list', () => {
    expect(renderToStaticMarkup(createElement(EmptyMark))).toContain('empty__mark')
  })

  // One a Case, found (lit) once every task on it is done; a Case with no tasks stays unfound.
  it('ends the report on one a Case, lit when its tasks are all done', () => {
    const page = marks([
      mission('a', ['completed', 'completed']),
      mission('b', ['completed', 'pending']),
      mission('c', []),
    ])
    expect(page.match(/class="report__mark[ "]/g)).toHaveLength(3)
    expect(page.match(/report__mark--lit/g)).toHaveLength(1)
  })

  it('draws no row for a report with no Cases', () => {
    expect(marks([])).toBe('')
  })
})
