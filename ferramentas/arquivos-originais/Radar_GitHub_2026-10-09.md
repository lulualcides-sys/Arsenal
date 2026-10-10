# Radar GitHub — 09/10/2026

Objetivo: encontrar ferramentas gratuitas/open-source que melhorem NEXUS SCORE, WildVox e desenvolvimento de projetos próprios. Não é uma lista de instalações autorizadas ou garantias de produção. Prioridade: valor técnico, custo real, maturidade, reuso e segurança.

## Prioridade 1 — testar no projeto

### SoccerData — https://github.com/probberechts/soccerdata
- **Projeto:** NEXUS SCORE. **O que faz:** padroniza consultas a Club Elo, ESPN, FBref, Football-Data, Sofascore, Understat e outras bases usando DataFrames com esquemas similares.
- **Benefício concreto:** reduzir o número de conectores ad hoc e testar histórico em diferentes fontes. Fontes podem falhar ou bloquear scraping; respeitar termos e limites. Não fornece odds live garantidas, minuto a minuto universal nem lucro comprovado.
- **Próximo teste:** comparar 10 partidas aleatórias (IDs, liga, horários, estatísticas e completude) com `multi_source.py`; registrar erro HTTP e cobertura. Teste em branch isolada, sem substituir coletor atual.
- **Custo:** código open source; aquisição de dados externos pode ter barreiras/custos.

### SoccerAction — https://github.com/ML-KULeuven/socceraction
- **Projeto:** NEXUS SCORE. **O que faz:** normaliza eventos de futebol em SPADL e calcula métricas de valor de ações como VAEP e xT. **Licença:** MIT (GitHub oficial).
- **Benefício concreto:** enriquecer modelos de perigo com sequências reais de ações, quando houver dados licenciados compatíveis.
- **Próximo teste:** dados gratuitos de exemplo/autorizados; estudar predição temporal e validação fora da amostra. **Não** é por si só EV+ ou recomendação de apostas; necessita odds e avaliação rigorosa.

### Postiz — https://github.com/gitroomhq/postiz-app
- **Projeto:** WildVox. **O que faz:** agendamento e distribuição social com opção self-host e integração de canais.
- **Benefício concreto:** alternativa a ferramentas de limites por plano; gerir calendário de publicações.
- **Atenção:** o README informa que, no self-host, é necessário criar apps de desenvolvedor e passar pelos processos de aprovação de Meta/YouTube/TikTok; isso pode levar semanas. **Não contorna aprovação da API do TikTok** nem garante postagem automática gratuita no serviço.
- **Próximo teste:** verificar suporte real à publicação de TikTok com credenciais autorizadas e termos da plataforma, sem usar contas de terceiros para contornar limitações.

## Prioridade 2 — produtividade e construção de software

### Superpowers — https://github.com/obra/superpowers
- **Projeto:** programação de NEXUS e WildVox. **O que faz:** processo de especificação, tarefas, TDD, revisão de código e depuração para agentes de código. **Licença:** MIT.
- **Benefício concreto:** reduzir regressões e entregas parcialmente testadas; útil como referência de metodologia mesmo sem instalar.
- **Cuidado:** framework de execução; não substitui verificação técnica ou testes na nuvem.

### OpenCode — https://github.com/anomalyco/opencode
- **Projeto:** desenvolvimento de apps. **O que faz:** agente de programação open source com suporte a diferentes provedores/modelos. **Licença:** MIT.
- **Benefício concreto:** opção para trabalhar com código em terminal e diferentes modelos, conforme orçamento.
- **Custo real:** software gratuito não significa IA hospedada ilimitada. Modelos/API e recursos computacionais podem custar.

### Hindsight — https://github.com/vectorize-io/hindsight
- **Projeto:** agentes NEXUS/WildVox. **O que faz:** memória de longo prazo para agentes com retain/recall/reflect, útil para histórico de bugs, decisões e rotinas. **Licença:** MIT.
- **Benefício concreto:** conhecimento persistente e consultas de decisões anteriores para agentes que você opera.
- **Custo real:** pode exigir execução de modelo, banco/servidor e recursos; uso cloud gerenciado é diferente de self-host gratuito. Preservar privacidade e segredos.

## Prioridade 3 — futuro / infraestrutura

### Sim — https://github.com/simstudioai/sim
- **Projeto:** automação de IA. **O que faz:** interface visual de fluxos/agentes, integrações e execução monitorada; código Apache-2.0.
- **Benefício concreto:** coordenar etapas de render e QA do WildVox, futuramente.
- **Custo real:** self-host exige Node + Docker, infraestrutura ativa e normalmente chave de modelo.

### Coolify — https://github.com/coollabsio/coolify
- **Projeto:** infraestrutura NEXUS e apps. **O que faz:** deploy de serviços/bancos no servidor próprio. **Licença:** Apache-2.0.
- **Custo real:** software é gratuito; servidor de nuvem 24/7 **não** é automaticamente gratuito. Não resolve sozinho o requisito de 0 cartão/0 mensalidade.

## Nosso protocolo de curadoria

1. Evitar duplicar ferramentas já catalogadas em `/Ferramentas/GitHub-toolbox*.md` e `/Ferramentas/ArtCraft-Storytold-reference.md`.
2. Conferir repositório oficial, licenças e manutenção. Reputação, estrelas e hype não substituem auditoria de segurança.
3. Dividir **código livre**, **grátis para uso local**, **serviço com limites**, **dependente de API paga**.
4. Para cada ferramenta, escrever um caso real, custo, risco, plano de teste e possibilidade de substituição.
5. Instalar novas dependências/serviços apenas após testar de forma isolada, sem quebrar o NEXUS ou o WildVox em produção.
6. Só considerar EV+ comprovado com probabilidades calibradas, odds verificadas antes da entrada e backtest sem viés temporal.

Verificado a partir dos repositórios oficiais em 09/10/2026. Não afirma que cada ferramenta foi instalada, testada ou conectada; apenas foi catalogada para experimentos específicos.
