import { describe, expect, it } from 'vitest'
import { releaseNotes } from '../scripts/release-notes.mts'

const changelog = `# Changelog

All notable changes to Bat-Signal are documented here.

## [Unreleased]

- Something not out yet

## [1.0.0] - 2026-10-20

### Added

- The installer

### Fixed

- A toast that came twice

## [1.0.0-rc.1] - 2026-10-10

- A first try of the installer

## [0.7.0] - 2026-10-07

- The tray

[Unreleased]: https://github.com/lucas-moont/bat-signal/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/lucas-moont/bat-signal/compare/v0.7.0...v1.0.0
`

describe("releaseNotes: a release's notes, from CHANGELOG.md", () => {
  it("are its version's section, without the heading", () => {
    expect(releaseNotes(changelog, '1.0.0')).toBe(
      '### Added\n\n- The installer\n\n### Fixed\n\n- A toast that came twice',
    )
  })

  it('end at the next version, and never take a pre-release for its final version', () => {
    expect(releaseNotes(changelog, '1.0.0-rc.1')).toBe('- A first try of the installer')
  })

  it('leave out the links at the end of the file', () => {
    expect(releaseNotes(changelog, '0.7.0')).toBe('- The tray')
  })

  it('fail loudly for a version the changelog does not have, so nothing is published without notes', () => {
    expect(() => releaseNotes(changelog, '2.0.0')).toThrow(/2\.0\.0/)
  })

  it('fail loudly for a version whose section is empty', () => {
    expect(() => releaseNotes('## [3.0.0] - 2027-01-01\n\n## [2.0.0]\n\n- x', '3.0.0')).toThrow(/3\.0\.0/)
  })
})
