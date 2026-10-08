import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { HOOK_EVENTS } from '../src/main/model/hookSignals'
import { HOOK_PORT } from '../src/main/sources/hookServer'

// JSON can't import constants, so this keeps the plugin and the app in step.
const config = JSON.parse(
  readFileSync(join(__dirname, '../../plugin/bat-signal/hooks/hooks.json'), 'utf8'),
) as {
  hooks: Record<string, { hooks: { type: string; command: string; async?: boolean; timeout: number }[] }[]>
}
const allHooks = Object.values(config.hooks).flatMap((groups) => groups.flatMap((g) => g.hooks))

describe('plugin hooks.json', () => {
  it('subscribes to exactly the events the app handles', () => {
    expect(Object.keys(config.hooks).sort()).toEqual([...HOOK_EVENTS].sort())
  })

  it("posts every event to the app's hook server, by a command", () => {
    for (const hook of allHooks) {
      expect(hook.type).toBe('command')
      expect(hook.command).toContain(`http://127.0.0.1:${HOOK_PORT}/hook`)
      expect(hook.command).toContain("--data-binary '@-'") // the event, from stdin; quoted for PowerShell too
    }
  })

  // An HTTP hook hands Claude Code whatever answers on the port, and any program that holds it while
  // Bat-Signal is closed could approve a permission or keep Claude going on its own words.
  it('gives Claude Code nothing back, whoever answers the port', () => {
    for (const hook of allHooks) {
      expect(hook.command).toContain('-o NUL') // the reply goes nowhere
      expect(hook.command).toMatch(/; exit 0$/) // and the exit code never blocks
    }
  })

  it('never makes Claude Code wait: every hook runs in the background', () => {
    for (const hook of allHooks) {
      expect(hook.async).toBe(true)
      expect(hook.command).toContain('-m 1') // and gives up on the app after a second
    }
  })
})
