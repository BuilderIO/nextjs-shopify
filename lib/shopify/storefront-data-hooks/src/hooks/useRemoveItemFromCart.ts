import { useRemoveItemsFromCart } from './useRemoveItemsFromCart'

export function useRemoveItemFromCart() {
  const removeItemsFromCart = useRemoveItemsFromCart()

  async function removeItemFromCart(variantId: number | string) {
    if (variantId === '' || variantId == null) {
      throw new Error('VariantId must not be blank or null')
    }

    return removeItemsFromCart([String(variantId)])
  }

  return removeItemFromCart
}
