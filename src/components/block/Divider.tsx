import React from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

interface DividerProps {
    css?: string
}

const Divider = styled.div<DividerProps>`
    height: 0.125em;
    width: 100%;

    ${props => props.css}
`

const DividerComponent = () => {

    // @ts-ignore
    const { bgAltColor } = useStore()

    return (
        <Divider 
            css={`
                background-color: ${bgAltColor};
            `}
        />
    )
}

export default DividerComponent