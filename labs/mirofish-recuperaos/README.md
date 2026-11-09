# Laboratório isolado — MiroFish / RecuperaOS — 09/11/2026

**Estado:** material do cenário e teste de pré-requisitos preparado; NÃO é uma simulação MiroFish executada nem validação de clientes. Este laboratório não altera sistemas em produção.

Fonte canônica: https://github.com/666ghj/MiroFish (AGPL-3.0).
Código do upstream **não** é copiado aqui. O workflow de CI obtém uma revisão fixada e instala dependências em runner temporário, sem credenciais e sem deployment.

## Testes
- Execute `python3 labs/mirofish-recuperaos/verify_experiment.py`: verifica a consistência do cenário sem chaves.
- Workflow `mirofish-recuperaos-lab.yml`: instala Python 3.12, Node 22, `uv` e dependências do upstream com isolamento, compila o frontend e verifica sintaxe Python.
- Nenhuma chamada LLM, Zep ou simulação acontece no workflow. Não há `secrets.*` e permissões são somente `contents: read`.

## Para uma execução REAL, de forma supervisionada e separada
É necessário ambiente com acesso à internet e credenciais válidas: `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL_NAME`, `ZEP_API_KEY`. O MiroFish oficial depende de Zep Cloud. Confirme custos e cotas dos dois fornecedores antes da execução. A presença de chave não significa autorização para custos ilimitados. Usar limites de gastos no provedor, poucas rodadas, nenhum dado pessoal real e revisar termos e licença.

Com credenciais configuradas **fora do GitHub** e limite de gastos definido, executar na cópia oficial: `npm run dev`, abrir `http://localhost:3000`, carregar `seed.md` e descrever o experimento conforme `experiment.json` (o JSON é nosso contrato de teste, não configuração nativa aceita pelo MiroFish). O resultado é uma simulação sintética e não valida pagamento de clientes reais.

## Critérios de parada
Sem chaves, sem cotas, com falha de instalação ou sem limite de custo: **NÃO rodar** a simulação.
O RecuperaOS tem sobreposição com o PontoCego, ideia reservada; nenhuma das duas está autorizada para publicação.
