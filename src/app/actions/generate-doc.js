"use server"

import { createClient } from "@/utils/supabase/server"

export async function generateDocAction(formData) {
  const supabase = await createClient()

  // 1. Validar utilizador (Desativado temporariamente para preview)
  const { data: { user } } = await supabase.auth.getUser()

  let currentGenerations = 0;
  let today = new Date().toISOString().split('T')[0];

  if (user) {
    // 2. Verificar perfil e créditos
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      const lastGenDate = profile.last_generation_date
      currentGenerations = profile.generations_count

      if (lastGenDate !== today) {
        currentGenerations = 0
      }

      // 4. Regras de plano
      let maxGenerations = 2 // free
      if (profile.plan === 'basico') maxGenerations = 4
      if (profile.plan === 'intermediario') maxGenerations = 10
      if (profile.plan === 'profissional') maxGenerations = 9999

      if (currentGenerations >= maxGenerations) {
        return { error: "Limite diário atingido. Faça upgrade para gerar mais.", requiresUpgrade: true }
      }
    }
  }

  // 5. Obter dados do formulário
  const tema = formData.get("tema")
  const escola = formData.get("escola")
  const disciplina = formData.get("disciplina")
  const autores = formData.get("autores")
  const instrucoes = formData.get("instrucoes")
  
  // 6. Chamada à API da IA
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return { error: "A API Key da OpenAI não está configurada no servidor (.env.local)." }
  }

  const systemPrompt = `És um assistente educativo angolano. Gera um trabalho escolar. Retorna estritamente um JSON com o seguinte formato exato (sem Markdown em volta, apenas o JSON puro):
{
  "capa": {
    "escola": "Nome da escola",
    "disciplina": "Disciplina de X",
    "tema": "Tema do trabalho",
    "autores": "Autores separados por vírgula",
    "docente": "Nome do professor",
    "local_data": "Ex: Luanda, Janeiro de 2025"
  },
  "indice": [
    {"titulo": "1. Introdução"},
    {"titulo": "2. Desenvolvimento"},
    {"titulo": "3. Conclusão"},
    {"titulo": "4. Bibliografia"}
  ],
  "introducao": "texto detalhado da introducao...",
  "desenvolvimento": [
    { "titulo": "2.1 Subtema", "texto": "texto longo e detalhado..." }
  ],
  "conclusao": "texto detalhado da conclusao...",
  "bibliografia": ["Referência 1", "Referência 2"]
}
Usa as regras de escrita de Angola (AO).`

  const userMessage = `Tema: ${tema}
Escola: ${escola}
Disciplina: ${disciplina}
Autores: ${autores}
Instruções: ${instrucoes}`

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const contentString = data.choices[0].message.content;
    const docContent = JSON.parse(contentString);

    let savedId = null;

    if (user) {
      // 7. Atualizar créditos do utilizador
      await supabase
        .from('profiles')
        .update({
          generations_count: currentGenerations + 1,
          last_generation_date: today
        })
        .eq('id', user.id)

      // 8. Salvar no histórico
      const { data: savedDoc } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          type: 'trabalho_escolar',
          title: tema,
          content: docContent
        })
        .select()
        .single()
        
      savedId = savedDoc?.id;
    }

    return { 
      success: true, 
      document: docContent, 
      savedId: savedId,
      generationsCount: currentGenerations + 1 
    }

  } catch (error) {
    return { error: error.message }
  }
}
