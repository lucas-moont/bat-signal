# Installs the built installer silently, as a user would get it, and checks what it leaves behind:
# the Start menu shortcut carries the app id (toasts depend on it), the installed app starts and
# listens for the plugin, an update keeps the login entry, and uninstalling takes the login entry
# but keeps the settings. Runs in CI: a PC with Smart App Control on blocks the unsigned installer,
# and it replaces, then removes, the Bat-Signal it finds, so it refuses a PC where one is installed.
# Usage (from app/, after npm run dist): powershell -File scripts/installer-check.ps1
$ErrorActionPreference = 'Stop'

# The id and the name the installer was built with (identity.test.ts ties the id to the app's).
$pkg = Get-Content (Join-Path $PSScriptRoot '..\package.json') -Raw | ConvertFrom-Json
$appId = $pkg.build.appId
$name = $pkg.productName
$setup = Join-Path $PSScriptRoot "..\release\$name-Setup-$($pkg.version).exe"
$settings = Join-Path $env:APPDATA $name
$shortcut = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\$name.lnk"
$run = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$approved = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run' # loginItem.ts
$port = 47777 # HOOK_PORT, hookServer.ts
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
  Start-Process $setup -ArgumentList '/S' -Wait
}

# The installer's own uninstall entry: where it put the app, and how Windows removes it.
function Get-Installed {
  Get-ChildItem 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall' |
    Get-ItemProperty | Where-Object { $_.DisplayName -like "$name*" } | Select-Object -First 1
}

function Get-Value([string]$key, [string]$valueName) {
  (Get-ItemProperty $key -Name $valueName -ErrorAction SilentlyContinue).$valueName
}

function Get-ShortcutAppId([string]$path) {
  $folder = (New-Object -ComObject Shell.Application).NameSpace((Split-Path $path))
  $folder.ParseName((Split-Path $path -Leaf)).ExtendedProperty('System.AppUserModel.ID')
}

if (-not (Test-Path $setup)) { throw "No $setup`: run npm run dist first." }
if (Get-Installed) { throw "$name is installed here, and this check would remove it: run it on a PC without it, as CI does." }
Write-Host "Installing $(Split-Path $setup -Leaf)"
Install-BatSignal
$installed = Get-Installed
Check 'the installer registers an uninstall entry' ($null -ne $installed)
if (-not $installed) { throw 'Nothing more to check without the uninstall entry.' }
# UninstallString is "<folder>\Uninstall <name>.exe" /currentuser.
$folder = Split-Path ([regex]'^"([^"]+)"').Match($installed.UninstallString).Groups[1].Value
$exe = Join-Path $folder "$name.exe"
Check "the app is installed ($exe)" (Test-Path $exe)
Check 'the toast icon sits outside the asar, where Windows can read it' `
  (Test-Path (Join-Path $folder 'resources\app.asar.unpacked\resources\icons\toast.png'))
Check 'the Start menu shortcut is there' (Test-Path $shortcut)
Check "the shortcut carries the app id $appId" ((Get-ShortcutAppId $shortcut) -eq $appId)

Write-Host 'Starting the installed app'
$app = Start-Process $exe -PassThru
$listening = Wait-Until { Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue } 30
Check "it listens for the plugin on 127.0.0.1:$port" $listening
Check "it keeps its settings in $settings" (Wait-Until { Test-Path $settings } 10)
Stop-Process -Id $app.Id -Force # its helper processes end with it
Check 'it stops' (Wait-Until { -not (Get-Process -Id $app.Id -ErrorAction SilentlyContinue) } 10)

# The entry "Start with Windows" writes (--hidden: AT_LOGIN, loginItem.ts), and Task Manager's
# switch beside it.
New-ItemProperty $run -Name $appId -Value "`"$exe`" --hidden" -Force | Out-Null
if (-not (Test-Path $approved)) { New-Item $approved -Force | Out-Null } # with its parents, on a fresh PC
New-ItemProperty $approved -Name $appId -PropertyType Binary -Value ([byte[]](2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)) -Force | Out-Null

Write-Host 'Installing again, as an update does'
Install-BatSignal
Check 'an update keeps the login entry' ($null -ne (Get-Value $run $appId))
Check "an update keeps Task Manager's switch" ($null -ne (Get-Value $approved $appId))

Write-Host 'Uninstalling, as Windows does'
Start-Process cmd -ArgumentList '/c', (Get-Installed).QuietUninstallString -Wait
# The uninstaller copies itself away and carries on, so its end is the app being gone.
Check 'the app is removed' (Wait-Until { -not (Test-Path $exe) } 60)
Check 'the uninstall entry is removed' (Wait-Until { $null -eq (Get-Installed) } 30)
Check 'the Start menu shortcut is removed' (-not (Test-Path $shortcut))
Check 'the login entry is removed' ($null -eq (Get-Value $run $appId))
Check "Task Manager's switch is removed" ($null -eq (Get-Value $approved $appId))
Check 'the settings stay' (Test-Path $settings)

if ($failures) { throw "$failures installer check(s) failed" }
Write-Host 'installer: all checks passed'
