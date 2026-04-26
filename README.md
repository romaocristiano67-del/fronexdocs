## Fronex Docs SaaS

Plataforma SaaS para geração de documentos com IA (trabalhos, currículos, requerimentos, cartas e convites), com autenticação e histórico via Supabase.

## Requisitos

- Node.js 20+
- Projeto Supabase ativo
- (Opcional) Chave OpenAI para geração real de conteúdo

## Configuração local

1. Copie `.env.example` para `.env.local`.
2. Defina:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (opcional; sem ela o sistema usa modo demo)
3. Execute o schema SQL em `database/schema.sql` no editor SQL do Supabase.
4. Instale e rode:

```bash
npm install
npm run dev
```

## Banco de dados

- Tabelas principais:
  - `profiles` (plano e limite diário)
  - `documents` (histórico dos documentos)
- Segurança:
  - RLS ativa nas tabelas
  - Policies por utilizador autenticado
  - Trigger para criação automática de perfil no cadastro

## Qualidade

```bash
npm run lint
npm run build
```

## Deploy no Netlify

1. Conecte o repositório ao Netlify.
2. O arquivo `netlify.toml` já está preparado para Next.js.
3. Defina no painel do Netlify as variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
4. Faça deploy da branch principal.

Se faltar qualquer variável crítica do Supabase, o sistema redireciona para login e evita operação com configuração inválida.
