import React from 'react'
import styled from '@emotion/styled'

interface Props {
    children: React.ReactNode,
    css?: string,
    left?: boolean,
    right?: boolean,
    top?: boolean,
    bottom?: boolean,
    centerx?: boolean,
    centery?: boolean,
    center?: boolean
}

interface StackProps {
    css: string
}

const Stack = styled.div<StackProps>`
    display: flex;
    ${props => props.css}
`

export const Row = ({
    children, ...props
}: Props) => {

    const {
        left, right, top, bottom, centerx, centery, center
    } = props

    return (
        <Stack
            css={`
                flex-direction: row;

                align-items: ${
                    top ? 'flex-start' :
                    bottom ? 'flex-end' :
                    (centery || center) ? 'center' : 
                    'stretch'
                };
        
                justify-content: ${
                    left ? 'flex-start' :
                    right ? 'flex-end' :
                    (centerx || center) ? 'center' : 
                    'stretch'
                };
                ${props.css}
            `}
        >
            {children}
        </Stack>
    )
}

export const Col = ({
    children, ...props
}: Props) => {

    const {
        left, right, top, bottom, centerx, centery, center
    } = props

    return (
        <Stack
            css={`
                flex-direction: column;

                justify-content: ${
                    top ? 'flex-start' :
                    bottom ? 'flex-end' :
                    (centery || center) ? 'center' : 
                    'stretch'
                };
        
                align-items: ${
                    left ? 'flex-start' :
                    right ? 'flex-end' :
                    (centerx || center) ? 'center' : 
                    'stretch'
                };
                ${props.css}
            `}
        >
            {children}
        </Stack>
    )
}