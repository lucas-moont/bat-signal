import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { HOOK_EVENTS } from '../src/main/model/hookSignals'
import { HOOK_PORT } from '../src/main/sources/hookServer'

// JSON can't import constants, so this keeps the plugin and the app in step.
const config = JSON.parse(readFileSync(join(__dirname, '../../plugin/batcave/hooks/hooks.json'), 'utf8')) as {
  hooks: Record<string, { hooks: { type: string; url: string; timeout: number }[] }[]>
}
const allHooks = Object.values(config.hooks).flatMap((groups) => groups.flatMap((g) => g.hooks))

describe('plugin hooks.json', () => {
  it('subscribes to exactly the events the app handles', () => {
    expect(Object.keys(config.hooks).sort()).toEqual([...HOOK_EVENTS].sort())
  })

  it("posts every event to the app's hook server", () => {
    for (const hook of allHooks) {
      expect(hook).toMatchObject({ type: 'http', url: `http://127.0.0.1:${HOOK_PORT}/hook` })
    }
  })

  it('never makes Claude Code wait more than a second', () => {
    for (const hook of allHooks) expect(hook.timeout).toBeLessThanOrEqual(1)
  })
})
