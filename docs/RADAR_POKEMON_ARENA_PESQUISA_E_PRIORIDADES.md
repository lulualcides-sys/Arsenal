# RADAR TÉCNICO — POKÉMON ARENA (V6 → atualização grande seguinte)
**Auditoria inicial: 10/10/2026**  
**Objetivo:** não esperar por links do usuário; procurar referências e falhas técnicas antes de cada atualização, selecionar implementações viáveis e comprovar o resultado com testes reais.

## Diagnóstico direto do código da V6
Fonte local auditada: `Pokemon_Arena_Offline_V6_Emerald.html`.

| Área | Estado observado na V6 | Melhoria prioritária | Critério para considerar pronto |
|---|---|---|---|
| Mundo | Um mapa retangular fixo de 1760 × 1472 pixels e regiões definidas por posições. Vegetação decorativa pseudoaleatória; não há geração de mapas persistentes. | Separar regiões e criar transição estável entre áreas; depois testar geração procedural com semente | Trocar de região, retornar e manter estado e progresso |
| Batalhas | Golpes por famílias `projectile`, `beam`, `lunge`, `burst`, `ultimate` | Perfis de golpes com propriedades individuais, colisão e efeitos exclusivos | Casos de teste por tipo de golpe, sem golpes atravessando cobertura indevidamente |
| Tipos | `typeAdvantage(a,b)` contém relações especiais apenas para quatro Pokémon, não a tabela completa de tipos nem tipos próprios dos golpes | Modelo de 18 tipos + golpes com tipo próprio + imunidades | Testes de vantagem/resistência/imunidade e dano consistente |
| IA | Decisões parcialmente aleatórias, aproximação e desvio de objetos com lógica local | Percepção, telemetria, previsão de trajetória, estados de combate e navegação com caminho | IA deve contornar obstáculo e evitar ataques sinalizados em cenários definidos |
| Arte | Criaturas e cenários desenhados no Canvas, com animações majoritariamente procedurais | Sprites e atlas de animação detalhados, renderização e animações específicas de golpes | Capturas de tela lado a lado e avaliação visual no Android/desktop |
| Progressão | Coleção pequena (10 Pokémon definidos no objeto `roster`), captura, níveis, mochila, dois chefes | Base de espécies separada do motor e eventos/objetivos por região | Persistência de equipe, inventário, missões e capturas após recarregar |
| QA | Existem testes anteriores de navegação, mas ainda falta suíte repetível como etapa obrigatória a cada versão | Teste automático de combate, troca de área, captura, salvamento e 3 tamanhos de tela | Relatório PASS/FAIL e screenshots por lançamento |

## Referências investigadas, com uso concreto

1. **PokéWilds** — https://github.com/SheerSt/pokewilds
   - **Aplicar como referência:** biomas, mundo grande, espécies localizadas e habilidades no mundo aberto.
   - **Limite:** libGDX/Java, não compatível diretamente com nossa versão HTML/Canvas; recursos visuais e marcas devem ter licença analisada separadamente.

2. **PokéRogue** — https://github.com/pagefaultgames/pokerogue
   - **Aplicar como referência:** organização de animações de batalha, partículas, interface, progressão, encontros e conteúdo em áreas variadas.
   - **Limite:** código AGPLv3; arte e outros recursos possuem condições próprias. Inspecionar licenças antes de reutilização.

3. **pokeemerald-expansion** — https://github.com/rh-hideout/pokeemerald-expansion
   - **Aplicar como referência:** catálogo de Pokémon, tipos, estatísticas, golpes, evolução, habilidades, condições de status e personalização de treinadores.
   - **Limite:** base de ROM para GBA, **não é jogo pronto e não é biblioteca JS**. Usar como especificação para implementação no navegador.
   - Documentação: https://rh-hideout.github.io/pokeemerald-expansion/FEATURES.html

4. **Pokémon Emerald Arena** — https://github.com/GBurgardt/pokemon-emerald-arena
   - **Aplicar como referência:** `arena_navigation.c`, `arena_moves.c`, `arena_move_fx.c`, `arena_physics.c` e as regras de combate em tempo real.
   - **Limite:** motor em C para GBA; não é JavaScript. Os ativos Pokémon e alguns gráficos estão sob condições próprias.

5. **Pokémon Showdown** — https://github.com/smogon/pokemon-showdown
   - **Aplicar como referência:** regra de dano, tipos, estados e testes de batalha robustos.
   - **Limite:** sistema tradicional por turnos; não reutilizar timing de turnos como base do combate em tempo real.

## Prioridade de engenharia (ordem recomendada)

**P0 — Corrigir fundamentos antes de acrescentar volume:**
- Substituir tabela parcial de vantagens por relação completa de tipos/ataques, com testes.
- Definir dados de Pokémon e golpes separados do código de desenho.
- Registrar erros e criar testes de regressão para salvamento, captura e batalhas.

**P1 — Fazer o maior salto perceptível:**
- Redesenhar pipeline visual (atlas de sprites, sombras, quadros de animação, partículas por golpe), comparando antes/depois.
- Melhorar IA e navegação em obstáculos usando decisões explicáveis, em vez de sorte pura.
- Criar regiões conectadas e preservar estados por área.

**P2 — Ampliar conteúdo sem perder qualidade:**
- Expandir espécies somente após os sistemas estarem corretos.
- Evoluções, condições de status, NPCs, desafios e objetivos por região.
- Melhorar acessibilidade e desempenho do controle para celular.

## Processo padrão obrigatório para próximas mudanças
1. **Pesquisar por conta própria** ao menos uma referência adicional e documentos de engenharia associados ao componente (não esperar o usuário fornecer referência).
2. **Ler arquivos reais do projeto** e identificar discrepâncias específicas entre a referência e nosso jogo.
3. **Triar:** descartar o que não é licenciado, não cabe no navegador, ou não agrega ao objetivo offline.
4. **Implementar em lote coerente**, sem fabricar uma Vx apenas por alteração cosmética.
5. **Validar com testes reproduzíveis:** mobile estreito e normal, desktop, captura, IA, dano, evolução e salvamento.
6. **Relatar resultado verdadeiro:** diferenciar implementado e testado de proposta ou pesquisa.

**Limite operacional:** este radar registra a pauta de pesquisa. Não executa pesquisa de modo contínuo enquanto nenhuma conversa/tarefa estiver ativa. Para atualização fora das sessões, configurar automação agendada explicitamente.
