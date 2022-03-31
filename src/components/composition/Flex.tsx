import React from 'react'
import styled from '@emotion/styled'

interface Props {
    children: React.ReactNode,
    left?: boolean,
    right?: boolean,
    top?: boolean,
    bottom?: boolean,
    centerx?: boolean,
    centery?: boolean,
    center?: boolean
}

export const Row = ({
    children, ...props
}: Props) => {

    const {
        left, right, top, bottom, centerx, centery, center
    } = props
    
    const Stack = styled.div`
        display: flex;
        flex-direction: row;

        align-items: ${
            top ? 'flex-start' :
            bottom ? 'flex-end' :
            centery ? 'center' : 
            'stretch'
        };

        justify-content: ${
            left ? 'flex-start' :
            right ? 'flex-end' :
            centerx ? 'center' : 
            'stretch'
        };
    `

    return <Stack>{children}</Stack>
}

export const Col = ({
    children, ...props
}: Props) => {

    const {
        left, right, top, bottom, centerx, centery, center
    } = props

    const Stack = styled.div`
        display: flex;
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
    `

    return <Stack>{children}</Stack>
}