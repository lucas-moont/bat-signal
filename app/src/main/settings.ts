import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'
import { parseSettings, type Settings } from '../shared/settings'

const file = () => join(app.getPath('userData'), 'settings.json')

export function loadSettings(): Settings {
  try {
    return parseSettings(JSON.parse(readFileSync(file(), 'utf8')))
  } catch {
    return parseSettings({})
  }
}

export function saveSettings(settings: Settings): void {
  try {
    writeFileSync(file(), JSON.stringify(settings, null, 2))
  } catch (err) {
    console.warn('[batcave] could not save settings:', err)
  }
}
