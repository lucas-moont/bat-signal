import { describe, expect, it } from 'vitest'
import {
  allOk,
  batch,
  dispatchers,
  lua,
  monitorFor,
  monitorRect,
  opacityEffect,
  opacityProps,
  openingRule,
  sameRect,
  socketPath,
  workAreaOf,
  type HyprMonitor,
} from '../src/main/hyprland'

const monitor = (over: Partial<HyprMonitor> = {}): HyprMonitor => ({
  name: 'DP-1',
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  scale: 1,
  transform: 0,
  reserved: [0, 0, 0, 0],
  ...over,
})
/** A laptop screen at 160%, and a monitor to its right. */
const laptop = monitor({ name: 'eDP-1', width: 2560, height: 1440, scale: 1.6, reserved: [0, 26, 0, 0] })
const external = monitor({ name: 'HDMI-A-1', x: 2560 })

describe('socketPath', () => {
  it("is the instance's socket under the runtime folder", () => {
    expect(socketPath({ HYPRLAND_INSTANCE_SIGNATURE: 'abc_1', XDG_RUNTIME_DIR: '/run/user/1000' })).toMatch(
      /run[\\/]user[\\/]1000[\\/]hypr[\\/]abc_1[\\/]\.socket\.sock$/,
    )
  })

  it('is nothing outside Hyprland', () => {
    expect(socketPath({ XDG_RUNTIME_DIR: '/run/user/1000' })).toBeUndefined()
    expect(socketPath({ HYPRLAND_INSTANCE_SIGNATURE: 'abc_1' })).toBeUndefined()
  })
})

describe('lua', () => {
  it('quotes a string, escaping what would end it', () => {
    expect(lua('address:0x5f')).toBe('"address:0x5f"')
    expect(lua(String.raw`a"b\c`)).toBe(String.raw`"a\"b\\c"`)
  })

  it('refuses control characters, which no title or name of ours holds', () => {
    expect(() => lua('a\nb')).toThrow()
  })
})

describe('dispatchers', () => {
  it("name the window by its address, and move it to a point in Hyprland's layout", () => {
    expect(dispatchers.move('0x5f', 1264.4, 654.6)).toBe(
      'hl.dsp.window.move({ x = 1264, y = 655, window = "address:0x5f" })',
    )
    expect(dispatchers.resize('0x5f', 320, 440)).toBe(
      'hl.dsp.window.resize({ x = 320, y = 440, window = "address:0x5f" })',
    )
  })

  it('switch floating and pinning on, never toggle them', () => {
    expect(dispatchers.float('0x5f')).toContain('action = "on"')
    expect(dispatchers.pin('0x5f')).toContain('action = "on"')
  })

  it('focus a window by its address', () => {
    expect(dispatchers.focus('0x5f')).toBe('hl.dsp.focus({ window = "address:0x5f" })')
  })
})

describe('batch and allOk', () => {
  it('sends several dispatchers in one request, in order', () => {
    expect(batch(['a()', 'b()'])).toBe('[[BATCH]]dispatch a();dispatch b()')
  })

  it("is ok only when every answer is Hyprland's ok", () => {
    expect(allOk('ok\n\n\nok')).toBe(true)
    expect(allOk('ok\n\nerror: [string "return hl.dispatch(x)"]:1: nope')).toBe(false)
  })
})

describe('openingRule: a window opens where it should, never in the middle first', () => {
  it('places it on its screen, in that screen’s own coordinates, at its size', () => {
    const rule = openingRule('panel', { x: 4144, y: 624, width: 320, height: 440 }, external, {
      focus: true,
      opacity: 1,
    })
    expect(rule).toContain('match = { initial_title = "^Bat-Signal$" }')
    expect(rule).toContain('monitor = "HDMI-A-1", move = { 1584, 624 }, size = { 320, 440 }')
    expect(rule).toContain('float = true, pin = true')
    expect(rule).toContain('no_initial_focus = false')
  })

  it('leaves the keyboard where it is for the disc, and wears the opacity setting over the user’s rules', () => {
    const rule = openingRule('signal', { x: 1488, y: 788, width: 96, height: 96 }, laptop, {
      focus: false,
      opacity: 0.85,
    })
    expect(rule).toContain('"bat-signal-signal"')
    expect(rule).toContain('no_initial_focus = true')
    expect(rule).toContain('opacity = "0.85 override 0.85 override 0.85 override"')
  })
})

describe('opacity', () => {
  it('overrides every opacity a window can have, rounded to hundredths', () => {
    expect(opacityEffect(0.904)).toBe('0.9 override 0.9 override 0.9 override')
  })

  it('sets each property on its own on a window already shown: set_prop takes one value', () => {
    const props = opacityProps('0x5f', 0.5)
    expect(props).toHaveLength(6)
    expect(props[0]).toBe(
      'hl.dsp.window.set_prop({ prop = "opacity", value = "0.5", window = "address:0x5f" })',
    )
    expect(props.at(-1)).toContain('prop = "opacity_fullscreen_override", value = "1"')
  })
})

describe('screens', () => {
  it('are their pixels divided by their scale, at their place in the layout', () => {
    expect(monitorRect(laptop)).toEqual({ x: 0, y: 0, width: 1600, height: 900 })
    expect(monitorRect(external)).toEqual({ x: 2560, y: 0, width: 1920, height: 1080 })
  })

  it('swap width and height when turned sideways', () => {
    expect(monitorRect(monitor({ transform: 1 }))).toMatchObject({ width: 1080, height: 1920 })
  })

  it('leave windows what bars and docks do not reserve', () => {
    expect(workAreaOf(monitorRect(laptop), [0, 26, 0, 40])).toEqual({ x: 0, y: 26, width: 1600, height: 834 })
  })

  it('hold a rectangle by its middle, or the nearest one does when it is off every screen', () => {
    expect(monitorFor({ x: 4000, y: 900, width: 96, height: 96 }, [laptop, external])?.name).toBe('HDMI-A-1')
    expect(monitorFor({ x: 1700, y: 100, width: 96, height: 96 }, [laptop, external])?.name).toBe('eDP-1')
    expect(monitorFor({ x: 0, y: 0, width: 1, height: 1 }, [])).toBeUndefined()
  })
})

describe('sameRect', () => {
  it('forgives a pixel of rounding, not more', () => {
    const r = { x: 10, y: 10, width: 320, height: 440 }
    expect(sameRect(r, { ...r, x: 11, width: 319 })).toBe(true)
    expect(sameRect(r, { ...r, width: 330 })).toBe(false)
  })
})
