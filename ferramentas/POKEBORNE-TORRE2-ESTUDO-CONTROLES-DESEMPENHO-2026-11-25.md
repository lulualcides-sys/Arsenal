# Pokeborne Android → estudo de controles e desempenho para Pokémon Torre 2

**Data:** 25/11/2026  
**Origem analisada:** [JayElDragon/Pokeborne-Android](https://github.com/JayElDragon/Pokeborne-Android)  
**Projeto-alvo:** [lulualcides-sys/Pok-mon-torre-2](https://github.com/lulualcides-sys/Pok-mon-torre-2)  
**Resultado:** auditoria e recomendações catalogadas. Nenhum código do Pokémon Torre 2 foi alterado nesta análise.

## Resumo executivo

O port Pokeborne oferece três ideias úteis: personalização de botões touch, curva de resposta do analógico e controle explícito da qualidade de renderização em aparelhos de alto refresh. O Pokémon Torre 2 já possui uma base de entrada melhor do que seria necessário reconstruir do zero: joystick de 360°, Pointer Capture, teclado, esquiva, botões de golpes e limpeza do estado ao perder foco.

**Não recomendamos copiar o port Android nem transplantar seu código.** A melhor evolução é acrescentar configuração ao sistema atual, medir o desempenho em aparelhos reais e manter intactos o motor Phaser e a escala responsiva do jogo publicado.

## Escopo e distinção importante entre os motores

O repositório do Torre 2 possui duas camadas que não devem ser confundidas:

1. **Campanha publicada em Phaser:** o workflow `.github/workflows/pages.yml` captura o cliente autorizado, monta `_site/arena2d` com `tools/pokearena/build-preview.mjs` e publica um redirecionamento da raiz para essa campanha. A pasta `arena2d/` é um artefato gerado no build, não uma árvore de fontes presente no branch `main` que foi possível inspecionar diretamente.
2. **Laboratório PixiJS V0.8:** `index.html`, `src/main.js`, `src/joystick.js` e `joystick.css` descrevem o laboratório antigo, que o workflow preserva em `/lab.html`.

Esta comparação de código detalhada cobre o laboratório PixiJS. Para a campanha Phaser, foram verificados o pipeline de geração e os testes de navegador referentes aos controles móveis. Não atribuímos à campanha recursos que só foram encontrados no laboratório.

## O que o Pokeborne implementa

Fontes consultadas: [README](https://github.com/JayElDragon/Pokeborne-Android/blob/main/README.md), [build_pokeborne.py](https://github.com/JayElDragon/Pokeborne-Android/blob/main/build_pokeborne.py), [android_port.js](https://github.com/JayElDragon/Pokeborne-Android/blob/main/port/android_port.js) e [android_port.css](https://github.com/JayElDragon/Pokeborne-Android/blob/main/port/android_port.css).

- **Editor de layout touch:** permite arrastar botões, alterar o tamanho global entre 70% e 150%, opacidade entre 30% e 100%, restaurar o padrão e salvar no `localStorage`. O analógico flutuante não é reposicionado pelo editor.
- **Analógico suavizado:** zona morta de 15%; a potência máxima só chega perto de 92% do percurso; curva com expoente 1,4 para movimentos pequenos mais graduais. A configuração evita que o analógico fique excessivamente sensível no centro.
- **Perfil 60/120 Hz:** 60 Hz como padrão e modo opcional de 120 Hz. Nesse modo, o script limita o pixel ratio a 1,25 e aplica um piso de qualidade para reduzir o custo gráfico. Os números de GPU citados no código são medições relatadas pelo autor no AYN Odin 3, não uma medição independente desta auditoria.
- **Layout e estado locais:** ajustes de controles e nome de treinador persistem no dispositivo.
- **Integração Android própria:** WebView local e caminho offline. Isso é específico ao APK do Pokeborne e não é necessário para melhorar a página web do Torre 2.

O port ainda faz patches em arquivos JavaScript minificados; o script valida a presença exata de cada trecho antes de substituir. Essa abordagem de falhar explicitamente é útil como princípio de segurança, mas não justifica alterar código minificado do cliente Phaser.

## O que o Pokémon Torre 2 já possui

Fontes examinadas: [src/main.js](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/src/main.js), [src/joystick.js](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/src/joystick.js), [joystick.css](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/joystick.css), [index.html](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/index.html) e [tests/joystick.test.js](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/tests/joystick.test.js).

### Controles presentes no laboratório PixiJS

- Joystick analógico de 360° com `setPointerCapture`, controle por `pointerId` e estados separados de movimento.
- Zona morta de 9,5%, curva linear até a potência máxima e movimento proporcional à inclinação.
- Teclas WASD/setas; o teclado tem prioridade quando está pressionado.
- Botão de esquiva e botões de golpes; tela cheia com tentativa de travar orientação em paisagem.
- Estado de movimento limpo em `blur`, `visibilitychange`, `pointerup`, `pointercancel` e perda de captura.
- Testes unitários para zona morta, diagonais, força parcial, força máxima e prioridade do teclado.

### Renderização no laboratório PixiJS

- PixiJS 7.4.3/WebGL, `antialias: false`, escala de textura `NEAREST` e `autoDensity: true`.
- Resolução limitada a `min(2, devicePixelRatio)`. Em celular de alta densidade, isso ainda pode gerar mais pixels do que o necessário para pixel art.
- Atlases de golpes e impactos são gerados no início, inclusive para o segundo banco de golpes do laboratório.
- Sprites de projéteis e impactos são removidos/destruídos quando deixam de estar ativos.
- O passo de regras de combate limita `dt` a 45 ms; a renderização usa o ticker do PixiJS.

### Campanha Phaser publicada

O workflow de Pages preserva a escala responsiva original do Phaser e documenta que injetar overrides de viewport, transforms CSS ou loops de resize já causou problemas de coordenadas e tela cheia. Também executa testes de Chromium para a campanha e para entradas touch reais, inclusive alternando o modo automático antes de testar golpes manuais. Portanto, **não aplicar zoom CSS, forçar landscape com transforms ou substituir o dimensionamento original do Phaser**.

O teste [kanto-intro-touch-browser.cjs](https://github.com/lulualcides-sys/Pok-mon-torre-2/blob/main/tests/kanto-intro-touch-browser.cjs) verifica controles touch e execução de golpes em cenários de campanha. Isso não equivale a uma medição de latência em um telefone físico nem comprova, sozinho, suporte completo a todo controle Bluetooth.

## Melhorias recomendadas

### Prioridade 1 — Editor de layout dos controles touch

**O melhor recurso funcional para aproveitar do Pokeborne.**

Adicionar uma opção acessível fora do combate ou na pausa para:
- arrastar joystick, esquiva e botões de golpes;
- ajustar tamanho, por exemplo 80%–130%;
- ajustar opacidade, por exemplo 40%–100%;
- restaurar o layout original;
- salvar por orientação/perfil, sem sobrescrever saves de campanha.

**Cuidados:** respeitar `safe-area-inset`, manter cada botão dentro da tela, evitar sobreposição com HUD e impedir que arrastar um botão também execute golpe ou esquiva. A edição deve ficar desativada durante o combate. Testar toque simultâneo no joystick e em um botão.

**Destino:** primeiro decidir se o editor será desenvolvido no laboratório PixiJS ou na campanha Phaser gerada. Não colocar código específico do PixiJS na campanha Phaser.

### Prioridade 2 — Calibração do joystick

Oferecer pelo menos dois perfis: **Preciso** (atual) e **Suave** (curva inspirada no Pokeborne). A curva sugerida para teste é zona morta de 12%–15% e crescimento não linear até a velocidade máxima próximo do limite do anel.

Não substituir automaticamente os 9,5% atuais: uma zona morta maior pode reduzir deriva, mas também diminui a faixa útil para movimentos delicados. Comparar lado a lado em telefones diferentes e manter a configuração atual como padrão até os testes confirmarem ganho.

**Testes necessários:** centro sem drift, deslocamento lento, diagonal, borda do anel, dedo saindo do controle, cancelamento do toque, dois dedos simultâneos e troca entre toque/teclado.

### Prioridade 3 — Qualidade gráfica por dispositivo

No laboratório PixiJS, testar perfis de resolução em vez de deixar todos os celulares usarem até 2x:
- **Economia:** pixel ratio 1,0;
- **Equilibrado:** pixel ratio até 1,25 ou 1,5;
- **Nítido:** pixel ratio até 2,0.

Os números são pontos de partida para benchmark, não valores finais. Preservar `NEAREST`, pixel art e antialias desligado. Não impor 120 FPS: a taxa de atualização da tela e a taxa de renderização do jogo são coisas diferentes.

Na campanha Phaser, primeiro medir o cliente gerado e respeitar o scaling original. Só introduzir uma qualidade configurável com teste do artefato real se a medição demonstrar gargalo e se a alteração puder ser feita de forma isolada.

### Prioridade 4 — Carregamento sob demanda de efeitos do laboratório

O laboratório gera texturas de todos os bancos de golpes no arranque, inclusive o banco elemental de teste. Avaliar construir o atlas do segundo banco e os impactos correspondentes apenas quando ele for aberto pela primeira vez, mantendo cache depois disso. Isso pode reduzir o custo inicial, sem alterar os efeitos em si.

Antes de mexer: medir tempo de inicialização e memória/GPU com o banco completo e com construção tardia. Não remover texturas que já estão em uso por projéteis ou impactos.

### Prioridade 5 — Verificação explícita de controle físico

A interface documenta teclado e toque; a campanha tem testes de touch, mas esta auditoria não encontrou prova suficiente de um ciclo completo de testes com controle Bluetooth no dispositivo. Criar teste independente para Gamepad API/controle físico se essa compatibilidade for um objetivo: direção analógica, botões de golpe, esquiva, reconexão e prioridade quando toque e controle estiverem ativos.

Não ocultar controles touch só porque um gamepad foi detectado; permitir retorno manual ao touch e testar controles híbridos.

## Plano de validação antes de alterar o jogo

1. Registrar baseline em Android real: aparelho, versão do Android, navegador, orientação e tamanho da tela.
2. Medir 60 segundos de menu/idle e 60 segundos de batalha com projéteis e impactos; registrar FPS médio, 1% low ou p95 de frame time, tempo de arranque e temperatura percebida.
3. Repetir o mesmo cenário em pixel ratio 1,0 / 1,25 / 1,5 / 2,0 no laboratório PixiJS.
4. Testar joystick atual contra o perfil suave, mantendo a mesma rota de movimento.
5. Testar o editor com toque simultâneo, safe area, reinício e persistência após fechar/abrir.
6. Executar `npm test`, `npm run check` e a bateria Chromium pertinente; na campanha, validar o artefato `_site/arena2d` produzido pelo workflow, não apenas os arquivos do laboratório.

**Critério de aprovação:** não perder golpes, não haver movimento preso, nenhum botão fora da tela, saves preservados, nenhum erro JS e melhoria mensurável sem piorar a responsividade.

## Decisão desta auditoria

**Aproveitar como conceitos:** editor de layout touch, curva analógica opcional, perfis de resolução e carregamento tardio de efeitos do laboratório.

**Não copiar:** WebView/Capacitor do Pokeborne, patches nos seus arquivos minificados, nomes/conta local do outro jogo, ativos, modelos, áudio, APK ou arquivos do jogo. O repositório Pokeborne não apresenta licença na raiz; a referência deve continuar documental.

**Estado real:** relatório de pesquisa adicionado ao Arsenal. Nenhum código do Pokémon Torre 2, motor Phaser, jogo publicado, save ou asset foi modificado. A implementação deve começar pelo recurso escolhido, em mudança isolada e com os testes acima.
