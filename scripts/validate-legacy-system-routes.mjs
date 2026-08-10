import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function fail(invariantDescription) {
  console.error('\n============================================================');
  console.error('🚨 CRITICAL LEGACY SYSTEM ROUTING VIOLATION');
  console.error('============================================================\n');
  console.error('ALTERAÇÃO BLOQUEADA.\n');
  console.error('As rotas /sistema e /login.php pertencem ao sistema PHP');
  console.error('legado em produção da ONG Respeito Não Tem Cor.\n');
  console.error('Esta infraestrutura foi homologada e não pode ser modificada');
  console.error('por refatorações comuns do site institucional.\n');
  console.error('Invariante violada:');
  console.error(`- ${invariantDescription}\n`);
  console.error('Reverta a alteração ou obtenha autorização explícita.');
  console.error('============================================================\n');
  process.exit(1);
}

// 1. Inspecionar vercel.json
const vercelPath = path.join(rootDir, 'vercel.json');
if (!fs.existsSync(vercelPath)) {
  fail('Arquivo vercel.json não encontrado na raiz do projeto.');
}

let vercelConfig;
try {
  vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
} catch (e) {
  fail(`Arquivo vercel.json inválido ou corrompido: ${e.message}`);
}

const redirects = vercelConfig.redirects || [];
const rewrites = vercelConfig.rewrites || [];
const headersList = vercelConfig.headers || [];

// Invariante 1: /sistema -> /sistema/index.php (statusCode 307)
const sistemaRedirect = redirects.find(r => r.source === '/sistema');
if (!sistemaRedirect) {
  fail('Redirecionamento para /sistema não foi encontrado no vercel.json.');
}
if (sistemaRedirect.destination !== '/sistema/index.php') {
  fail(`Destino do redirecionamento /sistema deve ser '/sistema/index.php', encontrado '${sistemaRedirect.destination}'.`);
}
if (sistemaRedirect.statusCode !== 307) {
  fail(`statusCode do redirecionamento /sistema deve ser exatamente 307, encontrado '${sistemaRedirect.statusCode}'.`);
}

// Invariante 2: /sistema/ -> https://respeito1.websiteseguro.com/sistema/
const sistemaRaizRewrite = rewrites.find(r => r.source === '/sistema/');
if (!sistemaRaizRewrite) {
  fail('Rewrite para /sistema/ não foi encontrado no vercel.json.');
}
if (sistemaRaizRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/') {
  fail(`Destino do rewrite /sistema/ deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/', encontrado '${sistemaRaizRewrite.destination}'.`);
}

// Invariante 3: /sistema/(.*) -> https://respeito1.websiteseguro.com/sistema/$1
const sistemaWildcardRewrite = rewrites.find(r => r.source === '/sistema/(.*)');
if (!sistemaWildcardRewrite) {
  fail('Rewrite para /sistema/(.*) não foi encontrado no vercel.json.');
}
if (sistemaWildcardRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/$1') {
  fail(`Destino do rewrite /sistema/(.*) deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/$1', encontrado '${sistemaWildcardRewrite.destination}'.`);
}

// Invariante 4: /login.php -> https://respeito1.websiteseguro.com/sistema/login.php
const loginRewrite = rewrites.find(r => r.source === '/login.php');
if (!loginRewrite) {
  fail('Rewrite para /login.php não foi encontrado no vercel.json.');
}
if (loginRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/login.php') {
  fail(`Destino do rewrite /login.php deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/login.php', encontrado '${loginRewrite.destination}'.`);
}

// Invariante 5 & 6: Headers protegidos Cache-Control e x-vercel-enable-rewrite-caching: 0
const protectedSources = ['/sistema', '/sistema/(.*)', '/login.php'];

for (const source of protectedSources) {
  const headerEntry = headersList.find(h => h.source === source);
  if (!headerEntry || !Array.isArray(headerEntry.headers)) {
    fail(`Bloco de headers protegidos para '${source}' não foi encontrado no vercel.json.`);
  }

  const cacheControl = headerEntry.headers.find(h => h.key === 'Cache-Control');
  if (!cacheControl) {
    fail(`Header Cache-Control não foi encontrado nas regras para '${source}'.`);
  }
  const ccValue = cacheControl.value || '';
  if (!ccValue.includes('no-store') || !ccValue.includes('no-cache')) {
    fail(`Header Cache-Control para '${source}' deve conter 'no-store' e 'no-cache'. Valor atual: '${ccValue}'.`);
  }

  const rewriteCaching = headerEntry.headers.find(h => h.key === 'x-vercel-enable-rewrite-caching');
  if (!rewriteCaching) {
    fail(`Header 'x-vercel-enable-rewrite-caching' não foi encontrado nas regras para '${source}'.`);
  }
  if (rewriteCaching.value !== '0') {
    fail(`Header 'x-vercel-enable-rewrite-caching' para '${source}' deve ter o valor string '0', encontrado '${rewriteCaching.value}'.`);
  }
}

// Invariante 7 & 8: Nenhuma regra conflitante ou catch-all anterior
const legacySources = new Set(['/sistema', '/sistema/', '/sistema/(.*)', '/login.php']);
const rewritesBeforeLegacy = [];

for (const r of rewrites) {
  if (legacySources.has(r.source)) {
    break; // Chegou nas regras do legado
  }
  rewritesBeforeLegacy.push(r);
}

for (const r of rewritesBeforeLegacy) {
  if (r.source === '/(.*)' || r.source === '(.*)' || r.source === '/:path*' || r.source === '/sistema/:path*') {
    fail(`Foi detectada uma regra de rewrite anterior (${r.source}) que interfere no roteamento do sistema legado.`);
  }
}

// Inspecionar arquivos de configuração Next.js / Middleware / Proxy
const nextConfigFiles = ['next.config.ts', 'next.config.js', 'next.config.mjs'];
const middlewareFiles = ['middleware.ts', 'middleware.js', 'proxy.ts', 'proxy.js', 'app/middleware.ts', 'src/middleware.ts'];

const routingFilesToCheck = [...nextConfigFiles, ...middlewareFiles];

for (const fileRel of routingFilesToCheck) {
  const filePath = path.join(rootDir, fileRel);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Remove comentários para evitar falsos positivos por documentação
    const cleanContent = content
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '');

    // Checar se há código ativo configurando redirects/rewrites/matchers para /sistema ou /login.php
    const systemPatterns = [
      /async\s+redirects\s*\(\s*\)/,
      /async\s+rewrites\s*\(\s*\)/,
      /matcher\s*:\s*\[[\s\S]*?\/sistema[\s\S]*?\]/,
      /matcher\s*:\s*\[[\s\S]*?\/login\.php[\s\S]*?\]/,
      /redirect\s*\(\s*['"`]\/sistema/,
      /rewrite\s*\(\s*['"`]\/sistema/,
      /websiteseguro/
    ];

    for (const pattern of systemPatterns) {
      if (pattern.test(cleanContent)) {
        fail(`Interferência de roteamento do Next.js/Middleware detectada no arquivo '${fileRel}' interceptando o sistema legado.`);
      }
    }
  }
}

console.log('✅ VALIDAÇÃO DA INFRAESTRUTURA DO SISTEMA LEGADO: CONTRATO HOMOLOGADO OK!');
process.exit(0);
