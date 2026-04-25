"use client";

import { useState } from "react";
import { generateDocAction } from "@/app/actions/generate-doc";
import DocumentRenderer from "@/components/DocumentRenderer";

export default function TrabalhosEscolaresPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDoc, setGeneratedDoc] = useState(null);
  const [requiresUpgrade, setRequiresUpgrade] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setRequiresUpgrade(false);

    const formData = new FormData(event.target);

    try {
      const result = await generateDocAction(formData);

      if (result.error) {
        setError(result.error);
        if (result.requiresUpgrade) {
          setRequiresUpgrade(true);
        }
      } else if (result.success) {
        setGeneratedDoc(result.document);
      }
    } catch (err) {
      setError("Ocorreu um erro ao comunicar com a IA.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gen-layout">
      {/* FOMULÁRIO */}
      <form onSubmit={onSubmit} className="gen-form">
        <div style={{ marginBottom: "4px" }}>
          <div className="page-title" style={{ fontSize: "22px" }}>
            📄 Gerador de <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--gold)" }}>Trabalho Escolar</span>
          </div>
          <div className="page-sub" style={{ fontSize: "13px", marginTop: "4px" }}>
            Preencha os campos abaixo e a IA irá gerar o documento completo automaticamente.
          </div>
        </div>

        {/* CAPA */}
        <div className="form-card">
          <div className="form-card-title">
            <div className="step">1</div> Informações da Capa
          </div>
          <div className="form-group">
            <label className="form-label">Nome da Escola / Instituição</label>
            <input type="text" name="escola" className="form-input" placeholder="Ex: Escola Secundária do Cazenga" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Disciplina</label>
              <select name="disciplina" className="form-select">
                <option>Química</option>
                <option>Física</option>
                <option>Biologia</option>
                <option>Matemática</option>
                <option>História</option>
                <option>Geografia</option>
                <option>Português</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tema do Trabalho</label>
            <input type="text" name="tema" className="form-input" placeholder="Ex: As Ligações Químicas e os seus tipos" required />
          </div>
        </div>

        {/* INTEGRANTES */}
        <div className="form-card">
          <div className="form-card-title">
            <div className="step">2</div> Autores / Integrantes
          </div>
          <div className="form-group">
            <label className="form-label">Nomes (separados por vírgula)</label>
            <input type="text" name="autores" className="form-input" placeholder="Ex: Ana Maria, Carlos Eduardo" required />
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="form-card">
          <div className="form-card-title">
            <div className="step">3</div> Configuração do Conteúdo
          </div>
          <div className="form-group">
            <label className="form-label">O que a IA deve incluir no desenvolvimento?</label>
            <textarea 
              name="instrucoes" 
              className="form-textarea" 
              placeholder="Descreva os pontos principais..." 
              style={{ minHeight: "100px" }}
              required
            ></textarea>
          </div>
        </div>

        {/* ERRO E UPGRADE */}
        {error && (
          <div className="bg-[rgba(204,26,26,0.1)] border border-[rgba(204,26,26,0.3)] text-[var(--red-light)] p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {requiresUpgrade && (
          <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] text-[var(--gold)] p-4 rounded-lg text-sm text-center mb-2 flex flex-col gap-3">
            <p className="font-bold">Atingiu o limite do seu plano.</p>
            <a href="/planos" className="upgrade-btn block w-full text-center py-2" style={{ textDecoration: 'none' }}>
              Fazer Upgrade para Premium
            </a>
          </div>
        )}

        {/* BOTÃO GERAR */}
        <button 
          type="submit" 
          className="generate-btn"
          disabled={loading || requiresUpgrade}
        >
          {loading ? (
            <>
              <div className="spinner" style={{ width: "18px", height: "18px", borderWidth: "2px" }}></div> 
              A gerar com IA...
            </>
          ) : (
            <><span>✦</span> Gerar Trabalho Completo</>
          )}
        </button>
      </form>

      {/* PREVIEW PANEL */}
      <div className="preview-panel">
        <div className="preview-header">
          <div className="preview-title">Pré-visualização do Documento</div>
          <div className="preview-status">
            {loading ? (
              <><div className="status-dot loading"></div><span>A processar...</span></>
            ) : generatedDoc ? (
              <><div className="status-dot ready"></div><span>Pronto</span></>
            ) : (
              <><div className="status-dot"></div><span>A aguardar...</span></>
            )}
          </div>
        </div>
        
        <div className="flex-1 bg-[var(--black)] relative">
          {generatedDoc ? (
             <DocumentRenderer data={generatedDoc} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--text3)] p-8 text-center">
              <div className="text-4xl mb-4 opacity-50">📄</div>
              <p>Preencha o formulário à esquerda e clique em "Gerar Trabalho Completo" para ver o resultado final aqui.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
