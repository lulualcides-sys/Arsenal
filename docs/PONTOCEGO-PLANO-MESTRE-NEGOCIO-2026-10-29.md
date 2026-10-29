# PONTOCEGO — Plano mestre de validação de negócio (29/10/2026)

> **Estado real:** protótipo local de conferência CSV construído e testado nesta sessão. **Não** é SaaS publicado. Não existe evidência de clientes, assinatura ativa, faturamento ou lucro. O protótipo está no pacote de entrega do chat; este documento registra a decisão e evita perder contexto entre conversas.

## Decisão comercial

Foco provisório: auditor independente para pequenas empresas de manutenção, instalação e serviços técnicos. Compara ordens de serviço concluídas, faturas emitidas e contratos a vencer, **sem substituir o ERP**. A promessa é detectar **divergências que exigem conferência**, não recuperar crédito automaticamente.

Concorrência confirmada: Auvo Service, Klimatta, WK Radar e outros já oferecem OS, cobrança e avisos. Portanto, **não** anunciar o mercado como inexplorado. Hipótese de diferencial: conciliação transversal de exports CSV mesmo com sistemas desconectados.

## 1. Inventário de ativos reutilizáveis

1. Interfaces web, filtros e painéis do NEXUS Score.
2. Rotinas de aquisição/normalização de dados do NEXUS.
3. Alertas e pontuação de exceções.
4. GitHub Actions, versionamento e testes.
5. Experiência com Cloudflare/GitHub Pages.
6. Pipeline de vídeos WildVox.
7. Roteiros, narração e legendagem.
8. Templates audiovisuais (sujeitos a licenciamento).
9. NEXUS Quant Paper: métricas e experimentação, sem lucro presumido.
10. Alertas/relatórios via Telegram.
11. Arsenal: bibliotecas e ferramentas (licenças por projeto).
12. Documentação e controle de qualidade.
13. Atendimento comercial e follow-up imobiliário.
14. Textos, scripts e templates de anúncios imobiliários.
15. Desenvolvimento JS/HTML/Pixi/Phaser (sem revender personagens/sprites Pokémon protegidos).

## 2. Três oportunidades candidatas — hipótese, não dados de mercado

| Critério (0–5, pesos iguais) | PontoCego | Kit imobiliário | VoxFlow |
|---|---:|---:|---:|
| Dor recorrente | 5 | 4 | 4 |
| Piloto acessível | 4 | 5 | 2 |
| Assinatura justificável | 4 | 3 | 4 |
| Menor dependência de APIs pagas | 5 | 4 | 1 |
| Acesso atual a compradores | 2 | 4 | 2 |
| **Total proposto** | **20** | **20** | **13** |

PontoCego é a primeira hipótese de teste; o kit imobiliário é alternativa se não houver compradores. Não abrir três produtos de uma vez.

## 3. Oferta replicável

**Cliente-alvo:** prestador com pelo menos dezenas de OS mensais e dados de OS/faturas separados, decisor financeiro acessível. **Entregável mínimo:** importação CSV, conciliação por id_os, alerta de OS concluída sem fatura correspondente, fatura vencida não paga, contrato ativo vencendo em 30 dias, exportação para revisão.

**Piloto de disposição a pagar, preços não validados:** R$ 99 / 30 dias. Possível preço posterior, sujeito a teste de custo: Essencial R$ 149/mês e Pro R$ 299/mês (só depois de haver autenticação, automações e suporte). Não oferecer recursos ainda inexistentes.

## 4. Recorrência honesta

A dor volta se novos serviços e faturas precisarem ser conciliados toda semana/mês. Testar número de divergências **confirmadas** por período, valor real revisado e minutos economizados. Se o cliente importa um arquivo, resolve tudo e não tem motivo mensal para voltar, **não vender assinatura artificial**.

## 5. Funil mínimo

Conteúdo educativo útil → contato individualizado autorizado → roteiro de 10 entrevistas → demonstração com dados **fictícios** → piloto com autorização para uso de dados → proposta paga se valor reconhecido. Evitar scraping ou disparos não solicitados. Pergunta principal: “Como vocês garantem que toda OS finalizada foi faturada?”.

## 6. Operação 7 dias sem o fundador

Meta **ainda não atingida**: onboarding autônomo, importação com validações, explicação de falsos positivos, contas isoladas, FAQ, cobrança/cancelamento e monitoração. Primeiro **eliminar** tarefas sem valor, **padronizar** cabeçalhos, **automatizar** regras estáveis, **delegar** só o restante. Central SaaS de programas, planos e clientes só **depois** que um produto tiver pilotos pagantes e retenção observada.

## 7. Plano de 90 dias — portas de decisão

- **Semana 1–2 / VALIDAR:** 10 conversas com decisores; coletar evidências sobre processo de conciliação e exportabilidade CSV. Porta: pelo menos 3 têm dor mensal concreta.
- **Semana 3–4 / VENDER:** 3 demos e proposta de 2 pilotos pagos. Porta: sem 2 pilotos aceitos, **suspender construção de backend** e ajustar nicho/oferta.
- **Semana 5–8 / SISTEMATIZAR:** revisar falsos positivos com exemplos autorizados, autenticação e isolamento de dados, testes, instruções de importação e avaliação LGPD.
- **Semana 9–12 / ESCALAR:** onboarding autônomo, assinatura/cancelamento, medir retenção e custo de suporte. Meta de prova: 3 pagantes retidos, margem de contribuição positiva e processo repetível.
- **Semana 13 / DECIDIR:** escalar somente com dados reais; caso contrário, pivotar/encerrar. Nada de garantir receita.

### Cenários brutos, não previsões

Com ticket hipotético de R$149/mês: 5 clientes = R$745; 10 = R$1.490; 30 = R$4.470; 50 = R$7.450; 100 = R$14.900 mensais **antes de custos, impostos, churn e inadimplência**.

### Gestão de riscos

- O id_os deve coincidir entre OS e fatura. Caso contrário, alertas podem ser falsos.
- Fatura em aberto pode ter sido paga fora do sistema.
- "Valor sob análise" ≠ dinheiro perdido ou recuperado.
- Prova jurídica/contratual requer revisão humana.
- LGPD: usar dados legitimamente, com acesso controlado e medidas de segurança. Protótipo local não substitui controles para SaaS com dados reais.
- Não misturar este experimento com repositórios de produção do WildVox, NEXUS, Quant ou Pokémon.

### Fontes verificadas

- Auvo Service: https://www.auvo.com/auvo-service
- Klimatta: https://www.klimatta.com.br/
- WK Radar: https://wk.com.br/solucao/gestao-de-servicos/
- ANPD guia de segurança para pequenos agentes: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte

**Próxima fase factual:** entrevistas, testes com dados autorizados, dois pilotos pagos. Um protótipo e um plano não constituem receita passiva.
