import { render, screen, waitFor } from '@testing-library/react'
import CommandOutput from '@components/CommandOutput'

test('should render the component', () => {
    render(<CommandOutput reports={[]} />)
    const elem = screen.getByText(/Output/i)
    expect(elem).toBeInTheDocument()
})

test('should show the report in the component', () => {
    const reports = ['Robot is at 0,0,NORTH', 'Robot is at 1,0,NORTH']
    render(<CommandOutput reports={reports} />)
    reports.forEach((report) => {
        const elem = screen.getByText(report)
        expect(elem).toBeInTheDocument()
    })
})

test('should show the "new" badge on render of report item', async () => {
    const reports = ['Robot is at 0,0,NORTH']
    render(<CommandOutput reports={reports} />)
    const elem = screen.getByText(/new/i)
    expect(elem).toBeInTheDocument()
})

test('should remove the "new" text after 3 seconds', async () => {
    jest.useFakeTimers()
    const reports = ['Robot is at 0,0,NORTH']
    const { rerender } = render(<CommandOutput reports={[]} />)
    rerender(<CommandOutput reports={reports} />)
    jest.advanceTimersByTime(4000)
    await waitFor(() => {
        const noNewElem = screen.queryByText(/new/i)
        expect(noNewElem).toBeNull()
    })
})
