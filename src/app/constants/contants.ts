import { CommandInfo } from '@typings/types'

const COMMANDS: Array<CommandInfo> = [
    {
        name: 'Move',
        description: 'Move the Robot 1 unit towards the facing direction',
    },
    {
        name: 'Report',
        description: 'Show the current position of the Robot',
    },
    {
        name: 'Left',
        description: 'Turn the Robot 90 degrees left',
    },
    {
        name: 'Right',
        description: 'Turn the Robot 90 degrees right',
    },
    {
        name: 'Place',
        description: 'Place the Robot on the table',
    },
]

const MOVEMENT_LIMIT = 4

export { COMMANDS, MOVEMENT_LIMIT }
