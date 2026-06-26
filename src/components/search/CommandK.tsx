import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

interface PagefindAPI {
  search: (query: string) => Promise<{
    results: Array<{
      id: string;
      data: () => Promise<{
        url: string;
        excerpt: string;
        meta: Record<string, string>;
        filters?: Record<string, string[]>;
      }>;
    }>;
  }>;
  options?: (opts: Record<string, unknown>) => Promise<void> | void;
  init?: () => Promise<void> | void;
}

type LoadState = 'idle' | 'loading' | 'ready' | 'unavailable';

interface ResultItem {
  url: string;
  title: string;
  excerpt: string;
  kind?: string;
}

const STARTING_POINTS: { q: string; href: string }[] = [
  { q: 'erc20 approval risks', href: '/problems/erc20-approval-risks/' },
  { q: 'erc721 dynamic metadata', href: '/problems/erc721-dynamic-metadata/' },
  { q: 'erc-4337 alternatives', href: '/problems/erc4337-bundler-tax/' },
  { q: 'erc20 transfer hooks', href: '/problems/erc20-transfer-hooks/' },
  { q: 'social recovery smart wallets', href: '/problems/social-recovery/' },
  { q: 'safetransferfrom problems', href: '/problems/erc721-safe-transfer/' },
];

const VERTICALS: { label: string; href: string }[] = [
  { label: 'Token economics',          href: '/build/token-economics/' },
  { label: 'Dynamic NFTs',             href: '/build/dynamic-nfts/' },
  { label: 'Smart wallet UX',          href: '/build/smart-wallet-ux/' },
  { label: 'Gasless onboarding',       href: '/build/gasless-onboarding/' },
  { label: 'Profile-native apps',      href: '/build/profile-native-apps/' },
  { label: 'Extending deployed code',  href: '/build/extending-deployed-contracts/' },
];

declare global {
  interface Window { pagefind?: PagefindAPI }
}

export default function CommandK({ initialQuery = '' }: { initialQuery?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [highlight, setHighlight] = useState(0);
  const [load, setLoad] = useState<LoadState>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<PagefindAPI | null>(null);
  const initStartedRef = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setResults([]);
    setHighlight(0);
  }, []);

  // Open on ⌘K / Ctrl+K / "/"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !(e.metaKey || e.ctrlKey)
        && document.activeElement?.tagName !== 'INPUT'
        && document.activeElement?.tagName !== 'TEXTAREA';
      if (isModK || isSlash) {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Listen for header search trigger
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('ercs:open-search', onOpen);
    return () => window.removeEventListener('ercs:open-search', onOpen);
  }, []);

  // Lazy-load Pagefind exactly once, the first time the dialog opens.
  // No `load` in deps and no cleanup-cancellation — those caused a race where
  // setLoad('loading') re-fired this effect and the original run got cancelled
  // before it could resolve. initStartedRef makes the load idempotent.
  useEffect(() => {
    if (!open) return;
    if (initStartedRef.current) return;
    initStartedRef.current = true;
    setLoad('loading');

    (async () => {
      const indexUrl = `${window.location.origin}/pagefind/pagefind.js`;

      // Pre-check that the index file exists, with a hard timeout so a slow
      // dev server can't strand the UI in "Loading…".
      try {
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 3000);
        const probe = await fetch(indexUrl, { method: 'HEAD', signal: ctl.signal });
        clearTimeout(timer);
        if (!probe.ok) throw new Error(`pagefind index missing: ${probe.status}`);
      } catch (err) {
        console.warn('[ercs] pagefind index not reachable —', err);
        setLoad('unavailable');
        return;
      }

      try {
        // @ts-expect-error — runtime-only dynamic import
        const mod = await import(/* @vite-ignore */ indexUrl);
        const api: PagefindAPI = mod.default || mod;
        if (!api || typeof api.search !== 'function') {
          throw new Error('pagefind module did not expose search()');
        }
        // Fire-and-forget options() — pagefind lazy-inits on first search()
        // anyway. Some setups have init() hang on options(), so we don't await.
        if (api.options) { void api.options({}); }
        pagefindRef.current = api;
        window.pagefind = api;
        setLoad('ready');
      } catch (err) {
        console.error('[ercs] pagefind failed to initialize', err);
        setLoad('unavailable');
      }
    })();
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Run queries (debounced). Also runs when load becomes 'ready' so any
  // text typed while pagefind was still loading gets searched immediately.
  useEffect(() => {
    if (!open) return;
    if (load !== 'ready' || !pagefindRef.current) return;
    if (!query.trim()) { setResults([]); return; }
    const handle = setTimeout(async () => {
      try {
        const search = await pagefindRef.current!.search(query);
        const items = await Promise.all(
          search.results.slice(0, 8).map(async r => {
            const d = await r.data();
            return {
              url: d.url.replace(/\.html$/, '/'),
              title: d.meta?.title || d.url,
              excerpt: stripHtml(d.excerpt),
              kind: d.meta?.kind,
            } as ResultItem;
          }),
        );
        setResults(items);
        setHighlight(0);
      } catch (err) {
        console.error('[ercs] pagefind search failed', err);
        setResults([]);
      }
    }, 120);
    return () => clearTimeout(handle);
  }, [query, open, load]);

  const showEmpty = useMemo(() => open && query.trim() === '', [open, query]);

  // Build the list of navigable links — search results, or curated empty-state items.
  const navList = useMemo(() => {
    if (results.length > 0) return results.map(r => r.url);
    if (showEmpty) return [...STARTING_POINTS.map(t => t.href), ...VERTICALS.map(v => v.href)];
    return [];
  }, [results, showEmpty]);

  // Keyboard navigation works for both result lists and the empty-state grid.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (navList.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight(h => (h + 1) % navList.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight(h => (h - 1 + navList.length) % navList.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        window.location.href = navList[highlight] ?? navList[0];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, navList, highlight]);

  if (!open) return null;

  return (
    <div class="ck-backdrop" role="dialog" aria-modal="true" aria-label="Search">
      <button class="ck-shroud" aria-label="Close" onClick={close} />
      <div class="ck-shell">
        <div class="ck-bar">
          <span class="ck-sigil" aria-hidden="true">⌘K</span>
          <input
            ref={inputRef}
            class="ck-input"
            type="text"
            placeholder="search problems, standards, comparisons…"
            value={query}
            onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
            spellcheck={false}
            autocomplete="off"
          />
          <span class="ck-esc" aria-hidden="true">esc</span>
        </div>

        <div class="ck-body">
          {showEmpty && (
            <>
              <div class="ck-group">
                <span class="ck-group-label">start here</span>
                <ul>
                  {STARTING_POINTS.map((t, i) => (
                    <li>
                      <a class={`ck-row ${highlight === i ? 'active' : ''}`} href={t.href}>
                        <span class="ck-q">{t.q}</span>
                        <span class="ck-caret">→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div class="ck-group">
                <span class="ck-group-label">what are you building?</span>
                <ul>
                  {VERTICALS.map((v, i) => {
                    const idx = STARTING_POINTS.length + i;
                    return (
                      <li>
                        <a class={`ck-row ${highlight === idx ? 'active' : ''}`} href={v.href}>
                          <span class="ck-q">{v.label}</span>
                          <span class="ck-caret">→</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}

          {!showEmpty && results.length === 0 && (
            <div class="ck-empty">
              {load === 'loading' && 'Loading search index…'}
              {load === 'unavailable' && (
                <>
                  <p><strong>Search index not available.</strong></p>
                  <p class="ck-hint">
                    The Pagefind index is built at <code>npm run build</code> and only ships in the
                    production preview. In dev mode, use the curated entry points (clear the input)
                    or navigate via <a href="/problems/">/problems/</a>, <a href="/standards/">/standards/</a>,
                    <a href="/build/"> /build/</a>.
                  </p>
                </>
              )}
              {load === 'ready' && 'No results. Try a shorter query.'}
              {load === 'idle' && 'Press a key to begin.'}
            </div>
          )}

          {results.length > 0 && (
            <ul class="ck-results">
              {results.map((r, i) => (
                <li>
                  <a class={`ck-result ${i === highlight ? 'active' : ''}`} href={r.url}>
                    <span class="ck-title">{r.title.replace(/ · ERCs, Solved.*$/, '')}</span>
                    <span class="ck-excerpt">{r.excerpt}</span>
                    <span class="ck-url">{r.url}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div class="ck-foot">
          <span>↑↓ navigate</span>
          <span class="ck-sep">·</span>
          <span>enter open</span>
          <span class="ck-sep">·</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

function stripHtml(s: string) {
  return s.replace(/<\/?[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
