const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function inspect() {
  const files = ['hero4.svg', 'hero 2.svg', 'hero 3.svg', 'heromob1.svg', 'heromob2.svg'];

  for (const f of files) {
    const p = path.join('public', 'images', f);
    if (!fs.existsSync(p)) continue;

    const content = fs.readFileSync(p, 'utf8');
    const matches = [...content.matchAll(/data:image\/(png|jpeg|jpg|webp);base64,([^"'>\s]+)/gi)];

    if (matches.length > 0) {
      console.log(`\n=== ${f} ===`);
      matches.forEach((m, idx) => {
        const mime = m[1];
        const b64 = m[2];
        const buf = Buffer.from(b64, 'base64');
        console.log(`  Embed #${idx+1}: ${mime.toUpperCase()}, Size: ${(buf.length/1024).toFixed(1)} KB`);
      });
    } else {
      console.log(`\n=== ${f} (Pure SVG / No Base64) ===`);
    }
  }
}

inspect();
