import { describe, expect, it } from 'vitest'
import { parseStat } from '../src/main/sources/procfs'

/** A stat line as Linux writes it, with the fields Bat-Signal reads in place (ppid 4th, starttime 22nd). */
const statLine = (pid: number, name: string, ppid: number, startTime: number) =>
  `${pid} (${name}) S ${ppid} 4242 4242 0 -1 4194560 1203 0 0 0 12 3 0 0 20 0 9 0 ${startTime} 1234567 890 18446744073709551615 0 0 0 0 0 0 0 0 0 0 0 0 17 3 0 0 0 0 0`

describe('parseStat', () => {
  it('reads the name, the parent and the start time Claude Code writes as procStart', () => {
    expect(parseStat(statLine(4242, 'claude', 4200, 2424010))).toEqual({
      pid: 4242,
      name: 'claude',
      ppid: 4200,
      startTime: '2424010',
    })
  })

  it('counts the fields from the last parenthesis: a name may hold spaces and parentheses', () => {
    expect(parseStat(statLine(31, 'Web Content (x) ', 30, 77))).toMatchObject({
      name: 'Web Content (x) ',
      ppid: 30,
      startTime: '77',
    })
  })

  it('reads a line that ends in a newline, as the file does', () => {
    expect(parseStat(`${statLine(5, 'sh', 1, 900)}\n`)?.startTime).toBe('900')
  })

  it('gives nothing for a line that is not a stat line', () => {
    expect(parseStat('')).toBeUndefined()
    expect(parseStat('4242 claude S 1')).toBeUndefined()
    expect(parseStat('4242 (claude) S 1 2')).toBeUndefined()
  })
})
