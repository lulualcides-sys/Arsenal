# ARSENAL — Biblioteca de código, ferramentas e pesquisas

## Ferramenta principal recuperada: REA

**[REA — Reverse Engineer Anything](fontes/rea)** ([repositório original](https://github.com/morluto/rea)) é nosso principal kit de estudo de software e engenharia reversa. Seu código completo está ligado ao Arsenal como submódulo Git fixado em commit, ao lado do [Emerald Arena](fontes/emerald-arena).

**[Ver TODAS as ferramentas recuperadas: 204 repositórios](ferramentas/INVENTARIO-COMPLETO.md)** · **[Documentos originais dos prints/listas](ferramentas/arquivos-originais/)** · **[31 bibliotecas com código vinculado](ferramentas/RECUPERADOS-PRINTS-E-LISTAS.md)**

> O Arsenal guarda referências, documentos e repositórios vinculados. Não significa instalação no PC, licenciamento de ativos externos ou compilação de jogos.

**Atualização 10/10/2026:** [42 novas ferramentas pesquisadas](ferramentas/PESQUISA-GITHUB-2026-10-10.md), 13 novos submódulos Git. **Agora 204 repositórios no catálogo e 32 submódulos no total** (Emerald Arena + REA + 30 ferramentas).

Acervo central de desenvolvimento dos projetos **Pokémon Torre**, **NEXUS Score** e **WildVox**.

> ⚠️ O repositório é **público**: não incluir ROMs comerciais, conteúdo privado do NEXUS, senhas, tokens, relatórios pessoais, vídeos protegidos ou arquivos de usuários.

> **Jogo atualizado:** [Pokémon Torre Arena V11 Animada](jogos-html/Pokemon_Torre_Arena_V11_Animada.html) — spritesheets Idle/Walk/Attack/Hurt a 8 FPS e [guia dos PNGs](jogos-html/SPRITES_V11_GUIA.md). Não substitui a engine nativa GBA.

## Nova ferramenta catalogada — 14/10/2026

- **[OmniRoute — gateway de IA com fallback, múltiplos provedores e APIs](ferramentas/OMNIROUTE.md)** ([projeto oficial](https://github.com/diegosouzapw/OmniRoute)): referência para NEXUS, WildVox e desenvolvimento do Pokémon Torre. **Catalogada; não instalada nos projetos nem no PC.**

## Seções

| Caminho | O que você encontra |
| --- | --- |
| [`fontes/emerald-arena/`](fontes/emerald-arena/) | **Repositório original do Emerald Arena**, anexado como *submódulo Git* no commit fixado: código C, IA, física, golpes, sprites e ferramentas; respeite licenças do upstream |
| [`pokemon-torre/`](pokemon-torre/) | Nossa adaptação experimental de progressão em torre (C e testes), e indicações de protótipos HTML |
| [`ferramentas/`](ferramentas/) | Inventário de projetos GitHub, ferramentas, APIs e referências técnicas |
| [`projetos/`](projetos/) | Links para NEXUS e WildVox — não duplicamos os dados privados |
| [`docs/`](docs/) | Créditos, licenças, inventário e status real |

### Baixar o código completo incluindo Emerald Arena

```bash
git clone --recurse-submodules https://github.com/lulualcides-sys/Arsenal.git
```

Se já clonou:

```bash
git submodule update --init --recursive
```

A pasta `fontes/emerald-arena` é **código-fonte original do projeto upstream**, não uma ROM de Pokémon Emerald. O motor original foi construído como modificação do projeto público `pret/pokeemerald`, exigindo um ambiente GBA para compilar. **Não inclui ROM comercial, jogo compilado nem promete suporte a todos os Pokémon.**

## Estado dos projetos

- **Emerald Arena:** código-fonte de terceiros preservado na versão original, sem alteração.
- **Pokémon Torre GBA:** nosso código de integração **experimental**, com testes locais de lógica; não compilado como ROM jogável.
- **Pokémon Torre HTML:** protótipos V1–V10 desenvolvidos separadamente; não são o motor nativo.
- **NEXUS:** projeto principal permanece em repositório **privado**.
- **WildVox:** automações no repositório próprio.

Leia [o inventário completo](ferramentas/INVENTARIO-COMPLETO.md) e [o catálogo anterior](ferramentas/INVENTARIO.md) e [o estado de cada item](docs/STATUS-E-LICENCAS.md).

**Aviso:** Pokémon e marcas associadas são propriedade dos respectivos titulares. Códigos e recursos de terceiros têm suas próprias licenças. Não distribuir ROMs comerciais.
