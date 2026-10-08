; Uninstalling Bat-Signal takes its login entry with it: Electron writes the entry (named by the
; app id) when "Start with Windows" is on, and nothing else would remove it. Task Manager keeps
; its own on/off value beside it. An update runs the old uninstaller too, and keeps both.
!macro customUnInstall
  ${ifNot} ${isUpdated}
    DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "${APP_ID}"
    DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run" "${APP_ID}"
  ${endIf}
!macroend
