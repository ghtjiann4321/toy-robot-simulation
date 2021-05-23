import { MOVEMENT_LIMIT } from '@constants/contants'
import { Command, Direction, RobotPosition } from '../types/types'

const getDirection = (dir: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'): Direction => {
    switch (dir) {
        case 'NORTH':
            return Direction.north
        case 'SOUTH':
            return Direction.south
        case 'WEST':
            return Direction.west
        case 'EAST':
            return Direction.east
        default:
            throw new Error('Invalid direction')
    }
}

const getCommand = (command: 'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'): Command => {
    switch (command) {
        case 'PLACE':
            return Command.place
        case 'MOVE':
            return Command.move
        case 'LEFT':
            return Command.left
        case 'RIGHT':
            return Command.right
        case 'REPORT':
            return Command.report
        default:
            throw new Error('Invalid command')
    }
}

const getPositionFromInput = (input: string): RobotPosition => {
    if (!input.match(/PLACE [0-4],[0-4],(NORTH|SOUTH|EAST|WEST)/)) {
        throw new Error('Invalid PLACE syntax')
    }

    const inputArr = input.split(' ')
    const inputArrPos = inputArr[1].split(',')
    const dir = <'NORTH' | 'SOUTH' | 'EAST' | 'WEST'>inputArrPos[2]

    return {
        x: parseInt(inputArrPos[0]),
        y: parseInt(inputArrPos[1]),
        f: getDirection(dir),
    }
}

const exceededRange = (pos: number): boolean => {
    return pos > MOVEMENT_LIMIT || pos < 0 ? true : false
}

const getNextDirection = (dir: Direction, move: 'left' | 'right'): Direction => {
    const dirArr = [Direction.north, Direction.east, Direction.south, Direction.west]
    const dirIndex = dirArr.indexOf(dir)
    let newDir = dir

    if (move === 'left') {
        newDir = dirIndex === 0 ? dirArr[dirArr.length - 1] : dirArr[dirIndex - 1]
    } else if (move === 'right') {
        newDir = dirIndex === dirArr.length - 1 ? dirArr[0] : dirArr[dirIndex + 1]
    }

    return getDirection(newDir)
}

export { getDirection, getCommand, getPositionFromInput, exceededRange, getNextDirection }
