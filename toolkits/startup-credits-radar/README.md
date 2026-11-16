# Radar de créditos gratuitos para startups
Sistema experimental de **leitura de páginas oficiais e detecção de mudanças**, com GitHub Actions (sem chaves de terceiros).

## Execução
- GitHub → Actions → **Radar de Créditos de Startup** → Run workflow.
- Agenda proposta: diariamente por volta das 08:17 BRT (cron UTC); GitHub pode atrasar execuções agendadas.
- Relatório: [latest-report.md](latest-report.md); histórico: [state.json](state.json).
- Se houver mudança de texto, abre um *issue* para revisão. Texto alterado não implica mudança real em elegibilidade ou créditos.
- Não há integração automática de Gmail ou candidatura. Não registra saldos recebidos sem prova.
- Atenção: arquivos de histórico e issues são **públicos** neste repositório. Não adicionar CNPJ, e-mails, chaves, dados privados ou informações comerciais não públicas.

## Candidaturas
A verificação de elegibilidade exige confirmação de CNPJ/empresa (quando aplicável), idade da empresa, produto, domínio, investimento, contas anteriores, região e termos de cada programa. Qualquer inscrição deve ser revisada e aprovada individualmente pelo titular.

## Limitações
Algumas páginas bloqueiam scraping; HTTP error não implica encerramento do programa. Diferenças de HTML podem provocar falsos positivos. O monitor não pesquisa novos programas automaticamente nem interpreta valores com IA; sua função é vigiar uma lista inicial de fontes oficiais. GitHub Actions depende das permissões do repositório e pode não executar agendamentos em repositórios inativos.
