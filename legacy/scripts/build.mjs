import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { docs, featuredRoutes, home, nav, pages, problemGroups, site } from '../src/site-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const today = new Date().toISOString().slice(0, 10);
const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

const homePage = {
  slug: '/',
  title: site.title,
  h1: home.h1,
  description: site.description,
  type: 'home',
};

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function absoluteUrl(slug = '/') {
  if (slug.startsWith('http')) return slug;
  return `${site.origin}${slug}`;
}

function outputPath(slug) {
  if (slug === '/') return path.join(publicDir, 'index.html');
  return path.join(publicDir, slug.replace(/^\/|\/$/g, ''), 'index.html');
}

function renderNav() {
  return `
    <a class="brand" href="/" aria-label="${escapeHtml(site.name)} home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span>
        <strong>${escapeHtml(site.name)}</strong>
        <small>${escapeHtml(site.tagline)}</small>
      </span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      ${nav
        .map((item) => {
          const external = item.href.startsWith('http');
          return `<a href="${escapeHtml(item.href)}"${external ? ' rel="noopener noreferrer"' : ''}>${escapeHtml(item.label)}</a>`;
        })
        .join('')}
    </nav>
  `;
}

function renderLayout(page, content, options = {}) {
  const canonical = absoluteUrl(page.slug);
  const title = page.slug === '/' ? page.title : `${page.title} | ${site.name}`;
  const schema = renderSchema(page, options.schemaType);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:type" content="${page.slug === '/' ? 'website' : 'article'}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:site_name" content="${escapeHtml(site.name)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#070712">
    <link rel="stylesheet" href="/styles.css">
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
  </head>
  <body>
    <canvas id="starfield" aria-hidden="true"></canvas>
    <div class="scanline" aria-hidden="true"></div>
    <header class="site-header">
      ${renderNav()}
    </header>
    ${content}
    <footer class="site-footer">
      <div>
        <strong>${escapeHtml(site.name)}</strong>
        <p>ERCs gave Ethereum composability. LSPs add the surrounding system for metadata, permissions, receiver awareness, and account-native UX.</p>
      </div>
      <div class="footer-links">
        <a href="/erc-problems/">Problem index</a>
        <a href="${docs.lukso}" rel="noopener noreferrer">Official LUKSO docs</a>
      </div>
    </footer>
    <script src="/app.js" type="module"></script>
  </body>
</html>`;
}

function renderSchema(page, schemaType = 'TechArticle') {
  if (page.slug === '/') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ERCs, Solved',
        url: site.origin,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.origin,
        description: site.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${site.origin}/erc-problems/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];
  }

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: site.name,
      item: site.origin,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: page.h1,
      item: absoluteUrl(page.slug),
    },
  ];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    },
    {
      '@context': 'https://schema.org',
      '@type': schemaType,
      headline: page.h1,
      description: page.description,
      author: {
        '@type': 'Organization',
        name: 'ERCs, Solved',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ERCs, Solved',
      },
      about: page.tags || ['Ethereum standards', 'LUKSO standards'],
      mainEntityOfPage: absoluteUrl(page.slug),
      dateModified: today,
      isAccessibleForFree: true,
    },
  ];
}

function renderHero() {
  const featured = featuredRoutes
    .map((slug) => pageBySlug.get(slug))
    .filter(Boolean)
    .map(
      (page) => `
        <a class="mission-card" href="${page.slug}">
          <span>${escapeHtml(page.kicker)}</span>
          <strong>${escapeHtml(page.h1)}</strong>
          <small>${escapeHtml(page.description)}</small>
        </a>`,
    )
    .join('');

  return renderLayout(
    homePage,
    `
    <main>
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">LSP guides for Ethereum developers</p>
          <h1>${escapeHtml(home.h1)}</h1>
          <p class="hero-subhead">${escapeHtml(home.subhead)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="${home.primaryCta.href}">${escapeHtml(home.primaryCta.label)}</a>
            <a class="button button-secondary" href="${home.secondaryCta.href}">${escapeHtml(home.secondaryCta.label)}</a>
          </div>
        </div>
        <aside class="ship-console" aria-label="Mission signal">
          <span class="console-label">Ship computer</span>
          <strong>ERCs are interfaces. LSPs are systems.</strong>
          <p>${escapeHtml(home.signal)}</p>
          <div class="console-grid" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
        </aside>
      </section>

      <section class="section-band">
        <div class="section-heading">
          <p class="eyebrow">Diagnosis deck</p>
          <h2>Start with the failure mode</h2>
          <p>Each guide begins with an ERC problem developers already recognize, then maps it to a LUKSO standard pattern.</p>
        </div>
        <div class="mission-grid">
          ${featured}
        </div>
      </section>

      <section class="section-band split-band">
        <div>
          <p class="eyebrow">Field manual stance</p>
          <h2>Respect the interface. Fix the surrounding system.</h2>
          <p>ERC20, ERC721, and ERC1155 are successful because they are small common interfaces. The recurring product gaps appear around them: metadata, account permissions, receiver policy, transfer context, gas, and app-readable identity.</p>
        </div>
        <div class="telemetry-list">
          <span>ERC20 approvals -> LSP7 operators plus account permissions</span>
          <span>ERC721 tokenURI -> LSP4 metadata plus ERC725Y data</span>
          <span>EOA key risk -> Universal Profile controllers</span>
          <span>Gas-first onboarding -> LSP25 relay calls</span>
        </div>
      </section>
    </main>`,
    { schemaType: 'WebSite' },
  );
}

function renderProblemHub(page) {
  const groups = problemGroups
    .map(
      (group) => `
        <section class="problem-group">
          <div>
            <p class="eyebrow">Problem cluster</p>
            <h2>${escapeHtml(group.title)}</h2>
            <p>${escapeHtml(group.deck)}</p>
          </div>
          <div class="problem-list">
            ${group.items
              .map(
                (item) => `
                  <a class="problem-row" href="${item.href}">
                    <span class="query">${escapeHtml(item.query)}</span>
                    <span>${escapeHtml(item.diagnosis)}</span>
                    <strong>${escapeHtml(item.lsp)}</strong>
                  </a>`,
              )
              .join('')}
          </div>
        </section>`,
    )
    .join('');

  return renderLayout(
    page,
    `
    <main class="page-shell">
      ${renderPageIntro(page)}
      <section class="tldr"><strong>TL;DR</strong><p>${escapeHtml(page.tldr)}</p></section>
      ${groups}
    </main>`,
    { schemaType: 'CollectionPage' },
  );
}

function renderArticle(page) {
  return renderLayout(
    page,
    `
    <main class="page-shell">
      ${renderPageIntro(page)}
      <section class="tldr"><strong>TL;DR</strong><p>${escapeHtml(page.tldr)}</p></section>
      ${renderSections(page.sections)}
      ${renderCode(page.code)}
      ${renderTable(page.table)}
      ${renderDocs(page.docs)}
      ${renderRelated(page.related)}
    </main>`,
  );
}

function renderPageIntro(page) {
  const tags = page.tags
    ? `<div class="tag-row">${page.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>`
    : '';
  return `
    <section class="page-intro">
      <p class="eyebrow">${escapeHtml(page.kicker)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)}</p>
      ${tags}
    </section>
  `;
}

function renderSections(sections = []) {
  return sections
    .map((section) => {
      const body = (section.body || [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('');
      const bullets = section.bullets
        ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
        : '';
      return `
        <section class="content-section">
          <h2>${escapeHtml(section.title)}</h2>
          ${body}
          ${bullets}
        </section>`;
    })
    .join('');
}

function renderCode(blocks = []) {
  if (!blocks?.length) return '';
  return `
    <section class="code-compare" aria-label="Code comparison">
      ${blocks
        .map(
          (block) => `
            <figure>
              <figcaption>${escapeHtml(block.label)}</figcaption>
              <pre><code class="language-${escapeHtml(block.language || 'text')}">${escapeHtml(block.value)}</code></pre>
            </figure>`,
        )
        .join('')}
    </section>`;
}

function renderTable(table) {
  if (!table) return '';
  return `
    <section class="content-section table-section">
      <h2>${escapeHtml(table.caption)}</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${table.rows
              .map(
                (row) =>
                  `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>`;
}

function renderDocs(links = []) {
  if (!links?.length) return '';
  return `
    <section class="content-section link-bank">
      <h2>Learn more</h2>
      <div>
        ${links
          .map(
            (href) => `
              <a href="${escapeHtml(href)}" rel="noopener noreferrer">${escapeHtml(cleanLinkLabel(href))}</a>`,
          )
          .join('')}
      </div>
    </section>`;
}

function renderRelated(slugs = []) {
  const links = slugs.map((slug) => pageBySlug.get(slug)).filter(Boolean);
  if (!links.length) return '';
  return `
    <section class="content-section related">
      <h2>Next routes</h2>
      <div>
        ${links
          .map(
            (page) => `
              <a href="${page.slug}">
                <strong>${escapeHtml(page.h1)}</strong>
                <span>${escapeHtml(page.description)}</span>
              </a>`,
          )
          .join('')}
      </div>
    </section>`;
}

function cleanLinkLabel(href) {
  const url = new URL(href);
  const parts = url.pathname.split('/').filter(Boolean);
  if (!parts.length) return url.hostname;
  return `${url.hostname}/${parts.slice(-2).join('/')}`;
}

async function writePage(page, html) {
  const target = outputPath(page.slug);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, html);
}

async function copyAssets() {
  await fs.copyFile(path.join(root, 'src', 'styles.css'), path.join(publicDir, 'styles.css'));
  await fs.copyFile(path.join(root, 'src', 'app.js'), path.join(publicDir, 'app.js'));
}

async function writeSitemap(allPages) {
  const urls = allPages
    .map(
      (page) => `
  <url>
    <loc>${absoluteUrl(page.slug)}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
    )
    .join('');
  await fs.writeFile(
    path.join(publicDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`,
  );
}

async function writeRobots() {
  await fs.writeFile(
    path.join(publicDir, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${site.origin}/sitemap.xml
`,
  );
}

async function writeLlms(allPages) {
  const lines = [
    `# ${site.name}`,
    '',
    site.description,
    '',
    '## Core framing',
    '',
    '- ERCs are successful minimum interfaces for Ethereum composability.',
    '- LSPs add surrounding systems for metadata, permissions, receiver awareness, smart accounts, and onboarding.',
    '- This site maps common ERC developer problems to LUKSO LSP design patterns and official docs.',
    '',
    '## Pages',
    '',
    ...allPages.map((page) => `- ${absoluteUrl(page.slug)} - ${page.h1}: ${page.description}`),
    '',
    '## Official LUKSO docs',
    '',
    ...Object.values(docs).map((href) => `- ${href}`),
    '',
  ];
  await fs.writeFile(path.join(publicDir, 'llms.txt'), `${lines.join('\n')}\n`);
}

async function build() {
  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });
  await copyAssets();

  const allPages = [homePage, ...pages];
  await writePage(homePage, renderHero());

  for (const page of pages) {
    if (page.type === 'problemHub') {
      await writePage(page, renderProblemHub(page));
    } else {
      await writePage(page, renderArticle(page));
    }
  }

  await writeSitemap(allPages);
  await writeRobots();
  await writeLlms(allPages);
  console.log(`Built ${allPages.length} pages in ${path.relative(root, publicDir)}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
