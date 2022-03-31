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
  flex-direction: row;
  justify-content: flex-start;
  width: 97.5%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  bottom: 0.5em;
  border-radius: 0.5em;

  ${props => props.css}
`

const Masonry = ({ data }: Props) => {

  // const startTime = new Date().getTime()

  // @ts-ignore
  const { columns, height, width } = useStore()

  const [ content, setContent ] = useState<any[]>([])

  useEffect(() => {

    if (!data || data.length == 0) return

    // Sort data by image height
    data.sort((a: item, b: item) => 
      a.images.downsized.height - b.images.downsized.height
    )

    // Create array of arrays
    let columnsArray: any[] = []
    for (let i = 0; i < columns; i++) {
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

    // Organize arrays by length
    type arrayItem = {index: number, sum: number}
    let arrayLengths: arrayItem[] = []
    const reducer = (acc: number, curr: number) => acc + curr
    columnsArray.forEach((array: item[], index: number) => {
        let sum = array.map(item => Number(item.images.downsized.height))
          .reduce(reducer)
        arrayLengths.push({ index: index, sum: sum })
    })

    // Sort arrays by length, shortest to longest
    arrayLengths.sort((a: arrayItem, b: arrayItem) => a.sum - b.sum)

    // If the array one larger is still larger with the last item removed, move the last item to the smaller array
    arrayLengths.forEach((array: arrayItem, index: number) => {
      if (index < arrayLengths.length - 1) {
        let largerArray: item[] = columnsArray[arrayLengths[index + 1].index]

        // While loops freak me out man
        while (
          (arrayLengths[index + 1].sum - Number(largerArray[largerArray.length - 1].images.downsized.height)) > array.sum 
        ) {
          columnsArray[array.index].push(
            columnsArray[arrayLengths[index + 1].index].pop()
          )
        }
      }
    })

    // Move new data structure to state
    setContent(columnsArray)

    // Currently takes 1 - 4 ms
    // const endTime = new Date().getTime()
    // console.log(`Masonry took ${endTime - startTime}ms`)
  }, [data])

  // useEffect(() => console.log(content), [content])

  return (
    <Wrapper
      className='giphy__masonry'
      css={`
        max-height: calc(${height}px - 6em);
      `}
    >

    {content.length > 0 && content.map((contentArray: item[]) => 
      <Col>
        {contentArray.map((item: item) => 
          <LazyLoad 
            height={(width / columns)/Number(item.images.downsized.width) * Number(item.images.downsized.height)}
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