import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const vercelPath = path.join(rootDir, 'vercel.json');

const originalVercelRaw = fs.readFileSync(vercelPath, 'utf-8');
const originalVercel = JSON.parse(originalVercelRaw);

console.log('🧪 INICIANDO TESTES INTERNOS DO MECANISMO DE VALIDAÇÃO...\n');

function runValidationOnMock(mockObj) {
  const tmpPath = path.join(rootDir, 'vercel.tmp.json');
  try {
    fs.writeFileSync(tmpPath, JSON.stringify(mockObj, null, 2), 'utf-8');
    // Renomear temporariamente para testar
    fs.writeFileSync(vercelPath, JSON.stringify(mockObj, null, 2), 'utf-8');
    execSync('node scripts/validate-legacy-system-routes.mjs', { stdio: 'pipe' });
    return true; // PASS
  } catch (e) {
    return false; // FAIL
  } finally {
    // Restaurar vercel.json original
    fs.writeFileSync(vercelPath, originalVercelRaw, 'utf-8');
    if (fs.existsSync(tmpPath)) {
      fs.unlinkSync(tmpPath);
    }
  }
}

// Teste 1: Configuração Homologada Original
const test1 = runValidationOnMock(originalVercel);
if (test1 !== true) {
  console.error('❌ FAIL Teste 1: A configuração original deveria ter passado!');
  process.exit(1);
}
console.log('✅ TESTE 1 PASSOU: Configuração original homologada é válida.');

// Teste 2: Modificar destination de /sistema/(.*)
const mock2 = JSON.parse(JSON.stringify(originalVercel));
const rw2 = mock2.rewrites.find(r => r.source === '/sistema/(.*)');
rw2.destination = 'https://fake-destination.com/$1';
const test2 = runValidationOnMock(mock2);
if (test2 !== false) {
  console.error('❌ FAIL Teste 2: Alterar destination deveria ter falhado a validação!');
  process.exit(1);
}
console.log('✅ TESTE 2 PASSOU: Alterar destination de /sistema/(.*) causou FALHA corretamente.');

// Teste 3: Remover x-vercel-enable-rewrite-caching
const mock3 = JSON.parse(JSON.stringify(originalVercel));
const h3 = mock3.headers.find(h => h.source === '/sistema');
h3.headers = h3.headers.filter(x => x.key !== 'x-vercel-enable-rewrite-caching');
const test3 = runValidationOnMock(mock3);
if (test3 !== false) {
  console.error('❌ FAIL Teste 3: Remover x-vercel-enable-rewrite-caching deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 3 PASSOU: Remover x-vercel-enable-rewrite-caching causou FALHA corretamente.');

// Teste 4: Trocar 307 por 308
const mock4 = JSON.parse(JSON.stringify(originalVercel));
const r4 = mock4.redirects.find(r => r.source === '/sistema');
r4.statusCode = 308;
const test4 = runValidationOnMock(mock4);
if (test4 !== false) {
  console.error('❌ FAIL Teste 4: Trocar statusCode 307 por 308 deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 4 PASSOU: Trocar statusCode 307 por 308 causou FALHA corretamente.');

// Teste 5: Remover /login.php
const mock5 = JSON.parse(JSON.stringify(originalVercel));
mock5.rewrites = mock5.rewrites.filter(r => r.source !== '/login.php');
const test5 = runValidationOnMock(mock5);
if (test5 !== false) {
  console.error('❌ FAIL Teste 5: Remover rota /login.php deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 5 PASSOU: Remover /login.php causou FALHA corretamente.');

// Teste 6: Adicionar regra de rewrite catch-all conflitante antes do legado
const mock6 = JSON.parse(JSON.stringify(originalVercel));
mock6.rewrites.unshift({
  source: '/(.*)',
  destination: 'https://other-site.com/$1'
});
const test6 = runValidationOnMock(mock6);
if (test6 !== false) {
  console.error('❌ FAIL Teste 6: Adicionar rewrite catch-all conflitante deveria ter falhado!');
  process.exit(1);
}
console.log('✅ TESTE 6 PASSOU: Regra catch-all conflitante causou FALHA corretamente.');

// Restauração de segurança
fs.writeFileSync(vercelPath, originalVercelRaw, 'utf-8');
console.log('\n🎉 TODOS OS TESTES DO VALIDADOR FORAM EXECUTADOS COM SUCESSO E COMPROVADOS!');
