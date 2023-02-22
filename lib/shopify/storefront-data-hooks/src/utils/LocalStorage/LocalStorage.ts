import ShopifyBuy from 'shopify-buy'
import { LocalStorageKeys } from './keys'
import { isCart } from '../../utils'

function set(key: string, value: string) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      console.warn(' Error reading from local storage')
    }
  }
}

function get(key: string) {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    return null
  }

  try {
    const item = window.localStorage.getItem(key)
    return item
  } catch {
    return null
  }
}

function getInitialCart(): ShopifyBuy.Cart | null {
  const existingCartString = get(LocalStorageKeys.CART)
  if (existingCartString == null) {
    return null
  }

  try {
    const existingCart = JSON.parse(existingCartString)
    if (!isCart(existingCart)) {
      return null
    }

    return existingCart as ShopifyBuy.Cart
  } catch {
    return null
  }
}

export const LocalStorage = {
  get,
  set,
  getInitialCart,
}
