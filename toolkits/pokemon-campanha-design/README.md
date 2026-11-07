# Kit de design da campanha — Pokémon Torre 2

**Uso:** apoio externo para design, prototipagem e teste da campanha. NÃO é plugin do jogo e não entra no bundle publicado.

## Seleção feita a partir do Arsenal

| Ferramenta | Situação | Uso seguro |
|---|---|---|
| Pixelorama | Submódulo já vinculado em fontes/ferramentas/pixelorama | Produção/revisão de pixel art e spritesheets, sem modificar ativos aprovados |
| Tiled | Submódulo já vinculado em fontes/ferramentas/tiled | Composição de mapas/camadas, nunca mexer em mecânica da campanha |
| LibreSprite | Submódulo já vinculado em fontes/ferramentas/libresprite | Correção manual de silhueta, alinhamento, transparência e frames |
| Playwright MCP | Submódulo já vinculado em fontes/ferramentas/playwright-mcp | Revisão visual no navegador, não substituir screenshots reais por conceitos |
| Spec Kit + Superpowers | Submódulos já vinculados | Especificar, depurar e testar em branch; sem trabalho duplicado |
| Awesome GameDev Agent Skills | Novo submódulo fixado em fontes/ferramentas/gamedev-agent-skills | Ler apenas skill de arte/UI/níveis/performance necessária; nunca instalar as 77 sem filtro |
| SVG.js | Novo submódulo fixado em fontes/ferramentas/svg-js e pacote npm opcional fixo em 3.2.8 | Protótipos/ícones vetoriais fora do runtime Phaser; não criar arte final desfocada |

### Excluídos da instalação deliberadamente

- design-taste-frontend: regras de landing pages e hooks executáveis que conflitam com o padrão pixel art; já catalogado, mas não instalar globalmente.
- Effekseer: ótima opção para golpes e efeitos de combate, mas o combate foi explicitamente excluído desta missão.
- Friction, Natron, OpenToonz, Synfig: editores de motion graphics/vídeo, não dependências úteis para menus Phaser nesta etapa.
- FreeMoCap/OpenVDB: 3D/motion capture desnecessários para a campanha 2D.
- Graphiti, Auto Ontology e agentes grandes: não demonstram melhoria visual; custo e manutenção sem justificativa.

## Como obter código e instalar o kit de prototipagem localmente

    git clone https://github.com/lulualcides-sys/Arsenal.git
    cd Arsenal
    git submodule update --init fontes/ferramentas/gamedev-agent-skills fontes/ferramentas/svg-js
    npm install --prefix toolkits/pokemon-campanha-design --no-audit --no-fund --no-package-lock --ignore-scripts
    node toolkits/pokemon-campanha-design/verify.mjs

Os outros submódulos (Pixelorama, Tiled etc.) já existem no Arsenal; inicialize só os necessários. **Isso baixa o código-fonte e instala somente a biblioteca npm de prototipagem; não instala aplicativos desktop nem altera o PC automaticamente.**

A automação de CI instala SVG.js em um runner temporário e verifica as duas fontes. Nunca instala dependências no jogo ou servidor de produção.

## Prompt para execução em uma sessão de desenvolvimento

[GOAL de redesign completo e testes obrigatórios](../../prompts/GOAL-CAMPANHA-PIXELART-PREMIUM-2026-11-07.md)

**Regra principal:** a Arena em combate e TODAS as batalhas estão fora do escopo; preservar sprites/VFX/kits e saves aprovados; mudanças na campanha exigem homologação visual e regressões antes do merge.
