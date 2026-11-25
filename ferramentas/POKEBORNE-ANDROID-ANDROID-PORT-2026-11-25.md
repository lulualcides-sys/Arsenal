# Pokeborne Android — port nativo para Android (25/11/2026)

**Projeto original:** [JayElDragon/Pokeborne-Android](https://github.com/JayElDragon/Pokeborne-Android)  
**Jogo:** [Pokeborne](https://play.pokeborne.fun/)  
**Classificação no Arsenal:** referência técnica catalogada; não integrado, não compilado e não instalado.

## O que é

Port não oficial para Android do jogo web 3D de ação estilo souls-like/roguelite Pokémon. O projeto disponibiliza o código do wrapper Android, que executa uma cópia local do jogo em um WebView. O próprio README do upstream esclarece que o repositório contém somente o código do port: código do jogo, modelos, áudio e arte pertencem aos respectivos autores e não estão incluídos.

## Recursos descritos pelo autor

- Execução offline após preparar o espelho local do jogo; o wrapper não solicita permissão INTERNET.
- Perfil local de treinador, sem fluxo de conta online.
- Controles touch com editor de posição, tamanho e opacidade.
- Suporte a controle físico, com alternância dos controles na tela.
- Ajustes de movimento analógico, botão Voltar e taxa de atualização de 60/120 Hz.
- Geração de APK por script Python.

## Estrutura e compilação

- `build_pokeborne.py`: aplica patches de build e gera/assina o APK.
- `android/`: Manifest e atividade Java com WebView e ponte de taxa de atualização.
- `port/android_port.js` e `port/android_port.css`: ajustes de interface e controles.
- Requisitos declarados: Python 3 com Pillow, JDK 17 e Android SDK (build-tools 36.0.0 e platform android-35).
- O processo depende de preparar o espelho do jogo em `src/` antes da compilação.

## Avaliação para nossos projetos

**Interesse principal:** referência de portabilidade Android para jogos web, especialmente controles touch/gamepad, WebView local, persistência no dispositivo e adaptação de desempenho para dispositivos portáteis.

**Possível estudo para Pokémon Torre 2:** avaliar separadamente a arquitetura do wrapper, o mapeamento de controles, o tratamento do botão Voltar, a persistência local e os limites de desempenho. Não copiar patches ou adaptar código ao nosso jogo sem revisão técnica, testes e análise de compatibilidade.

## Licença, direitos e limites

- O repositório consultado não apresenta arquivo `LICENSE` na raiz; portanto, **não presumir permissão para copiar, redistribuir ou incorporar seu código**.
- O port é não oficial. Pokémon e os ativos do jogo permanecem sob os direitos de seus titulares.
- Não importar modelos, áudio, arte, arquivos do jogo, espelhos ou APKs para o Arsenal.
- Esta entrada registra apenas uma referência e uma avaliação técnica; não cria submódulo, não instala dependências e não altera Pokémon Torre 2.

**Origem consultada em 25/11/2026:** README e estrutura descrita em [JayElDragon/Pokeborne-Android](https://github.com/JayElDragon/Pokeborne-Android).
