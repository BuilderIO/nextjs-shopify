import React from 'react'

const initialState = {
  displaySidebar: false,
}


export const UIContext = React.createContext(initialState)

UIContext.displayName = 'UIContext'

export const UIProvider = ({
  siteSettings,
  children,
}) => {
  const [state, setState] = React.useState({
    ...initialState,
    ...siteSettings,
  })

  const openSidebar = () => setState(() => ({ displaySidebar: true }))
  const closeSidebar = () => setState(() => ({ displaySidebar: false }))
  const toggleSidebar = () =>
    setState((prev) => ({ displaySidebar: !prev.displaySidebar }))

  const value = {
    ...state,
    ...siteSettings,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  }

  return <UIContext.Provider value={value} children={children} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext = ({
  children,
  siteSettings,
}) => <UIProvider siteSettings={siteSettings}>{children}</UIProvider>
