-- ==========================================================================
-- FRONEX DOCS - Banco de Dados (Supabase)
-- ==========================================================================

-- 1. Criação da Tabela de Perfis (Profiles)
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  plan text NOT NULL DEFAULT 'free', -- 'free', 'basico', 'intermediario', 'profissional'
  generations_count int DEFAULT 0,
  last_generation_date date DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

-- Habilitar RLS (Row Level Security) na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilizadores podem ler o seu próprio perfil" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Utilizadores podem atualizar o seu próprio perfil" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Trigger para criar o profile automaticamente ao registar um user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, plan)
  VALUES (new.id, new.email, 'free');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================================================

-- 2. Criação da Tabela de Documentos (Histórico)
CREATE TABLE public.documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'trabalho', 'curriculo', 'requerimento', etc.
  title text NOT NULL,
  content jsonb NOT NULL, -- Aqui será guardado o JSON gerado pela IA
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS na tabela documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilizadores podem ler os seus próprios documentos" 
ON public.documents FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Utilizadores podem inserir os seus próprios documentos" 
ON public.documents FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilizadores podem deletar os seus próprios documentos" 
ON public.documents FOR DELETE 
USING (auth.uid() = user_id);
