import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 4173);

const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

function cleanPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  return decoded.replaceAll('..', '');
}

async function resolveFile(urlPath) {
  const cleaned = cleanPath(urlPath);
  const target = path.join(publicDir, cleaned);
  const stat = await fs.stat(target).catch(() => null);

  if (stat?.isFile()) return target;
  if (stat?.isDirectory()) return path.join(target, 'index.html');
  return path.join(publicDir, cleaned, 'index.html');
}

const server = http.createServer(async (request, response) => {
  try {
    const target = await resolveFile(request.url || '/');
    const body = await fs.readFile(target);
    response.writeHead(200, {
      'content-type': mime.get(path.extname(target)) || 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`ERCs, Solved running at http://127.0.0.1:${port}`);
});
