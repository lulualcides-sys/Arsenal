# 5 skills de IA do ranking — verificação e integração ao Arsenal

**Data:** 05/11/2026  
**Origem:** captura enviada pelo usuário de um ranking de instalações de skills.  
**Escopo:** catalogar as cinco ferramentas sem duplicar referências existentes.  
**Status:** documentação adicionada ao Arsenal; **nenhuma instalação, execução nem mudança nos projetos operacionais**.

> **Atenção:** os números de instalações vistos no vídeo são uma fotografia do ranking de terceiros; não são benchmarks de qualidade, nem indicadores de que ferramentas já foram instaladas na máquina ou nos projetos. Os próprios nomes podem ser confundidos com outros projetos de nome semelhante.

## Índice técnico e estado de deduplicação

| Nome no print | Projeto e fonte oficial | Licença verificada | O que faz | Situação antes desta inclusão |
| --- | --- | --- | --- | --- |
| **grilling** (print: 'grilling') | [mattpocock/skills](https://github.com/mattpocock/skills) → [grilling/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) | MIT (repositório) | Faz entrevista crítica estruturada sobre requisitos, alternativas, riscos e decisões antes de implementar uma ideia | **Novo** neste catálogo |
| **hyperframes** | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Apache-2.0 | Composições HTML e animações renderizadas como vídeo; bibliotecas/skills de vídeo | **Já catalogado** em [IA-OPEN-SOURCE-10-FERRAMENTAS-2026-11-01.md](IA-OPEN-SOURCE-10-FERRAMENTAS-2026-11-01.md); não duplicar |
| **find-skills** | [vercel-labs/skills](https://github.com/vercel-labs/skills) → [find-skills/SKILL.md](https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md) | MIT (repositório) | Descobre outras skills de agentes; recomenda CLI para pesquisar/instalar habilidades | **Já catalogado** em [FINDSKILLS-POKEMON-TORRE-2-2026-10-30.md](FINDSKILLS-POKEMON-TORRE-2-2026-10-30.md); distinto de FindSkills.org |
| **agent-browser** | [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | Apache-2.0 | CLI Rust para navegação real por agente: captura snapshot de acessibilidade, navega, clica, preenche e tira screenshots | **Novo** neste catálogo |
| **design-taste-frontend** | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) → [design-taste-frontend/SKILL.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md) | MIT (repositório) | Diretrizes e fluxos de frontend visual, layout, imagens, animações e checagem em navegador | **Novo** neste catálogo |

**Deduplicação:** cinco identificadas e referenciadas; **3 referências novas e 2 apontamentos aos registros que já existiam**. Não foram contabilizadas cinco como projetos inéditos, nem foi copiado código-fonte de terceiros para o Arsenal.

## Guia de uso nos nossos projetos

### 1. Pokémon Torre 2 — prioridade alta: agent-browser + diretrizes seletivas de design-taste-frontend

- Usar **agent-browser** para abrir o jogo publicado ou ambiente de prévia, percorrer botões/cards/menus da campanha, registrar screenshots e estados de interface; pode auxiliar na reprodução de bugs de navegação e verificar sobreposição/desalinhamento.
- Comparar com Playwright, que já consta no Arsenal; evitar criar duas suítes redundantes. Testes automatizados e screenshots **não garantem** correto funcionamento do Phaser sem inspeções funcionais, tempo de renderização e evidência visual.
- Aplicar **design-taste-frontend** **somente** a propostas de layout e organização de menus, cards e outras interfaces. **Não impor o estilo de landing pages ao jogo**, não trocar pixel art já aprovada, não reescrever VFX dos golpes, não mudar a HUD aprovada de batalha.
- Fluxo: identificar arquivos pertinentes → branch de segurança → mock/preview → teste focado → evidência/screenshots reais → aprovação → publicação. Preservar saves, efeitos e decisões aprovadas.

### 2. WildVox — prioridade alta: HyperFrames (já catalogado)

- É a ferramenta mais aderente à necessidade de narrativa audiovisual: setas e etiquetas em movimento, transições, camadas, motion graphics e legendas sincronizadas, com renders de HTML/DOM.
- **Não confundir com gerador autônomo de roteiros, cenas, voz ou publicação TikTok**. O editor ainda precisa de mídia de origem, TTS, trilha licenciada e pipeline de renderização.
- Priorizar um clipe de teste reproduzível, comparar custo/qualidade com o pipeline existente, sem quebrar o TikTok @wildvox e suas automações. Repositório indica Node.js 22+; dependências e operações podem consumir CPU e tempo.

### 3. ATLAS / NEXUS — prioridade média: grilling

- **grilling** confronta premissas de estratégias e requisitos: dados de entrada, hipótese, falsificabilidade, contaminação por informações futuras, custos e validação fora da amostra.
- É uma ferramenta de **questionamento e planejamento**, não executa backtests, não identifica automaticamente a fórmula de outro indicador e não prova lucratividade.
- A skill original foi projetada para várias rodadas de perguntas; como diretriz operacional deste Arsenal, **coletar fatos automaticamente e evitar pedir repetidamente informações já fornecidas**, submetendo ao usuário só decisões realmente novas.

### 4. Todos os projetos — prioridade média: find-skills (já catalogado)

- Útil ao pesquisar ferramentas específicas antes de criar uma solução do zero, mas cada skill encontrada exige **revisão de código, licença, compatibilidade, versão e permissões**.
- Buscar não significa instalar; não executar skills desconhecidas automaticamente em CI ou ambientes com segredos.

## Verificação do ranking e cautelas

- Os números da captura (aproximadamente 4,2 milhões para find-skills, 1,4 milhão para HyperFrames e agent-browser, 1,1 milhão para grilling e 730 mil para design-taste-frontend) são **instalações reportadas no ranking**, não usuários únicos nem resultados testados.
- **grilling ≠ grill-me de qualquer outro autor**: este catálogo vincula explicitamente a skill `grilling` da coleção **mattpocock/skills** (no upstream, `grill-me` é um alias).
- **find-skills ≠ findskills.org**: a skill `find-skills` do print é a de **vercel-labs/skills**.
- **design-taste-frontend** é o *nome de instalação* da skill `skills/taste-skill` da coleção **Leonxlnx/taste-skill**; a documentação pode evoluir. Não aplicar regras externas sobre padrões visuais aprovados sem revisão.
- Cada ferramenta pode requerer um agente/LLM, Node, navegador, renderizador ou instalação local; **open source não equivale a execução com custo operacional zero**.

## Referências e evidências

- [Ranking original das skills](https://skills.sh/)
- [grilling — arquivo oficial](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)
- [HyperFrames — código oficial](https://github.com/heygen-com/hyperframes)
- [find-skills — arquivo oficial](https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md)
- [agent-browser — README oficial](https://github.com/vercel-labs/agent-browser)
- [design-taste-frontend — arquivo oficial](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md)

## Estado operacional desta entrega

1. Pesquisados os cinco nomes e validados os projetos oficiais e licenças a partir dos repositórios GitHub.
2. Confirmado que **HyperFrames** e **Find Skills** já constavam no Arsenal, sem duplicar páginas existentes.
3. Criado este registro com documentação de **grilling**, **agent-browser** e **design-taste-frontend** e links para os dois registros anteriores.
4. Índice principal (README.md) atualizado com esta coleção.
5. **Não executados:** clonagem, instalação de CLI ou skill, testes no jogo, vídeos, trading, deploy, publicação ou modificações de código em outros repositórios.
