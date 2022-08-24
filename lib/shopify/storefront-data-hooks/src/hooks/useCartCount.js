import { useContext } from 'react'
import { Context } from '../Context'

export function useCartCount() {
  const { cart } = useContext(Context)
  if (cart == null || cart.lineItems.length < 1) {
    return 0
  }

  const count = cart.lineItems.reduce((totalCount, lineItem) => {
    return totalCount + lineItem.quantity
  }, 0)

  return count
}
