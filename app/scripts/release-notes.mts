// node scripts/release-notes.mts <version>: prints that version's notes from CHANGELOG.md (Keep a
// Changelog), for the GitHub release the release workflow publishes. A version with no notes fails,
// so a release never goes out without them.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const CHANGELOG = join(import.meta.dirname, '..', '..', 'CHANGELOG.md')

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** The section under `## [version]`, up to the next `## ` heading or the links at the end. */
export function releaseNotes(changelog: string, version: string): string {
  const heading = new RegExp(`^## \\[${escapeRegExp(version)}\\].*$`, 'm').exec(changelog)
  if (!heading) throw new Error(`CHANGELOG.md has no section for ${version}`)
  const rest = changelog.slice(heading.index + heading[0].length)
  const end = /^(?:## |\[[^\]]+\]: )/m.exec(rest)
  const notes = rest.slice(0, end?.index).trim()
  if (!notes) throw new Error(`CHANGELOG.md's section for ${version} is empty`)
  return notes
}

if (import.meta.main) {
  const version = process.argv[2]
  if (!version) throw new Error('Usage: node scripts/release-notes.mts <version>')
  console.log(releaseNotes(readFileSync(CHANGELOG, 'utf8'), version))
}
