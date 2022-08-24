import { LocalStorageKeys } from './keys'
import { isCart } from '..'

function set(key, value) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      console.warn(' Error reading from local storage');
    }
  }
}

function get(key) {
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

function getInitialCart() {
  const existingCartString = get(LocalStorageKeys.CART)
  if (existingCartString == null) {
    return null
  }

  try {
    const existingCart = JSON.parse(existingCartString)
    if (!isCart(existingCart)) {
      return null
    }

    return existingCart
  } catch {
    return null
  }
}

export const LocalStorage = {
  get,
  set,
  getInitialCart,
}
