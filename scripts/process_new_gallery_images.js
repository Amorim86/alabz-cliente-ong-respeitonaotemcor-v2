const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processNewGalleryImages() {
  console.log('=== Processando novas imagens para a Galeria ===\n');

  const sourceDir = path.join(__dirname, '..', '.tmp', 'galeria');
  const targetDir = path.join(__dirname, '..', 'public', 'images');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const items = [
    {
      sourceFile: 'ChatGPT Image 1 de ago. de 2026, 23_24_04 (1).png',
      targetName: 'jiu-jitsu-infantil.webp',
      title: 'Jiu-jitsu infantil',
      category: 'Oficinas',
      text: 'Registro de uma aula de jiu-jitsu para crianças, mostrando a prática em grupo e o desenvolvimento de disciplina, foco, coordenação e convivência.',
    },
    {
      sourceFile: 'ChatGPT Image 1 de ago. de 2026, 23_24_04 (2).png',
      targetName: 'escuta-psicologica.webp',
      title: 'Escuta psicológica',
      category: 'Acolhimento',
      text: 'Cena que simboliza o atendimento psicológico oferecido pela ONG, com foco na escuta, no cuidado emocional e no fortalecimento da saúde mental.',
    },
    {
      sourceFile: 'ChatGPT Image 1 de ago. de 2026, 23_24_04 (3).png',
      targetName: 'atendimento-social.webp',
      title: 'Atendimento social',
      category: 'Comunidade',
      text: 'Imagem que representa o atendimento social realizado pela ONG junto às famílias e pessoas em situação de vulnerabilidade.',
    },
    {
      sourceFile: 'ChatGPT Image 1 de ago. de 2026, 23_24_04 (4).png',
      targetName: 'orientacao-juridica.webp',
      title: 'Orientação jurídica',
      category: 'Acolhimento',
      text: 'Registro simbólico do atendimento jurídico, representando momentos de orientação e esclarecimento sobre direitos, documentos e demandas familiares.',
    },
  ];

  for (const item of items) {
    const srcPath = path.join(sourceDir, item.sourceFile);
    const destPath = path.join(targetDir, item.targetName);

    if (fs.existsSync(srcPath)) {
      const origSize = fs.statSync(srcPath).size;
      const info = await sharp(srcPath)
        .resize(1920, 1080, { fit: 'cover' })
        .webp({ quality: 92 })
        .toFile(destPath);
      const newSize = info.size;
      console.log(`[CONVERTIDO] ${item.targetName}: ${info.width}x${info.height}px | Original: ${(origSize/1024/1024).toFixed(2)} MB -> WebP: ${(newSize/1024).toFixed(1)} KB (Economia de ${((1 - newSize/origSize)*100).toFixed(1)}%)`);
    } else {
      console.error(`[ERRO] Arquivo de origem não encontrado: ${srcPath}`);
    }
  }

  console.log('\n--- Processamento de imagens concluído com sucesso! ---');
}

processNewGalleryImages().catch(console.error);
