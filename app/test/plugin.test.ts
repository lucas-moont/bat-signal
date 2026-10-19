import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { HOOK_EVENTS } from '../src/main/model/hookSignals'
import { HOOK_PORT } from '../src/main/sources/hookServer'

// JSON can't import constants, so this keeps the plugin and the app in step.
const config = JSON.parse(
  readFileSync(join(__dirname, '../../plugin/bat-signal/hooks/hooks.json'), 'utf8'),
) as {
  hooks: Record<
    string,
    { hooks: { type: string; command: string; args?: string[]; async?: boolean; timeout: number }[] }[]
  >
}
const allHooks = Object.values(config.hooks).flatMap((groups) => groups.flatMap((g) => g.hooks))

describe('plugin hooks.json', () => {
  it('subscribes to exactly the events the app handles', () => {
    expect(Object.keys(config.hooks).sort()).toEqual([...HOOK_EVENTS].sort())
  })

  /** The argument that follows a flag, as curl reads it. */
  const after = (args: string[] | undefined, flag: string) => args?.[args.indexOf(flag) + 1]

  // Exec form: Claude Code starts curl itself, with no shell, so one hook reads the same on Windows
  // (Git Bash or PowerShell), Linux and macOS.
  it("posts every event to the app's hook server, running curl with no shell", () => {
    for (const hook of allHooks) {
      expect(hook.type).toBe('command')
      expect(hook.command).toBe('curl')
      expect(hook.args?.at(-1)).toBe(`http://127.0.0.1:${HOOK_PORT}/hook`)
      expect(after(hook.args, '--data-binary')).toBe('@-') // the event, from stdin
    }
  })

  // An HTTP hook hands Claude Code whatever answers on the port, and any program that holds it while
  // Bat-Signal is closed could approve a permission or keep Claude going on its own words. An async
  // command hook hands it what it prints, so curl prints nothing: the reply goes to a file nothing reads.
  it('gives Claude Code nothing back, whoever answers the port', () => {
    for (const hook of allHooks) {
      expect(after(hook.args, '-o')).toBe('${CLAUDE_PLUGIN_DATA}/reply')
      expect(hook.args).toContain('--create-dirs') // the data folder may not be there yet
      expect(hook.args).toContain('-s') // and no progress or error text either
    }
  })

  it('never makes Claude Code wait: every hook runs in the background', () => {
    for (const hook of allHooks) {
      expect(hook.async).toBe(true)
      expect(after(hook.args, '-m')).toBe('1') // and gives up on the app after a second
    }
  })
})
