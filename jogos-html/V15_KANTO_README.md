# Pokémon Torre V15 — Kanto

[**JOGAR V15 (HTML)**](Pokemon_Torre_V15_Kanto_JOGAR.html)

## Novidades

- Pokédex com as 151 espécies originais de Kanto; os 151 IDs estão nos dados do jogo, com tipo e atributos equilibrados para este protótipo. As estatísticas **não são uma reprodução exata** de FireRed.
- Oito regiões da Torre recebem conjuntos de encontros selvagens; as espécies mais raras aparecem nas etapas finais.
- Iniciais continuam Bulbasaur, Charmander e Squirtle, todos nível 5, sem evoluções imediatas.
- Os Pokémon mantêm o mesmo tamanho **parados, andando, atacando e recebendo dano**. Pedras e objetos menores.
- Mira sempre voltada para o **Pokémon adversário**. Toques no campo não trocam de alvo; os projéteis atravessam as pedras.
- **PokéMart**: moedas obtidas por vitórias para comprar Poções (20), Superpoções (48) e Pokébolas (12). As poções podem ser usadas entre e durante as batalhas.
- Pokédex registra Pokémon vistos e capturados. Progressão e save persistem por `localStorage` do navegador, quando disponível.

## Sprites detalhados — fontes e uso

O HTML incorpora **10 espécies detalhadas** e animadas (Idle/Walk/Attack/Hurt) que funcionam offline. Para as outras espécies, o jogo tenta usar PNGs detalhados originais do projeto SpriteCollab, baixados via internet. Em caso de ausência, usa outras artes/fallback.

Um pacote mais completo pode ser gerado no GitHub:
[Workflow de 151 sprites](../.github/workflows/kanto-151-sprites.yml) · [Gerador](../ferramentas/gerar_sprites_kanto_151.py).

Quando a execução terminar, o artifact `Pokemon_Torre_V15_Kanto_151_Sprites` contém um ZIP com `index.html`, `sprites/`, créditos por espécie, um `metadata.json` e um `errors.json` indicando assets não encontrados. O resultado depende da disponibilidade do SpriteCollab. O script tenta obter Idle/Walk/Attack/Hurt de cada espécie e preserva os sprites individuais para permitir uso **sem conexão**.

**Licença e créditos:** PMDCollab/SpriteCollab sob CC BY-NC 4.0 para conteúdo comunitário; créditos individuais incluídos no pacote. Marcas e personagens Pokémon pertencem aos respectivos titulares. Este é projeto de fã para uso não comercial.

## Controles

No celular: joystick, golpes, esquiva, botões da loja e da Pokédex. No PC: WASD/setas; teclas 1–4 nos golpes; Espaço na esquiva. A mira é automática no rival. Use o botão da loja na tela principal para comprar recursos.

**Limites:** protótipo em HTML/Canvas, não ROM GBA, e não integra código proprietário do jogo Pokémon ou backend oculto. A Pokédex completa está implementada, mas alguns sprites externos podem falhar por disponibilidade de rede.
