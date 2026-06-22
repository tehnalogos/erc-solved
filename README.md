# ERCs, Solved.

A spec-grade developer field guide. ERCs are interfaces. LSPs are the system.

## Commands

```sh
npm install
npm run dev      # astro dev
npm run build    # static HTML into dist/
npm run preview  # serve dist/
```

## Structure

- `src/pages/` — routes
- `src/layouts/` — page templates (Base, Problem, Comparison, Migration, Explainer, Hub, Build)
- `src/components/` — `primitives/` (DiffArrow, SpecBlock, LogLine, Verdict, Crossref, Authorship), `brand/`, `nav/`
- `src/content/` — MDX collections (problems, standards, compare, migrate, build, authors)
- `src/styles/` — `tokens.css`, `reset.css`, `type.css`
- `legacy/` — the prior hand-rolled build, preserved for content extraction
