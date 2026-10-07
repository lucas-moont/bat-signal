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
  // Further down the sheet: the shortcut, starting with Windows, the toasts and the sound.
  {
    name: 'settings-comfort',
    size: [320, 880],
    steps: [
      click('[aria-label=Settings]'),
      later(
        700,
        `const body = document.querySelector('.sheet__body'); const comfort = [...document.querySelectorAll('.section__title')].find((t) => t.textContent.includes('Comfort')); if (!comfort) throw new Error('settings-comfort: no Comfort section to scroll to'); body.scrollTop = comfort.getBoundingClientRect().top - body.getBoundingClientRect().top - 8`,
      ),
    ],
  },
  { name: 'all-quiet', hash: 'demo-quiet', steps: [] },
  // The night report theme, and a case opened in place.
  { name: 'night-report', hash: 'demo-report', steps: [] },
  {
    name: 'night-report-case',
    hash: 'demo-report',
    steps: [click('.tabs__tab', 1), later(300, clickText('.case .entry', 'Batmobile'))],
  },
  // The watch strip in both themes, cut to its own size.
  { name: 'watch', hash: 'demo-watch', size: [280, 320], clip: '.watch', steps: [] },
  { name: 'watch-report', hash: 'demo-watch-report', size: [280, 320], clip: '.watch', steps: [] },
  // The signal window: the lit disc at rest, and the disc sending a notice card up its beam.
  { name: 'signal', view: 'signal', size: [96, 96], steps: [] },
  { name: 'signal-notice', view: 'signal', hash: 'demo-news', size: [320, 230], steps: [] },
  // Bat-Clawd up close, cut out of the panel's header in each mood.
  { name: 'clawd-sleeping', hash: 'demo-quiet', clip: '.clawd', scale: 6, steps: [] },
  { name: 'clawd-flying', hash: 'demo-busy', clip: '.clawd', scale: 6, steps: [] },
  { name: 'clawd-alarmed', hash: 'demo', clip: '.clawd', scale: 6, steps: [] },
]

/** The padded box of the element matching `selector`, in the pixels of an image `imageWidth` wide. */
async function clipRect(win, selector, imageWidth) {
  const { box, pageWidth } = await win.webContents.executeJavaScript(
    `(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return { box: { x: r.x, y: r.y, width: r.width, height: r.height }, pageWidth: innerWidth } })()`,
  )
  const k = imageWidth / pageWidth
  const pad = box.x === 0 ? 0 : 8 // an element flush with the page edge gets no margin to clip
  const y = Math.max(0, box.y - pad / 2)
  return {
    x: Math.round((box.x - pad) * k),
    y: Math.round(y * k),
    width: Math.round((box.width + pad * 2) * k),
    height: Math.round((box.y + box.height + pad / 2 - y) * k),
  }
}

async function shoot(
  win,
  { name, steps, hash = 'demo', view = 'panel', size = [320, 440], clip, scale = SCALE },
) {
  const [width, height] = size
  win.setContentSize(width * scale, height * scale)
  // A different query per shot forces a fresh page: a change of hash alone would not reload it.
  await win.loadFile(HTML, { hash, query: { view, shot: name } })
  win.webContents.setZoomFactor(scale)
  await new Promise((r) => setTimeout(r, SETTLE_MS))
  if (steps.length) {
    await win.webContents.executeJavaScript(steps.join(';'))
    await new Promise((r) => setTimeout(r, 1200))
  }
  // Bat-Clawd blinks on the 10th frame at 4 fps, which is exactly where SETTLE_MS lands: wait past it.
  if (clip) await new Promise((r) => setTimeout(r, 500))
  const full = await win.webContents.capturePage()
  // A clip is the element's box (padded for the cape that reaches past it), cut from the full
  // image at the image's own scale, whatever the window ended up at.
  const image = clip ? full.crop(await clipRect(win, clip, full.getSize().width)) : full
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
