# Installs the built installer silently, as a user would get it, and checks what it leaves behind:
# the Start menu shortcut carries the app id (toasts depend on it), the installed app starts and
# listens for the plugin, an update keeps the login entry, and uninstalling takes the login entry
# but keeps the settings. Runs in CI: a PC with Smart App Control on blocks the unsigned installer.
# Usage (from app/, after npm run dist): powershell -File scripts/installer-check.ps1
$ErrorActionPreference = 'Stop'

$appId = 'com.lucasmoont.bat-signal'
$run = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$approved = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'
$settings = Join-Path $env:APPDATA 'Bat-Signal'
$shortcut = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\Bat-Signal.lnk'
$setup = Get-ChildItem (Join-Path $PSScriptRoot '..\release\Bat-Signal-Setup-*.exe') | Select-Object -First 1
$failures = 0

function Check([string]$what, [bool]$ok) {
  if ($ok) { Write-Host "  ok    $what" } else { Write-Host "  FAIL  $what"; $script:failures++ }
}

function Wait-Until([scriptblock]$condition, [int]$seconds) {
  $deadline = (Get-Date).AddSeconds($seconds)
  while ((Get-Date) -lt $deadline) {
    if (& $condition) { return $true }
    Start-Sleep -Milliseconds 500
  }
  return [bool](& $condition)
}

function Install-BatSignal {
  Start-Process $setup.FullName -ArgumentList '/S' -Wait
}

# Where the installer says it put the app, from its own uninstall entry.
function Get-Installed {
  Get-ChildItem 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall' |
    Get-ItemProperty | Where-Object { $_.DisplayName -like 'Bat-Signal*' } | Select-Object -First 1
}

function Get-Value([string]$key, [string]$name) {
  (Get-ItemProperty $key -Name $name -ErrorAction SilentlyContinue).$name
}

function Get-ShortcutAppId([string]$path) {
  $folder = (New-Object -ComObject Shell.Application).NameSpace((Split-Path $path))
  $folder.ParseName((Split-Path $path -Leaf)).ExtendedProperty('System.AppUserModel.ID')
}

if (-not $setup) { throw 'No release\Bat-Signal-Setup-*.exe: run npm run dist first.' }
Write-Host "Installing $($setup.Name)"
Install-BatSignal
$installed = Get-Installed
Check 'the installer registers an uninstall entry' ($null -ne $installed)
$folder = $installed.InstallLocation
$exe = Join-Path $folder 'Bat-Signal.exe'
Check "the app is installed ($exe)" (Test-Path $exe)
Check 'the toast icon sits outside the asar, where Windows can read it' `
  (Test-Path (Join-Path $folder 'resources\app.asar.unpacked\resources\icons\toast.png'))
Check 'the Start menu shortcut is there' (Test-Path $shortcut)
Check "the shortcut carries the app id $appId" ((Get-ShortcutAppId $shortcut) -eq $appId)

Write-Host 'Starting the installed app'
$app = Start-Process $exe -PassThru
$listening = Wait-Until { Get-NetTCPConnection -LocalPort 47777 -State Listen -ErrorAction SilentlyContinue } 30
Check 'it listens for the plugin on 127.0.0.1:47777' $listening
Check "it keeps its settings in $settings" (Wait-Until { Test-Path $settings } 10)
Stop-Process -Id $app.Id -Force # its helper processes end with it
Check 'it stops' (Wait-Until { -not (Get-Process -Id $app.Id -ErrorAction SilentlyContinue) } 10)

# The entry "Start with Windows" writes, and Task Manager's switch beside it.
New-ItemProperty $run -Name $appId -Value "`"$exe`" --hidden" -Force | Out-Null
New-Item $approved -Force -ErrorAction SilentlyContinue | Out-Null
New-ItemProperty $approved -Name $appId -PropertyType Binary -Value ([byte[]](2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)) -Force | Out-Null

Write-Host 'Installing again, as an update does'
Install-BatSignal
Check 'an update keeps the login entry' ($null -ne (Get-Value $run $appId))
Check "an update keeps Task Manager's switch" ($null -ne (Get-Value $approved $appId))

Write-Host 'Uninstalling'
$uninstaller = Join-Path $folder 'Uninstall Bat-Signal.exe'
Start-Process $uninstaller -ArgumentList '/S' -Wait
# The uninstaller copies itself away and carries on, so its end is the app being gone.
Check 'the app is removed' (Wait-Until { -not (Test-Path $exe) } 60)
Check 'the uninstall entry is removed' (Wait-Until { $null -eq (Get-Installed) } 30)
Check 'the Start menu shortcut is removed' (-not (Test-Path $shortcut))
Check 'the login entry is removed' ($null -eq (Get-Value $run $appId))
Check "Task Manager's switch is removed" ($null -eq (Get-Value $approved $appId))
Check 'the settings stay' (Test-Path $settings)

if ($failures) { throw "$failures installer check(s) failed" }
Write-Host 'installer: all checks passed'
