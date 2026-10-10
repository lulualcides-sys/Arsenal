# Radar de oportunidades para novos aplicativos — 09/10/2026

Objetivo: descobrir **produtos novos** para desenvolver, não somente bibliotecas para projetos existentes. Prioridade a MVPs pequenos e testáveis, com stack de código aberto e uma fonte de dados identificável. Não assumir custo zero de infraestrutura, nuvem, GPUs, tiles, licenças ou APIs.

## 1. RotaAltura — planejamento de rota para ônibus e caminhões
- **Cliente:** motoristas, fretamento, turismo rodoviário, transportadoras pequenas, logística urbana.
- **Problema:** o GPS comum não necessariamente considera altura do veículo, limite de pontes, viadutos, túneis, peso, largura, comprimento, restrições locais e sentido da via.
- **MVP:** mapa de uma região piloto, cadastro de dimensões e peso do veículo, cálculo de rota para caminhões, comparação entre altura do veículo + margem e `maxheight`/`maxheight:physical` no OSM, exibição de trechos **verificados**, **restritos** e **sem informação**, relatório de pontos duvidosos e aviso para verificar sinalização/autoridades antes de circular.
- **Stack verificável:** MapLibre GL JS (https://github.com/maplibre/maplibre-gl-js), Valhalla (https://github.com/valhalla/valhalla) com `costing=truck`, OpenStreetMap (`maxheight`, `maxweight`, `maxwidth`), dados municipais/concessionárias onde disponíveis; banco PostgreSQL/PostGIS opcional.
- **Teste de 1ª versão:** cadastrar veículo de 4,50 m, demonstrar alertas de restrição quando dados são conhecidos e apresentar trechos **desconhecidos**, sem afirmar que o caminho é seguro.
- **Risco dominante:** faltam alturas e restrições em muitos trechos; manutenção de dados, obras, placas, versões de mapa, responsabilidade sobre orientação. Não lançar como roteador de segurança sem verificação robusta de cada trecho.
- **Licença/custo:** dados OSM ODbL exigem atribuição e demais obrigações; servidores de tiles comunitários não são infraestrutura gratuita garantida para uso pesado/comercial (https://operations.osmfoundation.org/policies/tiles/). Hospedagem de roteamento regional pode consumir RAM/disco/CPU.
- **Complexidade:** alta. **Monetização possível:** plano por frota ou relatórios de planejamento; não implica renda garantida.

## 2. BusRadar — ônibus em movimento + acessibilidade e ponto certo
- **Cliente:** usuários de transporte público, operadores locais e pessoas com mobilidade reduzida.
- **Problema:** incerteza sobre chegada, localização, embarque e acessibilidade.
- **MVP:** mapa de linhas e paradas, consulta ao ponto favorito, posição registrada e horário da última atualização; prioridade para filtro acessível e avisos de estimativa.
- **Fonte:** documentação SPTrans Olho Vivo, posição da frota e previsão; exige cadastro/token e cobertura é São Paulo (https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/).
- **Risco:** competidores fortes, latência de telemetria, credenciais e termos de API; não chamar localização desatualizada de tempo real.
- **Complexidade:** média. **Receita hipotética:** prestação de serviço a operadores/empresas ou versão especializada em acessibilidade.

## 3. ParadaCerta — descanso e apoio a motoristas profissionais
- **Cliente:** motoristas de caminhão/ônibus, transportadoras, estabelecimentos de beira de estrada.
- **MVP:** mapa de locais de descanso com categoria e serviços, filtros de banheiros/estacionamento/chuveiro/horário, informações verificadas e avaliações moderadas.
- **Fonte:** ANTT, pontos de parada e descanso (https://www.gov.br/antt/pt-br/assuntos/rodovias/pontos-de-parada-e-descanso); complementar cadastros autorizados.
- **Risco:** desatualização dos serviços, verificação presencial, moderação e segurança dos usuários.
- **Complexidade:** média. **Receita possível:** assinaturas ou perfis verificados patrocinados identificados.

## 4. ChuvaRadar — mapa de atenção a chuva e alagamentos
- **Cliente:** quem dirige, faz entregas, mora em zonas vulneráveis e administra frotas.
- **MVP:** pontos históricos de risco, dados públicos de chuva/alertas onde disponíveis, contribuição comunitária moderada com idade/certeza do relato, mapa informativo sem prometer rotas seguras.
- **Risco:** falsas denúncias e atrasos dos dados; segurança física — alertar sobre incerteza e orientar a seguir Defesa Civil.
- **Complexidade:** média-alta. **Receita possível:** painéis para frotas, estabelecimentos e cidades.

## 5. MercadoEsperto — estoque/lista e comparação de preços
- **Cliente:** famílias e pequenos mercados.
- **MVP:** leitor de código de barras, catálogo, lista de compras, cálculo da cesta, preços inseridos manualmente/por estabelecimentos parceiros e comparação por data e região.
- **Fonte:** Open Food Facts API v3 para identificar produtos e dados nutricionais (https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/ref-v3/); preços locais **não** estão garantidos, precisam de coleta autorizada/participação.
- **Risco:** preços antigos, disponibilidade, privacidade e consentimento para fotografias de notas.
- **Complexidade:** média. **Receita possível:** parcerias com mercados, não vendendo dados pessoais.

## 6. ObraFácil — estimativa e controle de reforma
- **Cliente:** pedreiros, prestadores de serviço, proprietários e lojas de construção.
- **MVP:** medidas dos cômodos, lista parametrizada de materiais, orçamento editável, recebimentos, checklist e PDF de proposta. IA opcional para preencher itens, sempre conferidos por profissional.
- **Risco:** não dar preço exato sem custos locais; cálculos estruturais exigem responsável técnico.
- **Complexidade:** baixa-média. **Receita possível:** mensalidade para profissionais e equipe.

## 7. FreteVolta — conectar frete de retorno
- **Cliente:** autônomos, pequenas transportadoras e embarcadores.
- **MVP:** publicação de rota, veículo, janela de partida, capacidade e solicitação de orçamento; sem transportar dinheiro na primeira versão.
- **Risco:** verificação de identidade, seguro, roubo de carga, regulamentação, fraudes, privacidade; modelo marketplace precisa de liquidez dos dois lados.
- **Complexidade:** alta. **Receita possível:** assinatura ou taxa de intermediação onde permitido.

## 8. Oficina360 — gestão simples para oficinas
- **Cliente:** oficinas pequenas, mecânicos e funilarias.
- **MVP:** cadastro de clientes/veículos, histórico de ordens de serviço, peças, fotos e autorização por link, orçamento exportável e backup.
- **Risco:** segurança de dados e proteção de dados pessoais; o sistema não substitui laudos profissionais.
- **Complexidade:** baixa-média. **Receita possível:** assinatura por oficina; fácil de pilotar com usuários próximos.

## Critérios de seleção do radar
1. Dor específica e público-alvo definidos.
2. Uma primeira versão viável com dados reais e lícitos, não promessas vazias.
3. Fonte oficial dos componentes e sua licença verificadas antes da adoção.
4. Diferenciar software livre de infraestrutura e APIs gratuitas.
5. Provar utilidade com 5–10 usuários do nicho antes de escalar.
6. Segurança e conformidade por domínio: mapas de restrição física, informações de saúde, dados privados, pagamentos etc.
7. Não duplicar biblioteca; registrar o **produto**, a hipótese de mercado e os componentes técnicos.

## Fontes e licenças
- Valhalla truck API: https://github.com/valhalla/valhalla/blob/master/docs/docs/api/route/api-reference.md
- Tag limite de altura OSM: https://wiki.openstreetmap.org/wiki/Maxheight
- OSM licença e atribuição: https://www.openstreetmap.org/copyright
- OSM tile usage policy: https://operations.osmfoundation.org/policies/tiles/
- MapLibre: https://maplibre.org/maplibre-gl-js/docs/
- SPTrans API: https://www.sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/
- ANTT PPD: https://www.gov.br/antt/pt-br/assuntos/rodovias/pontos-de-parada-e-descanso
- Open Food Facts API: https://openfoodfacts.github.io/documentation/docs/Product-Opener/api/ref-v3/

## Recomendações iniciais
- **Mais fácil para validar e vender a pequenas empresas:** Oficina360 ou ObraFácil (MVP pequeno, sem API obrigatória).
- **Maior diferencial técnico e aderência à ideia fornecida:** RotaAltura, com área piloto limitada e marcação conservadora dos dados desconhecidos.
- **Mais rápido para demonstrar com API real:** BusRadar SPTrans, desde que haja token e qualidade da fonte.
- **Mais arriscado antes de ter rede de usuários:** FreteVolta.
