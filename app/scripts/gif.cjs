// Records the README's GIF from the demo night (no real sessions involved): the disc lights and a
// notice card rises, then the panel opens on Needs you, a case is opened, and the pointer rests on
// its terminal button. A demo has no terminal to bring forward, so the GIF stops at the button.
// Usage (from app/): npm run gif   → writes ../docs/screenshots/demo.gif (needs ffmpeg on PATH)
//
// Frames are captured from an offscreen window, as npm run shots does, and ffmpeg turns them into
// a GIF with one palette built for the whole clip.
const { app, BrowserWindow } = require('electron')
const { execFileSync } = require('node:child_process')
const { mkdtempSync, rmSync, writeFileSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { join } = require('node:path')

const HTML = join(__dirname, '../out/renderer/index.html')
const OUT = join(__dirname, '../../docs/screenshots/demo.gif')
const SIZE = [320, 440] // the panel's default size; the disc scene uses the same frame
const SCALE = 1.5 // sharp enough to read, small enough for a README GIF
const FPS = 10

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
/** The centre of the first element matching `selector`, in page pixels. */
const centreOf = (win, selector) =>
  win.webContents.executeJavaScript(
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) } })()`,
  )

/** Captures a frame every 1/FPS s for `ms`, numbering them on from `frames.count`. */
async function record(win, frames, ms) {
  const end = Date.now() + ms
  while (Date.now() < end) {
    const started = Date.now()
    const image = await win.webContents.capturePage()
    writeFileSync(join(frames.dir, `${String(frames.count++).padStart(4, '0')}.png`), image.toPNG())
    await wait(Math.max(0, 1000 / FPS - (Date.now() - started)))
  }
}

/** Loads a view of the demo night, at the GIF's size and scale. */
async function open(win, view, hash) {
  await win.loadFile(HTML, { hash, query: { view, gif: `${view}-${hash}` } })
  win.webContents.setZoomFactor(SCALE)
}

/** A real pointer move, so the page shows its hover state. */
async function pointAt(win, selector) {
  const { x, y } = await centreOf(win, selector)
  win.webContents.sendInputEvent({ type: 'mouseMove', x: Math.round(x * SCALE), y: Math.round(y * SCALE) })
}

async function main(win) {
  const frames = { dir: mkdtempSync(join(tmpdir(), 'bat-signal-gif-')), count: 0 }
  try {
    // The disc at rest; the news arrives and a notice card rises up its beam.
    await open(win, 'signal', 'demo-news')
    await wait(300)
    await record(win, frames, 4200)

    // The panel opens on Needs you, then a case, and the pointer goes to its terminal button.
    await open(win, 'panel', 'demo')
    await record(win, frames, 3400) // the Bat-Signal intro, then the list
    await win.webContents.executeJavaScript(`document.querySelectorAll('.tabs__tab')[1].click()`)
    await record(win, frames, 1200)
    await win.webContents.executeJavaScript(
      `[...document.querySelectorAll('.card--case')].find((el) => el.textContent.includes('Batmobile')).click()`,
    )
    await record(win, frames, 1800)
    await pointAt(win, '.detail__terminal button')
    await record(win, frames, 1800)

    execFileSync('ffmpeg', [
      ...['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', join(frames.dir, '%04d.png')],
      ...['-vf', 'split[a][b];[a]palettegen=stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=4'],
      OUT,
    ])
    console.log(`  demo.gif (${frames.count} frames)`)
  } finally {
    rmSync(frames.dir, { recursive: true, force: true })
  }
}

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    show: false,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: { offscreen: true, backgroundThrottling: false },
  })
  win.setContentSize(SIZE[0] * SCALE, SIZE[1] * SCALE)
  win.webContents.setFrameRate(30)
  try {
    await main(win)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
  app.quit()
})
