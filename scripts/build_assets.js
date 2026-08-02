const sharp = require('sharp');
const fs = require('fs');

async function processImages() {
  console.log('--- Iniciando otimização de imagens ---');

  const heroConversions = [
    { from: 'public/images/hero4.svg', to: 'public/images/hero4.webp' },
    { from: 'public/images/hero 2.svg', to: 'public/images/hero2.webp' },
    { from: 'public/images/hero 3.svg', to: 'public/images/hero3.webp' },
    { from: 'public/images/heromob1.svg', to: 'public/images/heromob1.webp' },
    { from: 'public/images/heromob2.svg', to: 'public/images/heromob2.webp' },
  ];

  for (const item of heroConversions) {
    if (fs.existsSync(item.from)) {
      const startSize = fs.statSync(item.from).size;
      await sharp(item.from).webp({ quality: 92 }).toFile(item.to);
      const endSize = fs.statSync(item.to).size;
      console.log(`[WEBP] ${item.from} (${(startSize/1024/1024).toFixed(2)} MB) -> ${item.to} (${(endSize/1024).toFixed(1)} KB)`);
    } else {
      console.warn(`[AVISO] Arquivo original não encontrado: ${item.from}`);
    }
  }

  console.log('\n--- Criando public/og-image.png (1200x630px, Fundo Branco) ---');
  const faviconPath = 'public/images/favicon-sem-fundo.webp';
  let faviconBuffer = null;

  if (fs.existsSync(faviconPath)) {
    faviconBuffer = await sharp(faviconPath)
      .resize(240, 240, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();
  }

  const svgOverlayText = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 800; font-size: 48px; fill: #0A2540; }
        .subtitle { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; font-size: 24px; fill: #D97706; letter-spacing: 1.5px; }
        .desc { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 500; font-size: 22px; fill: #4B5563; }
      </style>
      <text x="400" y="260" class="title">ONG Respeito Não Tem Cor</text>
      <text x="400" y="310" class="subtitle">ACOLHIMENTO E IGUALDADE RACIAL</text>
      <text x="400" y="365" class="desc">Apoio comunitário, orientação e formação</text>
      <text x="400" y="400" class="desc">para quem precisa recomeçar ou caminhar junto.</text>
      <rect x="400" y="440" width="380" height="5" fill="#F5CF00" rx="2" />
    </svg>
  `);

  const composites = [];
  if (faviconBuffer) {
    composites.push({ input: faviconBuffer, top: 195, left: 120 });
  }
  composites.push({ input: svgOverlayText, top: 0, left: 0 });

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite(composites)
  .png()
  .toFile('public/og-image.png');

  const ogSize = fs.statSync('public/og-image.png').size;
  console.log(`[OG-IMAGE] Criado public/og-image.png com sucesso (${(ogSize/1024).toFixed(1)} KB) com fundo branco.`);
}

processImages().catch(err => {
  console.error('Erro no processamento:', err);
  process.exit(1);
});
