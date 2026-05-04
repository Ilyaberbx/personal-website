import type { ProjectDomain } from '../../../data/types'

export const PORTFOLIO_INTRO =
  'Selected projects I shipped or am currently shipping. Web3 first, gamedev second.'

export const DOMAIN_LABELS: Record<ProjectDomain, string> = {
  web3: 'Web3',
  gamedev: 'Gamedev',
}

export const DOMAIN_ORDER: ProjectDomain[] = ['web3', 'gamedev']
