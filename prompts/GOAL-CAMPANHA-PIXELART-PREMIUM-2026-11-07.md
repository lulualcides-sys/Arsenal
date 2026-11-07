/goal REDESIGN VISUAL COMPLETO DO POKÉMON TORRE 2 — CAMPANHA PREMIUM PIXEL ART, SEM ALTERAR BATALHAS

REPOSITÓRIO: https://github.com/lulualcides-sys/Pok-mon-torre-2
JOGO: https://lulualcides-sys.github.io/Pok-mon-torre-2/
ARSENAL: https://github.com/lulualcides-sys/Arsenal
KIT SELECIONADO: toolkits/pokemon-campanha-design/ no Arsenal

MISSÃO
Melhorar o design visual de TODAS as interfaces, cidades e telas da campanha do Pokémon Torre 2, com pixel art rica, coesa, legível e acabamento de jogo comercial 2D inspirado na experiência visual de FireRed/LeafGreen, sem copiar ativos sem licença. Reaproveitar em primeiro lugar os sprites e artes próprios já existentes e aprovados. Não me entregar só imagens conceituais: implementar alterações no código real em branches de homologação, abrir PRs, testar e fornecer links de preview/screenshot reais para aprovação antes da publicação.

LIMITES ABSOLUTOS — NÃO NEGOCIÁVEIS
1. NÃO modificar a tela, HUD, botões, lógica, câmera, efeitos, sprites, Pokémon, movimentos ou animações DURANTE AS BATALHAS, seja na Arena, seja na campanha. A seleção da Arena fora da luta só pode ser ajustada visualmente se já fizer parte do fluxo e sem tocar no combate.
2. NÃO mudar movesets, evoluções, kits nativos Poké Arena 2D, VFX aprovados, IA, balanceamento, tipos, captura, clima, cooldown, save, níveis, inventário de dados ou progressão. Só modificar apresentações visuais fora das batalhas.
3. Respeitar integralmente AGENTS.md, a política de golpes, a baseline do guardião visual, decisões anteriores do projeto e os assets aprovados. Na colisão entre uma skill externa e essas regras, prevalece o projeto.
4. NÃO sobrescrever trabalho de outras PRs, não mesclar branches antigas cegamente, não usar placeholder genérico como asset final e não publicar diretamente na main sem testes e aprovação visual.

ESCOPO VISUAL — COBRIR A CAMPANHA INTEIRA
A. Tela inicial, escolha de jornada, abertura do Professor, diálogos, confirmações, seleção de personagem e transições fora do combate.
B. Cidades, rotas, cavernas e interior de TODOS os ginásios: profundidade visual, cenário detalhado, pedras, pontes, árvores, jardins, muros, iluminação e sprites corretos de NPCs e treinadores; manter geografia, nomes, ordem e acessos do jogo.
C. Cards de treinadores, líderes e rivais: portraits/sprites consistentes, Pokémon posicionados e escalados corretamente, bordas pixel art trabalhadas, hierarquia visual clara e leitura no celular; preservar as equipes reais dos treinadores.
D. Pokémon Center, Poké Mart, PC, bolsa, itens, TMs, equipe, sumário, Pokédex, insígnias, configurações, alertas, modais, telas de vitória fora do HUD e painéis de navegação.
E. Páginas, filtros e setas de seleção fora da batalha: evitar listas enormes, cards quebrados, sobreposições, espaços vazios e rolagem acidental.
F. Detalhes: tipografia pixel legível, ícones distintos por função, estados hover/focus/pressed/disabled, transições discretas, indicação de selecionado, zoom e resolução consistentes.

DIREÇÃO DE ARTE APROVADA
Usar a referência visual CERULEAN CITY aprovada como norte de qualidade: pixel art Kanto rica em detalhes, caminhos e escadarias de pedra clara, árvores volumosas, água/canais/pontes, telhados coloridos, iluminação ambiente e personagens alinhados ao chão. Melhorar materiais e silhuetas, não apenas trocar cores e bordas. Evitar aparência genérica de dashboard web, caixas iguais para tudo, gradientes borrados, escala fracionária que desfoca pixels, sprites fora de proporção ou excesso de efeitos que travem o Phaser. Definir um mini design system de cores, bordas, espaçamento, fontes, ícones, estados e tamanhos; validar em 390x844, 768x1024 e desktop 16:9. Preservar identidade dos cards de campanha já aprovados, refinando sem reiniciar do zero.

FERRAMENTAS — APENAS AS COMPATÍVEIS DO ARSENAL
- Já vinculadas: Pixelorama, LibreSprite e Tiled (assets, sprites e mapas), Playwright MCP e testes Chromium (capturas e inspeção), Spec Kit e Superpowers (especificação, diagnóstico, testes). Reaproveitar sem duplicar versões ou instalar no runtime do jogo.
- Novo kit do Arsenal: awesome-gamedev-agent-skills; ler SELETIVAMENTE create-game-assets, game-ui-ux, level-design e performance-optimization; conferir versão real do Phaser antes de ler/aplicar phaser-core. SVG.js somente para protótipos/arte vetorial externa ao runtime do jogo e quando simplificar a implementação; não transformar arte pixel em SVG borrado.
- Investigar outras fontes catalogadas apenas quando houver um problema concreto. NÃO instalar em massa, usar plugins externos com hooks não auditados, migrar Phaser/Pixi nem acrescentar biblioteca pesada ao jogo sem teste comparativo e aprovação.

EXECUÇÃO AUTÔNOMA POR ETAPAS
0. Inspecionar main, PRs abertas, módulos visuais reais e screenshots aprovadas; mapear todas as telas e registrar baseline (SHA, screenshots, problemas, dimensões). Fazer backup/branch de segurança. Ler docs/GUIA-RAPIDO-REPOSITORIO.md e as regras obrigatórias.
1. Construir um inventário de telas/áreas com status; registrar prioridades pelos maiores problemas (cards de treinadores, menus, organização da campanha, ginásios, PC/Loja, Pokédex/equipe).
2. Produzir PRIMEIRO uma amostra IMPLEMENTADA: uma tela de cidade, um card de treinador e um menu/PC com as mesmas regras visuais. Rodar no navegador e apresentar screenshots reais lado a lado antes/depois. Não propagar um padrão que não foi aprovado.
3. Depois da aprovação da amostra, aplicar em lotes pequenos às demais cidades, rotas, cavernas, ginásios e interfaces, respeitando variantes por área e personagens originais.
4. Para cada lote: usar branch isolada e PR, preservar importações/assets, executar testes focados e validar layout e carregamento no Chromium mobile/desktop; medir erros de console, overflow, pixels borrados, sprites faltando, FPS e uso de memória onde relevante.
5. Antes de cada merge, rodar a suíte completa relevante, o guardião visual e os testes Phaser da campanha e Arena como REGRESSÃO (sem modificar a Arena). Comparar snapshots de kits/VFX nativos e saves antes/depois, conferir CI e o SHA efetivamente servido no link de homologação.
6. Publicar na main e no site original SOMENTE depois de evidência técnica e aprovação visual específica. Se um teste falhar, investigar, corrigir em branch e repetir, sem afirmar conclusão antecipada.

CRITÉRIOS DE ACEITE
Todas as telas da campanha ficam consistentes, funcionais e ricas em pixel art, sem cortes, texto fora do card, itens ilegíveis, sobreposição de sprites ou quebras em mobile. Nenhum elemento de batalha sofreu mudança. Nenhum save, kit nativo, VFX ou fluxo aprovado foi alterado. Existência de preview real, screenshots antes/depois, métricas verificáveis quando aplicáveis e testes verdes no commit exato.

ENTREGA
Fornecer por fase: arquivos alterados, motivo, screenshots reais, link da PR e de preview, testes executados (com SHA), métricas medidas, riscos, pendências e status REAL: planejado / implementado / testado / aprovado visualmente / mesclado / publicado e verificado. Não declarar que instalou ferramentas se apenas as catalogou ou vinculou como submódulo. Não pedir confirmação a cada correção pequena; pedir aprovação somente nas decisões visuais de referência e antes de publicar.