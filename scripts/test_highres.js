const sharp = require('sharp');
const fs = require('fs');

async function testHighRes() {
  console.log('--- Testando renderização Ultra-HD dos SVGs ---');

  // Renderizar a 300 DPI com largura de 2560px (2.5K/4K Crisp)
  const infoDesktop = await sharp('public/images/hero4.svg', { density: 300 })
    .resize(2560, null, { fit: 'inside', withoutEnlargement: false })
    .webp({ quality: 98, effort: 6 })
    .toFile('public/images/hero4_test_2560.webp');

  console.log('hero4 Desktop 2560px:', infoDesktop.width, 'x', infoDesktop.height, 'Size:', (infoDesktop.size/1024).toFixed(1), 'KB');

  // Renderizar mobile a 300 DPI com largura de 1080px (Full HD Mobile Crisp)
  const infoMobile = await sharp('public/images/heromob1.svg', { density: 300 })
    .resize(1080, null, { fit: 'inside', withoutEnlargement: false })
    .webp({ quality: 98, effort: 6 })
    .toFile('public/images/heromob1_test_1080.webp');

  console.log('heromob1 Mobile 1080px:', infoMobile.width, 'x', infoMobile.height, 'Size:', (infoMobile.size/1024).toFixed(1), 'KB');
}

testHighRes().catch(console.error);
