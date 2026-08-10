import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { validateLegacySystem } from './validate-legacy-system-routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const realVercelPath = path.join(rootDir, 'vercel.json');

// Salvar conteúdo inicial do vercel.json real para verificação estrita de imutabilidade
const initialVercelContent = fs.readFileSync(realVercelPath, 'utf-8');
const initialVercelObj = JSON.parse(initialVercelContent);

console.log('🧪 INICIANDO TESTES ISOLADOS DO VALIDADOR (SEM TOCAR NO VERCEL.JSON REAL)...\n');

function runTestWithTmpFile(mockObj) {
  const tmpFilePath = path.join(os.tmpdir(), `test-vercel-${Date.now()}-${Math.random().toString(36).substring(7)}.json`);
  try {
    fs.writeFileSync(tmpFilePath, JSON.stringify(mockObj, null, 2), 'utf-8');
    
    // Executar validação direta em memória
    const resDirect = validateLegacySystem(mockObj);
    
    // Executar via CLI apontando para a pasta temporária externa (os.tmpdir)
    let resCLI = false;
    try {
      execSync(`node scripts/validate-legacy-system-routes.mjs "${tmpFilePath}"`, { stdio: 'pipe' });
      resCLI = true;
    } catch (e) {
      resCLI = false;
    }

    if (resDirect.valid !== resCLI) {
      console.error(`⚠️ Discrepância entre validação direta e CLI para mock! (Direct: ${resDirect.valid}, CLI: ${resCLI})`);
    }

    return resDirect.valid;
  } finally {
    if (fs.existsSync(tmpFilePath)) {
      fs.unlinkSync(tmpFilePath);
    }
  }
}

// -------------------------------------------------------------
// CASOS DE TESTE OBRIGATÓRIOS (1 a 10)
// -------------------------------------------------------------

// Teste 1: Baseline homologado -> PASS
const t1 = runTestWithTmpFile(initialVercelObj);
if (!t1) {
  console.error('❌ FAIL Teste 1: O baseline homologado deveria ter passado!');
  process.exit(1);
}
console.log('✅ TESTE 1 PASSOU: Baseline homologado é válido.');

// Teste 2: Alterar destination de /sistema/(.*) -> FAIL
const mock2 = JSON.parse(JSON.stringify(initialVercelObj));
mock2.rewrites.find(r => r.source === '/sistema/(.*)').destination = 'https://fake.com/$1';
if (runTestWithTmpFile(mock2) !== false) {
  console.error('❌ FAIL Teste 2: Alterar destination de /sistema/(.*) deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 2 PASSOU: Alterar destination de /sistema/(.*) causou FALHA corretamente.');

// Teste 3: Remover x-vercel-enable-rewrite-caching -> FAIL
const mock3 = JSON.parse(JSON.stringify(initialVercelObj));
const h3 = mock3.headers.find(h => h.source === '/sistema');
h3.headers = h3.headers.filter(x => x.key !== 'x-vercel-enable-rewrite-caching');
if (runTestWithTmpFile(mock3) !== false) {
  console.error('❌ FAIL Teste 3: Remover x-vercel-enable-rewrite-caching deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 3 PASSOU: Remover x-vercel-enable-rewrite-caching causou FALHA corretamente.');

// Teste 4: Trocar 307 por 308 -> FAIL
const mock4 = JSON.parse(JSON.stringify(initialVercelObj));
mock4.redirects.find(r => r.source === '/sistema').statusCode = 308;
if (runTestWithTmpFile(mock4) !== false) {
  console.error('❌ FAIL Teste 4: Trocar 307 por 308 deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 4 PASSOU: Trocar 307 por 308 causou FALHA corretamente.');

// Teste 5: Remover /login.php -> FAIL
const mock5 = JSON.parse(JSON.stringify(initialVercelObj));
mock5.rewrites = mock5.rewrites.filter(r => r.source !== '/login.php');
if (runTestWithTmpFile(mock5) !== false) {
  console.error('❌ FAIL Teste 5: Remover /login.php deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 5 PASSOU: Remover /login.php causou FALHA corretamente.');

// Teste 6: Adicionar catch-all conflitante antes do legado -> FAIL
const mock6 = JSON.parse(JSON.stringify(initialVercelObj));
mock6.rewrites.unshift({ source: '/(.*)', destination: 'https://other.com/$1' });
if (runTestWithTmpFile(mock6) !== false) {
  console.error('❌ FAIL Teste 6: Catch-all conflitante deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 6 PASSOU: Rewrite catch-all conflitante causou FALHA corretamente.');

// Teste 7: Redirect legítimo no Next.js config para rota não relacionada -> PASS
const mock7NextConfig = `
  module.exports = {
    async redirects() {
      return [
        { source: '/pagina-antiga', destination: '/pagina-nova', permanent: true }
      ];
    }
  }
`;
const res7 = validateLegacySystem(initialVercelObj, { 'next.config.js': mock7NextConfig });
if (!res7.valid) {
  console.error(`❌ FAIL Teste 7: Redirect legítimo Next.js não relacionado causou falso positivo! Erro: ${res7.error}`);
  process.exit(1);
}
console.log('✅ TESTE 7 PASSOU: Redirect legítimo Next.js (/pagina-antiga -> /pagina-nova) foi PERMITIDO (sem falsos positivos).');

// Teste 8: Rewrite legítimo no Next.js config para rota não relacionada -> PASS
const mock8NextConfig = `
  module.exports = {
    async rewrites() {
      return [
        { source: '/blog-antigo', destination: '/artigos' }
      ];
    }
  }
`;
const res8 = validateLegacySystem(initialVercelObj, { 'next.config.js': mock8NextConfig });
if (!res8.valid) {
  console.error(`❌ FAIL Teste 8: Rewrite legítimo Next.js não relacionado causou falso positivo! Erro: ${res8.error}`);
  process.exit(1);
}
console.log('✅ TESTE 8 PASSOU: Rewrite legítimo Next.js (/blog-antigo -> /artigos) foi PERMITIDO (sem falsos positivos).');

// Teste 9: Redirect/Rewrite no Next.js config envolvendo /sistema -> FAIL
const mock9NextConfig = `
  module.exports = {
    async redirects() {
      return [
        { source: '/sistema', destination: '/interceptado', permanent: false }
      ];
    }
  }
`;
const res9 = validateLegacySystem(initialVercelObj, { 'next.config.js': mock9NextConfig });
if (res9.valid !== false) {
  console.error('❌ FAIL Teste 9: Redirect interceptando /sistema no Next.js deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 9 PASSOU: Redirect interceptando /sistema no Next.js causou FALHA corretamente.');

// Teste 10: Matcher de Middleware envolvendo /login.php -> FAIL
const mock10Middleware = `
  export const config = {
    matcher: ['/login.php', '/admin/:path*']
  };
`;
const res10 = validateLegacySystem(initialVercelObj, { 'middleware.ts': mock10Middleware });
if (res10.valid !== false) {
  console.error('❌ FAIL Teste 10: Matcher interceptando /login.php no middleware deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 10 PASSOU: Matcher interceptando /login.php no middleware causou FALHA corretamente.');

// Teste 11: Redirect catch-all conflitante -> FAIL
const mock11 = JSON.parse(JSON.stringify(initialVercelObj));
if (!mock11.redirects) mock11.redirects = [];
mock11.redirects.unshift({ source: '/(.*)', destination: '/nova' });
if (runTestWithTmpFile(mock11) !== false) {
  console.error('❌ FAIL Teste 11: Redirect catch-all conflitante deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 11 PASSOU: Redirect catch-all conflitante causou FALHA corretamente.');

// Teste 12: Rewrite conflitante específico antes de /sistema/(.*) -> FAIL
const mock12 = JSON.parse(JSON.stringify(initialVercelObj));
const idx = mock12.rewrites.findIndex(r => r.source === '/sistema/(.*)');
mock12.rewrites.splice(idx, 0, { source: '/sistema/admin', destination: '/interceptado' });
if (runTestWithTmpFile(mock12) !== false) {
  console.error('❌ FAIL Teste 12: Rewrite /sistema/admin antes do catch-all do sistema deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 12 PASSOU: Rewrite /sistema/admin antes do catch-all do sistema causou FALHA corretamente.');

// Teste 13: Duplicar rewrite do legado -> FAIL
const mock13 = JSON.parse(JSON.stringify(initialVercelObj));
mock13.rewrites.push({ source: '/login.php', destination: '/fake' });
if (runTestWithTmpFile(mock13) !== false) {
  console.error('❌ FAIL Teste 13: Duplicar rewrite /login.php deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 13 PASSOU: Duplicar rewrite /login.php causou FALHA corretamente.');

// Teste 14: Duplicar redirect do legado -> FAIL
const mock14 = JSON.parse(JSON.stringify(initialVercelObj));
mock14.redirects.push({ source: '/sistema', destination: '/fake', statusCode: 308 });
if (runTestWithTmpFile(mock14) !== false) {
  console.error('❌ FAIL Teste 14: Duplicar redirect /sistema deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 14 PASSOU: Duplicar redirect /sistema causou FALHA corretamente.');

// Teste 15: Rewrite catch-all após as regras do legado -> PASS
const mock15 = JSON.parse(JSON.stringify(initialVercelObj));
mock15.rewrites.push({ source: '/(.*)', destination: '/app' });
if (runTestWithTmpFile(mock15) !== true) {
  console.error('❌ FAIL Teste 15: Catch-all DEPOIS do legado não deveria falhar!');
  process.exit(1);
}
console.log('✅ TESTE 15 PASSOU: Catch-all após regras do legado foi PERMITIDO (respeita a precedência).');

// Teste 16: Rewrite não relacionado antes do legado (ex: /blog) -> PASS
const mock16 = JSON.parse(JSON.stringify(initialVercelObj));
mock16.rewrites.unshift({ source: '/blog', destination: '/novo-blog' });
if (runTestWithTmpFile(mock16) !== true) {
  console.error('❌ FAIL Teste 16: Rewrite não relacionado antes do legado não deveria falhar!');
  process.exit(1);
}
console.log('✅ TESTE 16 PASSOU: Rewrite /blog antes do legado foi PERMITIDO.');

// Teste 17: Regras do legado embaralhadas mas ainda válidas e não conflitantes -> PASS
const mock17 = JSON.parse(JSON.stringify(initialVercelObj));
const loginRew = mock17.rewrites.find(r => r.source === '/login.php');
mock17.rewrites = mock17.rewrites.filter(r => r.source !== '/login.php');
mock17.rewrites.unshift(loginRew);
if (runTestWithTmpFile(mock17) !== true) {
  console.error('❌ FAIL Teste 17: Alterar ordem entre regras independentes do legado não deveria falhar!');
  process.exit(1);
}
console.log('✅ TESTE 17 PASSOU: Regras independentes do legado reordenadas foram PERMITIDAS.');

// Teste 18: Express route param match conflitante /:slug* -> FAIL
const mock18 = JSON.parse(JSON.stringify(initialVercelObj));
mock18.rewrites.unshift({ source: '/:slug*', destination: '/fallback' });
if (runTestWithTmpFile(mock18) !== false) {
  console.error('❌ FAIL Teste 18: Express-style catch-all conflitante (/:slug*) deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 18 PASSOU: Rewrite catch-all (/:slug*) causou FALHA corretamente.');

// Teste 19: Adicionar redirect /:path* APÓS o redirect homologado /sistema -> FAIL
const mock19 = JSON.parse(JSON.stringify(initialVercelObj));
if (!mock19.redirects) mock19.redirects = [];
mock19.redirects.push({ source: '/:path*', destination: '/manutencao' });
if (runTestWithTmpFile(mock19) !== false) {
  console.error('❌ FAIL Teste 19: Redirect catch-all após o legado não foi bloqueado!');
  process.exit(1);
}
console.log('✅ TESTE 19 PASSOU: Redirect catch-all (/:path*) após o legado causou FALHA corretamente.');

// Teste 20: Adicionar redirect /sistema/:path* APÓS o redirect homologado -> FAIL
const mock20 = JSON.parse(JSON.stringify(initialVercelObj));
if (!mock20.redirects) mock20.redirects = [];
mock20.redirects.push({ source: '/sistema/:path*', destination: '/manutencao' });
if (runTestWithTmpFile(mock20) !== false) {
  console.error('❌ FAIL Teste 20: Redirect /sistema/:path* após o legado não foi bloqueado!');
  process.exit(1);
}
console.log('✅ TESTE 20 PASSOU: Redirect subpasta legado (/sistema/:path*) após causou FALHA corretamente.');

// Teste 21: Adicionar redirect /login.php -> FAIL
const mock21 = JSON.parse(JSON.stringify(initialVercelObj));
if (!mock21.redirects) mock21.redirects = [];
mock21.redirects.push({ source: '/login.php', destination: '/outro-login' });
if (runTestWithTmpFile(mock21) !== false) {
  console.error('❌ FAIL Teste 21: Redirect para /login.php não foi bloqueado!');
  process.exit(1);
}
console.log('✅ TESTE 21 PASSOU: Redirect /login.php causou FALHA corretamente.');

// Teste 22: Duplicar bloco headers source /sistema/(.*) -> FAIL
const mock22 = JSON.parse(JSON.stringify(initialVercelObj));
const originalHeader = mock22.headers.find(h => h.source === '/sistema/(.*)');
mock22.headers.push(JSON.parse(JSON.stringify(originalHeader)));
if (runTestWithTmpFile(mock22) !== false) {
  console.error('❌ FAIL Teste 22: Duplicidade de headers para /sistema/(.*) não foi bloqueada!');
  process.exit(1);
}
console.log('✅ TESTE 22 PASSOU: Duplicidade de headers /sistema/(.*) causou FALHA corretamente.');

// Teste 23: Redirect legítimo /manutencao -> /status -> PASS
const mock23 = JSON.parse(JSON.stringify(initialVercelObj));
if (!mock23.redirects) mock23.redirects = [];
mock23.redirects.push({ source: '/manutencao', destination: '/status', statusCode: 308 });
const res23 = validateLegacySystem(mock23);
if (!res23.valid) {
  console.error(`❌ FAIL Teste 23: Redirect legítimo não relacionado falhou incorretamente! Erro: ${res23.error}`);
  process.exit(1);
}
console.log('✅ TESTE 23 PASSOU: Redirect legítimo (/manutencao -> /status) foi PERMITIDO.');

// -------------------------------------------------------------
// VERIFICAÇÃO FINAL DE IMUTABILIDADE DO VERCEL.JSON REAL
// -------------------------------------------------------------
const finalVercelContent = fs.readFileSync(realVercelPath, 'utf-8');
if (initialVercelContent !== finalVercelContent) {
  console.error('\n🚨 GRAVE: O arquivo vercel.json real foi modificado durante a execução dos testes!');
  process.exit(1);
}
console.log('\n🔒 COMPROVAÇÃO DE ISOLAMENTO: O arquivo vercel.json real permaneceu 100% INTATO e SOMENTE LEITURA durante todos os testes!');
console.log('🎉 TODOS OS 23 CASOS DE TESTE PASSARAM COM SUCESSO!\n');
process.exit(0);
