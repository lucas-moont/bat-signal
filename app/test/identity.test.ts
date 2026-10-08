import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { APP_ID, identityFor } from '../src/main/identity'

describe('identityFor: who this Bat-Signal is to Windows', () => {
  it('is com.lucasmoont.bat-signal once installed, in the folder v0.7 already kept its settings in', () => {
    // Windows folder names ignore case: "Bat-Signal" is the "bat-signal" folder of earlier versions.
    expect(identityFor(true)).toEqual({ id: APP_ID, dataFolder: 'Bat-Signal' })
  })

  it('is another app in development, so a checkout runs beside the installed one', () => {
    const dev = identityFor(false)
    expect(dev).toEqual({ id: `${APP_ID}.dev`, dataFolder: 'Bat-Signal Dev' })
    expect(dev.dataFolder.toLowerCase()).not.toBe(identityFor(true).dataFolder.toLowerCase())
  })
})

describe('the installer', () => {
  const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8')) as {
    productName?: string
    build?: { appId?: string }
  }

  it('installs the app under the id it gives itself (the Start menu shortcut carries it, for toasts)', () => {
    expect(pkg.build?.appId).toBe(identityFor(true).id)
  })

  it('names the app as its data folder is named', () => {
    expect(pkg.productName).toBe(identityFor(true).dataFolder)
  })
})
