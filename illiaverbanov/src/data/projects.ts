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
    tagline: 'Incentives and AI trading suggestions for the Miracle trading platform.',
    role: 'Fullstack Web3 Engineer',
    period: '2025-02/2025-08',
    stack: [
      'React',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Node.js',
      'WebSockets',
    ],
    link: { label: 'docs.miracletrade.com', href: 'https://docs.miracletrade.com/' },
    pitch:
      'Miracle is a trading platform where retention is engineered: VIP tiers, points, XP, loyalty, referrals, and timed events stack on top of the trading core, with an engine-agnostic AI suggestion module guiding traders across scalping, day-trading, and swing horizons.',
    contributions: [
      'I shipped the incentive suite end-to-end — VIP program, Miracle Points, XP / rewards / loyalty, and the referral system — as cohesive modules that share user state and settle deterministically against trading activity.',
      'I built the events system: time-windowed XP and points multipliers, leaderboards, and cash-prize payouts, with a config model that lets ops launch a new event without a release.',
      'I owned the engine-agnostic AI trading suggestions module — pluggable model backends, normalized signal schema, and trade-style profiles for scalping, day trading, and swing so suggestions match the trader’s horizon.',
    ],
  },
  {
    id: 'cult',
    name: 'Cult',
    domain: 'web3',
    tagline: 'Meme-coin trading terminal with a reputation-gated early-access system.',
    role: 'Fullstack Web3 Engineer',
    period: '2025-06/2025-09',
    stack: ['React', 'TypeScript', 'viem', 'Uniswap V3', 'Node.js', 'WebSockets'],
    pitch:
      'Cult Trade is a meme-coin trading terminal where reputation gates access — users who earn standing in the system can trade newly listed assets before the rest of the market, turning the launch curve itself into the product.',
    contributions: [
      'I shipped the trading terminal end-to-end on top of Uniswap V3 — pool reads via viem, swap routing, and the order panel that handles slippage and price-impact preview against live pool state.',
      'I built the real-time chart: candle aggregation off Uniswap V3 swap events, incremental updates over WebSockets, and reconnect-safe backfill so the chart stays consistent during volatile launches.',
      'I wired the reputation-gated early-access flow into the terminal so users with sufficient standing see and can trade newly listed assets ahead of the open cohort.',
    ],
  },
  {
    id: 'cooking-rage',
    name: 'Cooking Rage',
    domain: 'gamedev',
    tagline: 'Casual cooking sim — 12+ themed restaurants, 950+ levels, global cuisines.',
    role: 'Unity Engineer',
    period: '2023-04/2024-02',
    stack: ['Unity', 'C#', 'MVVM', 'Addressables', 'Kinoa LiveOps'],
    pitch:
      'Cooking Rage — Restaurant Game is a casual cooking simulation by Famobi Plus / Tremex Games, spanning 12+ themed restaurants and 950+ levels of prep, cook, and serve across American, French, Italian, and other global cuisines. Free on Android, iOS, and PC, playable offline, with kitchen upgrades and an achievement notebook driving the long tail.',
    contributions: [
      'I built core kitchen-station mechanics — prep, cook, and serve loops tuned for the speed-and-strategy core that the game leans on level after level.',
      'I owned the customer queue and patience system: timers, mood transitions, and the per-restaurant difficulty curve that scales tickets as the player progresses through hundreds of levels.',
      'I shipped the kitchen-upgrade and achievement-notebook systems so progression keeps compounding across the 12+ themed restaurants and 950+ levels.',
      'I integrated the Kinoa LiveOps engine so designers could push events and tune economy live without a client release, and made the build run cleanly offline on Android, iOS, and PC.',
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
    tagline: 'Burger-mining idle game — eat, get fat, gym it off into coins.',
    role: 'Unity Engineer',
    period: '2021-09/2022-08',
    stack: ['Unity', 'C#', 'MVVM', 'iOS', 'Android'],
    pitch:
      'Eat Fit is a "Dig Deeper"-style idle game reskinned around burgers — the player digs burger mines with a fork, gets fatter as they eat, then converts that fat into coins at the gym. Coins buy pets that boost move speed, workers that earn passive income, and new mines to dig.',
    contributions: [
      'I built the core mine-dig loop: fork-based digging in burger mines, the eat → fatten → gym → coin transformation cycle, and the pacing that keeps each cycle short enough to feel snappy on mobile.',
      'I shipped the economy systems — pets (move-speed boosts), workers (passive income), and new mine unlocks — and tuned the curve so each purchase visibly accelerates the next loop.',
      'I built a custom MVVM framework on top of Unity for the UI layer — bindings, view-model lifecycle, and the navigation stack the rest of the team built screens against on iOS and Android.',
    ],
  },
]
