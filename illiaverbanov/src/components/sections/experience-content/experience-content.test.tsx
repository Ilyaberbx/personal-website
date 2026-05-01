import { render, screen } from '@testing-library/react'
import { ExperienceContent } from './ExperienceContent'

it('renders the experience intro text', () => {
  render(<ExperienceContent />)
  expect(screen.getByText(/Quest log of completed/)).toBeInTheDocument()
})

it('renders at least one experience entry', () => {
  render(<ExperienceContent />)
  const buttons = screen.getAllByRole('button')
  expect(buttons.length).toBeGreaterThan(0)
})
