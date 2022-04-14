import React, { useState } from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

interface Props extends 
    React.InputHTMLAttributes<HTMLInputElement> {
        callback: (input: string) => void
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

    const [ input, setInput ] = useState('')

    // @ts-ignore
    const { inputColor, textAltColor } = useStore()

    return (
        <Input
            value={input}
            className='giphy__input'
            css={`
                background-color: ${inputColor};
                color: ${textAltColor};
            `}
            {...props}
            onChange={e => {
                setInput(e.target.value)
                props.callback(e.target.value)
            }}
        />
    )
}

export default InputComponent