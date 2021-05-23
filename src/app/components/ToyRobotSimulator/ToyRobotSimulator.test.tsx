import { render, screen } from '@testing-library/react'
import ToyRobotSimulator from './ToyRobotSimulator'

test('should be able to render component', () => {
    render(<ToyRobotSimulator />)
    const elem = screen.getByText('Toy Robot Simulation', { exact: true })
    expect(elem).toBeInTheDocument()
})

test('should be able to render the input', () => {
    render(<ToyRobotSimulator />)
    const elem = screen.getByPlaceholderText('Enter command')
    expect(elem).toBeInTheDocument()
})

test('should be able to render the output', () => {
    render(<ToyRobotSimulator />)
    const elem = screen.getByText('Output:', { exact: true })
    expect(elem).toBeInTheDocument()
})
