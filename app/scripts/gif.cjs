// Records the README's GIF from the demo night (no real sessions involved): the disc lights and a
// notice card rises, then the panel opens on Needs you, a case is opened, and the pointer rests on
// its terminal button. A demo has no terminal to bring forward, so the GIF stops at the button.
// Usage (from app/): npm run gif   → writes ../docs/screenshots/demo.gif (needs ffmpeg on PATH)
//
// Frames are captured from an offscreen window, as npm run shots does, and ffmpeg turns them into
// a GIF with one palette built for the whole clip.
const { app } = require('electron')
const { execFileSync } = require('node:child_process')
const { mkdirSync, mkdtempSync, rmSync, writeFileSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { dirname, join } = require('node:path')
const { HTML, demoWindow, click, clickText } = require('./demoWindow.cjs')

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

/**
 * Takes the latest painted frame every 1/FPS s for `ms`. The offscreen window paints only when
 * something changes, so a still moment repeats its last frame; nothing is encoded while recording,
 * so the clip keeps real time however slow the machine.
 */
async function record(win, frames, ms) {
  let latest = await win.webContents.capturePage()
  const onPaint = (_event, _dirty, image) => (latest = image)
  win.webContents.on('paint', onPaint)
  try {
    const start = Date.now()
    for (let i = 0; i < (ms * FPS) / 1000; i++) {
      await wait(start + (i * 1000) / FPS - Date.now())
      frames.push(latest)
    }
  } finally {
    win.webContents.off('paint', onPaint)
  }
}

/** How long a fresh page takes to repaint at the new zoom, so no frame shows it at the old one. */
const ZOOM_SETTLE_MS = 300

/** Loads a view of the demo night, at the GIF's size and scale. */
async function open(win, view, hash) {
  await win.loadFile(HTML, { hash, query: { view, gif: `${view}-${hash}` } })
  win.webContents.setZoomFactor(SCALE)
  await wait(ZOOM_SETTLE_MS)
}

/** A real pointer move, so the page shows its hover state. */
async function pointAt(win, selector) {
  const { x, y } = await centreOf(win, selector)
  win.webContents.sendInputEvent({ type: 'mouseMove', x: Math.round(x * SCALE), y: Math.round(y * SCALE) })
}

async function main(win) {
  const frames = []
  const dir = mkdtempSync(join(tmpdir(), 'bat-signal-gif-'))
  try {
    // The disc at rest; the news arrives and a notice card rises up its beam.
    await open(win, 'signal', 'demo-news')
    await record(win, frames, 4200)

    // The panel opens on Needs you, then a case, and the pointer goes to its terminal button.
    await open(win, 'panel', 'demo')
    await record(win, frames, 3400) // the Bat-Signal intro, then the list
    await win.webContents.executeJavaScript(click('.tabs__tab', 1))
    await record(win, frames, 1200)
    await win.webContents.executeJavaScript(clickText('.card--case', 'Batmobile'))
    await record(win, frames, 1800)
    await pointAt(win, '.detail__terminal button')
    await record(win, frames, 1800)

    mkdirSync(dirname(OUT), { recursive: true })
    frames.forEach((image, i) => writeFileSync(join(dir, `${String(i).padStart(4, '0')}.png`), image.toPNG()))
    execFileSync('ffmpeg', [
      ...['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', join(dir, '%04d.png')],
      ...['-vf', 'split[a][b];[a]palettegen=stats_mode=full[p];[b][p]paletteuse=dither=bayer:bayer_scale=4'],
      OUT,
    ])
    console.log(`  demo.gif (${frames.length} frames)`)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

app.whenReady().then(async () => {
  const win = demoWindow()
  win.setContentSize(SIZE[0] * SCALE, SIZE[1] * SCALE)
  try {
    await main(win)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
  app.quit()
})
