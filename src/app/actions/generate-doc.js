"use server"

import { createClient } from "@/utils/supabase/server"

// ══════════════════════════════════════════════════════════════
// MODO DEMO — Gera documentos de amostra quando não há API Key
// ══════════════════════════════════════════════════════════════
function generateDemoDocument(docType, formFields) {
  if (docType === "trabalho") {
    return {
      type: "trabalho",
      tipo_logo: formFields.tipo_logo || "insignia",
      capa: {
        escola: formFields.escola || "Instituto Médio Privado de Tecnologias IMPTEL",
        disciplina: formFields.disciplina || "Língua Portuguesa",
        tema: formFields.tema || "Classe dos Verbos",
        autores: formFields.autores || "Estudante Fronex",
        classe: formFields.classe || "10ª",
        sala: formFields.sala || "5",
        turma: formFields.turma || "A",
        turno: formFields.turno || "Manhã",
        curso: formFields.curso || "Informática de Gestão",
        docente: formFields.docente || "Prof. João Manuel",
        local_data: `Luanda, ${new Date().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}`
      },
      indice: [
        { titulo: "1. Introdução" },
        { titulo: "2. Conclusão" },
        { titulo: "3. Bibliografia" }
      ],
      introducao: `O presente trabalho de pesquisa, inserido na disciplina de ${formFields.disciplina || "Língua Portuguesa"}, tem como objectivo central analisar e aprofundar o tema "${formFields.tema || "Classe dos Verbos"}", no contexto do currículo do ensino médio angolano.\n\nA escolha deste tema justifica-se pela sua relevância académica e pelo contributo que o seu estudo representa para a formação integral dos estudantes. Compreender os fundamentos deste assunto é essencial para o desenvolvimento das competências exigidas pelo Ministério da Educação de Angola.\n\nAo longo deste trabalho, procuramos abordar os principais conceitos, definições e aplicações práticas do tema, com base em fontes bibliográficas fidedignas e actualizadas, sempre numa perspectiva crítica e construtiva.`,
      conclusao: `Em síntese, o presente trabalho de pesquisa permitiu uma análise aprofundada e estruturada do tema "${formFields.tema || "Classe dos Verbos"}", consolidando os conhecimentos adquiridos ao longo do processo de aprendizagem na disciplina de ${formFields.disciplina || "Língua Portuguesa"}.\n\nDas análises efectuadas, foi possível concluir que este tema ocupa um lugar de destaque no currículo do ensino médio angolano, sendo indispensável para a formação académica e profissional dos estudantes.\n\nEsperamos que este trabalho contribua, de forma positiva, para o enriquecimento do conhecimento colectivo e sirva de referência para futuras investigações no âmbito desta disciplina.`,
      bibliografia: [
        `MINISTÉRIO DA EDUCAÇÃO DE ANGOLA. Currículo do Ensino Médio — ${formFields.disciplina || "Língua Portuguesa"}. Luanda: INIDE, 2019.`,
        "SILVA, António M. Metodologia do Trabalho Científico. 4ª ed. Lisboa: Edições Sílabo, 2021.",
        "SANTOS, Maria J. Fundamentos da Investigação Académica. Luanda: Editora Escolar, 2020.",
        "UNESCO. Relatório Global sobre Educação e Qualidade de Ensino. Paris: UNESCO Publishing, 2023."
      ]
    };
  }

  if (docType === "curriculo") {
    return {
      type: "curriculo",
      nome: formFields.nome || "Estudante Fronex",
      cargo: formFields.cargo || "Profissional",
      resumo: "Profissional dedicado com experiência comprovada em múltiplas áreas. Capacidade de trabalhar em equipa e de forma autónoma, com forte orientação para resultados e excelência profissional.",
      contactos: { email: "contacto@email.com", telefone: "+244 923 000 000", morada: "Luanda, Angola" },
      experiencia: [
        { empresa: "Empresa Exemplo, Lda.", cargo: "Analista Sénior", periodo: "2021 – Presente", descricao: "Responsável pela gestão de projectos e coordenação de equipas multidisciplinares." },
        { empresa: "StartUp Angola", cargo: "Assistente", periodo: "2019 – 2021", descricao: "Apoio técnico e operacional em diversas áreas da organização." }
      ],
      educacao: [
        { instituicao: "Universidade Agostinho Neto", curso: "Licenciatura em Gestão", periodo: "2015 – 2019" }
      ],
      habilidades: ["Gestão de Projectos", "Microsoft Office", "Comunicação", "Liderança", "Trabalho em Equipa"]
    };
  }

  if (docType === "requerimento") {
    return {
      type: "requerimento",
      entidade_destino: formFields.destino || "Exmo. Senhor Director",
      corpo: `${formFields.nome || "O abaixo-assinado"}, portador(a) do Bilhete de Identidade n.º 000000000LA000, residente em Luanda, vem mui respeitosamente à presença de Vossa Excelência requerer o seguinte:\n\n${formFields.pedido || "O deferimento do presente pedido."}\n\nEste pedido fundamenta-se na necessidade de regularizar a situação acima descrita, em conformidade com as disposições legais em vigor na República de Angola.\n\nNestes termos, confiando na benevolência e no espírito de justiça de Vossa Excelência, aguarda-se o devido deferimento.`,
      fecho: "Pede Deferimento.",
      local_data: `Luanda, aos ${new Date().getDate()} de ${new Date().toLocaleDateString('pt-PT', { month: 'long' })} de ${new Date().getFullYear()}`,
      assinatura: formFields.nome || "O(A) Requerente"
    };
  }

  if (docType === "carta") {
    return {
      type: "carta",
      remetente: formFields.remetente || "Remetente",
      destinatario: formFields.destinatario || "Destinatário",
      assunto: formFields.motivo ? formFields.motivo.substring(0, 60) : "Carta Formal",
      saudacao: "Excelentíssimo(a) Senhor(a),",
      corpo: `Venho por este meio dirigir-me a Vossa Excelência com o propósito de ${formFields.motivo || "expor o assunto em questão"}.\n\nConfio que esta comunicação será recebida com a devida atenção e consideração, e agradeço antecipadamente a disponibilidade de Vossa Excelência para o tratamento desta matéria.`,
      despedida: "Com os melhores cumprimentos,",
      assinatura: formFields.remetente || "Assinatura"
    };
  }

  if (docType === "convite") {
    return {
      type: "convite",
      titulo: formFields.evento || "Evento Especial",
      mensagem: `Temos o prazer de convidar Vossa Excelência para participar neste evento memorável. A sua presença será uma honra para ${formFields.anfitriao || "os anfitriões"}.`,
      data_hora: formFields.detalhes || "A definir",
      local: "Local a confirmar",
      traje: "Traje Social",
      confirmacao: "Confirme a sua presença pelo número +244 923 000 000"
    };
  }

  return { type: docType, error: "Tipo desconhecido" };
}

// ══════════════════════════════════════════════════════════════
// SERVER ACTION PRINCIPAL
// ══════════════════════════════════════════════════════════════
export async function generateDocAction(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  let currentGenerations = 0;
  let today = new Date().toISOString().split('T')[0];

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      const lastGenDate = profile.last_generation_date
      currentGenerations = profile.generations_count
      if (lastGenDate !== today) currentGenerations = 0

      let maxGenerations = 2
      if (profile.plan === 'basico') maxGenerations = 4
      if (profile.plan === 'intermediario') maxGenerations = 10
      if (profile.plan === 'profissional') maxGenerations = 9999

      if (currentGenerations >= maxGenerations) {
        return { error: "Limite diário atingido. Faça upgrade para gerar mais.", requiresUpgrade: true }
      }
    }
  }

  const docType = formData.get("docType");

  // Extrair todos os campos do formulário para um objecto
  const formFields = {};
  for (const [key, value] of formData.entries()) {
    formFields[key] = value;
  }

  // ── Verificar se a API Key está configurada ──
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // ★ MODO DEMO: Gerar documento de amostra
    const demoDoc = generateDemoDocument(docType, formFields);

    if (user) {
      await supabase.from('profiles').update({
        generations_count: currentGenerations + 1,
        last_generation_date: today
      }).eq('id', user.id);

      await supabase.from('documents').insert({
        user_id: user.id,
        type: docType,
        title: formFields.tema || formFields.nome || formFields.remetente || formFields.evento || "Documento",
        content: demoDoc
      });
    }

    return { success: true, document: demoDoc, demo: true, generationsCount: currentGenerations + 1 }
  }

  // ── MODO REAL: Chamar a OpenAI ──
  let systemPrompt = "";
  let userMessage = "";

  if (docType === "trabalho") {
    systemPrompt = `És um assistente educativo angolano especializado em trabalhos escolares. Retorna APENAS um JSON válido (sem markdown) com exactamente esta estrutura:
{
  "type": "trabalho",
  "tipo_logo": "${formFields.tipo_logo || 'insignia'}",
  "capa": {
    "escola": "...",
    "disciplina": "...",
    "tema": "...",
    "autores": "...",
    "classe": "...",
    "sala": "...",
    "turma": "...",
    "turno": "...",
    "curso": "...",
    "docente": "...",
    "local_data": "Luanda, Mês de Ano"
  },
  "indice": [
    {"titulo": "1. Introdução"},
    {"titulo": "2. Conclusão"},
    {"titulo": "3. Bibliografia"}
  ],
  "introducao": "Texto longo e académico da introdução em português angolano (AO), mínimo 4 parágrafos bem desenvolvidos.",
  "conclusao": "Texto longo e académico da conclusão em português angolano (AO), mínimo 3 parágrafos.",
  "bibliografia": ["Referência 1 no formato ABNT", "Referência 2", "Referência 3"]
}
NÃO incluas o campo 'desenvolvimento'. Apenas: introducao, conclusao e bibliografia.`;
    userMessage = `Tema: ${formFields.tema}\nEscola: ${formFields.escola}\nDisciplina: ${formFields.disciplina}\nAutores: ${formFields.autores}\nClasse: ${formFields.classe} | Sala: ${formFields.sala} | Turma: ${formFields.turma} | Turno: ${formFields.turno} | Curso: ${formFields.curso}\nDocente: ${formFields.docente}\nInstruções adicionais: ${formFields.instrucoes}`;
  } else if (docType === "curriculo") {
    systemPrompt = `És um especialista em RH em Angola. Cria um CV profissional. Retorna JSON: { "type":"curriculo", "nome":"...", "cargo":"...", "resumo":"...", "contactos":{"email":"...","telefone":"...","morada":"..."}, "experiencia":[{"empresa":"...","cargo":"...","periodo":"...","descricao":"..."}], "educacao":[{"instituicao":"...","curso":"...","periodo":"..."}], "habilidades":["..."] }`;
    userMessage = `Nome: ${formFields.nome}\nCargo: ${formFields.cargo}\nExperiência: ${formFields.experiencia}\nEducação: ${formFields.educacao}\nHabilidades: ${formFields.habilidades}`;
  } else if (docType === "requerimento") {
    systemPrompt = `És um especialista em redação administrativa angolana. Retorna JSON: { "type":"requerimento", "entidade_destino":"...", "corpo":"texto formal com linguagem culta angolana...", "fecho":"Pede Deferimento.", "local_data":"...", "assinatura":"..." }`;
    userMessage = `Nome: ${formFields.nome}\nDestinatário: ${formFields.destino}\nPedido: ${formFields.pedido}`;
  } else if (docType === "carta") {
    systemPrompt = `És um redator de cartas formais angolano. Retorna JSON: { "type":"carta", "remetente":"...", "destinatario":"...", "assunto":"...", "saudacao":"...", "corpo":"...", "despedida":"...", "assinatura":"..." }`;
    userMessage = `De: ${formFields.remetente}\nPara: ${formFields.destinatario}\nMotivo: ${formFields.motivo}`;
  } else if (docType === "convite") {
    systemPrompt = `És um criador de convites elegantes. Retorna JSON: { "type":"convite", "titulo":"...", "mensagem":"...", "data_hora":"...", "local":"...", "traje":"...", "confirmacao":"..." }`;
    userMessage = `Evento: ${formFields.evento}\nAnfitrião: ${formFields.anfitriao}\nDetalhes: ${formFields.detalhes}`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
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

    const docContent = JSON.parse(data.choices[0].message.content);
    let savedId = null;

    if (user) {
      await supabase.from('profiles').update({
        generations_count: currentGenerations + 1,
        last_generation_date: today
      }).eq('id', user.id);

      const { data: savedDoc } = await supabase.from('documents').insert({
        user_id: user.id,
        type: docType,
        title: formFields.tema || formFields.nome || formFields.remetente || formFields.evento || "Documento",
        content: docContent
      }).select().single();

      savedId = savedDoc?.id;
    }

    return { success: true, document: docContent, savedId, generationsCount: currentGenerations + 1 }

  } catch (error) {
    return { error: error.message }
  }
}
