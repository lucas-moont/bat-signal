// Renders the README screenshots from the demo snapshot (no real sessions involved).
// Usage (from app/): npm run shots   → writes ../docs/screenshots/*.png
//
// The built renderer is loaded without the preload bridge and with #demo, so it serves the
// made-up Gotham night. Offscreen rendering keeps animations running while nothing is shown on screen.
const { app, BrowserWindow } = require('electron')
const { mkdirSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')

const HTML = join(__dirname, '../out/renderer/index.html')
const OUT = join(__dirname, '../../docs/screenshots')
const SCALE = 2 // retina-sharp images for the README
const SETTLE_MS = 2400 // past the Bat-Signal intro

const click = (selector, index = 0) =>
  `document.querySelectorAll(${JSON.stringify(selector)})[${index}].click()`
/** Clicks the first element matching the selector whose text contains `text`. */
const clickText = (selector, text) =>
  `[...document.querySelectorAll(${JSON.stringify(selector)})].find((el) => el.textContent.includes(${JSON.stringify(text)})).click()`
const later = (ms, js) => `setTimeout(() => { ${js} }, ${ms})`

const SHOTS = [
  { name: 'needs-you', steps: [] },
  { name: 'cases', steps: [click('.tabs__tab', 1)] },
  { name: 'case-detail', steps: [click('.tabs__tab', 1), later(300, clickText('.card--case', 'Batmobile'))] },
  {
    name: 'task-drawer',
    steps: [
      click('.tabs__tab', 1),
      later(250, clickText('.card--case', 'Batmobile')),
      later(650, click('.row--task', 1)),
    ],
  },
  { name: 'settings', steps: [click('[aria-label=Settings]')] },
  { name: 'all-quiet', hash: 'demo-quiet', steps: [] },
  // The signal window: the lit disc at rest, and the disc sending a notice card up its beam.
  { name: 'signal', view: 'signal', size: [96, 96], steps: [] },
  { name: 'signal-notice', view: 'signal', hash: 'demo-news', size: [320, 230], steps: [] },
]

async function shoot(win, { name, steps, hash = 'demo', view = 'panel', size = [360, 520] }) {
  const [width, height] = size
  win.setContentSize(width * SCALE, height * SCALE)
  // A different query per shot forces a fresh page: a change of hash alone would not reload it.
  await win.loadFile(HTML, { hash, query: { view, shot: name } })
  win.webContents.setZoomFactor(SCALE)
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  if (steps.length) {
    await win.webContents.executeJavaScript(steps.join(';'))
    await new Promise((r) => setTimeout(r, 1200))
  }
  const image = await win.webContents.capturePage()
  writeFileSync(join(OUT, `${name}.png`), image.toPNG())
  console.log(`  ${name}.png`)
}

app.whenReady().then(async () => {
  mkdirSync(OUT, { recursive: true })
  // One window for every shot: each shot reloads the page from scratch.
  const win = new BrowserWindow({
    show: false,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: { offscreen: true, backgroundThrottling: false },
  })
  win.webContents.setFrameRate(30)
  try {
    for (const shot of SHOTS) await shoot(win, shot)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
  app.quit()
})
