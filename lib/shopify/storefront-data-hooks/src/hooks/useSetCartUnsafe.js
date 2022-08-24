import { useContext } from 'react'
import { Context } from '../Context'

export function useSetCartUnsafe() {
  const { setCart } = useContext(Context)
  return setCart
}
