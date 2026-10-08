// A fresh settings folder starts from the one before it: the installed app from Batcave's (its old
// name), a development run from the installed app's, which is where a checkout kept its settings
// until it got a folder of its own.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

const FILES = ['settings.json', 'window.json']

/**
 * Copies the earlier user-data files, together, only while the new folder has none of them yet.
 * Once Bat-Signal has saved anything, nothing is copied again: a reset stays a reset, and new
 * settings never mix with an old window place. The earlier folder stays as it was.
 */
export function migrateUserData(): void {
  const from = join(app.getPath('appData'), app.isPackaged ? 'batcave' : app.getName())
  const to = app.getPath('userData')
  if (FILES.some((name) => existsSync(join(to, name)))) return
  const found = FILES.filter((name) => existsSync(join(from, name)))
  if (!found.length) return
  try {
    mkdirSync(to, { recursive: true })
    for (const name of found) copyFileSync(join(from, name), join(to, name))
  } catch (err) {
    console.warn('[bat-signal] could not carry over the earlier settings:', err)
  }
}
