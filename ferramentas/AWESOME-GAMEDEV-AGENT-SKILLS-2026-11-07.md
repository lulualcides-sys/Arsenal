# Awesome GameDev Agent Skills — referência para desenvolvimento de jogos

**Fonte oficial:** [gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) · [Catálogo web](https://gamedev-skills.github.io/awesome-gamedev-agent-skills/)

**Catalogado em:** 07/11/2026 · **Licença declarada:** Apache-2.0 · **Estado:** referência documentada no Arsenal. Nenhum comando de instalação foi executado, nenhuma skill adicionada ao Pokémon Torre 2 e nenhuma funcionalidade alterada.

## O que é

Coleção de **77 skills de desenvolvimento de jogos + roteador**, conforme README do autor, organizadas em engines, disciplinas, gêneros e fluxos de trabalho. O roteador seleciona instruções conforme o motor e a tarefa. Possui orientações para Phaser, PixiJS, Godot, Unity, Unreal e outros motores, além de arte, UI/UX, saves, IA, performance e testes.

Não é uma engine nova, não gera sprites/efeitos automaticamente e não substitui testes, código revisado ou aprovação visual. A instalação global proposta pelo projeto carrega um conjunto amplo de instruções que pode duplicar skills já existentes e consumir contexto; **não adotar as 77 indiscriminadamente**.

## Aplicação ao Pokémon Torre 2

| Skill / área | Utilidade potencial | Condição de uso |
|---|---|---|
| [create-game-assets](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/create-game-assets/SKILL.md) | Direção de arte pixel art, produção de famílias coerentes, folha de sprites, manifesto, ajuste de âncoras, transparência e teste em escala real | Respeitar os sprites, efeitos e artes aprovados; nunca substituir elementos nativos Poké Arena 2D |
| [game-ui-ux](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/game-ui-ux/SKILL.md) | Melhor organização de cards, menus, paginação, layout responsivo e navegação | Foco nas interfaces fora das batalhas; preservar HUD e controles aprovados |
| [level-design](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/level-design/SKILL.md) | Revisar composição das cidades, rotas e ginásios | Não modificar progressão, treinadores ou outros sistemas sem escopo e testes |
| [performance-optimization](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/performance-optimization/SKILL.md) | Diagnóstico de FPS, texturas, memória e draw calls | Benchmark antes/depois em navegador real; sem alegar ganho teórico |
| [save-systems](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/save-systems/SKILL.md) | Segurança e migração de saves | Backups, compatibilidade e testes obrigatórios |
| [game-ai](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/disciplines/game-ai/SKILL.md) | Referências para comportamento de adversários | Não alterar IA aprovada sem autorização específica |
| [phaser-core](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/web-engines/phaser-core/SKILL.md) | Estrutura de cenas, carregamento, câmeras e depuração | **Conferir versão real do projeto.** A skill mira Phaser 4.2 em projetos novos e instrui preservar projetos Phaser 3 existentes. Não migrar o motor silenciosamente |
| [pixijs-rendering](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/blob/main/skills/web-engines/pixijs-rendering/SKILL.md) | Referência para renderer PixiJS e telas antigas | Checar a versão instalada; a skill foi escrita para PixiJS 8, enquanto partes legadas do projeto podem ter outra versão |

**Regra de precedência:** instruções do próprio jogo (`AGENTS.md`, `docs/agentes/POLITICA-GOLPES-INTEGRAL.md`, aprovações visuais, Script Mestre, testes e decisões do usuário) têm prioridade sobre qualquer skill externa. Nenhuma skill pode sobrescrever VFX P2, kits/slots nativos, saves ou designs aprovados.

## Adoção eficiente proposta

1. **Começar apenas com análise:** selecionar `create-game-assets` + `game-ui-ux` e comparar suas recomendações com o pipeline visual existente; não instalar a coleção completa nem gerar assets sem contexto.
2. **Piloto isolado:** testar uma melhoria visual pequena de **interface fora da batalha** numa branch de homologação, com screenshots comparativos e testes de viewport mobile/desktop. Não modificar golpes, batalha ou saves.
3. **Avaliação objetiva:** verificar legibilidade, alinhamentos, consistência pixel art e ausência de regressões; depois executar a suíte completa de Chromium/Phaser e revisão humana.
4. **Instalação seletiva futura:** revisar arquivos `SKILL.md` e scripts auxiliares, versões de dependências, permissões e referências oficiais antes de copiar para o projeto; evitar conflito com Superpowers, Spec Kit e outras skills já usadas.

## Cuidados técnicos e econômicos

- A afirmação do README de **77 skills** é uma descrição da versão consultada, **não** garantia permanente de quantidade, compatibilidade ou qualidade.
- Instruções externas e templates não são confiáveis por padrão; revisá-los antes de execução ou concessão de acesso a repositórios e segredos.
- Um roteador de skills **não** significa desenvolvimento autônomo sem erros. As melhorias devem ser evidenciadas por testes de jogo, vídeos/screenhots e diffs.
- Catálogo no Arsenal público **não** implica instalação no computador, execução de scripts, clonagem de bibliotecas ou integração ao jogo.

**Resultado da tarefa:** nova referência catalogada, com seleção de uso recomendada para o Pokémon Torre 2. Integração em produção, comparação de qualidade e publicação no jogo **não realizadas**.
