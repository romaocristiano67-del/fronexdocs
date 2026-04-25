import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="page-title">
          Bom dia, <span>Estudante</span> 👋
        </div>
        <div className="page-sub">
          O que vamos criar hoje? Escolha um tipo de documento abaixo.
        </div>
      </div>

      <div className="section-title">Tipos de Documento</div>
      <div className="doc-grid">
        <Link href="/trabalhos" className="doc-card red">
          <div className="dc-badge">CORE</div>
          <div className="dc-icon">📄</div>
          <div className="dc-title">Trabalhos Escolares</div>
          <div className="dc-sub">Com capa oficial angolana, índice e referências</div>
        </Link>
        <Link href="/curriculos" className="doc-card gold">
          <div className="dc-icon">👤</div>
          <div className="dc-title">Currículo (CV)</div>
          <div className="dc-sub">Templates modernos com foto profissional</div>
        </Link>
        <Link href="/requerimentos" className="doc-card teal">
          <div className="dc-icon">📋</div>
          <div className="dc-title">Requerimento Oficial</div>
          <div className="dc-sub">Linguagem administrativa angolana fiel</div>
        </Link>
        <Link href="/cartas" className="doc-card purple">
          <div className="dc-icon">✉</div>
          <div className="dc-title">Carta Formal</div>
          <div className="dc-sub">Pedido, reclamação, motivação e muito mais</div>
        </Link>
        <Link href="/convites" className="doc-card green">
          <div className="dc-icon">🎉</div>
          <div className="dc-title">Convites</div>
          <div className="dc-sub">Aniversários, formaturas, eventos especiais</div>
        </Link>
        <Link href="/assistente" className="doc-card orange">
          <div className="dc-icon">✦</div>
          <div className="dc-title">Assistente IA</div>
          <div className="dc-sub">Ajuda educacional em todas as matérias</div>
        </Link>
      </div>

      <div className="section-title">Documentos Recentes</div>
      <div className="history-list">
        <div className="history-item">
          <div className="hi-icon red">📄</div>
          <div className="hi-info">
            <div className="hi-name">Trabalho de Química — Ligações Químicas</div>
            <div className="hi-meta">Gerado a 24 de Janeiro · Escola Técnica de Luanda</div>
          </div>
          <div className="hi-actions">
            <button className="hi-btn dl">⬇ PDF</button>
            <button className="hi-btn">DOCX</button>
          </div>
        </div>
        <div className="history-item">
          <div className="hi-icon gold">👤</div>
          <div className="hi-info">
            <div className="hi-name">Currículo Profissional — Template Moderno</div>
            <div className="hi-meta">Gerado a 20 de Janeiro · 3 páginas</div>
          </div>
          <div className="hi-actions">
            <button className="hi-btn dl">⬇ PDF</button>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="section-title">Resumo do Mês</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "2rem" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "6px" }}>Documentos gerados</div>
          <div style={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-1px" }}>7</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "6px" }}>PDFs descarregados</div>
          <div style={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-1px" }}>5</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "6px" }}>Plano actual</div>
          <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--gold)" }}>Gratuito</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
          <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "6px" }}>Gerações restantes</div>
          <div style={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-1px", color: "var(--red-light)" }}>1</div>
        </div>
      </div>
    </div>
  );
}
