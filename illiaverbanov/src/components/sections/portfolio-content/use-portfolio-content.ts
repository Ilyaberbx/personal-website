import { projects } from '../../../data'
import { DOMAIN_LABELS, DOMAIN_ORDER, PORTFOLIO_INTRO } from './portfolio-content.constants'
import type { PortfolioGroup } from './portfolio-content.types'

export function usePortfolioContent() {
  const groups: PortfolioGroup[] = DOMAIN_ORDER.map((domain) => ({
    domain,
    label: DOMAIN_LABELS[domain],
    items: projects.filter((p) => p.domain === domain),
  }))

  return { intro: PORTFOLIO_INTRO, groups }
}
