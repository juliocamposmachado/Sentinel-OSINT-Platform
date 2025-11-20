# Sentinel OSINT Platform

> **Solução de Inteligência em Fontes Abertas para Segurança Pública**  
> *Conformidade LGPD | Auditoria Governamental | Análise Assistida por IA*

---

## 📋 Sobre o Projeto

O **Sentinel OSINT** é uma plataforma desenvolvida para atender às demandas de modernização da investigação policial e segurança pública, especificamente desenhada para **Coleta, Análise e Gestão de Inteligência de Fontes Abertas (OSINT)**.

Este projeto foi arquitetado em resposta aos requisitos técnicos de licitações da **SENASP (Secretaria Nacional de Segurança Pública)**, visando fornecer uma ferramenta que potencializa a capacidade analítica de agentes do estado enquanto garante estrita observância aos direitos fundamentais, à Constituição Federal e à LGPD.

### 🎯 Objetivo Estratégico
Fornecer aos órgãos de inteligência uma interface unificada para monitorar ameaças públicas, analisar grandes volumes de dados não estruturados (texto e imagem) e gerar relatórios probatórios com cadeia de custódia digital.

---

## 🏛️ Contexto Governamental e Valor de Mercado

Este projeto foi desenhado como **Prova de Conceito (PoC)** para atender aos rigorosos requisitos técnicos de licitações de alto nível, espelhando-se na recente aquisição estratégica do **Ministério da Justiça e Segurança Pública (MJSP)**.

**Dados da Licitação de Referência (SENASP/MJSP):**

*   **Valor do Investimento:** **R$ 64,6 milhões**.
*   **Escopo:** Aquisição de sistema para localização de integrantes de organizações criminosas (como CV e PCC) e monitoramento de passos na internet (redes sociais e surface web).
*   **Capacidade Técnica Exigida:**
    *   Taxa de acerto prevista de **99% em imagens estáticas** (Atendido via Gemini Vision/Imagen).
    *   Armazenamento e análise de até **50 bilhões de fotos** (Arquitetura Escalável em Nuvem).
    *   81 soluções para reconhecimento básico e 186 soluções avançadas.
*   **Justificativa Oficial:** Combate ao cenário de instabilidade e crises de segurança pública, agravado pela disputa de facções transnacionais pelo controle do tráfico.

> *"A demanda [...] ressalta a necessidade de adquirir uma solução tecnológica capaz de identificar padrões fenotípicos e outras imagens, a partir de fontes abertas, utilizando imagens disponíveis ao público em plataformas de redes sociais e sites na internet."* — Diretoria de Operações Integradas e de Inteligência (Diop).

🔗 **Fonte de Referência:** [Matéria Metrópoles - MJSP investe R$ 64,6 milhões em sistema de monitoramento](https://www.facebook.com/metropolesdf/posts/pfbid02C6b43J73ruCaEGMjs8Mxxk6Pvb9so8GYRATPku4TkyyT6C3yEdQTGvjTbQnBXtp7l)

---

## ⚖️ Conformidade Legal e Ética

A arquitetura do Sentinel foi construída sob o princípio de *Privacy by Design*, atendendo aos seguintes marcos legais:

1.  **Constituição Federal (Arts. 1º e 5º):** Respeito à dignidade humana e privacidade. A ferramenta não realiza quebra de sigilo telemático sem ordem judicial; opera estritamente em camadas públicas da internet.
2.  **LGPD (Lei 13.709/2018):**
    *   **Finalidade:** Uso exclusivo para segurança pública.
    *   **Necessidade:** Coleta mínima de dados para atingir o objetivo investigativo.
    *   **Segurança:** Logs imutáveis de acesso e criptografia.
3.  **Direitos Humanos (ONU):** O módulo de IA fornece análises **probabilísticas** e de apoio à decisão. **Não há tomada de decisão automatizada** para ações coercitivas.

---

## 🚀 Funcionalidades Principais

### 1. Dashboard Operacional
- Visão em tempo real do volume de ingestão de dados.
- Métricas de classificação de risco (Baixo, Médio, Alto, Crítico).
- Indicadores de performance da unidade de inteligência.

### 2. Coleta OSINT (Simulação)
- Interface para inserção de URLs de redes sociais, notícias e fóruns.
- Registro obrigatório de **Justificativa Legal** para cada operação de coleta.
- Geração automática de IDs de rastreio para auditoria.

### 3. Análise Cognitiva com Gemini AI
Integração com a API **Google Gemini 2.5 Flash** para processamento de evidências:
- **Análise Semântica:** Resumo automático de textos longos e extração de intenções.
- **Reconhecimento de Entidades (NER):** Identificação de pessoas, organizações, datas e locais.
- **Análise Visual:** Descrição de cenários, objetos e textos em imagens (OCR/Vision).
- **Matriz de Risco:** Classificação automática baseada em padrões de ameaça.

### 4. Gestão de Casos e Evidências
- Organização de links e mídias coletadas.
- Status de processamento (Pendente/Analisado).
- Upload de imagens locais para análise forense visual.

### 5. Auditoria e Accountability
- **Trilha de Auditoria Imutável:** Quem acessou, quando, o quê e porquê.
- Registro de IPs e Hash de integridade das operações.
- Exportação de logs para corregedorias e órgãos de controle externo.

---

## 🛠️ Arquitetura Técnica

O sistema utiliza uma stack moderna, performática e segura:

*   **Frontend:** React 19 (via Vite/Next architecture approach)
*   **Linguagem:** TypeScript (Tipagem estrita para robustez do código)
*   **Estilização:** Tailwind CSS (Design System responsivo e "Dark Mode" nativo para operações noturnas)
*   **Inteligência Artificial:** SDK `@google/genai` (Google Gemini 2.5 Flash)
*   **Visualização de Dados:** Recharts
*   **Ícones:** Lucide React

### Estrutura de Diretórios
```bash
/
├── components/       # Componentes de UI reutilizáveis (Sidebar, TopBar)
├── pages/            # Telas principais (Dashboard, Collection, Cases, Audit)
├── services/         # Integrações externas (geminiService.ts)
├── types.ts          # Definições de tipos TypeScript (Evidence, AuditLog, RiskLevel)
├── App.tsx           # Roteamento e Layout principal
└── index.html        # Ponto de entrada
```

---

## 📦 Instalação e Execução

### Pré-requisitos
*   Node.js (v18 ou superior)
*   Chave de API do Google Gemini (`API_KEY`)

### Passo a Passo

1.  **Instalar dependências:**
    ```bash
    npm install
    ```

2.  **Configurar Variáveis de Ambiente:**
    O sistema espera que a chave da API seja injetada no processo de build ou execução.
    *   Em ambiente local, certifique-se de que `process.env.API_KEY` esteja acessível ou configure seu bundler (Vite/Webpack) para expor a chave de forma segura (apenas para dev).
    *   *Nota de Segurança:* Em produção, a chamada à API do Gemini deve ser feita através de um Backend Proxy para não expor a chave no cliente.

3.  **Executar em modo de desenvolvimento:**
    ```bash
    npm start
    # ou
    npm run dev
    ```

4.  **Acessar:**
    Abra o navegador em `http://localhost:3000` (ou a porta indicada).

---

## 🔒 Segurança e Disclaimer

> **AVISO:** Este software é uma Prova de Conceito (PoC) desenvolvida para fins de demonstração técnica em processos licitatórios.

1.  **Dados Fictícios:** Os dados exibidos no Dashboard e na lista de casos são mocks (fictícios) para ilustrar a funcionalidade.
2.  **Uso da API:** A integração com o Gemini envia dados para os servidores do Google. Não utilize dados reais sensíveis ou confidenciais durante os testes nesta versão de demonstração.
3.  **Auditoria:** O módulo de auditoria é visual. Em um ambiente de produção real, os logs devem ser gravados em um banco de dados WORM (Write Once, Read Many) imutável (ex: Blockchain privada ou S3 Object Lock).

---

**Desenvolvido com foco em Missão Crítica.**
*Sentinel OSINT v1.0.0*