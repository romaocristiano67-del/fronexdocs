import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #1d1d1f, #0d0d0d 55%)",
        padding: "24px",
      }}
    >
      <section
        className="form-card"
        style={{
          maxWidth: "760px",
          width: "100%",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div className="logo-icon mx-auto mb-4" style={{ width: 62, height: 62, fontSize: 24, borderRadius: 16 }}>
          FD
        </div>
        <h1 className="page-title" style={{ fontSize: 40, marginBottom: 10 }}>
          Fronex <span>Docs</span>
        </h1>
        <p className="page-sub" style={{ maxWidth: 560, margin: "0 auto 24px" }}>
          Plataforma escolar e profissional com modelos avançados, edição ao estilo Word e exportação pronta para PDF/Word.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="nav-btn primary" style={{ textDecoration: "none", padding: "10px 18px" }}>
            Entrar na Plataforma
          </Link>
          <Link href="/login" className="nav-btn ghost" style={{ textDecoration: "none", padding: "10px 18px" }}>
            Login / Criar Conta
          </Link>
        </div>
      </section>
    </main>
  );
}
