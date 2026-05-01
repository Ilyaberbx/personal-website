import { render, screen } from '@testing-library/react'
import { ContactContent } from './ContactContent'

it('renders the contact intro text', () => {
  render(<ContactContent />)
  const intro = document.querySelector('p')
  expect(intro).toBeInTheDocument()
})

it('renders at least one contact link', () => {
  render(<ContactContent />)
  const links = screen.getAllByRole('link')
  expect(links.length).toBeGreaterThan(0)
})
