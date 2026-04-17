import { fastify, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { GoogleGenerativeAI, GoogleGenerativeAIError } from '@google/generative-ai';
import { z, ZodError } from 'zod';
import 'dotenv/config';

// ============================================================================
// TIPOS E SCHEMAS
// ============================================================================

interface RoadmapRequest {
  subject: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
}

interface ErrorResponse {
  error: string;
  details?: string;
  timestamp: string;
}

// Schema de validação para requisições
const RoadmapRequestSchema = z.object({
  subject: z.string()
    .min(1, 'Assunto não pode estar vazio')
    .max(200, 'Assunto muito longo'),
  level: z.enum(['iniciante', 'intermediário', 'avançado'], {
    errorMap: () => ({ message: 'Nível deve ser: iniciante, intermediário ou avançado' })
  })
});

// ============================================================================
// CONFIGURAÇÃO E INICIALIZAÇÃO
// ============================================================================

const PORT = parseInt(process.env.PORT || '3333', 10);
const HOST = process.env.HOST || '0.0.0.0';
const API_KEY = process.env.GEMINI_API_KEY;

// Validar chave de API
if (!API_KEY) {
  console.error('[ERROR] Variável de ambiente GEMINI_API_KEY não configurada');
  process.exit(1);
}

const app: FastifyInstance = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

// Inicializar SDK do Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Registrar CORS
app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
  maxAge: 86400
});

// ============================================================================
// ROTAS
// ============================================================================

/**
 * Health Check - Verifica se o servidor está rodando
 */
app.get('/health', async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * Gera um roadmap de estudo customizado
 * POST /generate-roadmap
 * 
 * Body:
 * {
 *   "subject": "Álgebra Linear",
 *   "level": "intermediário"
 * }
 */
app.post<{ Body: RoadmapRequest }>(
  '/generate-roadmap',
  async (request: FastifyRequest<{ Body: RoadmapRequest }>, reply: FastifyReply) => {
    try {
      // -----------------------------------------------------------------------
      // VALIDAÇÃO DE ENTRADA
      // -----------------------------------------------------------------------
      let validatedData: RoadmapRequest;
      try {
        validatedData = RoadmapRequestSchema.parse(request.body);
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors
            .map(err => `${err.path.join('.')}: ${err.message}`)
            .join('; ');
          
          return reply.status(400).send({
            error: 'Dados inválidos',
            details: errorMessages,
            timestamp: new Date().toISOString()
          } as ErrorResponse);
        }
        throw error;
      }

      const { subject, level } = validatedData;

      console.log(`[INFO] Gerando roadmap para: ${subject} (${level})`);

      // -----------------------------------------------------------------------
      // INICIALIZAR MODELO
      // -----------------------------------------------------------------------
      // Mock para demonstração quando quota está excedida
      const mockRoadmap = (subject: string, level: string): string => {
        const levelText = {
          'iniciante': 'beginner level',
          'intermediário': 'intermediate level',
          'avançado': 'advanced level'
        }[level] || 'intermediate level';

        return `# ${subject} Study Roadmap - ${levelText}

## 📚 Overview
This is a comprehensive study roadmap for "${subject}" at ${levelText}.

## 🎯 Learning Objectives
- Understand fundamental concepts of ${subject}
- Apply practical examples and exercises
- Develop problem-solving skills
- Master advanced applications

## 📖 Core Topics

### Phase 1: Foundations
- Basic terminology and concepts
- Historical context
- Real-world applications

### Phase 2: Practical Skills
- Hands-on exercises
- Code examples and demonstrations
- Problem-solving techniques

### Phase 3: Advanced Concepts
- Complex applications
- Integration with other domains
- Project-based learning

## 💻 Practical Exercises
\`\`\`
// Example exercises for ${subject}
1. Basic concept implementation
2. Intermediate problem-solving
3. Advanced project work
\`\`\`

## 📚 Learning Resources
- Online courses and tutorials
- Books and documentation
- Community forums and discussions
- Practice problems and challenges

## 🎓 Assessment
- Regular quizzes
- Practical projects
- Real-world applications
- Peer review and feedback

---
**Note**: This is a demo roadmap. Connect your Gemini API key for personalized, AI-generated content.`;
      };

      // Tentar usar a API, com fallback para mock
      let roadmapContent: string;
      
      try {
        // -----------------------------------------------------------------------
        // INICIALIZAR MODELO
        // -----------------------------------------------------------------------
        // Usando gemini-2.0-flash (modelo rápido e estável)
        const model = genAI.getGenerativeModel(
          { model: 'gemini-2.0-flash' }
        );

        // -----------------------------------------------------------------------
        // CONSTRUIR PROMPT
        // -----------------------------------------------------------------------
        const levelDescriptions: Record<string, string> = {
          'iniciante': 'beginner (with basics and fundamentals)',
          'intermediário': 'intermediate (with practical applications)',
          'avançado': 'advanced (with complex concepts and implementations)'
        };

        const prompt = `You are an expert mathematics and programming teacher.

Create a detailed study roadmap that connects the mathematical topic "${subject}" 
with programming logic concepts at the ${levelDescriptions[level]} level.

Format the response in Markdown with:
- Clear sections and subsections
- Learning objectives
- Key concepts
- Practical exercises
- Code examples (if applicable)
- Resources for further learning

Be specific, engaging, and practical.`;

        // -----------------------------------------------------------------------
        // GERAR CONTEÚDO
        // -----------------------------------------------------------------------
        const result = await model.generateContent(prompt);
        const response = result.response;
        roadmapContent = response.text();
        console.log(`[SUCCESS] Roadmap gerado com sucesso para: ${subject}`);
      } catch (apiError) {
        // Usar mock se API falhar
        console.warn(`[WARN] API indisponível, usando mock para ${subject}`);
        console.warn(`[WARN] Erro: ${apiError instanceof Error ? apiError.message : String(apiError)}`);
        roadmapContent = mockRoadmap(subject, level);
      }

      return reply.send({
        roadmap: roadmapContent,
        subject,
        level,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      // -----------------------------------------------------------------------
      // TRATAMENTO DE ERROS
      // -----------------------------------------------------------------------
      const errorResponse: ErrorResponse = {
        error: 'Falha ao gerar conteúdo',
        timestamp: new Date().toISOString()
      };

      if (error instanceof GoogleGenerativeAIError) {
        console.error(`[ERROR] Erro da API Google: ${error.message}`);
        errorResponse.details = `API Error: ${error.message}`;
        return reply.status(500).send(errorResponse);
      }

      if (error instanceof Error) {
        console.error(`[ERROR] Erro: ${error.message}`);
        errorResponse.details = error.message;
      } else {
        console.error('[ERROR] Erro desconhecido', error);
        errorResponse.details = 'Erro desconhecido no servidor';
      }

      return reply.status(500).send(errorResponse);
    }
  }
);

/**
 * Rota catch-all para endpoints não encontrados
 */
app.setNotFoundHandler(async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(404).send({
    error: 'Endpoint não encontrado',
    path: request.url,
    method: request.method,
    timestamp: new Date().toISOString()
  } as ErrorResponse);
});

// ============================================================================
// INICIALIZAR SERVIDOR
// ============================================================================

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║          Backend Started Successfully!                    ║
║                                                           ║
║  Status: Running                                          ║
║  Host: ${HOST.padEnd(50)}║
║  Port: ${String(PORT).padEnd(50)}║
║  API Version: v1 (REST)                            ║
║  Model: gemini-2.0-flash                           ║
║                                                           ║
║  Available Endpoints:                                     ║
║  • GET  /health                 - Health check            ║
║  • POST /generate-roadmap       - Generate study roadmap  ║
║                                                           ║
║  Server: http://${HOST}:${PORT}                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
  } catch (error) {
    console.error('[ERROR] Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

process.on('SIGINT', async () => {
  console.log('\n[INFO] Encerrando servidor...');
  await app.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n[INFO] Encerrando servidor...');
  await app.close();
  process.exit(0);
});

// ============================================================================
// INICIAR
// ============================================================================

start();