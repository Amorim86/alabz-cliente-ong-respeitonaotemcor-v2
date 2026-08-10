import fs from 'fs';
import path from 'path';

const artifactDir = 'C:/Users/Administrator/.gemini/antigravity/brain/013b7190-27f2-479b-9981-d4f961b0c3a8';
const mdPath = path.join(artifactDir, 'relatorio_comercial_atualizacoes.md');
const outHtmlPath = path.join(artifactDir, 'relatorio_comercial_atualizacoes.html');
const projectHtmlPath = path.resolve('relatorio_comercial_atualizacoes.html');

let md = fs.readFileSync(mdPath, 'utf8');

// Replace images with base64 data URIs
md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, imgPath) => {
  const normalizedPath = imgPath.replace(/\\/g, '/');
  if (fs.existsSync(normalizedPath)) {
    const ext = path.extname(normalizedPath).toLowerCase();
    let mime = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
    if (ext === '.webp') mime = 'image/webp';
    if (ext === '.svg') mime = 'image/svg+xml';
    
    const base64 = fs.readFileSync(normalizedPath).toString('base64');
    return `<figure><img src="data:${mime};base64,${base64}" alt="${alt}" /><figcaption>${alt}</figcaption></figure>`;
  }
  return match;
});

// Simple markdown converter for basic syntax
function simpleMdToHtml(text) {
  let html = text
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/---/g, '<hr />');

  // Convert tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  let newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|')) {
      if (line.includes(':---') || line.includes('---:')) continue; // divider
      const cells = line.split('|').filter(c => c.length > 0).map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHtml = '<table><thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += '</tbody></table>';
        newLines.push(tableHtml);
        tableHtml = '';
      }
      newLines.push(line);
    }
  }
  if (inTable) {
    tableHtml += '</tbody></table>';
    newLines.push(tableHtml);
  }

  html = newLines.join('\n');

  // Wrap paragraphs
  return html.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<table') || p.startsWith('<blockquote') || p.startsWith('<figure') || p.startsWith('<hr')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).join('\n');
}

const bodyHtml = simpleMdToHtml(md);

const fullDocument = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório Comercial de Atualizações - ONG Respeito Não Tem Cor</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    :root {
      --color-primary: #081D42;
      --color-secondary: #F5CF00;
      --color-bg: #F7F4EA;
      --color-text: #1a202c;
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--color-text);
      background-color: #f4f6f9;
      margin: 0;
      padding: 40px 20px;
    }

    .report-card {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 50px 60px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }

    h1 {
      font-size: 2.2rem;
      color: var(--color-primary);
      margin-top: 0;
      border-bottom: 4px solid var(--color-secondary);
      padding-bottom: 12px;
    }

    h2 {
      font-size: 1.5rem;
      color: var(--color-primary);
      margin-top: 36px;
      border-left: 4px solid var(--color-secondary);
      padding-left: 12px;
    }

    h3 {
      font-size: 1.2rem;
      color: #2d3748;
      margin-top: 24px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 0.95rem;
    }

    th {
      background-color: var(--color-primary);
      color: #ffffff;
      text-align: left;
      padding: 12px 16px;
      font-weight: 600;
    }

    td {
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
    }

    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    blockquote {
      background-color: #fffbeb;
      border-left: 4px solid var(--color-secondary);
      margin: 16px 0;
      padding: 14px 20px;
      font-style: italic;
      color: #744210;
      border-radius: 0 8px 8px 0;
    }

    figure {
      margin: 24px 0;
      text-align: center;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
      border: 1px solid #cbd5e0;
    }

    figcaption {
      font-size: 0.85rem;
      color: #718096;
      margin-top: 8px;
      font-style: italic;
    }

    hr {
      border: none;
      height: 1px;
      background: #e2e8f0;
      margin: 40px 0;
    }

    @media print {
      body { background: white; padding: 0; }
      .report-card { box-shadow: none; border: none; padding: 0; max-width: 100%; }
      figure { page-break-inside: avoid; }
      table { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="report-card">
    ${bodyHtml}
  </div>
</body>
</html>`;

fs.writeFileSync(outHtmlPath, fullDocument);
fs.writeFileSync(projectHtmlPath, fullDocument);
console.log('HTML Report generated successfully!');
