import fs from 'fs';
import path from 'path';

const projectRoot = 'E:/_Antigravity Pro/alabz-cliente-ong-respeitonaotemcor-v2';
const trashDir = path.join(projectRoot, '.codex-trash', '2026-08-10_16-28');

// Explicit list of 3 files to PRESERVE intact
const preservedFiles = [
  'Config original - Ong Respeito Não tem Cor - [respeito.org.br].png',
  'Site original - Ong Respeito Não tem Cor - [respeito.org.br].png',
  'Portfólio Ong - Nova versão.pdf'
];

// Unused orphan files in public/
const publicOrphans = [
  'googlea6c222725a2053b9.html',
  'images/assinatura-dirce.webp',
  'images/assinatura_negra_dirce.png',
  'images/atendimento-psicologico.webp',
  'images/aula-formacao.webp',
  'images/comunidade-livro-solidario.webp',
  'images/criancas-estudando.webp',
  'images/diversidade-mulheres.webp',
  'images/doacao-cestas.webp',
  'images/educacao-livros.webp',
  'images/educacao-roda-livro.webp',
  'images/founder_bg.webp',
  'images/fundadora/fundadora1.webp',
  'images/hero 1.svg',
  'images/hero mobile.svg',
  'images/hero-1.webp',
  'images/hero-2.webp',
  'images/hero-3.webp',
  'images/microfone.webp',
  'images/projeto-amelias-jamais.webp',
  'images/quem-somos-ong.webp'
];

// Files in .tmp/
const tmpDir = path.join(projectRoot, '.tmp');
function getAllTmpFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      getAllTmpFiles(fp, list);
    } else {
      list.push(fp);
    }
  }
  return list;
}

const allTmp = getAllTmpFiles(tmpDir);

if (!fs.existsSync(trashDir)) {
  fs.mkdirSync(trashDir, { recursive: true });
}

let movedCount = 0;
let movedBytes = 0;

function moveFileToTrash(srcPath, relativeSubPath) {
  const targetPath = path.join(trashDir, relativeSubPath);
  const targetParent = path.dirname(targetPath);
  if (!fs.existsSync(targetParent)) {
    fs.mkdirSync(targetParent, { recursive: true });
  }
  const stat = fs.statSync(srcPath);
  fs.renameSync(srcPath, targetPath);
  movedCount++;
  movedBytes += stat.size;
  console.log(`[QUARENTENA] Mivido: ${relativeSubPath} (${(stat.size / 1024).toFixed(1)} KB)`);
}

// Move public/ orphans
for (const rel of publicOrphans) {
  const full = path.join(projectRoot, 'public', rel);
  if (fs.existsSync(full)) {
    moveFileToTrash(full, path.join('public', rel));
  }
}

// Move .tmp/ files except preserved
for (const tmpFile of allTmp) {
  const basename = path.basename(tmpFile);
  if (preservedFiles.includes(basename)) {
    console.log(`[PRESERVADO] Mantido em .tmp: ${basename}`);
    continue;
  }
  const rel = path.relative(tmpDir, tmpFile);
  moveFileToTrash(tmpFile, path.join('.tmp', rel));
}

console.log(`\n✅ Faxina concluída com quarentena segura!`);
console.log(`Total de arquivos movidos para quarentena: ${movedCount}`);
console.log(`Espaço liberado da pasta ativa: ${(movedBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Local da Quarentena: ${trashDir}`);
