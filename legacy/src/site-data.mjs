export const site = {
  name: 'ERCs, Solved',
  origin: 'https://ercsolved.dev',
  title: 'ERCs, Solved: LUKSO LSP Standards for Ethereum Developers',
  description:
    'A field manual for Ethereum developers comparing ERC pain points with LUKSO LSP standards for tokens, NFTs, metadata, permissions, receiver awareness, and onboarding.',
  tagline: 'ERC problems. LSP patterns. Better UX.',
};

export const docs = {
  lukso: 'https://docs.lukso.tech/',
  benefits: 'https://docs.lukso.tech/learn/benefits-lukso-standards/',
  erc725: 'https://docs.lukso.tech/standards/erc725/',
  lsp0: 'https://docs.lukso.tech/standards/accounts/lsp0-erc725account/',
  lsp1: 'https://docs.lukso.tech/standards/accounts/lsp1-universal-receiver/',
  lsp3: 'https://docs.lukso.tech/standards/metadata/lsp3-profile-metadata/',
  lsp4: 'https://docs.lukso.tech/standards/tokens/LSP4-Digital-Asset-Metadata/',
  lsp5: 'https://docs.lukso.tech/standards/metadata/lsp5-received-assets/',
  lsp6: 'https://docs.lukso.tech/standards/access-control/lsp6-key-manager/',
  lsp7: 'https://docs.lukso.tech/standards/tokens/LSP7-Digital-Asset/',
  lsp8: 'https://docs.lukso.tech/standards/tokens/LSP8-Identifiable-Digital-Asset/',
  lsp12: 'https://docs.lukso.tech/standards/metadata/lsp12-issued-assets/',
  lsp14: 'https://docs.lukso.tech/standards/access-control/lsp14-ownable-2-step/',
  lsp17: 'https://docs.lukso.tech/standards/accounts/lsp17-contract-extension/',
  lsp20: 'https://docs.lukso.tech/standards/accounts/lsp20-call-verification/',
  lsp25: 'https://docs.lukso.tech/standards/accounts/lsp25-execute-relay-call/',
  lsp26: 'https://docs.lukso.tech/standards/accounts/lsp26-follower-system/',
  migrateErc20:
    'https://docs.lukso.tech/learn/migrate/migrate-erc20-to-lsp7/',
  migrateErc721:
    'https://docs.lukso.tech/learn/migrate/migrate-erc721-to-lsp8/',
  profileMetadata:
    'https://docs.lukso.tech/learn/universal-profile/metadata/read-profile-data/',
  relayApi: 'https://docs.lukso.tech/tools/dapps/transaction-relay-api/',
};

export const nav = [
  { label: 'Problems', href: '/erc-problems/' },
  { label: 'Smart accounts', href: '/wallet-vs-universal-profile/' },
  { label: 'Guides', href: '/guides/migrate-erc20-to-lsp7/' },
  { label: 'LUKSO docs', href: docs.lukso },
];

export const home = {
  h1: 'EVM Problems, LSP Solutions',
  subhead:
    'ERC standards made Ethereum composable, but EVM builders still hit the same walls: ERC20 has no transfer hooks, approve is unsafe, tokenURI is static, safeTransferFrom is partial, ERC1155 packs too much, EOAs lose everything with one key, and 4337 wants its own bundler stack. ERCs, Solved names each problem in the words EVM developers search for, then shows how LUKSO LSP standards solve it.',
  primaryCta: { label: 'Find your EVM problem', href: '/erc-problems/' },
  secondaryCta: { label: 'ERC20 transfer hooks', href: '/erc20-transfer-hooks/' },
  signal:
    'ERCs are minimum interfaces. LSPs are the surrounding system: receiver hooks, account permissions, profile metadata, relay execution, and contract extensions designed to compose.',
};

export const featuredRoutes = [
  '/erc20-transfer-hooks/',
  '/erc20-approval-risks/',
  '/erc721-dynamic-metadata/',
  '/gasless-transactions-smart-accounts/',
  '/smart-contract-wallet-permissions/',
  '/eip-4337-alternatives/',
];

export const problemGroups = [
  {
    title: 'Token transfer problems',
    deck:
      'Approvals, recipient validation, transfer context, and hooks are where ERC20-era assumptions start to leak into product UX.',
    items: [
      {
        query: 'ERC20 approval risks',
        diagnosis:
          'Approvals split intent across approve and transferFrom, which creates stale allowance, phishing, and UX review problems.',
        lsp: 'LSP7 uses operators, transfer data, and receiver notifications. Universal Profiles can add LSP6 account permissions around the action.',
        href: '/erc20-approval-risks/',
      },
      {
        query: 'ERC20 transfer hooks (no receiver hook on ERC20)',
        diagnosis:
          'ERC20 transfers do not ask the recipient contract whether it can handle or react to the asset.',
        lsp: 'LSP7 transfers integrate with LSP1 Universal Receiver and include a force parameter plus a data payload.',
        href: '/erc20-transfer-hooks/',
      },
      {
        query: 'ERC1155 complexity (multi-asset contracts)',
        diagnosis:
          'One ERC1155 contract can mix fungible, semi-fungible, and unique items, so apps pay a decoding and indexing tax.',
        lsp: 'LSP7 covers fungible/semi-fungible, LSP8 covers identifiable assets. The semantic split lives in the standard.',
        href: '/erc1155-complexity/',
      },
    ],
  },
  {
    title: 'NFT metadata problems',
    deck:
      'NFT projects quickly outgrow a single tokenURI when metadata needs to be dynamic, per-token, verifiable, or app-readable.',
    items: [
      {
        query: 'ERC721 dynamic metadata',
        diagnosis:
          'ERC721 tokenURI is simple and widely supported, but dynamic traits often depend on servers, refresh buttons, and marketplace-specific behavior.',
        lsp: 'LSP8 combines bytes32 token IDs with ERC725Y storage and LSP4 metadata patterns for richer collection and token-level metadata.',
        href: '/erc721-dynamic-metadata/',
      },
      {
        query: 'ERC721 safe transfer problems',
        diagnosis:
          'safeTransferFrom only checks IERC721Receiver, so mixed-asset contracts and downstream calls still strand NFTs and ERC20s.',
        lsp: 'LSP1 Universal Receiver is one hook for all asset types. LSP7 and LSP8 use it through the transfer force flag.',
        href: '/erc721-safe-transfer-problems/',
      },
      {
        query: 'ERC721 tokenId uint256 limitation',
        diagnosis:
          'uint256 IDs are efficient, but richer identifiers often need extra mapping layers.',
        lsp: 'LSP8 token IDs are bytes32, which can represent hashes, serials, encoded references, or numeric IDs.',
        href: '/erc721-vs-lsp8/',
      },
    ],
  },
  {
    title: 'Wallet and account problems',
    deck:
      'EOAs are useful primitives, but consumer-grade apps need profile metadata, scoped access, recovery, signatures, and safer delegation.',
    items: [
      {
        query: 'smart contract wallet permissions',
        diagnosis:
          'A single private key cannot express app-specific authority, device roles, recovery access, or limited contract calls.',
        lsp: 'Universal Profiles use LSP6 Key Manager permissions and allowed calls to scope controller keys.',
        href: '/smart-contract-wallet-permissions/',
      },
      {
        query: 'social recovery smart wallets',
        diagnosis:
          'Seed phrases are a single point of failure. Recovery should be a permission graph, not a backup phrase.',
        lsp: 'A Universal Profile can register guardian or threshold controllers through LSP6 without giving up self-custody.',
        href: '/social-recovery-smart-wallets/',
      },
      {
        query: 'EIP-4337 alternatives',
        diagnosis:
          'ERC4337 layers a separate UserOperation pool, bundler, and EntryPoint on top of EOAs. Most teams do not want to run that infrastructure.',
        lsp: 'Universal Profiles use LSP0 + LSP6 + LSP25 + LSP20 to deliver smart-account UX without bundlers.',
        href: '/eip-4337-alternatives/',
      },
    ],
  },
  {
    title: 'Onboarding and receiver problems',
    deck:
      'The hardest adoption problems are often outside the token interface: gas, notifications, spam assets, and contract reactions.',
    items: [
      {
        query: 'gasless transactions smart accounts',
        diagnosis:
          'New users often need native tokens before they can do anything, which breaks onboarding.',
        lsp: 'LSP25 relay calls let Universal Profile actions be signed by a controller and submitted by a relayer.',
        href: '/gasless-transactions-smart-accounts/',
      },
      {
        query: 'contract extension after deployment',
        diagnosis:
          'Adding behavior to a deployed contract usually means proxies, diamonds, or off-chain modules. Each carries upgrade authority or storage risk.',
        lsp: 'LSP17 standardizes a fallback router so contracts can register new function selectors without an upgrade authority.',
        href: '/contract-extension-after-deployment/',
      },
      {
        query: 'wallet vs universal profile',
        diagnosis:
          '"Smart wallet" can mean an EOA UI, a Safe, a 4337 account, or something else. Apps integrating "all wallets" carry the complexity.',
        lsp: 'A Universal Profile is one account shape: LSP0 contract, LSP3 metadata, LSP6 permissions, LSP1 hooks.',
        href: '/wallet-vs-universal-profile/',
      },
    ],
  },
];

export const pages = [
  {
    slug: '/erc-problems/',
    type: 'problemHub',
    title: 'ERC Problems - LSP Solutions for Ethereum Developers',
    h1: 'Find your ERC problem',
    description:
      'A practical index of ERC20, ERC721, ERC1155, wallet, metadata, receiver, and onboarding problems mapped to LUKSO LSP patterns.',
    kicker: 'Problem index',
    tldr:
      'Start with the problem you are debugging. Each diagnosis links to an LSP pattern that keeps the ERC mental model but adds missing context around metadata, permissions, receiver awareness, and account UX.',
  },
  {
    slug: '/erc20-vs-lsp7/',
    type: 'article',
    title: 'ERC20 vs LSP7: Transfer Hooks, Metadata, and Safer Token UX',
    h1: 'ERC20 vs LSP7',
    description:
      'Compare ERC20 with LUKSO LSP7 for token transfers, approvals, metadata, receiver hooks, transfer context, and migration decisions.',
    kicker: 'Comparison',
    tags: ['ERC20', 'LSP7', 'token transfers', 'metadata', 'receiver hooks'],
    tldr:
      'ERC20 is the minimal fungible token interface that made tokens composable. LSP7 keeps the familiar balance and transfer model, then adds ERC725Y metadata, LSP1 receiver notifications, a force parameter, transfer data, and operator authorization so token movement can carry context.',
    sections: [
      {
        title: 'What ERC20 gets right',
        body: [
          'ERC20 works because it is small. Balances, transfers, approvals, and transferFrom are easy for exchanges, wallets, DeFi contracts, and indexers to support.',
          'That minimal interface is also why so many products build extra layers around it: allowlists, metadata APIs, spam filters, wrapper contracts, transfer routers, and off-chain explanations of what a transfer means.',
        ],
      },
      {
        title: 'Where developers hit limits',
        bullets: [
          'Approvals can be stale, unlimited, or hard for users to review.',
          'Transfers do not include a standard data payload for context.',
          'Recipient contracts are not notified through ERC20 itself.',
          'Metadata is mostly limited to name, symbol, and decimals conventions.',
          'Wallets often need event indexing to infer what assets an account owns.',
        ],
      },
      {
        title: 'How LSP7 changes the model',
        body: [
          'LSP7 is LUKSO\'s Digital Asset standard for fungible and semi-fungible assets. It uses ERC725Y for extensible metadata, LSP1 Universal Receiver notifications for sender and recipient reactions, and a transfer function that carries a force flag and arbitrary bytes data.',
          'The operator model is still amount-scoped authorization, so it should not be described as magic protection against every approval risk. The difference is that LSP7 is designed to work with account-level permissions, receiver notifications, and richer transfer context.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC20 transferFrom',
        language: 'solidity',
        value:
          'function transferFrom(address from, address to, uint256 amount) external returns (bool);',
      },
      {
        label: 'LSP7 transfer',
        language: 'solidity',
        value:
          'function transfer(\n  address from,\n  address to,\n  uint256 amount,\n  bool force,\n  bytes calldata data\n) external;',
      },
    ],
    table: {
      caption: 'Decision table',
      headers: ['Use ERC20 when', 'Use LSP7 when'],
      rows: [
        [
          'You need direct compatibility with existing ERC20-only infrastructure.',
          'You want token transfers with receiver awareness, context, and richer metadata.',
        ],
        [
          'Basic fungible balances and DeFi integration are the whole product surface.',
          'The token is part of a profile, creator, membership, or app UX that needs reactions.',
        ],
        [
          'The app already relies on ERC20 wrappers and mature off-chain indexing.',
          'You want the asset standard to participate in the account and metadata system.',
        ],
      ],
    },
    docs: [docs.lsp7, docs.lsp1, docs.lsp4, docs.migrateErc20],
    related: [
      '/erc20-approve-vs-lsp7-authorize-operator/',
      '/guides/migrate-erc20-to-lsp7/',
      '/erc-problems/',
    ],
  },
  {
    slug: '/erc20-approve-vs-lsp7-authorize-operator/',
    type: 'article',
    title: 'ERC20 approve Problem vs LSP7 authorizeOperator',
    h1: 'ERC20 approve problem -> LSP7 operator authorization',
    description:
      'Understand ERC20 approve and transferFrom pain points, then compare them with LSP7 authorizeOperator and Universal Profile permissions.',
    kicker: 'Diagnosis',
    tags: ['ERC20 approve', 'allowance', 'LSP7 operators', 'permissions'],
    tldr:
      'ERC20 approvals separate permission from action, which makes users review allowances without seeing the final transfer. LSP7 authorizeOperator is still an amount-based token authorization, but it fits into a broader LUKSO model with explicit operator events, receiver notifications, transfer data, and optional LSP6 account permissions.',
    sections: [
      {
        title: 'The ERC pattern',
        body: [
          'ERC20 approve lets an owner set an allowance for a spender. The spender later calls transferFrom. That pattern made DeFi possible, but it also means user intent is split across multiple transactions and often multiple interfaces.',
        ],
      },
      {
        title: 'Where it breaks down',
        bullets: [
          'Users approve a spender before seeing every future transfer.',
          'Unlimited approvals become a standing risk if a spender is compromised.',
          'Dapps often ask for approval amounts that are larger than the current action.',
          'Wallets struggle to explain what future transferFrom calls will do.',
        ],
      },
      {
        title: 'The LSP pattern',
        body: [
          'LSP7 uses authorizeOperator and revokeOperator for token-level authorization. That is not the same as LSP6 account permissions, and it should not be oversold as replacing every approval security concern.',
          'The stronger pattern appears when LSP7 is used with Universal Profiles: the account can restrict controllers with LSP6 permissions and allowed calls, while LSP7 transfers can carry data and notify senders and recipients through LSP1.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC20 approval',
        language: 'solidity',
        value:
          'function approve(address spender, uint256 amount) external returns (bool);\nfunction transferFrom(address from, address to, uint256 amount) external returns (bool);',
      },
      {
        label: 'LSP7 operator authorization',
        language: 'solidity',
        value:
          'function authorizeOperator(\n  address operator,\n  uint256 amount,\n  bytes calldata operatorNotificationData\n) external;\n\nfunction revokeOperator(address operator, bytes calldata operatorNotificationData) external;',
      },
    ],
    table: {
      caption: 'Safer authorization checklist',
      headers: ['Question', 'ERC20 approve', 'LSP7 plus Universal Profile'],
      rows: [
        [
          'Can the token transfer carry context?',
          'Not in the ERC20 transfer functions.',
          'Yes, LSP7 transfer includes bytes data.',
        ],
        [
          'Can the account limit what an app controller may call?',
          'Not at the token standard level.',
          'Yes, with LSP6 Key Manager permissions and allowed calls.',
        ],
        [
          'Does the recipient get a standard notification?',
          'No.',
          'Yes, through LSP1 when supported.',
        ],
      ],
    },
    docs: [docs.lsp7, docs.lsp6, docs.lsp1],
    related: ['/erc20-vs-lsp7/', '/guides/grant-dapp-permissions-lsp6/'],
  },
  {
    slug: '/erc721-vs-lsp8/',
    type: 'article',
    title: 'ERC721 vs LSP8: Dynamic Metadata, bytes32 Token IDs, and Receiver Hooks',
    h1: 'ERC721 vs LSP8',
    description:
      'Compare ERC721 with LUKSO LSP8 for NFT metadata, token IDs, transfer safety, receiver hooks, and migration decisions.',
    kicker: 'Comparison',
    tags: ['ERC721', 'LSP8', 'NFT metadata', 'bytes32 token IDs'],
    tldr:
      'ERC721 made NFTs interoperable through a simple ownerOf and transfer model. LSP8 keeps identifiable assets, but uses bytes32 token IDs, ERC725Y metadata, LSP4 metadata conventions, and LSP1 receiver notifications so NFTs can carry more context and interact with Universal Profiles.',
    sections: [
      {
        title: 'What ERC721 gets right',
        body: [
          'ERC721 created a shared interface for unique assets. Wallets, marketplaces, games, and explorers know how to show ownership and transfers because the interface is predictable.',
        ],
      },
      {
        title: 'Where developers hit limits',
        bullets: [
          'tokenURI often points to a server or immutable JSON that does not fit dynamic assets.',
          'uint256 token IDs are simple but can require extra mappings for richer identifiers.',
          'safeTransferFrom only checks one receiver interface and does not create a general notification layer.',
          'Collection metadata, per-token metadata, and app-specific context often live in different places.',
        ],
      },
      {
        title: 'How LSP8 changes the model',
        body: [
          'LSP8 is LUKSO\'s Identifiable Digital Asset standard. It uses bytes32 token IDs, ERC725Y data storage, LSP4 metadata, LSP1 notifications, and transfer parameters that make receiving behavior explicit.',
          'For purely ERC721-native marketplaces, ERC721 may remain the better compatibility choice. LSP8 is stronger when the asset is meant to live inside a profile-centered app ecosystem.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC721 transfer',
        language: 'solidity',
        value:
          'function transferFrom(address from, address to, uint256 tokenId) external;',
      },
      {
        label: 'LSP8 transfer',
        language: 'solidity',
        value:
          'function transfer(\n  address from,\n  address to,\n  bytes32 tokenId,\n  bool force,\n  bytes calldata data\n) external;',
      },
    ],
    table: {
      caption: 'Decision table',
      headers: ['Use ERC721 when', 'Use LSP8 when'],
      rows: [
        [
          'You need maximum compatibility with ERC721-only marketplaces.',
          'You need richer token IDs, metadata, and Universal Profile integration.',
        ],
        [
          'tokenURI is enough for your collection.',
          'Per-token metadata should use standard data keys and VerifiableURI patterns.',
        ],
        [
          'Receiver behavior can be app-specific.',
          'Receiver notifications and explicit transfer behavior are part of the product.',
        ],
      ],
    },
    docs: [docs.lsp8, docs.lsp4, docs.lsp1, docs.migrateErc721],
    related: [
      '/erc721-tokenuri-vs-lsp4-metadata/',
      '/guides/migrate-erc721-to-lsp8/',
    ],
  },
  {
    slug: '/erc721-tokenuri-vs-lsp4-metadata/',
    type: 'article',
    title: 'ERC721 tokenURI Problem vs LSP4 Metadata',
    h1: 'ERC721 tokenURI problem -> LSP4 metadata',
    description:
      'Learn why dynamic NFT metadata is hard with tokenURI alone and how LSP8, LSP4, and ERC725Y provide a richer metadata model.',
    kicker: 'Diagnosis',
    tags: ['tokenURI', 'dynamic NFT metadata', 'LSP4', 'ERC725Y'],
    tldr:
      'tokenURI is a useful pointer, but it makes dynamic NFT metadata depend on external JSON, refresh behavior, and marketplace assumptions. LSP8 assets can store metadata through ERC725Y data keys and LSP4 conventions, making collection and token metadata more explicit for apps.',
    sections: [
      {
        title: 'The ERC pattern',
        body: [
          'ERC721 exposes tokenURI(tokenId), and most NFT metadata is fetched from the returned URI. This keeps the token standard small and interoperable.',
        ],
      },
      {
        title: 'Where it breaks down',
        bullets: [
          'Dynamic traits depend on server behavior or marketplace refresh logic.',
          'Apps need to parse arbitrary JSON shapes across collections.',
          'Collection metadata and per-token metadata often follow different conventions.',
          'Verifying what changed and why can be hard for users.',
        ],
      },
      {
        title: 'The LSP pattern',
        body: [
          'LSP4 defines metadata keys for digital assets, and ERC725Y provides generic key-value storage. LSP8 can also store token-specific metadata through token ID data functions.',
          'The result is not that every byte must be onchain. The useful shift is that metadata entry points and keys become part of a standard model that LUKSO apps can read consistently.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC721 metadata pointer',
        language: 'solidity',
        value: 'function tokenURI(uint256 tokenId) external view returns (string memory);',
      },
      {
        label: 'ERC725Y metadata read',
        language: 'solidity',
        value:
          'function getData(bytes32 dataKey) external view returns (bytes memory dataValue);',
      },
    ],
    table: {
      caption: 'Metadata design choices',
      headers: ['Need', 'Common ERC721 approach', 'LSP pattern'],
      rows: [
        ['Collection metadata', 'ContractURI or custom endpoint', 'LSP4 metadata key'],
        ['Dynamic traits', 'Mutable JSON behind tokenURI', 'ERC725Y data keys and VerifiableURI'],
        ['Per-token context', 'Custom JSON schema', 'LSP8 token ID metadata functions'],
      ],
    },
    docs: [docs.lsp8, docs.lsp4, docs.erc725],
    related: ['/guides/dynamic-nft-metadata-lsp8/', '/erc721-vs-lsp8/'],
  },
  {
    slug: '/erc1155-vs-lsp7-lsp8/',
    type: 'article',
    title: 'ERC1155 vs LSP7 and LSP8: Multi-Asset Design Tradeoffs',
    h1: 'ERC1155 vs LSP7 and LSP8',
    description:
      'Compare ERC1155 multi-asset contracts with LSP7 and LSP8 when product semantics, indexing, metadata, and profile UX matter.',
    kicker: 'Comparison',
    tags: ['ERC1155', 'LSP7', 'LSP8', 'multi-asset'],
    tldr:
      'ERC1155 is excellent when one contract should manage many fungible and non-fungible item types. LSP7 and LSP8 split assets by semantics, which can make metadata, receiver behavior, and profile inventory easier to reason about in LUKSO apps.',
    sections: [
      {
        title: 'What ERC1155 gets right',
        body: [
          'ERC1155 is efficient for game items, editions, and collections where one contract should manage many token IDs with batch transfers.',
        ],
      },
      {
        title: 'Where developers hit limits',
        bullets: [
          'A single contract can mix product meanings that apps must decode off-chain.',
          'Metadata and indexing logic can become token-type specific.',
          'Inventory UX may need extra interpretation for fungible, semi-fungible, and unique assets.',
        ],
      },
      {
        title: 'The LSP pattern',
        body: [
          'LSP7 covers fungible and semi-fungible digital assets. LSP8 covers identifiable assets. Both share transfer naming, metadata patterns, batch capabilities, and LSP1 notifications.',
          'The tradeoff is not that ERC1155 is wrong. The decision is whether contract packing or explicit asset semantics matters more for the product.',
        ],
      },
    ],
    table: {
      caption: 'When to choose each model',
      headers: ['Product need', 'ERC1155 fit', 'LSP7/LSP8 fit'],
      rows: [
        ['One contract for many item types', 'Strong', 'Possible, but usually split by asset semantics'],
        ['Profile-readable asset identity', 'Requires app interpretation', 'Stronger with LSP metadata and inventory keys'],
        ['Receiver notifications', 'ERC1155 receiver callbacks', 'LSP1 notifications across LSP assets'],
      ],
    },
    docs: [docs.lsp7, docs.lsp8, docs.lsp1],
    related: ['/erc20-vs-lsp7/', '/erc721-vs-lsp8/'],
  },
  {
    slug: '/eoa-vs-universal-profile/',
    type: 'article',
    title: 'EOA Wallets vs Universal Profiles: Smart Account UX for Ethereum Developers',
    h1: 'EOA wallet limits -> Universal Profile smart accounts',
    description:
      'Compare externally owned accounts with LUKSO Universal Profiles for profile metadata, permissions, recovery, signatures, and gasless onboarding.',
    kicker: 'Comparison',
    tags: ['EOA', 'Universal Profile', 'smart accounts', 'permissions'],
    tldr:
      'EOAs are simple, portable, and foundational, but they bind identity, funds, and authority to one private key. Universal Profiles are smart accounts that separate the account from controllers and add ERC725Y metadata, LSP6 permissions, LSP1 notifications, LSP25 relay calls, and safer ownership flows.',
    sections: [
      {
        title: 'What EOAs get right',
        body: [
          'Externally owned accounts are easy for every EVM app to support. A private key signs a transaction, and the account address is the user address.',
        ],
      },
      {
        title: 'Where app builders hit limits',
        bullets: [
          'One key often controls identity, assets, and every transaction.',
          'Dapps cannot ask for limited authority in a standard account-level way.',
          'Profile information usually lives in app databases or separate protocols.',
          'Gas, recovery, and device management become product problems outside the account.',
        ],
      },
      {
        title: 'The LSP pattern',
        body: [
          'A Universal Profile is an account contract. It can store profile metadata through ERC725Y and LSP3, delegate control through LSP6 Key Manager, react to interactions through LSP1, and support relay execution patterns through LSP25.',
          'That makes the account a user-owned object apps can read and interact with, rather than just an address controlled by one key.',
        ],
      },
    ],
    table: {
      caption: 'Account model comparison',
      headers: ['Capability', 'EOA', 'Universal Profile'],
      rows: [
        ['Portable profile metadata', 'No standard account storage', 'LSP3 plus ERC725Y'],
        ['Multiple controllers', 'Handled outside the EOA', 'LSP6 permissions'],
        ['Gasless onboarding', 'Requires app-specific relays', 'LSP25 relay call pattern'],
        ['Receiver notifications', 'No account-level hook', 'LSP1 Universal Receiver'],
      ],
    },
    docs: [docs.lsp0, docs.lsp3, docs.lsp6, docs.lsp25],
    related: [
      '/guides/grant-dapp-permissions-lsp6/',
      '/guides/gasless-transactions-universal-profile/',
    ],
  },
  {
    slug: '/guides/migrate-erc20-to-lsp7/',
    type: 'guide',
    title: 'Guide: Migrate ERC20 Token Logic to LSP7',
    h1: 'Migrate ERC20 token logic to LSP7',
    description:
      'A practical migration guide for mapping ERC20 balances, transfers, approvals, metadata, and receiver behavior to LSP7.',
    kicker: 'Code-first guide',
    tags: ['ERC20 migration', 'LSP7', 'token migration'],
    tldr:
      'Do not migrate only because LSP7 exists. Migrate when the token needs richer metadata, receiver notifications, transfer context, profile inventory, or Universal Profile permissions around token operations.',
    sections: [
      {
        title: 'Step 1: map the ERC20 surface',
        bullets: [
          'List transfer, transferFrom, approve, allowance, mint, burn, and admin roles.',
          'Identify which integrations expect pure ERC20 behavior.',
          'Separate protocol compatibility requirements from product UX requirements.',
        ],
      },
      {
        title: 'Step 2: choose the LSP7 features that matter',
        bullets: [
          'Use ERC725Y and LSP4 for richer token metadata.',
          'Use LSP1 receiver notifications when accounts should react to incoming assets.',
          'Use the data parameter to carry transfer context.',
          'Use operators carefully, and combine with LSP6 permissions when Universal Profiles control the flow.',
        ],
      },
      {
        title: 'Step 3: preserve compatibility expectations',
        body: [
          'ERC20 has deep infrastructure support. If exchanges, DeFi pools, or third-party contracts require ERC20, keep that requirement explicit. LSP7 is strongest when the asset is built for LUKSO profile-centered interactions.',
        ],
      },
    ],
    code: [
      {
        label: 'Transfer shape',
        language: 'solidity',
        value:
          '// ERC20\ntransferFrom(from, to, amount);\n\n// LSP7\ntransfer(from, to, amount, false, abi.encode(\"membership-renewal\"));',
      },
    ],
    table: {
      caption: 'Migration checklist',
      headers: ['Area', 'Question'],
      rows: [
        ['Metadata', 'Which fields belong in LSP4 or other ERC725Y data keys?'],
        ['Receiving', 'Should recipient profiles accept, reject, register, or route the asset?'],
        ['Authorization', 'Which actions are token operators, and which are account permissions?'],
        ['Indexing', 'How will apps read balances, issued assets, and received assets?'],
      ],
    },
    docs: [docs.migrateErc20, docs.lsp7, docs.lsp4, docs.lsp1],
    related: ['/erc20-vs-lsp7/', '/erc20-approve-vs-lsp7-authorize-operator/'],
  },
  {
    slug: '/guides/migrate-erc721-to-lsp8/',
    type: 'guide',
    title: 'Guide: Migrate ERC721 NFT Collections to LSP8',
    h1: 'Migrate ERC721 NFT collections to LSP8',
    description:
      'A practical migration guide for mapping ERC721 ownership, token IDs, tokenURI metadata, and safe transfers to LSP8.',
    kicker: 'Code-first guide',
    tags: ['ERC721 migration', 'LSP8', 'NFT migration'],
    tldr:
      'Migrate to LSP8 when your NFT needs richer token IDs, standard metadata keys, receiver notifications, or Universal Profile integration. Keep ERC721 when marketplace compatibility is the primary requirement.',
    sections: [
      {
        title: 'Step 1: map token IDs',
        body: [
          'ERC721 IDs are uint256. LSP8 IDs are bytes32. Numeric IDs can be encoded into bytes32, while new collections can use hashes, serials, or other deterministic identifiers.',
        ],
      },
      {
        title: 'Step 2: map metadata',
        bullets: [
          'Move collection-level metadata into LSP4-compatible ERC725Y data.',
          'Use LSP8 token ID metadata functions when individual assets need their own context.',
          'Keep URI-based assets where off-chain media remains the right storage layer.',
        ],
      },
      {
        title: 'Step 3: design receiver behavior',
        body: [
          'LSP8 transfers include a force flag and data payload. That lets apps decide whether recipient contracts must support LSP1 and what context should travel with the transfer.',
        ],
      },
    ],
    code: [
      {
        label: 'Token ID mapping',
        language: 'solidity',
        value:
          'uint256 erc721TokenId = 42;\nbytes32 lsp8TokenId = bytes32(erc721TokenId);',
      },
    ],
    docs: [docs.migrateErc721, docs.lsp8, docs.lsp4, docs.lsp1],
    related: ['/erc721-vs-lsp8/', '/erc721-tokenuri-vs-lsp4-metadata/'],
  },
  {
    slug: '/guides/dynamic-nft-metadata-lsp8/',
    type: 'guide',
    title: 'Guide: Dynamic NFT Metadata with LSP8 and ERC725Y',
    h1: 'Build dynamic NFT metadata with LSP8',
    description:
      'Use LSP8, LSP4 metadata, and ERC725Y data keys to model dynamic NFT metadata for LUKSO apps.',
    kicker: 'Code-first guide',
    tags: ['dynamic NFTs', 'LSP8', 'ERC725Y', 'metadata'],
    tldr:
      'Dynamic NFT metadata should not be only a hidden server rule behind tokenURI. With LSP8, collection and token metadata can be exposed through standard data keys that apps can read consistently.',
    sections: [
      {
        title: 'Start from the metadata lifecycle',
        bullets: [
          'Which fields are static at mint?',
          'Which fields can change?',
          'Who is allowed to change them?',
          'Does the user need to verify the source or history of a metadata update?',
        ],
      },
      {
        title: 'Use ERC725Y for standard reads',
        body: [
          'ERC725Y gives contracts a generic data key-value store. LSP4 defines metadata conventions for digital assets, while LSP8 adds token-specific metadata support for identifiable assets.',
        ],
      },
      {
        title: 'Keep media storage practical',
        body: [
          'LSP metadata does not require every asset to be fully onchain. Use the chain for the standard data entry point and integrity model, then point to media or JSON where that is still the right engineering tradeoff.',
        ],
      },
    ],
    code: [
      {
        label: 'Read an ERC725Y data key',
        language: 'typescript',
        value:
          "const key = ERC725YDataKeys.LSP4['LSP4Metadata'];\nconst value = await asset.getData(key);",
      },
    ],
    docs: [docs.erc725, docs.lsp4, docs.lsp8],
    related: ['/erc721-tokenuri-vs-lsp4-metadata/', '/erc721-vs-lsp8/'],
  },
  {
    slug: '/guides/gasless-transactions-universal-profile/',
    type: 'guide',
    title: 'Guide: Gasless Transactions with Universal Profiles and LSP25',
    h1: 'Gasless transactions with Universal Profiles',
    description:
      'Design sponsored and gasless onboarding flows with LUKSO Universal Profiles, LSP25 relay calls, nonces, and relayers.',
    kicker: 'Code-first guide',
    tags: ['gasless transactions', 'LSP25', 'Universal Profile', 'relayers'],
    tldr:
      'Gasless UX is not only a relayer endpoint. It needs signatures, nonces, replay protection, permissions, and clear user intent. LSP25 defines relay-call execution for Universal Profiles so a controller can sign and a relayer can submit.',
    sections: [
      {
        title: 'The onboarding problem',
        body: [
          'A new user often needs native tokens before using the first app. That creates a hard stop before the product has delivered any value.',
        ],
      },
      {
        title: 'The LSP25 pattern',
        bullets: [
          'A controller signs the intended Universal Profile action.',
          'A relayer submits the transaction and pays gas.',
          'Nonce channels help manage replay protection and transaction ordering.',
          'LSP6 permissions can limit what the controller is allowed to do.',
        ],
      },
      {
        title: 'Production rules',
        bullets: [
          'Show the user the action, target contract, value, and calldata meaning before signing.',
          'Rate-limit sponsored flows and define who pays for failed transactions.',
          'Separate onboarding relayers from high-value account actions when needed.',
        ],
      },
    ],
    code: [
      {
        label: 'Relay flow sketch',
        language: 'typescript',
        value:
          'const payload = await universalProfile.interface.encodeFunctionData("execute", [\n  operationType,\n  target,\n  value,\n  data,\n]);\n\n// Controller signs the relay payload. Relayer submits executeRelayCall.',
      },
    ],
    docs: [docs.lsp25, docs.lsp6, docs.relayApi],
    related: ['/eoa-vs-universal-profile/', '/guides/grant-dapp-permissions-lsp6/'],
  },
  {
    slug: '/guides/grant-dapp-permissions-lsp6/',
    type: 'guide',
    title: 'Guide: Grant Dapp Permissions with LSP6 Key Manager',
    h1: 'Grant dapp permissions with LSP6',
    description:
      'Use LSP6 Key Manager concepts to grant scoped app, controller, and session permissions for Universal Profiles.',
    kicker: 'Code-first guide',
    tags: ['LSP6', 'smart wallet permissions', 'session keys', 'Universal Profile'],
    tldr:
      'A dapp should not need full account control. LSP6 lets a Universal Profile assign permissions to controllers and restrict allowed calls or data keys, so apps can request the smallest authority their workflow needs.',
    sections: [
      {
        title: 'The account permission problem',
        body: [
          'Many wallet flows reduce access to yes or no. Real apps need narrower grants: this controller can call this contract, transfer this asset, update this data key, or act for this session.',
        ],
      },
      {
        title: 'The LSP6 pattern',
        bullets: [
          'Treat controllers as keys or contracts that operate a Universal Profile.',
          'Assign permissions such as CALL, SETDATA, TRANSFERVALUE, or SUPER permissions when appropriate.',
          'Use allowed calls and allowed ERC725Y data keys for scoped access.',
          'Revoke controllers when sessions, devices, or app integrations end.',
        ],
      },
      {
        title: 'Security notes',
        bullets: [
          'Avoid granting broad permissions for a narrow task.',
          'Show users which controller receives access and what it can call.',
          'Keep high-value recovery or admin controllers separate from app controllers.',
        ],
      },
    ],
    code: [
      {
        label: 'Permission design sketch',
        language: 'text',
        value:
          'Controller: app session key\nPermission: CALL\nAllowed call: target token contract + transfer selector\nExpires: app-defined session policy',
      },
    ],
    docs: [docs.lsp6, docs.lsp0, docs.lsp20],
    related: ['/eoa-vs-universal-profile/', '/guides/gasless-transactions-universal-profile/'],
  },
  {
    slug: '/erc20-transfer-hooks/',
    type: 'article',
    title: 'How to Add ERC20 Transfer Hooks on EVM',
    h1: 'How to add ERC20 transfer hooks',
    description:
      'ERC20 has no receiver hook. Compare ERC777, ERC1363, transferAndCall wrappers, and the LSP7 plus LSP1 receiver model for reacting to token transfers onchain.',
    kicker: 'EVM problem',
    tags: ['erc20 transfer hooks', 'erc20 receiver hook', 'erc20 safe transfer alternative'],
    tldr:
      'ERC20.transfer updates balances and emits an event. It does not notify the recipient contract or carry any data. Builders work around it with ERC777, ERC1363 transferAndCall, wrapper contracts, or off-chain event polling. LSP7 makes the hook native: every transfer can carry bytes data and trigger the recipient through LSP1 Universal Receiver.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'An ERC20 transfer is two storage writes and a Transfer event. The recipient contract is never called, so it cannot run logic when tokens arrive. A vault that needs to credit a user on deposit either trusts msg.sender to call a second function, or it polls Transfer events from an indexer.',
          'This is the root cause of the "tokens stuck in contract" pattern: a user sends ERC20 directly to a contract address, the contract has no way to react, and the tokens sit there until someone writes a rescue function.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'ERC777 tokensReceived hook — added receiver awareness but introduced reentrancy issues that led most teams to avoid it.',
          'ERC1363 transferAndCall / approveAndCall — clean opt-in, but adoption is thin and tokens that do not implement it still strand.',
          'Wrapper contracts (deposit then call) — moves the burden to the user and adds a transaction.',
          'Off-chain Transfer event indexers — works for app state, never works for onchain reactions.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP7 transfer takes a force flag and a bytes data payload, and notifies both sender and recipient through LSP1 Universal Receiver. A recipient contract that implements LSP1 receives a typeId and the transfer data, and can run accept/reject/route logic in one standard hook.',
          'Crucially, LSP1 is one interface across LSP7, LSP8, and value transfers — so a Universal Profile (or any LSP1-aware contract) handles every asset type through the same entry point.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC20 transfer (no hook)',
        language: 'solidity',
        value:
          '// Recipient contract is never called.\nfunction transfer(address to, uint256 amount) external returns (bool);',
      },
      {
        label: 'LSP7 transfer + LSP1 universalReceiver',
        language: 'solidity',
        value:
          'function transfer(\n  address from,\n  address to,\n  uint256 amount,\n  bool force,\n  bytes calldata data\n) external;\n\n// On the recipient:\nfunction universalReceiver(bytes32 typeId, bytes calldata data)\n  external\n  payable\n  returns (bytes memory);',
      },
    ],
    docs: [docs.lsp7, docs.lsp1, docs.benefits],
    related: ['/erc20-vs-lsp7/', '/guides/migrate-erc20-to-lsp7/', '/erc721-safe-transfer-problems/'],
  },
  {
    slug: '/erc20-approval-risks/',
    type: 'article',
    title: 'ERC20 Approval Risks: Why approve Is Unsafe (and What to Do)',
    h1: 'ERC20 approval risks',
    description:
      'Unlimited allowances, stale approvals, and split-intent UX make ERC20 approve a known security problem. Compare Permit2, EIP-2612, revoke flows, and LSP7 operator authorization with LSP6 account permissions.',
    kicker: 'EVM problem',
    tags: ['erc20 approval risks', 'unlimited approval', 'allowance security'],
    tldr:
      'ERC20 approve splits user intent across two transactions and usually asks for blanket future authority. Stop-gaps include revoke.cash, EIP-2612 permits, and Permit2. LSP7 keeps amount-scoped operators but moves the real authorization into the account model through LSP6, so the profile (not the token) decides what an app controller may do.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'ERC20 approve sets an allowance. The spender later calls transferFrom whenever it likes, for any amount up to the allowance. The user signs intent once and never sees the executions, so wallets cannot meaningfully explain what they are authorizing.',
          'Most dapps request max-uint approvals to skip future prompts. That turns every approved spender into a standing risk: if the spender contract is upgraded, exploited, or misconfigured, the allowance is already there.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Revoke flows (revoke.cash, wallet UIs) — reactive, requires user effort, allowance is already live.',
          'EIP-2612 permit — moves approval to a signature instead of a transaction. Still blanket authority, still spender-trusted.',
          'Permit2 — signature-based, per-transaction allowances, scoped to a single contract. Helps, but only when both sides integrate it.',
          'Approve-and-call wrappers — adds a custom router contract, fragments UX.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP7 authorizeOperator is still amount-scoped — that part is honest, it is not magic. The shift is that on a Universal Profile, the controller calling authorizeOperator is itself bound by LSP6 Key Manager permissions: allowed calls, allowed standards, allowed ERC725Y data keys, value limits, and revocable per controller.',
          'So instead of asking the token contract to police every future transferFrom, the account decides what each app controller may invoke and when. Session controllers can be granted and revoked without touching token-level allowances.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC20 approve + transferFrom',
        language: 'solidity',
        value:
          'function approve(address spender, uint256 amount) external returns (bool);\nfunction transferFrom(address from, address to, uint256 amount) external returns (bool);',
      },
      {
        label: 'LSP7 operator + LSP6 controller scope',
        language: 'solidity',
        value:
          'function authorizeOperator(\n  address operator,\n  uint256 amount,\n  bytes calldata operatorNotificationData\n) external;\n\n// On the Universal Profile, the caller controller is gated by\n// LSP6 permissions + allowed calls before this ever executes.',
      },
    ],
    docs: [docs.lsp7, docs.lsp6, docs.lsp20],
    related: [
      '/erc20-approve-vs-lsp7-authorize-operator/',
      '/smart-contract-wallet-permissions/',
      '/erc20-vs-lsp7/',
    ],
  },
  {
    slug: '/erc721-dynamic-metadata/',
    type: 'article',
    title: 'ERC721 Dynamic Metadata: The tokenURI Trap and Onchain Alternatives',
    h1: 'ERC721 dynamic metadata',
    description:
      'tokenURI returns a single URI per token. Dynamic NFTs need refresh logic, off-chain servers, and marketplace cooperation. Compare ERC4906, fully onchain SVG, and LSP8 plus ERC725Y key/value metadata.',
    kicker: 'EVM problem',
    tags: ['erc721 dynamic metadata', 'dynamic nft', 'tokenuri'],
    tldr:
      'ERC721 tokenURI returns a string. Dynamic traits depend on server-side logic and marketplace refresh buttons. LSP8 plus ERC725Y exposes per-token metadata through standard data keys that apps and indexers read directly, with VerifiableURI when the source needs integrity proofs.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'tokenURI(tokenId) returns one string. The contract has no opinion on what changes, when, or by whom. If metadata is dynamic, the truth lives in whatever server hosts the JSON — and marketplaces, wallets, and explorers each cache it on their own schedule.',
          '"Refresh metadata" buttons exist because there is no standard signal for what changed. ERC4906 added a MetadataUpdate event, but consumers still have to ask the server what the new state actually is.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Mutable IPFS pointers behind tokenURI — convenient, but the JSON is still off-chain and trust-anchored to the host.',
          'Server-rendered metadata APIs — works at scale, but couples the NFT to your infra and falls over when the server does.',
          'ERC4906 MetadataUpdate events — signals "something changed", does not say what.',
          'Fully onchain SVG generators — strong integrity, expensive, awkward for rich media.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP8 assets store per-token metadata through ERC725Y data keys, not through one tokenURI string. LSP4 defines metadata conventions (name, symbol, JSON schema). VerifiableURI lets a key point to an off-chain payload with a hash, so the chain enforces what the off-chain blob must be.',
          'Apps read getDataForTokenId(tokenId, key) and get a typed value back. Dynamic updates are setData calls, gated by whatever account permissions you want.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC721 tokenURI',
        language: 'solidity',
        value: 'function tokenURI(uint256 tokenId) external view returns (string memory);',
      },
      {
        label: 'LSP8 per-token data key',
        language: 'solidity',
        value:
          'function getDataForTokenId(bytes32 tokenId, bytes32 dataKey)\n  external\n  view\n  returns (bytes memory);',
      },
    ],
    docs: [docs.lsp8, docs.lsp4, docs.erc725],
    related: [
      '/erc721-tokenuri-vs-lsp4-metadata/',
      '/guides/dynamic-nft-metadata-lsp8/',
      '/erc721-vs-lsp8/',
    ],
  },
  {
    slug: '/erc721-safe-transfer-problems/',
    type: 'article',
    title: 'ERC721 Safe Transfer Problems: Why safeTransferFrom Isn’t Enough',
    h1: 'ERC721 safe transfer problems',
    description:
      'safeTransferFrom only checks one specific receiver interface. NFTs still get stuck in contracts, and ERC20s still strand silently. Universal receiver hooks generalize the fix across asset types.',
    kicker: 'EVM problem',
    tags: ['erc721 safe transfer problems', 'safeTransferFrom', 'nfts stuck in contract'],
    tldr:
      'ERC721 safeTransferFrom checks IERC721Receiver and reverts if missing, but only for ERC721. A vault holding ETH, ERC20, ERC721, and ERC1155 needs four different receiver patterns, and plain ERC20.transfer never asks the recipient anything. LSP1 Universal Receiver gives one entry point for all asset types.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'safeTransferFrom is real safety, but it is narrow. It only checks IERC721Receiver, only for that one call, and only when the caller chose the "safe" variant. The non-safe transferFrom still ships, and most ERC20 transfers go straight to a balance update with no recipient interaction at all.',
          'In practice, every asset standard has its own receiver shape (IERC721Receiver, IERC1155Receiver, ERC777 tokensReceived). Multi-asset contracts must implement each one — and there is still no general "I received value of some kind" hook.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Implement each receiver interface (IERC721Receiver, IERC1155Receiver, ERC777 tokensReceived) — boilerplate that grows per asset standard.',
          'Use OpenZeppelin Holder mixins — accepts everything, defers the policy question.',
          'Defensive transferFrom-then-call patterns — ad hoc, not interoperable.',
          'Sweeper / rescue contracts — recover stranded assets after the fact.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP1 defines one universalReceiver(bytes32 typeId, bytes data) hook. LSP7 and LSP8 transfers call it on both sender and recipient, with a typeId that tells the receiver what kind of interaction it is (token sent, token received, asset registered, etc.).',
          'A Universal Profile uses a Universal Receiver Delegate to dispatch: register received assets in LSP5, reject spam by typeId, or run app-specific logic. One hook, every asset type, declared policy.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC721 IERC721Receiver',
        language: 'solidity',
        value:
          'function onERC721Received(\n  address operator,\n  address from,\n  uint256 tokenId,\n  bytes calldata data\n) external returns (bytes4);',
      },
      {
        label: 'LSP1 universalReceiver (one hook for everything)',
        language: 'solidity',
        value:
          'function universalReceiver(bytes32 typeId, bytes calldata data)\n  external\n  payable\n  returns (bytes memory);',
      },
    ],
    docs: [docs.lsp1, docs.lsp7, docs.lsp8],
    related: ['/erc721-vs-lsp8/', '/erc20-transfer-hooks/', '/guides/migrate-erc721-to-lsp8/'],
  },
  {
    slug: '/gasless-transactions-smart-accounts/',
    type: 'article',
    title: 'Gasless Transactions for Smart Accounts: Patterns Compared',
    h1: 'Gasless transactions for smart accounts',
    description:
      'EIP-2771 forwarders, EIP-4337 paymasters, and LSP25 relay calls compared. How smart accounts let someone else pay gas without exposing user keys.',
    kicker: 'EVM problem',
    tags: ['gasless transactions smart accounts', 'meta transactions', 'sponsored transactions'],
    tldr:
      'Three families dominate: EIP-2771 trusted forwarders, ERC4337 bundlers + paymasters, and account-native relay calls. The first leaks msg.sender semantics, the second introduces a separate transaction pool, the third bakes relay execution into the account itself. LSP25 takes the third approach for Universal Profiles.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'A new user needs native ETH before they can do anything. EOAs sign and pay together, so any sponsorship has to add a layer that separates the signer from the payer.',
          'Every popular pattern adds infrastructure: a trusted forwarder you have to trust, an ERC4337 EntryPoint and bundler you have to run or rent, a third-party relayer with its own SDK. The cost lands on the builder.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'EIP-2771 trusted forwarder — contracts extract msg.sender from calldata. Cheap, but every protected contract must be 2771-aware and trust the forwarder.',
          'ERC4337 + paymaster — UserOperation pool, bundler, EntryPoint, paymaster. Powerful, but you ship or pay for the bundler stack.',
          'Gelato / Biconomy / OpenZeppelin Defender — turnkey relayers that wrap one of the above.',
          'EIP-7702 (recent) — EOA temporarily acts like a smart account for the duration of a tx; sponsorship still needs a paymaster.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP25 defines executeRelayCall on the Universal Profile itself. A controller signs a payload (with a nonce channel for ordering and replay protection), a relayer submits the transaction and pays gas. No bundler, no EntryPoint, no separate mempool — the account contract is the entry point.',
          'Because the relayed call goes through the account, LSP6 permissions still apply: the controller signing the relay payload can only authorize what its permissions allow.',
        ],
      },
    ],
    code: [
      {
        label: 'ERC4337 UserOperation (sketch)',
        language: 'solidity',
        value:
          '// User signs a UserOperation, bundler posts it to EntryPoint,\n// paymaster pays gas, EntryPoint calls the account.\nfunction handleOps(UserOperation[] calldata ops, address beneficiary) external;',
      },
      {
        label: 'LSP25 executeRelayCall',
        language: 'solidity',
        value:
          'function executeRelayCall(\n  bytes calldata signature,\n  uint256 nonce,\n  uint256 validityTimestamps,\n  bytes calldata payload\n) external payable returns (bytes memory);',
      },
    ],
    docs: [docs.lsp25, docs.lsp6, docs.relayApi],
    related: [
      '/guides/gasless-transactions-universal-profile/',
      '/eip-4337-alternatives/',
      '/eoa-vs-universal-profile/',
    ],
  },
  {
    slug: '/social-recovery-smart-wallets/',
    type: 'article',
    title: 'Social Recovery for Smart Wallets: Patterns and Tradeoffs',
    h1: 'Social recovery for smart wallets',
    description:
      'Guardian models, multisig recovery, and ERC4337 recovery modules compared. How smart accounts let users recover access without storing a seed phrase.',
    kicker: 'EVM problem',
    tags: ['social recovery smart wallets', 'account recovery', 'guardian wallet'],
    tldr:
      'Seed phrases are a single point of failure. Smart accounts can express recovery as a permission graph — guardians, thresholds, time locks — instead of one phrase to lose. Argent, Safe, and ERC4337 modules each ship a flavor. LSP6 makes the controller graph the native account model.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'An EOA has one private key. Lose it, lose everything. There is no social fallback, no time-locked recovery, no rotating authority — those are product problems wallet vendors have to solve outside the account.',
          'Smart-account recovery is possible, but every model encodes its own rules and most are non-interoperable. Migrating recovery from one wallet to another usually means migrating the whole account.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Argent guardians — guardian set signs a recovery request, time-locked, custom contract logic.',
          'Safe owner rotation — multisig owners vote to add/remove owners; the multisig is the recovery primitive.',
          'ERC4337 recovery modules — validator modules attached to a 4337 account expose recovery flows.',
          'Custodial recovery (Privy, Magic, Web3Auth) — trade some self-custody for a familiar reset-password experience.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'A Universal Profile is one account with many controllers. LSP6 lets you register a recovery controller (or a recovery contract enforcing a guardian threshold, a delay, or a voting policy) with exactly the permissions it needs — typically the ability to add and remove other controllers.',
          'Recovery becomes a design choice expressed as permissions, not a hardcoded wallet feature. Day-to-day controllers stay narrow; the recovery controller stays cold.',
        ],
      },
    ],
    docs: [docs.lsp6, docs.lsp0, docs.lsp14],
    related: [
      '/smart-contract-wallet-permissions/',
      '/eoa-vs-universal-profile/',
      '/guides/grant-dapp-permissions-lsp6/',
    ],
  },
  {
    slug: '/smart-contract-wallet-permissions/',
    type: 'article',
    title: 'Smart Contract Wallet Permissions: Scoping App Access Without Full Control',
    h1: 'Smart contract wallet permissions',
    description:
      'Session keys, ERC4337 validation modules, and LSP6 Key Manager compared. How smart accounts grant scoped, revocable, time-bound access to dapps.',
    kicker: 'EVM problem',
    tags: ['smart contract wallet permissions', 'session keys', 'scoped wallet access'],
    tldr:
      'A dapp does not need full account control to swap a token. Session keys, ERC4337 modules, and LSP6 controllers each express scoped authority. LSP6 makes the scope the account’s native vocabulary: per-controller permission bitfields, allowed calls, allowed data keys.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'EOAs sign every action with the same key. Even most smart wallets expose the full account on connect, because there is no standard way for a dapp to ask for narrower authority.',
          'When fine-grained authority does exist, it usually lives in custom validator code per wallet — interoperability is poor, and revocation tends to be all-or-nothing.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Argent session keys — temporary signing keys with scoped allowed contracts.',
          'ERC4337 validation modules — pluggable validators define what each key may do.',
          'Zodiac scope guards on Safe — module-level gating, complex to author.',
          'Off-chain delegation (capabilities, signed permissions) — flexible, but enforcement depends on the relayer.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP6 Key Manager assigns each controller a permission bitfield (CALL, SETDATA, TRANSFERVALUE, ADDCONTROLLER, …) plus optional allowed calls (target contract + standard interface + function selector) and allowed ERC725Y data keys.',
          'Granting an app a session controller is one transaction; revoking it is one transaction. The Universal Profile checks permissions on every call, so the scope is enforced onchain, not at the wallet UI layer.',
        ],
      },
    ],
    code: [
      {
        label: 'LSP6 allowed call scope (sketch)',
        language: 'text',
        value:
          'Controller: app session key 0xabc…\nPermission: CALL\nAllowedCalls:\n  - target: 0x<token>, standard: LSP7, selector: transfer\nExpires: app-defined session policy',
      },
    ],
    docs: [docs.lsp6, docs.lsp20, docs.lsp0],
    related: [
      '/guides/grant-dapp-permissions-lsp6/',
      '/social-recovery-smart-wallets/',
      '/eoa-vs-universal-profile/',
    ],
  },
  {
    slug: '/eip-4337-alternatives/',
    type: 'article',
    title: 'EIP-4337 Alternatives: Smart Account Models Without Bundlers',
    h1: 'EIP-4337 alternatives',
    description:
      'Account abstraction without ERC4337. Compare Safe + relayer, EIP-7702, native account contracts, and the LSP0 + LSP6 + LSP25 + LSP20 stack used by Universal Profiles.',
    kicker: 'EVM problem',
    tags: ['eip-4337 alternatives', 'account abstraction', 'smart accounts without bundlers'],
    tldr:
      'ERC4337 layers a separate UserOperation pool, EntryPoint, bundlers, and paymasters on top of EOAs. Native account models put the account contract on the regular call path. Safe + a relayer is one alternative; EIP-7702 is another; LUKSO Universal Profiles are a third, built from LSP0, LSP6, LSP25, and LSP20.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'ERC4337 ships account abstraction over a transaction system designed for EOAs. The price is a parallel infrastructure: UserOperations, EntryPoint contracts, bundlers, paymasters, signature aggregators. Most product teams do not want to run or rent any of that.',
          'The other catch: 4337 accounts are smart accounts, but the value model still runs through the EntryPoint. Debugging, tracing, and gas accounting all sit on a separate plane from regular tx flow.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Safe + relayer — Safe is a smart account contract; a relayer submits the multisig exec call. No UserOperation, no bundler.',
          'EIP-7702 — EOAs temporarily delegate to a contract for a single tx, getting smart-account semantics without becoming a contract.',
          'Custodial backends — sign user actions server-side; simplest UX, weakest custody story.',
          'App-specific forwarders — narrow, hard to share across products.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'A Universal Profile is a contract account composed from LSP0 (ERC725 account), LSP6 (Key Manager permissions), LSP25 (executeRelayCall for sponsored execution), and LSP20 (call verification so the account can validate calls inline).',
          'There is no bundler and no EntryPoint. A controller signs; a relayer submits; the profile validates via LSP6 and executes. Honest tradeoff: this is LUKSO-native and not portable to mainnet today — but the same design pattern (single account contract, permission layer, relay primitive) generalizes.',
        ],
      },
    ],
    docs: [docs.lsp0, docs.lsp6, docs.lsp25, docs.lsp20],
    related: [
      '/gasless-transactions-smart-accounts/',
      '/wallet-vs-universal-profile/',
      '/eoa-vs-universal-profile/',
    ],
  },
  {
    slug: '/wallet-vs-universal-profile/',
    type: 'article',
    title: 'Wallet vs Universal Profile: Account Models for EVM Developers',
    h1: 'Wallet vs Universal Profile',
    description:
      'EOAs, Safes, ERC4337 accounts, and Universal Profiles compared. Which smart account model fits which product UX, and what the integration cost looks like.',
    kicker: 'EVM problem',
    tags: ['wallet vs universal profile', 'smart wallet comparison', 'universal profile'],
    tldr:
      'On EVM, "wallet" can mean an EOA UI, a Safe contract, an ERC4337 account, or something else. A Universal Profile is one specific account shape: LSP0 contract, LSP3 profile metadata, LSP6 permissions, LSP1 hooks. Apps read one shape instead of branching on five.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'Wallet abstraction libraries exist because no two wallets behave the same. An app supporting MetaMask, Safe, an Argent contract wallet, and an ERC4337 account is integrating four account models that disagree on signing, permissions, recovery, and metadata.',
          'Even with EIP-1271 (contract signature verification) and EIP-6963 (wallet discovery), the per-wallet branching tends to leak into product code.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'Wallet adapters (RainbowKit, Web3Modal, wagmi connectors) — abstracts connection, not behavior.',
          'EIP-1271 for contract signatures — necessary, but the account still has no standard profile.',
          'EIP-6963 for multi-wallet discovery — solves enumeration, not capability detection.',
          'Custom SDKs per smart-wallet vendor — works, doesn’t compose.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'A Universal Profile is a single account contract (LSP0) that always carries the same surface: LSP3 profile metadata (name, image, links), LSP6 controllers with explicit permissions, LSP1 receiver hooks for incoming assets, LSP5/LSP12 inventory keys for received and issued assets, LSP25 relay execution for sponsored UX.',
          'Apps read one account shape and one permission model. The tradeoff is that this is LUKSO-specific today; on mainnet you still integrate the wallet zoo.',
        ],
      },
    ],
    docs: [docs.lsp0, docs.lsp3, docs.lsp6, docs.benefits],
    related: [
      '/eoa-vs-universal-profile/',
      '/eip-4337-alternatives/',
      '/smart-contract-wallet-permissions/',
    ],
  },
  {
    slug: '/erc1155-complexity/',
    type: 'article',
    title: 'ERC1155 Complexity: When Multi-Asset Contracts Become a Tax',
    h1: 'ERC1155 complexity',
    description:
      'ERC1155 packs fungible and non-fungible items into one contract. Apps pay the cost in decoding, indexing, and metadata branching. Compare type-bit conventions and the LSP7/LSP8 split.',
    kicker: 'EVM problem',
    tags: ['erc1155 complexity', 'multi-asset contracts', 'erc1155 vs lsp7 lsp8'],
    tldr:
      'ERC1155 saves gas by packing many item types into one contract. The cost lands on apps: per-id metadata, type detection, batch logic, mixed indexing, custom marketplace rules. LSP7 and LSP8 separate fungible from identifiable at the standard level, so the semantic split lives in the protocol, not in your code.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'One ERC1155 contract can hold currency-like tokens, edition NFTs, and unique items at once. Wallets and indexers have to decode the intent of each id from per-collection rules. Marketplaces add custom logic per contract because there is no standard way to know which ids are fungible vs unique.',
          'Batch transfer is genuinely useful, but it composes badly with receiver hooks (every receiver must implement IERC1155Receiver, including for batches).',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'High-bit token id conventions to encode "this id range is fungible" — works only inside one collection.',
          'One-contract-per-game patterns — gives back the boundary ERC1155 erased.',
          'Off-chain id registries — moves the typing problem to your backend.',
          'Custom subgraphs per collection — every collection needs its own indexer logic.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP7 covers fungible and semi-fungible assets. LSP8 covers identifiable assets. They share transfer naming (force flag, bytes data), the same LSP1 receiver hook, and the same LSP4 metadata pattern.',
          'When you need multi-asset packing, you ship multiple LSP7/LSP8 contracts. The semantic boundary is in the standard, not encoded in token id bit ranges.',
        ],
      },
    ],
    docs: [docs.lsp7, docs.lsp8, docs.lsp1],
    related: ['/erc1155-vs-lsp7-lsp8/', '/erc20-vs-lsp7/', '/erc721-vs-lsp8/'],
  },
  {
    slug: '/contract-extension-after-deployment/',
    type: 'article',
    title: 'Extending Contracts After Deployment: Proxies, Modules, and LSP17',
    h1: 'Extending contracts after deployment',
    description:
      'Upgradeable proxies, ERC2535 diamonds, Safe modules, and LSP17 extensions compared. How to add functionality to a deployed contract without redeploying or surrendering upgrade authority.',
    kicker: 'EVM problem',
    tags: ['contract extension after deployment', 'upgradeable contracts', 'lsp17 extensions'],
    tldr:
      'Deployed contracts have fixed bytecode. To grow new functions you either upgrade behind a proxy (carries upgrade authority risk), split into a diamond (complex storage), or run an off-chain module pattern. LSP17 standardizes a fallback router so any LSP17-aware contract can register extension contracts per function selector.',
    sections: [
      {
        title: 'The problem on EVM',
        body: [
          'A deployed contract cannot grow new external functions. Adding behavior usually means a transparent or UUPS proxy, which makes upgrade authority a permanent trust assumption, or a diamond, which trades trust for storage and tooling complexity.',
          'For account contracts, the per-account module patterns (Safe modules, ERC4337 validators) help, but they are wallet-specific extension mechanisms, not a general contract extension primitive.',
        ],
      },
      {
        title: 'What EVM builders try today',
        bullets: [
          'OpenZeppelin transparent / UUPS proxies — proven, but the upgrade key never goes away.',
          'ERC2535 Diamonds — modular, expensive to author, storage requires discipline.',
          'Safe modules and guards — scoped to Safe accounts.',
          'Plugin patterns inside the app contract — bespoke, no shared tooling.',
        ],
      },
      {
        title: 'How LUKSO standards solve it',
        body: [
          'LSP17 defines a fallback router: when a contract receives a call for an unknown function selector, it looks up an extension contract registered for that selector (stored in ERC725Y data keys) and forwards the call. The base contract stays immutable; new behavior is added by registering extensions.',
          'There is no upgrade authority over base bytecode and no diamond-style storage layout problem to manage. Universal Profiles use this to grow without proxy upgrades.',
        ],
      },
    ],
    code: [
      {
        label: 'UUPS upgrade (OZ)',
        language: 'solidity',
        value:
          'function upgradeTo(address newImplementation) external onlyProxy onlyOwner;\n// Owner can swap the entire implementation forever.',
      },
      {
        label: 'LSP17 extension registration (sketch)',
        language: 'solidity',
        value:
          '// Map a function selector to an extension contract via ERC725Y.\n// On unknown selector, fallback delegates to the registered extension.\nbytes32 key = bytes32(abi.encodePacked(\n  bytes10(_LSP17_EXTENSION_PREFIX),\n  bytes2(0),\n  bytes4(selector),\n  bytes16(0)\n));\nERC725Y(account).setData(key, abi.encodePacked(extension));',
      },
    ],
    docs: [docs.lsp17, docs.erc725, docs.lsp0],
    related: [
      '/smart-contract-wallet-permissions/',
      '/wallet-vs-universal-profile/',
      '/eoa-vs-universal-profile/',
    ],
  },
];
