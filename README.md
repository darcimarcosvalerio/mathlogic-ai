# 🌟 MathLogic AI: Mentor de Lógica e Algoritmos

> **Status do Projeto:** ✅ Funcional - API Beta (Gemini 2.0 Flash Integrado)

Bem-vindo ao **MathLogic AI**! Este projeto utiliza a inteligência artificial do Google Gemini para transformar conceitos matemáticos complexos em trilhas de aprendizado práticas de lógica de programação. O sistema gera roadmaps personalizados que conectam teoria matemática com aplicações práticas em desenvolvimento de software.

## 👥 Autores
**Darcimarcos Valerio** | [@darcimarcosvalerio](https://github.com/darcimarcosvalerio)

## 📋 Sumário
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Pilha Tecnológica](#-pilha-tecnológica)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [API](#-api)
- [Desenvolvimento](#-desenvolvimento)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🎯 Visão Geral

O MathLogic AI é uma plataforma educacional que combina:
- **Inteligência Artificial**: Google Gemini 2.0 Flash para geração de conteúdo personalizado
- **Arquitetura Moderna**: Backend em Node.js/Fastify + Frontend em Next.js
- **Experiência Robusta**: Sistema com fallback para garantir disponibilidade
- **Validação Estrita**: Tipagem TypeScript + validação Zod

### 🎯 Objetivo
Transformar o aprendizado de matemática e lógica de programação em uma experiência prática e acessível, conectando teoria com aplicações reais no desenvolvimento de software.

## ✨ Funcionalidades

### 🚀 Geração de Roadmaps
- **Personalização**: Roadmaps adaptados ao nível do usuário (iniciante/intermediário/avançado)
- **Integração**: Conecta conceitos matemáticos com lógica de programação
- **Estrutura Completa**: Inclui objetivos, tópicos, exercícios e recursos

### 🛡️ Robustez e Confiabilidade
- **Fallback System**: Funciona mesmo quando a API do Gemini está indisponível
- **Validação**: Entrada de dados rigorosamente validada
- **Tratamento de Erros**: Logs detalhados e respostas consistentes

### 📊 Monitoramento
- **Health Check**: Endpoint para verificação de saúde do sistema
- **Logs Estruturados**: Informações detalhadas sobre operações
- **Métricas**: Status de API e performance

## 🏗️ Arquitetura

```
mathlogic-ai/
├── backend/                 # API Backend (Fastify + TypeScript)
│   ├── src/
│   │   └── server.ts       # Servidor principal e lógica de negócio
│   ├── package.json        # Dependências backend
│   └── .env               # Configurações (GEMINI_API_KEY)
│
├── frontend/               # Interface Web (Next.js + React)
│   ├── app/
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página inicial
│   ├── package.json       # Dependências frontend
│   └── tailwind.config.js # Configuração Tailwind CSS
│
├── docs/                   # Documentação (futuro)
├── tests/                  # Testes (futuro)
├── CHANGELOG.md           # Histórico de mudanças
└── README.md              # Esta documentação
```

### 🏛️ Princípios Arquiteturais

1. **Separação de Responsabilidades**: Backend focado em lógica, frontend em UX
2. **API First**: Design centrado na API REST
3. **Graceful Degradation**: Sistema continua funcional mesmo com falhas
4. **Type Safety**: TypeScript em toda a aplicação
5. **Configuração Externa**: Variáveis de ambiente para configurações sensíveis

## 🛠️ Pilha Tecnológica

| Componente | Tecnologia | Versão | Propósito |
|------------|------------|--------|-----------|
| **Runtime** | Node.js | 20+ | Ambiente de execução |
| **Backend** | Fastify | 5.8.4 | Framework web de alta performance |
| **Frontend** | Next.js | 15.0.0 | Framework React full-stack |
| **Linguagem** | TypeScript | 5.6.3 | Tipagem estática e segurança |
| **IA** | Google Gemini | 2.0 Flash | Geração de conteúdo inteligente |
| **Validação** | Zod | 3.23.8 | Validação de dados |
| **Styling** | Tailwind CSS | 4.0.0 | Framework CSS utilitário |
| **UI Components** | Lucide React | 0.454.0 | Ícones modernos |
| **Markdown** | React Markdown | 9.0.1 | Renderização de conteúdo |

## 📦 Instalação

### Pré-requisitos
- **Node.js** 20+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Chave API Google Gemini** ([Obter](https://ai.google.dev/))

### 🚀 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/darcimarcosvalerio/mathlogic-ai.git
cd mathlogic-ai

# Instalar dependências do backend
cd backend
npm install

# Configurar chave da API
cp .env.example .env
# Edite .env e adicione: GEMINI_API_KEY=sua_chave_aqui

# Instalar dependências do frontend
cd ../frontend
npm install

# Voltar para raiz do projeto
cd ..
```

### 🏃‍♂️ Execução

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Acesse:
- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:3333
- **Health Check**: http://localhost:3333/health

## 📖 Uso

### 🌐 Interface Web
1. Acesse http://localhost:3000
2. Selecione o assunto matemático
3. Escolha o nível de dificuldade
4. Clique em "Gerar Roadmap"
5. Receba um roadmap personalizado

### 🔌 API Direta

```bash
# Exemplo de uso da API
curl -X POST http://localhost:3333/generate-roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Álgebra Linear",
    "level": "intermediário"
  }'
```

## 🔌 API

### Base URL
```
http://localhost:3333 (desenvolvimento)
```

### Endpoints

#### `GET /health`
Verifica a saúde do servidor.

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2026-04-17T12:00:00.000Z",
  "version": "1.0.0"
}
```

#### `POST /generate-roadmap`
Gera um roadmap de estudo personalizado.

**Request:**
```json
{
  "subject": "Cálculo",
  "level": "iniciante"
}
```

**Parâmetros:**
- `subject` (string, obrigatório): Assunto matemático (1-200 caracteres)
- `level` (string, obrigatório): Nível de dificuldade
  - `"iniciante"`
  - `"intermediário"`
  - `"avançado"`

**Resposta de Sucesso:**
```json
{
  "roadmap": "# Cálculo para Iniciantes\n\n## 📚 Visão Geral\n...",
  "subject": "Cálculo",
  "level": "iniciante",
  "timestamp": "2026-04-17T12:00:00.000Z"
}
```

**Resposta de Erro:**
```json
{
  "error": "Dados inválidos",
  "details": "level: Nível deve ser: iniciante, intermediário ou avançado",
  "timestamp": "2026-04-17T12:00:00.000Z"
}
```

### 🛡️ Tratamento de Erros

| Código | Tipo | Descrição |
|--------|------|-----------|
| 200 | Sucesso | Roadmap gerado com sucesso |
| 400 | Dados Inválidos | Parâmetros incorretos |
| 429 | Quota Excedida | Limite de API atingido (fallback ativado) |
| 500 | Erro Interno | Problema no servidor |

### 🔄 Fallback System

Quando a API do Gemini está indisponível (quota excedida, etc.), o sistema automaticamente:
1. **Ativa modo fallback**
2. **Gera conteúdo de demonstração**
3. **Mantém funcionalidade completa**
4. **Registra logs informativos**

## 🧪 Desenvolvimento

### 🏃 Scripts Disponíveis

```bash
# Backend
cd backend
npm run dev          # Desenvolvimento com hot-reload
npm run build        # Build de produção
npm run start        # Executar em produção

# Frontend
cd frontend
npm run dev          # Desenvolvimento
npm run build        # Build otimizado
npm run start        # Servidor de produção
```

### 🧪 Testes

```bash
# Testes básicos (futuro)
npm test

# Testes de integração
npm run test:integration
```

### 🔧 Configuração

#### Variáveis de Ambiente (.env)

```env
# Backend
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
CORS_ORIGIN=*

# API Keys
GEMINI_API_KEY=sua_chave_aqui
```

### 📁 Estrutura de Arquivos

```
backend/src/server.ts
├── Imports e configurações
├── Tipos e schemas (Zod)
├── Configuração inicial
├── Middleware (CORS)
├── Rotas
│   ├── GET /health
│   └── POST /generate-roadmap
├── Inicialização do servidor
└── Graceful shutdown
```

## 🤝 Contribuição

1. **Fork** o projeto
2. **Clone** sua fork: `git clone https://github.com/seu-usuario/mathlogic-ai.git`
3. **Crie** uma branch: `git checkout -b feature/nova-funcionalidade`
4. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
5. **Push** para branch: `git push origin feature/nova-funcionalidade`
6. **Abra** um Pull Request

### 📋 Padrões de Commit
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Google AI** - Pelo SDK Gemini e modelos de IA
- **Fastify** - Framework web de alta performance
- **Next.js** - Framework React moderno
- **Comunidade Open Source** - Por todas as ferramentas utilizadas

---

**⭐ Dê uma estrela se este projeto te ajudou!**

Para dúvidas ou sugestões: [abra uma issue](https://github.com/darcimarcosvalerio/mathlogic-ai/issues)