import React, { ChangeEvent, FormEvent, PureComponent, ReactElement } from 'react'
import bind from 'bind-decorator'

import { Command, RobotPosition } from '@typings/types'
import { getCommand, getPositionFromInput } from '@utils/utils'
import { Form, Input } from './style'

type State = {
    input: string
}

type Props = {
    onSendCommand: (obj: { command: Command; position?: RobotPosition }) => void
    onError: (message: string) => void
}

class CommandInput extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            input: '',
        }
    }

    @bind
    handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { value } = e.target
        this.setState({ input: value })
    }

    @bind
    handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        const { input: value } = this.state
        const { onSendCommand, onError } = this.props

        switch (value) {
            case (value.match(/PLACE [0-4],[0-4],(NORTH|SOUTH|EAST|WEST)/) || {}).input: {
                const newPosition = getPositionFromInput(value)
                onSendCommand({ command: Command.place, position: newPosition })
                break
            }
            case 'MOVE':
            case 'LEFT':
            case 'RIGHT':
            case 'REPORT':
                onSendCommand({ command: getCommand(value) })
                break
            default:
                onError(`Invalid command "${value}"`)
        }

        this.setState({ input: '' })
    }

    render(): ReactElement {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input onChange={this.handleChange} placeholder="Enter command" value={this.state.input} />
            </Form>
        )
    }
}

export default CommandInput
