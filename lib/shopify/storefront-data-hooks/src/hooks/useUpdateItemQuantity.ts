import { useContext } from 'react'
import { Context } from '../Context'

import { useGetLineItem } from './useGetLineItem'

export function useUpdateItemQuantity() {
  const { client, cart, setCart } = useContext(Context)
  const getLineItem = useGetLineItem()

  async function updateItemQuantity(
    variantId: string | number,
    quantity: number
  ) {
    if (variantId == null) {
      throw new Error('Must provide a variant id')
    }

    if (quantity == null || Number(quantity) < 0) {
      throw new Error('Quantity must be greater than 0')
    }

    const lineItem = getLineItem(variantId)
    if (lineItem == null) {
      throw new Error(`Item with variantId ${variantId} not in cart`)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const newCart = await client.checkout.updateLineItems(cart.id, [
      { id: lineItem.id, quantity },
    ])
    setCart(newCart)
  }

  return updateItemQuantity
}
