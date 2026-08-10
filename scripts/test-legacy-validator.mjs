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

// -------------------------------------------------------------
// VERIFICAÇÃO FINAL DE IMUTABILIDADE DO VERCEL.JSON REAL
// -------------------------------------------------------------
const finalVercelContent = fs.readFileSync(realVercelPath, 'utf-8');
if (initialVercelContent !== finalVercelContent) {
  console.error('\n🚨 GRAVE: O arquivo vercel.json real foi modificado durante a execução dos testes!');
  process.exit(1);
}
console.log('\n🔒 COMPROVAÇÃO DE ISOLAMENTO: O arquivo vercel.json real permaneceu 100% INTATO e SOMENTE LEITURA durante todos os testes!');
console.log('🎉 TODOS OS 10 CASOS DE TESTE PASSARAM COM SUCESSO!\n');
process.exit(0);
