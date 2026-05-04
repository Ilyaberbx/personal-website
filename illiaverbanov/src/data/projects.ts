import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'syntropia',
    name: 'Syntropia',
    domain: 'web3',
    tagline: 'DeFi tranching protocol with senior, mezzanine, and junior risk slices.',
    role: 'Blockchain Engineer',
    period: '2024-11/2025-10',
    stack: [
      'Solidity',
      'TypeScript',
      'Node.js',
      'Viem',
      'ClickHouse',
      'Grafana',
      'Chainstack',
    ],
    link: { label: 'syntropia.ai', href: 'https://syntropia.ai' },
    pitch:
      'Syntropia distributes risk across senior, mezzanine, and junior tranches over yield-bearing DeFi positions, so depositors pick the slice that matches their risk appetite instead of taking the whole protocol curve.',
    contributions: [
      'I built the on-chain data collectors that feed the tranche risk model — Node.js + Viem services writing into ClickHouse with multicall batching to keep RPC cost flat as we added markets.',
      'I owned the integrations layer for Curve, Ethena, Uniswap, and PancakeSwap: API plus on-chain reads stitched into one normalized stream the protocol logic consumes.',
      'I shipped the alerting pipeline (Grafana → Telegram, email, PagerDuty) that surfaced the USDf depeg early in September 2025 before it was widely confirmed.',
      'I designed the configuration model that lets new EVM tokens come online without code changes, so onboarding a new market is a config PR rather than a release.',
    ],
  },
  {
    id: 'miracle',
    name: 'Miracle',
    domain: 'web3',
    tagline: 'Trading platform with first-class candlestick charting.',
    role: 'Fullstack Web3 Engineer',
    period: '2025-02/2025-08',
    stack: [
      'React',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'ethers.js',
      'Node.js',
      'WebSockets',
    ],
    pitch:
      'Miracle is a trading platform built around a candlestick chart that traders actually want to live inside — fast updates, clean order flow, and on-chain settlement under the hood.',
    contributions: [
      'I built the candlestick charting module end-to-end: streaming OHLCV via WebSockets, incremental candle aggregation client-side, and the crosshair / overlay layer.',
      'I owned the order ticket and position panel — wallet signing flow, slippage and price-impact preview, and optimistic state that reconciles against on-chain confirmations.',
      'I wired the market data backend: a Node.js service that normalizes feeds, fans them out over WebSockets, and backfills history on reconnect so charts never show holes.',
    ],
  },
  {
    id: 'cult',
    name: 'Cult',
    domain: 'web3',
    tagline: 'Web3 brand with a robed-figure, pentacle-marked identity.',
    role: 'Fullstack Web3 Engineer',
    period: '2025-06/2025-09',
    stack: ['React', 'TypeScript', 'viem', 'Privy SDK', 'Node.js', 'Solidity'],
    pitch:
      'Cult is a Web3 brand with a deliberately occult visual identity — robed figures, pentacle marks, low-saturation palette — wrapping a token and membership flow that has to feel less like a dApp and more like joining something.',
    contributions: [
      'I built the membership onboarding flow on Privy embedded wallets so first-time users land in the product without a seed-phrase detour.',
      'I owned the token-gated section: contract reads via viem, server-side verification of ownership, and the cached membership state that drives access across the app.',
      'I shipped the brand surface in code — robed-figure motifs and pentacle marks rendered as inline SVG so the identity stays sharp at every breakpoint without shipping image assets.',
    ],
  },
  {
    id: 'cooking-rage',
    name: 'Cooking Rage',
    domain: 'gamedev',
    tagline: 'Burger-stack restaurant chaos game.',
    role: 'Unity Engineer',
    period: '2023-04/2024-02',
    stack: ['Unity', 'C#', 'MVVM', 'Addressables', 'Kinoa LiveOps'],
    pitch:
      'Cooking Rage is a restaurant chaos game where the core loop is stacking burgers fast enough to keep an angry queue from melting down. Small team, hybrid-casual cadence, every system had to ship and stay shippable.',
    contributions: [
      'I built the burger-stack mechanic: ingredient spawning, stack physics, validation against the order ticket, and the failure states that make rage actually fun instead of frustrating.',
      'I owned the customer queue and patience system — timers, mood transitions, and the difficulty curve that ramps tickets per minute as the player levels up.',
      'I integrated the Kinoa LiveOps engine so designers could push events and tune economy live without a client release.',
      'I worked on the title alongside a small Unity team across studios; the game shipped into a portfolio that has cleared 10M+ downloads collectively.',
    ],
  },
  {
    id: 'beware-of-winterforest',
    name: 'Beware of Winterforest',
    domain: 'gamedev',
    tagline: 'Snowy survival and exploration in a winter pine forest.',
    role: 'Unity Engineer',
    period: '2022-09/2023-03',
    stack: ['Unity', 'C#', 'URP', 'Shader Graph'],
    pitch:
      'Beware of Winterforest drops you into a snow-buried pine forest where staying warm matters as much as moving forward. Built as a small focused team — exploration loop, light survival systems, mood carried by the snow.',
    contributions: [
      'I built the snow traversal feel: footstep depth, slowdown in deep drifts, and the camera shake that sells weight without being cheap.',
      'I owned the warmth and stamina systems and the UI that surfaces them without breaking immersion — diegetic where possible, HUD only when it has to be.',
      'I shipped the snowfall and wind shader work in URP / Shader Graph so the forest reads as cold from frame one rather than relying on color grading alone.',
      'Small team, tight scope: I touched player, environment systems, and UI rather than living in one silo — the right move at that scale.',
    ],
  },
  {
    id: 'eat-fit',
    name: 'Eat Fit',
    domain: 'gamedev',
    tagline: 'Food and fitness oriented mobile gamified app.',
    role: 'Unity Engineer',
    period: '2021-09/2022-08',
    stack: ['Unity', 'C#', 'MVVM', 'iOS', 'Android'],
    pitch:
      'Eat Fit is a mobile app that gamifies food and fitness habits — meal logging and activity goals wrapped in a progression loop so the streak is the reward, not the spreadsheet.',
    contributions: [
      'I built a custom MVVM framework on top of Unity to make UI development on iOS and Android stop fighting the engine — bindings, view-model lifecycle, and the navigation stack the rest of the team built screens against.',
      'I owned the progression and streak systems: daily goals, recovery rules, and the reward cadence that keeps users in the loop without manipulating them.',
      'I shipped the meal-log and activity-tracking screens against that MVVM framework, which dropped per-screen build time noticeably for the rest of the team.',
    ],
  },
]
