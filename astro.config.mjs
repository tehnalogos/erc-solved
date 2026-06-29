import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

const SITE_HOST = 'https://www.ercsolved.dev';
const INDEXNOW_KEY = 'd3c4e88f5a1b4f5da9c6e0b7c2a4f9e1';

const indexNow = () => ({
  name: 'indexnow-submission',
  hooks: {
    'astro:build:done': async ({ pages, logger }) => {
      if (process.env.INDEXNOW_SKIP === '1') {
        logger.info('indexnow: skipped (INDEXNOW_SKIP=1)');
        return;
      }
      if (!process.env.NETLIFY && !process.env.VERCEL && !process.env.INDEXNOW_FORCE) {
        logger.info('indexnow: skipped (not running in CI; set INDEXNOW_FORCE=1 to override)');
        return;
      }
      const urlList = pages.map((p) => `${SITE_HOST}/${p.pathname}`.replace(/\/+$/, '/'));
      try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            host: 'www.ercsolved.dev',
            key: INDEXNOW_KEY,
            keyLocation: `${SITE_HOST}/${INDEXNOW_KEY}.txt`,
            urlList,
          }),
        });
        logger.info(`indexnow: submitted ${urlList.length} URLs, status=${res.status}`);
      } catch (err) {
        logger.warn(`indexnow: submission failed — ${err?.message ?? err}`);
      }
    },
  },
});

export default defineConfig({
  site: SITE_HOST,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), preact(), indexNow()],
  vite: {
    build: {
      rollupOptions: {
        external: [/\/pagefind\/.*/],
      },
    },
  },
});
