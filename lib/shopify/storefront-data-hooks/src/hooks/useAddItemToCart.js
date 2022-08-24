import { useAddItemsToCart } from './useAddItemsToCart'

export function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart()

  async function addItemToCart(
    variantId,
    quantity,
    customAttributes
  ) {
    const item = [{ variantId, quantity, customAttributes }]

    return addItemsToCart(item)
  }

  return addItemToCart
}
