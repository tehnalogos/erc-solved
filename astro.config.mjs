import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://www.ercsolved.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), preact()],
  vite: {
    build: {
      rollupOptions: {
        external: [/\/pagefind\/.*/],
      },
    },
  },
});
