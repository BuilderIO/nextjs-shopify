import ShopifyBuy from 'shopify-buy'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCart(potentialCart: any): potentialCart is ShopifyBuy.Cart {
  return (
    potentialCart != null &&
    potentialCart.id != null &&
    potentialCart.webUrl != null &&
    potentialCart.lineItems != null &&
    potentialCart.type != null &&
    potentialCart.type.name === 'Checkout' &&
    potentialCart.type.kind === 'OBJECT'
  )
}
