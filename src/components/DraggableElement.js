"use client";

import React, { useState, useRef, useEffect } from "react";

export default function DraggableElement({ children, defaultPosition = { x: 0, y: 0 }, onRemove }) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.target.tagName.toLowerCase() === "button" || e.target.tagName.toLowerCase() === "input") return;
    
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    if (onRemove) onRemove();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        display: "inline-block",
        position: "relative",
        userSelect: "none",
        border: isDragging ? "2px dashed rgba(212,175,55,0.8)" : "2px solid transparent",
        transition: isDragging ? "none" : "border 0.2s",
        zIndex: isDragging ? 10 : 1
      }}
      className="draggable-wrapper group"
    >
      {/* Botão de Apagar */}
      <button
        onClick={handleRemove}
        className="absolute -top-3 -right-3 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50 text-[10px] shadow-lg border-2 border-white"
        title="Remover este elemento"
      >
        ✕
      </button>

      {/* Overlay to catch mouse events for children if they are images */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}></div>
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
