import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import theme from './styles/theme'
import './styles/index.css'

import { Row, Col, Loader, Masonry } from './components'

interface Props {
    apiKey: string,
    callback?: (item: any) => void,

    limit?: number,
    offset?: number,
    rating?: 'g' | 'pg' | 'pg-13' | 'r',
    randomId?: string,
    bundle?: string,

    height?: number,
    width?: number,
    columns?: number,

    textColor?: string,
    textAltColor?: string,
    bgColor?: string,
    bgAltColor?: string,
    buttonColor?: string,
    inputColor?: string,
    accentColor?: string
}

const Giphy = ({
    apiKey,
    callback = item => console.log('react-awesome-giphy:', item),

    height = 425,
    width = 425,
    columns = 2,

    textColor = theme.textColor,
    textAltColor = theme.textAltColor,
    bgColor = theme.bgColor,
    bgAltColor = theme.bgAltColor,
    buttonColor = theme.buttonColor,
    inputColor = theme.inputColor,
    accentColor = theme.accentColor,

    ...props
}: Props) => {

    const Wrapper = styled.div`
        background-color: ${bgColor};
        color: ${textColor};
        
        max-width: ${height}px;
        min-height: ${width}px;
        padding-bottom: 0.25em;
        border-radius: 0.25em;
        position: relative;
    `

    const Divider = styled.div`
        background-color: ${bgAltColor};
        height: 0.125em;
        width: 100%;
    `

    const Input = styled.input`
        background-color: ${inputColor};
        color: ${textAltColor};

        width: 90%;
        margin: 0 auto 0.5em;
        border-radius: 0.25em;
        outline: none;
        border: none;
        padding: 0.25em;
        font-size: 0.95rem;
    `

    interface ButtonProps {
        active: boolean
    }
    const Button = styled.button<ButtonProps>`
        color: ${textColor};
        background-color: ${props =>
            props.active ? buttonColor : 'transparent'
        };

        
        border: none; outline: none;
        padding: 0.5em;
        border-radius: 0.25em;
        margin: 0.5em;
        cursor: pointer;
        transition: background-color 0.25s;

        &:hover {
            background-color: ${buttonColor};
        }
    `

    const Item = styled.img`
        margin: 0.25em;
        border-radius: 0.25em;
        cursor: pointer;
        max-width: calc(${100/columns}% - ${columns * 0.25}em);
        box-sizing: border-box;

        &:hover {
            border: 0.125em solid ${accentColor};
        }
    `

    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState([])
    const [ display, setDisplay ] = useState<'gifs' | 'stickers'>('gifs')

    const [ search, setSearch ] = useState('')
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const getData = async (
        type: 'gifs' | 'stickers',
        endpoint: string,
        query?: string
    ) => {
        const { 
            limit, offset, rating, randomId, bundle 
        } = props

        setLoading(true)
        await fetch(
            `https://api.giphy.com/v1/${type}/${endpoint}?` +
            `api_key=${apiKey}` +
            [
                query && `&q=${query}`,
                limit && `&limit=${limit}`,
                offset && `&offset=${offset}`,
                rating && `&rating=${rating}`,
                randomId && `&random_id=${randomId}`,
                bundle && `&bundle=${bundle}`
            ].join('')
            , {
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setData(data.data))
        setLoading(false)
    }

    // useEffect(() => {
    //     getData('gifs', 'trending')
    // }, [])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         search.length > 0 && getData(display, 'search', search)
    //     }, 1000)
    //     return () => clearTimeout(timeout)
    // }, [search])

    // useEffect(() => console.log(data), [data])

    useEffect(() => console.log(search), [search])

    return (
        <Wrapper>

            <Col>

                <Row centerx>
                    <Button
                        active={display == 'gifs'}
                        onClick={() => {
                            setDisplay('gifs')
                        }}
                    >
                        GIFs
                    </Button>
                    <Button
                        active={display == 'stickers'}
                        onClick={() => {
                            setDisplay('stickers')
                        }}
                    >
                        Stickers
                    </Button>
                </Row> 

                <Input
                    key='Gif Search Input'
                    type='text'
                    spellCheck={false}
                    placeholder={'Search GIPHY'}
                    value={search}
                    onChange={handleSearch}
                />

            </Col>


            <Divider />

            {/* {loading ?

            <Loader 
                color={accentColor}
                css={`
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: ${bgColor};
                    margin: auto;
                `}
            />
            
            :
            
            <Masonry 
                sizes={data && data.map(() => {
                    return ({ mq: '0', columns: columns | 2, gutter: 0 })
                })}
                css={`
                    padding-right: 0.5em;
                    margin: 0.5em auto;
                    max-height: calc(${height}px - 0.5em);
                    width: 100%;
                    overflow-y: scroll;
                    overflow-x: hidden;
                `}
            >
                {data && data.map((item: {
                    id: string,
                    url: string,
                    title: string,
                    images: {
                        downsized: {
                            url: string,
                            height: string
                        }
                    }
                }) =>
                    <Item
                        className='giphy__masonry-item'
                        src={item.images.downsized.url}
                        alt={item.title}
                        // @ts-ignore
                        onClick={handleSearch}
                    />
                )}
            </Masonry>

            } */}

        </Wrapper>
    )
}

export default Giphy