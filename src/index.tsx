import React, { useEffect, useState, useRef } from 'react'

import theme from './styles/theme'

import { StoreProvider } from './hooks/useStore'
import { 
    Row, Col, Loader, Masonry, Wrapper, Input, Button, Divider
} from './components'

export type Props = {
    apiKey: string,
    callback?: (item: any) => void,

    displayCallback?: (state: 'gifs' | 'stickers') => void,
    display?: 'gifs' | 'stickers',
    // updateDisplay?: (state: 'gifs' | 'stickers') => void,

    limit?: number,
    offset?: number,
    rating?: 'g' | 'pg' | 'pg-13' | 'r',
    randomId?: string,
    bundle?: string,

    height?: number,
    width?: number,
    css?: string,
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
    display = 'gifs',

    limit = 12,

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
    const [ currentDisplay, setCurrentDisplay ] = useState<'gifs' | 'stickers'>(display)

    const search = useRef<string>("")
    const isTyping = useRef<boolean>(false)
    const timeout = useRef<any>()

    const handleSearch = (input: string) => {
        search.current = input
        
        const runSearch = async () => {
            if (input.length > 0) {
                await getData(currentDisplay, 'search', input)
            } else {
                await getData(currentDisplay, 'trending')
            }
            isTyping.current = false
        }

        if (isTyping.current) { 
            clearTimeout(timeout.current)
            timeout.current = setTimeout(runSearch, 500)
        }
        else {
            setLoading(true)
            isTyping.current = true 
            timeout.current = setTimeout(runSearch, 500)
        } 
    }

    const getData = async (
        type: 'gifs' | 'stickers',
        endpoint: string,
        query?: string
    ) => {
        const { 
            offset, rating, randomId, bundle 
        } = props

        setLoading(true)
        await fetch(
            `https://api.giphy.com/v1/${type}/${endpoint}?` +
            `api_key=${apiKey}` +
            `&limit=${limit}` +
            [
                query && `&q=${query}`,
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
        if (props.displayCallback) {
            props.displayCallback(currentDisplay)
        } 
    }, [currentDisplay])

    useEffect(() => {
        setCurrentDisplay(display)
    }, [display])

    useEffect(() => {
        if (!loading) {
            setLoading(true)
        }
        if (search.current.length == 0) {
            setTimeout(() => getData(currentDisplay, 'trending'), 500)
        } else {
            setTimeout(() => getData(currentDisplay, 'search', search.current), 500)
        }
    }, [currentDisplay])

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
                        active={currentDisplay == 'gifs'}
                        onClick={() => {
                            setCurrentDisplay('gifs')
                        }}
                    >
                        GIFs
                    </Button>
                    <Button
                        active={currentDisplay == 'stickers'}
                        onClick={() => {
                            setCurrentDisplay('stickers')
                        }}
                    >
                        Stickers
                    </Button>
                </Row> 

                <Input
                    type='text'
                    spellCheck={false}
                    placeholder={'Search GIPHY'}
                    callback={handleSearch}
                />

            </Col>


            <Divider />

            {loading ?

            <Loader 
                color={accentColor}
                css={`
                    position: absolute;
                    top: 30%;
                    width: 100%;
                    align-self: center;
                    margin: 0 auto;
                    background-color: ${bgColor};
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