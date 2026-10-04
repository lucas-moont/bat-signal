// Renders the README screenshots from the demo snapshot (no real sessions involved).
// Usage (from app/): npm run shots   → writes ../docs/screenshots/*.png
//
// The built renderer is loaded without the preload bridge, so it serves the made-up Gotham
// night. Offscreen rendering keeps animations running while nothing is shown on screen.
const { app, BrowserWindow } = require('electron')
const { mkdirSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')

const HTML = join(__dirname, '../out/renderer/index.html')
const OUT = join(__dirname, '../../docs/screenshots')
const SCALE = 2 // retina-sharp images for the README
const SETTLE_MS = 2400 // past the Bat-Signal intro

const click = (selector, index = 0) =>
  `document.querySelectorAll(${JSON.stringify(selector)})[${index}].click()`
const later = (ms, js) => `setTimeout(() => { ${js} }, ${ms})`

const SHOTS = [
  { name: 'needs-you', steps: [] },
  { name: 'cases', steps: [click('.tabs__tab', 1)] },
  { name: 'case-detail', steps: [click('.tabs__tab', 1), later(300, click('.card--case', 1))] },
  {
    name: 'task-drawer',
    steps: [click('.tabs__tab', 1), later(250, click('.card--case', 1)), later(650, click('.row--task', 1))],
  },
  { name: 'settings', steps: [click('[aria-label=Settings]')] },
  { name: 'all-quiet', hash: 'quiet', steps: [] },
  { name: 'pill', size: [232, 60], steps: [click('[aria-label="Shrink to pill"]')] },
]

async function shoot(win, { name, steps, hash, size = [360, 520] }) {
  const [width, height] = size
  win.setContentSize(width * SCALE, height * SCALE)
  await win.loadFile(HTML, hash ? { hash } : {})
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
