// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCart(potentialCart) {
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
