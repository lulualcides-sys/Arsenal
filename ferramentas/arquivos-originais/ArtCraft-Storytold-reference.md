# Biblioteca GitHub — StoryTold / ArtCraft / Craft Apps

**Curadoria:** 09/10/2026. **Status:** referências verificadas; **nenhum pacote instalado**.

## Identidade e sites

- Organização oficial: https://github.com/storytold
- Site oficial: https://getartcraft.com/
- Aplicação web: https://app.getartcraft.com/
- Preços oficiais: https://getartcraft.com/pricing
- **Atenção ao domínio:** o site pesquisado e vinculado à organização GitHub é `getartcraft.com`. A grafia `getarcraft.com` citada na conversa omite o segundo `t`; não presumir que seja o mesmo domínio nem inserir credenciais em endereço diferente.

**StoryTold não é um aplicativo isolado:** é a organização do GitHub por trás do ecossistema ArtCraft. O ArtCraft é um estúdio de composição/criação de imagens e vídeos com IA, e a coleção `*Craft` reúne alternativas livres a editores tradicionais.

## Projetos para acompanhar

| Projeto | Repositório oficial | Aplicação | Valor para nossos projetos | Maturidade / cautela |
|---|---|---|---|---|
| ArtCraft | https://github.com/storytold/artcraft | Estúdio de IA para cenas, imagens e vídeo com composição 2D/3D e posicionamento de câmera/personagens | WildVox: criar takes estilizados e storyboards originais | Software aberto, mas render por modelos/serviços de terceiros pode consumir créditos, API ou GPU |
| FilmCraft | https://github.com/storytold/filmcraft | Editor de vídeo similar ao Premiere com trilhas, legendas, efeitos, renderização, CLI e MCP | **Prioridade 1** para estudar automação de edição e cortes em vídeo | Projeto recente; README indica ~50–60% de prontidão para trabalho real; testar antes de substituir FFmpeg |
| PhotoCraft | https://github.com/storytold/photocraft | Edição de imagem estilo Photoshop, camadas, máscaras e PSD, CLI e MCP | **Prioridade 2** para imagens de capa, thumbnails, legendas gráficas e ajustes em lote | Early alpha; preferir validação antes do uso em produção |
| EffectCraft | https://github.com/storytold/effectcraft | Efeitos e motion graphics estilo After Effects | **Prioridade 3** para vinhetas, transições e efeitos do WildVox | Verificar capacidades de exportação e build antes da integração |
| VectorCraft | https://github.com/storytold/vectorcraft | Ilustração vetorial estilo Illustrator | Logos, ícones e identidade de canais | Projeto novo, validar funcionalidade |
| LightCraft | https://github.com/storytold/lightcraft | Biblioteca e edição/revelação de fotos, estilo Lightroom | Tratamento e padronização visual | Projeto novo, validar desempenho e suporte de arquivos |
| DesignCraft | https://github.com/storytold/designcraft | Diagramação estilo InDesign, versão desktop/web, CLI/MCP | Produção de materiais gráficos e catálogos | Projeto novo; não é ferramenta de vídeo |
| PdfCraft | https://github.com/storytold/pdfcraft | Edição e fluxo de PDFs semelhante ao Acrobat | Documentos, relatórios e exportação | Projeto novo, testar funcionalidades disponíveis |

## REA x ArtCraft

- **REA (`morluto/rea`)**: analisar funcionamento de apps, páginas, formatos e código — ferramenta de pesquisa de engenharia, não editor audiovisual.
- **ArtCraft / FilmCraft**: criar e automatizar material audiovisual e imagens; integrações em CLI/MCP são candidatas a uso por agentes.
- Usar recursos de engenharia de software e formatos abertos, respeitando licenças e direitos autorais; evitar copiar código/ativos proprietários.

## Recomendação por projeto

**WildVox:** estudar FilmCraft e PhotoCraft por suas interfaces CLI/MCP, mas manter FFmpeg + PySceneDetect + WhisperX como pipeline estável até testes reais de qualidade, execução automática e custos. ArtCraft serve como teste criativo pontual, não como fonte de registros reais de espécies; sempre distinguir mídia sintética da real.

**NEXUS SCORE:** efeito imediato baixo; REA, observabilidade e pipelines de dados são mais relevantes para o motor de dados, alertas, EV e backtests.

## Custos e segurança

O código aberto pode ser baixado/compilado sem assinatura obrigatória; **gerar mídia com modelos hospedados pode ter custo**. A página de preços apresenta assinaturas opcionais com créditos. Algumas funcionalidades exigem capacidade computacional local ou serviços de IA terceirizados. Verificar licença de cada repositório e dependências na versão escolhida. FilmCraft e PhotoCraft reportam licença alternativa MIT/Apache-2.0; assets, marcas e outros componentes podem ter avisos próprios.

Não instalar automaticamente projetos recém-lançados. Conferir releases assinados, issues, CI, exportação, segurança e qualidade antes de fornecer chaves, pagamento ou operar projetos de produção.

## Próxima prova de conceito sugerida

Teste isolado: importar um vídeo curto autorizado, cortar em 8–12 cenas, colocar legendas sincronizadas, exportar MP4 vertical 1080×1920, medir tempo de renderização, qualidade, consumo de RAM/CPU e verificar se a CLI/MCP executa sem cliques. Só adotar FilmCraft se superar ou complementar a solução atual.
