import React from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

interface Props extends 
    React.InputHTMLAttributes<HTMLInputElement> {
}

interface InputProps {
    css?: string
}

const Input = styled.input<InputProps>`
    width: 90%;
    margin: 0 auto 0.5em;
    border-radius: 0.25em;
    outline: none;
    border: none;
    padding: 0.25em;
    font-size: 0.95rem;

    ${props => props.css}
`


const InputComponent = (props: Props) => {

    // @ts-ignore
    const { inputColor, textAltColor } = useStore()

    return (
        <Input 
            css={`
                background-color: ${inputColor};
                color: ${textAltColor};
            `}
            {...props}
        />
    )
}

export default InputComponent