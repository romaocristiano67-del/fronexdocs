"use client";

import { useState } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";
import ImageUploader from "@/components/ImageUploader";

export default function ConvitesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // ═══ LIVE PREVIEW STATE ═══
  const [previewData, setPreviewData] = useState({
    docType: "convite",
    evento: "",
    anfitriao: "",
    detalhes: "",
    fundo_imagem: "",
  });

  function handleFieldChange(field, value) {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true); setError(null); setRequiresUpgrade(false); setIsDemo(false);
    const formData = new FormData(event.target);
    formData.append("docType", "convite");
    formData.append("fundo_imagem", previewData.fundo_imagem);

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
            🎉 Gerador de <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Convites</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>Aniversários, formaturas, casamentos e eventos especiais.</div>
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">1</div> Detalhes do Evento</div>
          <div className="form-group">
            <label className="form-label">Tipo de Evento</label>
            <input 
              type="text" 
              name="evento" 
              className="form-input" 
              placeholder="Ex: Casamento, Aniversário de 18 Anos, Formatura" 
              value={previewData.evento}
              onChange={(e) => handleFieldChange("evento", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Anfitrião(ões)</label>
            <input 
              type="text" 
              name="anfitriao" 
              className="form-input" 
              placeholder="Ex: A Família Santos convida..." 
              value={previewData.anfitriao}
              onChange={(e) => handleFieldChange("anfitriao", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Data, Hora e Local do Evento</label>
            <textarea 
              name="detalhes" 
              className="form-textarea" 
              placeholder="Ex: Sábado, 25 de Outubro de 2025, às 19h00, no Salão Nobre do Hotel Trópico, Luanda." 
              style={{ minHeight: "80px" }} 
              value={previewData.detalhes}
              onChange={(e) => handleFieldChange("detalhes", e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <ImageUploader 
              label="Fundo Personalizado (Opcional)" 
              value={previewData.fundo_imagem} 
              onChange={(val) => handleFieldChange("fundo_imagem", val)} 
              placeholder="Clique ou arraste uma imagem de fundo (fundo floral, textura, etc.)"
              circle={false}
            />
          </div>
        </div>

        {error && <div style={{ background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.25)", color: "var(--red-light)", padding: "12px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center" }}>{error}</div>}

        <button type="submit" className="generate-btn" disabled={loading || requiresUpgrade}>
          {loading ? <><div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> A criar Convite...</> : <><span>✦</span> Criar Convite Elegante</>}
        </button>
      </form>

      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">
            Pré-visualização do Convite
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