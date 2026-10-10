# Pokémon Torre Arena V11 — animações por spritesheets PNG
Atualização: 10/10/2026. Fonte: [Pokemon_Torre_Arena_V11_Animada.html](Pokemon_Torre_Arena_V11_Animada.html).

## Implementado no motor Canvas

- Animações `Idle`, `Walk`, `Attack`, `Hurt` durante combate e esquiva, calculadas a **8 quadros/segundo**.
- Sprite olha na direção do adversário, com **espelhamento horizontal** dos PNGs personalizados.
- Movimento secundário mesmo para imagens paradas: balançar em repouso, saltitar andando, avançar no ataque, tremer e piscar com dano.
- Primeiro tenta sprite personalizado local; quando falta uma ação, cai para o local `_idle`, depois `<nome>.png`, depois sprites animados online do SpriteCollab, arte do PokeAPI, sprites offline e, por fim, placeholder de jogo animado.
- Sombras permanecem ancoradas, sprite renderizado com `imageSmoothingEnabled=false` para preservar pixels.
- **Não** remove dados salvos da V10, que continua disponível separadamente.

## Arquivos PNG opcionais

Crie a pasta `sprites/` no mesmo diretório do HTML e salve os arquivos PNG usando minúsculas:

```text
sprites/
  charmander_idle.png
  charmander_walk.png
  charmander_attack.png
  charmander_hurt.png
  charmander.png         (parado, opcional)
```

Aceita estes 10 identificadores: `bulbasaur`, `charmander`, `squirtle`, `pikachu`, `onix`, `scyther`, `jolteon`, `blastoise`, `charizard`, `tyranitar`.

Cada estado pode ter **N quadros quadrados em linha horizontal**. Exemplo: 4 quadros de 64×64 pixels = tira de 256×64. O motor calcula os quadros automaticamente a partir de largura/altura. Fundo transparente, orientação original voltada à direita. O arquivo simples sem sufixo é opcional. Se não houver sprites, a batalha funciona usando os recursos já existentes ou o fallback.

## Como testar

1. Baixe [a V11 em HTML](Pokemon_Torre_Arena_V11_Animada.html) e abra no navegador, ou use o ZIP entregue na conversa.
2. Escolha Bulbasaur, Charmander ou Squirtle nível 5, clique **BATALHAR**.
3. Mova com teclado ou joystick, use um golpe, receba dano e observe os estados.
4. Caso adicione PNGs locais, mantenha a pasta `sprites` junto ao arquivo, sem renomear os sufixos.
5. Se forem imagens próprias, respeite os direitos autorais de personagens e artes.

## Testes realizados
- Sintaxe JS: compilou sem erro.
- Cálculo de frames: conferido para 4 quadros a 8 FPS.
- Chromium headless: batalha iniciada e renderizada em 390px e 1280px; sem erros de execução observados durante esses testes.

**Limites:** sem novos sprites Pokémon incorporados; os arquivos de imagens customizados ainda precisam ser fornecidos pelo usuário. Este projeto é protótipo HTML, não ROM GBA nem alteração da “Torre Arena v2” que só apareceu em prints do Claude.
