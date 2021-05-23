import React, { PureComponent, ReactElement } from 'react'

import { OutputBody, OutputTitle, Output, OutputItem, OutputRobot, OutputItemText, NewTag } from './style'

type Props = {
    reports: string[]
}

type State = {
    hideNewTag: boolean
}

class CommandOutput extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hideNewTag: false,
        }
    }

    ref = React.createRef<HTMLDivElement>()
    timeout: NodeJS.Timeout | null = null

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.reports !== this.props.reports) {
            this.setState({ hideNewTag: false }, () => {
                if (this.timeout) {
                    clearTimeout(this.timeout)
                }
                this.timeout = setTimeout(() => this.setState({ hideNewTag: true }), 3000)
            })

            if (this.ref) {
                this.ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    render(): ReactElement {
        return (
            <Output>
                <OutputTitle>Output: </OutputTitle>
                <OutputBody>
                    <div ref={this.ref}>
                        {this.props.reports.map((report, index) => (
                            <OutputItem key={index} className={index === 0 ? 'new' : ''}>
                                <OutputItemText>
                                    <OutputRobot src="./robot-dark.svg" alt="robot icon" />
                                    {report}
                                </OutputItemText>
                                {index === 0 && !this.state.hideNewTag && <NewTag>NEW</NewTag>}
                            </OutputItem>
                        ))}
                    </div>
                </OutputBody>
            </Output>
        )
    }
}

export default CommandOutput
