import { render, screen } from '@testing-library/react'
import { AboutContent } from './AboutContent'

it('renders identity section with name', () => {
  render(<AboutContent />)
  expect(screen.getByText('Identity')).toBeInTheDocument()
})

it('renders education section', () => {
  render(<AboutContent />)
  expect(screen.getByText('Education')).toBeInTheDocument()
})

it('renders languages section', () => {
  render(<AboutContent />)
  expect(screen.getByText('Languages')).toBeInTheDocument()
})
