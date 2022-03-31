import React from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

interface Props {
    children: React.ReactNode
}

interface WrapperProps {
    css?: string
}

const Wrapper = styled.div<WrapperProps>`
    padding-bottom: 0.25em;
    border-radius: 0.25em;
    position: relative;
    ${props => props.css}
`

const WrapperComponent = ({ children }: Props) => {

    // @ts-ignore
    const { bgColor, textColor, height, width, css } = useStore()

    return (
        <Wrapper
            css={`
                background-color: ${bgColor};
                color: ${textColor};
                height: ${height}px;
                width: ${width}px;
                ${css}
            `}
        >
            {children}
        </Wrapper>
    )
}

export default WrapperComponent