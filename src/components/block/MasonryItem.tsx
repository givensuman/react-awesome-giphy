import React from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

import { LazyLoad } from '../index'

interface Props 
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string,
    alt: string
}

interface ItemProps {
    css?: string
}

const Item = styled.img<ItemProps>`
    margin: 0.25em;
    border-radius: 0.25em;
    cursor: pointer;
    box-sizing: border-box;

    ${props => props.css}
`

const MasonryItem = (props: Props) => {

    // @ts-ignore
    const { columns, accentColor } = useStore()

    return (
        <Item 
            css={`
                max-width: calc(${100/columns}% - ${columns * 0.25}em);
                &:hover {
                    border: 0.125em solid ${accentColor};
                }
            `}
            {...props}
        />
    )
}

export default MasonryItem