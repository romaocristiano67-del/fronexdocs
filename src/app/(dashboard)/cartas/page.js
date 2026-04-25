"use client";

import { useState } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";

export default function CartasPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // ═══ LIVE PREVIEW STATE ═══
  const [previewData, setPreviewData] = useState({
    docType: "carta",
    remetente: "",
    destinatario: "",
    motivo: "",
  });

  function handleFieldChange(field, value) {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true); setError(null); setRequiresUpgrade(false); setIsDemo(false);
    const formData = new FormData(event.target);
    formData.append("docType", "carta");

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
            ✉ Gerador de <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Cartas Formais</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>Motivação, demissão, reclamação, pedido formal e muito mais.</div>
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">1</div> Dados da Carta</div>
          <div className="form-group">
            <label className="form-label">Remetente (O seu nome completo)</label>
            <input 
              type="text" 
              name="remetente" 
              className="form-input" 
              placeholder="Ex: José Manuel dos Santos, Luanda" 
              value={previewData.remetente}
              onChange={(e) => handleFieldChange("remetente", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Destinatário</label>
            <input 
              type="text" 
              name="destinatario" 
              className="form-input" 
              placeholder="Ex: Departamento de Recursos Humanos, Empresa Y" 
              value={previewData.destinatario}
              onChange={(e) => handleFieldChange("destinatario", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo / Motivo da Carta</label>
            <textarea 
              name="motivo" 
              className="form-textarea" 
              placeholder="Ex: Carta de motivação para candidatura à vaga de gerente. Tenho 5 anos de experiência na área..." 
              style={{ minHeight: "100px" }} 
              value={previewData.motivo}
              onChange={(e) => handleFieldChange("motivo", e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        {error && <div style={{ background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.25)", color: "var(--red-light)", padding: "12px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center" }}>{error}</div>}

        <button type="submit" className="generate-btn" disabled={loading || requiresUpgrade}>
          {loading ? <><div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> A redigir Carta...</> : <><span>✦</span> Redigir Carta Formal</>}
        </button>
      </form>

      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">
            Pré-visualização da Carta
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