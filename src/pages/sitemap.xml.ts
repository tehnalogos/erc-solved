import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticUrls = [
  '/',
  '/problems/',
  '/standards/',
  '/standards/matrix/',
  '/build/',
  '/about/',
  '/changelog/',
];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.origin || 'https://ercsolved.dev').replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const collections = ['problems', 'standards', 'compare', 'migrate', 'build'] as const;
  const collectionUrls: { url: string; updated: string }[] = [];

  for (const collection of collections) {
    const entries = await getCollection(collection);
    const prefix = {
      problems: '/problems/',
      standards: '/standards/',
      compare: '/standards/compare/',
      migrate: '/build/migrate/',
      build: '/build/',
    }[collection];

    for (const entry of entries) {
      const updated = (entry as any).data.updated
        ? new Date((entry as any).data.updated).toISOString().slice(0, 10)
        : today;
      collectionUrls.push({ url: `${prefix}${entry.slug}/`, updated });
    }
  }

  const urls = [
    ...staticUrls.map(u => ({ url: u, updated: today })),
    ...collectionUrls,
  ];

  const items = urls
    .map(
      ({ url, updated }) => `  <url>
    <loc>${origin}${url}</loc>
    <lastmod>${updated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
