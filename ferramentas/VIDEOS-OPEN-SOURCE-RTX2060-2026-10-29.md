# Arsenal — 7 vídeos: ferramentas open source e RTX 2060

**Data da pesquisa:** 2026-10-29  
**Origem:** vídeos `1001002572.mp4` a `1001002578.mp4`, apresentados pelo usuário.  
**Status:** apenas **catalogadas e verificadas por documentação pública**. Nada foi instalado, testado no PC, executado nos dispositivos ou integrado em produção.  
**Critérios:** projeto oficial, código público, uso prático, incompatibilidades e riscos. Evitar duplicatas no inventário existente.

## Projetos identificados nos 7 vídeos

| Vídeo | Ferramenta | Repositório oficial | Licença indicada | Caso de uso | Nota crítica |
| --- | --- | --- | --- | --- | --- |
| 1 — RTX 3090, “1,8×” | **GPU Unlock (Ampere)** | https://github.com/Zagitta/gpu-unlock | GPL-2.0-only (módulo) | Remove limitação de instruções FP/BF16 em modelos compatíveis da RTX 30, no Linux | **Não atende à RTX 2060** (Turing). Resultado divulgado 87,50→157,41 TFLOPS foi medido em **3090 Ti**, em operação BF16 específica; não é ganho universal em jogos/IA. Altera boot/kernel; não instalar sem plano de reversão. |
| 2 — Limpeza Windows 11 | **Win11Debloat** | https://github.com/Raphire/Win11Debloat | MIT | Remoção seletiva de apps e recomendações, desativação de telemetria/Copilot/Recall no Windows 10/11 | Criar ponto de restauração ou backup antes; não remover Windows Update, drivers, Defender nem componentes essenciais. |
| 3 — TV estilo Apple TV sem anúncios na home | **CleanYourTV** | https://github.com/Gathin23/cleanyourtv | MIT | Debloat via ADB Wi-Fi + launcher próprio para **Android TV/Google TV**; reversível por ferramenta de restore | Não funciona como launcher em Samsung Tizen/LG webOS; alterações em componentes do fabricante podem afetar funções. Bloqueio de anúncios da home ≠ bloqueio de propagandas em todos os apps. Usar somente em TV autorizada. |
| 4 — YouTube em TV | **SmartTube** | https://github.com/yuliskov/SmartTube | MIT (repositório) | Cliente de vídeo para Android TV e boxes; interface limpa, SponsorBlock e reprodução de até 8K onde suportada | **Aviso de segurança do autor em 2026**: ambiente de compilação e possivelmente chaves comprometidas; conferir releases/chaves e evitar APKs de terceiros. Não serve para webOS/Tizen; capacidade 8K depende de hardware/rede. |
| 5 — Remover apps Android sem root | **Universal Android Debloater Next Generation (UAD-ng)** | https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation | GPL-3.0 | GUI desktop em Rust usando ADB, com listas de bloatware para aparelhos Android | Não presumir que todo app é seguro para desativar. Usar desativação/reversão, backup e testes por lotes pequenos; pode quebrar notificações/funções OEM. |
| 6 — Patches de apps Android | **ReVanced Manager** | https://github.com/ReVanced/revanced-manager | GPL-3.0 | Aplicador de patches, opções de personalização e assinatura de apps Android | É um **patcher**, não produto garantidamente livre de propaganda para qualquer app. Compatibilidade depende de patch/app; riscos de contas, licenças e APKs adulterados. Obter só do projeto oficial. |
| 7 — Bloqueio de anúncios no Wi-Fi | **Pi-hole** | https://github.com/pi-hole/pi-hole | EUPL-1.2 (núcleo; componentes têm licenças próprias) | DNS sinkhole na rede doméstica, com Raspberry Pi, Linux ou contêiner | DNS **não remove todos os anúncios** (p.ex. conteúdo e anúncio no mesmo domínio, como muitos anúncios do YouTube); pode afetar serviços e exige configuração de DNS do roteador/dispositivos. |

## Pesquisa extra: RTX 2060

### A. Turing Unlock — RTX 2060: compatibilidade experimental (não homologado)

- **Repositório:** https://github.com/nlzy/turing-unlock
- **Licença:** GPL-2.0-only para módulo e empacotamento; firmware da NVIDIA tem termos próprios.
- **Sistema:** Linux; alteração profunda de inicialização, firmware e módulo de kernel.
- **Evidência específica:** issue https://github.com/nlzy/turing-unlock/issues/20 — em 27/10/2026, usuário relatou desbloqueio em uma **RTX 2060 12 GB TU106**, driver 615.71.10, Debian 13. No teste de geração de texto com llama.cpp, passou de 25,728 para média de 25,742 tokens/s (**+0,06%**, sem ganho prático comprovado). Uma única referência pré-unlock e nenhum teste prolongado. **Não equivale a comprovação na RTX 2060 6 GB**.
- **Risco:** desenvolvedor alerta explicitamente para alta potência/possível dano ao hardware. **Apenas pesquisa e estudo; não instalar automaticamente**. Não prometer 1,8× em jogos, renderização ou IA.
- **Diferente de** Zagitta/gpu-unlock: aquele projeto prioriza arquitetura Ampere; a versão Turing é outro repositório independente.

### B. OptiScaler — alternativa de desempenho para jogos na RTX 2060

- **Repositório:** https://github.com/OptiScaler/OptiScaler
- **Licença:** GPL-3.0.
- **Uso:** middleware open source para substituir/ajustar upscalers DLSS/FSR/XeSS em jogos compatíveis, e testar geração de quadros em cenários suportados.
- **Cautela:** resultados variam por jogo, versão/API e configuração. **Não é desbloqueio de Tensor Cores, nem dobra FPS automaticamente**. **Não usar em jogos online**, segundo alerta oficial, devido a risco de anticheat/banimento. Não instalar no Warzone/partidas online.
- **Prioridade:** teste opcional e reversível em um jogo offline com FPS/frametime pré e pós, caso o usuário solicite.

### C. IA local com RTX 2060: projeto já existente no arsenal

- **llama.cpp** já catalogado no inventário principal: https://github.com/ggml-org/llama.cpp
- CUDA contempla placas NVIDIA Turing **compute capability 7.5**, como a RTX 2060: https://developer.nvidia.com/cuda/gpus
- Serve para inferência local de LLMs GGUF com modelos compactos/quantizados compatíveis com VRAM disponível. **Não registrar novamente como ferramenta nova**. Não confundir desempenho em IA com FPS em jogos.

## Priorização para o arsenal

- **Alta utilidade / baixo custo:** Win11Debloat (limpeza seletiva), Pi-hole (DNS doméstico), UAD-ng (celulares).
- **Condicional ao dispositivo:** CleanYourTV e SmartTube (Android TV/Google TV); ReVanced Manager (Android, compatibilidade por app).
- **Somente pesquisa experimental:** GPU Unlock/Ampere e Turing Unlock, sem instalação nem promessa de ganho na RTX 2060.
- **Opcional para jogos offline:** OptiScaler com benchmark controlado.

## Fontes principais

- GPU Unlock: https://github.com/Zagitta/gpu-unlock
- Turing Unlock + relatório específico RTX 2060: https://github.com/nlzy/turing-unlock/issues/20
- Win11Debloat: https://github.com/Raphire/Win11Debloat
- CleanYourTV: https://github.com/Gathin23/cleanyourtv
- SmartTube e seu aviso de segurança: https://smarttubeapp.github.io/
- UAD-ng: https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation
- ReVanced: https://github.com/ReVanced/revanced-manager
- Pi-hole: https://github.com/pi-hole/pi-hole
- OptiScaler: https://github.com/OptiScaler/OptiScaler
- Arquiteturas NVIDIA CUDA: https://developer.nvidia.com/cuda/gpus

**Política de preservação:** este inventário é documental e não instala programas, adiciona submódulos gigantes, troca drivers, edita registro do Windows ou altera outros projetos do usuário. Qualquer integração futura exige licença, compatibilidade e testes específicos.
