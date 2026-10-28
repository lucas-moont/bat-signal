import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { CaseMarks, EmptyMark, found } from '../../src/renderer/src/components/Mark'
import type { AttentionItem, SessionSnapshot } from '../../src/shared/types'
import { standInTheme } from '../fixtures/themes'

const aCase = (id: string, statuses: string[], status = 'idle') =>
  ({
    sessionId: id,
    status,
    messages: [],
    tasks: statuses.map((s, i) => ({ id: `${i}`, status: s })),
  }) as unknown as SessionSnapshot
const asks = (id: string) => ({ sessionId: id, kind: 'permission' }) as AttentionItem
const marks = (cases: SessionSnapshot[], attention: AttentionItem[] = []) =>
  renderToStaticMarkup(createElement(CaseMarks, { cases, attention }))

// A Case is found (its mark lit) once it is done: every task on its list done, or, with no list (as
// most sessions keep none), its turn over and nothing on it waiting for the user.
describe('a found Case', () => {
  it('has every task on its list done', () => {
    expect(found(aCase('a', ['completed', 'completed']), [])).toBe(true)
    expect(found(aCase('a', ['completed', 'pending']), [])).toBe(false)
  })

  it('with no list, has its turn over and nothing waiting on it', () => {
    expect(found(aCase('a', []), [])).toBe(true)
    expect(found(aCase('a', [], 'busy'), [])).toBe(false)
    expect(found(aCase('a', []), [asks('a')])).toBe(false)
  })
})

// A Theme's mark (a medallion, after Arkham's chronicles): drawn only for a Theme that has one, so
// every other Theme's empty list and report keep their shape.
describe('a Theme without a mark', () => {
  it('draws none, over an empty list or at the report end', () => {
    expect(renderToStaticMarkup(createElement(EmptyMark))).toBe('')
    expect(marks([aCase('a', ['completed'])])).toBe('')
  })
})

describe('a Theme with a mark', () => {
  standInTheme({ mark: true })

  it('draws it over an empty list', () => {
    expect(renderToStaticMarkup(createElement(EmptyMark))).toContain('empty__mark')
  })

  // One a Case, in the order the report lists them, the found ones lit.
  it('ends the report on one a Case, in its order, the found ones lit', () => {
    const page = marks([
      aCase('busy', [], 'busy'),
      aCase('done', ['completed']),
      aCase('half', ['completed', 'pending']),
    ])
    expect(page.match(/class="report__mark[ "]/g)).toHaveLength(3)
    expect([...page.matchAll(/class="report__mark( report__mark--lit)?"/g)].map((m) => !!m[1])).toEqual([
      false,
      true,
      false,
    ])
  })

  it('draws no row for a report with no Cases', () => {
    expect(marks([])).toBe('')
  })
})
