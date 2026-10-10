# Varredura GitHub — novas ferramentas para o Arsenal
**Data:** 10/10/2026 · **Resultado:** 42 projetos novos com repositórios verificados, 13 vinculados com código Git como submódulos. Catálogo geral passou de 162 para 204 projetos GitHub. O catálogo anterior de 43 sites, fontes, projetos e APIs continua separado.

## Prioridades práticas por projeto

**Pokémon Torre e batalha Emerald Arena**
1. **sprite-tools**: recortar, alinhar, organizar animações e preparar atlas/colisões de sprites; é utilitário, não fornece Pokémon com direitos de uso.
2. **Pixelorama e LibreSprite**: animação 2D, ajustes de quadros, spritesheets.
3. **Tiled**: montagem rápida e precisa de arenas, obstáculos, colisões, sem exploração obrigatória.
4. **Howler.js**: trilhas, transições e efeitos de batalha no navegador. Godot/PixiJS/Bevy são alternativas de motor, não substituições imediatas do Emerald Arena nativo.

**NEXUS — estatísticas reais e backtest**
1. **Kloppy**: formatos de dados de ações e tracking de futebol.
2. **open-football-analytics** e **Soccer xG**: exemplos de xG/xT/VAEP verificáveis com dados abertos. Não inventar xG ou posições ausentes.
3. **Optuna**: ajustar hiperparâmetros SEM otimizar o próprio período de teste. Fazer walk-forward e validação por competição/período.
4. **scikit-learn, LightGBM, XGBoost**: previsão e calibração; separar probabilidade prevista, odds disponíveis e P/L líquido REAL. Nenhum projeto produz lucros garantidos.
5. **Evidently**: monitoramento de drift, dados faltantes e estabilidade de sinais.
6. **SkillCorner Open Data**: dados de demonstração; não é acesso ilimitado a todos os campeonatos ou estatísticas minuto a minuto.

**WildVox — melhor edição**
1. **Real-ESRGAN**: recuperar nitidez nos clipes licenciados, medindo custo computacional e artefatos.
2. **SAM 2**: segmentação de animais/objetos na cena, útil para reenquadramento, mas pode exigir GPU.
3. **MoviePy**: edição Python automatizada para testes; FFmpeg atual segue estável.
4. **Blender**: cenas/animações autorais e identidade de marca; ferramenta grande e pesada.

**Engenharia e agentes**
1. **Spec Kit**: contratos/especificações + TDD antes de prometer entregas.
2. **Playwright MCP**: testar interfaces e fluxos web reais.
3. **Graphiti**: memória temporal estruturada para agentes.
4. **promptfoo**: avaliação de agentes e qualidade de respostas.
5. **REA continua prioridade máxima** para investigação autorizada de código e estrutura de sistemas.

## Código efetivamente vinculado por submódulo (13)

| Ferramenta | Caminho no Arsenal | Commit fixado |
|---|---|---|
| [trebeljahr/sprite-tools](https://github.com/trebeljahr/sprite-tools) | [`fontes/ferramentas/sprite-tools`](../fontes/ferramentas/sprite-tools) | `a2908b189401ae697aa173e7f4256971ec63ba10` |
| [Orama-Interactive/Pixelorama](https://github.com/Orama-Interactive/Pixelorama) | [`fontes/ferramentas/pixelorama`](../fontes/ferramentas/pixelorama) | `e205f47699f424244a7ddc738bac2e0ca42769c1` |
| [LibreSprite/LibreSprite](https://github.com/LibreSprite/LibreSprite) | [`fontes/ferramentas/libresprite`](../fontes/ferramentas/libresprite) | `1fb0c749b7c29369dfcc4d58d30678e197996a40` |
| [mapeditor/tiled](https://github.com/mapeditor/tiled) | [`fontes/ferramentas/tiled`](../fontes/ferramentas/tiled) | `221be2066c4b0ed4bbefbcdfe25d0ad952fc51bd` |
| [PySport/kloppy](https://github.com/PySport/kloppy) | [`fontes/ferramentas/kloppy`](../fontes/ferramentas/kloppy) | `ad453c40116e254a7d475b857c46d4af164a3a54` |
| [leemingo/open-football-analytics](https://github.com/leemingo/open-football-analytics) | [`fontes/ferramentas/open-football-analytics`](../fontes/ferramentas/open-football-analytics) | `6a66e123de0e790f11c6c566b98e5bcadf7bdceb` |
| [trae55/soccer](https://github.com/trae55/soccer) | [`fontes/ferramentas/soccer-xg`](../fontes/ferramentas/soccer-xg) | `b9489d929e0fa34771267d429256366d0fda27ad` |
| [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) | [`fontes/ferramentas/real-esrgan`](../fontes/ferramentas/real-esrgan) | `a4abfb2979a7bbff3f69f58f58ae324608821e27` |
| [github/spec-kit](https://github.com/github/spec-kit) | [`fontes/ferramentas/spec-kit`](../fontes/ferramentas/spec-kit) | `0443760542e7e5269724744a2ac55c4bd386d095` |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | [`fontes/ferramentas/playwright-mcp`](../fontes/ferramentas/playwright-mcp) | `b8b4183e099f136cbec0388a6088d4aa2f6b9685` |
| [getzep/graphiti](https://github.com/getzep/graphiti) | [`fontes/ferramentas/graphiti`](../fontes/ferramentas/graphiti) | `a9ef13f7e2cce23e92abd2f76947f42e270da25a` |
| [optuna/optuna](https://github.com/optuna/optuna) | [`fontes/ferramentas/optuna`](../fontes/ferramentas/optuna) | `13a3ff1c78314b6a1117dcee9dbbe54ab66788f9` |
| [goldfire/howler.js](https://github.com/goldfire/howler.js) | [`fontes/ferramentas/howler-js`](../fontes/ferramentas/howler-js) | `1d3053576a860e9854645493ad6c4a72c6cc6e45` |

## Lista completa de novos projetos (42)

| Nº | Projeto GitHub | Área | Situação | Aplicação |
|---:|---|---|---|---|
| 1 | [godotengine/godot](https://github.com/godotengine/godot) | Pokémon | Referência | Motor 2D/3D, animações, física e exportação; projeto grande |
| 2 | [mapeditor/tiled](https://github.com/mapeditor/tiled) | Pokémon | Submódulo Git | Editor de mapas, tiles e colisões de arenas |
| 3 | [Orama-Interactive/Pixelorama](https://github.com/Orama-Interactive/Pixelorama) | Pokémon | Submódulo Git | Editor de pixel art, spritesheets e animações |
| 4 | [LibreSprite/LibreSprite](https://github.com/LibreSprite/LibreSprite) | Pokémon | Submódulo Git | Editor de sprites animados; verificar licença do projeto |
| 5 | [trebeljahr/sprite-tools](https://github.com/trebeljahr/sprite-tools) | Pokémon | Submódulo Git | Ferramentas CLI/MCP para sprites, atlas e colisões; revisar maturidade |
| 6 | [pixijs/pixijs](https://github.com/pixijs/pixijs) | Pokémon | Referência | Renderização acelerada de sprites 2D em navegador |
| 7 | [goldfire/howler.js](https://github.com/goldfire/howler.js) | Pokémon | Submódulo Git | Biblioteca de áudio e efeitos de batalha |
| 8 | [bevyengine/bevy](https://github.com/bevyengine/bevy) | Pokémon | Referência | Motor de jogos Rust/ECS, referência alternativa |
| 9 | [skillcorner/opendata](https://github.com/skillcorner/opendata) | NEXUS | Referência | Amostra pública de tracking; verificar atribuição e escopo |
| 10 | [PySport/kloppy](https://github.com/PySport/kloppy) | NEXUS | Submódulo Git | Normalização de eventos/tracking de futebol |
| 11 | [trae55/soccer](https://github.com/trae55/soccer) | NEXUS | Submódulo Git | Experimentos de modelagem xG com dados SPADL |
| 12 | [leemingo/open-football-analytics](https://github.com/leemingo/open-football-analytics) | NEXUS | Submódulo Git | Exemplos xG/xPass/xT/VAEP e métricas físicas com amostras públicas |
| 13 | [AtaSakik/PressIQ](https://github.com/AtaSakik/PressIQ) | NEXUS | Referência | Protótipo tático com modelos xG/xT; novo e requer avaliação |
| 14 | [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | NEXUS | Referência | Classificadores, validação e calibração probabilística |
| 15 | [optuna/optuna](https://github.com/optuna/optuna) | NEXUS | Submódulo Git | Otimização de hiperparâmetros; exige validação temporal |
| 16 | [microsoft/LightGBM](https://github.com/microsoft/LightGBM) | NEXUS | Referência | Gradient boosting para previsão baseada em features |
| 17 | [dmlc/xgboost](https://github.com/dmlc/xgboost) | NEXUS | Referência | Gradient boosting e experimentos de modelos |
| 18 | [catboost/catboost](https://github.com/catboost/catboost) | NEXUS | Referência | Modelos supervisionados com variáveis categóricas; projeto grande |
| 19 | [evidentlyai/evidently](https://github.com/evidentlyai/evidently) | NEXUS | Referência | Monitoramento de qualidade, drift e desempenho do modelo |
| 20 | [Nixtla/mlforecast](https://github.com/Nixtla/mlforecast) | NEXUS | Referência | Machine learning em séries temporais |
| 21 | [Nixtla/statsforecast](https://github.com/Nixtla/statsforecast) | NEXUS | Referência | Modelos estatísticos de previsão temporal |
| 22 | [unit8co/darts](https://github.com/unit8co/darts) | NEXUS | Referência | Séries temporais, backtest e forecast |
| 23 | [statsmodels/statsmodels](https://github.com/statsmodels/statsmodels) | NEXUS | Referência | Estatística, modelos e testes de hipóteses |
| 24 | [facebookresearch/sam2](https://github.com/facebookresearch/sam2) | WildVox | Referência | Segmentação de objetos em imagem e vídeo; GPU pode ser necessária |
| 25 | [xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) | WildVox | Submódulo Git | Upscaling de imagens/vídeos e redução de artefatos; custos de GPU |
| 26 | [blender/blender](https://github.com/blender/blender) | WildVox | Referência | Modelagem/animação 3D e render programável; projeto grande |
| 27 | [Zulko/moviepy](https://github.com/Zulko/moviepy) | WildVox | Referência | Composição de vídeo programática em Python |
| 28 | [OpenShot/openshot-qt](https://github.com/OpenShot/openshot-qt) | WildVox | Referência | Editor open source para estudar interface e fluxo de edição |
| 29 | [github/spec-kit](https://github.com/github/spec-kit) | Dev/IA | Submódulo Git | Desenvolvimento orientado a especificações e tarefas verificáveis |
| 30 | [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | Dev/IA | Referência | Avaliação/regressão de prompts e agentes; revisar condições de execução |
| 31 | [browserbase/stagehand](https://github.com/browserbase/stagehand) | Dev/IA | Referência | Automação de navegador com orientação por IA |
| 32 | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Dev/IA | Referência | Implementações de servidores MCP para ferramentas |
| 33 | [getzep/graphiti](https://github.com/getzep/graphiti) | Dev/IA | Submódulo Git | Grafo temporal de conhecimento para memória de agentes |
| 34 | [openai/codex](https://github.com/openai/codex) | Dev/IA | Referência | Ferramenta de programação assistida por agentes |
| 35 | [anthropics/claude-code](https://github.com/anthropics/claude-code) | Dev/IA | Referência | Ferramenta CLI de desenvolvimento assistido |
| 36 | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | Dev/IA | Referência | CLI de desenvolvimento assistido |
| 37 | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | Dev/IA | Submódulo Git | Integração MCP para automação e inspeção de navegador |
| 38 | [e2b-dev/E2B](https://github.com/e2b-dev/E2B) | Dev/IA | Referência | Ambientes isolados para execução de código; pode ter custos |
| 39 | [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | Dev/IA | Referência | Diagramas de arquitetura e fluxo gerados por texto |
| 40 | [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | Dev/IA | Referência | Diagramas visuais de interface e arquitetura |
| 41 | [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) | Dev/IA | Referência | Validação automatizada de qualidade dos dados |
| 42 | [dbt-labs/dbt-core](https://github.com/dbt-labs/dbt-core) | Dev/IA | Referência | Transformações SQL versionadas e testes |

## Segurança, licença e qualidade

- **Vincular não significa instalar.** Cada submódulo aponta a código de um terceiro em commit específico, com sua licença e créditos originais, obtido com `git clone --recurse-submodules`.
- Como o Arsenal é público, não publicar ROM comercial, tokens, dados brutos privados do NEXUS, relatórios de bots, senhas ou vídeos proprietários.
- GitHub acessível e branch existente **não equivalem** a auditoria formal de segurança, compatibilidade, custo, desempenho ou licença de uso comercial; esses testes são posteriores.
- Ferramentas enormes (Godot, Blender, CatBoost, SAM2 etc.) estão no catálogo, **sem submódulo**, para evitar clones desnecessariamente pesados.
- Projetos arquivados, repositórios não encontrados, duplicatas e candidatos cuja origem não foi confirmada ficaram fora desta seleção.
