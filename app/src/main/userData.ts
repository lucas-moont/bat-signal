// The app used to be called Batcave: carry its saved settings and window place over, once.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

const OLD_FOLDER = 'batcave'
const FILES = ['settings.json', 'window.json']

/** Copies the old user-data files the new folder does not have yet. The old folder stays as it was. */
export function migrateUserData(): void {
  const from = join(app.getPath('appData'), OLD_FOLDER)
  const to = app.getPath('userData')
  if (from === to) return
  for (const name of FILES) {
    const [source, target] = [join(from, name), join(to, name)]
    if (!existsSync(source) || existsSync(target)) continue
    try {
      mkdirSync(to, { recursive: true })
      copyFileSync(source, target)
    } catch (err) {
      console.warn(`[bat-signal] could not carry over ${name}:`, err)
    }
  }
}
