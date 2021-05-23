import React, { Component, Fragment, ReactElement } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import bind from 'bind-decorator'
import 'react-toastify/dist/ReactToastify.css'

import { Command, CommandInfo as CommandInfoType, RobotPosition } from '@typings/types'
import { COMMANDS } from '@constants/contants'

import CommandInput from '@components/CommandInput'
import CommandOutput from '@components/CommandOutput'
import ToyRobot from '@components/ToyRobot'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Logo,
    Divider,
    Grid,
    GridItem,
    Caption,
    CommandBadge,
    CommandList,
    ExampleBlock,
    FormWrapper,
    CommandInfo,
} from './style'

type State = {
    command?: Command
    position?: RobotPosition
    reports: string[]
}

class ToyRobotSimulator extends Component<any, State> {
    constructor(props: null) {
        super(props)
        this.state = {
            command: undefined,
            position: undefined,
            reports: [],
        }
    }

    @bind
    handleSendCommand(obj: { command: Command; position?: RobotPosition }): void {
        this.setState(obj, () => {
            this.setState({ command: undefined, position: undefined })
        })
    }

    @bind
    showSuccessToast(message: string): void {
        toast.success(message)
    }

    @bind
    showErrorToast(message: string): void {
        toast.error(message)
    }

    @bind
    handleReport(message: string): void {
        this.setState((prevState) => ({
            reports: [message, ...prevState.reports],
        }))
    }

    render(): ReactElement {
        const { command, position, reports } = this.state
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Card>
                    <CardHeader>
                        <Logo src="./robot.svg" alt="logo" /> Toy Robot Simulation
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            This is a toy robot simulation app. The goal is to move the robot on on a square table top without falling over the table top has a
                            dimension of 5 units x 5 units. Enter the commands on the text area to send commands to the robot.
                        </CardTitle>
                        <Divider />
                        <Grid>
                            <GridItem>
                                <FormWrapper>
                                    <CommandInput onSendCommand={this.handleSendCommand} onError={this.showErrorToast} />
                                    <CommandOutput reports={reports} />
                                    <ToyRobot
                                        command={command}
                                        position={position}
                                        onError={this.showErrorToast}
                                        onSuccess={this.showSuccessToast}
                                        onReport={this.handleReport}
                                    />
                                </FormWrapper>
                            </GridItem>
                            <GridItem>
                                <Caption>Available Commands</Caption>
                                {COMMANDS.map((command: CommandInfoType, index: number) => {
                                    return (
                                        <Fragment key={index}>
                                            <CommandBadge>{command.name}</CommandBadge>
                                            <CommandInfo>{command.description}</CommandInfo>
                                            <br />
                                        </Fragment>
                                    )
                                })}
                                <CommandList className="main">
                                    <li>X - horizontal position (0)</li>
                                    <li>Y - vertical position (0)</li>
                                    <li>F - facing direction (NORTH, SOUTH, EAST, WEST)</li>
                                    <li>
                                        <ExampleBlock>
                                            <CommandList>
                                                <li>
                                                    <strong>EXAMPLE:</strong>
                                                </li>
                                                <li>PLACE 0,0,NORTH</li>
                                                <li>MOVE</li>
                                                <li>LEFT</li>
                                                <li>REPORT</li>
                                            </CommandList>
                                        </ExampleBlock>
                                    </li>
                                </CommandList>
                            </GridItem>
                        </Grid>
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default ToyRobotSimulator
