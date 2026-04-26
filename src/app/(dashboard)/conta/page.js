"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ContaPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadAccount() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          router.push("/login");
          return;
        }

        setEmail(user.email || "");

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("plan, generations_count, last_generation_date, created_at")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
      } catch (err) {
        setError(err.message || "Falha ao carregar dados da conta.");
      } finally {
        setLoading(false);
      }
    }

    loadAccount();
  }, [router]);

  async function handleSignOut() {
    setIsSigningOut(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      router.push("/login");
      router.refresh();
    } catch (err) {
      setError(err.message || "Não foi possível terminar sessão.");
      setIsSigningOut(false);
    }
  }

  const planNameMap = {
    free: "Gratuito",
    basico: "Básico",
    intermediario: "Intermediário",
    profissional: "Profissional",
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Minha <span>Conta</span></h1>
        <p className="page-sub">Gerencie sessão, plano e uso diário.</p>
      </div>

      <div className="form-card" style={{ maxWidth: "680px" }}>
        {loading ? (
          <p className="page-sub">A carregar dados da conta...</p>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">E-mail</label>
                <input className="form-input" value={email} disabled />
              </div>
              <div className="form-group">
                <label className="form-label">Plano atual</label>
                <input
                  className="form-input"
                  value={planNameMap[profile?.plan] || "Indefinido"}
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Gerações hoje</label>
                <input
                  className="form-input"
                  value={profile?.generations_count ?? 0}
                  disabled
                />
              </div>
              <div className="form-group">
                <label className="form-label">Última geração</label>
                <input
                  className="form-input"
                  value={profile?.last_generation_date || "Sem registos"}
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Conta criada em</label>
              <input
                className="form-input"
                value={profile?.created_at ? new Date(profile.created_at).toLocaleString("pt-PT") : "Sem registo"}
                disabled
              />
            </div>
          </>
        )}

        {error && (
          <div className="text-[var(--red-light)] text-[13px] mt-2 p-3 bg-[rgba(204,26,26,0.1)] border border-[rgba(204,26,26,0.3)] rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          <button type="button" className="nav-btn ghost" onClick={() => router.push("/planos")}>
            Ver Planos
          </button>
          <button
            type="button"
            className="nav-btn primary"
            onClick={handleSignOut}
            disabled={isSigningOut || loading}
          >
            {isSigningOut ? "A terminar sessão..." : "Terminar Sessão"}
          </button>
        </div>
      </div>
    </div>
  );
}
