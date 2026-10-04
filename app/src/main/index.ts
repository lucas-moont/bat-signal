import { join } from 'node:path'
import { app, BrowserWindow, screen } from 'electron'
import { startBatcave } from './batcave'

const WIDTH = 360
const HEIGHT = 520
const MIN_WIDTH = 300
const MIN_HEIGHT = 360
const MARGIN = 16

function createWindow(): BrowserWindow {
  const { workArea } = screen.getPrimaryDisplay()
  const win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    x: workArea.x + workArea.width - WIDTH - MARGIN,
    y: workArea.y + workArea.height - HEIGHT - MARGIN,
    frame: false,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
    },
  })

  win.once('ready-to-show', () => win.show())

  if (process.env['ELECTRON_RENDERER_URL']) {
    void win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    void win.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return win
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.setAppUserModelId('com.lucasmoont.batcave')
  void app.whenReady().then(() => {
    const stop = startBatcave(createWindow())
    app.once('before-quit', stop)
  })
  app.on('window-all-closed', () => app.quit())
}
