import React, { useRef, useEffect }  from 'react'
import styled from '@emotion/styled'
import Bricks from 'bricks.js'

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
    ${props => props.css}
`

const Masonry = ({ children, sizes, css }: Props) => {
  const container = useRef(null)

  useEffect(() => {
    const bricks = Bricks({
        // @ts-ignore
        container: container.current,
        packed: 'data-packed',
        sizes,
        position: true,
    })

    bricks.resize(true)

    React.Children.count(children) > 0 && bricks.pack()

  }, [children])

  return (
    <Wrapper
        className='giphy__masonry'
        ref={container}
        css={css}
    >
      {children}
    </Wrapper>
  )
}

export default Masonry