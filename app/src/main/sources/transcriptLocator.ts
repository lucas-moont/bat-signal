import { access, readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { obj, str } from '../../shared/guards'

export interface SubagentTranscript {
  agentId: string
  path: string
  /** The parent's Agent tool_use id, when `.meta.json` records it. */
  toolUseId?: string
}

const AGENT_FILE = /^agent-(.+)\.jsonl$/

/** Lists `<sessionId>/subagents/agent-<id>.jsonl` next to a session transcript. */
export async function listSubagentTranscripts(transcriptPath: string): Promise<SubagentTranscript[]> {
  const dir = join(transcriptPath.replace(/\.jsonl$/, ''), 'subagents')
  const names = await readdir(dir).catch(() => [] as string[])
  return Promise.all(
    names.flatMap((name) => {
      const agentId = name.match(AGENT_FILE)?.[1]
      if (!agentId) return []
      const path = join(dir, name)
      return [
        readFile(join(dir, `agent-${agentId}.meta.json`), 'utf8')
          .then((text) => ({ agentId, path, toolUseId: str(obj(JSON.parse(text))['toolUseId']) }))
          .catch(() => ({ agentId, path })), // missing or corrupted meta: link by agent id only
      ]
    }),
  )
}

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
  const candidates = folders.map((folder) => join(projectsDir, folder, file))
  const found = await Promise.all(candidates.map(exists))
  return candidates[found.indexOf(true)] ?? null
}
