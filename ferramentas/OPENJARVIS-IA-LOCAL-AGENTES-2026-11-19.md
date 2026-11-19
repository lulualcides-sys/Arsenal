# OpenJarvis — framework de agentes de IA pessoais locais

**Adicionado em:** 19/11/2026
**Projeto original:** https://github.com/open-jarvis/OpenJarvis (Stanford — Hazy Research / Scaling Intelligence Lab)
**Documentação:** https://open-jarvis.github.io/OpenJarvis/ · **Artigo:** https://arxiv.org/abs/2605.17172
**Licença:** Apache-2.0 (confirmada no `LICENSE` e no `pyproject.toml`); modelos/pesos baixados têm licenças próprias.
**Status no Arsenal:** código vinculado como **submódulo Git** em [`fontes/ferramentas/openjarvis`](../fontes/ferramentas/openjarvis), commit `c3ed63f1d2a2c0c1f7dabbc69050e1968a11dc10` (18/11/2026). **Não instalado no PC nem integrado ao Pokémon Torre 2, WildVox ou NEXUS.**

## O que é

Framework Python (3.11–3.13) para agentes de IA que rodam **localmente por padrão** e só chamam a nuvem quando configurado. Usa um motor de inferência local (Ollama, vLLM, SGLang, llama.cpp, LM Studio, MLX etc.) e oferece:

- CLI `jarvis` (chat, `ask`, `doctor`, `init --preset`, `gui`, `serve`, `bench`, `eval`);
- 8 agentes nativos: `simple`, `orchestrator`, `native_react`, `native_openhands` (gera e **executa** código Python), `deep_research`, `morning_digest`, `operative`, `monitor_operative`;
- presets: `chat-simple`, `code-assistant`, `deep-research`, `scheduled-monitor`, `morning-digest-*`;
- skills no padrão agentskills.io (importa Hermes Agent / OpenClaw), memória, servidores MCP e avaliação de custo/energia/latência.

## Verificação feita (19/11/2026, ambiente Linux isolado na nuvem — não é o seu PC)

| Verificação | Resultado |
|---|---|
| `uv pip install OpenJarvis` (Python 3.13, venv descartável) | ✅ instalou versão **1.0.4** |
| `jarvis --help` | ✅ CLI carrega, comandos listados |
| `jarvis doctor` | ⚠️ Python OK; **sem config e nenhum motor de inferência acessível** (sem Ollama/modelo) — esperado |
| Conversa real com modelo | ❌ **não testada** (sem modelo local nesse ambiente) |

Ou seja: instalação do pacote comprovada; **funcionamento como assistente não comprovado** até rodar com Ollama + modelo no seu hardware.

## Cautelas importantes

1. **Mineração de cripto embutida:** a CLI possui `jarvis mine` / `jarvis pearl` (“Pearl mining”, carteira, RPC, uso de GPU). **Não executar.** Gasta GPU/energia e mexe com carteira; fora do escopo de qualquer projeto nosso.
2. **Execução de código e shell:** `code-assistant` e `native_openhands` executam comandos/código. Usar só em pasta de teste, nunca no repositório do jogo ou com credenciais do NEXUS/Bolsa de Aposta.
3. **Conectores pessoais:** `jarvis connect gdrive`/Gmail dão acesso a dados privados via OAuth. Não conectar contas reais no piloto.
4. **Instalador `curl … | bash`:** baixa uv, Ollama e um modelo inicial. Ler o script antes; prefira a instalação manual abaixo.
5. Projeto em estágio **Alpha** (classificador do `pyproject`), muito ativo — esperar mudanças incompatíveis. Fixar versão.
6. “Local” ≠ grátis: RAM/VRAM, disco dos modelos e energia contam. Qualidade de modelos pequenos é inferior a modelos de nuvem.

## Valor para os projetos (avaliação, não medido)

| Projeto | Uso possível | Prioridade |
|---|---|---|
| Pokémon Torre 2 | assistente local para revisar logs/testes e documentação, em branch isolada | P2 |
| WildVox | rascunho e revisão de roteiros sem custo de API | P2 |
| NEXUS | resumir logs e documentação. **Nunca** gerar odds, palpites ou sinais (regras do motor próprio) | P3 |
| Geral | `deep-research` sobre documentos locais com citações | P2 |

Sobreposição com o que já está no Arsenal: [Colibri](COLIBRI-IA-LOCAL-2026-11-05.md) (motor de inferência) e [OpenCode](../fontes/ferramentas/opencode) (agente de código). O OpenJarvis é a camada de **agentes** sobre um motor; pode usar Ollama ou um servidor compatível com OpenAI. Antes de adotar, comparar com o fluxo atual.

## Instalação manual no PC (referência; não executada no seu PC)

```bash
# 1) motor local (https://ollama.com) e um modelo pequeno
ollama pull qwen3:8b
# 2) OpenJarvis em ambiente isolado, versão fixada
uv venv -p 3.13 .venv-jarvis
uv pip install -p .venv-jarvis "OpenJarvis==1.0.4"
# 3) diagnóstico e chat simples, sem ferramentas
.venv-jarvis/bin/jarvis doctor
.venv-jarvis/bin/jarvis init --preset chat-simple --force
.venv-jarvis/bin/jarvis
```

Windows: mesmos passos no PowerShell trocando `.venv-jarvis/bin/` por `.venv-jarvis\Scripts\`, ou o instalador desktop da [página de releases](https://github.com/open-jarvis/OpenJarvis/releases/latest).

Para obter o código no clone do Arsenal:

```bash
git submodule update --init fontes/ferramentas/openjarvis
```

## Piloto proposto

1. `jarvis doctor` + registrar CPU, RAM, VRAM e espaço livre.
2. Preset `chat-simple` com modelo de 7–8B; medir tokens/s e qualidade em 3 tarefas fixas (log do Phaser, revisão de função JS, roteiro curto WildVox).
3. Só depois testar `code-assistant` em uma pasta descartável.
4. Integrar somente se houver ganho medido em custo, privacidade ou disponibilidade.
