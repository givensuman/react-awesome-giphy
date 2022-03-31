import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import useStore from '../../hooks/useStore'

import { MasonryItem, LazyLoad, Col } from '../index'

interface Props {
  data: any
}

type item = {
  title: string,
  images: {
    downsized: {
      height: number,
      width: number,
      url: string
    }
  }
}

interface WrapperProps {
  css?: string
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: 95%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 0.25em;

  ${props => props.css}
`

const Masonry = ({ data }: Props) => {

  console.log(data)

  // @ts-ignore
  const { columns, height, width } = useStore()

  const [ content, setContent ] = useState<any[]>([])

  useEffect(() => {

    // Sort data by image height
    data.sort((a: item, b: item) => 
      a.images.downsized.height - b.images.downsized.height
    )

    // Create array of arrays
    let columnsArray: any[] = []
    for (let i = 0; i < columns; i++) {
      console.log('hi')
      let newArray: item[] = []
      columnsArray.push(newArray)
    }

    // Populate each array with images
    let index = 0
    data.forEach((item: item) => {
      columnsArray[index].push(item)

      if (index == columnsArray.length - 1) { index = 0 }
      else { index++ }
    })

    // Randomize each array to give masonry appearance
    const shuffle = (array: any[]) => {
      // Fisher-Yates algorithm
      let m = array.length, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--)
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
    
      return array
    }
    
    columnsArray.forEach(array => shuffle(array))

    // Move new data structure to state
    setContent(columnsArray)
  }, [data])

  useEffect(() => console.log(content), [content])

  return (
    <Wrapper
      className='giphy__masonry'
      css={`
        max-height: calc(${height}px - 6em);
      `}
    >

    {content.length > 0 && content.map((contentArray: item[]) => 
      <Col>
        {contentArray.map((item: item, index: number) => 
          <LazyLoad 
              height={(width / columns)/Number(item.images.downsized.width) * Number(item.images.downsized.height)}
              offset={1}
            >
            <MasonryItem
              src={item.images.downsized.url}
              alt={item.title}
            />
          </LazyLoad>
        )}
      </Col>
    )}

    </Wrapper>
  )
}

export default Masonry