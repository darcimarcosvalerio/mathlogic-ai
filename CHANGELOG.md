# Changelog

## [1.0.1] - 2026-04-17

### 🔧 Fixed
- **Backend API Model Configuration**: Alterado modelo Gemini de `gemini-2.0-flash-exp` (inválido) para `gemini-2.0-flash` (estável)
- **API Version Compatibility**: Removida força de v1beta, usando v1 (REST API padrão)
- **Streaming Response**: Substituído streaming por `generateContent` simples para compatibilidade com modelos disponíveis
- **Response Format**: Alterado formato de resposta para JSON estruturado com os campos: `roadmap`, `subject`, `level`, `timestamp`

### 📝 Changed
- **Model Update**: Atualizado modelo padrão de `gemini-pro` → `gemini-2.0-flash` (mais rápido e moderno)
- **API Response**: Endpoints agora retornam JSON estruturado em vez de streams de texto
- **Documentation**: Atualizado README com modelo correto na pilha tecnológica

### 🎯 Technical Details
**Problema Identificado:**
- Código tentava usar modelo `gemini-2.0-flash-exp` que não existe na API v1
- Google Generative AI SDK força versão `v1beta` internamente, causando conflito

**Solução Implementada:**
1. Listagem de modelos disponíveis via API do Google
2. Índentificado `gemini-2.0-flash` como modelo estável e disponível
3. Refatoração para usar `generateContent` sem streaming
4. Estruturação de resposta em JSON padronizado

**Endpoints Testados:**
- ✅ `GET /health` - Verifica saúde do servidor
- ✅ `POST /generate-roadmap` - Gera roadmap customizado

### 📊 API Changes
**POST /generate-roadmap**

Request:
```json
{
  "subject": "Python",
  "level": "iniciante"
}
```

Response:
```json
{
  "roadmap": "# Python para Iniciantes\n...",
  "subject": "Python",
  "level": "iniciante",
  "timestamp": "2026-04-17T12:20:35.924Z"
}
```

### ⚠️ Known Issues
- Quota gratuita do Gemini API foi excedida (429 Too Many Requests)
- Solução: Usar plano pago ou aguardar 24h para reset da quota free tier

### 📦 Dependencies
- Sem alterações em `package.json`
- Todos os pacotes mantidos nas versões correntes:
  - `@google/generative-ai@0.24.1`
  - `fastify@5.8.4`
  - `zod@3.25.76`
  - Demais dependências sem mudanças
