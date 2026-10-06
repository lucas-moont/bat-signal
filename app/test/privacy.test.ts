import { describe, expect, it } from 'vitest'
import { findLeaks, scanRepo, type Personal } from '../scripts/privacy.mts'

const nobody: Personal = { names: [], ids: [] }
const scan = (text: string, personal: Personal = nobody) =>
  findLeaks(text, personal).map((l) => `${l.line}:${l.rule}`)

// The leaks are built at run time, so this file passes the scan it specifies.
const jdoe = 'jdoe'
const mail = `${jdoe}@mail.test`
const fake = (prefix: string, length: number) => prefix + 'x'.repeat(length)

describe('privacy check: user folders', () => {
  it('passes the fictional people the fixtures use', () => {
    expect(scan(String.raw`C:\Users\bruce\wayne-enterprises`)).toEqual([])
    expect(scan('/home/bruce/gcpd/ and /Users/alfred/cave')).toEqual([])
  })

  it('passes placeholders', () => {
    expect(scan(String.raw`C:\Users\<you>\.claude and %USERPROFILE% and C:\Users\Public`)).toEqual([])
  })

  it('flags a real-looking user folder, in any spelling', () => {
    expect(scan('log at C:\\Users\\' + jdoe + '\\AppData')).toEqual(['1:user folder'])
    expect(scan(`line one\n/home/${jdoe}/src`)).toEqual(['2:user folder'])
    expect(scan(JSON.stringify({ cwd: 'C:\\Users\\' + jdoe }))).toEqual(['1:user folder'])
    expect(scan(`c:/users/${jdoe}/code`)).toEqual(['1:user folder'])
  })
})

describe('privacy check: emails', () => {
  it('passes commit trailers and example addresses', () => {
    expect(scan('noreply@anthropic.com, 123+someone@users.noreply.github.com, bruce@example.com')).toEqual([])
  })

  it('flags any other address', () => {
    expect(scan(`mail me: ${mail}`)).toEqual(['1:email'])
  })
})

describe('privacy check: tokens', () => {
  it('flags API keys and tokens', () => {
    for (const token of [
      fake('sk-ant-', 24),
      fake('ghp_', 36),
      fake('github_pat_', 40),
      fake('xoxb-', 20),
      'AKIA' + 'X'.repeat(16),
    ])
      expect(scan(`key=${token}`), token.slice(0, 6)).toEqual(['1:token'])
  })
})

describe('privacy check: what only this machine knows', () => {
  const me: Personal = { names: [jdoe], ids: ['0f1e2d3c-4b5a-6978-8a9b-0c1d2e3f4a5b'] }

  it('flags the local username as a whole word, in any case', () => {
    expect(scan('owner: JDoe', me)).toEqual(['1:username'])
    expect(scan('jdoexample', me)).toEqual([])
  })

  it('flags a real Claude session id, but not other ids', () => {
    expect(scan('resume 0F1E2D3C-4B5A-6978-8A9B-0C1D2E3F4A5B', me)).toEqual(['1:session id'])
    expect(scan('resume 11111111-2222-3333-4444-555555555555', me)).toEqual([])
  })

  it('reports each rule once per line', () => {
    expect(scan(`${mail}, then ${mail}`, me)).toEqual(['1:email', '1:username'])
  })
})

describe('privacy check: this repository', () => {
  it('has no leak in any tracked file', () => {
    expect(scanRepo()).toEqual([])
  })
})
