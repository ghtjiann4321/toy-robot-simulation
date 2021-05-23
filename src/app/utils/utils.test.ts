import { Command, Direction } from '@typings/types'
import { getDirection, getCommand, exceededRange, getPositionFromInput, getNextDirection } from './utils'

describe('getDirection()', () => {
    test('should return the correct direction from string', () => {
        const arr: Array<'NORTH' | 'SOUTH' | 'EAST' | 'WEST'> = ['NORTH', 'SOUTH', 'EAST', 'WEST']
        const compareArr = [Direction.north, Direction.south, Direction.east, Direction.west]
        arr.forEach((dir, index: number) => {
            const newDir = getDirection(dir)
            expect(newDir).toBe(compareArr[index])
        })
    })
})

describe('getCommand()', () => {
    test('should return the correct command from string', () => {
        const arr: Array<'PLACE' | 'MOVE' | 'LEFT' | 'RIGHT' | 'REPORT'> = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT']
        const compareArr = [Command.place, Command.move, Command.left, Command.right, Command.report]
        arr.forEach((command, index: number) => {
            const newCommand = getCommand(command)
            expect(newCommand).toBe(compareArr[index])
        })
    })
})

describe('exceededRange()', () => {
    test('should return true if the number exceeds the range limit set in MOVEMENT_LIMIT', () => {
        expect(exceededRange(0)).toBeFalsy()
        expect(exceededRange(1)).toBeFalsy()
        expect(exceededRange(5)).toBeTruthy()
        expect(exceededRange(-1)).toBeTruthy()
    })
})

describe('getPositionFromInput', () => {
    test('should get the x,y,f values from the input', () => {
        const obj = getPositionFromInput('PLACE 0,1,NORTH')
        expect(obj.x).toBe(0)
        expect(obj.y).toBe(1)
        expect(obj.f).toBe(Direction.north)
    })

    test('should throw an error if the value is invalid', () => {
        expect(() => {
            getPositionFromInput('PLACE0,1,NORTH')
        }).toThrowError('Invalid PLACE syntax')
    })
})

describe('getNextDirection', () => {
    test('should get the next direction from a value of right', () => {
        const arr: Array<Direction> = [Direction.north, Direction.east, Direction.south, Direction.west]
        const compareArr: Array<Direction> = [Direction.east, Direction.south, Direction.west, Direction.north]

        arr.forEach((dir, index: number) => {
            const value = getNextDirection(dir, 'right')
            expect(value).toBe(compareArr[index])
        })
    })

    test('should get the next direction from a value of left', () => {
        const arr: Array<Direction> = [Direction.north, Direction.west, Direction.south, Direction.east]
        const compareArr: Array<Direction> = [Direction.west, Direction.south, Direction.east, Direction.north]

        arr.forEach((dir, index: number) => {
            const value = getNextDirection(dir, 'left')
            expect(value).toBe(compareArr[index])
        })
    })
})
