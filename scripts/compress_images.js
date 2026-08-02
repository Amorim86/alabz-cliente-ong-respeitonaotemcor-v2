const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SEARCH_DIRS = [
  path.join(__dirname, '..', 'app'),
  path.join(__dirname, '..', 'components'),
  path.join(__dirname, '..', 'config'),
];

function getAllFiles(dirPath, extensions = []) {
  let filesList = [];
  if (!fs.existsSync(dirPath)) return filesList;
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      filesList = filesList.concat(getAllFiles(fullPath, extensions));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (extensions.length === 0 || extensions.includes(ext)) {
        filesList.push(fullPath);
      }
    }
  }
  return filesList;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  const webpPath = path.join(dirName, `${baseName}.webp`);

  const originalSize = fs.statSync(filePath).size;
  const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');

  // Rule 4: Executive / C-Level photos high quality (98%), transparent logos (95%), standard content (85-90%)
  let quality = 85;
  if (relPath.includes('fundadora') || relPath.includes('hero') || relPath.includes('c-level')) {
    quality = 98;
  } else if (relPath.includes('logo') || relPath.includes('favicon') || relPath.includes('assinatura') || relPath.includes('mao')) {
    quality = 95;
  } else if (relPath.includes('footer')) {
    quality = 90;
  }

  let pipeline = sharp(filePath);
  const metadata = await pipeline.metadata();

  // If width > 1920, resize to max width 1920
  if (metadata.width && metadata.width > 1920) {
    pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality, effort: 6 })
    .toFile(webpPath);

  const newSize = fs.statSync(webpPath).size;

  return {
    originalPath: filePath,
    webpPath: webpPath,
    originalName: path.basename(filePath),
    webpName: `${baseName}.webp`,
    relOriginal: relPath,
    relWebp: path.relative(PUBLIC_DIR, webpPath).replace(/\\/g, '/'),
    originalSize,
    newSize,
    savedBytes: originalSize - newSize,
  };
}

function updateCodeReferences(convertedList) {
  const codeFiles = [];
  for (const searchDir of SEARCH_DIRS) {
    codeFiles.push(...getAllFiles(searchDir, ['.tsx', '.ts', '.js', '.jsx', '.css', '.json']));
  }

  const updatedReferences = [];

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    for (const item of convertedList) {
      // Look for relative reference like /images/foo.png or foo.png
      if (content.includes(item.originalName)) {
        content = content.split(item.originalName).join(item.webpName);
        modified = true;
        updatedReferences.push({
          codeFile: path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/'),
          from: item.originalName,
          to: item.webpName,
        });
      }
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf-8');
    }
  }

  return updatedReferences;
}

async function main() {
  console.log('🖼️ Iniciando Protocolo Avançado de Compressão de Imagens (Alabz)...');

  // Step 1: Find all PNG/JPG/JPEG files in public/ recursively
  const imageFiles = getAllFiles(PUBLIC_DIR, ['.png', '.jpg', '.jpeg']);
  console.log(`🔍 Encontradas ${imageFiles.length} imagens para conversão em public/...`);

  const convertedList = [];

  for (const file of imageFiles) {
    try {
      const result = await compressImage(file);
      convertedList.push(result);
      const savingsPct = ((result.savedBytes / result.originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${result.relOriginal} -> ${result.webpName} | ${(result.originalSize / 1024 / 1024).toFixed(2)} MB -> ${(result.newSize / 1024 / 1024).toFixed(2)} MB (${savingsPct}% de economia)`);
    } catch (err) {
      console.error(`  ❌ Erro ao converter ${file}:`, err.message);
    }
  }

  // Step 2: Update references in code
  console.log('\n📝 Atualizando referências no código (apenas imagens convertidas)...');
  const codeUpdates = updateCodeReferences(convertedList);
  codeUpdates.forEach((upd) => {
    console.log(`  - [${upd.codeFile}] ${upd.from} => ${upd.to}`);
  });

  // Step 3: Delete original converted files (Rule 5)
  console.log('\n🧹 Efetuando limpeza dos arquivos originais substituidos com sucesso...');
  let totalOriginal = 0;
  let totalNew = 0;

  for (const item of convertedList) {
    totalOriginal += item.originalSize;
    totalNew += item.newSize;
    if (fs.existsSync(item.webpPath) && fs.existsSync(item.originalPath)) {
      fs.unlinkSync(item.originalPath);
    }
  }

  const totalSaved = totalOriginal - totalNew;
  const totalSavedMB = (totalSaved / 1024 / 1024).toFixed(2);
  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const totalNewMB = (totalNew / 1024 / 1024).toFixed(2);
  const totalPct = ((totalSaved / totalOriginal) * 100).toFixed(1);

  console.log('\n======================================================');
  console.log('📊 RELATÓRIO FINAL DE COMPRESSÃO DE IMAGENS');
  console.log('======================================================');
  console.log(`Tamanho Total Original: ${totalOriginalMB} MB`);
  console.log(`Tamanho Total Otimizado: ${totalNewMB} MB`);
  console.log(`Economia de Espaço:     ${totalSavedMB} MB (${totalPct}% de redução)`);
  console.log('======================================================\n');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
