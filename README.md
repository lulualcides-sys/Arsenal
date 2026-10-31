# ARSENAL — Biblioteca de código, ferramentas e pesquisas

## Ferramenta principal recuperada: REA

**[REA — Reverse Engineer Anything](fontes/rea)** ([repositório original](https://github.com/morluto/rea)) é nosso principal kit de estudo de software e engenharia reversa. Seu código completo está ligado ao Arsenal como submódulo Git fixado em commit, ao lado do [Emerald Arena](fontes/emerald-arena).

**[Ver TODAS as ferramentas recuperadas: 204 repositórios](ferramentas/INVENTARIO-COMPLETO.md)** · **[Documentos originais dos prints/listas](ferramentas/arquivos-originais/)** · **[31 bibliotecas com código vinculado](ferramentas/RECUPERADOS-PRINTS-E-LISTAS.md)**

> O Arsenal guarda referências, documentos e repositórios vinculados. Não significa instalação no PC, licenciamento de ativos externos ou compilação de jogos.

**Atualização 10/10/2026:** [42 novas ferramentas pesquisadas](ferramentas/PESQUISA-GITHUB-2026-10-10.md), 13 novos submódulos Git. **Agora 204 repositórios no catálogo e 32 submódulos no total** (Emerald Arena + REA + 30 ferramentas).

Acervo central de desenvolvimento dos projetos **Pokémon Torre**, **NEXUS Score** e **WildVox**.

> ⚠️ O repositório é **público**: não incluir ROMs comerciais, conteúdo privado do NEXUS, senhas, tokens, relatórios pessoais, vídeos protegidos ou arquivos de usuários.

> **Jogo atualizado:** [Pokémon Torre Arena V11 Animada](jogos-html/Pokemon_Torre_Arena_V11_Animada.html) — spritesheets Idle/Walk/Attack/Hurt a 8 FPS e [guia dos PNGs](jogos-html/SPRITES_V11_GUIA.md). Não substitui a engine nativa GBA.

## Buscando 1 Milhão — CRM, vendas e leads (31/10/2026)

**[Avaliação comercial e integração para nossos projetos](ferramentas/BUSCANDO-1-MILHAO-2026-10-31.md)** — [Buscando 1 Milhão, de Matheus Gomes](https://github.com/soumatheusgomes/buscandomilhao): prompt para construir um sistema de prospecção e CRM com IA. **Melhor aproveitamento:** qualificação de leads, funis de clientes/afiliados, atendimento com afirmações verificadas, follow-up autorizado, métricas de conversão e controle de custo para **Central de Softwares e Realizações Imóveis**, com uso comercial isolado em NEXUS Score e WildVox. **Não existe software pronto nem faturamento de R$ 1 milhão comprovado pelo repositório.** Referência catalogada, sem instalação ou envios automatizados; licença de reutilização do texto/código não identificada. Evitar prospecção automatizada por DMs não solicitadas, priorizando comunicação consentida e integrações oficiais.

## Vibe Coding Toolkit — regras de qualidade e refatoração segura (31/10/2026)

**[Análise técnica e plano de adoção para Pokémon Torre 2](ferramentas/VIBE-CODING-TOOLKIT-POKEMON-TORRE-2-2026-10-31.md)** — [Vibe Coding Toolkit de Matheus Gomes](https://github.com/soumatheusgomes/vibe-coding-toolkit) (MIT): prompts 08 (ESLint quality gates), 09 (refatoração de arquivos extensos) e 02 (redução de warnings). Foi constatado que o Pokémon Torre 2 tem scripts de testes e verificações, mas não um `lint` declarado no `package.json`. **Catalogado como referência e plano; nenhum código de jogo alterado, dependência instalada ou refatoração executada.** Adotar em branch isolada e com regressão de Phaser/Chromium antes de mesclar.

## FindSkills — pesquisa de skills para Pokémon Torre 2 (30/10/2026)

**[FindSkills.org](https://www.findskills.org/)** e **[Find Skills (Vercel)](https://www.skills.sh/vercel-labs/skills/find-skills)** são serviços/projetos distintos para descobrir habilidades de agentes. **[Análise de compatibilidade com o Pokémon Torre 2](ferramentas/FINDSKILLS-POKEMON-TORRE-2-2026-10-30.md)**: Phaser na campanha, PixiJS 7.4.3 no laboratório antigo; prioridades: Playwright, diagnóstico de desempenho e boas práticas Phaser. **Quatro skills instaladas como instruções no Pokémon Torre 2** via [PR #383](https://github.com/lulualcides-sys/Pok-mon-torre-2/pull/383), com referências e licenças. Nenhum executável npm/CLI foi instalado no PC; código de jogo preservado.

## Economia de contexto — Graphiti + Obsidian (30/10/2026)

**[Guia prático: memória de projetos e redução de tokens](ferramentas/GRAPHITI-OBSIDIAN-ECONOMIA-TOKENS.md)** — combina a recuperação seletiva de contexto com documentação persistente:

- **[Graphiti](fontes/ferramentas/graphiti)** ([origem](https://github.com/getzep/graphiti)): **já vinculado** como submódulo Git ao Arsenal. Framework open source para grafos temporais, memória de agentes e busca híbrida; exige infraestrutura e pode consumir tokens na ingestão.
- **[Obsidian](https://obsidian.md/)** ([releases oficiais](https://github.com/obsidianmd/obsidian-releases)): notas em Markdown e índices de decisões, testes e pendências. **Catalogado como referência**; o aplicativo não é open source, seu código não foi adicionado e nada foi instalado.

> **Economia de tokens não é automática:** enviar ao modelo só notas/trechos relevantes, em vez de históricos completos. Começar com Markdown + busca no GitHub; avaliar Graphiti apenas se a complexidade justificar.

## Novos projetos dos vídeos — 29/10/2026

**[7 ferramentas open source verificadas e pesquisa RTX 2060](ferramentas/VIDEOS-OPEN-SOURCE-RTX2060-2026-10-29.md)** — GPU Unlock, Win11Debloat, CleanYourTV, SmartTube, UAD-ng, ReVanced Manager e Pi-hole; extras Turing Unlock (RTX 2060 experimental) e OptiScaler (jogos offline). Inclui fontes oficiais, licenças, riscos e resultados efetivamente documentados. **Apenas referências catalogadas: nenhuma instalação ou alteração no PC/projetos.**

## Kits de desenvolvimento com IA — Superpowers e Spec Kit

Os dois projetos **já estão vinculados ao Arsenal como submódulos Git** (versões fixadas, sem duplicar o código). Eles também constam do [inventário completo](ferramentas/INVENTARIO-COMPLETO.md):

- **[Superpowers — obra/superpowers](fontes/ferramentas/superpowers)** ([origem oficial](https://github.com/obra/superpowers)): conjunto de habilidades e metodologia para agentes de desenvolvimento, com planejamento, depuração sistemática, testes antes da implementação e revisão de código. Referência Git fixada em `bb92a777`.
- **[Spec Kit — github/spec-kit](fontes/ferramentas/spec-kit)** ([origem oficial](https://github.com/github/spec-kit)): kit de desenvolvimento orientado por especificações (SDD), planejamento, tarefas verificáveis e fluxos de correção. Referência Git fixada em `04437605`.

Para baixar **somente esses dois submódulos** em um clone existente do Arsenal:

```bash
git submodule update --init fontes/ferramentas/superpowers fontes/ferramentas/spec-kit
```

> **Estado real:** vinculados ao repositório; isso **não** significa que os plugins ou comandos foram instalados no computador, no ChatGPT ou nos projetos. Os submódulos permanecem fixados nos commits registrados no Arsenal; atualizar para versões novas exige revisão de compatibilidade.

## Nova ferramenta catalogada — 14/10/2026

- **[OmniRoute — gateway de IA com fallback, múltiplos provedores e APIs](ferramentas/OMNIROUTE.md)** ([projeto oficial](https://github.com/diegosouzapw/OmniRoute)): referência para NEXUS, WildVox e desenvolvimento do Pokémon Torre. **Catalogada; não instalada nos projetos nem no PC.**

## Nova auditoria de animações — 22/10/2026

**[Emerald Arena v0.13.0 → matriz para Pokémon Torre 2](docs/EMERALD-ARENA-AUDITORIA-TORRE-2-2026-10-22.md)**: estudo do site, 89 perfis de movimentos, captura, Pokébolas, troca, efeitos de terreno e prioridades de implementação com regras de licença. O repositório **já estava** em [`fontes/emerald-arena`](fontes/emerald-arena) e o submódulo aponta para o mesmo commit `e1502f9` da origem, portanto não criamos cópia duplicada. Documentação de estudo, sem alterar golpes aprovados no Torre 2.

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
