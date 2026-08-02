const sharp = require('sharp');
const fs = require('fs');

async function convertUltraHighRes() {
  console.log('=== Convertendo Imagens da Hero para Ultra-HD (Qualidade Máxima 98%) ===\n');

  const desktopHero = [
    { from: 'public/images/hero4.svg', to: 'public/images/hero4.webp' },
    { from: 'public/images/hero 2.svg', to: 'public/images/hero2.webp' },
    { from: 'public/images/hero 3.svg', to: 'public/images/hero3.webp' },
  ];

  const mobileHero = [
    { from: 'public/images/heromob1.svg', to: 'public/images/heromob1.webp' },
    { from: 'public/images/heromob2.svg', to: 'public/images/heromob2.webp' },
  ];

  // Processar Desktop (2560px de largura @ 300 DPI, Quality 98)
  for (const item of desktopHero) {
    if (fs.existsSync(item.from)) {
      const info = await sharp(item.from, { density: 300 })
        .resize(2560, null, { fit: 'inside', withoutEnlargement: false })
        .webp({ quality: 98, effort: 6 })
        .toFile(item.to);
      console.log(`[DESKTOP ULTRA-HD] ${item.to}: ${info.width}x${info.height}px - ${(info.size/1024).toFixed(1)} KB`);
    } else {
      console.error(`Não encontrado: ${item.from}`);
    }
  }

  // Processar Mobile (1080px de largura @ 300 DPI, Quality 98)
  for (const item of mobileHero) {
    if (fs.existsSync(item.from)) {
      const info = await sharp(item.from, { density: 300 })
        .resize(1080, null, { fit: 'inside', withoutEnlargement: false })
        .webp({ quality: 98, effort: 6 })
        .toFile(item.to);
      console.log(`[MOBILE ULTRA-HD] ${item.to}: ${info.width}x${info.height}px - ${(info.size/1024).toFixed(1)} KB`);
    } else {
      console.error(`Não encontrado: ${item.from}`);
    }
  }

  // Limpar os arquivos de teste temporários
  ['public/images/hero4_test_2560.webp', 'public/images/heromob1_test_1080.webp'].forEach(tmp => {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  });

  console.log('\n--- Conversão Ultra-HD concluída com sucesso! ---');
}

convertUltraHighRes().catch(console.error);
