# Radar de créditos para startups (piloto)

Monitor **somente de leitura** de quatro páginas oficiais: AWS Activate, Google for Startups Cloud, Cloudflare for Startups e Microsoft for Startups. Execução diária em GitHub Actions; `workflow_dispatch` permite execução manual. Nenhum cadastro, gasto, aceite de termos ou envio de solicitação.

## O que faz

1. Acessa as páginas públicas, extrai trechos associados a créditos e requisitos.
2. Guarda apenas o hash e trechos públicos em `state.json` para detectar mudanças de texto.
3. Publica um relatório em **Actions > Summary** e abre uma **Issue** apenas se houver possível alteração após a linha de base inicial.
4. Distingue falha de rede de alteração real. Nenhuma falha gera falsa notícia de mudança.

## O que ainda NÃO faz

- Não descobre automaticamente novas empresas/programas além de `programs.json`. Ampliar a lista exige curadoria de fonte oficial.
- Não determina elegibilidade real nem faz inscrições: dados empresariais e documentação precisam ser verificados individualmente.
- Não monitora e-mails, faturas, concessões, saldos, consumos nem expiração. Exigem integração autorizada e leitura de comprovantes.
- Não garante que um texto alterado represente mudança de benefícios; os avisos exigem revisão humana.

**Segurança:** este repositório é público. NUNCA colocar aqui CNPJ, dados cadastrais privados, e-mail pessoal, documentos, senhas, tokens, comprovantes ou saldos da empresa. A coluna `published_initial_usd` é uma referência de marketing, nunca valor recebido. Não presumir acesso aos programas ou elegibilidade. Eventos programados do GitHub podem atrasar e dependem de Actions habilitado.

## Executar testes localmente

```bash
python -m unittest discover -s toolkits/startup-credits -p 'test_*.py'
python toolkits/startup-credits/monitor.py
```

Próximo passo: após validar o negócio e conectar a caixa de entrada, implementar em **repositório privado** um cadastro de solicitações aprovado pelo usuário e a reconciliação com comunicações oficiais, sem dados fictícios.
