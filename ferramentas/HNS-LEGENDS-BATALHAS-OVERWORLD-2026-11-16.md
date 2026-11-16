# HnS Legends — batalhas Pokémon em tempo real no overworld (16/11/2026)

**Origem oficial:** https://github.com/HuyMai0509/HnS-Legends  
**Autor identificado:** HUY MAI (`HuyMai0509`)  
**Release verificada:** [M9 — 19 Noble Bosses](https://github.com/HuyMai0509/HnS-Legends/releases/tag/M9), publicada em **16/11/2026**.  
**Categoria do Arsenal:** referência de design/estudo, **não** biblioteca de código reutilizável.  
**Estado:** catalogado e analisado pela documentação pública; **não instalado, copiado, integrado ou testado em jogo**.

## O que é

ROM hack de Pokémon Heart & Soul baseado em `pokeemerald-expansion`, com batalhas realizadas diretamente no mapa, em vez de uma tela de batalha separada. A documentação descreve história de Johto e Kanto, Pokémon acompanhantes, clima, HUD compacto, dano flutuante, golpes animados no overworld e seleção por controles do GBA.

**Atenção à versão:** a imagem de referência compartilhada mostra a versão `M8.1b`; a versão mais recente consultada no GitHub é a `M9`. O README no ramo principal ainda informa `v0.21b` e procedimentos de instalação desse release antigo; para versão atual, **prevalece o changelog da release M9**, que deve ser verificado novamente antes de qualquer uso.

## Recursos descritos pelo autor — oportunidades de estudo

| Recurso | Evidência pública | Possível aprendizado para Pokémon Torre 2 |
|---|---|---|
| Batalhas sem troca de cena | README — batalhas no overworld | Transições de combate mais ágeis, sem quebrar mecânicas existentes |
| Projeção visual de golpes | README — animações, efeitos por parte do corpo | Ponto de emissão, contato e leitura dos efeitos; estudar com VFX próprios |
| HUD de combate compacto | README — dano, status chips, hazards no chão | Clareza de informação e prioridade visual no mobile |
| Seleção rápida de equipe/itens | README — anéis acionados por botões | Protótipo opcional de UI, sem substituir interface aprovada |
| Megaevolução exibida no mapa | README — transformação na própria cena | Inspirar sincronização entre evolução, sprite e estado de batalha |
| Lutas contra chefes em duas fases | Release M9 — arena de ação + combate overworld | Experiência de chefe separada e opcional, com premiação por habilidade |
| Esquiva e leitura de ataques | Release M9 — avisos `!`/`!!`, esquiva perfeita, hit-stop | Ideias para telegrafar ataques sem alterar cooldowns vigentes |
| Estabilidade em efeitos intensos | Release M9 — afirmação de otimização de renderização/heap | Hipótese a validar em testes próprios; **não** tomar como ganho comprovado |

### Detalhes da release M9

Segundo as notas do autor, há **19 encontros com chefes**. A fase 1 usa arena dedicada, perigos ambientais e esquivas; a fase 2 usa batalha no overworld e classificação S/A/B/C. Há menção a efeitos como gelo escorregadio, fogo/eletricidade, rochas destrutíveis e alterações de forma durante o encontro. A nota também afirma correções de bugs e otimizações em IWRAM; são alegações do autor, não benchmarks independentes.

## Licença, distribuição e restrições

- O GitHub **não informa uma licença para o repositório** (`license: null`) e a raiz observada expõe README, imagens e notas de release, **não o código-fonte completo** da mecânica.
- Os releases fornecem arquivos `.bps` para aplicar em uma **ROM original obtida legalmente**, com CRC32 `1F1C08FB` para o Pokémon Emerald (USA/Europe), segundo o autor. **Não baixar, armazenar ou redistribuir ROM comercial no Arsenal.**
- Não importar patch, sprites, imagens, músicas, código ou assets para Pokémon Torre 2 sem autorização/licença aplicável e revisão dos direitos de terceiros. O fato de o projeto ser público ou gratuito **não** concede direitos amplos de reutilização.
- A referência ao Pokémon, suas marcas e seus personagens não muda as condições dos direitos de terceiros.
- Não acrescentar este projeto à contagem de bibliotecas instaladas, submódulos ou fontes compiláveis: é uma **referência documental**.

## Roteiro de avaliação (não executado)

1. Preparar vídeo/referências textuais das lutas e elaborar checklist de UX e legibilidade; sem copiar arte ou ROM.
2. Comparar conceitualmente com padrões aprovados do Torre 2 e exemplos já presentes no Arsenal (Emerald Arena, Poké Arena 2D e PixelFX).
3. Montar **protótipo independente** usando código e efeitos próprios para testar apenas (a) telegráfo de ataque e (b) feedback de contato/hit-stop, sem mexer nos jogos ativos.
4. Medir FPS, latência de entrada, estado do sprite e regressões; só propor integração ao Torre 2 com base em testes e autorização específica.
5. Preservar Arena, biblioteca de golpes aprovada, evoluções, cooldowns, saves e cliente-base; não criar PR no Torre 2 como efeito desta catalogação.

## Fontes primárias verificadas em 16/11/2026

- Repositório: https://github.com/HuyMai0509/HnS-Legends
- README: https://github.com/HuyMai0509/HnS-Legends/blob/main/README.md
- Notas da versão M9: https://github.com/HuyMai0509/HnS-Legends/releases/tag/M9

**Conclusão:** referência promissora para estudar UX de combate e chefes; não existe, na evidência consultada, um módulo pronto e licenciado para transferir diretamente ao Torre 2.
