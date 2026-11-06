# GitHub Trending — 10 projetos da captura de 04/11/2026

**Data de catalogação:** 06/11/2026.  
**Origem:** captura enviada pelo usuário, com uma seleção de 10 repositórios em alta no GitHub em 04/11/2026.  
**Estado:** 10 referências identificadas, verificadas nos respectivos repositórios oficiais e reunidas aqui. **Não há instalação, execução, download do código, novo submódulo ou integração** nos projetos do usuário. Números de estrelas do vídeo são históricos e variáveis; não são indicadores de qualidade ou segurança.

## Índice com utilidade para nossos projetos

| # | Projeto oficial | O que faz | Possível uso | Prioridade |
|---|---|---|---|---|
| 1 | [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | CLI/biblioteca que permite a agentes ler a árvore de acessibilidade e operar aplicativos de desktop em Windows, macOS e Linux; **não inclui modelo de IA**. | Testes assistidos de programas desktop e fluxos de interação que não sejam navegadores. | **Média**, com permissões restritas |
| 2 | [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | Gera e concilia ontologias, definições de métricas e relações de dados para dar contexto verificável a agentes via API/CLI/MCP. | Dados e indicadores da Central de Softwares ou NEXUS; apenas se houver problema concreto de metadados. | **Baixa** no estágio atual |
| 3 | [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Framework Python para extração web, parsing CSS/XPath, renderização de JavaScript, crawlers e integração com agentes. | Coleta de dados **públicos e permitidos** para pesquisa, comparação e monitoramento de fontes. | **Média**, com conformidade |
| 4 | [JiaFeiMiao-K-Cat/DiscImageStudio](https://github.com/JiaFeiMiao-K-Cat/DiscImageStudio) | Transforma imagens em padrões físicos visíveis na superfície gravável de CD, DVD e BD-R; pode exportar imagens para gravação. | Laboratório de mídia física; **sem aplicação direta** no Pokémon Torre 2, WildVox ou trading. | **Muito baixa** |
| 5 | [mattpocock/skills](https://github.com/mattpocock/skills) | Coleção de skills pequenas e combináveis para programação assistida por agentes, com planejamento e revisão. | Engenharia e análise crítica de requisitos dos projetos. | **Alta**, referência **já catalogada** |
| 6 | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | Memória persistente de sessões de agentes: registra observações, resume contexto e recupera informação relevante. | Continuidade de desenvolvimento, decisões técnicas e bugs entre sessões. | **Média-alta**, após revisão de privacidade e custos |
| 7 | [floci-io/floci](https://github.com/floci-io/floci) | Emulador local de serviços compatíveis com AWS para desenvolvimento, testes e CI, sem exigir conta AWS no uso básico. | Testes de backends **AWS**, se adotados; não substitui diretamente Cloudflare Pages, GitHub Pages ou outros provedores. | **Baixa**, uso condicionado |
| 8 | [github/spec-kit](https://github.com/github/spec-kit) | Kit de especificações, tarefas e processos estruturados para agentes de programação. | Padronizar planejamento, implementação e validação antes de publicar o Pokémon Torre 2. | **Alta**, **já vinculado como submódulo** |
| 9 | [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Pipeline de vídeos curtos com roteiro, seleção/geração de materiais, TTS, legendas e montagem; possui WebUI, API e CLI. | **WildVox:** piloto comparativo de produção de vídeos narrados, sem substituir o fluxo aprovado antes da avaliação. | **Alta** para teste isolado |
| 10 | [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | CLI que organiza worktrees Git para trabalhar em várias branches e com agentes paralelos sem compartilhar a mesma pasta de trabalho. | Isolar correções, PRs e experimentos do Pokémon Torre 2, WildVox e NEXUS. | **Alta** para fluxo de desenvolvimento |

## Licenças reportadas nos repositórios oficiais (06/11/2026)

| Projeto | Licença |
|---|---|
| agent-desktop | Apache-2.0 |
| auto-ontology | Apache-2.0 |
| Scrapling | BSD-3-Clause |
| DiscImageStudio | GPL-3.0 |
| mattpocock/skills | MIT |
| claude-mem | Apache-2.0 |
| floci | MIT |
| spec-kit | MIT |
| MoneyPrinterTurbo | MIT |
| worktrunk | MIT **ou** Apache-2.0 (dual, conforme README; a API de licença do GitHub retorna NOASSERTION) |

**Observação:** licenças do repositório não cobrem automaticamente modelos, provedores de IA, imagens, bancos de dados e conteúdos de terceiros. Revalidar termos e dependências antes de redistribuir ou comercializar.

## Registros preexistentes — não duplicar

- **Spec Kit** já faz parte do Arsenal em [`fontes/ferramentas/spec-kit`](../fontes/ferramentas/spec-kit) como submódulo Git fixado, descrito no [README principal](../README.md) e no [inventário completo](INVENTARIO-COMPLETO.md). **Nenhum novo clone ou submódulo deve ser criado.**
- **mattpocock/skills** já está registrado na análise da skill **grilling** em [`TOP-5-SKILLS-IA-2026-11-05.md`](TOP-5-SKILLS-IA-2026-11-05.md). Este documento só acrescenta sua presença no ranking de repositórios.
- O [inventário histórico](INVENTARIO-COMPLETO.md) preserva sua contagem original de repositórios à data da compilação. **Não usar aquela contagem como total atualizado de todos os documentos adicionados depois.**

## Riscos e condições de adoção

1. **Controle do PC (agent-desktop):** acesso à árvore de acessibilidade pode revelar senhas, mensagens e informações privadas. Executar em ambiente controlado, com aprovação explícita de permissões, logs protegidos e sem ações destrutivas automáticas.
2. **Ontologias (auto-ontology):** exige modelagem e governança de dados; para sistemas pequenos pode trazer custo operacional superior ao benefício. Não garante que um indicador seja matematicamente correto.
3. **Coleta web (Scrapling):** usar apenas fontes e acessos permitidos, respeitando privacidade, limites e termos. Não usar recursos de evasão para contornar restrições, autenticação ou bloqueios.
4. **Mídia física (DiscImageStudio):** gravação em disco envolve compatibilidade do drive, mídias e possibilidade de perda de dados. É ferramenta de mídia ótica, **não** de edição comum de imagens.
5. **Skills:** tratar instruções externas como código não confiável, revisar permissões e comandos antes de rodar. Não instalar em duplicidade junto às skills já presentes.
6. **Memória (claude-mem):** observar armazenamento de prompts, segredos e observações; instalação e provedores de memória/modelos podem exigir configuração de conta e gerar custos. Não compartilhar dados privados no Arsenal público.
7. **Emulação (floci):** cobertura e fidelidade dos serviços AWS variam; teste local não substitui homologação em infraestrutura de produção.
8. **Vídeos (MoneyPrinterTurbo):** risco de conteúdo genérico, assets sem direitos de reutilização, falhas de narração/legenda e cobrança por APIs. Testar somente com material licenciado, sem publicação automática.
9. **Git paralelo (Worktrunk):** worktrees isolam diretórios, mas não dispensam revisão, prevenção de conflitos, testes e inspeção do diff antes do merge.

## Próximos pilotos, sem integração prematura

1. **Worktrunk — Pokémon Torre 2:** avaliar num repositório/branch de teste um fluxo de duas correções paralelas, com testes, sem alterar saves, sprites ou efeitos aprovados.
2. **MoneyPrinterTurbo — WildVox:** comparar **um** vídeo narrativo vertical com o pipeline atual, medindo qualidade, direitos de mídia, duração, sincronização, desempenho e custo por vídeo. **Não publicar** antes de aprovação e de passar as verificações existentes.
3. **Scrapling — pesquisas:** validar uma coleta pública pequena, com limite de requisições e fonte documentada, antes de qualquer crawler permanente.
4. **Claude-mem / agent-desktop / auto-ontology:** considerar apenas se resolverem uma dificuldade comprovada sem introduzir exposição de dados ou consumo desproporcional.
5. **DiscImageStudio / floci:** manter como referências até surgir caso de uso real.

**Resultado desta curadoria:** dez entradas documentadas, das quais **Spec Kit** e **mattpocock/skills** já tinham referências no Arsenal. Nenhuma integração foi realizada em jogos, robôs, sites ou automações.
