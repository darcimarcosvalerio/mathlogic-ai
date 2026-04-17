# 🌟 MathLogic AI: Mentor de Lógica e Algoritmos

> **Status do Projeto:** ✅ Funcional - API Beta (Gemini 2.0 Flash Integrado)

Bem-vindo ao **MathLogic AI**! Este projeto utiliza a inteligência do Google Gemini para transformar conceitos matemáticos complexos em trilhas de aprendizado de lógica de programação, entregando o conteúdo via Streaming para uma experiência em tempo real.

## 👥 Autores
**Darcimarcos Valerio** | [@darcimarcosvalerio](https://github.com/darcimarcosvalerio)

## 🛠️ Pilha Tecnológica

| Ambiente | Ferramentas |
| :--- | :--- |
| **Runtime** | Node.js e Fastify (API de alta performance) |
| **Linguagem** | TypeScript (Tipagem estrita e segurança) |
| **Inteligência** | SDK GenAI do Google (Gemini 2.0 Flash) |
| **Interface** | Next.js 15, React 19 e Tailwind CSS v4 |
| **Validação** | Zod (Garantia de integridade dos dados) |

## 🏗️ Arquitetura do Projeto
A estrutura segue o padrão monorepo simplificado, separando as responsabilidades de forma clara:

```text
/mathlogic-ai
├── /backend      # API Fastify + Integração Google GenAI (Lógica de Negócio)
└── /frontend     # Interface Next.js 15 + Tailwind (Experiência do Usuário)