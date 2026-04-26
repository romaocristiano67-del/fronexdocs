"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ usageCount = 0, maxCount = 2 }) {
  const pathname = usePathname();
  const progressPercent = Math.min((usageCount / maxCount) * 100, 100);

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Principal</div>
        <Link
          href="/dashboard"
          className={`sidebar-item ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <span className="si-icon">⊞</span> Dashboard
        </Link>
        <Link
          href="/trabalhos"
          className={`sidebar-item ${pathname === "/trabalhos" ? "active" : ""}`}
        >
          <span className="si-icon">📄</span> Trabalhos Escolares
        </Link>
        <Link
          href="/curriculos"
          className={`sidebar-item ${pathname === "/curriculos" ? "active" : ""}`}
        >
          <span className="si-icon">👤</span> Currículos (CV)
        </Link>
        <Link
          href="/requerimentos"
          className={`sidebar-item ${pathname === "/requerimentos" ? "active" : ""}`}
        >
          <span className="si-icon">📋</span> Requerimentos
        </Link>
        <Link
          href="/cartas"
          className={`sidebar-item ${pathname === "/cartas" ? "active" : ""}`}
        >
          <span className="si-icon">✉</span> Cartas Formais
        </Link>
        <Link
          href="/convites"
          className={`sidebar-item ${pathname === "/convites" ? "active" : ""}`}
        >
          <span className="si-icon">🎉</span> Convites
        </Link>
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <div className="sidebar-label">Ferramentas</div>
        <Link
          href="/assistente"
          className={`sidebar-item ${pathname === "/assistente" ? "active" : ""}`}
        >
          <span className="si-icon">✦</span> Assistente IA
        </Link>
        <Link
          href="/historico"
          className={`sidebar-item ${pathname === "/historico" ? "active" : ""}`}
        >
          <span className="si-icon">📂</span> Histórico
        </Link>
        <Link
          href="/planos"
          className={`sidebar-item ${pathname === "/planos" ? "active" : ""}`}
        >
          <span className="si-icon">💎</span> Planos
        </Link>
        <Link
          href="/conta"
          className={`sidebar-item ${pathname === "/conta" ? "active" : ""}`}
        >
          <span className="si-icon">👤</span> Conta
        </Link>
      </div>

      <div style={{ flex: 1 }}></div>

      <div className="usage-card">
        <div className="usage-label">Gerações usadas hoje</div>
        <div className="usage-bar">
          <div className="usage-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="usage-count">
          <span>{usageCount}</span>/{maxCount} ({maxCount === 2 ? 'Grátis' : 'Premium'})
        </div>
        <Link href="/planos" className="upgrade-btn block text-center" style={{ textDecoration: 'none' }}>
          ✦ Expandir limite
        </Link>
      </div>
    </aside>
  );
}
