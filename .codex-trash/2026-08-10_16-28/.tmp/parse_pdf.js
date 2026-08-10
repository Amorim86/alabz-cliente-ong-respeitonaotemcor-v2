const fs = require('fs');
const path = require('path');

// Let's see if pdf-parse is installed or we can require dynamic module or write simple buffer extraction
async function main() {
  const pdfPath = path.join(process.cwd(), '.tmp', 'galeria', 'Portfólio Ong - Nova versão.pdf');
  const buffer = fs.readFileSync(pdfPath);
  
  // Try loading pdf-parse if available in node_modules
  try {
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(buffer);
    console.log('--- PAGES count:', data.numpages);
    console.log('--- TEXT ---');
    console.log(data.text);
    return;
  } catch (e) {
    console.log('pdf-parse not installed directly, searching text strings in buffer...');
  }

  // Raw text extraction from PDF buffer using string matching/regex for stream text
  const str = buffer.toString('binary');
  const matches = str.match(/\(([^()]{3,})\)/g) || [];
  const textClean = matches
    .map(m => m.slice(1, -1))
    .filter(t => t.trim().length > 2 && !/^[\d\s.,\/\\-]+$/.test(t))
    .join(' ');
  console.log('Raw text extracted length:', textClean.length);
  console.log(textClean.slice(0, 3000));
}

main();
