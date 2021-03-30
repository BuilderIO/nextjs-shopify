import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { UserNav } from '@components/common'
import { Button } from '@components/ui'
import { Bag, Cross } from '@components/icons'
import { useUI } from '@components/ui/context'
import { useCart, useCheckoutUrl } from '@lib/shopify/storefront-data-hooks'
import CartItem from '../CartItem'
import s from './CartSidebarView.module.css'
import { BuilderComponent, builder } from '@builder.io/react'
import env from '@config/env'

const CartSidebarView: FC = () => {
  const { closeSidebar } = useUI()
  const checkoutUrl = useCheckoutUrl()
  const cart = useCart()
  const subTotal = cart?.subtotalPrice
  const total = ' - '
  const handleClose = () => closeSidebar()

  const items = cart?.lineItems ?? []
  const isEmpty = items.length === 0
  const [cartUpsell, setCartUpsell] = useState()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const cartUpsellContent = await builder
        .get('cart-upsell-sidebar', {
          cachebust: env.isDev,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setCartUpsell(cartUpsellContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <div
      className={cn(s.root, {
        [s.empty]: isEmpty,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav className="" />
          </div>
        </div>
      </header>

      {isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accents-3 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <h2 className="pt-1 pb-4 text-2xl leading-7 font-bold text-base tracking-wide">
              My Cart
            </h2>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
              {items.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  // todo update types
                  currencyCode={item.variant?.priceV2?.currencyCode || 'USD'}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-4  py-5 sm:px-6">
            <div className="border-t border-accents-3">
              <ul className="py-3">
                <li className="flex justify-between py-1">
                  <span>Subtotal</span>
                  <span>{subTotal}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Estimated Shipping</span>
                  <span className="font-bold tracking-wide">FREE</span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
            <BuilderComponent
              content={cartUpsell}
              model="cart-upsell-sidebar"
            />
            {checkoutUrl && (
              <Button href={checkoutUrl!} Component="a" width="100%">
                Proceed to Checkout
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
