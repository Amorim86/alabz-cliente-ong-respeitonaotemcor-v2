/**
 * app/teste-forms/page.tsx
 *
 * Página de teste local do motor de formulários e Demonstração do Trabalhe Conosco.
 * ⚠️ REMOVER ANTES DO DEPLOY EM PRODUÇÃO.
 */

'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import FormTrabalheConosco from '@/components/forms/FormTrabalheConosco';

const STORAGE_KEY = 'alabz_cookies_accepted';

// ─── Tipos de teste originais para a API (Lab no rodapé) ───────────────────────
const TESTES = [
  {
    label: '🍪 Cookies Consent',
    form_type: 'cookies_consent',
    payload: { accepted: true, versao: '1.0' },
    descricao: 'Registra consentimento de LGPD. Não gera link de contato.',
  },
  {
    label: '💬 Primeiro Contato',
    form_type: 'primeiro_contato',
    payload: {
      nome: 'João da Silva',
      email: 'joao@email.com',
      telefone: '41999999999',
      mensagem: 'Olá, gostaria de saber mais sobre os serviços.',
    },
    descricao: 'Gera link de WhatsApp e/ou e-mail para o contratante.',
  },
  {
    label: '📋 Orçamento',
    form_type: 'orcamento',
    payload: {
      servico: 'Site Institucional',
      prazo: '30 dias',
      paginas: '5',
      orcamento_estimado: 'R$ 3.500',
      observacoes: 'Precisa de integração com WhatsApp.',
    },
    descricao: 'Gera a URL da página de proposta pública (/propostas/[id]).',
  },
  {
    label: '💼 Trabalhe Conosco (sem arquivo)',
    form_type: 'trabalhe_conosco',
    payload: {
      nome: 'Maria Souza',
      cargo_desejado: 'Designer UX',
      linkedin: 'linkedin.com/in/mariasouza',
      mensagem: 'Tenho 3 anos de experiência com Figma e Next.js.',
    },
    descricao: 'Salva os dados no Firestore. Sem upload de arquivo neste teste.',
  },
];

const CLIENTE_ID_TESTE = 'alabz-teste-local';

export default function TesteFormsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [resultados, setResultados] = useState<Record<string, any>>({});
  const [cookieStatus, setCookieStatus] = useState<string | null>('carregando...');

  const atualizarStatusCookies = () => {
    if (typeof window !== 'undefined') {
      const valor = localStorage.getItem(STORAGE_KEY);
      setCookieStatus(valor === null ? 'não definido (banner deve aparecer)' : valor);
    }
  };

  useEffect(() => {
    atualizarStatusCookies();
    
    const handleConsent = () => {
      atualizarStatusCookies();
    };
    
    window.addEventListener('alabz_cookies_accepted', handleConsent);
    return () => window.removeEventListener('alabz_cookies_accepted', handleConsent);
  }, []);

  const handleResetCookies = () => {
    localStorage.removeItem(STORAGE_KEY);
    atualizarStatusCookies();
    window.location.reload();
  };

  async function executarTeste(form_type: string, payload: Record<string, any>) {
    setLoading(form_type);
    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: CLIENTE_ID_TESTE,
          form_type,
          payload,
        }),
      });

      const data = await res.json();
      setResultados((prev) => ({
        ...prev,
        [form_type]: { status: res.status, data },
      }));
    } catch (err) {
      setResultados((prev) => ({
        ...prev,
        [form_type]: { status: 'ERRO DE REDE', data: String(err) },
      }));
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <Header />

      {/* pt-24 para garantir o deslocamento do rótulo sob o header fixo */}
      <main className="flex-1 bg-zinc-950 pt-24">
        {/* Banner do topo com informações da demonstração */}
        <div className="bg-zinc-900 text-zinc-400 py-3 text-center px-4 text-xs font-mono border-b border-zinc-800 relative z-20">
          🧪 Ambiente de Teste · Cliente: <code className="bg-zinc-800 px-2 py-0.5 rounded text-yellow-400 font-semibold">{CLIENTE_ID_TESTE}</code>
        </div>

        {/* Seção Principal: 100vh com imagem de fundo e formulário centralizado */}
        <section className="relative w-full min-h-[calc(100dvh-5.5rem)] flex items-center justify-center px-4 py-8 md:py-16 overflow-hidden">
          {/* Imagem de Fundo Premium Cover */}
          <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
            <img 
              src="/career-hero.jpg" 
              alt="Junte-se à nossa equipe" 
              className="w-full h-full object-cover opacity-25 filter brightness-50"
            />
            {/* Overlays de Fusão e Escurecimento para garantir contraste do Formulário */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50" />
          </div>

          {/* Wrapper do Formulário Centralizado (flutuando no meio do display) */}
          <div className="relative z-10 w-full max-w-2xl mx-auto">
            <FormTrabalheConosco />
          </div>
        </section>

        {/* ── Seção Especial do Desenvolvedor (Lab da API & Painel de Cookies) ── */}
        <section className="bg-zinc-900 border-t border-zinc-850 py-12 px-4 md:px-12 relative z-20">
          <div className="max-w-[1400px] mx-auto">
            
            {/* O painel é exibido na integralidade (sem precisar de botão para toggle) */}
            <div className="text-left max-w-[860px] mx-auto font-mono text-sm bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-inner text-zinc-300">
              
              <div className="mb-6 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-bold text-white">
                  ⚙️ Painel de Testes & Rastreamento (LGPD / Cookies / API)
                </h3>
                <p className="text-zinc-500 text-xs mt-1">
                  Verifique e simule os comportamentos do motor de formulários e controle de cookies do template.
                </p>
              </div>

              {/* Bloco de Cookies Consent (Mecanismo LGPD) */}
              <div className="mb-8 p-4 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#d9a928] mb-3">
                  🍪 Controle de Cookies (LGPD)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <span className="text-zinc-500">Chave LocalStorage:</span>
                    <div className="mt-1">
                      <code className={`px-2.5 py-1 rounded text-white font-bold ${
                        cookieStatus === 'true' ? 'bg-emerald-950 border border-emerald-800/40 text-emerald-400' : 
                        cookieStatus === 'false' ? 'bg-red-950 border border-red-800/40 text-red-400' : 'bg-zinc-800'
                      }`}>
                        {cookieStatus}
                      </code>
                    </div>
                  </div>
                  <div className="text-zinc-500 leading-relaxed">
                    Se o status for <code className="text-yellow-400 font-bold">não definido</code>, o banner global reaparecerá no rodapé após 1.5s.
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleResetCookies}
                    className="bg-[#d9a928] hover:bg-[#c09520] text-black text-xs px-4 py-2 rounded-full font-bold transition-all cursor-pointer"
                  >
                    🔄 Resetar e Limpar Cookies (Forçar Banner)
                  </button>
                </div>
              </div>

              {/* Testes Gerais de Formulários */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/50 pb-2">
                  ⚡ Simulação de Submissão direta de API
                </h4>
                {TESTES.map((teste) => {
                  const resultado = resultados[teste.form_type];
                  const isLoading = loading === teste.form_type;
                  const isOk = resultado && resultado.status < 300;

                  return (
                    <div key={teste.form_type} className="border border-zinc-850 rounded-lg overflow-hidden">
                      <div className="bg-zinc-900/30 px-4 py-3 border-b border-zinc-850 flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <span className="font-bold text-zinc-300">{teste.label}</span>
                          <p className="text-zinc-500 text-xs mt-0.5">{teste.descricao}</p>
                        </div>
                        <button
                          onClick={() => executarTeste(teste.form_type, teste.payload)}
                          disabled={isLoading}
                          className="bg-zinc-800 text-white border border-zinc-700 text-xs px-4 py-1.5 rounded hover:bg-zinc-750 disabled:bg-zinc-600 font-bold transition-all cursor-pointer"
                        >
                          {isLoading ? '⏳ Enviando...' : '▶ Executar'}
                        </button>
                      </div>

                      <div className="p-4 bg-zinc-950/20">
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-2">Payload enviado</p>
                        <pre className="bg-zinc-900 text-[#94d3a2] text-xs p-3 rounded overflow-auto leading-relaxed border border-zinc-850">
                          {JSON.stringify(teste.payload, null, 2)}
                        </pre>
                      </div>

                      {resultado && (
                        <div className={`p-4 border-t ${isOk ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-red-950/20 border-red-900/50'}`}>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isOk ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isOk ? '✅ Resposta' : '❌ Erro'} — HTTP {resultado.status}
                          </p>
                          <pre className="bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs p-3 rounded overflow-auto leading-relaxed">
                            {JSON.stringify(resultado.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
