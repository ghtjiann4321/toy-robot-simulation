import React, { PureComponent, ReactElement } from 'react'
import bind from 'bind-decorator'

import { Command, Direction, RobotPosition } from '@typings/types'
import { exceededRange, getNextDirection } from '@utils/utils'

type Props = {
    command?: Command
    position?: RobotPosition
    onError: (message: string) => void
    onSuccess: (message: string) => void
    onReport: (message: string) => void
}

type State = {
    currentPosition?: RobotPosition
}

class ToyRobot extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            currentPosition: undefined,
        }
    }

    componentDidUpdate(prevProps: Props): void {
        const { command, position } = this.props
        if (prevProps.command !== command) {
            if (command) {
                this.readCommand(command, position)
            }
        }
    }

    @bind
    readCommand(command: Command, position?: RobotPosition): void {
        const { currentPosition } = this.state

        if (command === Command.place) {
            if (!position) {
                return
            }
            this.place(position)
            return
        }

        if (!currentPosition) {
            this.props.onError('Robot is currently not placed in the table')
            return
        }

        switch (command) {
            case Command.move:
                this.move(currentPosition)
                break
            case Command.left:
                this.left(currentPosition)
                break
            case Command.right:
                this.right(currentPosition)
                break
            case Command.report:
                this.report(currentPosition)
                break
        }

        this.props.onSuccess(`Command Accepted "${command}".`)
    }

    @bind
    place(position: RobotPosition): void {
        this.setState({
            currentPosition: position,
        })
        this.props.onSuccess(`Command Accepted "${Command.place}".`)
    }

    @bind
    move(currentPosition: RobotPosition): void {
        let moveIncrement = 0

        if ([Direction.north, Direction.east].includes(currentPosition.f)) moveIncrement++
        else if ([Direction.south, Direction.west].includes(currentPosition.f)) moveIncrement--

        switch (currentPosition.f) {
            case Direction.north:
            case Direction.south: {
                const newY = currentPosition.y + moveIncrement
                if (exceededRange(newY)) return
                this.setState({
                    currentPosition: {
                        ...currentPosition,
                        y: newY,
                    },
                })
                break
            }
            case Direction.east:
            case Direction.west: {
                const newX = currentPosition.x + moveIncrement
                if (exceededRange(newX)) return
                this.setState({
                    currentPosition: {
                        ...currentPosition,
                        x: newX,
                    },
                })
                break
            }
        }
    }

    @bind
    left(currentPosition: RobotPosition): void {
        const nextDirection = getNextDirection(currentPosition.f, 'left')

        this.setState({
            currentPosition: {
                ...currentPosition,
                f: nextDirection,
            },
        })
    }

    @bind
    right(currentPosition: RobotPosition): void {
        const nextDirection = getNextDirection(currentPosition.f, 'right')

        this.setState({
            currentPosition: {
                ...currentPosition,
                f: nextDirection,
            },
        })
    }

    @bind
    report(currentPosition: RobotPosition): void {
        this.props.onReport(`Robot is at ${currentPosition.x},${currentPosition.y},${currentPosition.f}`)
    }

    render(): ReactElement {
        return <></>
    }
}

export default ToyRobot
