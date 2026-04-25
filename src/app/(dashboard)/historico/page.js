import { createClient } from "@/utils/supabase/server";

export default async function HistoricoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let documents = [];

  if (user) {
    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (data) documents = data;
  }

  const getIcon = (type) => {
    switch(type) {
      case 'trabalho': return { icon: '📄', colorClass: 'red' };
      case 'curriculo': return { icon: '👤', colorClass: 'gold' };
      case 'requerimento': return { icon: '📋', colorClass: 'teal' };
      case 'carta': return { icon: '✉', colorClass: 'purple' };
      case 'convite': return { icon: '🎉', colorClass: 'green' };
      default: return { icon: '📄', colorClass: 'red' };
    }
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">O Meu <span>Histórico</span></h1>
        <p className="page-sub">Todos os documentos que geraste recentemente.</p>
      </div>

      {!user && (
        <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] text-[var(--gold)] p-4 rounded-lg text-sm text-center mb-8">
          Precisas de iniciar sessão para ver o teu histórico real.
        </div>
      )}

      {documents.length === 0 ? (
        <div className="text-center py-20 text-[var(--text3)]">
          <div className="text-5xl mb-4 opacity-50">📂</div>
          <p>Ainda não geraste nenhum documento.</p>
        </div>
      ) : (
        <div className="history-list">
          {documents.map((doc) => {
            const { icon, colorClass } = getIcon(doc.type);
            const dataFomatada = new Date(doc.created_at).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
            
            return (
              <div key={doc.id} className="history-item">
                <div className={`hi-icon ${colorClass}`}>{icon}</div>
                <div className="hi-info">
                  <div className="hi-name">{doc.title}</div>
                  <div className="hi-meta">Gerado a {dataFomatada} · {doc.type.toUpperCase()}</div>
                </div>
                <div className="hi-actions">
                  {/* Para uma implementação completa, seria criar uma rota de visualização tipo /view/id */}
                  <button className="hi-btn dl cursor-not-allowed opacity-50">Ver Detalhes</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}