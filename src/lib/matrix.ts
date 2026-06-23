export interface MatrixRow {
  ercChip: string;
  ercLabel: string;
  lspChip: string;
  lspLabel: string;
  verdict: string;
  href?: string;
}

export const matrixRows: MatrixRow[] = [
  {
    ercChip: 'ERC-20',
    ercLabel: 'fungible token',
    lspChip: 'LSP·7',
    lspLabel: 'Digital Asset',
    verdict: 'native receiver hooks, operator + LSP6 account permissions',
    href: '/standards/compare/erc20-lsp7/',
  },
  {
    ercChip: 'ERC-721',
    ercLabel: 'identifiable NFT',
    lspChip: 'LSP·8',
    lspLabel: 'Identifiable Asset',
    verdict: 'bytes32 IDs, LSP4 metadata, ERC-725Y per-token data',
    href: '/standards/compare/erc721-lsp8/',
  },
  {
    ercChip: 'ERC-1155',
    ercLabel: 'multi-asset contract',
    lspChip: 'LSP·7+8',
    lspLabel: 'split by semantics',
    verdict: 'semantic boundary in the standard, not in token-id bits',
    href: '/standards/compare/erc1155-lsp7-lsp8/',
  },
  {
    ercChip: 'ERC-165',
    ercLabel: 'interface detection',
    lspChip: '(kept)',
    lspLabel: 'still used by LSPs',
    verdict: 'LSPs publish ERC-165 interface IDs — no replacement needed',
  },
  {
    ercChip: 'ERC-725',
    ercLabel: 'key-value store',
    lspChip: '(substrate)',
    lspLabel: 'every LSP builds on it',
    verdict: 'the ERC-725Y data store is the foundation of LSP metadata',
    href: '/standards/erc725/',
  },
  {
    ercChip: 'ERC-777',
    ercLabel: 'token hooks',
    lspChip: 'LSP·7+1',
    lspLabel: 'safer receiver model',
    verdict: 'LSP1 universal receiver, no reentrancy-prone tokensReceived',
  },
  {
    ercChip: 'ERC-1271',
    ercLabel: 'smart-account signature',
    lspChip: 'LSP·0',
    lspLabel: 'profile-native',
    verdict: 'same isValidSignature shape, account is the canonical signer',
  },
  {
    ercChip: 'ERC-1363',
    ercLabel: 'transferAndCall',
    lspChip: 'LSP·7+1',
    lspLabel: 'native, not opt-in',
    verdict: 'transfer + receiver hook is the default, not a wrapper',
  },
  {
    ercChip: 'ERC-2535',
    ercLabel: 'diamond proxy',
    lspChip: 'LSP·17',
    lspLabel: 'Contract Extension',
    verdict: 'fallback router by selector, no upgrade authority needed',
    href: '/standards/compare/erc2535-lsp17/',
  },
  {
    ercChip: 'ERC-2612',
    ercLabel: 'permit (gasless approve)',
    lspChip: 'LSP·6+25',
    lspLabel: 'account-level relay',
    verdict: 'authorization at the account, not per-token signatures',
  },
  {
    ercChip: 'ERC-4337',
    ercLabel: 'account abstraction',
    lspChip: 'LSP·0+6+20+25',
    lspLabel: 'native smart account',
    verdict: 'no bundler, no EntryPoint — the account is the entry point',
    href: '/standards/compare/erc4337-lsp-stack/',
  },
  {
    ercChip: 'ERC-4906',
    ercLabel: 'metadata update event',
    lspChip: 'LSP·4+725Y',
    lspLabel: 'native dynamic keys',
    verdict: 'metadata is typed key-value, not an event saying "go refetch"',
  },
  {
    ercChip: 'ERC-6551',
    ercLabel: 'token-bound accounts',
    lspChip: 'LSP·0',
    lspLabel: 'profile contract',
    verdict: 'a Universal Profile is already a contract account',
  },
  {
    ercChip: 'ERC-7702',
    ercLabel: 'EOA delegation',
    lspChip: 'LSP·0',
    lspLabel: 'full smart account',
    verdict: 'profile is a permanent contract account — no per-tx delegation',
  },
  {
    ercChip: 'EOA',
    ercLabel: 'externally owned account',
    lspChip: 'LSP·0+3+6',
    lspLabel: 'Universal Profile',
    verdict: 'account + metadata + controllers as one user-owned object',
    href: '/standards/compare/eoa-universal-profile/',
  },
];
