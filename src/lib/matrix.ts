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
    lspChip: 'LSP7',
    lspLabel: 'Digital Asset',
    verdict: 'native receiver hooks, operator + LSP6 account permissions',
    href: '/standards/compare/erc20-lsp7/',
  },
  {
    ercChip: 'ERC-721',
    ercLabel: 'identifiable NFT',
    lspChip: 'LSP8',
    lspLabel: 'Identifiable Asset',
    verdict: 'bytes32 IDs, LSP4 metadata, ERC-725Y per-token data',
    href: '/standards/compare/erc721-lsp8/',
  },
  {
    ercChip: 'ERC-1155',
    ercLabel: 'multi-asset contract',
    lspChip: 'LSP7+LSP8',
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
    href: '/erc-165/',
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
    lspChip: 'LSP7+LSP1',
    lspLabel: 'safer receiver model',
    verdict: 'LSP1 universal receiver, no reentrancy-prone tokensReceived',
    href: '/erc-777/',
  },
  {
    ercChip: 'ERC-1271',
    ercLabel: 'smart-account signature',
    lspChip: 'LSP0',
    lspLabel: 'profile-native',
    verdict: 'same isValidSignature shape, account is the canonical signer',
    href: '/erc-1271/',
  },
  {
    ercChip: 'ERC-1363',
    ercLabel: 'transferAndCall',
    lspChip: 'LSP7+LSP1',
    lspLabel: 'native, not opt-in',
    verdict: 'transfer + receiver hook is the default, not a wrapper',
    href: '/erc-1363/',
  },
  {
    ercChip: 'ERC-2535',
    ercLabel: 'diamond proxy',
    lspChip: 'LSP17',
    lspLabel: 'Contract Extension',
    verdict: 'fallback router by selector, no upgrade authority needed',
    href: '/standards/compare/erc2535-lsp17/',
  },
  {
    ercChip: 'ERC-2612',
    ercLabel: 'permit (gasless approve)',
    lspChip: 'LSP6+LSP25',
    lspLabel: 'account-level relay',
    verdict: 'authorization at the account, not per-token signatures',
    href: '/erc-2612/',
  },
  {
    ercChip: 'ERC-4626',
    ercLabel: 'tokenized vault',
    lspChip: '(complement)',
    lspLabel: 'LSP account layer',
    verdict: 'keep vault accounting, improve permissions/metadata/relay around it',
    href: '/erc-4626/',
  },
  {
    ercChip: 'ERC-4337',
    ercLabel: 'account abstraction',
    lspChip: 'LSP0+LSP6+LSP20+LSP25',
    lspLabel: 'native smart account',
    verdict: 'no bundler, no EntryPoint — the account is the entry point',
    href: '/standards/compare/erc4337-lsp-stack/',
  },
  {
    ercChip: 'ERC-4906',
    ercLabel: 'metadata update event',
    lspChip: 'LSP4+ERC-725Y',
    lspLabel: 'native dynamic keys',
    verdict: 'metadata is typed key-value, not an event saying "go refetch"',
    href: '/erc-4906/',
  },
  {
    ercChip: 'ERC-6551',
    ercLabel: 'token-bound accounts',
    lspChip: 'LSP0',
    lspLabel: 'profile contract',
    verdict: 'a Universal Profile is already a contract account',
    href: '/erc-6551/',
  },
  {
    ercChip: 'EIP-7702',
    ercLabel: 'EOA delegation',
    lspChip: 'LSP0',
    lspLabel: 'full smart account',
    verdict: 'profile is a permanent contract account — no per-tx delegation',
    href: '/eip-7702/',
  },
  {
    ercChip: 'EOA',
    ercLabel: 'externally owned account',
    lspChip: 'LSP0+LSP3+LSP6',
    lspLabel: 'Universal Profile',
    verdict: 'account + metadata + controllers as one user-owned object',
    href: '/standards/compare/eoa-universal-profile/',
  },
];
