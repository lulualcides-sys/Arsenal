> **ATUALIZAÇÃO:** Este era o catálogo **inicial de 43 ferramentas e fontes**. Recuperamos as listas originais e ampliamos o [inventário para 162 repositórios GitHub](INVENTARIO-COMPLETO.md), incluindo [REA](../fontes/rea), ferramentas de IA, edição, vídeo, voz e infraestrutura. Nenhuma entrada antiga foi apagada.

# Inventário geral do Arsenal — 10/10/2026

Este documento cataloga **todas as ferramentas importantes recuperadas das pesquisas e dos projetos**. Nem toda referência é um software instalado: a coluna informa se é motor de código, fonte de dados, biblioteca ou inspiração. Veja [arquivos efetivamente armazenados](../docs/ARQUIVOS-ENVIADOS.md).

## Pokémon / Emerald Arena (14)

| Nº | Projeto | Finalidade e situação |
|---:|---|---|
| 1 | [GBurgardt/pokemon-emerald-arena](https://github.com/GBurgardt/pokemon-emerald-arena) | Motor nativo GBA: batalha em tempo real, colisões, IA, efeitos; **código upstream incluído por submódulo** |
| 2 | [pret/pokeemerald](https://github.com/pret/pokeemerald) | Base de engenharia reversa do Emerald usada na compilação GBA |
| 3 | [rh-hideout/pokeemerald-expansion](https://github.com/rh-hideout/pokeemerald-expansion) | Mecânicas, tipos, espécies e evolução; referência, não instalado |
| 4 | [PMDCollab/SpriteCollab](https://github.com/PMDCollab/SpriteCollab) | Sprite sheets animados; uso não comercial e créditos obrigatórios, referência |
| 5 | [PokeAPI/sprites](https://github.com/PokeAPI/sprites) | Imagens e sprites; verificar direitos dos recursos antes da redistribuição |
| 6 | [msikma/pokesprite](https://github.com/msikma/pokesprite) | Sprites 2D para ícones/seleção; verificar licença |
| 7 | [smogon/pokemon-showdown](https://github.com/smogon/pokemon-showdown) | Regras e cálculos de batalha; motor por turnos, não realtime |
| 8 | [pagefaultgames/pokerogue](https://github.com/pagefaultgames/pokerogue) | Progressão, apresentação de combate e interface; licenças de código e arte distintas |
| 9 | [SheerSt/pokewilds](https://github.com/SheerSt/pokewilds) | Biomas, mundo procedural e organização de objetos; apenas referência |
| 10 | [EmulatorJS/EmulatorJS](https://github.com/EmulatorJS/EmulatorJS) | Emulação no navegador; exige arquivos de jogo próprios |
| 11 | [phaserjs/phaser](https://github.com/phaserjs/phaser) | Framework HTML5 de jogos 2D; opção alternativa |
| 12 | [mgba-emu/mgba](https://github.com/mgba-emu/mgba) | Emulador para testes de ROMs GBA compatíveis |
| 13 | [pret/agbcc](https://github.com/pret/agbcc) | Compilador legado do GBA usado por projetos pokeemerald |
| 14 | [aaron5670/PokeMMO-Online-Realtime-Multiplayer-Game](https://github.com/aaron5670/PokeMMO-Online-Realtime-Multiplayer-Game) | Arquitetura online como referência (não é requisito de nosso jogo offline) |

**Referências de gameplay mencionadas:** Pokémon Zarza e Pokémon Reloaded (referências, sem código copiado ou URL de código-fonte verificada). A nossa Torre usa **progresso de 6 treinadores + líder**, captura entre desafios e evolução, com foco em batalha realtime. O jogo original de Emerald Arena é submódulo; o conteúdo autoral do modo torre fica em `pokemon-torre/`.

## NEXUS / Futebol / IA / Trading (19)

| Nº | Fonte/ferramenta | Finalidade e situação |
|---:|---|---|
| 1 | [probberechts/soccerdata](https://github.com/probberechts/soccerdata) | Coleta de estatísticas históricas; avaliação instalada no pipeline experimental do NEXUS |
| 2 | [statsbomb/open-data](https://github.com/statsbomb/open-data) | Eventos esportivos abertos, competições e alcance limitados |
| 3 | [ML-KULeuven/socceraction](https://github.com/ML-KULeuven/socceraction) | SPADL, VAEP, xT, métricas com dados evento-a-evento |
| 4 | [openfootball/football.json](https://github.com/openfootball/football.json) | Resultados e calendários históricos CC0 |
| 5 | [openfootball/south-america](https://github.com/openfootball/south-america) | Futebol sul-americano CC0; verificar atualização |
| 6 | [Soccerway](https://br.soccerway.com/) | Escalações, rodadas e classificação; site de referência, não API licenciada |
| 7 | [FootyStats](https://footystats.org/predictions) | Ideias de gols/BTTS/xG/forma; acesso API sujeito a termos |
| 8 | [LiveScore](https://www.livescore.com/en/) | UX de placar ao vivo e eventos; referência |
| 9 | [Radar Esportivo](https://radaresportivo.com/) | Filtros e scanners; referência visual/de produto |
| 10 | [Forebet](https://www.forebet.com/pt/) | Estimativas e previsão de placares; método proprietário |
| 11 | [Scoutinho](https://scoutinho.app/) | Leitura de pressão, pré-jogo e transparência; estudo no NEXUS |
| 12 | [FotMob](https://www.fotmob.com/) | Eventos e estatísticas; integração existente em coletores do NEXUS sujeita a disponibilidade |
| 13 | [SofaScore](https://www.sofascore.com/) | Dados esportivos, odds e eventos; integração experimental no NEXUS |
| 14 | [ESPN](https://www.espn.com/soccer/) | Placares e scouts públicos; coletor no NEXUS |
| 15 | [Understat](https://understat.com/) | xG histórico; experimento via SoccerData |
| 16 | [The Odds API](https://the-odds-api.com/) | Odds para testes; uso condicionado a chave e termos |
| 17 | [ClubElo](http://clubelo.com/) | Rating Elo histórico; avaliação anterior falhou e ficou desligada |
| 18 | [Layback / Bolsa de Aposta](https://bolsadeaposta.com.br/) | Bots, PL/netPl e histórico de trading; serviço do usuário, **dados privados não copiados** |
| 19 | [obra/superpowers](https://github.com/obra/superpowers) | Práticas e ferramentas de engenharia, revisão e planejamento de tarefas |

**Fontes estudadas na documentação privada:** [análise de cinco plataformas](https://github.com/lulualcides-sys/nexus-score-gratis/blob/main/docs/ANALISE_5_PORTAIS_E_FONTES_ABERTAS_20261009.md), [Scoutinho](https://github.com/lulualcides-sys/nexus-score-gratis/blob/main/docs/PESQUISA_SCOUTINHO_NEXUS_20261009.md), [estudo das plataformas](https://github.com/lulualcides-sys/nexus-score-gratis/blob/main/docs/ESTUDO_5_PLATAFORMAS_NEXUS_20261009.md). **Esses documentos continuam no repositório privado.** A existência de crawler ou referência não dá acesso legal a APIs pagas.

## WildVox / Vídeos / Automação (10)

| Nº | Ferramenta | Uso |
|---:|---|---|
| 1 | [FFmpeg](https://ffmpeg.org/) | Renderização, montagem, ajustes de áudio, legendas e formato vertical |
| 2 | [hexgrad/kokoro](https://github.com/hexgrad/kokoro) | Voz TTS; pipeline WildVox usa voz Michael |
| 3 | [Publer](https://publer.io/) | Publicação/agendamento social; referência/integrador externo |
| 4 | [Metricool](https://metricool.com/) | Métricas, agendamento e postagem (dependendo da conexão) |
| 5 | [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-get-started) | Postagem oficial via API, sujeita a acesso/aprovação |
| 6 | [YouTube Data API](https://developers.google.com/youtube/v3) | Integração com Shorts e upload |
| 7 | [Pexels](https://www.pexels.com/) | Banco de clipes; licenças e termos para cada uso |
| 8 | [Pixabay](https://pixabay.com/) | Imagens/vídeos; respeitar termos |
| 9 | [FilmCraft (avaliação)](https://github.com/lulualcides-sys/wildvox-automation/blob/main/docs/FILMCRAFT_EVALUATION.md) | Pesquisa/QA de edição na documentação do WildVox, não núcleo do gerador |
| 10 | [GitHub Actions](https://github.com/features/actions) | Workflows automatizados dos repositórios, scripts e testes |

[**Código real da automação WildVox**](https://github.com/lulualcides-sys/wildvox-automation) (mantido no original), incluindo workflows de postagem, gerador e validação. Credenciais não foram copiadas.

## O que foi copiado vs. apenas catalogado

- **Código upstream incluído:** `fontes/emerald-arena` é um **submódulo Git** na versão fixada do upstream; clone com `--recurse-submodules`.
- **Código nosso salvo no Arsenal:** `pokemon-torre/overlay/src/`, `pokemon-torre/tests/`, `jogos-html/`, `jogos-html/testes/`, launcher no diretório `ferramentas/`.
- **Referências externas somente:** outros repositórios e sites das tabelas; não foi afirmada instalação deles no Arsenal.
- **Projetos vinculados (não duplicados):** NEXUS privado e WildVox no seu próprio GitHub.

Para a lista exata de arquivos transferidos, abra [docs/ARQUIVOS-ENVIADOS.md](../docs/ARQUIVOS-ENVIADOS.md).
