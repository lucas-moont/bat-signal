// Windows' own tools, by their full paths: looked up by name, Windows would try the current folder
// first, where a planted reg.exe or powershell.exe would run instead.
import { join } from 'node:path'

const SYSTEM32 = join(process.env['SystemRoot'] ?? String.raw`C:\Windows`, 'System32')

export const REG = join(SYSTEM32, 'reg.exe')
export const POWERSHELL = join(SYSTEM32, 'WindowsPowerShell', 'v1.0', 'powershell.exe')
