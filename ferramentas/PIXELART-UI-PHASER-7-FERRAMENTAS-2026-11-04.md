# Pokémon Torre 2 — 7 ferramentas para pixel art, UI e qualidade visual

**Data:** 04/11/2026 · **Escopo:** catálogo de referências e plano de adoção, não instalação.  
**Projeto:** https://github.com/lulualcides-sys/Pok-mon-torre-2

## Decisão técnica

Evitar novas alterações cosméticas diretas em Phaser Graphics sem spritesheets editáveis, comparações visuais reais e revisão explícita. O pipeline deve separar **fonte editável → exportação → integração isolada → renderização no Chromium → revisão visual humana → publicação**. Não usar screenshots da interface reprovada como baselines aprovados.

| # | Ferramenta oficial | Função prioritária | Licença/custo e decisão |
|---|---|---|---|
| 1 | [Pixelorama](https://pixelorama.org/) ([CLI](https://pixelorama.org/user_manual/cli/)) | Criar animações por quadros e exportar spritesheets com `--headless --spritesheet --output` | Gratuito/open source; **primeira escolha para os 18 golpes**. |
| 2 | [Phaser Editor v5](https://phaser.io/editor) ([tilemaps](https://docs.phaser.io/phaser-editor/scene-editor/game-objects/tilemap-object)) | Montagem visual da hierarquia UI e das cenas Phaser; suporte a Tiled | **Comercial**, licença necessária; testar só se reduzir retrabalho. MCP requer integração configurada, não pressupor conexão. |
| 3 | [Tiled](https://www.mapeditor.org/) | Montagem de mapas, layers, tiles e objetos com exportação JSON | Gratuito/open source; usar para cidades, rotas e ginásios. |
| 4 | [Gridvana](https://github.com/osdodo/gridvana) | Experimentar edição assistida por IA com timeline, camadas e MCP | GPL-3.0-or-later; experimental. Testar uma animação em isolamento; não embutir código GPL no jogo sem análise jurídica. |
| 5 | [PixelDust](https://github.com/pjferri/pixeldust) | Prototipar partículas e exportar spritesheet + metadados de frames | Projeto pequeno; **licença de reutilização do código não confirmada**. Não incorporar código nem assets de terceiros sem direitos claros. |
| 6 | [Playwright](https://playwright.dev/docs/test-snapshots) | Capturas reais desktop/mobile e comparação com baselines visuais aprovados | Gratuito/open source; já existe `playwright-core` no Pokémon Torre 2. **Integrar porta de qualidade**, não apenas screenshots arquivadas. |
| 7 | [LibreSprite](https://github.com/LibreSprite/LibreSprite) | Editor de sprites alternativo com onion skinning, camadas e frames | Gratuito/open source GPL-2.0; **plano B para Pixelorama**. Não precisa executar dois editores ao mesmo tempo. |

## Ordem de adoção com baixo custo

1. **Playwright + contrato visual:** nenhuma nova UI/golpe passa apenas por testes de execução. Exigir screenshots originais, comparação visível e aprovação humana. Se o baseline aprovado não existir, o estado é `pending_visual_review`, nunca `passed`.
2. **Pixelorama:** desenhar inicialmente 3 golpes contrastantes (Zap Cannon, Powder Snow, Whirlpool); source `.pxo`, spritesheet PNG com alpha, 8–16 quadros, JSON de duração e comparação de impacto. Não incluir os demais 15 sem padrão visual aprovado.
3. **Tiled:** criar primeiro mapa de Cinnabar/cenário em camadas `ground`, `buildings`, `NPC`, `overlay`, `hitZones` com geometrias testáveis. Evitar screenshots achatadas sob painéis.
4. **LibreSprite:** alternativa livre caso o fluxo do Pixelorama apresente limitação.
5. **Phaser Editor v5:** avaliação comercial apenas após a prova de conceito gratuita.
6. **Gridvana/PixelDust:** laboratórios de P&D isolados; não usar produção sem revisão de maturidade e licenciamento.

## Critérios de aceitação para o Torre 2

- **UI:** sem regiões brancas/pretas vazias, sem máscara sobre o mapa, sem textos cortados, sem treinadores fora da área útil. Testar desktop, mobile landscape e clique/touch real. A arte do mapa deve ser principal e as ações contextuais secundárias.
- **Golpes:** identidade visual individual, silhueta legível, paleta, sequência de quadros, hit/impacto sincronizado, sprites escalados por inteiros com filtro nearest; não substituir golpes já aprovados.
- **Segurança:** proteger saves, modo Arena e cooldowns. Usar PR em draft, não publicar automaticamente. As capturas devem ser do Phaser real, não mockups de IA.
- **Avaliação:** revisão visual manual é obrigatória mesmo quando CI está verde; testes de Playwright não julgam qualidade estética.

## Situação real

**Registrado no Arsenal; sem instalação em máquina local.** O repositório Pokémon Torre 2 deverá conter a implementação inicial do contrato de arte/validação visual em PR separado antes de qualquer mudança na UI ou nos 18 golpes.
