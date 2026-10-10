# Pokémon Torre V12 — Jogo com sprites detalhados, pronto para abrir

**[Abrir arquivo HTML da V12](Pokemon_Torre_V12_Detalhado_JOGAR.html)**.

A V12 combina a jogabilidade do protótipo **Pokémon Torre V11 Animada** com os sprites pixel art detalhados do [PMDCollab/SpriteCollab](https://github.com/PMDCollab/SpriteCollab). São **50 imagens PNG reais** dos dez Pokémon incluídas diretamente no HTML em formato base64, evitando a instalação manual da pasta `sprites`.

## Como jogar

- No celular: salve o arquivo HTML, abra com Chrome ou outro navegador moderno e escolha Bulbasaur, Charmander ou Squirtle, nível 5.
- Clique no botão **⚔️ BATALHAR · FASE 1**.
- Joystick virtual no canto inferior esquerdo, botões de golpes embaixo, **ESQUIVA** no canto inferior direito.
- Após batalhas, capture Pokémon nos encontros da grama e evolua com experiência.
- No computador: WASD ou setas para mover; teclas 1–4 para golpes e barra de espaço para esquivar.
- O HTML também funciona sem rede, pois incorpora os sprites detalhados e a interface. Outros adversários fora da lista dos dez Pokémon mantêm os visuais de fallback da V11.

## Animações

- `Idle` (parado), `Walk` (andando), `Attack` (atacando), `Hurt` (levando dano), a 8 quadros por segundo.
- Os sprites seguem visual **pixel art, fundo transparente**, sem suavizar os pixels.
- A imagem vira conforme a posição do rival.
- Usa os **mesmos sprites detalhados**, não desenhos gerados ou simplificados.

## Pokémon incluídos

Bulbasaur, Charmander, Squirtle, Pikachu, Onix, Scyther, Jolteon, Blastoise, Charizard e Tyranitar.

## Validação

- Testado em Chromium, largura 390px e 1280px, sem acesso a sites externos, com início de batalha e uso de golpe.
- Sem erros de JavaScript observados nos fluxos verificados.
- Ainda é protótipo de fã HTML, não ROM GBA ou versão compilada do Emerald Arena.

## Créditos/licenças

Sprites detalhados são adaptação da biblioteca [PMDCollab/SpriteCollab](https://github.com/PMDCollab/SpriteCollab), sob condições de **Creative Commons BY-NC 4.0**, com créditos individuais disponíveis no [pacote completo das artes e fontes](https://github.com/lulualcides-sys/Arsenal/blob/main/ferramentas/gerar_sprites_detalhados.py) (script gera os arquivos `originais/<especie>/credits.txt`). Uso **não comercial** e com atribuição. Os Pokémon e marcas correspondentes são propriedade de seus titulares.
