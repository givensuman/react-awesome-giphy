import { useState } from 'react'
import Giphy from '../../src/'

import { Header, Footer } from './components'

function App() {

  const [ active, setActive ] = useState<'gifs' | 'stickers' | null>('gifs')

  return (
    <>

    <Header />

    <div style={{
      minHeight: '425px',
      minWidth: '425px'
    }}>
    {active && 
    <Giphy
      // @ts-ignore
      apiKey={import.meta.env.VITE_API_KEY}
      displayCallback={(state: 'gifs' | 'stickers') => setActive(state)}
      display={active}
      css={`
        box-shadow: -5px 5px 5px grey;
      `}
    />
    }
  </div>

    <Footer active={active} setActive={setActive} />

    </>
  )
}

export default App
