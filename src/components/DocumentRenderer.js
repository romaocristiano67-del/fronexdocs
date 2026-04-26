"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DraggableElement from "./DraggableElement";

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
// Capa Angolana
// ══════════════════════════════════════════════════════════
function CapaAngolana({ capa, tipo_logo, showBorder }) {
  const INSIGNIA = <img src="/insignia.png" alt="Insignia de Angola" style={{ width: "65px", height: "auto", objectFit: "contain" }} />;
  
  const renderEscolaLogo = () => {
    if (capa.escola_logo) {
      return (
        <DraggableElement defaultPosition={{x: 0, y: 0}}>
          <img src={capa.escola_logo} alt="Logo Escola" style={{ width: "70px", height: "70px", objectFit: "contain" }} />
        </DraggableElement>
      );
    }
    return (
      <DraggableElement defaultPosition={{x: 0, y: 0}}>
        <div style={{ width: "70px", height: "70px", background: "linear-gradient(135deg, #CC1A1A, #8B0000)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 900, color: "#fff", boxShadow: "0 4px 16px rgba(204,26,26,0.3)" }}>
          {(capa.escola || "E").charAt(0)}
        </div>
      </DraggableElement>
    );
  };

  const renderHeader = () => {
    const isBoth = tipo_logo === "ambos";
    const hasInsignia = tipo_logo === "insignia" || isBoth;
    const hasLogo = tipo_logo === "escola" || isBoth;

    return (
      <div style={{ textAlign: "center", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
           {hasInsignia && INSIGNIA}
           {isBoth && <div style={{ width: "1px", height: "50px", background: "#ddd" }}></div>}
           {hasLogo && renderEscolaLogo()}
        </div>
        {hasInsignia && <div style={{ fontSize: "10pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#000", marginTop: "8px" }}>REPÚBLICA DE ANGOLA</div>}
        <div style={{ fontSize: "11pt", fontWeight: 700, textTransform: "uppercase", color: "#111", marginTop: "4px" }}>
           {capa.escola || (hasLogo ? "INSTITUTO MÉDIO PRIVADO" : "INSTITUTO MÉDIO")}
        </div>
      </div>
    );
  };

  return (
    <div className={`a4-page ${showBorder ? 'cover-border' : ''}`} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3cm 2cm" }}>
      <div style={{ textAlign: "center" }}>
        {renderHeader()}
        
        <div style={{ marginTop: "40px" }}>
           <div style={{ fontSize: "12pt", fontWeight: 500, textTransform: "uppercase", color: "#333" }}>
              TRABALHO DA DISCIPLINA DE {capa.disciplina?.toUpperCase() || "DISCIPLINA"}
           </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <DraggableElement defaultPosition={{x: 0, y: 0}}>
          <div style={{ fontSize: "9pt", color: "#666", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "10px" }}>TEMA</div>
          <div style={{ fontSize: "20pt", fontWeight: 800, textTransform: "uppercase", color: "#000", fontFamily: "var(--serif, serif)", lineHeight: 1.2 }}>
            {capa.tema || "TÍTULO DO TRABALHO"}
          </div>
        </DraggableElement>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "10pt", color: "#000", textAlign: "left" }}>
           <div style={{ fontWeight: 700, marginBottom: "5px" }}>DADOS DA TURMA:</div>
           <div>CLASSE: {capa.classe || "___"}</div>
           <div>SALA: {capa.sala || "___"}</div>
           <div>TURMA: {capa.turma || "___"}</div>
           <div>TURNO: {capa.turno || "___"}</div>
           <div>CURSO: {capa.curso || "___"}</div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #000", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px" }}>
        <div style={{ fontSize: "10pt" }}>
           <strong>DOCENTE:</strong> {capa.docente || "___________________________"}
        </div>
        <div style={{ textAlign: "center" }}>
           <div style={{ width: "180px", height: "1px", background: "#000", marginBottom: "5px" }}></div>
           <div style={{ fontSize: "9pt" }}>Assinatura</div>
        </div>
      </div>

      <div style={{ textAlign: "center", fontSize: "10pt", color: "#000", marginTop: "15px" }}>
        {capa.local_data || `LUANDA, ${new Date().getFullYear()}`}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Pagina Integrantes
// ══════════════════════════════════════════════════════════
function IntegrantesPage({ autores }) {
   const list = autores ? autores.split(",") : ["Nome do Integrante"];
   return (
      <div className="a4-page" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4cm 2cm" }}>
         <h2 style={{ fontSize: "16pt", fontWeight: 700, borderBottom: "2px solid #000", paddingBottom: "10px", marginBottom: "40px", textTransform: "uppercase" }}>
            INTEGRANTES DO GRUPO
         </h2>
         <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
            {list.map((nome, idx) => (
               <div key={idx} style={{ fontSize: "12pt", borderBottom: "1px dashed #ccc", paddingBottom: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span>{idx + 1}. {nome.trim()}</span>
                  <span style={{ color: "#999" }}>Nº ____</span>
               </div>
            ))}
         </div>
      </div>
   );
}

// ══════════════════════════════════════════════════════════
// Renderizador Trabalho
// ══════════════════════════════════════════════════════════
function TrabalhoRenderer({ data, previewData, setSectionRef, hasFull, showBorder }) {
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
        escola_logo: previewData?.escola_logo || data.capa.escola_logo,
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
        escola_logo: previewData?.escola_logo || "",
        local_data: `Luanda, ${new Date().toLocaleDateString("pt-PT", { month: "long", year: "numeric" }).toUpperCase()}`,
      };

  return (
    <>
      <div data-section="capa" ref={setSectionRef("capa")}>
        <CapaAngolana capa={capa} tipo_logo={tipo_logo} showBorder={showBorder} />
      </div>

      <div data-section="integrantes" ref={setSectionRef("integrantes")}>
         <IntegrantesPage autores={capa.autores} />
      </div>

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

      <div data-section="introducao" ref={setSectionRef("introducao")} className="a4-page">
        <div className="doc-section-title">1. INTRODUÇÃO</div>
        {hasFull && data.introducao ? (
          <div className="doc-text" style={{ whiteSpace: "pre-wrap" }}>{data.introducao}</div>
        ) : (
          <SkeletonBlock lines={10} />
        )}
      </div>

      {/* Conteúdo / Desenvolvimento */}
      {hasFull && data.conteudo && data.conteudo.map((sec, idx) => (
         <div key={idx} className="a4-page">
            <div className="doc-section-title">{sec.titulo.toUpperCase()}</div>
            <div className="doc-text" style={{ whiteSpace: "pre-wrap" }}>{sec.texto}</div>
         </div>
      ))}

      <div data-section="conclusao" ref={setSectionRef("conclusao")} className="a4-page">
        <div className="doc-section-title">3. CONCLUSÃO</div>
        {hasFull && data.conclusao ? (
          <div className="doc-text" style={{ whiteSpace: "pre-wrap" }}>{data.conclusao}</div>
        ) : (
          <SkeletonBlock lines={8} />
        )}
      </div>

      <div data-section="bibliografia" ref={setSectionRef("bibliografia")} className="a4-page">
        <div className="doc-section-title">4. BIBLIOGRAFIA</div>
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
    </>
  );
}

// ══════════════════════════════════════════════════════════
// Outros Renderizadores
// ══════════════════════════════════════════════════════════

function CurriculoRenderer({ data, previewData, hasFull }) {
  const cv = data || {
    nome: previewData?.nome || "",
    cargo: previewData?.cargo || "",
    resumo: "Profissional dedicado, com foco em resultados e melhoria continua.",
    contactos: { email: "email@exemplo.com", telefone: "+244 900 000 000", morada: "Luanda, Angola" },
    habilidades: previewData?.habilidades ? previewData.habilidades.split(",").map((h) => h.trim()) : [],
    experiencia: [],
    educacao: []
  };
  const layout = previewData?.layout || "lateral";
  const foto = previewData?.foto || "";

  const skills = cv.habilidades?.length ? cv.habilidades : ["Comunicação", "Liderança", "Organização"];
  const experiencia = cv.experiencia?.length ? cv.experiencia : [{ empresa: "Empresa Exemplo", cargo: "Cargo", periodo: "2022 - Atual", descricao: "Responsável por operações, acompanhamento de equipa e melhoria contínua." }];
  const educacao = cv.educacao?.length ? cv.educacao : [{ instituicao: "Universidade Exemplo", curso: "Licenciatura", periodo: "2018 - 2022" }];

  if (layout === "topo") {
    return (
      <div className="a4-page" style={{ padding: 0 }}>
        <div style={{ background: "#111", color: "#fff", padding: "28px 36px", display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "92px", height: "92px", borderRadius: "50%", overflow: "hidden", border: "2px solid #D4AF37", background: "#222" }}>
            {foto ? <img src={foto} alt="Foto do candidato" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "24pt" }}>{cv.nome || "NOME COMPLETO"}</h1>
            <p style={{ marginTop: "6px", color: "#D4AF37", fontWeight: 700 }}>{cv.cargo || "Cargo pretendido"}</p>
          </div>
        </div>
        <div style={{ padding: "28px 36px" }}>
          <section style={{ marginBottom: "18px" }}>
            <h3 className="doc-section-title">Resumo Profissional</h3>
            <p className="doc-text">{hasFull ? cv.resumo : "Resumo em processamento..."}</p>
          </section>
          <section style={{ marginBottom: "18px" }}>
            <h3 className="doc-section-title">Experiência</h3>
            {experiencia.map((item, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong>{item.cargo} - {item.empresa}</strong>
                <div style={{ fontSize: "10pt", color: "#666" }}>{item.periodo}</div>
                <p className="doc-text">{item.descricao}</p>
              </div>
            ))}
          </section>
          <section style={{ marginBottom: "18px" }}>
            <h3 className="doc-section-title">Formação</h3>
            {educacao.map((item, i) => (
              <div key={i} className="doc-text">{item.curso} - {item.instituicao} ({item.periodo})</div>
            ))}
          </section>
          <section>
            <h3 className="doc-section-title">Habilidades</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ border: "1px solid #ddd", borderRadius: "14px", padding: "4px 10px", fontSize: "10pt" }}>{skill}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (layout === "sem_foto") {
    return (
      <div className="a4-page" style={{ padding: "2.3cm 2cm 2cm 2.2cm" }}>
        <h1 style={{ margin: 0, fontSize: "26pt", letterSpacing: "-0.5px" }}>{cv.nome || "NOME COMPLETO"}</h1>
        <p style={{ marginTop: "6px", color: "#CC1A1A", fontWeight: 700 }}>{cv.cargo || "Cargo pretendido"}</p>
        <div style={{ marginTop: "12px", fontSize: "10pt", color: "#555" }}>
          {cv.contactos?.email} | {cv.contactos?.telefone} | {cv.contactos?.morada}
        </div>
        <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #ddd" }} />
        <div className="doc-section-title">Resumo</div>
        <p className="doc-text">{hasFull ? cv.resumo : "Resumo em processamento..."}</p>
        <div className="doc-section-title">Experiência Profissional</div>
        {experiencia.map((item, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <strong>{item.cargo} - {item.empresa}</strong>
            <div style={{ fontSize: "10pt", color: "#777" }}>{item.periodo}</div>
            <p className="doc-text">{item.descricao}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="a4-page" style={{ padding: 0 }}>
       <div style={{ display: "flex", height: "100%", background: "#fff" }}>
          {layout === "lateral" && (
             <div style={{ width: "30%", background: "#1a1a1a", color: "#fff", padding: "20px" }}>
                <DraggableElement>
                   {foto ? <img src={foto} alt="Foto do perfil" style={{ width: "100%", borderRadius: "10px" }} /> : <div style={{ height: "150px", background: "#333", borderRadius: "10px" }}></div>}
                </DraggableElement>
                <div style={{ marginTop: "20px", fontSize: "9pt", lineHeight: 1.6 }}>
                   <h3 style={{ borderBottom: "1px solid #D4AF37", paddingBottom: "5px" }}>CONTACTO</h3>
                   <p>{cv.contactos.email}</p>
                   <p>{cv.contactos.telefone}</p>
                   <p>{cv.contactos.morada}</p>
                   <h3 style={{ borderBottom: "1px solid #D4AF37", paddingBottom: "5px", marginTop: "14px" }}>HABILIDADES</h3>
                   {skills.map((skill, i) => <p key={i}>• {skill}</p>)}
                </div>
             </div>
          )}
          <div style={{ flex: 1, padding: "40px" }}>
             <h1 style={{ margin: 0 }}>{cv.nome || "NOME"}</h1>
             <p style={{ color: "#D4AF37", fontWeight: 700 }}>{cv.cargo}</p>
             <div style={{ marginTop: "20px" }}>{hasFull ? <p className="doc-text">{cv.resumo}</p> : <SkeletonBlock lines={5} />}</div>
             <div style={{ marginTop: "12px" }}>
               <h3 className="doc-section-title">Experiência</h3>
               {experiencia.map((item, i) => (
                 <div key={i} style={{ marginBottom: "10px" }}>
                   <strong>{item.cargo} - {item.empresa}</strong>
                   <div style={{ fontSize: "10pt", color: "#666" }}>{item.periodo}</div>
                   <p className="doc-text">{item.descricao}</p>
                 </div>
               ))}
             </div>
          </div>
       </div>
    </div>
  );
}

function ConviteRenderer({ data, previewData, hasFull }) {
  const c = data || { titulo: previewData?.evento || "EVENTO", mensagem: "...", data_hora: previewData?.detalhes || "Data e hora", local: "Local do evento" };
  const cardBackground = previewData?.fundo_imagem ? `url(${previewData.fundo_imagem})` : "linear-gradient(135deg, #faf4e8, #fbeee0)";
  return (
    <div className="a4-page" style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24mm" }}>
       <div style={{ width: "100%", minHeight: "220mm", backgroundImage: cardBackground, backgroundSize: "cover", backgroundPosition: "center", padding: "34px", textAlign: "center", border: "5px double #D4AF37", borderRadius: "14px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
          <DraggableElement>
             <h1 style={{ fontFamily: "serif", fontSize: "30pt", color: "#6c3b18" }}>{c.titulo}</h1>
          </DraggableElement>
          <p style={{ marginTop: "26px", fontSize: "12pt", color: "#3f2c1b", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
            {hasFull ? c.mensagem : "A gerar convite..."}
          </p>
          <div style={{ marginTop: "28px", fontSize: "11pt", color: "#59391f", fontWeight: 600 }}>
            {c.data_hora}
          </div>
          <div style={{ marginTop: "8px", fontSize: "11pt", color: "#70513a" }}>
            {c.local || ""}
          </div>
       </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// EXPORT COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════
export default function DocumentRenderer({ data, previewData, isGenerating, activeSection, onSectionChange }) {
  const componentRef = useRef(null);
  const sectionRefs = useRef({});
  const scrollContainerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [customBlocks, setCustomBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [draftText, setDraftText] = useState("");
  const imageInputRef = useRef(null);

  const docType = data?.type || previewData?.docType || "trabalho";
  const showBorder = previewData?.showCoverBorder || false;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: data?.capa?.tema || previewData?.tema || "Documento",
  });

  const handleExportWord = () => {
    if (!componentRef.current) return;
    const title = data?.capa?.tema || previewData?.tema || "documento";
    const htmlContent = `
      <html>
        <head><meta charset="utf-8"></head>
        <body>${componentRef.current.innerHTML}</body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasFull = !!data;
  const hasPreview = previewData && Object.values(previewData).some(v => v && v !== "insignia" && v !== "Manhã" && v !== docType);

  useEffect(() => {
    const updateScale = () => {
      if (scrollContainerRef.current) {
         const containerWidth = scrollContainerRef.current.clientWidth;
         const a4Width = 210 * 3.78; 
         setScale(Math.min((containerWidth - 60) / a4Width, 1) * (zoom / 100));
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [zoom]);

  useEffect(() => {
    if (activeSection && scrollContainerRef.current && sectionRefs.current[activeSection]) {
      sectionRefs.current[activeSection].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  const setSectionRef = (key) => (el) => { sectionRefs.current[key] = el; };
  const selectedBlock = customBlocks.find((b) => b.id === selectedBlockId);

  const defaultTextStyle = {
    fontSize: 14,
    color: "#111111",
    fontWeight: 400,
    fontStyle: "normal",
    textDecoration: "none",
    textAlign: "left",
  };

  const createTextBlock = () => {
    const id = Date.now();
    const block = {
      id,
      type: "text",
      content: draftText || "Novo bloco de texto editável",
      style: defaultTextStyle,
    };
    setCustomBlocks((prev) => [...prev, block]);
    setSelectedBlockId(id);
  };

  const updateSelectedBlock = (patch) => {
    if (!selectedBlockId) return;
    setCustomBlocks((prev) =>
      prev.map((b) => (b.id === selectedBlockId ? { ...b, ...patch, style: { ...b.style, ...(patch.style || {}) } } : b))
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const id = Date.now();
      setCustomBlocks((prev) => [...prev, { id, type: "image", content: e.target.result, style: { width: 220 } }]);
      setSelectedBlockId(id);
    };
    reader.readAsDataURL(file);
  };

  const renderContent = () => {
    let content = null;
    if (docType === "trabalho") content = <TrabalhoRenderer data={data} previewData={previewData} setSectionRef={setSectionRef} hasFull={hasFull} showBorder={showBorder} />;
    else if (docType === "curriculo") content = <CurriculoRenderer data={data} previewData={previewData} hasFull={hasFull} />;
    else if (docType === "convite") content = <ConviteRenderer data={data} previewData={previewData} hasFull={hasFull} />;
    else content = <div style={{ padding: "40px", background: "white", color: "black", minHeight: "297mm" }}>Serviço {docType} em visualização.</div>;

    return (
       <>
          {content}
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none" }}>
             {customBlocks.map(block => (
                <div key={block.id} style={{ pointerEvents: "auto" }}>
                   <DraggableElement
                      selected={selectedBlockId === block.id}
                      onSelect={() => setSelectedBlockId(block.id)}
                      onRemove={() => {
                        setCustomBlocks((prev) => prev.filter((b) => b.id !== block.id));
                        if (selectedBlockId === block.id) setSelectedBlockId(null);
                      }}
                   >
                      {block.type === 'text' ? (
                         <div
                          contentEditable
                          suppressContentEditableWarning
                          onInput={(e) => {
                            const text = e.currentTarget.innerText;
                            setCustomBlocks((prev) => prev.map((b) => (b.id === block.id ? { ...b, content: text } : b)));
                          }}
                          style={{
                            padding: "10px 12px",
                            fontSize: `${block.style?.fontSize || 14}pt`,
                            minWidth: "160px",
                            maxWidth: "420px",
                            color: block.style?.color || "#111",
                            background: "rgba(255,255,255,0.75)",
                            borderRadius: "8px",
                            outline: "none",
                            fontWeight: block.style?.fontWeight || 400,
                            fontStyle: block.style?.fontStyle || "normal",
                            textDecoration: block.style?.textDecoration || "none",
                            textAlign: block.style?.textAlign || "left",
                            whiteSpace: "pre-wrap",
                          }}
                         >
                           {block.content}
                         </div>
                      ) : (
                         <img src={block.content} alt="Bloco personalizado" style={{ maxWidth: `${block.style?.width || 220}px`, borderRadius: "8px" }} />
                      )}
                   </DraggableElement>
                </div>
             ))}
          </div>
       </>
    );
  };

  if (!hasPreview && !hasFull) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text3)", padding: "32px", textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px", opacity: 0.25 }}>📄</div>
        <p style={{ fontSize: "15px", fontWeight: 500 }}>Pré-visualização {docType.toUpperCase()}</p>
        <p style={{ fontSize: "13px", opacity: 0.6 }}>Preencha o formulário para visualizar.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />

      <div className="doc-toolbar">
        <div className="doc-toolbar-group">
          <input
            className="doc-toolbar-input"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Texto rápido para inserir..."
          />
          <button className="doc-toolbar-btn" onClick={createTextBlock}>+ Texto</button>
          <button className="doc-toolbar-btn" onClick={() => imageInputRef.current?.click()}>+ Imagem</button>
          <button className="doc-toolbar-btn" onClick={() => setZoom((z) => Math.max(60, z - 10))}>-</button>
          <span className="doc-toolbar-chip">{zoom}%</span>
          <button className="doc-toolbar-btn" onClick={() => setZoom((z) => Math.min(150, z + 10))}>+</button>
        </div>

        {selectedBlock?.type === "text" && (
          <div className="doc-toolbar-group">
            <button className="doc-toolbar-btn" onClick={() => updateSelectedBlock({ style: { fontWeight: selectedBlock.style?.fontWeight === 700 ? 400 : 700 } })}>B</button>
            <button className="doc-toolbar-btn" onClick={() => updateSelectedBlock({ style: { fontStyle: selectedBlock.style?.fontStyle === "italic" ? "normal" : "italic" } })}>I</button>
            <button className="doc-toolbar-btn" onClick={() => updateSelectedBlock({ style: { textDecoration: selectedBlock.style?.textDecoration === "underline" ? "none" : "underline" } })}>U</button>
            <select className="doc-toolbar-select" value={selectedBlock.style?.fontSize || 14} onChange={(e) => updateSelectedBlock({ style: { fontSize: Number(e.target.value) } })}>
              {[10, 11, 12, 13, 14, 16, 18, 20, 24].map((n) => <option key={n} value={n}>{n} pt</option>)}
            </select>
            <input type="color" value={selectedBlock.style?.color || "#111111"} onChange={(e) => updateSelectedBlock({ style: { color: e.target.value } })} />
            <select className="doc-toolbar-select" value={selectedBlock.style?.textAlign || "left"} onChange={(e) => updateSelectedBlock({ style: { textAlign: e.target.value } })}>
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>
          </div>
        )}

        {selectedBlock?.type === "image" && (
          <div className="doc-toolbar-group">
            <span className="doc-toolbar-chip">Largura</span>
            <input type="range" min="120" max="420" value={selectedBlock.style?.width || 220} onChange={(e) => updateSelectedBlock({ style: { width: Number(e.target.value) } })} />
          </div>
        )}
      </div>

      {hasFull && (
        <div style={{ padding: "10px", background: "var(--surface)", borderBottom: "1px solid var(--border)", flexShrink: 0, display: "flex", gap: "8px" }}>
          <button className="dl-btn dl-pdf" style={{ width: "100%" }} onClick={handlePrint}>⬇ Exportar PDF</button>
          <button className="dl-btn dl-docx" style={{ width: "100%" }} onClick={handleExportWord}>⬇ Exportar Word</button>
        </div>
      )}

      <div ref={scrollContainerRef} style={{ flex: 1, overflowY: "auto", background: "#c8c5bd", padding: "20px" }}>
        <div ref={componentRef} className="preview-container" style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
