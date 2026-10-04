import { access, readdir } from 'node:fs/promises'
import { join } from 'node:path'

/** Claude Code names a project folder after its cwd, with every non-alphanumeric character as `-`. */
export const projectFolderName = (cwd: string): string => cwd.replace(/[^a-zA-Z0-9]/g, '-')

const exists = (path: string) =>
  access(path).then(
    () => true,
    () => false,
  )

/**
 * Finds `~/.claude/projects/<folder>/<sessionId>.jsonl`. Tries the folder name derived
 * from cwd first, then scans every project folder (long paths get shortened names).
 */
export async function locateTranscript(
  projectsDir: string,
  cwd: string,
  sessionId: string,
): Promise<string | null> {
  const file = `${sessionId}.jsonl`
  const direct = join(projectsDir, projectFolderName(cwd), file)
  if (await exists(direct)) return direct

  const folders = await readdir(projectsDir).catch(() => [] as string[])
  for (const folder of folders) {
    const candidate = join(projectsDir, folder, file)
    if (await exists(candidate)) return candidate
  }
  return null
}
