import React, { FC, useMemo } from 'react'

export interface State {
  displaySidebar: boolean
  navigationLinks?: Array<{ link: string; title: string }>
  logo?: { image?: string; text: string; width: number; height: number }
  toggleSidebar?: any
  closeSidebar?: any
  openSidebar?: any
}

const initialState = {
  displaySidebar: false,
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }

export const UIContext = React.createContext<State>(initialState)

UIContext.displayName = 'UIContext'

export const UIProvider: FC<{
  siteSettings: Partial<State>
  children: React.ReactNode
}> = ({ siteSettings, children }) => {
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

export const ManagedUIContext: FC<{
  siteSettings: Partial<State>
  children: React.ReactNode
}> = ({ children, siteSettings }) => (
  <UIProvider siteSettings={siteSettings}>{children}</UIProvider>
)
