import React from 'react'

export const Context = React.createContext({
  client: null,
  cart: null,
  domain: '',
  storefrontAccessToken: '',
  setCart: () => {
    throw Error('You forgot to wrap this in a Provider object')
  },
})
