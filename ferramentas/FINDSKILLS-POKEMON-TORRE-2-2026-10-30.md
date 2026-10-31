# FindSkills + catálogo de Agent Skills — Pokémon Torre 2 (30/10/2026)

## Estado verificado
- **FindSkills**: https://www.findskills.org/ — catálogo de skills e ferramentas para agentes de IA; busca pública de referências e opções de integração por CLI/MCP.
- **Find Skills (Vercel)**: https://www.skills.sh/vercel-labs/skills/find-skills — skill de descoberta e instalação por `npx skills find` e `npx skills add`. É um projeto **distinto** do site FindSkills.org.
- **Status em 30/10/2026**: o Arsenal mantém este catálogo e as **quatro skills de agente foram instaladas como arquivos locais no Pokémon Torre 2**, em `.agents/skills/`, pelo [PR #383](https://github.com/lulualcides-sys/Pok-mon-torre-2/pull/383), integrado ao `main` no commit `0541dbeff68e609ba2cbcfdd1ea0a008b67f6952`. Inclui referências auxiliares e licenças, em arquivos Markdown. Nenhum CLI, pacote npm, serviço ou MCP foi instalado no PC ou no runtime do jogo.
- **Atenção**: o catálogo informa skills mantidas por terceiros; antes de usar, verificar código-fonte, versão, permissões, dependências, licença e efeitos colaterais. Não executar `npx` de fontes não auditadas nos runners de CI.
- **Custo**: a busca/documentação pode ser gratuita, mas consumir tokens e executar APIs/modelos/serviços externos não é automaticamente gratuito. FindSkills.org anuncia cotas de busca que podem mudar.

## Verificação de compatibilidade com o projeto real
Repositório: https://github.com/lulualcides-sys/Pok-mon-torre-2
- O **jogo de campanha/arena principal** utiliza o cliente **Phaser** presente em `arena2d/` e scripts/ferramentas `tools/pokearena/`; não substituir o motor nem reconstruir a arquitetura para seguir um template de skill.
- O `index.html` da raiz contém um laboratório PixiJS **7.4.3**; há documentação histórica misturando motores. Skills para PixiJS **v8** não são aplicáveis diretamente a esta versão.
- O projeto já tem `AGENTS.md`, Spec Kit, Superpowers, Script Mestre, fila T01–T31, política de golpes, CI e testes Node/Playwright; uma nova skill é **complemento**, nunca substitui essas regras nem comprova correção.
- A fonte prioritária para a integração é `docs/GUIA-RAPIDO-REPOSITORIO.md`, com testes focados e posterior CI completo.

## Skills selecionadas (quatro instaladas no projeto como instruções)

| Prioridade | Recurso | Benefício prático | Restrições e recomendação |
| --- | --- | --- | --- |
| 1 | [Find Skills — Vercel](https://www.skills.sh/vercel-labs/skills/find-skills) | Descobrir um procedimento especializado em Phaser, testes ou depuração sem pesquisa manual extensa | É um **localizador**, não um conserto ou otimizador. Priorizar buscas específicas e não instalar tudo |
| 1 | [playwright-cli — Microsoft](https://www.skills.sh/microsoft/playwright-cli/playwright-cli) | Automatizar reprodução de travamentos de entrada em batalha, toque Android emulador, tela cheia, fluxo de captura, relatórios de console e screenshots | O projeto já usa `playwright-core` e testes browser; avaliar **reaproveitar os existentes** antes de criar nova dependência |
| 1 | [phaser-core](https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills/web-engines/phaser-core) | Inspeção do ciclo de cenas, loader, eventos, câmera e estado no Phaser | Skill original consultada, com exemplos Phaser 4.2; **não migrar** a versão do projeto e conferir APIs existentes |
| 2 | [performance-optimization](https://www.skills.sh/gamedev-skills/awesome-gamedev-agent-skills/performance-optimization) | Profiling → gargalo CPU/GPU → pooling/batching/alocação → medir novamente, com foco em demora para iniciar batalhas e FPS | Primeiro medir. Não prometer ganho nem diminuir efeitos aprovados sem medição/comparação |
| 3 | [pixijs — PixiJS oficial, v8](https://www.skills.sh/pixijs/pixijs-skills/pixijs) | Referência para render loop, sprites/containers e desempenho caso o laboratório venha a migrar | **Não aplicar ao PixiJS 7.4.3** do laboratório nem à campanha Phaser sem adaptação validada |

## Aplicações concretas e prioridade

1. **Travamento na entrada da batalha** — abrir uma sessão browser em viewport desktop e mobile, reproduzir com `playwright-core` existente, registrar erros de console/rede, tempo até cena jogável e análise de performance; só então corrigir o gargalo real. Skill candidata: Microsoft Playwright + Performance optimization.
2. **Combate/clima/IA mais consistente** — Phaser best practices como apoio para ciclo de eventos, estado, timer e atualização da cena. Exigir testes de regressão para AUTO, aplicação/expiração do clima e golpes, com política integral dos movimentos.
3. **Sprites e VFX** — usar recomendações de textura, carregamento e pooling, preservando escala pixel art e efeitos aprovados; rever créditos e licenças. Nunca gerar ataques em Canvas 2D para contornar a política atual.
4. **Testes preventivos de novos patches** — reaproveitar `node tools/dev/testes-focados.mjs <area>`, testes de navegador e workflows existentes, antes de considerar novas ferramentas.
5. **Pesquisa sob demanda** — procurar skill por problema específico; comparar mantenedor, atualização, licença, dependências e conformidade com nosso motor antes de integrar.

## Comandos opcionais de CLI (NÃO executados; instalação realizada por arquivos versionados)

```bash
# Busca sem instalar toda a coleção:
npx skills find phaser
npx skills find playwright

# Instalações possíveis APENAS após auditoria e em branch isolada:
npx skills add https://github.com/vercel-labs/skills --skill find-skills
npx skills add https://github.com/microsoft/playwright-cli --skill playwright-cli
```

## Decisão de engenharia
- **Aprovado como catálogo no Arsenal e instalado no Pokémon Torre 2 como instruções de agente**, não como dependência de produção ou ferramenta executável. [README das skills instaladas](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/.agents/skills/README.md).
- Qualquer instalação de dependência executável futura deve ser analisada contra Superpowers, Spec Kit e Playwright já existentes, com custos, lockfile e testes; a integração atual preservou saves, golpes, sprites e motor.
- **Não comprova** maior FPS, menor consumo de tokens, automação do agente ou testes bem-sucedidos. Essas melhorias dependem de medição e integração real.
- Não gravar chaves FindSkills/MCP no repositório público nem habilitar execução remota de código não revisado.

## Fontes consultadas
- https://www.findskills.org/
- https://www.findskills.org/developers
- https://www.skills.sh/vercel-labs/skills/find-skills
- https://www.skills.sh/microsoft/playwright-cli/playwright-cli
- https://github.com/gamedev-skills/awesome-gamedev-agent-skills/tree/main/skills/web-engines/phaser-core
- https://www.skills.sh/gamedev-skills/awesome-gamedev-agent-skills/performance-optimization
- https://www.skills.sh/pixijs/pixijs-skills/pixijs
- Repositório Pokémon Torre 2: `AGENTS.md`, `README.md`, `package.json`, `index.html`, `docs/GUIA-RAPIDO-REPOSITORIO.md` consultados em 30/10/2026.
