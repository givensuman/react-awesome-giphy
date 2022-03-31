import React, { useRef, useEffect }  from 'react'
import styled from '@emotion/styled'

interface Props {
  children: React.ReactNode,
  sizes: Array<{
      mq?: string,
      columns: number, 
      gutter: number
  }>,
  css?: string
}

interface WrapperProps {
    css?: string
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    flex-wrap: wrap;
    ${props => props.css}
`

const Masonry = ({ children, sizes, css }: Props) => {
  const container = useRef(null)



  return (
    <Wrapper
        ref={container}
        className='giphy__masonry'
        css={css}
    >
      {children}
    </Wrapper>
  )
}

export default Masonry