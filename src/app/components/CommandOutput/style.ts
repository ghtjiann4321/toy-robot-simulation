import styled from 'styled-components'

const Output = styled.div`
    height: 100%;
    background: #505050;
    padding: 0 12px 12px;
    border-radius: 4px;
    width: 90%;
    display: flex;
    flex-direction: column;
`

const OutputTitle = styled.h6`
    margin: 12px 0;
    color: #eee;
`

const OutputBody = styled.div`
    flex-grow: 1;
    overflow: auto;
    height: 1px;

    @media (max-width: 900px) {
        min-height: 200px;
    }
`

const OutputItem = styled.div`
    margin-bottom: 12px;
    font-size: 14px;
    background: #333333;
    padding: 4px 4px 4px 8px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    color: #b7b7b7;
    justify-content: space-between;
`

const OutputRobot = styled.img`
    height: 24px;
    margin-right: 8px;
`

const NewTag = styled.span`
    display: inline-block;
    background: #fff;
    padding: 4px 8px;
    border-radius: 24px;
    font-weight: bold;
    font-size: 12px;
    color: #ff7a7a;
`

const OutputItemText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export { OutputBody, Output, OutputTitle, OutputItem, OutputRobot, OutputItemText, NewTag }
