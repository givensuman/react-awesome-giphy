import React from 'react'
import './Icon.scss'

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface IconProps extends FontAwesomeIconProps {
}

const Icon = ({ icon, ...props }: IconProps) => {
    return (
        <FontAwesomeIcon
            className='icon'
            icon={icon}
            {...props}
        />
    )
}

export default Icon