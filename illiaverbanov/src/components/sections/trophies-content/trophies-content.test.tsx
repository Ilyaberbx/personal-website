import { render, screen } from '@testing-library/react'
import { TrophiesContent } from './TrophiesContent'

it('renders the trophies intro text', () => {
  render(<TrophiesContent />)
  expect(screen.getByText(/Notable achievements/)).toBeInTheDocument()
})

it('renders at least one trophy article', () => {
  render(<TrophiesContent />)
  const articles = document.querySelectorAll('article')
  expect(articles.length).toBeGreaterThan(0)
})
