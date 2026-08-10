import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export function validateLegacySystem(vercelConfig, routingFilesMap = null) {
  if (!vercelConfig || typeof vercelConfig !== 'object') {
    return { valid: false, error: 'Configuração vercel.json inválida ou ausente.' };
  }

  const redirects = vercelConfig.redirects || [];
  const rewrites = vercelConfig.rewrites || [];
  const headersList = vercelConfig.headers || [];

  // Invariante 1: /sistema -> /sistema/index.php (statusCode 307)
  const sistemaRedirect = redirects.find(r => r.source === '/sistema');
  if (!sistemaRedirect) {
    return { valid: false, error: 'Redirecionamento para /sistema não foi encontrado no vercel.json.' };
  }
  if (sistemaRedirect.destination !== '/sistema/index.php') {
    return { valid: false, error: `Destino do redirecionamento /sistema deve ser '/sistema/index.php', encontrado '${sistemaRedirect.destination}'.` };
  }
  if (sistemaRedirect.statusCode !== 307) {
    return { valid: false, error: `statusCode do redirecionamento /sistema deve ser exatamente 307, encontrado '${sistemaRedirect.statusCode}'.` };
  }

  // Invariante 2: /sistema/ -> https://respeito1.websiteseguro.com/sistema/
  const sistemaRaizRewrite = rewrites.find(r => r.source === '/sistema/');
  if (!sistemaRaizRewrite) {
    return { valid: false, error: 'Rewrite para /sistema/ não foi encontrado no vercel.json.' };
  }
  if (sistemaRaizRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/') {
    return { valid: false, error: `Destino do rewrite /sistema/ deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/', encontrado '${sistemaRaizRewrite.destination}'.` };
  }

  // Invariante 3: /sistema/(.*) -> https://respeito1.websiteseguro.com/sistema/$1
  const sistemaWildcardRewrite = rewrites.find(r => r.source === '/sistema/(.*)');
  if (!sistemaWildcardRewrite) {
    return { valid: false, error: 'Rewrite para /sistema/(.*) não foi encontrado no vercel.json.' };
  }
  if (sistemaWildcardRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/$1') {
    return { valid: false, error: `Destino do rewrite /sistema/(.*) deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/$1', encontrado '${sistemaWildcardRewrite.destination}'.` };
  }

  // Invariante 4: /login.php -> https://respeito1.websiteseguro.com/sistema/login.php
  const loginRewrite = rewrites.find(r => r.source === '/login.php');
  if (!loginRewrite) {
    return { valid: false, error: 'Rewrite para /login.php não foi encontrado no vercel.json.' };
  }
  if (loginRewrite.destination !== 'https://respeito1.websiteseguro.com/sistema/login.php') {
    return { valid: false, error: `Destino do rewrite /login.php deve ser exatamente 'https://respeito1.websiteseguro.com/sistema/login.php', encontrado '${loginRewrite.destination}'.` };
  }

  // Invariante 5 & 6: Headers protegidos Cache-Control e x-vercel-enable-rewrite-caching: 0
  const protectedSources = ['/sistema', '/sistema/(.*)', '/login.php'];

  for (const source of protectedSources) {
    const headerEntry = headersList.find(h => h.source === source);
    if (!headerEntry || !Array.isArray(headerEntry.headers)) {
      return { valid: false, error: `Bloco de headers protegidos para '${source}' não foi encontrado no vercel.json.` };
    }

    const cacheControl = headerEntry.headers.find(h => h.key === 'Cache-Control');
    if (!cacheControl) {
      return { valid: false, error: `Header Cache-Control não foi encontrado nas regras para '${source}'.` };
    }
    const ccValue = cacheControl.value || '';
    if (!ccValue.includes('no-store') || !ccValue.includes('no-cache')) {
      return { valid: false, error: `Header Cache-Control para '${source}' deve conter 'no-store' e 'no-cache'. Valor atual: '${ccValue}'.` };
    }

    const rewriteCaching = headerEntry.headers.find(h => h.key === 'x-vercel-enable-rewrite-caching');
    if (!rewriteCaching) {
      return { valid: false, error: `Header 'x-vercel-enable-rewrite-caching' não foi encontrado nas regras para '${source}'.` };
    }
    if (rewriteCaching.value !== '0') {
      return { valid: false, error: `Header 'x-vercel-enable-rewrite-caching' para '${source}' deve ter o valor string '0', encontrado '${rewriteCaching.value}'.` };
    }
  }

  // Helper para identificar conflitos
  function routeCanMatch(sourcePattern, protectedPath) {
    if (sourcePattern === protectedPath) return true;
    if (['/(.*)', '(.*)', '/:path*', '/:slug*', '/(.*)/'].includes(sourcePattern)) return true;
    
    // Qualquer regra que comece com /sistema/ e não seja o próprio root intercepta o wildcard
    if (protectedPath === '/sistema/(.*)' && sourcePattern.startsWith('/sistema/') && sourcePattern !== '/sistema/') {
      return true;
    }

    let regexStr = sourcePattern
      .replace(/\/:[a-zA-Z0-9_]+\*/g, '(?:/.*)?')
      .replace(/:[a-zA-Z0-9_]+/g, '[^/]+')
      .replace(/\(\.\*\)/g, '.*');
      
    if (!regexStr.startsWith('^')) regexStr = '^' + regexStr;
    if (!regexStr.endsWith('$') && !regexStr.endsWith('.*') && !regexStr.endsWith(')?')) regexStr = regexStr + '$';

    try {
      const re = new RegExp(regexStr);
      const testCases = {
        '/sistema': ['/sistema'],
        '/sistema/': ['/sistema/'],
        '/sistema/(.*)': ['/sistema/abc', '/sistema/index.php', '/sistema/admin'],
        '/login.php': ['/login.php']
      };
      const casesToTest = testCases[protectedPath] || [protectedPath];
      for (const tc of casesToTest) {
        if (re.test(tc)) return true;
      }
    } catch (e) {
      // Ignorar erros e falhar conservadoramente apenas para defaults
    }
    return false;
  }

  // Checar duplicatas nas regras do legado
  const legacySources = new Set(['/sistema', '/sistema/', '/sistema/(.*)', '/login.php']);
  
  const seenRedirects = new Set();
  for (const r of redirects) {
    if (legacySources.has(r.source)) {
      if (seenRedirects.has(r.source)) {
        return { valid: false, error: `Definição duplicada de redirect para a rota legada '${r.source}'.` };
      }
      seenRedirects.add(r.source);
    }
  }

  const seenRewrites = new Set();
  for (const r of rewrites) {
    if (legacySources.has(r.source)) {
      if (seenRewrites.has(r.source)) {
        return { valid: false, error: `Definição duplicada de rewrite para a rota legada '${r.source}'.` };
      }
      seenRewrites.add(r.source);
    }
  }

  // Invariante 7 & 8: Precedência - Nenhuma regra conflitante antes das regras do legado.
  const pendingLegacyRewrites = new Set(['/sistema/', '/sistema/(.*)', '/login.php']);
  for (const r of rewrites) {
    if (pendingLegacyRewrites.has(r.source)) {
      pendingLegacyRewrites.delete(r.source);
    } else {
      for (const pending of pendingLegacyRewrites) {
        if (routeCanMatch(r.source, pending)) {
          return { valid: false, error: `Foi detectada uma regra de rewrite anterior (${r.source}) que interfere no roteamento do sistema legado (${pending}).` };
        }
      }
    }
  }

  const pendingLegacyRedirects = new Set(['/sistema']);
  for (const r of redirects) {
    if (pendingLegacyRedirects.has(r.source)) {
      pendingLegacyRedirects.delete(r.source);
    } else {
      for (const pending of pendingLegacyRedirects) {
        if (routeCanMatch(r.source, pending)) {
          return { valid: false, error: `Foi detectada uma regra de redirect anterior (${r.source}) que interfere no roteamento do sistema legado (${pending}).` };
        }
      }
    }
  }

  // Inspecionar arquivos de configuração Next.js / Middleware / Proxy
  const nextConfigFiles = ['next.config.ts', 'next.config.js', 'next.config.mjs'];
  const middlewareFiles = ['middleware.ts', 'middleware.js', 'proxy.ts', 'proxy.js', 'app/middleware.ts', 'src/middleware.ts'];
  const routingFilesToCheck = [...nextConfigFiles, ...middlewareFiles];

  for (const fileRel of routingFilesToCheck) {
    let content = null;
    if (routingFilesMap && fileRel in routingFilesMap) {
      content = routingFilesMap[fileRel];
    } else {
      const filePath = path.join(rootDir, fileRel);
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf-8');
      }
    }

    if (content !== null && content !== undefined) {
      // Remove comentários e strings puras de documentação para evitar falsos positivos
      const cleanContent = content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '');

      // Checar se há código ativo configurando especificamente redirects/rewrites/matchers para /sistema ou /login.php
      const interferencePatterns = [
        { pattern: /source\s*:\s*['"`]\/sistema/i, msg: 'Regra de source direcionada a /sistema' },
        { pattern: /destination\s*:\s*['"`][^'"`]*\/sistema/i, msg: 'Regra de destination direcionada a /sistema' },
        { pattern: /source\s*:\s*['"`]\/login\.php/i, msg: 'Regra de source direcionada a /login.php' },
        { pattern: /destination\s*:\s*['"`][^'"`]*\/login\.php/i, msg: 'Regra de destination direcionada a /login.php' },
        { pattern: /matcher\s*:\s*\[[\s\S]*?\/sistema/i, msg: 'Matcher de middleware interceptando /sistema' },
        { pattern: /matcher\s*:\s*\[[\s\S]*?\/login\.php/i, msg: 'Matcher de middleware interceptando /login.php' },
        { pattern: /redirect\s*\(\s*['"`]\/sistema/i, msg: 'Redirecionamento programático para /sistema' },
        { pattern: /rewrite\s*\(\s*['"`]\/sistema/i, msg: 'Rewrite programático para /sistema' },
        { pattern: /NextResponse\.(redirect|rewrite)\s*\(\s*[^)]*\/sistema/i, msg: 'NextResponse interceptando /sistema' },
        { pattern: /NextResponse\.(redirect|rewrite)\s*\(\s*[^)]*\/login\.php/i, msg: 'NextResponse interceptando /login.php' },
        { pattern: /websiteseguro/i, msg: 'Referência ativa à origem da Locaweb em código de roteamento Next.js' }
      ];

      for (const item of interferencePatterns) {
        if (item.pattern.test(cleanContent)) {
          return { valid: false, error: `Interferência de roteamento do Next.js/Middleware detectada no arquivo '${fileRel}': ${item.msg}.` };
        }
      }
    }
  }

  return { valid: true };
}

// Execução via CLI (quando chamado diretamente)
if (process.argv[1] && (process.argv[1].endsWith('validate-legacy-system-routes.mjs') || process.argv[1].includes('validate-legacy-system-routes'))) {
  const vercelPathArg = process.argv[2];
  const vercelPath = vercelPathArg ? path.resolve(vercelPathArg) : path.join(rootDir, 'vercel.json');

  if (!fs.existsSync(vercelPath)) {
    console.error('\n============================================================');
    console.error('🚨 CRITICAL LEGACY SYSTEM ROUTING VIOLATION');
    console.error('============================================================\n');
    console.error(`Arquivo ${path.basename(vercelPath)} não encontrado.\n`);
    process.exit(1);
  }

  let vercelConfig;
  try {
    vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
  } catch (e) {
    console.error('\n============================================================');
    console.error('🚨 CRITICAL LEGACY SYSTEM ROUTING VIOLATION');
    console.error('============================================================\n');
    console.error(`Arquivo JSON inválido ou corrompido: ${e.message}\n`);
    process.exit(1);
  }

  const result = validateLegacySystem(vercelConfig);
  if (!result.valid) {
    console.error('\n============================================================');
    console.error('🚨 CRITICAL LEGACY SYSTEM ROUTING VIOLATION');
    console.error('============================================================\n');
    console.error('ALTERAÇÃO BLOQUEADA.\n');
    console.error('As rotas /sistema e /login.php pertencem ao sistema PHP');
    console.error('legado em produção da ONG Respeito Não Tem Cor.\n');
    console.error('Esta infraestrutura foi homologada e não pode ser modificada');
    console.error('por refatorações comuns do site institucional.\n');
    console.error('Invariante violada:');
    console.error(`- ${result.error}\n`);
    console.error('Reverta a alteração ou obtenha autorização explícita.');
    console.error('============================================================\n');
    process.exit(1);
  }

  console.log('✅ VALIDAÇÃO DA INFRAESTRUTURA DO SISTEMA LEGADO: CONTRATO HOMOLOGADO OK!');
  process.exit(0);
}
