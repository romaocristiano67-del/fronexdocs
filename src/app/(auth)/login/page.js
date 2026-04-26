"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const formatAuthError = (message) => {
    const lower = (message || "").toLowerCase();

    if (lower.includes("email rate limit exceeded")) {
      return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
    }
    if (lower.includes("invalid login credentials")) {
      return "E-mail ou palavra-passe inválidos.";
    }
    return message || "Não foi possível concluir a autenticação.";
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setError("Registo efetuado! Verifique o seu e-mail.");
      }
    } catch (err) {
      setError(formatAuthError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md form-card shadow-[var(--shadow-red)]">
      <div className="text-center mb-6">
        <div 
          className="logo-icon mx-auto mb-4" 
          style={{ width: 56, height: 56, fontSize: 24, borderRadius: 16 }}
        >
          FD
        </div>
        <h1 className="page-title" style={{ fontSize: 32 }}>
          Fronex <span>Docs</span>
        </h1>
        <p className="page-sub mt-2">Acesso à plataforma escolar e profissional</p>
      </div>

      <form onSubmit={handleAuth} className="gen-form">
        <div className="text-[12px] text-[var(--text3)] -mt-2 mb-1">
          Dica: se aparecer limite de e-mail, espere 2-5 minutos antes de tentar outra vez.
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-input"
            placeholder="estudante@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Palavra-passe</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="text-[var(--red-light)] text-[13px] mb-2 p-3 bg-[rgba(204,26,26,0.1)] border border-[rgba(204,26,26,0.3)] rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="generate-btn mt-2"
          disabled={loading}
        >
          {loading ? (
            <><div className="spinner" style={{width: 18, height: 18, borderWidth: 2}}></div> A processar...</>
          ) : (
            isLogin ? "Entrar na Conta" : "Criar Conta Grátis"
          )}
        </button>

        <div className="text-center mt-6 text-[13.5px] text-[var(--text3)]">
          {isLogin ? "Ainda não tem conta? " : "Já tem uma conta? "}
          <button 
            type="button" 
            className="text-[var(--gold)] font-medium hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
          >
            {isLogin ? "Registe-se agora" : "Entre aqui"}
          </button>
        </div>
      </form>
    </div>
  );
}
