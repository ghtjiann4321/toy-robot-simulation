export type RobotPosition = {
    x: number
    y: number
    f: Direction
}

export type CommandInfo = {
    name: string
    description: string
}

enum Direction {
    north = 'NORTH',
    south = 'SOUTH',
    east = 'EAST',
    west = 'WEST',
}

enum Command {
    place = 'PLACE',
    move = 'MOVE',
    left = 'LEFT',
    right = 'RIGHT',
    report = 'REPORT',
}

export { Direction, Command }
