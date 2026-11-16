# Radar de créditos gratuitos — pessoa física, Brasil

Este projeto acompanha **mudanças textuais em páginas oficiais**. O usuário utiliza conta individual (CPF, **sem CNPJ**) e a identidade, elegibilidade, cadastro prévio e benefícios concedidos permanecem **não verificados**. **Nenhum dado pessoal ou documento é armazenado neste repositório público.**

## Como funciona
- GitHub → Actions → **Radar de Créditos de Startup** → Run workflow.
- O cron confere as páginas diariamente, por volta de 08h17 de Brasília; horários do GitHub Actions podem atrasar.
- A execução salva `latest-report.md` e `state.json` quando autorizada pelo GitHub.
- Se houver mudança de texto entre duas verificações, abre um issue para **revisão manual**. Alteração de HTML não comprova revisão de valores, termos ou novas vagas.
- Fontes: AWS Free Tier, Google Cloud Free, FAQ do Google, Oracle Cloud Free Brasil, Azure Free, Cloudflare Workers Free e GitHub Student Developer Pack.
- **Não faz inscrição, validação de CPF ou leitura automática de Gmail.** A agenda do ChatGPT é uma automação independente.

## Prioridade e cautelas
1. **Cloudflare Free:** limites gratuitos permanentes para hospedar aplicações leves, sujeitos a regras e quotas.
2. **AWS Free Tier:** créditos para clientes realmente novos; plano gratuito com prazo e limites; conferir elegibilidade atual na página oficial.
3. **Google Cloud:** testes para novas contas elegíveis; verificação de método de pagamento e expiração dos créditos.
4. **Oracle Cloud:** oferta pessoal sujeita a país/região, cartão e disponibilidade de capacidade; respeitar limite de uma conta grátis por pessoa.
5. **Azure:** crédito promocional para novos clientes e condições de cartão e duração.
6. **GitHub Education:** somente para estudantes ativos comprovados; não presume matrícula.

## Proteção de dados
Nunca armazenar CPF, RG, cartão, senha, dados bancários, endereço, telefone, nomes de pessoas, e-mails privados, tokens, provas de matrícula ou informações comerciais sigilosas em arquivos, logs, issues ou comentários de PR **públicos**. Não enviar formulários, criar contas ou aceitar termos sem aprovação individual. Não tratar valor máximo publicitário como saldo obtido.

## Limitações
O monitor **não descobre automaticamente novos programas**, não interpreta regras juridicamente, não verifica saldos e não substitui uma revisão atualizada. Alguns sites podem bloquear HTTP automatizado; não confundir erro de acesso com programa encerrado. Controle de gastos é responsabilidade do titular quando converter contas em planos pagos.
