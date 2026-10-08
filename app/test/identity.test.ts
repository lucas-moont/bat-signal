import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { appIdFor } from '../src/main/identity'

describe('appIdFor: who this Bat-Signal is to Windows', () => {
  it('is com.lucasmoont.bat-signal once installed', () => {
    expect(appIdFor(true)).toBe('com.lucasmoont.bat-signal')
  })

  it('is another app in development, so a checkout runs beside the installed one', () => {
    expect(appIdFor(false)).toBe('com.lucasmoont.bat-signal.dev')
  })
})

describe('the installer', () => {
  it('installs the app under the id it gives itself (the Start menu shortcut carries it, for toasts)', () => {
    const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8')) as {
      build?: { appId?: string }
    }
    expect(pkg.build?.appId).toBe(appIdFor(true))
  })
})
