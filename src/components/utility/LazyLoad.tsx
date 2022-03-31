import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import useStore from '../../hooks/useStore'
import { useInView } from 'react-intersection-observer'

interface Props {
    children?: any,
    height: number
}

interface ComponentProps {
    css?: string
}

const Wrapper = styled.div<ComponentProps>`
    position: relative;
    ${props => props.css}
`

const Skeleton = styled.div<ComponentProps>`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: 0.125em;

    ${props => props.css}
`

const LazyLoad = ({ children, height }: Props) => {

    // @ts-ignore
    const { width, columns, bgAltColor } = useStore()

    const { ref, inView } = useInView()

    const placeholderRef = useRef<HTMLDivElement>(null)
    const [ ready, setReady ] = useState(false)
    const removePlaceholder = () => {
        placeholderRef.current && placeholderRef.current.remove()
    }
    
    
    return (
        <Wrapper
            ref={ref}
            css={`
                height: ${height}px;
                width: calc(${width / columns}px - 0.5em);
            `}
        >
            {!ready && placeholderRef &&
                <Skeleton 
                    ref={placeholderRef} 
                    css={`
                        background-color: ${bgAltColor};
                    `}
                />
            }
            {React.cloneElement(children, {
                onLoad: () => setReady(true),
                onError: () => removePlaceholder()
            })}
        </Wrapper>
    )
}

export default LazyLoad