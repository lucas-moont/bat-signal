# Contribuindo com a Batcaverna

Valeu pelo interesse. O projeto é pequeno e as regras também.

## Rodando localmente

Requisitos: Windows 10/11, Node.js 24+ e Claude Code instalado.

```bash
cd app
npm install
npm run dev
```

## Antes de abrir um PR

```bash
cd app
npm run format:check
npm run lint
npm run typecheck
npm test
```

O CI roda exatamente esses comandos.

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) em inglês:

- `feat(scope): ...` funcionalidade nova
- `fix(scope): ...` correção de bug
- `test(scope): ...` testes
- `refactor(scope): ...` mudança interna sem mudar comportamento
- `docs: ...`, `style: ...`, `chore: ...`, `ci: ...`, `perf: ...`

Commits pequenos, um assunto por vez.

## Privacidade

A Batcaverna lê arquivos do `~/.claude/` do usuário. **Nunca** coloque em issues, PRs ou fixtures de teste trechos reais de transcripts, caminhos pessoais, prompts ou tokens. Os fixtures em `app/test/fixtures/` são sintéticos de propósito.

Os arquivos `~/.claude/sessions/*.key` guardam segredos e **nunca** devem ser lidos pelo app.
