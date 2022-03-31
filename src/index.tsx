import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import theme from './styles/theme'
import './styles/index.css'

import { StoreProvider } from './hooks/useStore'
import { 
    Row, Col, Loader, Masonry, MasonryItem, Wrapper, Input, Button, Divider, LazyLoad
} from './components'

export type Props = {
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

    useEffect(() => {
        getData('gifs', 'trending')
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search && search.length > 0) {
                getData('gifs', 'search', search)
            }
        }, 1000)
        return () => clearTimeout(timeout)
    }, [search])

    // useEffect(() => console.log(data), [data])

    useEffect(() => console.log(search), [search])

    return (
        <StoreProvider value={{
            apiKey,
            callback,

            height,
            width,
            columns,
        
            textColor,
            textAltColor,
            bgColor,
            bgAltColor,
            buttonColor,
            inputColor,
            accentColor,
            ...props
        }}>
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
                    type='text'
                    spellCheck={false}
                    placeholder={'Search GIPHY'}
                    value={search}
                    onChange={handleSearch}
                />

            </Col>


            <Divider />

            {loading ?

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
                data={data}
            />

            }

        </Wrapper>
        </StoreProvider>
    )
}

export default Giphy