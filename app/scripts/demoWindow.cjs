// What npm run shots and npm run gif share: the built renderer, loaded without the preload bridge so
// it serves the demo night, in an offscreen window that keeps animating while nothing is on screen;
// and the clicks they script in it.
const { BrowserWindow } = require('electron')
const { join } = require('node:path')

const HTML = join(__dirname, '../out/renderer/index.html')

/** An offscreen window for the demo pages, painting at 30 fps. */
function demoWindow() {
  const win = new BrowserWindow({
    show: false,
    frame: false,
    backgroundColor: '#000000',
    webPreferences: { offscreen: true, backgroundThrottling: false },
  })
  win.webContents.setFrameRate(30)
  return win
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Holds the page at a zoom: if it isn't laid out `width` pixels wide, the zoom is set again until it
 * is, or this throws. Chromium sometimes drops a zoom set as a page loads, even after it took (and
 * one past 5x always), which would leave the page, and its pictures, at 1x.
 */
async function zoomTo(win, { scale, width }) {
  for (let tries = 0; tries < 10; tries++) {
    if ((await win.webContents.executeJavaScript('innerWidth')) <= width + 1) return
    win.webContents.setZoomFactor(1)
    win.webContents.setZoomFactor(scale)
    await wait(150)
  }
  throw new Error(`${win.webContents.getURL()}: the page would not zoom to ${scale}x`)
}

/** Loads a demo page in the window at a zoom (zoomTo). */
async function loadZoomed(win, { hash, query, scale, width }) {
  await win.loadFile(HTML, { hash, query })
  win.webContents.setZoomFactor(scale)
  // A beat for the page to lay itself out at the zoom before it is checked.
  await wait(100)
  await zoomTo(win, { scale, width })
}

/** Page script: clicks the `index`th element matching the selector. */
const click = (selector, index = 0) =>
  `document.querySelectorAll(${JSON.stringify(selector)})[${index}].click()`
/** Page script: clicks the first element matching the selector whose text contains `text`. */
const clickText = (selector, text) =>
  `[...document.querySelectorAll(${JSON.stringify(selector)})].find((el) => el.textContent.includes(${JSON.stringify(text)})).click()`

module.exports = { HTML, demoWindow, loadZoomed, zoomTo, wait, click, clickText }
