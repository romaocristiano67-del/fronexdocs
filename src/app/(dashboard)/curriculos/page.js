"use client";

import { useState } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";
import ImageUploader from "@/components/ImageUploader";

export default function CurriculosPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // ═══ LIVE PREVIEW STATE ═══
  const [previewData, setPreviewData] = useState({
    docType: "curriculo",
    nome: "",
    cargo: "",
    habilidades: "",
    layout: "lateral",
    foto: "",
  });

  function handleFieldChange(field, value) {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true); setError(null); setRequiresUpgrade(false); setIsDemo(false);
    const formData = new FormData(event.target);
    formData.append("docType", "curriculo");
    formData.append("layout", previewData.layout);
    formData.append("foto", previewData.foto);

    try {
      const result = await generateDocAction(formData);
      if (result.error) {
        setError(result.error);
        if (result.requiresUpgrade) setRequiresUpgrade(true);
      } else if (result.success) {
        setGeneratedDoc(result.document);
        if (result.demo) setIsDemo(true);
      }
    } catch {
      setError("Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gen-layout">
      <form onSubmit={onSubmit} className="gen-form">
        <div style={{ marginBottom: "4px" }}>
          <div className="page-title" style={{ fontSize: "22px" }}>
            👤 Gerador de <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Currículo (CV)</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>A IA formata o seu percurso profissional num template moderno.</div>
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">1</div> Modelo & Foto</div>
          
          <div className="form-group">
            <label className="form-label">Escolha o Modelo do CV</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {[
                { value: "lateral", label: "Barra Lateral", desc: "Design moderno com barra colorida" },
                { value: "topo", label: "No Topo", desc: "Clássico com destaque no cabeçalho" },
                { value: "sem_foto", label: "Simples", desc: "Clean e direto (sem foto)" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  style={{
                    padding: "12px 10px",
                    borderRadius: "10px",
                    border: `2px solid ${previewData.layout === opt.value ? "var(--gold)" : "var(--border)"}`,
                    background: previewData.layout === opt.value ? "rgba(212,175,55,0.1)" : "var(--black3)",
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
                    name="layout"
                    value={opt.value}
                    checked={previewData.layout === opt.value}
                    onChange={(e) => handleFieldChange("layout", e.target.value)}
                    style={{ display: "none" }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: previewData.layout === opt.value ? "var(--gold)" : "var(--text2)" }}>
                    {opt.label}
                  </span>
                  <span style={{ fontSize: "10px", color: "var(--text3)" }}>{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {previewData.layout !== "sem_foto" && (
            <div style={{ marginTop: "16px" }}>
              <ImageUploader 
                label="Sua Foto (Opcional)" 
                value={previewData.foto} 
                onChange={(val) => handleFieldChange("foto", val)} 
                placeholder="Clique ou arraste a sua melhor foto profissional"
                circle={true}
              />
            </div>
          )}
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">2</div> Dados Pessoais</div>
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input 
              type="text" 
              name="nome" 
              className="form-input" 
              placeholder="Ex: João Manuel da Silva" 
              value={previewData.nome}
              onChange={(e) => handleFieldChange("nome", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Cargo / Função Desejada</label>
            <input 
              type="text" 
              name="cargo" 
              className="form-input" 
              placeholder="Ex: Engenheiro de Software" 
              value={previewData.cargo}
              onChange={(e) => handleFieldChange("cargo", e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">3</div> Perfil Profissional</div>
          <div className="form-group">
            <label className="form-label">Experiência Profissional</label>
            <textarea name="experiencia" className="form-textarea" placeholder="Descreva os seus empregos anteriores, cargos e responsabilidades..." style={{ minHeight: "90px" }} required></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Formação Académica</label>
            <textarea name="educacao" className="form-textarea" placeholder="Ex: Licenciatura em Gestão pela UAN (2015-2019)..." required></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Habilidades e Competências</label>
            <input 
              type="text" 
              name="habilidades" 
              className="form-input" 
              placeholder="Ex: Liderança, Excel, Comunicação, Inglês fluente" 
              value={previewData.habilidades}
              onChange={(e) => handleFieldChange("habilidades", e.target.value)}
              required 
            />
          </div>
        </div>

        {error && <div style={{ background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.25)", color: "var(--red-light)", padding: "12px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center" }}>{error}</div>}

        <button type="submit" className="generate-btn" disabled={loading || requiresUpgrade}>
          {loading ? <><div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> A gerar CV...</> : <><span>✦</span> Gerar Currículo Profissional</>}
        </button>
      </form>

      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">
            Pré-visualização do CV
            {isDemo && <span style={{ marginLeft: "8px", background: "rgba(212,175,55,0.15)", color: "var(--gold)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "99px" }}>DEMO</span>}
          </div>
          <div className="preview-status">
            {loading ? <><div className="status-dot loading"></div><span>A processar...</span></> : generatedDoc ? <><div className="status-dot ready"></div><span>Pronto</span></> : <><div className="status-dot"></div><span>Live Preview</span></>}
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <DocumentRenderer data={generatedDoc} previewData={previewData} isGenerating={loading} />
        </div>
      </div>
    </div>
  );
}