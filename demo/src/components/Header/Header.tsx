import React from 'react'
import './Header.scss'
import { Icon } from '../Icon'

import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons'

const Header = () => {
    return (
        <div id='header'>

            <h1>react-awesome-giphy</h1>
            
            <div id='links'>
                <h3>View on:</h3>

                <a href='https://www.github.com/givensuman/react-awesome-giphy'>
                <Icon 
                    className='icon'
                    icon={faGithub}
                />
                </a>
                <a href='https://www.npmjs.com/package/react-awesome-giphy'>
                <Icon
                    className='icon'
                    icon={faNpm}
                />
                </a>
            </div>

        </div>
    )
}

export default Header