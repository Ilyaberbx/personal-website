import type { Project, ProjectDomain } from '../../../data/types'

export type PortfolioGroup = {
  domain: ProjectDomain
  label: string
  items: Project[]
}
