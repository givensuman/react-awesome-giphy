import React from 'react'
import styled from '@emotion/styled'
import { Masonry } from 'masonic'

import '../../styles/scrollbar.css'
import useStore from '../../hooks/useStore'

interface MasonryItemProps {
  width: number,
  index: number,
  data: {
    title: string,
    images: {
      downsized: {
        url: string,
        height: string,
        width: string
      }
    }
  }
}

const Gif = styled.img<{css: string}>`
  max-width: ${props => props.width}px;
  border: 2px solid transparent;
  cursor: pointer;

  ${props => props.css}
`

const MasonryItem = ({ data, width }: MasonryItemProps) => {

  // @ts-ignore
  const { callback, accentColor } = useStore()

  return (
      <Gif
        alt={data.title}
        src={data.images.downsized.url}
        width={width - 10}
        onClick={() => callback(data)}
        css={`
          &:hover {
            border-color: ${accentColor};
          }
        `}
      />
  )
}

interface Props {
  data: any[]
}

const Wrapper = styled.div<{height: number, scrollbarColor: string}>`
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: ${props => `calc(${props.height}px - 100px);`}
  max-width: calc(100% - 18px);
  margin: auto;
  position: relative;
  top: 10px;

  &:-webkit-scrollbar {
    width: 5px;
      cursor: pointer;
  }

  &:-webkit-scrollbar-track {
    background-color: transparent;
  }

  &:-webkit-scrollbar-thumb {
    background: ${props => props.scrollbarColor};
    border-radius: 0.5em;
    opacity: 0.3;
  }

  &:-webkit-scrollbar-thumb:hover {
    opacity: 1;
      width: 10px;
  }

  &:-webkit-scrollbar-button {
    display: none;
  }
`

const MasonryComponent: React.FC<Props> = ({ data }) => {

  // @ts-ignore
  const { columns, width, height, bgAltColor } = useStore()

  return (
    <Wrapper 
      height={height}
      scrollbarColor={bgAltColor} 
      className='giphy__masonry'
    >
      <Masonry 
        items={data} 
        render={MasonryItem} 
        columnCount={columns}
        columnWidth={(width / columns) - 25}
        rowGutter={0}
        style={{ maxWidth: width - 25, overflow: 'hidden' }}
      />
    </Wrapper>
  )
}

export default MasonryComponent