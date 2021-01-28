import { useContext } from 'react'
import { Context } from '../Context'

export function useCartItems() {
  const { cart } = useContext(Context)
  if (cart == null || cart.lineItems == null) {
    return []
  }

  return cart.lineItems
}
