"use client";

import { useState, useRef, useEffect } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";

const LOGO_OPTIONS = [
  { value: "insignia", label: "🦅 Insignia de Angola", desc: "Apenas o brasão da República" },
  { value: "escola", label: "🏫 Logo da Escola", desc: "Apenas o logótipo da instituição" },
  { value: "ambos", label: "🦅🏫 Ambos", desc: "Insignia + logo da escola lado a lado" },
];

export default function TrabalhosEscolaresPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [activeSection, setActiveSection] = useState("capa"); // qual secção mostrar no preview
  const previewRef = useRef(null);

  // ═══ LIVE PREVIEW STATE ═══
  const [previewData, setPreviewData] = useState({
    escola: "",
    disciplina: "Língua Portuguesa",
    tema: "",
    autores: "",
    classe: "",
    sala: "",
    turma: "",
    turno: "Manhã",
    curso: "",
    docente: "",
    tipo_logo: "insignia",
  });

  function handleFieldChange(field, value) {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
    // Mostrar capa quando se edita campos da capa
    const capaFields = ["escola", "disciplina", "tema", "autores", "classe", "sala", "turma", "turno", "curso", "docente", "tipo_logo"];
    if (capaFields.includes(field)) setActiveSection("capa");
  }

  // Auto-scroll no preview para a secção ativa
  useEffect(() => {
    if (previewRef.current) {
      const section = previewRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSection, generatedDoc]);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setRequiresUpgrade(false);
    setIsDemo(false);
    setActiveSection("introducao");

    const formData = new FormData(event.target);
    formData.append("docType", "trabalho");
    // Passar dados da capa ao server action
    formData.append("classe", previewData.classe);
    formData.append("sala", previewData.sala);
    formData.append("turma", previewData.turma);
    formData.append("turno", previewData.turno);
    formData.append("curso", previewData.curso);
    formData.append("docente", previewData.docente);
    formData.append("tipo_logo", previewData.tipo_logo);

    try {
      const result = await generateDocAction(formData);
      if (result.error) {
        setError(result.error);
        if (result.requiresUpgrade) setRequiresUpgrade(true);
      } else if (result.success) {
        setGeneratedDoc(result.document);
        if (result.demo) setIsDemo(true);
        setActiveSection("introducao");
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const navSections = generatedDoc
    ? [
        { key: "capa", label: "📄 Capa" },
        { key: "indice", label: "📑 Índice" },
        { key: "introducao", label: "1. Introdução" },
        { key: "conclusao", label: "3. Conclusão" },
        { key: "bibliografia", label: "4. Bibliografia" },
      ]
    : [{ key: "capa", label: "📄 Capa (Live)" }];

  return (
    <div className="gen-layout">
      {/* ════════ FORMULÁRIO ════════ */}
      <form onSubmit={onSubmit} className="gen-form">
        <div>
          <div className="page-title" style={{ fontSize: "22px" }}>
            📄 Gerador de{" "}
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Trabalho Escolar</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>
            Preencha os campos — a capa actualiza-se em tempo real.
          </div>
        </div>

        {/* TIPO DE CAPA */}
        <div className="form-card">
          <div className="form-card-title"><div className="step">1</div> Tipo de Capa</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {LOGO_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                style={{
                  padding: "12px 10px",
                  borderRadius: "10px",
                  border: `2px solid ${previewData.tipo_logo === opt.value ? "var(--gold)" : "var(--border)"}`,
                  background: previewData.tipo_logo === opt.value ? "rgba(212,175,55,0.1)" : "var(--black3)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <input
                  type="radio"
                  name="tipo_logo"
                  value={opt.value}
                  checked={previewData.tipo_logo === opt.value}
                  onChange={(e) => handleFieldChange("tipo_logo", e.target.value)}
                  style={{ display: "none" }}
                />
                <span style={{ fontSize: "20px" }}>{opt.label.split(" ")[0]}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: previewData.tipo_logo === opt.value ? "var(--gold)" : "var(--text2)" }}>
                  {opt.label.slice(opt.label.indexOf(" ") + 1)}
                </span>
                <span style={{ fontSize: "10px", color: "var(--text3)" }}>{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CAPA */}
        <div className="form-card">
          <div className="form-card-title"><div className="step">2</div> Informações da Capa</div>
          <div className="form-group">
            <label className="form-label">Nome da Escola / Instituição</label>
            <input
              type="text" name="escola" className="form-input"
              placeholder="Ex: Instituto Médio Privado de Tecnologias IMPTEL"
              value={previewData.escola}
              onChange={(e) => handleFieldChange("escola", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Disciplina</label>
            <select
              name="disciplina" className="form-select"
              value={previewData.disciplina}
              onChange={(e) => handleFieldChange("disciplina", e.target.value)}
            >
              {["Língua Portuguesa","Química","Física","Biologia","Matemática","História","Geografia","Filosofia","Educação Moral e Cívica","Empreendedorismo","Inglês","Francês","Direito","Economia"].map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tema do Trabalho</label>
            <input
              type="text" name="tema" className="form-input"
              placeholder="Ex: Classe dos Verbos"
              value={previewData.tema}
              onChange={(e) => handleFieldChange("tema", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nomes dos Integrantes (separados por vírgula)</label>
            <input
              type="text" name="autores" className="form-input"
              placeholder="Ex: Ana Maria, Carlos Eduardo, José Santos"
              value={previewData.autores}
              onChange={(e) => handleFieldChange("autores", e.target.value)}
              required
            />
          </div>
        </div>

        {/* DADOS DA TURMA */}
        <div className="form-card">
          <div className="form-card-title"><div className="step">3</div> Dados da Turma</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Classe</label>
              <input type="text" name="classe" className="form-input" placeholder="Ex: 10ª"
                value={previewData.classe} onChange={(e) => handleFieldChange("classe", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Sala</label>
              <input type="text" name="sala" className="form-input" placeholder="Ex: 5"
                value={previewData.sala} onChange={(e) => handleFieldChange("sala", e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Turma</label>
              <input type="text" name="turma" className="form-input" placeholder="Ex: A"
                value={previewData.turma} onChange={(e) => handleFieldChange("turma", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Turno</label>
              <select name="turno" className="form-select"
                value={previewData.turno} onChange={(e) => handleFieldChange("turno", e.target.value)}>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Curso</label>
            <input type="text" name="curso" className="form-input" placeholder="Ex: Informática de Gestão"
              value={previewData.curso} onChange={(e) => handleFieldChange("curso", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Docente / Nome do Professor</label>
            <input type="text" name="docente" className="form-input" placeholder="Ex: Prof. João Manuel"
              value={previewData.docente} onChange={(e) => handleFieldChange("docente", e.target.value)} />
          </div>
        </div>

        {/* CONTEÚDO IA */}
        <div className="form-card">
          <div className="form-card-title"><div className="step">4</div> Conteúdo para a IA</div>
          <div className="form-group">
            <label className="form-label">Pontos principais a incluir na Introdução</label>
            <textarea
              name="instrucoes" className="form-textarea"
              placeholder="Descreva o que quer que a IA aborde na introdução e na conclusão do trabalho..."
              style={{ minHeight: "100px" }}
              required
            ></textarea>
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.25)", color: "var(--red-light)", padding: "12px 16px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center", fontWeight: 500 }}>
            {error}
          </div>
        )}

        {requiresUpgrade && (
          <div style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)", color: "var(--gold)", padding: "16px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontWeight: 700 }}>Atingiu o limite do seu plano.</p>
            <a href="/planos" className="upgrade-btn" style={{ display: "block", width: "100%", textAlign: "center", padding: "10px", textDecoration: "none" }}>✦ Fazer Upgrade para Premium</a>
          </div>
        )}

        <button type="submit" className="generate-btn" disabled={loading || requiresUpgrade}>
          {loading ? (
            <><div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> A gerar com IA...</>
          ) : (
            <><span>✦</span> Gerar Trabalho Completo</>
          )}
        </button>
      </form>

      {/* ════════ PREVIEW ════════ */}
      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">
            Pré-visualização
            {isDemo && (
              <span style={{ marginLeft: "8px", background: "rgba(212,175,55,0.15)", color: "var(--gold)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" }}>DEMO</span>
            )}
          </div>
          <div className="preview-status">
            {loading ? (
              <><div className="status-dot loading"></div><span>A gerar...</span></>
            ) : generatedDoc ? (
              <><div className="status-dot ready"></div><span>Pronto</span></>
            ) : (
              <><div className="status-dot" style={{ background: previewData.tema ? "var(--gold)" : "var(--text3)" }}></div>
              <span>{previewData.tema ? "Live" : "Aguardar"}</span></>
            )}
          </div>
        </div>

        {/* Nav de secções */}
        <div style={{ display: "flex", gap: "4px", padding: "8px 12px", borderBottom: "1px solid var(--border)", overflowX: "auto", flexShrink: 0 }}>
          {navSections.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveSection(s.key)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "none",
                background: activeSection === s.key ? "var(--red)" : "var(--surface3)",
                color: activeSection === s.key ? "#fff" : "var(--text3)",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                fontFamily: "var(--font)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }} ref={previewRef}>
          <DocumentRenderer
            data={generatedDoc}
            previewData={previewData}
            isGenerating={loading}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
}
