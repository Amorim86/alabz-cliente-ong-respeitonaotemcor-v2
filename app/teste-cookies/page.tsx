"use client";

import { useEffect, useState } from "react";
import CookieBanner from "@/components/CookieBanner";

const STORAGE_KEY = "alabz_cookies_accepted";

export default function TesteCookiesPage() {
  const [cookieStatus, setCookieStatus] = useState<string | null>("carregando...");
  const [apiStatus, setApiStatus] = useState<string>("não testada");
  const [testingApi, setTestingApi] = useState(false);

  // Função para ler o estado atual do localStorage
  const atualizarStatus = () => {
    if (typeof window !== "undefined") {
      const valor = localStorage.getItem(STORAGE_KEY);
      setCookieStatus(valor === null ? "não definido (banner deve aparecer)" : valor);
    }
  };

  useEffect(() => {
    atualizarStatus();
    
    // Atualiza o status se o evento de aceite for disparado na página
    const handleConsent = () => {
      atualizarStatus();
    };
    
    window.addEventListener("alabz_cookies_accepted", handleConsent);
    return () => window.removeEventListener("alabz_cookies_accepted", handleConsent);
  }, []);

  // Limpa o localStorage e recarrega a página para exibir o banner
  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    atualizarStatus();
    window.location.reload();
  };

  // Testa o endpoint da API de submissão localmente
  const testarAPI = async () => {
    setTestingApi(true);
    setApiStatus("enviando...");
    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clienteId: "alabz-teste-cookies",
          form_type: "cookies_consent",
          payload: { accepted: true, test: true, date: new Date().toISOString() },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setApiStatus(`Sucesso! Servidor respondeu: "${data.message}"`);
      } else {
        setApiStatus(`Erro ${res.status}: ${data.error || "Erro desconhecido"}`);
      }
    } catch (err) {
      setApiStatus(`Erro de rede: ${String(err)}`);
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <main style={{
      fontFamily: "system-ui, sans-serif",
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      background: "#0c0c0c",
      color: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    }}>
      <div style={{ borderBottom: "1px solid #222", paddingBottom: "1rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0, color: "#d9a928" }}>
          🧪 Laboratório de Testes — Banner de Cookies & UTMs
        </h1>
        <p style={{ color: "#a49d92", fontSize: "0.9rem", marginTop: "0.5rem" }}>
          Esta página serve para testar o comportamento visual e o funcionamento do consentimento sem precisar abrir o console do desenvolvedor.
        </p>
      </div>

      {/* Painel de Controle de Estado */}
      <div style={{
        background: "#121212",
        border: "1px solid #222",
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem"
      }}>
        <h2 style={{ fontSize: "1.1rem", margin: 0, color: "#fff", borderBottom: "1px solid #222", paddingBottom: "0.5rem" }}>
          Painel de Estado (Navegador)
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.8rem", fontSize: "0.85rem" }}>
          <div style={{ color: "#a49d92" }}>Chave LocalStorage:</div>
          <div>
            <code style={{
              background: cookieStatus === "true" ? "#1b4d22" : cookieStatus === "false" ? "#7f1d1d" : "#222",
              padding: "4px 8px",
              borderRadius: "4px",
              color: "#fff",
              fontWeight: "bold"
            }}>
              {cookieStatus}
            </code>
          </div>

          <div style={{ color: "#a49d92" }}>Status da Rota de API:</div>
          <div style={{ color: apiStatus.includes("Sucesso") ? "#4ade80" : apiStatus.includes("Erro") ? "#f87171" : "#a49d92" }}>
            {apiStatus}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
          <button
            onClick={handleReset}
            style={{
              background: "#d9a928",
              color: "#000",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.8rem"
            }}
          >
            🔄 Resetar e Limpar Cookies (Forçar Banner)
          </button>

          <button
            onClick={testarAPI}
            disabled={testingApi}
            style={{
              background: "#222",
              color: "#fff",
              border: "1px solid #444",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "0.8rem"
            }}
          >
            ⚡ Testar Rota de Envio ao Firestore
          </button>
        </div>
      </div>

      {/* Dicas de Como Testar UTMs */}
      <div style={{
        background: "#121212",
        border: "1px solid #222",
        borderRadius: "8px",
        padding: "1.5rem",
        fontSize: "0.85rem",
        lineHeight: "1.6",
        color: "#a49d92"
      }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>💡 Como Testar UTMs nos botões do WhatsApp:</h3>
        <ol style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>
            Adicione UTMs no final do link da URL atual. Exemplo: <br />
            <code style={{ background: "#222", padding: "2px 6px", borderRadius: "4px", color: "#fff", display: "inline-block", margin: "4px 0" }}>
              http://localhost:3000/teste-cookies?utm_source=facebook&utm_campaign=anuncio-teste
            </code>
          </li>
          <li>
            Aperte **Enter** para recarregar com os parâmetros na URL.
          </li>
          <li>
            Volte para a <a href="/" style={{ color: "#d9a928", textDecoration: "underline" }}>Página Inicial</a> e passe o mouse (ou clique) em qualquer botão do WhatsApp.
          </li>
          <li>
            Veja que a mensagem pré-preenchida do WhatsApp conterá dinamicamente no final:<br />
            <code style={{ color: "#d9a928" }}>"(Origem: facebook | Campanha: anuncio-teste)"</code>.
          </li>
        </ol>
      </div>

      {/* Renderiza o banner aqui para que ele responda aos botões de controle desta página */}
      <CookieBanner />
    </main>
  );
}
