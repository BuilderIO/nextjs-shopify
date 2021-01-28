import { useContext } from 'react'
import { Context } from '../Context'

export function useCart() {
  const { cart } = useContext(Context)
  return cart
}
