"use client";

import { useState, useRef, useCallback } from "react";

/**
 * Componente de upload de imagem reutilizável
 * @param {string} label - Label do campo
 * @param {string} value - URL/DataURL da imagem actual
 * @param {function} onChange - Callback com a dataURL
 * @param {string} placeholder - Texto do placeholder
 * @param {boolean} circle - Se true, mostra preview circular (foto de perfil)
 */
export default function ImageUploader({ label, value, onChange, placeholder = "Clique ou arraste uma imagem", circle = false }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleChange = useCallback((e) => {
    processFile(e.target.files[0]);
  }, [processFile]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && <label className="form-label">{label}</label>}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "var(--gold)" : value ? "rgba(212,175,55,0.4)" : "var(--border)"}`,
          borderRadius: circle ? "50%" : "10px",
          background: dragging ? "rgba(212,175,55,0.06)" : value ? "transparent" : "var(--black3)",
          cursor: "pointer",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          width: circle ? "100px" : "100%",
          height: circle ? "100px" : "80px",
          alignSelf: circle ? "center" : "auto",
        }}
      >
        {value ? (
          <img src={value} alt="upload" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ textAlign: "center", color: "var(--text3)", fontSize: "12px", padding: "8px" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>📎</div>
            <div>{placeholder}</div>
          </div>
        )}
        {value && (
          <button
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
            style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >×</button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleChange} />
    </div>
  );
}
