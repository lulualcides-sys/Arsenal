# Graphiti + Obsidian — memória de projetos e economia de contexto

**Catalogado em:** 30/10/2026  
**Status real:** documentação e referências no Arsenal. **Graphiti já vinculado** como submódulo Git em `fontes/ferramentas/graphiti`. **Obsidian registrado por links oficiais**, não instalado nem incorporado como código. Nenhuma integração foi ativada no ChatGPT ou nos projetos.

## Fontes e licenciamento

| Ferramenta | Fonte oficial | Natureza | Uso proposto |
| --- | --- | --- | --- |
| **Graphiti (getzep/graphiti)** | https://github.com/getzep/graphiti | Framework open source **Apache-2.0**, Python, grafo temporal de conhecimento; já presente no Arsenal | Memória consultável de fatos, decisões, dependências e histórico de agentes |
| **Obsidian** | https://obsidian.md/ | Aplicativo de notas em Markdown, gratuito para uso pessoal e comercial, **não open source** | Especificações, decisões aprovadas, pendências e notas técnicas por projeto |
| **Obsidian Releases** | https://github.com/obsidianmd/obsidian-releases | Repositório público de **releases/plugins**; **não contém o código-fonte do aplicativo** | Conferir versões e orientações oficiais |
| **Obsidian Help** | https://obsidian.md/help/ | Documentação oficial | Criar vaults, vincular notas e configurar opções |

O Graphiti exige configuração de banco de grafo (por exemplo, Neo4j ou FalkorDB), embeddings e uso de modelo de linguagem para a ingestão de informações; portanto **não é uma solução sem custo garantido**. O Obsidian funciona localmente e não necessita de conta para uso básico. Seus serviços opcionais Sync/Publish podem ter cobrança.

## Economia real de tokens: o que funciona

**Objetivo:** evitar carregar todo o histórico de conversa, arquivos completos, listas enormes ou registros irrelevantes em cada interação. **Não existe desconto automático de tokens por apenas instalar Graphiti ou Obsidian.**

1. Manter documentação persistente e curta no Obsidian, em Markdown, **fora do prompt** até que seja necessária.
2. Criar **um índice curto por projeto** (`00-INDICE.md`) e `ESTADO-ATUAL.md` com: versão/commit validado, últimas decisões, pendências priorizadas e restrições de regressão.
3. Antes de uma tarefa, localizar arquivos ou notas **por nome e assunto**. Enviar à IA só os trechos relevantes, com caminho de origem. Evitar anexar o vault inteiro ou o repositório inteiro.
4. Ao encerrar uma etapa, registrar **o que foi verificado**, arquivos modificados, commit, testes e pendências. Substituir resumos obsoletos, preservando registro histórico quando necessário.
5. Se consultas por relações e temporalidade se tornarem frequentes, **avaliar** o Graphiti para recuperar fatos específicos. Medir custo de ingestão (tokens de modelo + embeddings), infraestrutura, precisão e quantidade de contexto retornado antes de adotá-lo.
6. Comparar com um fluxo básico **Markdown + busca por arquivos (`rg`, busca do GitHub)**. Para projetos pequenos/médios, esse fluxo pode ser mais simples e barato que manter banco de grafos.

**Meta operacional inicial (não é resultado medido):** oferecer à IA um resumo de 300–800 tokens e no máximo 2–4 trechos relevantes por tarefa, ampliando somente se faltarem evidências. Um limite fixo nunca deve suprimir código, logs ou requisitos essenciais.

## Organização recomendada no Obsidian

```text
Projetos/
  Pokemon-Torre-2/
    00-INDICE.md
    ESTADO-ATUAL.md
    DECISOES-APROVADAS.md
    BUGS-PRIORITARIOS.md
    TESTES-E-COMMITS.md
  NEXUS-Score/
    00-INDICE.md
    ESTADO-ATUAL.md
    REGRAS-E-FONTES.md
  WildVox/
    00-INDICE.md
    ESTADO-ATUAL.md
    PIPELINE-E-ERROS.md
```

Estrutura sugerida, **não criada no dispositivo**. Os documentos devem referenciar commits e issues em seus repositórios próprios. Separar documentação pública e privada; **nunca sincronizar credenciais, dados de clientes, tokens de API ou relatórios sensíveis para o Arsenal público**.

## Exemplo de resumo mínimo para enviar à IA

```markdown
# Pokemon Torre 2 — contexto da tarefa
Base de código: <repo e commit/branch verificados>
Objetivo específico: <uma tarefa>
Regressões proibidas: <2–4 regras aprovadas relevantes>
Arquivos relacionados: <caminhos verificados>
Estado atual: <comportamento observado / reprodução>
Critério de conclusão: <teste objetivo + commit + publicação, se autorizada>
```

O preenchimento deve vir de fontes **verificadas**, não de suposições. No Graphiti, atualizar ou invalidar fatos antigos ao concluir correções; não confiar em um resumo de agente sem confirmar o código atual.

## Quando usar qual abordagem?

- **Começar por Obsidian + Markdown + GitHub:** barato, simples, auditável, sem banco de dados, sem chamadas extras de LLM para escrever notas.
- **Usar Graphiti apenas se necessário:** múltiplos agentes, decisões interdependentes, histórico muito mutável e consultas semânticas que a busca textual não responde bem.
- **Medir antes de afirmar economia:** tokens de entrada e saída, tokens para ingestão/embeddings, tempo de recuperação, custo monetário, acerto na recuperação e retrabalho por contexto perdido.

## Passos para experimentar, sem afetar produção

1. Criar um vault **local e privado** no Obsidian, usando os modelos acima.
2. Escolher **um projeto piloto** (ex.: Pokémon Torre 2) e preencher somente estados e decisões realmente validados.
3. Fazer 5–10 tarefas semelhantes comparando o método antigo com a recuperação de notas. Registrar consumo e qualidade.
4. Integrar Graphiti em **ambiente de teste isolado**, com um subconjunto de documentos sem dados sensíveis; validar recuperação antes de qualquer automação.
5. Só depois considerar integração com ferramentas MCP/assistentes e processos existentes.

**Segurança:** exemplos de servidores MCP/REST do Graphiti não devem ser expostos à internet sem autenticação, autorização e filtragem contra prompt injection. Não habilitar conectores/plugins não auditados sobre dados privados.
