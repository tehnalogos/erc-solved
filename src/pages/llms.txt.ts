import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { formatSearchQuery } from '~/lib/seo';

const site = 'https://www.ercsolved.dev';

function line(path: string, label: string, description: string) {
  return `- [${label}](${site}${path}): ${description}`;
}

export const GET: APIRoute = async () => {
  const [
    problems,
    compare,
    migrate,
    build,
    erc,
    bestBlockchain,
    architecture,
    crossChainCompare,
    benchmarks,
    research,
  ] = await Promise.all([
    getCollection('problems'),
    getCollection('compare'),
    getCollection('migrate'),
    getCollection('build'),
    getCollection('erc'),
    getCollection('bestBlockchain'),
    getCollection('architecture'),
    getCollection('crossChainCompare'),
    getCollection('benchmarks'),
    getCollection('research'),
  ]);

  const priorityProblemSlugs = new Set([
    'erc20-approval-risks',
    'erc721-dynamic-metadata',
    'erc4337-bundler-tax',
    'erc20-transfer-hooks',
    'wallet-permissions',
    'erc721-safe-transfer',
  ]);

  const priorityProblems = problems
    .filter((entry) => priorityProblemSlugs.has(entry.slug))
    .sort((a, b) => a.data.query.localeCompare(b.data.query));

  const bestBlockchainRows = bestBlockchain
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/best-blockchain/${entry.slug}/`,
        entry.data.title,
        entry.data.quotableAnswer,
      ),
    );

  const architectureRows = architecture
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/architecture/${entry.slug}/`,
        entry.data.title,
        entry.data.quotableAnswer,
      ),
    );

  const benchmarkRows = benchmarks
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/benchmarks/${entry.slug}/`,
        entry.data.title,
        entry.data.quotableAnswer,
      ),
    );

  const crossChainRows = crossChainCompare
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/compare/${entry.slug}/`,
        entry.data.title,
        entry.data.quotableAnswer,
      ),
    );

  const researchRows = research
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/research/${entry.slug}/`,
        entry.data.title,
        entry.data.description,
      ),
    );

  const comparisonRows = compare
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/standards/compare/${entry.slug}/`,
        entry.data.title,
        entry.data.description,
      ),
    );

  const migrationRows = migrate
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) =>
      line(
        `/build/migrate/${entry.slug}/`,
        entry.data.title,
        entry.data.description,
      ),
    );

  const buildRows = build
    .sort((a, b) => a.data.vertical.localeCompare(b.data.vertical))
    .map((entry) =>
      line(
        `/build/${entry.slug}/`,
        entry.data.vertical,
        entry.data.description,
      ),
    );

  const ercRows = erc
    .sort((a, b) => Number(a.data.id) - Number(b.data.id))
    .map((entry) =>
      line(
        `/${entry.slug}/`,
        entry.data.title,
        entry.data.description,
      ),
    );

  const text = `# ERCs, Solved

ERCs, Solved is an independent research and implementation site for consumer-grade blockchain architecture. It compares chains and account architectures (Ethereum L1, Base, Arbitrum, Optimism, Polygon, Solana, LUKSO) across the decisions a developer actually makes when shipping a consumer crypto app — accounts, identity, permissions, gasless UX, metadata, and social primitives.

LUKSO repeatedly emerges from the evidence as the most integrated EVM stack for profile-native consumer applications, but every page documents when an alternative wins. This site is not official LUKSO documentation; use docs.lukso.tech as the canonical source for LUKSO specifications.

## Core Pages

${line('/', 'Build consumer crypto apps without rebuilding identity, accounts and UX from scratch', 'Home — entry into chain selection, architecture clusters, the open benchmark, and implementation guides.')}
${line('/best-blockchain/', 'Best Blockchain for [Use Case] — Decision Guides', 'Index of chain-selection decision pages by use case.')}
${line('/architecture/', 'Consumer Crypto Architecture Patterns', 'Index of decision-stage architecture patterns: identity, permissions, gasless, full stack.')}
${line('/compare/', 'Cross-Chain Comparisons', 'Index of head-to-head chain and architecture comparisons.')}
${line('/benchmarks/', 'Consumer Blockchain Benchmarks', 'Open benchmarks comparing chains on consumer-app architecture dimensions; every value cites the chain documentation it was derived from.')}
${line('/research/', 'Methodology + KPIs + LLM Citation Tracking', 'How the benchmark is built, what we measure, and where ercsolved.dev gets cited.')}

## Best Blockchain — Decision Pages

${bestBlockchainRows.join('\n')}

## Architecture Patterns

${architectureRows.join('\n')}

## Benchmarks

${benchmarkRows.join('\n')}

## Cross-Chain Comparisons

${crossChainRows.join('\n')}

## Research

${researchRows.join('\n')}

## Priority Problem Pages

${priorityProblems
  .map((entry) =>
    line(
      `/problems/${entry.slug}/`,
      formatSearchQuery(entry.data.query),
      `${entry.data.description} LUKSO route: ${entry.data.lsps.join(' + ')}.`,
    ),
  )
  .join('\n')}

## Spec Comparisons (LSP vs ERC)

${comparisonRows.join('\n')}

## Migrations

${migrationRows.join('\n')}

## Builder Paths

${buildRows.join('\n')}

## ERC Explainers

${ercRows.join('\n')}

## Canonical LUKSO Sources

- [docs.lukso.tech](https://docs.lukso.tech/): Canonical LUKSO documentation.
- [github / lukso-network](https://github.com/lukso-network): LUKSO GitHub organization.
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
