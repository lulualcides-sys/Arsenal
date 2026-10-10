# Pokémon Torre — integração nativa com Emerald Arena

**Já existem nesta pasta os arquivos autorais da integração experimental**:

- [`overlay/src/arena_tower.inc`](overlay/src/arena_tower.inc): 14 desafios (6 treinadores + líder Voador e 6 + líder Água), montagem das equipes, captura e entrada nas batalhas nativas.
- [`overlay/src/arena_tower_progress.h`](overlay/src/arena_tower_progress.h): regras de avanço após vitória e estágios.
- [`overlay/src/arena_tower_event.inc`](overlay/src/arena_tower_event.inc): script de retorno.
- [`overlay/src/arena_tower_installer.py`](overlay/src/arena_tower_installer.py): injeta integração em uma cópia do workspace GBA compatível.
- [`tests/`](tests/): testes host em C/Python; **não equivalem a testes de ROM jogável**.
- [`LEIA-ME-EMERALD-TORRE.md`](LEIA-ME-EMERALD-TORRE.md): documentação técnica detalhada.

### Como obter motor completo

O Emerald Arena original está em [`fontes/emerald-arena`](../fontes/emerald-arena) como submódulo na versão fixada. Clone com:

```bash
git clone --recurse-submodules https://github.com/lulualcides-sys/Arsenal.git
```

O motor do Emerald Arena **não é reimplementado em HTML** aqui. O código C original permanece intacto e separado da nossa integração.

### Regras do modo Torre

1. Escolher Bulbasaur, Charmander ou Squirtle **nível 5**, sem inicial evoluído.
2. Enfrentar seis treinadores do tipo do ginásio.
3. Derrotar o líder (Winona Voador; Juan Água na primeira etapa).
4. Entre as lutas, encontros selvagens para enfraquecer e capturar Pokémon.
5. Progredir apenas após vitória; evoluir por experiência no motor Pokémon.
6. Planejar os demais ginásios sem mascarar que ainda não foram implementados no GBA.

**Estado:** código experimental entregue, **ROM não compilada**, **emulação real pendente**, menu definitivo sem exploração ainda não implementado. Não incluir ROM comercial no Git.
