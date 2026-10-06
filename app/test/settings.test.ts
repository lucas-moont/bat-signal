import { describe, expect, it } from 'vitest'
import { applySettingsPatch, DEFAULT_SETTINGS, parseSettings } from '../src/shared/settings'

/** settings.json as Bat-Signal wrote it before Phase 4: five fields, nothing else. */
const OLD_FILE = { animations: false, rain: false, alwaysOnTop: false, opacity: 0.8, layout: 'report' }

describe('parseSettings: whatever the file holds', () => {
  it('falls back to the defaults for a missing or broken file', () => {
    expect(parseSettings(undefined)).toEqual(DEFAULT_SETTINGS)
    expect(parseSettings('not json')).toEqual(DEFAULT_SETTINGS)
    expect(parseSettings([1, 2])).toEqual(DEFAULT_SETTINGS)
  })

  it('replaces bad values with defaults and drops unknown keys', () => {
    const parsed = parseSettings({ animations: 'yes', layout: 'grid', theme: 'arkham' })
    expect(parsed).toEqual(DEFAULT_SETTINGS)
    expect(parsed).not.toHaveProperty('theme')
  })

  it('keeps the opacity between 50% and 100%', () => {
    expect(parseSettings({ opacity: 0.1 }).opacity).toBe(0.5)
    expect(parseSettings({ opacity: 3 }).opacity).toBe(1)
  })
})

describe('parseSettings: a file from before Phase 4', () => {
  it('keeps what the user chose and turns every new alert off', () => {
    expect(parseSettings(OLD_FILE)).toEqual({
      ...OLD_FILE,
      alerts: {
        toast: { needsYou: false, reply: false, taskDone: false, sessions: false },
        sound: false,
        volume: 0.6,
      },
    })
  })
})

describe('parseSettings: alerts', () => {
  it('turns on only the toasts set to true, nothing truthy', () => {
    const { alerts } = parseSettings({ alerts: { toast: { reply: true, taskDone: 'yes', needsYou: 1 } } })
    expect(alerts.toast).toEqual({ needsYou: false, reply: true, taskDone: false, sessions: false })
  })

  it('keeps the volume between 0 and 1, at 60% when unknown', () => {
    const volume = (v: unknown) => parseSettings({ alerts: { volume: v } }).alerts.volume
    expect(volume(3)).toBe(1)
    expect(volume(-1)).toBe(0)
    expect(volume(0.25)).toBe(0.25)
    expect(volume('loud')).toBe(0.6)
    expect(volume(Number.NaN)).toBe(0.6)
  })

  it('falls back to the defaults when alerts is not an object', () => {
    expect(parseSettings({ alerts: 5 }).alerts).toEqual(DEFAULT_SETTINGS.alerts)
  })
})

describe('applySettingsPatch: changing one switch', () => {
  const current = applySettingsPatch(DEFAULT_SETTINGS, {
    alerts: { toast: { needsYou: true }, volume: 0.3 },
  })

  it('keeps the rest of the alerts when sound is turned on', () => {
    const next = applySettingsPatch(current, { alerts: { sound: true } })
    expect(next.alerts).toEqual({ ...current.alerts, sound: true })
  })

  it('keeps the other toasts when one is turned on', () => {
    const next = applySettingsPatch(current, { alerts: { toast: { taskDone: true } } })
    expect(next.alerts.toast).toEqual({ needsYou: true, reply: false, taskDone: true, sessions: false })
    expect(next.alerts.volume).toBe(0.3)
  })

  it('ignores a patch of the wrong shape instead of resetting the alerts', () => {
    expect(applySettingsPatch(current, { alerts: 5 }).alerts).toEqual(current.alerts)
    expect(applySettingsPatch(current, { alerts: { toast: 'all' } }).alerts).toEqual(current.alerts)
  })

  it('leaves the other settings alone', () => {
    const next = applySettingsPatch(parseSettings(OLD_FILE), { alerts: { sound: true } })
    expect(next).toMatchObject(OLD_FILE)
  })
})
