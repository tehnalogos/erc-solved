import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = 'dist';
const MAX_TITLE_LENGTH = 70;
const MAX_DESCRIPTION_LENGTH = 160;

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(filePath, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(filePath);
    }
  }
  return files;
}

function decodeHtml(input) {
  return input
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#183;/g, '·');
}

function routeFor(filePath) {
  const relative = path
    .relative(DIST_DIR, filePath)
    .replace(/index\.html$/, '')
    .replace(/404\.html$/, '404.html');
  return relative === '' ? '/' : `/${relative}`;
}

function textLength(input) {
  return Array.from(input).length;
}

if (!fs.existsSync(DIST_DIR)) {
  console.error(`Missing ${DIST_DIR}/. Run astro build before audit:seo.`);
  process.exit(1);
}

const failures = [];
const files = walkHtml(DIST_DIR);

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i,
  );

  if (!titleMatch) {
    failures.push(`${route}: missing <title>`);
  } else {
    const title = decodeHtml(titleMatch[1]);
    const length = textLength(title);
    if (length === 0) {
      failures.push(`${route}: empty <title>`);
    } else if (length > MAX_TITLE_LENGTH) {
      failures.push(
        `${route}: title is ${length}/${MAX_TITLE_LENGTH} chars: ${title}`,
      );
    }
  }

  if (!descriptionMatch) {
    failures.push(`${route}: missing meta description`);
  } else {
    const description = decodeHtml(descriptionMatch[1]);
    const length = textLength(description);
    if (length === 0) {
      failures.push(`${route}: empty meta description`);
    } else if (length > MAX_DESCRIPTION_LENGTH) {
      failures.push(
        `${route}: meta description is ${length}/${MAX_DESCRIPTION_LENGTH} chars: ${description}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `SEO audit passed: ${files.length} HTML pages, titles <=${MAX_TITLE_LENGTH}, descriptions <=${MAX_DESCRIPTION_LENGTH}.`,
);
