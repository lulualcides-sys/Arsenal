# Emerald Arena → Pokémon Torre 2 — auditoria do site e do repositório

**Conferência:** 22/10/2026. **Estado:** referência técnica catalogada, **sem importar/alterar golpes do jogo**.

- Site analisado: https://burgar.dev/emerald
- Fonte: https://github.com/GBurgardt/pokemon-emerald-arena
- Referência **já preservada no Arsenal**: `fontes/emerald-arena` como submódulo em `.gitmodules`.
- Commit upstream da revisão: `e1502f9f7ed46d969880d73adbf5ab23ef7b2a56`. O submódulo do Arsenal **já aponta exatamente para esse commit**; não duplicar nem trocar por cópia desatualizada.
- Versão: `v0.13.0` no README/PLAY/release do GitHub; o site, consultado em 22/10, ainda anuncia `0.11.0` e exibe dez vídeos, incluindo captura, entrada, fogo/gelo, Double Team e golpes de arremesso. **Site é vitrine/instalador de patch de GBA, não arena em navegador jogável.**
- Fonte do próprio projeto: 187 Pokémon com conjuntos animados (nem todos os encontros têm adaptação), 89 entradas de perfis em `game/overlay/src/arena_moves.c`, combate/efeitos em C para a engine GBA. Números do upstream, **não** do Torre 2.

## Reuso com proveniência

O arquivo `LICENSE` declara MIT **apenas para código novo de arena, instalador e ferramentas**. Não relicencia `pret/pokeemerald`, sprites Pokémon nem arte de colaboradores. `CREDITS.md` aponta materiais da **PMDCollab/SpriteCollab**, cenários de **Oswarlin**, contribuições de **Didier Lopes**, e partículas Kenney CC0. Examinar licença **por ativo** antes de copiar; conservar avisos/atribuição MIT ao portar código. **Não trazer ROM ou patches comerciais para o Arsenal**. Código C exige portar para Phaser/WebGL; colar o módulo no browser não funciona. Os sprites PMD já têm fontes próprias no Torre 2; não duplicar.

## Acervo técnico realmente identificado

| Família | Código de referência (dentro de `game/overlay/src/`) | Mecânica/visual aproveitável | Adaptação Torre 2 |
| --- | --- | --- | --- |
| Captura | `arena_capture.inc` | Sequência mirar → lançar → testar colisão → absorver → cair → balançar → escapar/capturar, feedback, gastar bola e enviar para equipe/PC | Portar **lógica de estados e timing** para Phaser, sem substituir calculadora de captura já corrigida; manter Poké, Great e Ultra Ball do Torre 2 |
| Entrada/troca | `arena_sendout.inc`, `arena_evolution.inc` | Treinador joga bola em arco, abre, luz de materialização, escala/pose e som | Usar o raio e a Pokébola já existentes; corrigir sincronização com `getBounds`, limpeza de sprite anterior e HUD |
| Proteção | `arena_guard.inc`; `graphics/arena/guard/source.html` | Protect intercepta/dissipa feixes e não reflete Hyper Beam; Reflect e Light Screen com duração | Criar efeito com colisão de verdade e cronômetro, nunca mero retângulo |
| Duplo ilusório | `arena_double_team.inc`, `graphics/arena/double-team/source.html` | Isca/clone atingível que se desfaz quando leva dano | Clones em pixel art e prioridade de alvo da IA, se ausente no audit nativo |
| Rolagem | `arena_rollout.inc` | Pokémon enrola, rola com cores próprias, acelera, colide e quebra objetos | Novo golpe de contato, com trajetória, hitbox e saída/recuo |
| Cortina/falso alvo | `arena_cover.inc`, `graphics/arena/cover-smoke/source.html` | Smokescreen interfere na visão/rastreamento; Substitute cria cobertura frágil | Integrar IA e estados com custo de HP e efeitos separados |
| Solo/ar | `arena_dig_fly.inc` | Dig some sob o solo e emerge; Fly deixa sombra móvel, sobe e mergulha | Fases individuais com alvo móvel; garantir dano **apenas no impacto** |
| Arremesso | `arena_toss.inc`, `graphics/arena/warp-toss/source.html` | Seismic Toss agarra de perto, sobe, desce e forma cratera; final espacial especial | Alto esforço; não criar projétil falso; incluir cálculo de nível/imunidade |
| Água/gelo/eletricidade | `arena_elements.inc`, `arena_storm.inc`, `graphics/arena/storm/water-source.html` | Poças permanecem; gelo congela, fogo derrete, eletricidade conduz; Rain Dance inunda temporariamente | Camada WebGL de efeitos de solo, colisão/status/expiração e orçamento de quadros |
| Chamas/choque | `arena_flame_clash.inc`, `arena_move_fx.c`, `graphics/arena/flame-clash/source.html` | Feixes rivais colidem com flashes e dissipação; impactos direcionais | Adicionar sem tocar Flamethrower ou Fire Blast aprovados |
| Física/IA | `arena_physics.c`, `arena_navigation.c`, `arena_terrain.c` | Obstáculos quebráveis, fragmentos, desvio, locomoção adaptada | Reutilizar decisões matemáticas e comportamento, com limite de partículas para 60 FPS |

**Galeria oficial no site**: 01 Dig/Fly/Teleport/Seismic Toss; 02 Double Team; 03 Fire, Ice & Pokéball entrances; 04 Psychic rocks; 05 Trainers & arenas; 06 Catching; 07 Combat update; 08 AYN Thor; 09 Full gameplay; 10 First battles.

## Cruzamento com o Torre 2

- Fotografia local usada: `Pok-mon-torre-2/docs/MATRIZ-GOLPES-FALTANTES-SPRITES-E-ESTATISTICAS.md`, criada em 21/10. Ela registra 160 nomes faltantes dentro de um planejamento de 269, **não** todo o universo Pokémon; seu próprio cabeçalho avisa que a captura do cliente e o estado de aprovação mudam.
- A interseção de nomes entre os **89 perfis Emerald** e os **160 nomes daquela fotografia** é de **27 movimentos**; quatro já são listados como **aprovados** no `torre2-move-pool.js`: **Peck, Bite, Rock Tomb, Gust**. Não mexer neles.
- Os **23 nomes candidatos** desse cruzamento, que exigem **auditoria atual novamente antes de afirmar ausência**, são: Protect, Rain Dance, Cross Chop, Aerial Ace, Surf, Icy Wind, Slam, Scratch, Leaf Blade, Mach Punch, Mega Drain, Headbutt, Steel Wing, Dragon Breath, Shadow Punch, Night Shade, Acid, Mud Shot, Giga Drain, Sand Attack, Light Screen, Fire Punch, Psychic.
- **Surf** segue expressamente *bloqueado por reprovação visual* no Torre 2. Não reabilitar automaticamente. Mesmo nomes ausentes da lista, como **Double Team, Smokescreen, Rollout, Dig, Fly, Teleport, Seismic Toss e Substitute**, podem exigir trabalho de sistema; pesquisar na **captura atual** para garantir que não são nativos do Poké Arena 2D.
- O `Torre 2` usa Phaser/WebGL, não o motor C de GBA. A renderização deve conservar pixel art, contornos, frames e performance, não usar CSS simples, Canvas 2D ou vídeos como substitutos de efeitos.

## Ordem recomendada: copiar padrão visual e adaptar mecânica

**Passo 0 — Captura/entrada, patch separado:** comparação quadro a quadro com `arena_capture.inc` e `arena_sendout.inc`; oferecer mira, lançamento com arco, impacto real, raio vermelho alinhado ao sprite, três balanços, falha com retorno à arena e sucesso com equipe/PC. Comparar efeitos já presentes; NÃO mexer em códigos aprovados.

**Lote 1 — quatro golpes para protótipo revisável:** **Protect, Rollout, Smokescreen e Double Team**, condicionado à auditoria de movimentos nativos e à disponibilidade no Torre 2. Cada golpe tem silhueta própria, comportamento próprio, dano/status nos quadros certos, 8–16 frames quando fizer sentido. Priorizar funcionamento em batalha, não imagens isoladas.

**Lote 2 — ações cinematográficas (quatro):** **Dig, Fly, Seismic Toss e Teleport**, se ainda não integrados no cliente capturado, exigindo movimentação real, invulnerabilidade/fases e evento de impacto correto.

**Lote 3 — terreno e clima:** **Rain Dance/poças, gelo, condução elétrica, choque de chamas e destruição de objetos**. Preservar VFX aprovados e construir um sistema reutilizável por tipo.

**Lote 4 — candidatos de golpes da matriz 160:** começar por **Mud Shot, Mega Drain, Giga Drain, Icy Wind** se estiverem ausentes, com dano, cura, velocidade e acerto independentes do Emerald Arena.

## Contrato de implementação e verificação

1. Antes de todo patch, gerar a build atual e rodar `node tools/pokearena/audit-moves.mjs`; resolver PT/EN e bloquear colisão com nativos e customizados aprovados.
2. Guardar branch de backup, implementar em pasta/arquivo próprio, sem reescrever arte aprovada; preservar saves.
3. Copiar **exatamente** o comportamento visual solicitado onde o código/asset permitir e adaptar escala, direção, tempo, hitbox e animação ao Torre 2. Se o ativo não tiver permissão de reutilização, **recriar** em pixel art própria seguindo a mecânica.
4. Testar em batalha de navegador com captura de evidência, impacto no quadro correto, perda de alvo, KO, troca, PC e 60 FPS quando o dispositivo permitir.
5. Commit e publicação somente após CI e verificação no endereço público do jogo; nunca declarar concluído por commit isolado.

Referências principais: https://github.com/GBurgardt/pokemon-emerald-arena/blob/main/PLAY.md ; https://github.com/GBurgardt/pokemon-emerald-arena/blob/main/CREDITS.md ; https://github.com/GBurgardt/pokemon-emerald-arena/blob/main/LICENSE ; https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/docs/MATRIZ-GOLPES-FALTANTES-SPRITES-E-ESTATISTICAS.md
