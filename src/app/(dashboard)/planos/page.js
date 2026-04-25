export default function PlanosPage() {
  return (
    <div className="plans-page">
      <div className="page-header text-center">
        <h1 className="page-title" style={{ fontSize: 36 }}>Escolha o seu <span>Plano</span></h1>
        <p className="page-sub">Aceda a mais gerações e recursos avançados de IA.</p>
      </div>

      <div className="plans-grid max-w-5xl mx-auto">
        {/* Plano Gratuito */}
        <div className="plan-card">
          <div className="plan-name">Estudante (Grátis)</div>
          <div className="plan-price">0 Kz<span>/mês</span></div>
          <div className="plan-period">Para sempre</div>
          <ul className="plan-features">
            <li>2 Trabalhos por dia</li>
            <li>Templates base</li>
            <li>Exportação PDF normal</li>
            <li className="muted">Sem acesso a cartas</li>
          </ul>
          <button className="plan-cta outline">Plano Atual</button>
        </div>

        {/* Plano Básico */}
        <div className="plan-card">
          <div className="plan-name text-[var(--text)]">Básico</div>
          <div className="plan-price text-[var(--red-light)]">1.500 Kz<span>/mês</span></div>
          <div className="plan-period">Faturado mensalmente</div>
          <ul className="plan-features">
            <li>4 Documentos por dia</li>
            <li>Todos os templates</li>
            <li>Exportação PDF e Word</li>
            <li>Acesso ao Histórico</li>
          </ul>
          <button className="plan-cta red">Escolher Básico</button>
        </div>

        {/* Plano Intermediário */}
        <div className="plan-card featured">
          <div className="plan-tag">RECOMENDADO</div>
          <div className="plan-name text-[var(--gold)]">Premium</div>
          <div className="plan-price">3.000 Kz<span>/mês</span></div>
          <div className="plan-period">Faturado mensalmente</div>
          <ul className="plan-features">
            <li>10 Documentos por dia</li>
            <li>Assistente IA Ilimitado</li>
            <li>Geração de Currículos Premium</li>
            <li>Suporte Prioritário</li>
          </ul>
          <button className="plan-cta gold">Escolher Premium</button>
        </div>
      </div>
    </div>
  );
}