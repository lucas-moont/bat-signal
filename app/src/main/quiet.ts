// Whether Windows wants quiet right now: something full screen, a presentation, or its own quiet
// time. Asked through SHQueryUserNotificationState, the shell's answer for this. Windows 11's Do
// Not Disturb is not among its answers, and nothing public reports it, so it is not read.
import { powershell } from './sources/powershell'

/** SHQueryUserNotificationState's answers that mean quiet: full screen (2, 3, 7), presenting (4), quiet time (6). */
const QUIET_STATES = new Set([2, 3, 4, 6, 7])

/** From the script's output; no answer means play: a missed sound is worse than one too many. */
export const wantsQuiet = (output: string): boolean => QUIET_STATES.has(Number.parseInt(output.trim(), 10))

const SCRIPT = [
  "if (-not ('BatSignal.Quiet' -as [type])) { Add-Type -Namespace BatSignal -Name Quiet -MemberDefinition '[DllImport(\"shell32.dll\")] public static extern int SHQueryUserNotificationState(out int state);' }",
  '$state = 0',
  'if ([BatSignal.Quiet]::SHQueryUserNotificationState([ref]$state) -eq 0) { $state }',
].join('\n')

/** Asks Windows; any failure counts as no answer. */
export const quietNow = (): Promise<boolean> => powershell.run(SCRIPT).then(wantsQuiet, () => false)
