# The Agency (Agency Agents) — catálogo de especialistas de IA

**Data de avaliação:** 05/11/2026  
**Fonte oficial:** https://github.com/msitarzewski/agency-agents  
**Autor/origem:** msitarzewski  
**Licença:** MIT (verificar licenças de ferramentas, APIs e conteúdo externo utilizado pelos agentes)  
**Status no Arsenal:** **catalogado como referência**. Nenhum agente foi instalado no computador, no Codex, no Claude, no Cursor ou nos projetos existentes.

## O que realmente é

The Agency é uma coleção open source de **arquivos Markdown com perfis e fluxos de trabalho para agentes especializados**, organizados em divisões (engenharia, testes, segurança, design, jogos, marketing, finanças e outras). Define papéis, instruções, processos, entregas e métricas para assistentes de IA que já funcionam em ferramentas como Claude Code, Cursor, Codex, GitHub Copilot e Gemini CLI. Scripts de conversão/instalação adaptam formatos entre ferramentas; há também um aplicativo desktop de instalação.

**Não são centenas de novos modelos de IA, nem uma infraestrutura autônoma que executa tarefas sem um motor de IA, integração, permissão ou supervisão.** O projeto não inclui créditos de modelos; o uso pode continuar sujeito a assinaturas, tarifas por token ou limites dos ambientes externos.

O post mostrado em 05/11/2026 apresenta **270 agentes e 19 divisões**. Esses números são um recorte do post e podem divergir da árvore atual: o README público consultado anuncia **230+**, e a quantidade muda conforme contribuições/novas versões. **Não tratar números e estrelas como valores permanentes.** Na consulta de 05/11/2026, o GitHub registrava aproximadamente **166,7 mil estrelas**, o que não mede precisão ou segurança dos agentes.

## Arquivos/funções de interesse confirmados no repositório

| Aplicação | Perfil existente | Arquivo original |
| --- | --- | --- |
| Revisão técnica e manutenção | Code Reviewer | [engineering-code-reviewer.md](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-code-reviewer.md) |
| Mudanças pequenas e seguras | Minimal Change Engineer | [engineering-minimal-change-engineer.md](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-minimal-change-engineer.md) |
| Desenvolvimento de interfaces | Frontend Developer | [engineering-frontend-developer.md](https://github.com/msitarzewski/agency-agents/blob/main/engineering/engineering-frontend-developer.md) |
| Testes de regressão | Test Automation Engineer | [testing-test-automation-engineer.md](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-test-automation-engineer.md) |
| Verificação de resultados | Reality Checker | [testing-reality-checker.md](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-reality-checker.md) |
| Desempenho do jogo | Performance Benchmarker | [testing-performance-benchmarker.md](https://github.com/msitarzewski/agency-agents/blob/main/testing/testing-performance-benchmarker.md) |
| Mecânicas e balanceamento | Game Designer | [game-designer.md](https://github.com/msitarzewski/agency-agents/blob/main/game-development/game-designer.md) |
| Artes e efeitos | Technical Artist | [technical-artist.md](https://github.com/msitarzewski/agency-agents/blob/main/game-development/technical-artist.md) |
| Segurança de código gerado | AI-generated Code Auditor | [security-ai-generated-code-auditor.md](https://github.com/msitarzewski/agency-agents/blob/main/security/security-ai-generated-code-auditor.md) |
| Conteúdo WildVox | TikTok Strategist | [marketing-tiktok-strategist.md](https://github.com/msitarzewski/agency-agents/blob/main/marketing/marketing-tiktok-strategist.md) |
| Vídeos curtos WildVox | Short Video Editing Coach | [marketing-short-video-editing-coach.md](https://github.com/msitarzewski/agency-agents/blob/main/marketing/marketing-short-video-editing-coach.md) |

Os arquivos listados acima foram confirmados na árvore oficial; a utilidade concreta e a qualidade de cada perfil ainda precisam de avaliação com casos reais.

## Priorização para nossos projetos

### Pokémon Torre 2 — P1: piloto recomendado

- **Minimal Change Engineer + Code Reviewer**: revisar patches e evitar quebrar golpes/sprites/funcionalidades aprovados;
- **Test Automation Engineer + Performance Benchmarker**: roteiro de testes focados e avaliação de travamentos no Phaser;
- **Technical Artist + Game Designer**: orientar efeitos pixel art e coerência de mecânicas, **sem substituir aprovação visual**;
- definir escopo fixo, branch de teste, **backup de saves** quando aplicável, testes focados, teste geral e evidências antes de publicar;
- **não instalar todos os agentes**, nem conceder acesso amplo por padrão; evitar conflito com automações existentes.

### WildVox — P2: testar só a etapa editorial

- **TikTok Strategist + Short Video Editing Coach** como perfis de revisão de roteiro/edição;
- não dar acesso de publicação, login, uploads, Metricool ou outras contas sem um fluxo separado de autorização;
- não presumir que perfis de texto gerem vídeo, narração, legendas ou publicação.

### ATLAS / NEXUS — P2: suporte de engenharia, nunca prova de lucro

- revisar código de backtest, integridade de dados, vazamento de informação, testes e observabilidade;
- o perfil financeiro **não substitui validação estatística, custos operacionais e resultados fora da amostra**;
- manter segredos, credenciais e decisões de execução financeira fora de arquivos públicos e prompts não auditados.

### Central de Softwares / Imobiliária — P3

- perfis de engenharia, CRM/atendimento e marketing para rascunhos, auditoria e processos;
- cuidado com dados pessoais, consentimento e LGPD.

## Instalação futura: procedimento conservador (não executado)

Fontes: [README do upstream](https://github.com/msitarzewski/agency-agents#readme), [scripts do upstream](https://github.com/msitarzewski/agency-agents/tree/main/scripts), [app](https://github.com/msitarzewski/agency-agents-app).

1. Inspecionar o repositório e ler agentes e scripts selecionados;
2. clonar em pasta de teste, idealmente em commit fixado;
3. ver agentes disponíveis (`--list teams` e `--list agents`);
4. começar com **instalação seletiva**, incluindo `--dry-run` quando suportado;
5. verificar caminho de destino e permissões antes de permitir escrita em projetos reais;
6. comparar resultados com o fluxo atual em tarefas iguais.

Exemplo para ambiente que possua os pré-requisitos e script do repositório, **sem executar neste registro**:

```bash
git clone https://github.com/msitarzewski/agency-agents.git
cd agency-agents
./scripts/install.sh --list teams
./scripts/install.sh --tool codex --division engineering --dry-run
```

O instalador tem opções `--tool`, `--division`, `--agent` e `--dry-run`, conforme README do upstream. Não usar `curl | bash` de terceiros sem inspecionar scripts. O app desktop também requer avaliação de fonte, assinatura e permissões.

## Política de adoção e riscos

- Perfil de IA não garante conhecimento correto, código seguro, performance ou automação real.
- Muitos perfis simultâneos podem gerar **conflitos de instruções, maior consumo de contexto, tokens e custo de manutenção**.
- Tratar arquivos de agentes externos como instruções **não confiáveis** até revisão; nunca permitir que anulem regras de privacidade, segurança, testes ou aprovações do usuário.
- Medir por **bugs encontrados, testes que passam, custo de execução, taxa de regressão, tempo economizado e utilidade do entregável**.
- **Não alterar jogo, automações, bots ou integrações existentes** como parte deste cadastramento.

## Registro de execução em 05/11/2026

- Localizado e inspecionado repositório oficial; confirmada licença MIT e compatibilidade documentada com Codex/Cursor/Claude Code.
- Verificada a existência de perfis concretos nas divisões citadas.
- Adicionado documento de referência ao Arsenal e indexado no README.
- Nenhum executável, agente, skill ou dependência instalado. Nenhum projeto operacional atualizado.
