import React, { useRef } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

// @ts-ignore
import LazyLoadComponent from 'react-lazyload'

interface Props {
    children?: any,
    height: number,
    offset: number
}

// interface WrapperProps {
//     css?: string
// }

// const Wrapper = styled.div<WrapperProps>`
//     position: relative;
//     ${props => props.css}
// `

// const loadingAnimation = keyframes`
//   0% {
//     background-color: #fff;
//   }
//   50% {
//     background-color: #ccc;
//   }
//   100% {
//     background-color: #fff;
//   }
// `

// const Skeleton = styled.div`
//     position: absolute;
//     left: 0;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     animation: ${loadingAnimation} 1s infinite;
// `

const LazyLoad = ({ children, height, offset }: Props) => {
    // const placeholder = useRef<HTMLDivElement>(null)

    // const removePlaceholder = () => {
    //     placeholder.current && placeholder.current.remove()
    // }
    
    return (
        <LazyLoadComponent height={height} offset={offset}>
            {children}
        </LazyLoadComponent>
    )
}

export default LazyLoad