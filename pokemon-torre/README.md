# Pokémon Torre — implementação nativa experimental

Objetivo: **combate do Emerald Arena original**, evoluções e captura integradas ao sistema original, com progressão em torre: escolher um inicial nível 5, enfrentar 6 treinadores e 1 líder por ginásio, capturar nos intervalos, evoluir a equipe.

**Situação:** a primeira integração local contém 14 etapas (Voador + Água) com testes de lógica em C e instalador Python; **a ROM ainda não foi compilada**. O primeiro protótipo nativo ainda requer uma interface de torre definitiva.

- Código do motor e fontes completos: [`fontes/emerald-arena`](../fontes/emerald-arena) (submódulo de referência).
- A implementação precisa aplicar o patch `game/native-engine.patch` do upstream em uma revisão compatível de `pret/pokeemerald`, incluir os arquivos da Torre e compilar usando toolchain GBA.
- Não incluir ROM comercial.

## Jogabilidade pretendida
1. Escolha Bulbasaur / Charmander / Squirtle no nível 5.
2. Seis treinadores do tipo do ginásio, depois o líder.
3. Captura opcional na grama entre desafios.
4. XP e evolução nativos; derrota não desbloqueia próxima etapa.
5. Progredir por ginásios e manter saves.

Consulte [status de licenças](../docs/STATUS-E-LICENCAS.md).
