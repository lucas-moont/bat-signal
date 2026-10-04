# Launches the built app, captures exactly its window and closes it.
# Usage (from app/): npm run build; powershell -File scripts/screenshot.ps1 -Out ../docs/screenshots/main.png
param(
  [Parameter(Mandatory = $true)][string]$Out,
  [int]$WaitSeconds = 4
)

Add-Type @"
using System; using System.Runtime.InteropServices;
public class BatSignalWin {
  [DllImport("user32.dll")] public static extern bool SetProcessDpiAwarenessContext(IntPtr v);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr h, int attr, out RECT r, int size);
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr h, IntPtr hdc, uint flags);
  public struct RECT { public int L, T, R, B; }
}
"@
# Per-monitor DPI awareness, so coordinates are real pixels on scaled displays.
[BatSignalWin]::SetProcessDpiAwarenessContext([IntPtr]-4) | Out-Null
Add-Type -AssemblyName System.Drawing

$appDir = Split-Path -Parent $PSScriptRoot
$electron = Join-Path $appDir 'node_modules\electron\dist\electron.exe'
$isOurs = { $_.Path -like "$appDir\node_modules\electron\*" }

Start-Process -FilePath $electron -ArgumentList "`"$appDir`"" | Out-Null
try {
  Start-Sleep -Seconds $WaitSeconds
  $win = Get-Process electron | Where-Object $isOurs | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
  if (-not $win) { throw 'Bat-Signal window not found' }

  $hwnd = $win.MainWindowHandle
  # Whole window including the invisible resize borders, and the visible part (DWMWA_EXTENDED_FRAME_BOUNDS = 9).
  $outer = New-Object BatSignalWin+RECT
  [BatSignalWin]::GetWindowRect($hwnd, [ref]$outer) | Out-Null
  $r = New-Object BatSignalWin+RECT
  [BatSignalWin]::DwmGetWindowAttribute($hwnd, 9, [ref]$r, 16) | Out-Null

  # PrintWindow asks the window to paint itself, so whatever overlaps it on screen doesn't matter.
  $full = New-Object System.Drawing.Bitmap ($outer.R - $outer.L), ($outer.B - $outer.T)
  $g = [System.Drawing.Graphics]::FromImage($full)
  $hdc = $g.GetHdc()
  [BatSignalWin]::PrintWindow($hwnd, $hdc, 2) | Out-Null # PW_RENDERFULLCONTENT
  $g.ReleaseHdc($hdc)

  $w = $r.R - $r.L; $h = $r.B - $r.T
  $crop = New-Object System.Drawing.Rectangle ($r.L - $outer.L), ($r.T - $outer.T), $w, $h
  $bmp = $full.Clone($crop, $full.PixelFormat)
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Out) | Out-Null
  $bmp.Save($Out)
  "Saved ${w}x${h} to $Out"
} finally {
  Get-Process electron -ErrorAction SilentlyContinue | Where-Object $isOurs | Stop-Process -Force -Confirm:$false
}
