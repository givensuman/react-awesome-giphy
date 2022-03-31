import React, { createContext, useContext } from 'react'

import { Props } from '../index'

const StoreContext = createContext<Props | null>(null)

const useStore = () => useContext(StoreContext)

interface StoreProps {
    children: React.ReactNode,
    value: any
}

const StoreProvider = ({ children, value }: StoreProps) => {
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}

export { StoreProvider, useStore as default }