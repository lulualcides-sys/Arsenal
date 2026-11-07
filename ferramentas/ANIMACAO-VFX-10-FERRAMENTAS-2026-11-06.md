# 10 ferramentas de animação, VFX, movimento e composição — 06/11/2026

**Solicitação:** adicionar Friction, FreeMoCap, Effekseer, Theatre.js, OpenToonz, OpenVDB, Natron, Synfig Studio, SVG.js e Pencil2D ao Arsenal.

**Estado:** 10 referências oficiais identificadas no GitHub e **catalogadas, sem instalar executáveis, clonar código, acrescentar submódulos ou alterar Pokémon Torre 2, WildVox, NEXUS ou outros projetos**. As fontes oficiais, metadados e READMEs foram consultados em 06/11/2026. O nome "Friction" foi interpretado como **Friction Graphics** (friction2d/friction), um editor de motion graphics 2D. O inventário histórico do Arsenal não deve ser recontado silenciosamente: esta coleção é um acréscimo editorial posterior.

## Índice — fontes oficiais e aplicação prática

| # | Ferramenta / repositório | Função documentada | Possível uso nos projetos | Prioridade de avaliação |
|---|---|---|---|---|
| 1 | [Friction Graphics — friction2d/friction](https://github.com/friction2d/friction) · [site](https://friction.graphics/) | Editor de motion graphics com animação vetorial e raster para web/vídeo | **WildVox:** títulos, rótulos, setas, vinhetas e composições narrativas; exportação precisa ser testada no pipeline FFmpeg | **Alta (piloto audiovisual)** |
| 2 | [FreeMoCap — freemocap/freemocap](https://github.com/freemocap/freemocap) · [site](https://freemocap.org/) | Captura de movimentos baseada em vídeo, com reconstrução de poses/dados para aplicações 3D | **Pokémon Torre 2:** estudo de referências cinemáticas/movimento de treinadores; demandaria simplificação e conversão para pixel art | **Baixa / experimental** |
| 3 | [Effekseer — effekseer/Effekseer](https://github.com/effekseer/Effekseer) · [site](https://effekseer.github.io/en/) | Editor de partículas e VFX para jogos; disponibiliza runtimes e plugins, inclusive com caminhos para WebGL | **Pokémon Torre 2:** laboratório de impactos, magias, raios e explosões; **comparar contra VFX nativos do Poké Arena 2D e efeitos aprovados** | **Alta (piloto isolado)** |
| 4 | [Theatre.js — theatre-js/theatre](https://github.com/theatre-js/theatre) · [site](https://www.theatrejs.com/) | Editor/biblioteca JavaScript para controlar animações e parâmetros de cenas 3D, HTML/SVG e outros valores | **WildVox:** temporização e movimento de elementos visuais narrativos; interface web de preview | **Média-alta** |
| 5 | [OpenToonz — opentoonz/opentoonz](https://github.com/opentoonz/opentoonz) · [site](https://opentoonz.github.io/) | Aplicação desktop completa de animação 2D | **WildVox:** animações 2D autorais; **Pokémon:** possível etapa de desenho/exportação, sem instalar no jogo | **Média** |
| 6 | [OpenVDB — AcademySoftwareFoundation/openvdb](https://github.com/AcademySoftwareFoundation/openvdb) · [site](https://www.openvdb.org/) | Biblioteca/estrutura de dados para volumes esparsos, fumaça e outros dados volumétricos em fluxos 3D | **Referência futura** para renderização 3D avançada; **não é editor 2D nem runtime pronto para Phaser** | **Muito baixa** |
| 7 | [Natron — NatronGitHub/Natron](https://github.com/NatronGitHub/Natron) · [site](https://natrongithub.github.io/) | Compositor de vídeo e imagem baseado em nós | **WildVox:** composição, keying, máscaras e acabamento de cenas/vídeos existentes | **Média** |
| 8 | [Synfig Studio — synfig/synfig](https://github.com/synfig/synfig) · [site](https://synfig.org/) | Software de animação vetorial e bitmap 2D com interpolação | **WildVox:** animações 2D desenhadas sem redesenhar manualmente cada quadro | **Média** |
| 9 | [SVG.js — svgdotjs/svg.js](https://github.com/svgdotjs/svg.js) · [site](https://svgjs.dev/) | Biblioteca leve de manipulação e animação SVG no navegador | **WildVox:** setas, etiquetas e gráficos animados; **painéis web:** ícones/vetores interativos | **Alta (código web leve)** |
| 10 | [Pencil2D — pencil2d/pencil](https://github.com/pencil2d/pencil) · [site](https://www.pencil2d.org/) | Desenho e animação quadro a quadro bitmap/vetorial para desktop | **Pokémon Torre 2:** rascunhos de animações de sprites e poses antes de converter para spritesheets; **WildVox:** ilustração manual | **Média** |

## Licenças e cautelas de reutilização

| Projeto | Licença informada / verificada | Observação |
|---|---|---|
| Friction | **GPL-3.0-only** (README) | Licença do programa; conferir componentes e codecs externos |
| FreeMoCap | **AGPL-3.0** (metadados GitHub) | Verificar obrigações de distribuição/serviço se adaptar o código |
| Effekseer | **MIT** (metadados GitHub) | Checar licenças separadas de runtimes, assets e plugins |
| Theatre.js | **Apache-2.0** (metadados GitHub) | README informa desenvolvimento temporariamente privado; verificar versão pública e manutenção antes de integrar |
| OpenToonz | **Modified BSD** para código próprio (README) | Arquivos em `thirdparty` e pincéis incluem licenças próprias; GitHub exibe NOASSERTION |
| OpenVDB | **Apache-2.0** (metadados GitHub) | Dependências e formatos volumétricos externos podem ter termos próprios |
| Natron | **GPL-2.0** (README/metadados GitHub) | Revisar licenças de plugins antes de incorporar como parte de software redistribuído |
| Synfig Studio | **GPL-3.0** (metadados GitHub) | Integração de código com projetos fechados exige análise de licença |
| SVG.js | **MIT** (README) | Metadados GitHub retornam NOASSERTION; README indica MIT |
| Pencil2D | **GPL-2.0** (metadados GitHub) | Conferir ativos externos/pincéis e condições de redistribuição |

**Importante:** software open source não garante que qualquer imagem, plugin, modelo, fonte ou asset de terceiros possa ser redistribuído comercialmente. A criação de vídeos e sprites originais com um aplicativo não equivale necessariamente a redistribuir seu código.

## Prioridades técnicas e teste econômico proposto

### 1. Pokémon Torre 2 — Effekseer (primeiro VFX)

- Escolher um **único golpe sem sobreposição com a fonte nativa** e com autorização para nova prévia; idealmente fazer o efeito em uma versão **exclusiva de teste**, não tocar em golpes já aprovados.
- Investigar exportação para spritesheet/render pré-gravado, como alternativa ao runtime WebGL integrado. **Não assumir integração plug-and-play Effekseer + Phaser**; medir compatibilidade, transparência, textura, FPS e tamanho do pacote.
- Comparar o efeito em movimento e em contato com o adversário, usando teste visual Chromium e evidência de antes/depois.
- **Condição de integração:** preservar HUD de batalha, kits/ULT, sprites, saves, a prioridade global dos efeitos originais Poké Arena 2D e VFX exclusivos aprovados. Sem aprovação visual, não publicar.

### 2. WildVox — SVG.js + Friction (prioridade editorial)

- Gerar uma cena de **5–8 segundos** com seta ou etiqueta animada sincronizada a uma frase narrada; usar footage real e licenciado e voz atual Michael.
- Comparar **SVG.js + captura em navegador/FFmpeg** com **Friction exportado**, medindo custo de implementação, duração do render, sincronismo, legibilidade em 9:16 e compatibilidade com as regras editoriais.
- Não substituir o pipeline já funcional nem acionar TikTok/Metricool para testar; impedir publicação automática e revisar direitos.
- Theatre.js entra no piloto só se o SVG.js sozinho não controlar com clareza a linha do tempo; Natron, Synfig e OpenToonz ficam como alternativas criativas fora do caminho crítico.

### 3. Uso condicionado

- **FreeMoCap:** somente quando houver necessidade concreta de animação humana capturada; poses 3D não viram sprites 2D prontos por conversão automática.
- **Pencil2D:** adequado a prototipagem artesanal, mas validar exportação/escala pixel perfect para manter estilo do jogo.
- **OpenVDB:** evitar nos pipelines atuais, porque dados 3D volumétricos acrescentam complexidade sem necessidade demonstrada.
- **NEXUS/ATLAS:** nenhuma dessas dez ferramentas altera sinais, backtests ou winrate; não há justificativa para adicionar dependências de VFX a robôs financeiros.

## Não realizados por esta catalogação

Nenhuma ferramenta instalada no PC, nenhum pacote importado no jogo ou site, nenhum shader ou spritesheet gerado, nenhuma melhoria de FPS ou de vídeo medida, nenhum vídeo publicado e nenhum backtest alterado. A **próxima etapa é o piloto controlado**, jamais considerar uma nova referência igual a uma integração aprovada.
