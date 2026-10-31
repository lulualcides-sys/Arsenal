# Buscando 1 Milhão — avaliação para vendas, leads e nossos projetos
Data da análise: 31/10/2026

**Origem:** https://github.com/soumatheusgomes/buscandomilhao  
**Prompt de referência:** https://github.com/soumatheusgomes/buscandomilhao/blob/main/PROMPT.md  
**Autor:** Matheus Gomes (soumatheusgomes).  
**Status verificado:** repositório público que se declara *em construção*; o README informa expressamente que não há software pronto, apenas um prompt para gerar um projeto personalizado. A meta de R$ 1 milhão **não é faturamento comprovado**.  
**Licenciamento:** arquivo LICENSE não encontrado na raiz em 31/10/2026; não presumir licença aberta para copiar o prompt ou código substancial. Esta análise é própria, com links para a fonte.  
**Status de integração:** **CATALOGADO NO ARSENAL**. Não foi instalado, executado, vinculado a contas nem implantado em qualquer produto.

## 1. O que o prompt realmente especifica

Um agente de programação é instruído a **construir** (não fornecer pronto) um sistema de prospecção e CRM local:
- Descoberta e qualificação de potenciais clientes por **ICP (perfil de cliente ideal)** e sinais públicos; classificação, priorização e prevenção de duplicados.
- Funil de vendas e funil separado para afiliados/parceiros.
- Histórico de interação, classificação de respostas, encaminhamento ao WhatsApp e acompanhamento com cronograma.
- Experimentos A/B, aprendizagem baseada em conversão **verificável** e priorização de clientes ativos em vez de métricas de vaidade.
- Painel com Kanban, etapas, próximas tarefas, taxa de conversão, alertas, custos por lead e por cliente, fila de exceções e botão de pausa.
- Identificação de **afirmações comerciais verificadas** e bloqueio de alegações sem provas.
- Controles de custo de IA, do-not-contact, idempotência contra envios duplicados, auditoria, teste e recuperação após reinício.

**Stack sugerida, ainda não implementada no repositório de origem:** Next.js, React, TypeScript, Tailwind, SQLite, Drizzle ORM, Playwright/Chrome CDP, SDK OpenAI, webhook/API oficial da Meta e WhatsApp como encaminhamento. O código de produção deve ser desenvolvido, revisado e testado antes de qualquer uso real.

## 2. Classificação de oportunidades nos nossos projetos

| Destino | Potencial | Uso prioritário | Limite |
|---|---|---|---|
| **Central de softwares / SaaS** | **Muito alto** | CRM de prospects, demonstrações, trials, assinatura, recuperação de propostas, parceiros e afiliados, painel CAC/conversão/retensão | Isolar autenticação, cobrança e clientes; não prometer ganhos |
| **Realizações Imóveis** | **Muito alto** | Captura inbound de portais/site/WhatsApp, qualificação por cidade/bairro/valor, triagem de requisitos, visitas, propostas e follow-up consentido | Não abordar contatos indiscriminadamente; LGPD e atualização de disponibilidade |
| **NEXUS Score** | **Alto, só na camada comercial** | CRM de possíveis assinantes, onboarding, trials, dúvidas de planos, renovação e cancelamento | Não modificar odds, motor de previsão, probabilidades nem vender desempenho hipotético como comprovado |
| **WildVox** | **Médio** | Contato comercial com patrocinadores e parceiros, pipeline de campanhas, atribuição de conversões e análise de custo | Não interferir no pipeline de publicação TikTok; separar credenciais de contas |
| **Pokémon Torre 2** | **Baixo para gameplay; médio para comunidade** | Roadmap público, coleta de feedback autorizado, cadastro para atualizações, comunicação de releases e suporte | Não mexer em Phaser, VFX, IA, saves, golpes, autos ou deploy por causa deste kit |
| **Bots de trading** | **Baixo / uso limitado** | Somente painel de suporte/relacionamento se houver oferta legítima futura | Não prospectar com promessas de lucro, nem mesclar estatísticas simuladas com resultados reais |

## 3. Recursos a aproveitar primeiro (ordem por retorno esperado)

### A. Captura consentida, deduplicação e qualificação de leads
Implementar entrada por formulário próprio, encaminhamento voluntário no WhatsApp Business, portal de imóvel ou solicitação de demonstração. Campos sugeridos: `lead_id`, `origin`, `consent_status`, `product_interest`, `location`, `budget_band`, `stage`, `owner`, `next_action_at`, `do_not_contact`. Evitar armazenar dados desnecessários ou expor detalhes de clientes no repositório público.

### B. Funis e ações mensuráveis
- SaaS: interessado → qualificado → demonstração → proposta/trial → contrato → assinatura ativa → renovação/expansão.
- Imóveis: lead inbound → requisitos → imóveis compatíveis → visita agendada → proposta → documentação → fechamento.
- Patrocínios: contato com opt-in/relacionamento legítimo → briefing → negociação → contrato → entrega → renovação.
Registrar eventos e motivos de perda; nunca contabilizar conversa como venda.

### C. IA de atendimento com fontes verificáveis
Responder somente com preços, características, planos, termos e disponibilidade **efetivamente confirmados**; escalar perguntas contratuais, financeiras ou não verificadas para pessoa responsável. Permitir que o operador interrompa, revise e substitua a automação.

### D. Follow-up, medição e operação
Calendário de próximas ações; lembretes e mensagens apenas nos canais autorizados e no contexto da relação com o interessado. Acompanhar conversão por origem, receita atribuída verificável, CAC, custo da IA por lead/cliente e taxa de opt-out. Testes A/B com amostra e período definidos. Pausa geral, controle de custos e logs de decisão.

### E. Parceiros/afiliados (segunda etapa)
Pipeline separado para criadores/parceiros; rastrear origem e conversões efetivas; prever divulgação clara da parceria e das comissões. Não criar rede de spam de mensagens.

## 4. O que NÃO importar sem validação

**Primeira DM via Chrome CDP com Playwright:** o prompt propõe automação de contato inicial usando sessão do Instagram. Esse método pode conflitar com regras da plataforma, desencadear restrições da conta e criar riscos de segurança para a sessão, mesmo se configurar limites e tempos aleatórios. **Não habilitar prospecção por DMs não solicitadas automaticamente.** Priorizar leads inbound, comunicação autorizada e API oficial quando elegível, sempre respeitando limites de mensagem.

**Autonomia comercial sem revisão:** nunca deixar a IA prometer resultados, descontos, disponibilidade ou condições não autorizadas. Controles `VERIFIED_CLAIMS`, orçamento de API e revisão humana são ideias úteis, mas devem ser efetivamente implementados e testados.

**Privacidade e segurança:** avaliar base legal aplicável sob a LGPD, transparência e retenção; aplicar descadastro e exclusão; proteção de sessões e tokens; minimizar dados pessoais. Perfil Chrome em porta de debug pode expor uma sessão inteira. Não colocar credenciais, leads ou conversas reais no Arsenal público.

**Custo e ROI:** o GitHub não comprova receita de R$ 1 milhão, taxa de conversão, CAC nem lucratividade. OpenAI API e eventualmente infraestrutura geram custos variáveis; estabelecer limite, métricas e piloto antes de expandir.

**Licença:** sem arquivo LICENSE identificado, manter apenas documentação autoral e links. Não importar o PROMPT.md integral ou incluir submódulo no Arsenal como se estivesse licenciado.

## 5. MVP recomendado — reaproveitamento barato

**Fase 1 — CRM e leads inbound:** criar estrutura independente com formulário, pipeline, deduplicação, registro de consentimento, próxima ação e dashboard; testar somente com dados fictícios. Sem Instagram CDP, sem API paga e sem alteração dos sistemas de produção.

**Fase 2 — resposta assistida:** construir base verificada de ofertas de software e imóveis; rascunhos de respostas e aprovação humana; registrar erros, opt-out e custo antes de permitir qualquer automação de envio.

**Fase 3 — integração oficial:** conectar canais comerciais autorizados e webhooks com validação de assinatura e idempotência; executar piloto pequeno e medir conversão real, incidentes, CAC e custo por contato.

**Fase 4 — aprendizado controlado:** testar hipóteses de qualificação/horário/oferta, auditáveis e reversíveis; só expandir com resultado verificável e conformidade.

**Critério de conclusão:** documentação isolada não é implantação. Exigir implementação funcional, testes, evidência de métricas, validação legal/plataforma, logs sem segredos e autorização específica antes de usar contas comerciais reais.

## 6. Como combinar com o Arsenal existente

- **Vibe Coding Toolkit:** qualidade/lint e manutenção do novo sistema, após existir base de código.
- **Spec Kit + Superpowers:** especificar o MVP, escrever testes antes de integrações e revisar decisões de negócio.
- **Graphiti + Obsidian:** somente se houver volume de conhecimento que justifique memória estruturada. No MVP, banco e documentação Markdown bastam.
- **GitHub Actions:** CI automatizada de segurança/testes, sem executar envios reais para leads durante pipelines.

**Recomendação:** priorizar a camada de **CRM/qualificação + funis + atendimento baseado em afirmações verificadas** para a Central de Softwares e Realizações Imóveis. São as peças reutilizáveis com valor mensurável; o mecanismo de disparo de DMs tem risco e custo de manutenção desproporcionais neste momento.
