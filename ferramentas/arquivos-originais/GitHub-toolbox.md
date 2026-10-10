# GitHub Toolbox — WildVox e futuros projetos

Seleção verificada em 06/10/2026. A ideia é manter referências oficiais úteis, sem instalar tudo de uma vez.

## Essenciais para vídeo e conteúdo

### 1. FFmpeg
Repo: https://github.com/FFmpeg/FFmpeg
Uso: motor de vídeo/áudio. Corta, junta, converte, redimensiona, mistura voz+música, aplica legendas e gera o MP4 final.
WildVox: já é a base da edição atual.

### 2. Remotion
Repo: https://github.com/remotion-dev/remotion
Uso: cria vídeos por código usando React. Muito bom para animações, layouts, textos e edições mais visuais.
WildVox: forte candidato para evoluir a estética além do FFmpeg puro.

### 3. yt-dlp
Repo: https://github.com/yt-dlp/yt-dlp
Uso: baixa vídeo/áudio de muitas plataformas e páginas compatíveis, quando o uso e a licença da mídia permitem.
WildVox: pode ajudar na ingestão técnica de mídia autorizada.

### 4. ImageMagick
Repo: https://github.com/ImageMagick/ImageMagick
Uso: processamento automático de imagens: redimensionar, converter, recortar, compor e gerar thumbnails.
WildVox: útil para fotos, capas, assets e padronização automática.

### 5. OpenCV
Repo: https://github.com/opencv/opencv
Uso: visão computacional para analisar imagens e vídeos.
WildVox: pode detectar enquadramento ruim, animal fora de cena, movimento, blur e auxiliar o QA visual.

### 6. PySceneDetect
Repo: https://github.com/Breakthrough/PySceneDetect
Uso: detecta automaticamente mudanças/cortes de cena em vídeos.
WildVox: excelente para QA, medir variedade visual e evitar takes longos demais.

### 7. faster-whisper
Repo: https://github.com/SYSTRAN/faster-whisper
Uso: transcrição de áudio rápida e eficiente baseada no Whisper.
WildVox: pode revisar narração, conferir palavras e gerar timestamps.

### 8. WhisperX
Repo: https://github.com/m-bain/whisperX
Uso: transcrição com alinhamento preciso por palavra.
WildVox: especialmente útil para sincronizar legendas palavra por palavra com muita precisão.

### 9. Kokoro ONNX
Repo: https://github.com/thewh1teagle/kokoro-onnx
Uso: roda vozes Kokoro via ONNX de forma leve/local.
WildVox: alternativa/apoio para manter TTS rápido e reproduzível.

## Automação e infraestrutura

### 10. n8n
Repo: https://github.com/n8n-io/n8n
Uso: automação de workflows conectando APIs, serviços e tarefas.
WildVox: pode virar um painel/orquestrador para render, publicação, alertas e métricas.

### 11. Playwright
Repo: https://github.com/microsoft/playwright
Uso: automação de navegador.
WildVox: útil para tarefas web que não possuem API adequada, respeitando permissões e termos dos sites.

### 12. rclone
Repo: https://github.com/rclone/rclone
Uso: sincroniza arquivos com Google Drive, S3, Dropbox e muitos outros storages.
WildVox: backup automático dos vídeos, áudios, configs e resultados.

## Ferramentas extras / experimentais

### 13. ComfyUI
Repo: https://github.com/Comfy-Org/ComfyUI
Uso: workflows locais para geração e transformação de imagens/vídeos com modelos de IA.
WildVox: útil futuramente para assets visuais originais quando fizer sentido e sem fingir que uma imagem gerada é registro real de uma espécie/notícia.

### 14. LosslessCut
Repo: https://github.com/mifi/lossless-cut
Uso: cortes muito rápidos de vídeo/áudio sem recompressão pesada.
WildVox: útil para ajustes manuais e preparação de clipes.

### 15. Auto-Editor
Repo: https://github.com/WyattBlue/auto-editor
Uso: automatiza cortes com base em silêncio, áudio e movimento.
WildVox: pode servir como referência para deixar alguns cortes ainda mais inteligentes.

### 16. REA — Reverse Engineer Anything
Repo: https://github.com/morluto/rea
Uso: investiga como programas, apps, binários, JavaScript/Electron, .NET, APKs e sites funcionam internamente.
WildVox: não é editor; fica como ferramenta de desenvolvimento para estudar funções de outros softwares e implementar ideias próprias quando apropriado.

## Prioridade para o WildVox

Se formos integrar algo novo, a ordem mais interessante hoje é:
1. PySceneDetect — QA visual e diversidade de cenas.
2. OpenCV — enquadramento, blur, movimento e análise visual.
3. WhisperX — legendas/timestamps ainda mais precisos.
4. Remotion — elevar a estética e animações do vídeo.
5. rclone — backup e organização.
6. n8n — orquestração futura de múltiplos canais.

Não instalar tudo automaticamente. Avaliar licença, requisitos e ganho real antes de integrar cada projeto ao pipeline.
