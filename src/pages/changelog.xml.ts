import type { APIRoute } from 'astro';

interface Entry { date: string; title: string; body: string }
const entries: Entry[] = [
  { date: '2026-06-23', title: 'LUKSO pink replaces the cyan accent.',         body: 'Swapped #00E5FF for LUKSO brand pink #FE005B. The LSP side of every diff, every interaction state, every hover.' },
  { date: '2026-06-22', title: 'LUKSO portability framing corrected across all content.', body: 'LSPs are plain EVM contracts deployable anywhere. The tradeoff is ecosystem reach, not portability.' },
  { date: '2026-06-22', title: 'Phase 6 — sitemap, changelog, RSS.',           body: 'Sitemap re-enabled. robots.txt points at /sitemap.xml. /changelog/ shipped. RSS at /changelog.xml.' },
  { date: '2026-06-22', title: 'Phase 5 — ⌘K search and smart 404.',           body: 'Pagefind indexes every page at build time. Triggered by ⌘K, Ctrl+K, or /. 404 auto-opens search.' },
  { date: '2026-06-22', title: 'Phase 4 — Build verticals and migration guides.', body: '/build/ with 6 verticals. 4 migration guides under /build/migrate/.' },
  { date: '2026-06-22', title: 'Phase 3 — Standards, the matrix, and 6 comparisons.', body: '/standards/ with 15 explainers. /standards/matrix/ is the canonical decision page.' },
  { date: '2026-06-22', title: 'Phase 2 — Problem hub and 12 problem pages.',  body: '/problems/ is a flat, filterable index of 12 problem pages.' },
  { date: '2026-06-22', title: 'Phase 1 — Brand reset and Astro scaffold.',    body: 'Fraunces + JetBrains Mono. Off-black canvas, LUKSO pink + warning amber. New thesis: ERCs are interfaces. LSPs are the system.' },
];

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin || 'https://ercsolved.dev';
  const items = entries
    .map(
      e => `    <item>
      <title>${escape(e.title)}</title>
      <link>${origin}/changelog/#${e.date}</link>
      <guid isPermaLink="false">${e.date}-${escape(e.title).slice(0, 40)}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <description>${escape(e.body)}</description>
    </item>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ERCs, Solved · changelog</title>
    <link>${origin}/changelog/</link>
    <description>Every meaningful change to the ERCs, Solved field manual.</description>
    <language>en</language>
    <atom:link href="${origin}/changelog.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
