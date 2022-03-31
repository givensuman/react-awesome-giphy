import React from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

interface Props 
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode,
    active: boolean,
    css?: string
}

interface ButtonProps {
    css?: string
}

const Button = styled.button<ButtonProps>`
    border: none; outline: none;
    padding: 0.5em;
    border-radius: 0.25em;
    margin: 0.5em;
    cursor: pointer;
    transition: background-color 0.25s;

    ${props => props.css}
`

const ButtonComponent = ({ children, active, ...props }: Props) => {

    // @ts-ignore
    const { textColor, buttonColor } = useStore()

    return (
        <Button
            className='giphy__button'
            css={`
                color: ${textColor};
                background-color: ${active ? buttonColor : 'transparent'};
                &:hover {
                    background-color: ${buttonColor};
                }
            `}
            {...props}
        >
            {children}
        </Button>
    )
}

export default ButtonComponent