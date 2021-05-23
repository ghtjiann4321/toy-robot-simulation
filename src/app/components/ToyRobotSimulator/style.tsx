import styled from 'styled-components'

const Card = styled.section`
    max-width: 900px;
    margin: 0 auto;
    border-radius: 6px;
    position: relative;
    background: #fff;
`

const CardHeader = styled.div`
    background: #125174;
    border-radius: 4px 4px 0px 0px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    border-radius: 4px 4px 0 0;
}
`

const Logo = styled.img`
    margin-right: 4px;
    padding: 4px;
`

const CardBody = styled.div`
    padding: 40px 40px 80px;
`

const CardTitle = styled.p`
    font-size: 14px;
    background: #a8cef4b5;
    border-radius: 6px;
    padding: 12px;
    border: 1px solid #5ac8fa;
    margin-top: 20px;
    margin: 0;
`

const Divider = styled.div`
    background: #ccc;
    width: 100%;
    height: 1px;
    margin: 34px 0;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    @media (max-width: 900px) {
        grid-template-columns: 100%;
    }
`

const GridItem = styled.div`
    @media (max-width: 900px) {
        margin-bottom: 20px;
    }
`

const Caption = styled.div`
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #303030;
    margin-bottom: 12px;
`

const CommandBadge = styled.div`
    font-size: 14px;
    min-width: 70px;
    text-transform: uppercase;
    background: #ffffff;
    border: 1px solid #666;
    box-sizing: border-box;
    box-shadow: 2px 2px 0px 1px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: inline-block;
    padding: 2px 8px;
    margin: 3px 3px;
`
const CommandList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    &.main {
        margin-top: 20px;
    }

    li {
        font-size: 14px;
    }
`

const ExampleBlock = styled.div`
    background: #505050;
    border-radius: 6px;
    padding: 12px;
    margin-top: 20px;

    li {
        font-size: 14px;
        color: #eee;
    }
`

const FormWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const CommandInfo = styled.span`
    font-size: 13px;
    margin-left: 8px;
    display: inline-block;
`

export { Card, CardHeader, CardBody, CardTitle, Logo, Divider, Grid, GridItem, Caption, CommandBadge, CommandList, ExampleBlock, FormWrapper, CommandInfo }
