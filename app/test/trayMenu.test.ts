import { describe, expect, it } from 'vitest'
import { demoSnapshot, quietDemoSnapshot } from '../src/shared/demo'
import { trayLook, trayMenu } from '../src/main/trayMenu'

describe('trayLook', () => {
  it('lights up and counts while something needs you', () => {
    const night = demoSnapshot()
    expect(trayLook(night)).toEqual({ lit: true, tooltip: `Bat-Signal · ${night.attention.length} need you` })
    const one = { ...night, attention: night.attention.slice(0, 1) }
    expect(trayLook(one)).toEqual({ lit: true, tooltip: 'Bat-Signal · 1 needs you' })
  })

  it('rests when nothing does', () => {
    expect(trayLook(quietDemoSnapshot())).toEqual({ lit: false, tooltip: 'Bat-Signal · all quiet' })
  })
})

describe('trayMenu', () => {
  const labels = (mode: Parameters<typeof trayMenu>[0]) =>
    trayMenu(mode).map((item) => (item.kind === 'separator' ? '—' : item.label))

  it('offers to hide, the three views, settings and quit', () => {
    expect(labels('watch')).toEqual([
      'Hide Bat-Signal',
      '—',
      'Disc',
      'Panel',
      'Watch strip',
      '—',
      'Settings…',
      '—',
      'Quit Bat-Signal',
    ])
  })

  it('offers to show it again when hidden', () => {
    expect(trayMenu('hidden')[0]).toMatchObject({ label: 'Show Bat-Signal', action: 'showHide' })
  })

  it('ticks the view on screen, and none while hidden', () => {
    const ticked = (mode: Parameters<typeof trayMenu>[0]) =>
      trayMenu(mode).flatMap((item) => (item.kind === 'radio' && item.checked ? [item.action] : []))
    expect(ticked('signal')).toEqual(['signal'])
    expect(ticked('panel')).toEqual(['panel'])
    expect(ticked('watch')).toEqual(['watch'])
    expect(ticked('hidden')).toEqual([])
  })
})
