import { defineCollection, z } from 'astro:content';

const sideSchema = z.object({
  chip: z.string(),
  code: z.string(),
  tags: z.array(z.string()),
});

const chipKindSchema = z.enum(['erc', 'eip', 'lsp', 'topic']);

const ercEnum = z.enum(['20', '721', '1155', 'EOA', '4337', '725', '165', 'other']);

// Shared SEO / social / GEO fields. Every collection spreads these into its
// schema. Each field targets a distinct surface (SERP result, social share
// card, LLM entity graph). Fallback resolution lives in Base.astro so leaving
// a field blank still produces a working page — but the four surfaces then
// share a single voice, which flattens CTR everywhere.
//
// Copywriting briefs live in docs/AUTHORING.md. Short version below.
const seoGeoFields = {
  /**
   * SERP result title. ≤55 chars — Base appends " · ERCs, Solved" (15c),
   * so final <title> stays under Google's ~70c soft cap. Head keyword in
   * the first 3 words. Front-load the differentiator, not the category.
   * Colons pack two ideas cleanly. Falls back to `title` when omitted.
   * Example: "ERC-20: origin, ABI, limits, and LSP7 successor"
   */
  seoTitle: z.string().optional(),
  /**
   * SERP snippet. 140–160 chars. Opens with the answer or the pain — never
   * "Learn about…". Include primary + one secondary keyword. Ends on a
   * value proposition or action verb. Falls back to a sentence-boundary
   * truncation of `summary` (via Base's truncateSmart helper).
   * Example: "ERC-20 is Ethereum's fungible token standard. See the six-
   *   function ABI, the design limits Vogelsteller called out, and the
   *   LSP7 successor he shipped on LUKSO."
   */
  metaDescription: z.string().optional(),
  /** Rare — H1 override when the visible page heading needs to differ from
   * `title` (e.g. animated word-stagger). Homepage uses JSX directly. */
  h1: z.string().optional(),
  /**
   * Social preview card title. ≤70 chars. Opinion-forward, contrarian, or
   * curiosity-driven — think first line of an X post that earned a repost.
   * Different job from seoTitle: SERP is functional, OG is the hook.
   * Falls back to the resolved SEO title.
   * Example: "The ERC-20 author quietly built its successor. It's LSP7."
   */
  ogTitle: z.string().optional(),
  /**
   * Social preview card body. ≤200 chars. Escalates the ogTitle thesis
   * with specifics (numbers, standard names, dates). Conversational, sets
   * up the click — not a summary of the page. Falls back to metaDescription.
   * Example: "Fabian Vogelsteller proposed ERC-20 in November 2015. Six
   *   functions, two events, one economy on top. Then he co-founded LUKSO
   *   and shipped LSP7 as the standard he wished he'd written."
   */
  ogDescription: z.string().optional(),
  /**
   * JSON-LD entity graph. 3–8 canonical entity strings (not marketing terms).
   * Feeds Google Knowledge Graph + LLM answer citation. Not rendered as
   * visible text. Falls back to layout-derived defaults per collection.
   * Example: ["ERC-20", "Fabian Vogelsteller", "LUKSO LSP7", "EIP-20"]
   */
  about: z.array(z.string()).default([]),
};

const problems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    tagline: z.string(),
    query: z.string(),
    summary: z.string(),
    quotableAnswer: z.string().optional(),
    erc: ercEnum,
    lsps: z.array(z.string()),
    diff: z.object({ from: sideSchema, to: sideSchema }),
    verdict: z.string(),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
    aliases: z.array(z.string()).default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    related: z.array(z.string()).default([]),
  }),
});

const standards = defineCollection({
  type: 'content',
  schema: z.object({
    kind: z.enum(['LSP', 'ERC']),
    id: z.string(),
    title: z.string(),
    ...seoGeoFields,
    oneLine: z.string(),
    summary: z.string(),
    purpose: z.enum(['Account', 'Token', 'Metadata', 'Social', 'Substrate', 'Permission', 'Execution']),
    abi: z.string(),
    solves: z.array(z.object({ pain: z.string(), href: z.string().optional() })).default([]),
    doesNotSolve: z.array(z.string()).default([]),
    companions: z.array(z.string()).default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const compare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    left: z.object({ chip: z.string(), label: z.string() }),
    right: z.object({ chip: z.string(), label: z.string() }),
    summary: z.string(),
    quotableAnswer: z.string().optional(),
    canonical: z.string().optional(),
    verdict: z.object({
      useLeft: z.string(),
      useRight: z.string(),
      neither: z.string().optional(),
    }),
    matrix: z
      .array(z.object({ row: z.string(), left: z.string(), right: z.string() }))
      .default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const ratingSchema = z.object({
  contender: z.string(),
  verdict: z.string(),
  note: z.string().optional(),
});

const sourceSchema = z.object({ label: z.string(), href: z.string().url() });

const bestBlockchain = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    useCase: z.string(),
    summary: z.string(),
    // Answer-first paragraph — rendered above the body for featured-snippet /
    // AI-Overview extraction. Repeat the head answer in 40-80 words using the
    // exact tokens people search for (plurals, gerunds, product-vs-app noun).
    answerFirst: z.string().optional(),
    // Alternate query phrasings. Fed into JSON-LD alternateName + keywords so
    // the crawler knows this page answers each variant.
    aliases: z.array(z.string()).default([]),
    // Question/answer pairs — rendered on-page as H3+P AND emitted as
    // FAQPage JSON-LD. Winning question-form long-tail queries requires both.
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    quotableAnswer: z.string(),
    criteria: z.array(z.object({ name: z.string(), evaluates: z.string() })),
    contenders: z.array(
      z.object({
        chip: z.string(),
        kind: z.enum(['L1', 'L2', 'non-EVM']),
        summary: z.string(),
      }),
    ),
    matrix: z.array(
      z.object({
        criterion: z.string(),
        ratings: z.array(ratingSchema),
      }),
    ),
    verdicts: z.array(z.object({ contender: z.string(), when: z.string() })),
    implementation: z
      .array(z.object({ chip: z.string(), label: z.string(), href: z.string() }))
      .default([]),
    sources: z.array(sourceSchema).default([]),
    methodologyHref: z.string().default('/research/methodology/'),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const architecture = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    pattern: z.string(),
    summary: z.string(),
    quotableAnswer: z.string(),
    approaches: z.array(
      z.object({
        name: z.string(),
        summary: z.string(),
        pros: z.array(z.string()).default([]),
        cons: z.array(z.string()).default([]),
        chains: z.array(z.string()).default([]),
      }),
    ),
    recommendation: z.string(),
    implementation: z
      .array(z.object({ chip: z.string(), label: z.string(), href: z.string() }))
      .default([]),
    sources: z.array(sourceSchema).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const crossChainCompare = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    contenders: z.array(z.string()),
    useCase: z.string(),
    summary: z.string(),
    quotableAnswer: z.string(),
    matrix: z.array(
      z.object({
        criterion: z.string(),
        values: z.array(z.string()),
      }),
    ),
    verdicts: z.array(z.object({ contender: z.string(), when: z.string() })),
    sources: z.array(sourceSchema).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const benchmarks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    summary: z.string(),
    quotableAnswer: z.string(),
    chains: z.array(z.string()),
    datasetCsv: z.string(),
    datasetJson: z.string(),
    methodologyHref: z.string().default('/research/methodology/'),
    tests: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        unit: z.string().optional(),
        results: z.array(
          z.object({
            chain: z.string(),
            value: z.string(),
            source: z.string().url().optional(),
          }),
        ),
        derivation: z.object({
          methodology: z.string(),
          citations: z.array(
            z.object({
              chain: z.string(),
              label: z.string(),
              href: z.string().url(),
              excerpt: z.string().optional(),
            }),
          ),
        }),
      }),
    ),
    sources: z.array(sourceSchema).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    lastRun: z.coerce.date(),
    updated: z.coerce.date(),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    summary: z.string(),
    kind: z.enum(['methodology', 'kpis', 'evals', 'note']).default('note'),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const migrate = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    from: z.string(),
    to: z.string(),
    summary: z.string(),
    quotableAnswer: z.string().optional(),
    estimate: z.string(),
    verdict: z.string(),
    gotchas: z.array(z.string()).default([]),
    verify: z.array(z.string()).default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    related: z.array(z.string()).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const build = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    ...seoGeoFields,
    vertical: z.string(),
    summary: z.string(),
    quotableAnswer: z.string().optional(),
    stack: z.array(z.string()),
    reading: z.array(z.object({ chip: z.string(), label: z.string(), href: z.string() })).default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),
  }),
});

const erc = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    ...seoGeoFields,
    standardKind: z.enum(['ERC', 'EIP', 'Topic']).default('ERC'),
    headline: z.string(),
    summary: z.string(),
    quotableAnswer: z.string().optional(),
    tagline: z.string(),
    bootStrip: z.string(),
    standardAuthors: z.array(z.string()).optional(),
    proposed: z.string().optional(),
    eipNumber: z.string().optional(),
    abi: z.string().optional(),
    tldr: z.string(),
    definition: z.string().optional(),

    // Narrative prose for each major section. Rendered as Markdown via marked.
    // (Replaces the previous <Fragment slot="..."> pattern, which silently
    // dropped content because Astro doesn't hoist named slots from inside
    // <Content /> renders of content-collection MDX.)
    lede: z.string().optional(),
    origin: z.string().optional(),
    spec: z.string().optional(),
    whatsBroken: z.string().optional(),
    vogelsteller: z.string().optional(),

    limits: z
      .array(
        z.object({
          title: z.string(),
          summary: z.string(),
          from: sideSchema,
          to: sideSchema,
          href: z.string().optional(),
          workarounds: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    luksoRoutes: z
      .array(
        z.object({
          chip: z.string(),
          label: z.string(),
          summary: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
    compareRows: z
      .array(z.object({ row: z.string(), left: z.string(), right: z.string() }))
      .default([]),
    compareRight: z
      .object({
        chip: z.string(),
        kind: chipKindSchema.default('lsp'),
        id: z.string().optional(),
        label: z.string().optional(),
      })
      .optional(),
    compareHref: z.string().optional(),
    useErc: z.string(),
    useLsp: z.string(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    aliases: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    docs: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    author: z.string().default('ercs-solved maintainers'),
    updated: z.coerce.date(),

    stats: z
      .array(
        z.object({
          k: z.string(),
          v: z.string(),
          href: z.string().optional(),
        }),
      )
      .default([]),
    timeline: z
      .array(
        z.object({
          year: z.string(),
          text: z.string(),
          href: z.string().optional(),
        }),
      )
      .default([]),
    glossary: z
      .array(z.object({ term: z.string(), def: z.string() }))
      .default([]),
    interfaceDiagram: z
      .array(
        z.object({
          group: z.string(),
          items: z.array(z.string()),
        }),
      )
      .default([]),
    primarySources: z
      .array(
        z.object({
          label: z.string(),
          href: z.string().url(),
          cite: z.string().optional(),
        }),
      )
      .default([]),
    mentions: z
      .array(z.object({ name: z.string(), url: z.string().url().optional() }))
      .default([]),
    personSchema: z
      .object({
        name: z.string(),
        jobTitle: z.string().optional(),
        worksFor: z
          .object({ name: z.string(), url: z.string().url().optional() })
          .optional(),
        sameAs: z.array(z.string().url()).default([]),
        knowsAbout: z.array(z.string()).default([]),
      })
      .optional(),
    howToMigration: z
      .object({
        name: z.string(),
        description: z.string(),
        toolHref: z.string().url().optional(),
        steps: z.array(z.object({ name: z.string(), text: z.string() })),
      })
      .optional(),
    termCode: z.string().optional(),
    ogImage: z.string().optional(),
    pivot: z
      .object({
        eyebrow: z.string().optional(),
        headline: z.string().optional(),
        highlight: z.string().optional(),
        tocLabel: z.string().optional(),
      })
      .optional(),

    // Optional per-section H2 overrides. Defaults render as answer-shaped
    // sentences ("How ERC-20 came to be." rather than "The origin story."),
    // which AI answer engines preferentially quote. Override on a page to
    // tailor the phrasing when the default doesn't fit.
    sectionHeadings: z
      .object({
        origin: z.string().optional(),
        spec: z.string().optional(),
        whatsBroken: z.string().optional(),
        authorCriticism: z.string().optional(),
        compare: z.string().optional(),
        whenToUseWhich: z.string().optional(),
      })
      .optional(),

    // When one of the spec's own authors has publicly criticised it, surface
    // the verbatim quotes here, each paired with the LSP that addresses it.
    // Renders as a dedicated band between What's-broken and the Second-act.
    authorCriticism: z
      .object({
        // Top-level author info is the default used when items don't specify
        // their own. Pages citing a single author (e.g. /erc-721/ → Shirley)
        // can populate just these and omit per-item overrides; pages citing
        // multiple authors (e.g. /gasless-transactions/) populate per-item.
        authorName: z.string().optional(),
        authorRole: z.string().optional(),
        sourceLabel: z.string().optional(),
        sourceUrl: z.string().url().optional(),
        intro: z.string(),
        items: z.array(
          z.object({
            quote: z.string(),
            theme: z.string(),
            lsps: z.array(z.string()),
            solution: z.string(),
            // Per-item overrides for multi-author pages
            authorName: z.string().optional(),
            authorRole: z.string().optional(),
            sourceLabel: z.string().optional(),
            sourceUrl: z.string().url().optional(),
          }),
        ),
        outro: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  problems,
  standards,
  compare,
  migrate,
  build,
  erc,
  bestBlockchain,
  architecture,
  crossChainCompare,
  benchmarks,
  research,
};
