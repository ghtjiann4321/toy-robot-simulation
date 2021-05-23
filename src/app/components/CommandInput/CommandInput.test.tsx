import { fireEvent, render, screen } from '@testing-library/react'
import CommandInput from '@components/CommandInput'
import { Command } from '@typings/types'

test('should render the component', () => {
    const mockFn = jest.fn()
    render(<CommandInput onSendCommand={mockFn} onError={mockFn} />)
    const elem = screen.getByPlaceholderText('Enter command')
    expect(elem).toBeInTheDocument()
})

test('should run onError() method if input is not correct', () => {
    const mockFn = jest.fn()
    const mockFnError = jest.fn()
    render(<CommandInput onSendCommand={mockFn} onError={mockFnError} />)
    const input = screen.getByPlaceholderText('Enter command')
    fireEvent.change(input, { target: { value: 'PLACES' } })
    fireEvent.submit(input)
    expect(mockFnError).toHaveBeenCalledTimes(1)
})

test('should run onSendCommand() method if input is correct', () => {
    const mockFn = jest.fn((obj) => obj)
    const mockFnError = jest.fn()
    render(<CommandInput onSendCommand={mockFn} onError={mockFnError} />)
    const input = screen.getByPlaceholderText('Enter command')
    fireEvent.change(input, { target: { value: 'MOVE' } })
    fireEvent.submit(input)
    expect(mockFn).toHaveBeenCalledWith({ command: Command.move })
})
