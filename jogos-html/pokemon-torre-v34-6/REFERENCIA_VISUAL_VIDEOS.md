# Pokémon Torre — referência visual de golpes v34.6

Fonte primária: **15 vídeos enviados pelo usuário em 11/10/2026**. São gravações verticais (1220×2712) de um jogo 2D top-down em uma arena urbana pixel-art com casa, árvores, caminho e cercas. A referência principal é o movimento e comportamento da animação, não a cópia ou extração de sprites protegidos.

## Características observadas — obrigatórias
1. **Arena top-down viva e estável**, com Pokémon pequenos o suficiente para mostrar o chão e os efeitos; câmera não deve ampliar durante golpes.
2. **Ataque com origem/viagem/colisão/resíduo**: a animação sai do atacante, percorre o espaço, explode/desvia no alvo e pode marcar o chão por segundos.
3. **Esquiva, investida, recuo e pressão**: Pokémon se deslocam no combate, e a posição determina trajetória e impacto.
4. **Golpes distintos por forma**, não apenas um círculo da cor do tipo; respeitar espécie/tipo e nome do golpe.
5. **Estado do chão persiste**: poeira, pedras, sombra, rachaduras, marcas de queimadura e névoas transitórias são visíveis mesmo depois do golpe.
6. **Efeitos em camadas**: baixo do Pokémon (sombra, rachadura, poça), na frente (projetil/chama), acima (fumaça/partículas leves).
7. **Pixel-art nítida**, nearest-neighbor para sprites; sem blur excessivo, desfoque global ou bolas genéricas.
8. **UI compacta**: quatro ataques pequenos no rodapé, energy/HP no topo, popup curto "Combo xN", status e recarga; não cobrir a arena.
9. **Mobile**: efeitos adaptativos mantendo impacto e direção mesmo com baixo FPS; não esconder personagem.

## Evidências por gravação — segundos aproximados

| Vídeo | Temática observada | Quadros úteis |
|---|---|---|
| 1000978853.mp4 | fogo e ataque elétrico/raio comprido percorrendo arena, solo marcado | 18 s, 32 s |
| 1000978860.mp4 | Pokémon elétricos, deslocamento/esquiva; composição de cenário amplo | 14 s, 25 s |
| 1000978861.mp4 | ataque em faixa horizontal amarela, poeira, combo e preparo | 11 s, 20 s |
| 1000978864.mp4 | água/combate, rajada no chão e deslocamento | 14 s, 24 s |
| 1000978865.mp4 | movimento aéreo e rajadas, poeira/círculos de impacto | 11 s, 20 s |
| 1000978866.mp4 | veneno/status, manchas roxas sobre o solo | 8 s, 15 s |
| 1000978872.mp4 | veneno + área no chão; múltiplas marcas persistentes | 10 s, 18 s |
| 1000978874.mp4 | energia psíquica, raios/ondas e efeito de choque | 10 s, 18 s |
| 1000978877.mp4 | golpes de pedra/solo, poeira, combo e impacto | 8 s, 15 s |
| 1000978878.mp4 | impacto de água e energia clara, múltiplos estilhaços/riscos | 8 s, 14 s |
| 1000978880.mp4 | sombra/veneno, projétil roxo em linha e manchas no chão | 9 s, 16 s |
| 1000978883.mp4 | impactos de terra, fumaça e colisões | 8 s, 14 s |
| 1000978884.mp4 | onda de terra/rocha, poeira sobre caminho e ambiente | 6 s, 10 s |
| 1000978885.mp4 | névoa roxa/energia fantasma e combo discreto | 7 s, 14 s |
| 1000978886.mp4 | terremoto/poeira/rachaduras duráveis, golpes de solo | 7 s, 13 s |

## Instruções de animação por golpe
- **Thunderbolt**: trilha serrilhada amarela/azulada, ramos reais até alvo, flash + pequenas fagulhas; não esfera.
- **Thunder**: coluna de relâmpago maior, ruído/iluminação e faíscas no chão com curto clarão.
- **Flamethrower**: cone de fogo saindo da boca para alvo, partículas de brasas e rastro não circular.
- **Fire Blast**: explosão característica com cinco pontas e brasa, deixa marca; bem diferente de Flamethrower.
- **Surf**: onda lateral volumosa e respingos orientados pelo deslocamento.
- **Hydro Pump**: jato d'água concentrado com cabeça e spray no impacto.
- **Ice Beam**: feixe claro, cristais na trajetória, estilhaços no impacto.
- **Psychic**: faixas e ondas mentais, distorção violeta/rosa sobre alvo.
- **Shadow Ball**: esfera espectral é adequada A ESTE GOLPE, mas tem cauda/ondulação escura em vez de círculo imóvel.
- **Earthquake**: rachaduras e poeira em áreas ao redor do alvo, movimento do chão; dano visual em solo, não orbe.
- **Rock Slide**: rochas separadas caem de cima, quicam e se fragmentam.
- **Poison / Status**: nuvens e manchas no chão, indicador pequeno e resultado real.
- **Normal/Lutador**: investida, riscado de ataque, choque breve e recuo.

## Próxima implementação (sem copiar assets sem licença)
1. Fazer protótipos dos 11 golpes na cena real com os vídeos como critério de aceitação.
2. Reaproveitar sprites licenciados quando corresponderem ao visual; desenhar especificamente os faltantes em spritesheet, não tentar usar uma mesma animação recolorida para vários golpes.
3. Testar 10+ ataques por tipo, sem mostrar sprites ou UI desproporcional.
4. Só então implementar nevoeiro, vulcão e sol como **camadas ambientais** que não escondem golpes nem Pokémon.
5. Manter a V34.5 de backup e publicar uma versão nova separada.

> Não confundir os vídeos de referência com autorização para redistribuir os arquivos originais do jogo mostrado. Usar como direção de arte/funcionamento, não copiar gráficos protegidos de terceiros.
