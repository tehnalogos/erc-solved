import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { formatSearchQuery } from '~/lib/seo';

const site = 'https://ercsolved.dev';

function line(path: string, label: string, description: string) {
  return `- [${label}](${site}${path}): ${description}`;
}

export const GET: APIRoute = async () => {
  const [problems, compare, migrate, build] = await Promise.all([
    getCollection('problems'),
    getCollection('compare'),
    getCollection('migrate'),
    getCollection('build'),
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

  const text = `# ERCs, Solved

ERCs, Solved is an independent developer reference for Ethereum and EVM builders. It maps Ethereum Request for Comments (ERC) pain points to LUKSO Standards (LSPs), which are EVM-compatible standards designed as a connected account, token, metadata, receiver, permission, and relay system.

This site is not official LUKSO documentation. Use docs.lukso.tech as the canonical source for LUKSO specifications.

## Core Pages

${line('/', 'Ethereum ERC Problems and LUKSO LSP Solutions', 'Home page and positioning for the ERC problem -> LUKSO Standards thesis.')}
${line('/problems/', 'Ethereum ERC Problem Index', 'Search-intent index of ERC and EVM pain points mapped to LUKSO LSP patterns.')}
${line('/standards/', 'LUKSO Standards Index', 'Index of LSP and ERC substrate explainers used across the site.')}
${line('/standards/matrix/', 'Ethereum ERC -> LSP Matrix', 'One-row mapping from common ERC standards to LUKSO Standard equivalents or companions.')}
${line('/build/', 'Build Verticals', 'Curated reading paths by builder use case.')}

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

## Comparisons

${comparisonRows.join('\n')}

## Migrations

${migrationRows.join('\n')}

## Builder Paths

${buildRows.join('\n')}

## Canonical LUKSO Sources

- [docs.lukso.tech](https://docs.lukso.tech/): Canonical LUKSO documentation.
- [github / lukso-network](https://github.com/lukso-network): LUKSO GitHub organization.
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
