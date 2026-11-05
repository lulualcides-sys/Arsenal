# Colibri — inferência de IA local com streaming de modelos MoE

**Catalogado em:** 05/11/2026  
**Projeto original:** https://github.com/JustVugg/colibri  
**Site:** https://justvugg.github.io/colibri/  
**Licença do motor:** Apache 2.0 (modelos/pesos externos podem ter licenças diferentes)  
**Status no Arsenal:** referência técnica documentada; **não instalado, executado ou integrado** nos demais projetos.

## O que é

O **Colibri** é um motor de inferência local escrito principalmente em C. Permite executar modelos de linguagem (e alguns outros modelos suportados) diretamente no computador, com CPU e GPU opcional. Para arquiteturas **Mixture of Experts (MoE)**, o motor mantém componentes recorrentes na RAM e lê do SSD/NVMe os especialistas necessários a cada etapa. Não precisa carregar todos os pesos na memória simultaneamente.

O método reduz exigências de RAM/VRAM, **não elimina a necessidade de armazenamento nem a latência de leitura do disco**. Não confundir os parâmetros ativos/por token com a RAM total exigida, nem inferir que modelos de centenas de bilhões de parâmetros operarão em velocidade interativa em notebooks.

## Fatos verificados na documentação oficial (consulta de 05/11/2026)

| Modelo/exemplo | Download aproximado | RAM indicada pelo projeto | Desempenho documentado |
| --- | ---: | --- | --- |
| Qwen3-Coder-30B-A3B | 19 GB | 8 GB mínimo / 18 GB recomendado | 5,1 tokens/s com cache de 32 especialistas por camada; 8,5–9,6 tokens/s com especialistas na RAM (máquina de referência A, CPU) |
| Qwen3.6-35B-A3B | 23 GB | 10 GB mínimo / 20 GB recomendado | 6 tokens/s em CPU no equipamento A; 9,9 com GPU integrada; 30 com CUDA no equipamento C |
| GLM-5.2 (744B) | 429 GB | 16 GB mínimo / 24 GB recomendado | **0,05–0,1 token/s** com cache frio em notebook de 25 GB; resultado superior depende de hardware muito mais potente |

**Atenção:** números reportados pelos autores para configurações específicas; não são benchmarks executados por nós. A recomendação do Colibri depende da CPU, da RAM, do disco e da GPU reais. Modelos, números e disponibilidade podem mudar.

## Recursos úteis

- `coli chat`: conversação via terminal;
- `coli serve`: servidor local com endpoints compatíveis com OpenAI (`/v1/chat/completions`) e Anthropic (`/v1/messages`); compatibilidade e *tool calling* dependem do motor/modelo;
- `coli web` / `coli ui`: interface local;
- `coli plan` e `coli doctor`: planejamento de memória e checagem de instalação;
- `coli import`: importar arquivos GGUF suportados;
- opção de CPU, CUDA ou Vulkan conforme plataforma/hardware.

**Offline** refere-se à execução após baixar motor e pesos; a instalação inicial precisa de conexão. **Custo zero de tokens externos** só vale se realmente não utilizar serviços pagos; eletricidade, SSD, tempo e manutenção não são gratuitos.

## Valor para nosso ecossistema

1. **Pokémon Torre 2 — médio, experimental:** assistente de programação local para revisão de código, resumo de logs, sugestões de testes e documentação. Não substitui GitHub, Playwright, avaliação visual ou testes reais do Phaser; não modifica o jogo automaticamente.
2. **WildVox — médio, experimental:** rascunho local de roteiros, classificação e revisão textual. O Colibri **não gera nem publica vídeos por si só**. Comparar qualidade/latência/custo com o fluxo já existente antes de integrar.
3. **NEXUS/ATLAS — baixo como motor de trade; médio como ferramenta de apoio:** explicar indicadores, analisar logs e documentar backtests. Não produz vantagem estatística, lucro ou win rate comprovado.
4. **Central de Softwares — potencial futuro:** permitir IA privada em instalação local, mas avaliar hardware do cliente, licenças dos pesos e suporte técnico antes de prometer recurso comercial.

## Recomendação operacional

**Prioridade: P2 — guardar e testar apenas quando houver máquina com espaço/tempo disponível.** Para a RTX 2060 mencionada no acervo, **confirmar VRAM, RAM, CPU e tipo de SSD**; não pressupor que os benchmarks do autor se apliquem. Começar com **Qwen3-Coder-30B-A3B ou outro modelo pequeno que caiba**, e nunca baixar 429 GB para o GLM-5.2 antes de demonstrar ganho concreto.

Piloto proposto (não executado):
1. Diagnosticar hardware e espaço livre; registrar RAM e SSD/NVMe.
2. Usar instalador oficial; conferir conteúdo antes da execução e não expor endpoints na internet.
3. Medir tokens/s, latência total e qualidade em tarefas fixas: análise de log do Phaser, revisão de função JS e redação curta WildVox.
4. Comparar resultados com soluções atuais; só integrar se houver ganho mensurável em custo, privacidade ou disponibilidade.

### Instalação — referência oficial, não executada

Windows: repositório oficial → **Code → Download ZIP** → extrair → `START-HERE.bat`.

Linux/Ubuntu:
```bash
sudo apt install git python3 build-essential
git clone https://github.com/JustVugg/colibri.git
cd colibri
./start-here.sh
```

Documentação primária:
- https://github.com/JustVugg/colibri#readme
- https://github.com/JustVugg/colibri/blob/main/docs/quickstart.md
- https://github.com/JustVugg/colibri/blob/main/docs/AI_SETUP.md
- https://github.com/JustVugg/colibri/blob/main/LICENSE

**Registro de ações:** somente catalogação e avaliação no Arsenal. Sem download de modelos, sem instalação de executáveis, sem uso de credenciais, sem alterações nos repositórios operacionais.
