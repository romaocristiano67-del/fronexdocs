import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let usageCount = 0;
  let maxCount = 2;
  let planLabel = "✦ Plano Gratuito";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      const today = new Date().toISOString().split("T")[0];
      if (profile.last_generation_date === today) {
        usageCount = profile.generations_count;
      }

      if (profile.plan === "basico") { maxCount = 4; planLabel = "✦ Básico"; }
      if (profile.plan === "intermediario") { maxCount = 10; planLabel = "✦ Intermediário"; }
      if (profile.plan === "profissional") { maxCount = 9999; planLabel = "✦ Profissional"; }
    }
  }

  return (
    <>
      <nav className="nav">
        <Link href="/dashboard" className="logo">
          <div className="logo-icon">FD</div>
          <div className="logo-text">
            Fronex <span>Docs</span>
          </div>
        </Link>
        <div className="nav-right">
          <Link href="/planos" className="plan-badge">
            {planLabel}
          </Link>
          <Link href="/conta" className="nav-btn ghost">Conta</Link>
          <Link href="/planos" className="nav-btn primary">
            Fazer Upgrade
          </Link>
        </div>
      </nav>

      <div className="app-layout">
        <Sidebar usageCount={usageCount} maxCount={maxCount} />
        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
