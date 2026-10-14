# OmniRoute — roteador/gateway de modelos de IA

**Adicionado em:** 14/10/2026  
**Fonte oficial:** https://github.com/diegosouzapw/OmniRoute  
**Site/documentação:** https://omniroute.online/  
**Licença declarada pelo upstream:** MIT; verificar LICENSE e licenças das dependências na versão selecionada.  
**Classe:** Dev/IA, infraestrutura de agentes e economia de APIs.  
**Estado no Arsenal:** **referência catalogada, não instalada, sem submódulo ou alteração nos serviços existentes**.

## O que faz
- Centraliza diferentes provedores/modelos de linguagem por uma API compatível com OpenAI.
- Rotas de fallback quando um provedor está indisponível, com limite de uso, ou sem cota.
- Combos e seleção de modelo por custo, latência e qualidade; análise de consumo e compressão de prompts (avaliar perda de contexto antes de ativar).
- Integração com clientes de programação e protocolos MCP/A2A, conforme documentação do upstream.
- Pode funcionar localmente ou em uma infraestrutura isolada; **não fornece créditos de API ilimitados**.

## Prioridades para nossos projetos
1. **NEXUS (web/original):** experimentar como gateway opcional para análises textuais de partidas, resumos, explicação de indicadores e agentes auxiliares. A coleta esportiva, o cálculo de EV+, os backtests e P/L real continuam nos módulos de dados; OmniRoute não entrega dados esportivos nem cria previsão confiável sozinho.
2. **WildVox:** escolher e alternar modelos para gerar/revisar roteiros em inglês e instruções de edição. Renderização de vídeos e publicação em redes sociais continuam em ferramentas próprias.
3. **Pokémon Torre:** ajudar o assistente de programação a escolher modelos para revisão de código/efeitos; **não é motor gráfico, não cria sprites animados e não modifica automaticamente os golpes**.

## Prova de conceito sugerida (isolada; NÃO executada)
- Validar licenças, Node.js suportado e versão estável fixada antes de executar.
- Instalação documentada pelo autor: `npm install -g omniroute` e depois `omniroute` (em máquina/contêiner isolado).
- Painel local: `http://localhost:20128`; API: `http://localhost:20128/v1`.
- Conectar **apenas** um provedor autorizado com credencial própria no painel; criar chave de endpoint separada.
- Fazer teste autenticado de `GET /v1/models`, um teste de geração, fallback com provedor indisponível, limite de gastos e latência.
- Adicionar chave de configuração opt-in ao cliente NEXUS/WildVox somente após testes; rollback deve preservar provedor atual.
- Em produção, fixar versão de imagem/pacote e restringir acesso ao painel/API. Nunca inserir credenciais no GitHub público.

## Critérios mínimos para integração
- Sem cobrança inesperada: políticas de gastos e rejeição de fallback cobrado.
- Logs redigidos sem dados pessoais, tokens ou estratégias privadas; autenticação e acesso à API validados.
- Sem alteração da lógica dos jogos, pipeline de publicação ou backtest; ativação por feature flag.
- Testar regressões e fallbacks. Modelos grátis são **dependentes de contas, elegibilidade, cotas e termos de cada provedor**.
- Para código/estratégias confidenciais, confirmar qual provedor processará cada requisição e suas regras de privacidade.

## Leituras
- [Repositório e README oficial](https://github.com/diegosouzapw/OmniRoute)
- [Referência de cotas gratuitas](https://github.com/diegosouzapw/OmniRoute/blob/main/docs/reference/FREE_TIERS.md) (se o caminho mudar, acessar por README)
- [Avisos de segurança do upstream](https://github.com/diegosouzapw/OmniRoute/blob/main/SECURITY.md)

**Decisão em 14/10/2026:** adicionar ao catálogo do Arsenal e priorizar uma prova de conceito sem expor projetos ativos. A integração real, instalação, chaves/API e benchmark ainda **não foram feitos**.
