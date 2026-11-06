# Integrações e testes dos 10 projetos GitHub Trending — 06/11/2026

Referência: [catálogo de 10 projetos](GITHUB-TRENDING-10-PROJETOS-2026-11-04.md). Escopo: escolher **somente** ferramentas úteis aos projetos do usuário, evitando dependências, créditos e riscos desnecessários.

## Integrações e evidências verificadas

| Projeto nosso | Ferramenta | Entrega | Evidência | Limitação |
| --- | --- | --- | --- | --- |
| WildVox | MoneyPrinterTurbo | [PR #9](https://github.com/lulualcides-sys/wildvox-automation/pull/9) **mesclada**; adaptador manual de materiais locais, voz original Michael, não executa geração final | [CI 42294009289](https://github.com/lulualcides-sys/wildvox-automation/actions/runs/42294009289): **81 testes aprovados**, incluindo 5 testes novos de plano, fonte local, unicidade, revisão e ausência de publicação | Não gerou vídeo; não testou rendering, legendas, qualidade cinematográfica, visualizações ou economia de custo |
| Pokémon Torre 2 | Worktrunk | [PR #594](https://github.com/lulualcides-sys/Pok-mon-torre-2/pull/594): script opt-in para listar/criar worktrees seguras, testes, workflow e documentação | [CI 42294003989](https://github.com/lulualcides-sys/Pok-mon-torre-2/actions/runs/42294003989): **481 testes unitários aprovados** e 3 focados, sintaxe e regras de reutilização aprovadas | No registro deste relatório a PR ainda dependia de revisão final das suítes de navegador/guardião; Worktrunk binário não foi instalado; melhoria de velocidade ou conflitos não foi medida |

**Salvaguardas:** nenhuma mudança em `configs/daily.json`, `scripts/generate_video.py`, rotina de postagem, campanhas de jogo, saves ou golpes/VFX nativos. Ferramentas externas não foram instaladas no PC. Nenhum modelo comercial nem GPU foi usado. Os resultados mostram **compatibilidade de código e novos bloqueios preventivos**, não melhora de qualidade visual, receita ou performance.

## Decisões sobre os demais itens

| Ferramenta | Decisão | Motivo |
| --- | --- | --- |
| Spec Kit | **Reutilizar existente; não reinstalar** | Já há submódulo e políticas no Pokémon Torre 2; duplicação dificulta auditoria |
| mattpocock/skills | **Reutilizar seletivamente; não instalar coleção inteira** | Já catalogado; skills de agente devem ser revisadas por conteúdo e permissões |
| Scrapling | **Não integrar a coletores esportivos/financeiros agora** | Projeto já tem fontes próprias; crawler traz dependência, manutenção, risco de bloqueio/termos sem ganho demonstrado |
| NVIDIA Auto Ontology | **Não integrar agora** | Infraestrutura/semântica orientada a dados empresariais; excesso de complexidade para backtests menores; não cria edge ou precisão automaticamente |
| Claude-Mem | **Adiar** | Memória operacional atual em Markdown/Obsidian; alternativas podem armazenar dados privados fora do GitHub, implicando proteção de chaves, logs e custos |
| Agent Desktop | **Adiar** | Somente útil com apps desktop reais e permissões locais; automação de navegador existente tem Playwright; exige controle de dados sensíveis |
| Floci | **Adiar** | Emulador AWS não reduz custo ou testa diretamente GitHub Pages/Cloudflare atuais sem workload AWS |
| DiscImageStudio | **Só catalogar** | Não participa de UI pixel art, renderização de vídeo, jogos ou robôs; mídia ótica sem caso de uso |

## Métricas que faltam para afirmar *melhoria* de fato

1. **WildVox:** executar experimento offline licenciado e sem cross-posting, comparar tempo/custo por vídeo, proporção de fontes corretas, congelamentos, sincronia das legendas e avaliação visual manual frente ao pipeline existente. Sem amostra real, não declarar que MoneyPrinterTurbo é melhor.
2. **Pokémon Torre 2:** concluir testes Chromium/Phaser/guardião e revisar diff; para avaliar Worktrunk, medir conflitos reais entre 2 tarefas isoladas vs. fluxo antigo, sem alterar jogo publicado. Testes unitários aprovados não demonstram essa redução.
3. **NEXUS/ATLAS:** preservar dados e backtests existentes. Não adicionar Scrapling/Auto Ontology sem um problema reproduzível e um A/B envolvendo evidência das fontes, erros, custo de manutenção e efeito em métricas fora da amostra. Nenhum lucro ou melhoria de winrate foi medido.

**Resumo verificável:** dois pilotos criados, um mesclado na produção apenas como ferramenta de teste não usada automaticamente; outros itens mantidos como referências. Nenhuma integração prometeu resultado de vídeos, jogos ou operações financeiras.
