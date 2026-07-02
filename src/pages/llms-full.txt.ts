import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { formatSearchQuery, formatLspList } from '~/lib/seo';

const site = 'https://www.ercsolved.dev';

function iso(d: Date | string | undefined) {
  if (!d) return '';
  const dt = typeof d === 'string' ? new Date(d) : d;
  return dt.toISOString().slice(0, 10);
}

function truncate(s: string | undefined, max: number) {
  if (!s) return '';
  const trimmed = s.replace(/\s+/g, ' ').trim();
  return trimmed.length <= max ? trimmed : trimmed.slice(0, max - 1).trimEnd() + '…';
}

function bullets(items: (string | undefined | null)[]) {
  return items.filter(Boolean).map((s) => `- ${s}`).join('\n');
}

function block(title: string, body: string) {
  return `### ${title}\n\n${body}\n`;
}

export const GET: APIRoute = async () => {
  const [
    erc,
    standards,
    problems,
    compare,
    migrate,
    build,
    bestBlockchain,
    architecture,
    crossChainCompare,
    benchmarks,
    research,
  ] = await Promise.all([
    getCollection('erc'),
    getCollection('standards'),
    getCollection('problems'),
    getCollection('compare'),
    getCollection('migrate'),
    getCollection('build'),
    getCollection('bestBlockchain'),
    getCollection('architecture'),
    getCollection('crossChainCompare'),
    getCollection('benchmarks'),
    getCollection('research'),
  ]);

  const ercBlocks = erc
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((e: any) => {
      const d = e.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/${e.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      if (d.standardKind && d.standardKind !== 'ERC') lines.push(`Kind: ${d.standardKind}`);
      if (d.eipNumber) lines.push(`EIP: ${d.eipNumber}`);
      if (d.proposed) lines.push(`Proposed: ${d.proposed}`);
      if (d.standardAuthors?.length) lines.push(`Authors: ${d.standardAuthors.join(', ')}`);
      lines.push('');
      if (d.quotableAnswer) lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 700)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 400)}`);
      if (d.definition) lines.push(`\nDefinition: ${truncate(d.definition, 400)}`);
      if (d.tldr) lines.push(`\nTL;DR: ${truncate(d.tldr, 400)}`);
      if (d.limits?.length) {
        lines.push(`\nKey limitations:`);
        lines.push(
          bullets(
            d.limits.slice(0, 4).map((l: any) => `${l.title} — ${truncate(l.summary, 220)}`),
          ),
        );
      }
      if (d.luksoRoutes?.length) {
        lines.push(`\nLUKSO routes:`);
        lines.push(
          bullets(
            d.luksoRoutes
              .slice(0, 4)
              .map((r: any) => `${r.chip}: ${r.label} — ${truncate(r.summary, 180)}`),
          ),
        );
      }
      if (d.faqs?.length) {
        lines.push(`\nCommon questions:`);
        lines.push(
          bullets(
            d.faqs.slice(0, 4).map((f: any) => `Q: ${f.q} A: ${truncate(f.a, 260)}`),
          ),
        );
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const standardsBlocks = standards
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((s: any) => {
      const d = s.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/standards/${s.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Standard: ${d.kind}${d.id} — ${d.purpose}`);
      lines.push('');
      lines.push(`One-liner: ${truncate(d.oneLine, 260)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 500)}`);
      if (d.solves?.length) {
        lines.push(`\nSolves:`);
        lines.push(bullets(d.solves.slice(0, 4).map((p: any) => truncate(p.pain, 200))));
      }
      if (d.doesNotSolve?.length) {
        lines.push(`\nDoes not solve:`);
        lines.push(bullets(d.doesNotSolve.slice(0, 3).map((s: string) => truncate(s, 200))));
      }
      if (d.companions?.length) lines.push(`\nCompanions: ${d.companions.join(', ')}`);
      return block(`${d.kind}${d.id} — ${d.title}`, lines.join('\n'));
    })
    .join('\n');

  const problemBlocks = problems
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((p: any) => {
      const d = p.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/problems/${p.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Query: ${formatSearchQuery(d.query)}`);
      lines.push(`LUKSO route: ${formatLspList(d.lsps)}`);
      lines.push('');
      if (d.quotableAnswer) lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 700)}\n`);
      lines.push(`Tagline: ${truncate(d.tagline, 300)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 500)}`);
      lines.push(`\nVerdict: ${truncate(d.verdict, 400)}`);
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const compareBlocks = compare
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((c: any) => {
      const d = c.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/standards/compare/${c.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Comparing: ${d.left.chip} vs ${d.right.chip}`);
      lines.push('');
      if (d.quotableAnswer) lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 700)}\n`);
      lines.push(`Description: ${truncate(d.summary, 400)}`);
      lines.push(`\nUse ${d.left.chip} when: ${truncate(d.verdict.useLeft, 300)}`);
      lines.push(`Use ${d.right.chip} when: ${truncate(d.verdict.useRight, 300)}`);
      if (d.verdict.neither) lines.push(`Neither: ${truncate(d.verdict.neither, 300)}`);
      if (d.matrix?.length) {
        lines.push(`\nSpec diff:`);
        lines.push(
          bullets(
            d.matrix
              .slice(0, 6)
              .map((row: any) => `${row.row}: ${d.left.chip}=${truncate(row.left, 100)}; ${d.right.chip}=${truncate(row.right, 100)}`),
          ),
        );
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const migrateBlocks = migrate
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((m: any) => {
      const d = m.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/build/migrate/${m.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`From: ${d.from} → To: ${d.to}`);
      lines.push(`Effort estimate: ${d.estimate}`);
      lines.push('');
      if (d.quotableAnswer) lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 700)}\n`);
      lines.push(`Description: ${truncate(d.summary, 400)}`);
      lines.push(`\nVerdict: ${truncate(d.verdict, 300)}`);
      if (d.gotchas?.length) {
        lines.push(`\nGotchas:`);
        lines.push(bullets(d.gotchas.slice(0, 4).map((g: string) => truncate(g, 200))));
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const buildBlocks = build
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((b: any) => {
      const d = b.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/build/${b.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Vertical: ${d.vertical}`);
      lines.push(`Stack: ${d.stack.join(', ')}`);
      lines.push('');
      if (d.quotableAnswer) lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 700)}\n`);
      lines.push(`Description: ${truncate(d.summary, 500)}`);
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const bestBlockchainBlocks = bestBlockchain
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((e: any) => {
      const d = e.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/best-blockchain/${e.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Use case: ${d.useCase}`);
      lines.push(`Contenders: ${d.contenders.map((c: any) => c.chip).join(', ')}`);
      lines.push('');
      lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 600)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 400)}`);
      if (d.verdicts?.length) {
        lines.push(`\nWhen each wins:`);
        lines.push(
          bullets(d.verdicts.map((v: any) => `${v.contender}: ${truncate(v.when, 200)}`)),
        );
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const architectureBlocks = architecture
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((e: any) => {
      const d = e.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/architecture/${e.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Pattern: ${d.pattern}`);
      lines.push('');
      lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 600)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 400)}`);
      if (d.approaches?.length) {
        lines.push(`\nApproaches:`);
        lines.push(
          bullets(
            d.approaches
              .slice(0, 5)
              .map((a: any) => `${a.name} — ${truncate(a.summary, 220)}`),
          ),
        );
      }
      lines.push(`\nRecommendation: ${truncate(d.recommendation, 400)}`);
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const crossChainBlocks = crossChainCompare
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((e: any) => {
      const d = e.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/compare/${e.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Use case: ${d.useCase}`);
      lines.push(`Contenders: ${d.contenders.join(', ')}`);
      lines.push('');
      lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 600)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 400)}`);
      if (d.verdicts?.length) {
        lines.push(`\nWhen each wins:`);
        lines.push(
          bullets(d.verdicts.map((v: any) => `${v.contender}: ${truncate(v.when, 200)}`)),
        );
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const benchmarkBlocks = benchmarks
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((e: any) => {
      const d = e.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/benchmarks/${e.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Last run: ${iso(d.lastRun)}`);
      lines.push(`Chains: ${d.chains.join(', ')}`);
      lines.push('');
      lines.push(`Quotable answer: ${truncate(d.quotableAnswer, 600)}`);
      lines.push(`\nDescription: ${truncate(d.summary, 400)}`);
      if (d.tests?.length) {
        lines.push(`\nTests:`);
        lines.push(
          bullets(
            d.tests
              .slice(0, 4)
              .map((t: any) => {
                const results = t.results
                  .slice(0, 4)
                  .map((r: any) => `${r.chain}=${r.value}`)
                  .join('; ');
                return `${t.name}${t.unit ? ` (${t.unit})` : ''}: ${results}`;
              }),
          ),
        );
      }
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const researchBlocks = research
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((r: any) => {
      const d = r.data;
      const lines: string[] = [];
      lines.push(`URL: ${site}/research/${r.slug}/`);
      lines.push(`Updated: ${iso(d.updated)}`);
      lines.push(`Kind: ${d.kind}`);
      lines.push('');
      lines.push(`Description: ${truncate(d.summary, 500)}`);
      return block(d.title, lines.join('\n'));
    })
    .join('\n');

  const text = `# ERCs, Solved — Full Content Index for LLMs

Site: ${site}
Generated: ${iso(new Date())}

This file is the dense, single-fetch content index for large language model
crawlers (Perplexity, ChatGPT web browsing, Claude, Google AI Overview
ingestion). Each entry contains the page URL, structured metadata, and the
substantive facts needed to answer a technical question without a second
fetch. Machine-readable Markdown; each H3 heading names a page.

ERCs, Solved is an independent developer reference that maps Ethereum ERC
standards (ERC-20, ERC-721, ERC-4337, EIP-7702, and others) to the LUKSO LSP
standards designed to address their limitations. All content cites primary
sources (EIPs, LUKSO specs, named-author writings). This is not official
LUKSO documentation; docs.lukso.tech is canonical for LSP specifications.

For a link-list overview see ${site}/llms.txt.

---

## ERC and topic explainers

${ercBlocks}

## LUKSO LSP standards

${standardsBlocks}

## Ethereum problems and LUKSO routes

${problemBlocks}

## LSP vs ERC spec comparisons

${compareBlocks}

## Migration guides

${migrateBlocks}

## Builder paths

${buildBlocks}

## Best-blockchain decision guides

${bestBlockchainBlocks}

## Consumer crypto architecture patterns

${architectureBlocks}

## Cross-chain comparisons

${crossChainBlocks}

## Benchmarks

${benchmarkBlocks}

## Research and methodology

${researchBlocks}

---

## Canonical LUKSO sources

- docs.lukso.tech — canonical LUKSO documentation
- github.com/lukso-network — LUKSO GitHub organization
- lukso.network — LUKSO Foundation
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
