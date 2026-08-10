import fs from 'fs';
import path from 'path';

const projectRoot = 'E:/_Antigravity Pro/alabz-cliente-ong-respeitonaotemcor-v2';
const publicDir = path.join(projectRoot, 'public');
const tmpDir = path.join(projectRoot, '.tmp');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 1. Gather all files in public/ and .tmp/
const publicFiles = getAllFiles(publicDir);
const tmpFiles = getAllFiles(tmpDir);

// 2. Gather source code content
const codeDirs = ['app', 'components', 'lib', 'styles', 'scripts', 'docs'];
let allCodeContent = '';

for (const d of codeDirs) {
  const fullDirPath = path.join(projectRoot, d);
  if (fs.existsSync(fullDirPath)) {
    const codeFiles = getAllFiles(fullDirPath);
    for (const cf of codeFiles) {
      if (cf.endsWith('.tsx') || cf.endsWith('.ts') || cf.endsWith('.js') || cf.endsWith('.jsx') || cf.endsWith('.css') || cf.endsWith('.json') || cf.endsWith('.html') || cf.endsWith('.mjs')) {
        try {
          allCodeContent += fs.readFileSync(cf, 'utf8') + '\n';
        } catch (e) {}
      }
    }
  }
}

// Add root config files
const rootConfigs = ['vercel.json', 'next.config.ts', 'package.json', 'AGENTS.md'];
for (const rc of rootConfigs) {
  const rcPath = path.join(projectRoot, rc);
  if (fs.existsSync(rcPath)) {
    try {
      allCodeContent += fs.readFileSync(rcPath, 'utf8') + '\n';
    } catch (e) {}
  }
}

// 3. Analyze public files
const usedPublicFiles = [];
const unusedPublicFiles = [];

for (const pf of publicFiles) {
  const relPath = path.relative(publicDir, pf).replace(/\\/g, '/');
  const basename = path.basename(pf);
  const size = fs.statSync(pf).size;

  // Check if filename or relative path is mentioned in code
  const isUsed = allCodeContent.includes(relPath) || 
                 allCodeContent.includes(basename) || 
                 allCodeContent.includes(encodeURIComponent(basename)) ||
                 basename === 'favicon.ico' || 
                 basename === 'icon.png' || 
                 basename === 'robots.txt' || 
                 basename === 'sitemap.ts';

  if (isUsed) {
    usedPublicFiles.push({ path: relPath, size, fullPath: pf });
  } else {
    unusedPublicFiles.push({ path: relPath, size, fullPath: pf });
  }
}

// 4. Analyze .tmp files
const tmpFilesList = tmpFiles.map(tf => {
  const relPath = path.relative(tmpDir, tf).replace(/\\/g, '/');
  const size = fs.statSync(tf).size;
  return { path: relPath, size, fullPath: tf };
});

const totalPublicSize = publicFiles.reduce((acc, f) => acc + fs.statSync(f).size, 0);
const usedPublicSize = usedPublicFiles.reduce((acc, f) => acc + f.size, 0);
const unusedPublicSize = unusedPublicFiles.reduce((acc, f) => acc + f.size, 0);
const totalTmpSize = tmpFilesList.reduce((acc, f) => acc + f.size, 0);

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

console.log('=== RELATÓRIO DE AUDITORIA DE ASSETS ===');
console.log(`Total de arquivos na pasta public/: ${publicFiles.length} (${formatSize(totalPublicSize)})`);
console.log(`- Utilizados no código: ${usedPublicFiles.length} (${formatSize(usedPublicSize)})`);
console.log(`- Não referenciados (Órfãos): ${unusedPublicFiles.length} (${formatSize(unusedPublicSize)})`);
console.log(`Total de arquivos na pasta .tmp/: ${tmpFiles.length} (${formatSize(totalTmpSize)})`);
console.log(`Economia potencial de espaço: ${formatSize(unusedPublicSize + totalTmpSize)}`);

console.log('\n--- DETALHAMENTO DE ARQUIVOS NÃO REFERENCIADOS EM public/ ---');
unusedPublicFiles.forEach(f => {
  console.log(`- ${f.path} (${formatSize(f.size)})`);
});

console.log('\n--- DETALHAMENTO DE ARQUIVOS EM .tmp/ ---');
tmpFilesList.forEach(f => {
  console.log(`- .tmp/${f.path} (${formatSize(f.size)})`);
});
