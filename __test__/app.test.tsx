import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { type FC } from 'react'

const App: FC = () => <div>app</div>

describe('App', () => {
  it('it should be render', () => {
    render(<App />)
    expect(screen.getByText('app')).toBeInTheDocument()
  })
})
