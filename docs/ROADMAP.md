# Roadmap

Para onde a Batcaverna pode ir. A ordem dentro de cada versão é uma sugestão. Depois da v1 vai ter uma rodada de conversa para decidir o que entra de fato na v2.

## v1: "o Bat-Computador observa"

Só observa, nunca age nas sessões.

- [ ] Lista de sessões ativas do Claude Code, com status (trabalhando / parada / precisa de você)
- [ ] Detalhe da sessão: tarefas, subagentes, comandos em segundo plano, últimas mensagens
- [ ] Detalhe da tarefa (clique): descrição, histórico de status
- [ ] Painel "Precisa de você": pedidos de permissão, Claude esperando resposta, erros
- [ ] Notificações do Windows: precisa de você, terminou de responder, tarefa concluída, sessão aberta/fechada
- [ ] Plugin do Claude Code com hooks HTTP (avisos na hora exata)
- [ ] "Ir pro terminal": traz para frente a janela da sessão
- [ ] Bat-Clawd, o mascote, com estados (dormindo, voando, alarmado)
- [ ] Animações: abertura do Bat-Sinal, chuva, transições
- [ ] Bandeja do sistema, atalho global, iniciar com o Windows
- [ ] Instalador para Windows

## v2: "a caverna responde"

Sair de só observar para agir, com cuidado e sempre com confirmação explícita.

- **Aprovar/negar permissões pela janelinha.** O hook `PermissionRequest` espera a resposta do app, com timeout seguro: se o app não responder, o Claude segue o fluxo normal no terminal.
- **Mensagem rápida.** Mandar "continue" ou um texto curto para uma sessão parada.
- **Aba certa no Windows Terminal.** Hoje só a janela vem para frente. Pesquisar a automação do Windows Terminal para selecionar a aba exata.
- **Histórico e busca.** O que cada sessão fez hoje, linha do tempo por sessão, busca por texto.
- **Custo e tokens.** Painel por sessão e por dia, usando as linhas `cost-state` do transcript.
- **Agent teams e jobs.** Mostrar `~/.claude/teams/` (times de agentes, caixas de entrada) e `~/.claude/jobs/` (jobs em segundo plano).
- **Modo foco.** Silenciar avisos por X minutos e definir regras de aviso por projeto.
- **Temas.** Arkham (verde), Gotham (azul noite), mais estados do mascote.

## v3: "Bat-Computador completo"

- **Multiplataforma.** macOS e Linux; sessões dentro do WSL.
- **Sessões remotas e na nuvem.** claude.ai/code, Remote Control, sessões em outras máquinas.
- **Resumo do dia.** "Hoje suas sessões fizeram…", gerado com a API do Claude.
- **Celular.** Push via ntfy ou Telegram quando você estiver longe do PC.
- **Alertas inteligentes.** Detectar sessão em loop, tarefa travada há muito tempo, custo fora da curva.
- **Distribuição.** Plugin num marketplace público e auto-update do app.

## Como sugerir

Abra uma issue usando o modelo "Ideia".
