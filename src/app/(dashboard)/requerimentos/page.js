"use client";

import { useState } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";

export default function RequerimentosPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  // ═══ LIVE PREVIEW STATE ═══
  const [previewData, setPreviewData] = useState({
    docType: "requerimento",
    nome: "",
    destino: "",
    pedido: "",
  });

  function handleFieldChange(field, value) {
    setPreviewData((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true); setError(null); setRequiresUpgrade(false); setIsDemo(false);
    const formData = new FormData(event.target);
    formData.append("docType", "requerimento");

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
            📋 Gerador de <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Requerimento</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>Linguagem formal e administrativa angolana.</div>
        </div>

        <div className="form-card">
          <div className="form-card-title"><div className="step">1</div> Detalhes do Pedido</div>
          <div className="form-group">
            <label className="form-label">O seu Nome (Requerente)</label>
            <input 
              type="text" 
              name="nome" 
              className="form-input" 
              placeholder="Ex: Maria Antonieta da Costa" 
              value={previewData.nome}
              onChange={(e) => handleFieldChange("nome", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Destinatário (Entidade/Cargo)</label>
            <input 
              type="text" 
              name="destino" 
              className="form-input" 
              placeholder="Ex: Senhor Director da Escola Secundária" 
              value={previewData.destino}
              onChange={(e) => handleFieldChange("destino", e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">O que deseja requerer?</label>
            <textarea 
              name="pedido" 
              className="form-textarea" 
              placeholder="Descreva detalhadamente o pedido. Ex: Solicito a segunda via do certificado de habilitações..." 
              style={{ minHeight: "100px" }} 
              value={previewData.pedido}
              onChange={(e) => handleFieldChange("pedido", e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        {error && <div style={{ background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.25)", color: "var(--red-light)", padding: "12px", borderRadius: "var(--radius)", fontSize: "13px", textAlign: "center" }}>{error}</div>}

        <button type="submit" className="generate-btn" disabled={loading || requiresUpgrade}>
          {loading ? <><div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> A gerar Requerimento...</> : <><span>✦</span> Gerar Requerimento Oficial</>}
        </button>
      </form>

      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">
            Pré-visualização do Requerimento
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