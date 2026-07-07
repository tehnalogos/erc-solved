import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl } from '~/lib/seo';

// Static page → priority + changefreq tiering.
// Tiers:
//   1.0  — homepage and top-level explainers
//   0.9  — technical deep-dive content and the /standards/matrix/ landing
//   0.7  — problem pages, migration guides, build verticals
//   0.5  — hub indexes and utility pages
// `updated` is maintained by hand (same convention as content-collection
// frontmatter) — bump it when a page's content next changes materially.
const staticPages: Array<{ url: string; updated: string; priority: string; changefreq: string }> = [
  { url: '/',                       updated: '2026-07-02', priority: '1.0', changefreq: 'weekly'  },
  { url: '/best-blockchain/',       updated: '2026-07-02', priority: '0.9', changefreq: 'weekly'  },
  { url: '/architecture/',          updated: '2026-07-02', priority: '0.9', changefreq: 'weekly'  },
  { url: '/compare/',               updated: '2026-07-02', priority: '0.9', changefreq: 'weekly'  },
  { url: '/benchmarks/',            updated: '2026-07-02', priority: '0.9', changefreq: 'weekly'  },
  { url: '/standards/matrix/',      updated: '2026-06-23', priority: '0.9', changefreq: 'weekly'  },
  { url: '/research/',              updated: '2026-07-02', priority: '0.6', changefreq: 'monthly' },
  { url: '/erc/',                   updated: '2026-07-02', priority: '0.5', changefreq: 'monthly' },
  { url: '/problems/',              updated: '2026-07-02', priority: '0.5', changefreq: 'monthly' },
  { url: '/standards/',             updated: '2026-07-02', priority: '0.5', changefreq: 'monthly' },
  { url: '/build/',                 updated: '2026-07-02', priority: '0.5', changefreq: 'monthly' },
  { url: '/about/',                 updated: '2026-06-26', priority: '0.5', changefreq: 'monthly' },
];

// Collection → URL prefix, sitemap priority, changefreq.
// `erc` is the highest priority because it holds the top-level explainers
// (/erc-20/, /erc-721/, /erc-4337/, /gasless-transactions/). Standards +
// compare are next; problems / migrate / build verticals are supporting pages.
const collectionConfig: Record<
  string,
  { prefix: string; priority: string; changefreq: string }
> = {
  bestBlockchain:    { prefix: '/best-blockchain/',  priority: '1.0', changefreq: 'weekly'  },
  architecture:      { prefix: '/architecture/',     priority: '1.0', changefreq: 'weekly'  },
  benchmarks:        { prefix: '/benchmarks/',       priority: '1.0', changefreq: 'weekly'  },
  crossChainCompare: { prefix: '/compare/',          priority: '0.9', changefreq: 'weekly'  },
  erc:               { prefix: '/',                  priority: '1.0', changefreq: 'weekly'  },
  standards:         { prefix: '/standards/',        priority: '0.9', changefreq: 'weekly'  },
  compare:           { prefix: '/standards/compare/', priority: '0.9', changefreq: 'weekly'  },
  problems:          { prefix: '/problems/',         priority: '0.7', changefreq: 'monthly' },
  migrate:           { prefix: '/build/migrate/',    priority: '0.7', changefreq: 'monthly' },
  build:             { prefix: '/build/',            priority: '0.7', changefreq: 'monthly' },
  research:          { prefix: '/research/',         priority: '0.5', changefreq: 'monthly' },
};

export const GET: APIRoute = async () => {
  const collections = Object.keys(collectionConfig) as Array<keyof typeof collectionConfig>;
  const collectionUrls: Array<{
    url: string;
    updated: string;
    priority: string;
    changefreq: string;
  }> = [];

  for (const collection of collections) {
    const entries = await getCollection(collection as any);
    const { prefix, priority, changefreq } = collectionConfig[collection];
    for (const entry of entries) {
      const updated = new Date((entry as any).data.updated).toISOString().slice(0, 10);
      collectionUrls.push({
        url: `${prefix}${entry.slug}/`,
        updated,
        priority,
        changefreq,
      });
    }
  }

  const urls = [...staticPages, ...collectionUrls];

  const items = urls
    .map(
      ({ url, updated, priority, changefreq }) => `  <url>
    <loc>${absoluteUrl(url)}</loc>
    <lastmod>${updated}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
