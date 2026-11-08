# MiroFish — simulação multiagente para testar cenários

**Data de catalogação:** 08/11/2026  
**Status:** referência pesquisada e catalogada. **Não instalado, não executado, não integrado aos projetos.**

## Fonte oficial

- **Código-fonte:** https://github.com/666ghj/MiroFish
- **Site indicado pelo repositório:** https://mirofish.ai/
- **Demonstração oficial:** https://666ghj.github.io/mirofish-demo/
- **Licença:** GNU AGPL-3.0 (atenção às obrigações se houver modificações oferecidas por rede).
- **Motor de simulação utilizado:** OASIS — https://github.com/camel-ai/oasis

Evitar confundir o projeto oficial com sites de terceiros que oferecem serviços com o mesmo nome. A origem canônica é o repositório `666ghj/MiroFish`.

## O que faz

MiroFish recebe documentos ou informações iniciais sobre uma situação, constrói relações e memória em grafo, gera personas/agentes de IA, simula interações entre eles, elabora um relatório e permite investigar os resultados.

Fluxo declarado pela origem: **grafo e memória → configuração de agentes → simulação de interações → relatório → exploração interativa**.

**Limite importante:** a saída representa um cenário sintético condicionado às premissas, e não uma previsão validada de comportamento real. Não fornece, por si só, acurácia, causalidade ou confiança estatística comprovadas.

## Aplicações possíveis nos projetos

| Projeto | Uso possível | Prioridade / cuidado |
| --- | --- | --- |
| **Central de Softwares / produtos vendáveis** | Simular objeções, adoção e reações a uma proposta comercial antes de entrevistar usuários reais. | **Piloto prioritário**; validar com pessoas e métricas reais. |
| **WildVox** | Explorar hipóteses de reação do público a formatos narrativos, temas e campanhas. | **Piloto secundário**; não substituir analytics do TikTok nem testes A/B reais. |
| **Realizações Imóveis** | Testar cenários de comunicação e dúvidas frequentes a partir de dados públicos/anônimos. | Evitar dados identificáveis de leads, clientes e contratos. |
| **NEXUS Score / ATLAS** | Explorar cenários qualitativos de reação a notícias ou narrativas de mercado. | **Não usar** resultado como sinal de entrada, projeção de preços, backtest ou prova de rentabilidade. |
| **Pokémon Torre 2** | Eventual laboratório externo para testar hipóteses narrativas envolvendo NPCs. | **Baixa prioridade**; não serve para criar VFX pixel art, sprites ou substituir a IA de batalha. |

## Requisitos e custo

Segundo o README oficial (consultado em 08/11/2026):

- Node.js 18+, Python 3.11–3.12 e `uv`; também há caminho via Docker.
- Variáveis de ambiente para API de modelo de linguagem (`LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`) e memória em grafo Zep Cloud (`ZEP_API_KEY`).
- Passos documentados: `cp .env.example .env`, configurar credenciais, `npm run setup:all` e `npm run dev`; alternativa `docker compose up -d`.
- **Código aberto não significa operação gratuita:** chamadas ao LLM podem ser caras, e Zep tem limites/cotas. A documentação recomenda começar com menos de 40 rodadas por causa do consumo.
- Não instalar automaticamente nem adicionar credenciais a repositórios públicos.

## Plano econômico de avaliação (não executado)

1. Escolher **uma hipótese de produto** e um conjunto de dados públicos, sem informação pessoal.
2. Definir antes da execução a pergunta, premissas, número limitado de agentes/rodadas e **teto de custo**.
3. Rodar um cenário pequeno, registrando consumo, tempo, resultado e variabilidade entre execuções.
4. Comparar conclusões com entrevistas, métricas e testes reais; rejeitar generalizações não comprovadas.
5. Só considerar integração depois de medir benefício adicional frente a uma análise convencional com LLM.

## Registro e limites da inclusão

A inclusão no Arsenal significa **documentação e link para a fonte original**, não cópia ou instalação do código, criação de submódulo Git, concessão de acesso às APIs, configuração de credenciais nem publicação em qualquer projeto. Nenhum teste de desempenho ou acurácia foi realizado.

**Referências:** README e licença do repositório oficial https://github.com/666ghj/MiroFish; FAQ mantida no projeto https://github.com/666ghj/MiroFish/issues/726.
