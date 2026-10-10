# Biblioteca GitHub — Ferramentas Gerais

Curadoria de projetos úteis para bots, automação, IA, APIs, banco de dados, scraping, monitoramento e desenvolvimento. A ideia é manter como referência; instalar somente quando houver necessidade real.

## Bots e automação

- **python-telegram-bot/python-telegram-bot** — cria bots para Telegram em Python.
- **Rapptz/discord.py** — cria bots e integrações para Discord em Python.
- **n8n-io/n8n** — automação visual de fluxos entre APIs, bancos, mensagens e serviços.
- **celery/celery** — executa tarefas em segundo plano e filas de processamento.
- **PrefectHQ/prefect** — organiza, agenda e monitora pipelines e automações.
- **agronholm/apscheduler** — agenda tarefas dentro de aplicações Python.
- **caronc/apprise** — envia notificações para dezenas de serviços a partir de uma interface única.
- **browser-use/browser-use** — agentes de IA capazes de operar navegadores.
- **SeleniumHQ/selenium** — automação clássica de navegador.
- **microsoft/playwright** — automação moderna de navegador e testes web.

## APIs e backend

- **fastapi/fastapi** — cria APIs rápidas em Python; excelente para bots e serviços próprios.
- **Kludex/uvicorn** — servidor leve para aplicações FastAPI/ASGI.
- **encode/httpx** — cliente HTTP moderno para conversar com APIs.
- **pydantic/pydantic** — valida dados, configurações e respostas de APIs.
- **fastapi/sqlmodel** — integra modelos Python com bancos SQL de forma simples.
- **psf/requests** — biblioteca HTTP simples e extremamente popular em Python.

## Banco de dados e dados

- **postgres/postgres** — banco relacional robusto para aplicações e bots.
- **redis/redis** — cache, filas, sessões e armazenamento extremamente rápido.
- **supabase/supabase** — backend pronto com banco PostgreSQL, autenticação, storage e APIs.
- **qdrant/qdrant** — banco vetorial para busca semântica e memória de IA.
- **duckdb/duckdb** — banco analítico embutido, ótimo para analisar arquivos e grandes tabelas localmente.
- **pola-rs/polars** — processamento de dados muito rápido, alternativa moderna ao pandas.

## Scraping e coleta

- **scrapy/scrapy** — framework profissional para crawlers e coleta estruturada de sites.
- **microsoft/playwright** — também útil para coletar páginas que dependem de JavaScript.
- **browser-use/browser-use** — útil quando a navegação precisa de raciocínio de agente, não só regras fixas.

## IA e agentes

- **langchain-ai/langgraph** — cria agentes de IA com fluxos, memória, estados e decisões.
- **microsoft/autogen** — framework para sistemas com múltiplos agentes colaborando.
- **ollama/ollama** — roda modelos de IA localmente de forma simples.
- **vllm-project/vllm** — servidor de alto desempenho para modelos de linguagem.
- **open-webui/open-webui** — interface web completa para conversar com modelos locais e APIs.
- **mem0ai/mem0** — camada de memória para agentes e assistentes.
- **langfuse/langfuse** — monitora prompts, custos, respostas e desempenho de aplicações com IA.
- **modelcontextprotocol/python-sdk** — SDK oficial Python para criar servidores e clientes MCP.

## Interfaces rápidas

- **gradio-app/gradio** — cria interfaces web rápidas para modelos, bots e ferramentas Python.
- **streamlit/streamlit** — cria dashboards e aplicativos de dados com pouco código.
- **Textualize/rich** — melhora interfaces de terminal com tabelas, cores, barras e logs legíveis.

## Infraestrutura e implantação

- **docker/compose** — sobe vários serviços juntos em containers.
- **ansible/ansible** — automatiza configuração de servidores e máquinas.
- **rclone/rclone** — sincroniza e faz backup entre armazenamento local e nuvem.

## Monitoramento e confiabilidade

- **getsentry/sentry** — captura erros e falhas de aplicações em produção.
- **prometheus/prometheus** — coleta métricas de sistemas e serviços.
- **grafana/grafana** — cria dashboards para métricas e monitoramento.
- **pytest-dev/pytest** — testes automatizados para evitar quebrar sistemas ao fazer mudanças.

## Desenvolvimento e produtividade

- **astral-sh/uv** — instala dependências e ambientes Python com muita velocidade.
- **microsoft/markitdown** — converte documentos e arquivos para Markdown, útil para IA e processamento de conteúdo.

## Projetos já guardados na biblioteca anterior

- **FFmpeg/FFmpeg** — edição e processamento de vídeo/áudio.
- **remotion-dev/remotion** — criação programática de vídeos.
- **yt-dlp/yt-dlp** — download de mídia de fontes compatíveis, quando houver direito de uso.
- **ImageMagick/ImageMagick** — processamento automático de imagens.
- **opencv/opencv** — visão computacional.
- **SYSTRAN/faster-whisper** — transcrição rápida.
- **Breakthrough/PySceneDetect** — detecção automática de cenas.
- **m-bain/whisperX** — alinhamento preciso de fala e palavras.
- **thewh1teagle/kokoro-onnx** — TTS Kokoro leve/local.
- **Comfy-Org/ComfyUI** — workflows de geração de imagem/IA.
- **mifi/lossless-cut** — cortes rápidos sem recompressão.
- **WyattBlue/auto-editor** — edição automática orientada por áudio/movimento.
- **morluto/rea** — engenharia reversa e análise de aplicações/binários.

## Os mais valiosos para futuros projetos

Se a ideia for criar bots e sistemas próprios, os primeiros que vale lembrar são:

1. **FastAPI** — API própria.
2. **PostgreSQL + Redis** — banco + cache/filas.
3. **Docker Compose** — empacotar tudo.
4. **n8n** — conectar serviços rapidamente.
5. **Celery / Prefect** — tarefas automáticas e pipelines.
6. **Playwright / Scrapy** — navegador e coleta de dados.
7. **LangGraph / AutoGen** — agentes de IA.
8. **Ollama** — IA local.
9. **Qdrant** — memória/busca semântica.
10. **Sentry + Prometheus + Grafana** — descobrir erros e acompanhar saúde do sistema.
