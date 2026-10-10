# Pokémon Torre — integração nativa com Emerald Arena (primeira etapa)

## O que este pacote É

Código-fonte de uma **modificação do Emerald Arena original** (projeto público de German Burgardt), direcionado ao fluxo de progressão em torre. Não é HTML, não é uma imagem e não recria o motor de batalhas: o código injeta desafios no pipeline nativo de **Pokémon Emerald para GBA** usando o `realtime_arena.c` do projeto original.

**Estado:** integração de fonte desenvolvida e testada parcialmente em ambiente local. **Não é uma ROM compilada ou validada no mGBA.** O ambiente desta sessão não tem o toolchain GBA necessário nem uma ROM original, e não conseguiu clonar o repositório público via rede. As âncoras do instalador foram verificadas contra trechos da versão pública e em testes de integração simulados; precisam de teste na árvore e no compilador reais.

## Já implementado no código

- Três iniciais: Bulbasaur, Charmander, Squirtle **no nível 5**. Apenas um inicial na equipe.
- Dois ginásios com sete desafios cada: **seis treinadores + Winona (Voador)** e **seis treinadores + Juan (Água)**.
- Identidade de treinadores obtida da tabela nativa do Emerald; equipes adequadas à progressão da torre, geradas com `CreateMon`/`SetMonMoveSlot` originais.
- Encontros opcionais para captura de Pokémon básicos entre desafios, com captura e inventário do próprio Emerald.
- Estado de etapa salvo em variáveis persistentes; derrota não avança a etapa, vitória avança.
- Ao vencer o líder, três Great Balls e recuperação da equipe.
- Preservação da infraestrutura original do Emerald Arena: sprites suportados, movimentação, IA, projéteis, colisões, efeitos de golpes e cálculos nativos.
- Definição de oponentes feita com base no roster animado real do Emerald Arena (evita várias espécies que ainda não têm sprite).

## Limitações atuais

- **Não foi compilado nem jogado no emulador** nesta sessão. O teste de integração usa dublês das interfaces do Emerald, não o executável final.
- A interface temporária usa a cidade de Oldale do modo de teste original como seletor de desafios. O menu de torre sem exploração ainda não está pronto.
- Apenas dois ginásios estão programados. Os outros seis dependem de novo conteúdo e validação de compatibilidade do catálogo de batalhas.
- Os oponentes são equipes personalizadas, mas usam nomes/identidades de treinadores existentes no motor Emerald; diálogos e retratos exclusivos virão depois.
- A compatibilidade real de golpes, habilidades e sprites deverá ser testada em ROM; o Emerald Arena pode retornar ao sistema por turnos em situações não suportadas.
- Mudanças no código a montante podem quebrar as âncoras do instalador, que recusa alterações quando não as encontra exatamente.

## Controles TEMPORÁRIOS previstos no ambiente GBA

- No menu inicial de Emerald Arena, em um save novo, **SELECT em NEW GAME** para iniciar o modo de teste convertido em torre.
- **L** ou **R**, isoladamente, antes do primeiro encontro: trocar entre os três iniciais no nível 5 (consultar no menu de equipe). Após a primeira captura ou desafio, essa escolha trava para preservar o progresso.
- **L + R:** desafiar o próximo treinador (ou líder após seis vitórias).
- **A + B:** abrir um encontro selvagem da faixa atual para treinar/capturar.
- Dentro da batalha, os controles e efeitos permanecem os **do Emerald Arena original**.
- Save no menu nativo do jogo. A progressão é persistida nas variáveis livres 0x40F7..0x40FA de um novo save de teste.

## Estrutura dos arquivos

- `overlay/src/arena_tower.inc` — integração nativa da torre, inimigos e captura.
- `overlay/src/arena_tower_progress.h` — regras de progressão testáveis fora do motor.
- `overlay/src/arena_tower_event.inc` — retorno do script nativo de treinador.
- `overlay/src/arena_tower_installer.py` — aplica inserções de código sobre uma cópia já preparada do pokeemerald com o patch Emerald Arena. Cria backups, falha se não encontra âncoras.
- `tests/test_progress.c` — valida contagem de etapas e vitória/derrota.
- `tests/test_tower_engine.c` — testes com interfaces do motor simuladas, incluindo seleção, batalha e chefes.
- `tests/test_installer.py` — verifica instalação no fixture e rejeição de duplicatas.

## Integração de código-fonte (para um ambiente de desenvolvimento GBA compatível)

O projeto de origem é: https://github.com/GBurgardt/pokemon-emerald-arena

Use o compromisso fixado de `pret/pokeemerald`, conforme `BUILD.md` do autor. Depois de aplicar `game/native-engine.patch` e copiar o overlay original para a árvore do `pokeemerald`, execute:

```bash
python3 /caminho/do/pacote/overlay/src/arena_tower_installer.py /caminho/para/workspace
```

O instalador modifica somente os arquivos de fonte que conectam a torre ao motor, com cópias de segurança `*.pre-tower`. A compilação depende do `agbcc`, binutils ARM, demais ferramentas e assets do projeto original. **Esta sessão ainda não executou a compilação ROM.**

## Verificações executadas nesta sessão

- GCC host: progressão dos 14 desafios — **PASS**.
- GCC host com interfaces simuladas: seleção, derrota, vitória, troca de ginásio, equipes dos líderes, travas e recompensa — **PASS**.
- Python: instalador aplicado em fixture e bloqueio de aplicação duplicada — **PASS**.

## Direitos

Este pacote contém apenas os arquivos adicionais produzidos para esta tarefa e nenhum arquivo ROM. A licença MIT do Emerald Arena cobre o **código novo do motor de arena** publicado pelo autor, não os recursos de Pokémon, nem o código pret/pokeemerald, nem os gráficos dos colaboradores. Verifique as licenças e créditos dos projetos originais antes de redistribuir qualquer jogo montado.
