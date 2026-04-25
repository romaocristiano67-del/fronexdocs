"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function DocumentRenderer({ data }) {
  const componentRef = useRef(null);
  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: data?.capa?.tema || "Documento",
  });

  if (!data) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Botões de Ação */}
      <div className="preview-actions bg-[var(--surface)] p-4 rounded-[var(--radius-lg)] border border-[var(--border)] flex gap-2">
        <button className="dl-btn dl-pdf flex-1 font-bold" onClick={handlePrint}>
          ⬇ Exportar para PDF
        </button>
      </div>

      {/* Visualização do Documento */}
      <div className="preview-body bg-[#e8e8e8] p-4 md:p-8 rounded-[var(--radius-lg)] overflow-y-auto max-h-[75vh] flex flex-col items-center">
        <div ref={componentRef} className="print-container w-full flex flex-col items-center">
          
          {/* Folha 1: Capa */}
          <div className="a4-page">
            <div className="doc-capa h-full flex flex-col justify-between items-center text-center">
              <div className="mt-8">
                <div className="doc-brasao mx-auto">🦅</div>
                <div className="doc-escola font-bold text-xl uppercase mb-1">{data.capa.escola}</div>
                <div className="text-[10pt] text-gray-500 mb-2">República de Angola</div>
                <div className="doc-divisoria my-4"></div>
                <div className="doc-disciplina text-lg text-gray-700">{data.capa.disciplina}</div>
                <div className="text-[9pt] text-gray-500 mt-2">TRABALHO DE PESQUISA</div>
              </div>
              
              <div className="doc-tema text-3xl font-bold uppercase my-12" style={{ fontFamily: "var(--serif)" }}>
                {data.capa.tema}
              </div>
              
              <div className="w-full flex justify-end mt-auto mb-12">
                <div className="doc-autores text-right text-lg">
                  Apresentado por:<br/>
                  <strong>
                    {data.capa.autores.split(',').map((a, i) => (
                      <React.Fragment key={i}>
                        {a.trim()}<br/>
                      </React.Fragment>
                    ))}
                  </strong>
                </div>
              </div>

              <div className="doc-footer-info border-t border-gray-300 pt-4 w-full">
                Docente: {data.capa.docente}<br/>
                {data.capa.local_data}
              </div>
            </div>
          </div>

          {/* Folha 2: Índice */}
          <div className="a4-page">
            <div className="doc-section-title text-xl font-bold border-b pb-2 mb-6 uppercase">ÍNDICE</div>
            <div className="mt-8 flex flex-col gap-4">
              {data.indice.map((item, idx) => (
                <div key={idx} className="doc-indice-item flex justify-between text-lg">
                  <span>{item.titulo}</span>
                  <div className="dots flex-1 border-b border-dotted border-gray-400 mx-4 relative top-[-6px]"></div>
                  <span>{idx + 3}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Folha 3: Introdução e Desenvolvimento */}
          <div className="a4-page">
            <div className="doc-section-title text-xl font-bold border-b pb-2 mb-6 uppercase">1. INTRODUÇÃO</div>
            <div className="doc-text text-justify text-lg mb-10 leading-relaxed whitespace-pre-wrap">{data.introducao}</div>
            
            <div className="doc-section-title text-xl font-bold border-b pb-2 mb-6 uppercase mt-12">2. DESENVOLVIMENTO</div>
            {data.desenvolvimento.map((sec, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="font-bold text-lg mb-3">{sec.titulo}</h3>
                <div className="doc-text text-justify text-lg leading-relaxed whitespace-pre-wrap">{sec.texto}</div>
              </div>
            ))}
          </div>

          {/* Folha 4: Conclusão e Bibliografia */}
          <div className="a4-page">
            <div className="doc-section-title text-xl font-bold border-b pb-2 mb-6 uppercase">3. CONCLUSÃO</div>
            <div className="doc-text text-justify text-lg leading-relaxed mb-10 whitespace-pre-wrap">{data.conclusao}</div>

            <div className="doc-section-title text-xl font-bold border-b pb-2 mb-6 uppercase mt-12">4. BIBLIOGRAFIA</div>
            <ul className="list-disc pl-8 mt-4">
              {data.bibliografia.map((ref, idx) => (
                <li key={idx} className="text-lg text-[#333] mb-3">{ref}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .preview-body {
            background: white !important;
            padding: 0 !important;
            overflow: visible !important;
            max-height: none !important;
          }
          .print-container {
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}
