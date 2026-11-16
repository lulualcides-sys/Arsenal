# AutoClip + Postiz — curadoria para Nexus Clips BR (16/11/2026)

**Estado:** catalogados para avaliação técnica. **Não estão instalados, conectados nem publicados no projeto.** Este registro é referência para o Astra, não autorização de postagem externa.

## 1) AutoClip (edição)

- **Fonte principal:** https://github.com/artbyjazi/autoclip
- **Licença declarada:** MIT. Conferir LICENSE no commit escolhido antes da incorporação.
- **Função:** pipeline local-first para importar vídeo autorizado, transcrever, selecionar trechos por modelo de linguagem, reenquadrar falante/facecam para 9:16, inserir legendas animadas e exportar MP4.
- **Tecnologia e custo:** Whisper/LLM (Ollama local opcional), FFmpeg, MediaPipe. O projeto exige Python 3.11 ou 3.12, FFmpeg completo com libass/libx264 e Node >=20 para compilar UI; GPU opcional. Processamento local não é custo zero: consome CPU/GPU, disco e tempo. Chaves de provedores externos podem gerar cobrança.
- **Limitações:** detecção de melhor momento por IA é heurística, não evidência de viralização. Face tracking não garante enquadramento correto em gameplays com facecam pequena/múltiplos rostos.
- **Homônimo diferente:** https://github.com/lmfrozza/Autoclip é pipeline voltado a coleta/ranking de clipes Twitch, com licença MIT informada. É uma alternativa para estudar ingestão, mas não confundir com o editor artbyjazi; sua maturidade é diferente.

## 2) Postiz (distribuição)

- **Fonte:** https://github.com/gitroomhq/postiz-app
- **Documentação:** https://docs.postiz.com/
- **Licença declarada:** AGPL-3.0. Verificar obrigações de distribuição/uso em rede antes de incorporar ou modificar código.
- **Função:** gestão, agendamento e publicação social por API/CLI, incluindo TikTok e YouTube, com OAuth oficial onde suportado; versão self-hosted ou cloud.
- **Custo:** software self-hosted sem licença paga, mas infraestrutura, banco, armazenamento, backups e manutenção custam recursos. Cloud pode ser paga. A disponibilidade real dos escopos/canais e publicação pública depende de aprovação e regras de cada plataforma.
- **Limitação operacional:** criar um agendamento não equivale a confirmar publicação pública. Consultar ID remoto, visibilidade, estados e falhas reais.

## Aplicação no projeto GTA-6-clips

**Repositório:** https://github.com/lulualcides-sys/GTA-6-clips

Em 16/11 existe a PR #25 do Astra com edição local, Twitch por fluxo autorizado e fila SQLite com adaptadores YouTube/TikTok; os testes externos com contas reais não foram comprovados. Preservar a PR e seu histórico: https://github.com/lulualcides-sys/GTA-6-clips/pull/25

| Prioridade | Piloto | Critério de decisão |
|---|---|---|
| P1 | AutoClip isolado sobre 5–10 amostras com permissão | Comparar com editor atual: identificação do momento, preservação de facecam/reação, legendas PT-BR, duração, qualidade visual, tempo e custo de processamento |
| P2 | Postiz isolado como **um** adaptador de distribuição opcional | Testar OAuth autorizado, rascunho/agendamento, confirmação, deduplicação, revogação de direitos e falha/retentativa; não deixar duas filas publicarem o mesmo clipe |
| P0 permanente | Segurança, direitos e editorial | Nunca baixar/repostar conteúdo sem direitos necessários, nunca publicar automaticamente clipes sem aprovação e conexão verificadas; manter crédito do criador e prévia no navegador |

### Decisão arquitetural

Não copiar o app AutoClip inteiro para a aplicação Windows nem introduzir outra plataforma pesada apenas porque é open source. Adaptar módulos isoladamente **após benchmarking**, com dependências opcionais e rollback. O editor existente continua sendo o principal até aprovação do piloto.

Postiz **não substitui automaticamente** a fila/estado SQLite já implementados. Se adotado, encaixar como conector explícito com idempotência (hash do arquivo + plataforma), credenciais isoladas, flag desativada por padrão e reconciliação de status. Evitar submissões duplicadas entre Postiz e adaptadores diretos.

### Próximos passos para o Astra

1. Registrar arquitetura e baseline de render/aprovação da PR #25.
2. Testar AutoClip com material próprio ou licenciado. Não usar títulos, reações ou falas inventados.
3. Prototipar Postiz **em sandbox** com mídia sintética; nenhum token em Git, nenhum post real sem validação.
4. Apresentar relatório comparativo e PR separada, com testes focados, teste completo e rollback.
5. Só após resultados positivos, propor integração opcional no instalador Windows.

## Fontes verificadas em 16/11/2026

- https://github.com/artbyjazi/autoclip
- https://github.com/lmfrozza/Autoclip
- https://github.com/gitroomhq/postiz-app
- https://github.com/gitroomhq/postiz-agent
