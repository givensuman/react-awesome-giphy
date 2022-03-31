import React from 'react'
import styled from '@emotion/styled'

interface Props {
    color: string,
    css?: string
}

const Loader = ({
    color,
    css = ''
}: Props) => {

    const Wrapper = styled.div`
        ${css}
    `

    return (
        <Wrapper>

        <svg 
            xmlns="http://www.w3.org/2000/svg"
            width="100px" 
            height="100px" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid"
            style={{
                display: 'block',
                margin: 'auto'
            }}
        >
            <circle 
                cx="50" 
                cy="50" 
                r="30" 
                stroke="transparent" 
                strokeWidth="10" 
                fill="none" 
            />
            <circle 
                cx="50" 
                cy="50" 
                r="30" 
                stroke={color} 
                strokeWidth="8" 
                strokeLinecap="round" 
                fill="none"
            >
                <animateTransform 
                    attributeName="transform" 
                    type="rotate" 
                    repeatCount="indefinite" 
                    dur="1.1363636363636365s" 
                    values="0 50 50;180 50 50;720 50 50" 
                    keyTimes="0;0.5;1" 
                />
                <animate 
                attributeName="stroke-dasharray" 
                repeatCount="indefinite" 
                dur="1.1363636363636365s" 
                values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" 
                keyTimes="0;0.5;1" />
            </circle>
        </svg>
        
        </Wrapper>
    )
}

export default Loader