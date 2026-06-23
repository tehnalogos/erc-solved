const SITE_URL = 'https://ercsolved.dev';
const SITE_NAME = 'ERCs, Solved';
const AUTHOR_NAME = 'ercs-solved maintainers';

type Crumb = {
  name: string;
  path: string;
};

type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  updated?: Date | string;
  author?: string;
  about?: string[];
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function formatLsp(id: string) {
  return id.replace(/^LSP/i, 'LSP');
}

export function formatLspList(ids: string[]) {
  return ids.map(formatLsp).join(' + ');
}

export function formatErcLabel(id: string) {
  if (id === 'EOA') return 'EOA';
  if (id === 'other') return 'Ethereum/EVM';
  return `ERC-${id}`;
}

export function formatSearchQuery(query: string) {
  return query
    .replace(/\berc20\b/gi, 'ERC-20')
    .replace(/\berc721\b/gi, 'ERC-721')
    .replace(/\berc1155\b/gi, 'ERC-1155')
    .replace(/\berc-4337\b/gi, 'ERC-4337')
    .replace(/\beip-4337\b/gi, 'EIP-4337')
    .replace(/\beoa\b/gi, 'EOA')
    .replace(/\bsafetransferfrom\b/gi, 'safeTransferFrom');
}

export function formatStandardLabel(kind: string, id: string) {
  return kind === 'LSP' ? `LUKSO LSP${id}` : `Ethereum ${formatErcLabel(id)}`;
}

export function problemPageTitle(query: string, lsps: string[]) {
  return `${query}: ${formatLspList(lsps)} for Ethereum/EVM`;
}

export function standardPageTitle(kind: string, id: string, title: string) {
  return kind === 'LSP'
    ? `LUKSO LSP${id} ${title} Standard`
    : `Ethereum ERC-${id} Standard`;
}

export function comparisonPageTitle(left: string, right: string) {
  return `${left} vs ${right}: Ethereum/EVM Standard Comparison`;
}

export function buildPageTitle(vertical: string) {
  return `Build ${vertical.charAt(0).toLowerCase()}${vertical.slice(1)} with LUKSO LSPs on EVM`;
}

export function migrationPageTitle(from: string, to: string) {
  return `Migrate ${from} to ${to} on Ethereum/EVM`;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function techArticleJsonLd({
  headline,
  description,
  path,
  updated,
  author = AUTHOR_NAME,
  about = [],
}: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(path),
    dateModified: updated ? new Date(updated).toISOString().slice(0, 10) : undefined,
    isAccessibleForFree: true,
    about,
  };
}
