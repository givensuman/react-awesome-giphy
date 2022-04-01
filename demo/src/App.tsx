import { useState } from 'react'
import Giphy from '../../src/index'

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
      columns={2}
      displayCallback={state => setActive(state)}
      openOnStickers={active == 'stickers'}
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
