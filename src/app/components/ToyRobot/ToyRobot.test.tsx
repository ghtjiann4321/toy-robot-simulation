import { render } from '@testing-library/react'
import { Command, Direction, RobotPosition } from '@typings/types'
import ToyRobot from './ToyRobot'

const fnSetup = (
    type: 'error' | 'success' | 'report'
): {
    mockFn: jest.Mock<any, any>
    mockFnError: jest.Mock<any, any>
    mockFnReport: jest.Mock<any, any>
} => {
    const mockFn = jest.fn()
    const mockFnError = jest.fn()
    const mockFnReport = jest.fn()
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.north,
    }
    const { rerender } = render(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} />)

    if (['success', 'report'].includes(type)) {
        rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.place} position={position} />)
    }

    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.move} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.left} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.right} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.report} />)
    return { mockFn, mockFnError, mockFnReport }
}

const runSetup = (position: RobotPosition, command: Command): jest.Mock<any, any> => {
    const mockFn = jest.fn()
    const mockFnReport = jest.fn()
    const mockFnError = jest.fn()
    const { rerender } = render(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.place} position={position} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={command} />)
    rerender(<ToyRobot onError={mockFnError} onSuccess={mockFn} onReport={mockFnReport} command={Command.report} />)
    return mockFnReport
}

test('should run onError() method if command is sent with using PLACE first', () => {
    const { mockFnError } = fnSetup('error')
    expect(mockFnError).toHaveBeenCalledTimes(4)
})

test('should run onSuccess() method if command is placed successfully', () => {
    const { mockFn } = fnSetup('success')
    expect(mockFn).toHaveBeenCalledTimes(5)
})

test('should run onReport() method if the component received a Command.report command props', () => {
    const { mockFnReport } = fnSetup('report')
    expect(mockFnReport).toHaveBeenCalledTimes(1)
})

test('should move the robot 1 position NORTH', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.north,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,1,NORTH')
})

test('should move the robot 1 position EAST', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.east,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 1,0,EAST')
})

test('should turn the robot direction from NORTH to EAST', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.north,
    }
    const mockFnReport = runSetup(position, Command.right)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,0,EAST')
})

test('should turn the robot direction from NORTH to WEST', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.north,
    }
    const mockFnReport = runSetup(position, Command.left)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,0,WEST')
})

test('should turn the robot direction from WEST to SOUTH', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.west,
    }
    const mockFnReport = runSetup(position, Command.left)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,0,SOUTH')
})

test('should not move robot if it is in the SOUTHERN limit of the table', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.south,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,0,SOUTH')
})

test('should not move robot if it is in the NORTHERN limit of the table', () => {
    const position: RobotPosition = {
        x: 0,
        y: 4,
        f: Direction.north,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,4,NORTH')
})

test('should not move robot if it is in the WESTERN limit of the table', () => {
    const position: RobotPosition = {
        x: 0,
        y: 0,
        f: Direction.west,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 0,0,WEST')
})

test('should not move robot if it is in the EASTERN limit of the table', () => {
    const position: RobotPosition = {
        x: 4,
        y: 0,
        f: Direction.east,
    }
    const mockFnReport = runSetup(position, Command.move)
    expect(mockFnReport).toHaveBeenCalledWith('Robot is at 4,0,EAST')
})
