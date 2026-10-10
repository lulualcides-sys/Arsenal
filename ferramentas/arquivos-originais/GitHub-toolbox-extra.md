# GitHub Toolbox — Extras

Seleção complementar de projetos úteis para manter como referência. A ideia é não instalar tudo: guardar o arsenal e usar somente quando surgir necessidade.

## Linha de comando e desenvolvimento

- **astral-sh/ruff** — linter/formatter Python extremamente rápido; ajuda a manter código limpo.
- **jdx/mise** — gerencia versões de linguagens e ferramentas em um único lugar.
- **starship/starship** — prompt de terminal moderno e informativo.
- **sharkdp/bat** — alternativa melhor ao `cat`, com syntax highlight e recursos extras.
- **BurntSushi/ripgrep** — busca texto em arquivos/código com alta velocidade.
- **junegunn/fzf** — busca interativa/fuzzy no terminal.
- **eza-community/eza** — alternativa moderna ao comando `ls`.
- **casey/just** — cria atalhos/comandos de automação para projetos.
- **go-task/task** — task runner para padronizar rotinas de build, teste e deploy.

## Backup, servidores e infraestrutura

- **restic/restic** — backup rápido, criptografado e incremental.
- **borgbackup/borg** — backup deduplicado e eficiente.
- **caddyserver/caddy** — servidor web/reverse proxy simples com HTTPS automático.
- **traefik/traefik** — roteamento/reverse proxy muito usado em Docker e microsserviços.
- **louislam/uptime-kuma** — monitora se sites, APIs e bots estão online.
- **healthchecks/healthchecks** — monitora tarefas agendadas/cron e avisa quando param de rodar.
- **openbao/openbao** — cofre para senhas, tokens, chaves e outros segredos de sistemas.
- **keycloak/keycloak** — autenticação, login, usuários e permissões para aplicações.
- **authelia/authelia** — autenticação e 2FA para serviços self-hosted.

## Segurança defensiva e qualidade

- **aquasecurity/trivy** — escaneia containers, dependências, sistemas e IaC por vulnerabilidades.
- **semgrep/semgrep** — análise estática de código para bugs e problemas de segurança.
- **gitleaks/gitleaks** — detecta senhas, tokens e segredos vazados em repositórios Git.
- **renovatebot/renovate** — atualiza dependências automaticamente via PRs.

## Automação e orquestração

- **dagster-io/dagster** — orquestra pipelines de dados e automações complexas.
- **apache/airflow** — agenda e coordena workflows/pipelines.
- **temporalio/temporal** — executa workflows confiáveis que sobrevivem a falhas e reinícios.
- **kestra-io/kestra** — automação/orquestração de workflows com interface e YAML.
- **windmill-labs/windmill** — transforma scripts em workflows, APIs e interfaces internas.
- **activepieces/activepieces** — automação visual no estilo Zapier/n8n, self-hosted.
- **node-red/node-red** — cria fluxos de automação visual conectando APIs, dispositivos e serviços.

## IA, agentes e modelos locais

- **mlflow/mlflow** — acompanha experimentos, modelos e versões de projetos de ML/IA.
- **jupyterlab/jupyterlab** — ambiente interativo para Python, dados, experimentos e notebooks.
- **BerriAI/litellm** — padroniza acesso a vários provedores/modelos de IA por uma única API.
- **ggml-org/llama.cpp** — executa modelos LLM localmente com ótima eficiência.
- **run-llama/llama_index** — conecta LLMs a arquivos, dados, bancos e fontes externas.
- **deepset-ai/haystack** — framework para RAG, busca e agentes de IA.
- **crewAIInc/crewAI** — cria equipes de agentes de IA com papéis diferentes.
- **pydantic/pydantic-ai** — framework Python para agentes de IA com tipagem/validação forte.
- **huggingface/smolagents** — framework leve da Hugging Face para agentes de IA.
- **OpenHands/OpenHands** — agente de desenvolvimento capaz de trabalhar em código e tarefas de software.
- **Aider-AI/aider** — assistente de programação via terminal integrado ao Git.
- **continuedev/continue** — assistente de IA para desenvolvimento integrado ao editor.
- **modelcontextprotocol/inspector** — inspeciona e testa servidores/ferramentas MCP.

## Bancos, busca e dados

- **ClickHouse/ClickHouse** — banco analítico muito rápido para grandes volumes de eventos/dados.
- **meilisearch/meilisearch** — mecanismo de busca rápido para sites e sistemas.
- **typesense/typesense** — busca instantânea/fuzzy para aplicações.
- **nocodb/nocodb** — transforma banco de dados em interface parecida com planilha/Airtable.
- **directus/directus** — camada de API e painel administrativo sobre bancos SQL.
- **metabase/metabase** — dashboards e análise de dados sem precisar programar tudo.
- **pocketbase/pocketbase** — backend leve com banco, autenticação, arquivos e API em um único binário.
- **appwrite/appwrite** — backend completo com autenticação, banco, storage e funções.

## Web, scraping e documentos

- **firecrawl/firecrawl** — coleta páginas/sites e transforma conteúdo em dados úteis para IA.
- **unclecode/crawl4ai** — crawler/scraper voltado para LLMs e automação com IA.
- **docling-project/docling** — extrai e estrutura conteúdo de PDF e outros documentos para uso por IA.
- **paperless-ngx/paperless-ngx** — organiza e pesquisa documentos digitalizados.
- **Stirling-Tools/Stirling-PDF** — caixa de ferramentas self-hosted para manipular PDFs.

## Catálogos que ajudam a descobrir novas ferramentas

- **awesome-selfhosted/awesome-selfhosted** — catálogo enorme de softwares open source que podem ser hospedados por conta própria.
- **public-apis/public-apis** — lista de APIs públicas organizadas por categoria.
- **ripienaar/free-for-dev** — catálogo de serviços e ferramentas com planos gratuitos úteis para desenvolvimento.

## Regra da biblioteca

Guardar não significa instalar. Antes de usar qualquer projeto, conferir manutenção atual, licença, segurança, requisitos e se ainda é a melhor opção para o caso concreto.
