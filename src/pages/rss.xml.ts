import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://www.ercsolved.dev';
const SITE_TITLE = 'ERCs, Solved';
const SITE_DESC =
  'Independent research and implementation site for consumer-grade blockchain architecture. Best-blockchain decision guides, architecture patterns, cross-chain comparisons, and the open Consumer Blockchain Architecture Benchmark.';

type Item = { title: string; description: string; path: string; updated: Date };

function rfc822(d: Date) {
  return d.toUTCString();
}

function escape(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const [bestBlockchain, architecture, crossChainCompare, benchmarks, research] =
    await Promise.all([
      getCollection('bestBlockchain'),
      getCollection('architecture'),
      getCollection('crossChainCompare'),
      getCollection('benchmarks'),
      getCollection('research'),
    ]);

  const items: Item[] = [
    ...bestBlockchain.map((e) => ({
      title: e.data.title,
      description: e.data.quotableAnswer,
      path: `/best-blockchain/${e.slug}/`,
      updated: new Date(e.data.updated),
    })),
    ...architecture.map((e) => ({
      title: e.data.title,
      description: e.data.quotableAnswer,
      path: `/architecture/${e.slug}/`,
      updated: new Date(e.data.updated),
    })),
    ...crossChainCompare.map((e) => ({
      title: e.data.title,
      description: e.data.quotableAnswer,
      path: `/compare/${e.slug}/`,
      updated: new Date(e.data.updated),
    })),
    ...benchmarks.map((e) => ({
      title: e.data.title,
      description: e.data.quotableAnswer,
      path: `/benchmarks/${e.slug}/`,
      updated: new Date(e.data.updated),
    })),
    ...research.map((e) => ({
      title: e.data.title,
      description: e.data.summary,
      path: `/research/${e.slug}/`,
      updated: new Date(e.data.updated),
    })),
  ];

  items.sort((a, b) => b.updated.getTime() - a.updated.getTime());
  const top = items.slice(0, 30);

  const lastBuild = top[0]?.updated ?? new Date();
  const itemsXml = top
    .map(
      (it) => `    <item>
      <title>${escape(it.title)}</title>
      <link>${SITE_URL}${it.path}</link>
      <guid isPermaLink="true">${SITE_URL}${it.path}</guid>
      <pubDate>${rfc822(it.updated)}</pubDate>
      <description>${escape(it.description)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(SITE_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
