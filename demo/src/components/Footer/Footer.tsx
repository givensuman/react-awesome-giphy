import React from 'react'
import './Footer.scss'

import { faNoteSticky, faClapperboard, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { Icon } from '../Icon'

interface Props {
    active: 'gifs' | 'stickers' | null,
    setActive: (x: any) => void
}

const Footer = ({ active, setActive }: Props) => {

    return (
        <div id='footer'>

        <div id='chatbox'>
            <input
                type='text'
            />
            <Icon
                className='icon'
                 icon={faPaperPlane}
            />
        </div>

        <div id='buttons'>
            <Icon
                className={`icon ${active == 'gifs' && 'active'}`}
                icon={faClapperboard}
                onClick={() => setActive(active == 'gifs' ? null : 'gifs')}
            />
            <Icon
                className={`icon ${active == 'stickers' && 'active'}`}
                icon={faNoteSticky}
                onClick={() => setActive(active == 'stickers' ? null : 'stickers')}
            />
        </div>

        </div>
    )
}

export default Footer