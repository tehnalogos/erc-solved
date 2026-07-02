# Authoring cheatsheet — four surfaces per page

Every content page speaks to four different consumers. Each consumer has different constraints and reads different text. Write for each surface separately; don't share copy across them or the site flattens to one voice on every channel.

## The surfaces

| Surface | Field(s) | Consumer | Length | Voice |
|---|---|---|---|---|
| **Display** | `title` (+ optional `h1`) | Humans reading the page | Unbounded | Brand voice, unbounded, whatever reads best as an H1 |
| **SERP** | `seoTitle` + `metaDescription` | Google/Bing search result listing | Title ≤55c · desc 140–160c | Functional. Keyword-forward. Clicks are the KPI. |
| **Social** | `ogTitle` + `ogDescription` | X / LinkedIn / Slack preview cards | Title ≤70c · desc ≤200c | Editorial. Contrarian or provocative. Shares are the KPI. |
| **GEO** | `summary` + `about[]` (+ `answerFirst` on question-form pages) | LLM answer engines (ChatGPT, Perplexity, AI Overview, Copilot) | Summary 200–500c | Answer-first, factual, entity-rich. Citations are the KPI. |

## The four briefs

### SERP

`seoTitle` — ≤55 chars. Base auto-appends "· ERCs, Solved" (15c) → final `<title>` under Google's ~70c soft cap.
- Head keyword within the first three words.
- Front-load the differentiator or the specific answer, not the category.
- Colons pack two ideas — canonical SERP pattern.
- Match the query-intent shape (definition, comparison, decision, how-to).

`metaDescription` — 140–160 chars.
- Open with the answer or the pain. Never "Learn about…".
- Include primary + one secondary keyword naturally.
- End on a value proposition or action verb ("compare", "decide", "ship").
- No brand phrase (`Base` doesn't append here). No ellipsis.

### Social

`ogTitle` — ≤70 chars.
- Opinion-forward, contrarian, curiosity-driven.
- Think: first line of an X post that earned a repost.
- Different job from `seoTitle`. The SERP title is functional; this is the hook.

`ogDescription` — ≤200 chars.
- Escalate the `ogTitle` thesis with concrete details — numbers, dates, standard names.
- Conversational. Sets up the click. Not a summary of the page body.

### GEO / LLM

`summary` — 200–500 chars.
- Answer-first sentence, then entity-rich context.
- Sentences must read cleanly **out of context** — LLMs quote fragments.
- Name specific standards, chains, and tradeoffs. Disambiguate against similar entities.

`about[]` — 3–8 canonical entity strings.
- Entities, not marketing terms. "ERC-20" ✓ · "the ERC-20 problem" ✗.
- Feeds JSON-LD entity graph → Google Knowledge Graph + LLM answer citations.

`answerFirst` — 40–80 words, one paragraph. Question-form landing pages only (best-blockchain, compare, architecture — pages that answer a "what are the best…" query).
- Ranked-list format when appropriate.
- Visible without scroll — Featured Snippet and AI Overview extract from here.

### Display

`title` + body copy — brand voice, no length limits. Zero SEO constraint.

## Worked example — `/erc-20/`

```yaml
title: "ERC-20"                                                       # display
seoTitle: "ERC-20: origin, ABI, limits, and LSP7 successor"           # 51c SERP
metaDescription: >-                                                    # 156c SERP
  ERC-20 is Ethereum's fungible token standard. See the six-function ABI,
  the design limits Vogelsteller called out, and the LSP7 successor he
  shipped on LUKSO.
ogTitle: "The ERC-20 author quietly built its successor. It's LSP7."  # 60c social
ogDescription: >-                                                      # 178c social
  Fabian Vogelsteller proposed ERC-20 in November 2015. Six functions,
  two events, one economy on top. Then he co-founded LUKSO and shipped
  LSP7 as the standard he wished he'd written.
summary: >-                                                            # 279c GEO
  ERC-20 is Ethereum's fungible token standard, proposed in November
  2015 by Fabian Vogelsteller and co-authored with Vitalik Buterin.
  This is the origin, the ABI, the well-known limitations — and the
  LUKSO LSP7 standard Vogelsteller designed to replace it.
about:
  - "ERC-20"
  - "Ethereum fungible token standard"
  - "Fabian Vogelsteller"
  - "Vitalik Buterin"
  - "LUKSO LSP7"
  - "EIP-20"
  - "Token approvals"
```

## Fallback behavior — what happens when you leave a field blank

| If you omit… | Base.astro derives it from… | Result |
|---|---|---|
| `seoTitle` | `title` | Display voice on the SERP — probably too short and un-keyworded. |
| `metaDescription` | `truncateSmart(summary, 160)` | Sentence-boundary trim of `summary`. Usually reads clean but never CTR-tuned. |
| `ogTitle` | resolved SEO title | SERP voice on social. Rarely optimal. |
| `ogDescription` | resolved `metaDescription` | Same. |
| `about` | Layout-derived (contender chips, approach names, chains, etc.) | Mechanical. LLMs get the entity graph but not the curation. |
| `answerFirst` | (not rendered) | No featured-snippet bait on question-form pages — hurts AI Overview eligibility. |

Falling back is safe, not optimal. Write the surface you care about; let the rest fall back.

## When to override vs let fall back

- Every hub page and every high-intent landing page → author all four surfaces.
- ERC / problem / standard explainers → author SERP + GEO always; social if the page has a share-worthy thesis.
- Long-tail internal pages → let SERP fallback, but always author `summary` + `about[]` for the LLM layer.
