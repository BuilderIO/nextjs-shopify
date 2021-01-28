import { useContext } from 'react'
import { Context } from '../Context'
import ShopifyBuy from 'shopify-buy'
import { LineItemPatch } from '../types'

export function useAddItemsToCart() {
  const { client, cart, setCart } = useContext(Context)

  async function addItemsToCart(items: LineItemPatch[]) {
    if (cart == null || client == null) {
      throw new Error('Called addItemsToCart too soon')
    }

    if (items.length < 1) {
      throw new Error(
        'Must include at least one line item, empty line items found'
      )
    }

    items.forEach((item) => {
      if (item.variantId == null) {
        throw new Error(`Missing variantId in item`)
      }

      if (item.quantity == null) {
        throw new Error(
          `Missing quantity in item with variant id: ${item.variantId}`
        )
      } else if (typeof item.quantity != 'number') {
        throw new Error(
          `Quantity is not a number in item with variant id: ${item.variantId}`
        )
      } else if (item.quantity < 1) {
        throw new Error(
          `Quantity must not be less than one in item with variant id: ${item.variantId}`
        )
      }
    })

    const newCart = await client.checkout.addLineItems(
      cart.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      items as ShopifyBuy.LineItem[]
    )
    setCart(newCart)
  }

  return addItemsToCart
}
