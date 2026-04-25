"use client";

import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

// ══════════════════════════════════════════════════════════
// Skeleton Block
// ══════════════════════════════════════════════════════════
function SkeletonBlock({ lines = 4 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }} className="animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ height: "12px", borderRadius: "6px", background: "#e0ddd6", width: `${90 - i * 7}%`, opacity: 0.6 }}></div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Capa Angolana — suporta: insignia | escola | ambos
// ══════════════════════════════════════════════════════════
function CapaAngolana({ capa, tipo_logo }) {
  const INSIGNIA = "🦅"; // fallback emoji; idealmente seria <img> com o brasão real

  const renderHeader = () => {
    if (tipo_logo === "insignia") {
      return (
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "52px", lineHeight: 1 }}>{INSIGNIA}</div>
          <div style={{ fontSize: "9pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#333", marginTop: "4px" }}>REPÚBLICA DE ANGOLA</div>
          <div style={{ width: "80px", height: "2px", background: "#CC1A1A", margin: "6px auto" }}></div>
        </div>
      );
    }
    if (tipo_logo === "escola") {
      return (
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          {/* Placeholder logo da escola — quadrado com inicial */}
          <div style={{ width: "70px", height: "70px", background: "linear-gradient(135deg, #CC1A1A, #8B0000)", borderRadius: "12px", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 900, color: "#fff", boxShadow: "0 4px 16px rgba(204,26,26,0.3)" }}>
            {(capa.escola || "E").charAt(0)}
          </div>
          <div style={{ width: "60px", height: "2px", background: "#CC1A1A", margin: "6px auto" }}></div>
        </div>
      );
    }
    // ambos
    return (
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
          <div style={{ fontSize: "44px", lineHeight: 1 }}>{INSIGNIA}</div>
          <div style={{ width: "2px", height: "60px", background: "#ddd" }}></div>
          <div style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #CC1A1A, #8B0000)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 900, color: "#fff" }}>
            {(capa.escola || "E").charAt(0)}
          </div>
        </div>
        <div style={{ fontSize: "8pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#555", marginTop: "6px" }}>REPÚBLICA DE ANGOLA</div>
        <div style={{ width: "80px", height: "2px", background: "#CC1A1A", margin: "4px auto" }}></div>
      </div>
    );
  };

  return (
    <div style={{ height: "100%", minHeight: "calc(297mm - 5cm)", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "12pt" }}>
      {/* Topo: logo(s) + nome da escola */}
      <div style={{ textAlign: "center" }}>
        {renderHeader()}
        <div style={{ fontSize: "13pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "#111", marginBottom: "2px", transition: "all 0.3s" }}>
          {capa.escola || <span style={{ opacity: 0.3, fontStyle: "italic" }}>Nome da Escola</span>}
        </div>
        <div style={{ fontSize: "10pt", color: "#666", marginBottom: "12px", transition: "all 0.3s" }}>
          {capa.disciplina}
        </div>
      </div>

      {/* Centro: Tema em destaque */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: "9pt", color: "#999", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "12px" }}>TEMA</div>
        <div style={{ fontSize: "18pt", fontWeight: 700, textTransform: "uppercase", color: "#0D0D0D", fontFamily: "var(--serif, serif)", lineHeight: 1.3, transition: "all 0.3s" }}>
          {capa.tema || <span style={{ opacity: 0.2, fontStyle: "italic", fontSize: "14pt" }}>O tema aparece aqui...</span>}
        </div>
      </div>

      {/* Parte inferior esquerda: Classe, Sala, Turma, Turno, Curso + Integrantes */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        {/* Bloco esquerdo: dados da turma + integrantes */}
        <div style={{ fontSize: "10pt", color: "#333", lineHeight: 2 }}>
          {capa.autores && (
            <div style={{ marginBottom: "8px" }}>
              <strong>Integrante(s):</strong><br />
              {capa.autores.split(",").map((a, i) => (
                <div key={i} style={{ paddingLeft: "8px" }}>{a.trim()}</div>
              ))}
            </div>
          )}
          {capa.classe && <div><strong>Classe:</strong> {capa.classe}ª</div>}
          {capa.sala && <div><strong>Sala:</strong> {capa.sala}</div>}
          {capa.turma && <div><strong>Turma:</strong> {capa.turma}</div>}
          {capa.turno && <div><strong>Turno:</strong> {capa.turno}</div>}
          {capa.curso && <div><strong>Curso:</strong> {capa.curso}</div>}
        </div>
      </div>

      {/* Rodapé: Docente + linha de assinatura */}
      <div style={{ borderTop: "1px solid #ddd", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "20px" }}>
        <div style={{ fontSize: "10pt", color: "#444" }}>
          <strong>Docente:</strong> {capa.docente || "___________________________"}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ width: "160px", height: "1px", background: "#555", marginBottom: "4px" }}></div>
          <div style={{ fontSize: "9pt", color: "#888" }}>Assinatura</div>
        </div>
      </div>

      {/* Data e local */}
      <div style={{ textAlign: "center", fontSize: "10pt", color: "#666", marginTop: "12px" }}>
        {capa.local_data}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════
export default function DocumentRenderer({ data, previewData, isGenerating, activeSection, onSectionChange }) {
  const componentRef = useRef(null);
  const sectionRefs = useRef({});
  const scrollContainerRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: data?.capa?.tema || previewData?.tema || "Documento",
  });

  const hasFull = !!data;
  const tipo_logo = previewData?.tipo_logo || data?.tipo_logo || "insignia";

  const capa = data?.capa
    ? {
        ...data.capa,
        classe: previewData?.classe || data.capa.classe,
        sala: previewData?.sala || data.capa.sala,
        turma: previewData?.turma || data.capa.turma,
        turno: previewData?.turno || data.capa.turno,
        curso: previewData?.curso || data.capa.curso,
        docente: previewData?.docente || data.capa.docente,
      }
    : {
        escola: previewData?.escola || "",
        disciplina: previewData?.disciplina || "",
        tema: previewData?.tema || "",
        autores: previewData?.autores || "",
        classe: previewData?.classe || "",
        sala: previewData?.sala || "",
        turma: previewData?.turma || "",
        turno: previewData?.turno || "Manhã",
        curso: previewData?.curso || "",
        docente: previewData?.docente || "",
        local_data: `Luanda, ${new Date().toLocaleDateString("pt-PT", { month: "long", year: "numeric" })}`,
      };

  const hasPreview = previewData && Object.values(previewData).some((v) => v && v !== "insignia" && v !== "Manhã");

  // Auto-scroll para a secção activa
  useEffect(() => {
    if (activeSection && scrollContainerRef.current && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  const setSectionRef = (key) => (el) => {
    sectionRefs.current[key] = el;
  };

  // Estado vazio
  if (!hasPreview && !hasFull) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text3)", padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px", opacity: 0.25 }}>📄</div>
        <p style={{ fontSize: "15px", fontWeight: 500, marginBottom: "8px" }}>Pré-visualização em Tempo Real</p>
        <p style={{ fontSize: "13px", opacity: 0.6 }}>Comece a preencher o formulário para ver a capa aqui.</p>
      </div>
    );
  }

  // Só renderiza trabalho neste componente por agora (outros tipos usam lógica própria)
  const docType = data?.type || previewData?.docType || "trabalho";

  if (docType !== "trabalho") {
    return <div style={{ padding: "32px", color: "var(--text3)" }}>Tipo de documento não suportado aqui.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "0" }}>
      {/* Botão de exportar */}
      {hasFull && (
        <div style={{ padding: "10px 16px", background: "var(--surface)", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <button className="dl-btn dl-pdf" style={{ width: "100%", fontWeight: 700 }} onClick={handlePrint}>
            ⬇ Exportar para PDF
          </button>
        </div>
      )}

      {/* Loading bar */}
      {isGenerating && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", background: "rgba(204,26,26,0.08)", borderBottom: "1px solid rgba(204,26,26,0.2)", color: "var(--red-light)", fontSize: "13px", fontWeight: 500, flexShrink: 0 }}>
          <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }}></div>
          A gerar conteúdo com IA...
        </div>
      )}

      {/* Área de preview com folhas A4 */}
      <div
        ref={scrollContainerRef}
        style={{ flex: 1, overflowY: "auto", background: "#c8c5bd", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}
      >
        <div ref={componentRef} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>

          {/* ═══ CAPA ═══ */}
          <div data-section="capa" ref={setSectionRef("capa")} className="a4-page" onClick={() => onSectionChange?.("capa")} style={{ cursor: "default" }}>
            <CapaAngolana capa={capa} tipo_logo={tipo_logo} />
          </div>

          {/* ═══ ÍNDICE ═══ */}
          <div data-section="indice" ref={setSectionRef("indice")} className="a4-page">
            <div className="doc-section-title">ÍNDICE</div>
            {hasFull && data.indice ? (
              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {data.indice.map((item, idx) => (
                  <div key={idx} className="doc-indice-item">
                    <span>{item.titulo}</span>
                    <div className="dots"></div>
                    <span>{idx + 3}</span>
                  </div>
                ))}
              </div>
            ) : (
              <SkeletonBlock lines={5} />
            )}
          </div>

          {/* ═══ INTRODUÇÃO ═══ */}
          <div data-section="introducao" ref={setSectionRef("introducao")} className="a4-page">
            <div className="doc-section-title">1. INTRODUÇÃO</div>
            {hasFull && data.introducao ? (
              <div className="doc-text" style={{ whiteSpace: "pre-wrap" }}>{data.introducao}</div>
            ) : (
              <SkeletonBlock lines={10} />
            )}
          </div>

          {/* ═══ CONCLUSÃO (página própria) ═══ */}
          <div data-section="conclusao" ref={setSectionRef("conclusao")} className="a4-page">
            <div className="doc-section-title">2. CONCLUSÃO</div>
            {hasFull && data.conclusao ? (
              <div className="doc-text" style={{ whiteSpace: "pre-wrap" }}>{data.conclusao}</div>
            ) : (
              <SkeletonBlock lines={8} />
            )}
          </div>

          {/* ═══ BIBLIOGRAFIA (página própria, separada) ═══ */}
          <div data-section="bibliografia" ref={setSectionRef("bibliografia")} className="a4-page">
            <div className="doc-section-title">3. BIBLIOGRAFIA</div>
            {hasFull && data.bibliografia ? (
              <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                {data.bibliografia.map((ref, idx) => (
                  <li key={idx} style={{ fontSize: "11pt", color: "#333", lineHeight: 1.6 }}>{ref}</li>
                ))}
              </ol>
            ) : (
              <SkeletonBlock lines={5} />
            )}
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          .nav, .sidebar, .gen-form, .dl-btn, [data-noprint] { display: none !important; }
          .a4-page { margin: 0 !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
