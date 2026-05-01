import { render, screen } from '@testing-library/react'
import { PlainSection } from './PlainSection'

it('renders the section title and child content', () => {
  render(
    <PlainSection id="smoke" title="Smoke Test">
      <p>hello world</p>
    </PlainSection>
  )

  expect(screen.getByRole('heading', { name: 'Smoke Test' })).toBeInTheDocument()
  expect(screen.getByText('hello world')).toBeInTheDocument()
})
