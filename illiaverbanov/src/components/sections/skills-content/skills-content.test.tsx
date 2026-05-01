import { render, screen } from '@testing-library/react'
import { SkillsContent } from './SkillsContent'

it('renders the skills intro text', () => {
  render(<SkillsContent />)
  expect(screen.getByText(/Inventory of equipped technologies/)).toBeInTheDocument()
})

it('renders at least one skill group', () => {
  render(<SkillsContent />)
  const groups = document.querySelectorAll('section')
  expect(groups.length).toBeGreaterThan(0)
})
