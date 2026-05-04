import { render, screen } from '@testing-library/react'
import { PortfolioContent } from './PortfolioContent'
import { projects } from '../../../data'

it('renders all six projects', () => {
  render(<PortfolioContent />)
  for (const project of projects) {
    expect(screen.getByRole('heading', { name: project.name })).toBeInTheDocument()
  }
  expect(projects).toHaveLength(6)
})

it('renders both group labels', () => {
  render(<PortfolioContent />)
  expect(screen.getByRole('heading', { name: 'Web3' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Gamedev' })).toBeInTheDocument()
})

it('renders an outbound link for projects that carry one', () => {
  render(<PortfolioContent />)
  const linked = projects.filter((p) => p.link)
  expect(linked.length).toBeGreaterThan(0)
  for (const project of linked) {
    if (!project.link) continue
    const link = screen.getByRole('link', { name: project.link.label })
    expect(link).toHaveAttribute('href', project.link.href)
  }
})
