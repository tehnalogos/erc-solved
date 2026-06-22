# ERCs, Solved

Static site for ERC pain point pages that introduce LUKSO LSP design patterns.

## Commands

```sh
npm run build
npm run dev
```

The site builds into `public/` and serves clean URLs from the local Node server.

## Content model

- `src/site-data.mjs` contains page metadata, article content, problem clusters, and official docs links.
- `scripts/build.mjs` renders crawlable HTML pages, JSON-LD, `sitemap.xml`, `robots.txt`, and `llms.txt`.
- `src/styles.css` and `src/app.js` define the spaceship field-manual interface.

The editorial stance is: ERCs are successful minimum interfaces; LSPs add the surrounding system for metadata, permissions, receiver awareness, smart accounts, and onboarding.
