const SITE = 'https://www.ercsolved.dev';

const mustCheck = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/problems/erc20-transfer-hooks/',
  '/build/migrate/erc721-to-lsp8/',
  '/erc-20/',
  '/standards/',
];

let failed = false;
for (const path of mustCheck) {
  const url = new URL(path, SITE).toString();
  const res = await fetch(url, { redirect: 'manual' });
  const xRobots = res.headers.get('x-robots-tag') ?? '';
  const ok = res.status === 200 && !xRobots.toLowerCase().includes('noindex');
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${res.status} ${url}`);
  if (!ok) failed = true;
}

if (failed) process.exit(1);
