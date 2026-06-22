import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const problems = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
  }

  return files;
}

function localTarget(href) {
  if (!href.startsWith('/')) return null;
  if (href.startsWith('//')) return null;
  const [cleaned] = href.split('#');
  if (!cleaned || cleaned === '/') return path.join(publicDir, 'index.html');
  if (path.extname(cleaned)) return path.join(publicDir, cleaned);
  return path.join(publicDir, cleaned, 'index.html');
}

for (const file of await walk(publicDir)) {
  const html = await fs.readFile(file, 'utf8');
  const matches = html.matchAll(/\s(?:href|src)="([^"]+)"/g);

  for (const match of matches) {
    const href = match[1];
    const target = localTarget(href);
    if (!target) continue;

    try {
      await fs.access(target);
    } catch {
      problems.push(`${path.relative(publicDir, file)} -> ${href}`);
    }
  }
}

if (problems.length) {
  console.error(`Broken internal links found:\n${problems.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('No broken internal links found.');
}
