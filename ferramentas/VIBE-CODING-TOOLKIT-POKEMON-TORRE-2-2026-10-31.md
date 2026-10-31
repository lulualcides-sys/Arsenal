# Vibe Coding Toolkit — qualidade de código com adoção segura (31/10/2026)

**Origem:** https://github.com/soumatheusgomes/vibe-coding-toolkit (Matheus Gomes)  
**Licença upstream:** MIT, copyright 2026 Matheus Gomes.  
**Status no Arsenal:** **referência catalogada e avaliada**. Os prompts não foram executados, nenhuma dependência foi instalada, e nenhum código de produção foi alterado no Pokémon Torre 2, NEXUS Score ou WildVox.  
**Motivo:** os 3 prompts do vídeo tratam de instalar regras de ESLint, dividir arquivos grandes e reduzir avisos; não são um reparador automático de bugs nem uma garantia de performance.

## Três prompts do vídeo — ordem e limites

1. **08 — ESLint quality gates:** https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/main/docs/prompts/08-eslint-quality-gates-install.md
   - Copia e valida regras prontas `quality/max-lines`, `quality/no-direct-console` e `quality/no-direct-data-access`; mede o passivo antes de decidir o nível de severidade.
   - Parâmetro pedido no vídeo: `MAX_LINES=350`. Começar em modo **diagnóstico/warn** para código legado. Não alterar centenas de arquivos para satisfazer um número.
   - Regra de banco/apresentação é **inaplicável** quando o projeto não tem acesso direto a banco; não configurar uma fronteira fictícia.
   - A regra de console só deve ser bloqueante depois de existir política concreta para logger/debug e exclusões legítimas.

2. **09 — File size refactor:** https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/main/docs/prompts/09-file-size-refactor.md
   - Parâmetros do vídeo: `MAX_LINES=350`, `BATCH_SIZE=3`, `RULE_ID=quality/max-lines`.
   - Executar **somente após** o inventário confiável produzido na fase 08. Escolher recortes por responsabilidade, não por contagem de linhas.
   - Fazer **um arquivo por vez**, um commit por extração, testes/regressão antes de seguir; preservar APIs, exportações, contratos e ordem de carregamento.
   - Não alterar arte e VFX aprovados nem parâmetros de gameplay como IA, RNG, captura, cooldown, dano ou saves sob o pretexto de refatoração.

3. **02 — ESLint warning burndown:** https://github.com/soumatheusgomes/vibe-coding-toolkit/blob/main/docs/prompts/02-eslint-warning-burndown.md
   - Usar **após** lint instalado. Contar avisos reais por regra/arquivo, priorizar os que afetam manutenção e corrigir por lotes sem reescrever mecânicas.
   - Separar redução legítima de avisos de mera mudança de configuração. Não afirmar `0 warnings` sem reexecutar o comando.
   - O prompt upstream possui etapas de decisão/revisão; adaptar isso ao processo de PR e testes existentes, sem deixar uma automação parada esperando uma resposta quando a ação segura é apenas documentar o risco.

## Adequação verificada — Pokémon Torre 2

**Repositório:** https://github.com/lulualcides-sys/Pok-mon-torre-2

Em 31/10/2026, o `package.json` da branch padrão contém:
- `npm test`: `node --test tests/*.test.js`.
- `npm run check`: `node --check` de módulos legados PixiJS.
- `npm run check:reuse`: verificação de reutilização de golpes.
- `npm run test:browser`: bateria de testes de navegador.
- `npm run test:campaign`: teste de progresso da campanha.
- **Não possui** scripts declarados para `lint`, `typecheck` ou `build`. Não inventar esses comandos; confirmar o CI e os scripts reais antes de instruir o toolkit.

**Arquitetura:** jogo publicado com campanha Phaser em `arena2d/` e laboratório PixiJS em `src/`. Os controles visuais, carregamento de scripts e integração Phaser exigem regressão no navegador real. Não confundir o laboratório legado com o runtime da campanha. Sem evidência de ORM/cliente de banco no conjunto avaliado; a regra de acesso direto a DB não tem utilidade prioritária.

**Concorrência observada:** PR #403 (teste da campanha/Misty) e PR #405 (AUTO finisher) estavam abertos na inspeção de 31/10/2026; PR #404 foi integrado. Outras automações podem continuar trabalhando. Antes de modificar a base, verificar novamente branches, PRs abertos e SHA do `main`. Criar branch isolada, evitar arquivos tocados por PRs simultâneos e nunca reescrever uma funcionalidade aprovada.

### Roteiro recomendado de integração (ainda não executado)

- **Fase 0 — Baseline:** listar arquivos rastreados por tamanho e por responsabilidade, excluir `node_modules`, código vendorizado, outputs gerados, sprites, mapas, bancos de dados estáticos e artefatos binários do escopo de refatoração. Registrar testes atuais, status do CI e SHA do HEAD. Não misturar limpeza de código com ajustes de gameplay.
- **Fase 1 — Lint incremental:** introduzir ESLint em branch dedicada com configuração direcionada aos arquivos de autoria do Torre 2; copiar regras testadas do toolkit somente se compatíveis; rodar o verificador do upstream e o lint. `350` linhas como sinal de diagnóstico inicial, não como reprovação obrigatória de todo arquivo legado. Configurar `warn` para dívidas existentes, `error` só onde baseline for zero e a regra fizer sentido.
- **Fase 2 — Extração piloto:** selecionar **até 1 arquivo de autoria**, preferencialmente isolado do combate crítico, que tenha fronteira clara (UI vs. lógica de domínio). Preservar import/export e ordem de inicialização. Se não houver corte natural, não dividir. Só ampliar para `BATCH_SIZE=3` após passar pela primeira regressão.
- **Fase 3 — Regressão:** rodar, no ambiente com dependências instaladas, `npm test`, `npm run check`, `npm run check:reuse`, `npm run test:browser` e testes focalizados do módulo. Validar campanha Phaser em Chromium/móvel real, carregamento, batalha, AUTO, HUD, itens, captura, evolução, saves e regressões de VFX. `npm run test:campaign` quando as condições de navegador/fixture estiverem reunidas.
- **Fase 4 — Revisão/merge:** comparar diff contra `main` atualizado, verificar conflitos e controles de CI; merge e Pages somente após checks concluídos. Registrar resultado real, URLs de CI e SHA publicado; nunca afirmar publicação apenas por criar PR.

### Limites e riscos

- **Teto de linhas é heurística**, não métrica de qualidade de gameplay. Um módulo Phaser coeso com 500 linhas pode ser preferível a 3 módulos artificialmente acoplados.
- **Risco de regressão alto** se mover efeitos, temporização, estado de batalha, storage ou módulos carregados globalmente sem testes específicos.
- **Custo em tempo/tokens:** primeiro auditar; não executar os três prompts em sequência cega sobre toda a base. Priorização continua sendo correção funcional da campanha e seus testes naturais.
- **Licença:** o toolkit é MIT, mas qualquer cópia substancial de seus arquivos deve preservar o aviso de copyright/licença. Este catálogo usa apenas descrições e links; não importa o código upstream.
- **Segurança:** prompts externos devem ser revisados antes de executar comandos ou baixar dependências; não fornecer segredos.

## Outros projetos

- **WildVox** (automação de vídeos): bom candidato para ESLint em JavaScript/TypeScript de autoria, qualidade de jobs e isolamento de módulos; medir lint e testes antes de aplicar.
- **NEXUS Score** (dados esportivos): útil para separar cálculo, adaptação de fontes e UI, preservando precisão de odds, lógica de EV+ e rastreabilidade dos sinais. Não modificar cálculos, credenciais nem automações sem testes.
- **Pokémon Torre 1/2:** usar em arquivos de código próprios; nunca impor lint/refatoração automática em sprites, pacotes de terceiros ou elementos licenciados.

## Critério de sucesso

Este item do Arsenal é **pesquisa com plano de adoção**, e não implementação. Adoção no projeto só estará concluída quando houver PR separado, linter e regras verificadas, baseline de avisos, testes executados com resultado rastreável e, se aplicável, merge e deploy comprovados.
