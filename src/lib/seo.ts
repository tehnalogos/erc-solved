export const SITE_URL = 'https://www.ercsolved.dev';
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
  creator?: Record<string, unknown>;
  mentions?: { name: string; url?: string }[];
  keywords?: string[];
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

export function faqPageJsonLd(
  faqs: { q: string; a: string; url?: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a, url }) => ({
      '@type': 'Question',
      name: q,
      ...(url ? { url } : {}),
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

type PersonInput = {
  name: string;
  url?: string;
  jobTitle?: string;
  worksFor?: { name: string; url?: string };
  sameAs?: string[];
  knowsAbout?: string[];
};

export function personJsonLd(p: PersonInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    ...(p.url ? { url: p.url } : {}),
    ...(p.jobTitle ? { jobTitle: p.jobTitle } : {}),
    ...(p.worksFor
      ? {
          worksFor: {
            '@type': 'Organization',
            name: p.worksFor.name,
            ...(p.worksFor.url ? { url: p.worksFor.url } : {}),
          },
        }
      : {}),
    ...(p.sameAs?.length ? { sameAs: p.sameAs } : {}),
    ...(p.knowsAbout?.length ? { knowsAbout: p.knowsAbout } : {}),
  };
}

export function definedTermJsonLd(t: {
  name: string;
  description: string;
  url: string;
  inDefinedTermSet?: string;
  termCode?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.name,
    description: t.description,
    url: t.url,
    ...(t.inDefinedTermSet ? { inDefinedTermSet: t.inDefinedTermSet } : {}),
    ...(t.termCode ? { termCode: t.termCode } : {}),
  };
}

type HowToStep = { name: string; text: string };
export function howToJsonLd(input: {
  name: string;
  description: string;
  steps: HowToStep[];
  toolHref?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    step: input.steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text,
    })),
    ...(input.toolHref
      ? {
          tool: [
            {
              '@type': 'HowToTool',
              name: 'LUKSO LSP smart contracts',
              url: input.toolHref,
            },
          ],
        }
      : {}),
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  updated,
  author = AUTHOR_NAME,
  about = [],
  keywords,
}: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: { '@type': 'Organization', name: author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(path),
    dateModified: updated ? new Date(updated).toISOString().slice(0, 10) : undefined,
    isAccessibleForFree: true,
    about,
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
  };
}

type DatasetVariable = { name: string; description?: string; unit?: string };
export function datasetJsonLd(input: {
  name: string;
  description: string;
  path: string;
  csvPath?: string;
  jsonPath?: string;
  repoUrl?: string;
  variables?: DatasetVariable[];
  keywords?: string[];
  updated?: Date | string;
  license?: string;
}) {
  const distribution: Record<string, unknown>[] = [];
  if (input.csvPath) {
    distribution.push({
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: absoluteUrl(input.csvPath),
    });
  }
  if (input.jsonPath) {
    distribution.push({
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: absoluteUrl(input.jsonPath),
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isAccessibleForFree: true,
    license: input.license ?? 'https://creativecommons.org/licenses/by/4.0/',
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(input.updated ? { dateModified: new Date(input.updated).toISOString().slice(0, 10) } : {}),
    ...(distribution.length ? { distribution } : {}),
    ...(input.repoUrl ? { isBasedOn: input.repoUrl } : {}),
    ...(input.variables?.length
      ? {
          variableMeasured: input.variables.map((v) => ({
            '@type': 'PropertyValue',
            name: v.name,
            ...(v.description ? { description: v.description } : {}),
            ...(v.unit ? { unitText: v.unit } : {}),
          })),
        }
      : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(', ') } : {}),
  };
}

export function bestBlockchainPageTitle(useCase: string) {
  return `Best Blockchain for ${useCase}: An EVM-Native Architecture Comparison`;
}

export function architecturePageTitle(pattern: string) {
  return `${pattern}: Architecture Patterns Compared`;
}

export function crossChainPageTitle(contenders: string[], useCase?: string) {
  const head = contenders.join(' vs ');
  return useCase ? `${head}: ${useCase}` : head;
}

export function techArticleJsonLd({
  headline,
  description,
  path,
  updated,
  author = AUTHOR_NAME,
  about = [],
  creator,
  mentions,
  keywords,
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
    ...(creator ? { creator } : {}),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(path),
    dateModified: updated ? new Date(updated).toISOString().slice(0, 10) : undefined,
    isAccessibleForFree: true,
    about,
    ...(mentions?.length
      ? {
          mentions: mentions.map((m) => ({
            '@type': 'DefinedTerm',
            name: m.name,
            ...(m.url ? { url: m.url } : {}),
          })),
        }
      : {}),
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
  };
}
