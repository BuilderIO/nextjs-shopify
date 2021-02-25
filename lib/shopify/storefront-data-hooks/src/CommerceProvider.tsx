import React, { useState, useEffect } from 'react'
import ShopifyBuy from 'shopify-buy'
import { Context } from './Context'
import { LocalStorage, LocalStorageKeys } from './utils'

export interface CommerceProviderProps extends ShopifyBuy.Config {
  children: React.ReactNode
}

export function CommerceProvider({
  storefrontAccessToken,
  domain,
  children,
}: CommerceProviderProps) {
  if (domain == null || storefrontAccessToken == null) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.'
    )
  }

  const initialCart = LocalStorage.getInitialCart()
  const [cart, setCart] = useState<ShopifyBuy.Cart | null>(initialCart)

  const isCustomDomain = domain.includes('.')

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken,
    domain: isCustomDomain ? domain : `${domain}.myshopify.com`,
  })

  useEffect(() => {
    async function getNewCart() {
      const newCart = await client.checkout.create()
      setCart(newCart)
    }

    async function refreshExistingCart(cartId: string) {
      try {
        const refreshedCart = await client.checkout.fetch(cartId)

        if (refreshedCart == null) {
          return getNewCart()
        }

        const cartHasBeenPurchased = Boolean(refreshedCart.completedAt)

        if (cartHasBeenPurchased) {
          getNewCart()
        } else {
          setCart(refreshedCart)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (cart == null) {
      getNewCart()
    } else {
      refreshExistingCart(String(cart.id))
    }
  }, [])

  useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart))
  }, [cart])

  return (
    <Context.Provider
      value={{
        client,
        cart,
        setCart,
        domain,
        storefrontAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}
