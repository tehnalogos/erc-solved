import { defineCollection, z } from 'astro:content';

const sideSchema = z.object({
  chip: z.string(),
  code: z.string(),
  tags: z.array(z.string()),
});

const ercEnum = z.enum(['20', '721', '1155', 'EOA', '4337', '725', '165', 'other']);

const problems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    query: z.string(),
    description: z.string(),
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
    oneLine: z.string(),
    description: z.string(),
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
    left: z.object({ chip: z.string(), label: z.string() }),
    right: z.object({ chip: z.string(), label: z.string() }),
    description: z.string(),
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

const migrate = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    from: z.string(),
    to: z.string(),
    description: z.string(),
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
    vertical: z.string(),
    description: z.string(),
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
    headline: z.string(),
    pageTitle: z.string(),
    description: z.string(),
    tagline: z.string(),
    bootStrip: z.string(),
    standardAuthors: z.array(z.string()),
    proposed: z.string(),
    eipNumber: z.string().optional(),
    abi: z.string(),
    tldr: z.string(),
    definition: z.string().optional(),
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
  }),
});

export const collections = { problems, standards, compare, migrate, build, erc };
