export type Experience = {
  role: string
  company: string
  location: string
  period: string
  summary: string
  bullets: string[]
  stack: string[]
}

export type SkillGroup = {
  category: string
  items: { name: string; level: number }[]
}

export type Trophy = {
  title: string
  metric: string
  context: string
}

export const profile = {
  name: 'Illia Verbanov',
  title: 'Fullstack Web3 / Blockchain Engineer',
  location: 'Burgas, Bulgaria',
  email: 'ilyaberbx@gmail.com',
  phone: '+380 99 454 0187',
  links: {
    linkedin: 'https://www.linkedin.com/in/illia-verbanov/',
    telegram: 'https://t.me/ilyaberbx',
    github: 'https://github.com/ilyaberbx',
  },
  summary:
    "Blockchain / .NET developer with hands-on backend and smart-contract experience. Nearly a year in .NET (ASP.NET, C#, PostgreSQL, Redis, Azure, CI/CD) and almost two years in blockchain. Strong skills in API design, auth, and scalable architecture. Earlier 4 years in Unity (C#, multiplayer, LiveOps, 10M+ downloads) provided a solid software-engineering foundation, now applied to backend and Web3 work.",
  level: 7,
  xpYears: 4,
}

export const languages = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'English', level: 'B2' },
]

export const education = {
  school: 'Odessa Polytechnic National University',
  degree: "Bachelor's, Software Engineering",
  period: '2022 – 2026',
}

export const experiences: Experience[] = [
  {
    role: 'Full Stack Web3 Engineer',
    company: 'Decentra',
    location: 'remote',
    period: 'Nov 2025 — Present',
    summary:
      'Core contributor to a suite of decentralized trading and finance protocols spanning perpetuals, spot swaps, and multi-wallet asset management.',
    bullets: [
      'Architected a unified DEX abstraction layer integrating four perpetual venues (HyperLiquid, Lighter, Extended, NADO) behind a single service interface — enabling cross-venue liquidity aggregation and order routing with zero application-layer coupling.',
      'Built and scaled the platform to $600M+ in cumulative trading volume and $90K+ in automated referral payouts.',
      'Designed and implemented an AI-driven trade-suggestion module delivering autonomous perpetual recommendations from live market data.',
      'Developed backend infrastructure on AWS via AWS CDK — APIs for user management, incentives, trading proxies, event tracking, and AI endpoints.',
      'Contributed to additional DeFi protocols focused on token swaps, social trading, and embedded wallet onboarding.',
    ],
    stack: [
      'React Native',
      'Solidity',
      'Expo',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'ethers.js',
      'viem',
      'StarkNet',
      'Privy SDK',
      'Reanimated',
      'Firebase',
      'Sentry',
      'AppsFlyer',
      'AWS',
      'AWS CDK',
      'Node.js',
      'Maestro',
      'EAS',
    ],
  },
  {
    role: 'Blockchain Engineer',
    company: 'Syntropia.ai',
    location: 'remote',
    period: 'Nov 2024 — Oct 2025',
    summary:
      'Contributed to a monitoring system for DeFi protocols (Curve, Uniswap, PancakeSwap, Ethena), collecting and processing on-chain data.',
    bullets: [
      'Built collectors using Node.js, TypeScript, ClickHouse and Viem for on-chain data ingestion.',
      'Integrated APIs (Curve, Ethena) and on-chain data via multicall to optimize requests and reduce RPC costs.',
      'Configured Grafana dashboards and custom alerts piped to Telegram, Email, and PagerDuty.',
      'Worked on real-time liquidity monitoring and helped detect depeg risks and arbitrage opportunities.',
      'Contributed to identifying the USDf depeg event (Sept 2025), later confirmed by the community.',
      'Explored scalability approaches for supporting multiple EVM-compatible tokens via configuration.',
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'Solidity',
      'ClickHouse',
      'Viem',
      'Grafana',
      'Curve API',
      'Ethena API',
      'Aave',
      'Chainstack',
      'DigitalOcean',
    ],
  },
  {
    role: '.NET Engineer',
    company: 'GritLeaders',
    location: 'remote',
    period: 'Sep 2024 — May 2025',
    summary:
      'Built a custom CRM from scratch in a team of two (backend + frontend), serving 30k+ domains.',
    bullets: [
      'Implemented N-tier monolithic architecture for maintainability and clear separation of concerns.',
      'Designed core CRM modules: JWT auth, hierarchical roles (Owner/Admin/Common), upsert, export with Redis-cached filters, tabular preview, blacklist filtering.',
      'Set up CI/CD via GitHub Actions (build, test, deploy) and configured Azure infrastructure (separate DB and Web App tiers).',
      'Integrated ClosedXML for export and reporting.',
      'Achieved adoption of 30,000+ domains managed via add/update/delete in the CRM.',
      'Participated in requirement gathering with the client, defining scope through a shared ubiquitous language.',
    ],
    stack: [
      'ASP.NET',
      'C#',
      'JavaScript',
      'PostgreSQL',
      'Redis',
      'GitHub Actions',
      'Azure',
      'ClosedXML',
    ],
  },
  {
    role: 'Unity Developer',
    company: 'Qplaze · OrbitRush · Wooden Sword · Starling Play · Boosta',
    location: 'remote',
    period: 'Sep 2021 — Sep 2024',
    summary:
      'Built and maintained features for hyper- and hybrid-casual games across multiple studios; titles collectively reached 10M+ downloads.',
    bullets: [
      'Designed and optimized game mechanics, UI systems, and client–server interactions in Unity (C#) — including multiplayer features.',
      'Worked with networking protocols (UDP, TCP/IP, HTTP) and integrated the Kinoa LiveOps engine for real-time live operations.',
      'Performance-optimized networked gameplay and legacy systems, improving stability and UX.',
      'Implemented CI/CD pipelines and Git best practices, reducing release cycle times.',
      'Built a custom MVVM framework for iOS/Android apps at Boosta — improving UI development efficiency.',
      'Collaborated with artists, designers, and backend engineers; contributed to architecture for both new games and high-scale projects (e.g., Cooking Rage).',
    ],
    stack: [
      'Unity',
      'C#',
      'MVVM',
      'TCP/IP',
      'UDP',
      'HTTP',
      'Kinoa LiveOps',
      'GitHub Actions',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', level: 5 },
      { name: 'C#', level: 5 },
      { name: 'JavaScript', level: 5 },
      { name: 'Solidity', level: 4 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', level: 5 },
      { name: 'Nest.js', level: 4 },
      { name: 'Next.js', level: 4 },
      { name: 'ASP.NET / .NET Core', level: 4 },
      { name: 'REST & WebSockets', level: 5 },
      { name: 'JWT auth', level: 5 },
    ],
  },
  {
    category: 'Web3',
    items: [
      { name: 'Solidity (ERC-20/721, EIP-712)', level: 4 },
      { name: 'ECDSA · Merkle · ZK proofs', level: 4 },
      { name: 'ethers.js / viem / wagmi', level: 5 },
      { name: 'Privy / Turnkey / WalletConnect', level: 4 },
    ],
  },
  {
    category: 'Data',
    items: [
      { name: 'PostgreSQL', level: 5 },
      { name: 'MS SQL', level: 4 },
      { name: 'ClickHouse', level: 4 },
      { name: 'Redis', level: 4 },
      { name: 'DynamoDB', level: 3 },
      { name: 'Kafka · RabbitMQ', level: 3 },
    ],
  },
  {
    category: 'Cloud / DevOps',
    items: [
      { name: 'AWS (CDK)', level: 4 },
      { name: 'Microsoft Azure', level: 4 },
      { name: 'GitHub Actions CI/CD', level: 5 },
      { name: 'Docker', level: 3 },
      { name: 'DigitalOcean', level: 4 },
    ],
  },
  {
    category: 'Tooling & Mobile',
    items: [
      { name: 'React Native / Expo', level: 4 },
      { name: 'Grafana · PagerDuty', level: 4 },
      { name: 'Git · Postman · Swagger', level: 5 },
      { name: 'Jira · Confluence', level: 4 },
    ],
  },
]

export const trophies: Trophy[] = [
  {
    title: 'Cumulative Trading Volume',
    metric: '$600M+',
    context: 'Decentra perpetuals platform across HyperLiquid, Lighter, Extended, NADO.',
  },
  {
    title: 'Game Downloads',
    metric: '10M+',
    context: 'Combined installs across hyper- & hybrid-casual titles shipped during the Unity years.',
  },
  {
    title: 'USDf Depeg Detected',
    metric: 'Sept 2025',
    context: 'Real-time DeFi monitoring at Syntropia.ai surfaced the event before public confirmation.',
  },
  {
    title: 'CRM Domains Managed',
    metric: '30K+',
    context: 'Custom CRM at GritLeaders — built end-to-end in a 2-person team.',
  },
  {
    title: 'Automated Referral Payouts',
    metric: '$90K+',
    context: 'On-chain referral system shipped at Decentra.',
  },
]
