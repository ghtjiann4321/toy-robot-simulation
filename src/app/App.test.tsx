import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
    render(<App />)
    const elem = screen.getByText(/Toy Robot Simulation/i, { selector: 'div' })
    expect(elem).toBeInTheDocument()
})
