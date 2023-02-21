/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, jsx, Grid, Input, Text, IconButton } from 'theme-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/legacy/image'
import { Plus, Minus } from '@components/icons'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import {
  useUpdateItemQuantity,
  useRemoveItemFromCart,
} from '@lib/shopify/storefront-data-hooks'
import Link from '@components/common/Link'
const CartItem = ({
  item,
  currencyCode,
}: {
  item: /*ShopifyBuy.LineItem todo: check if updated types*/ any
  currencyCode: string
}) => {
  const updateItem = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (quantity: number) => {
    await updateItem(item.variant.id, quantity)
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item.variant.id)
    } catch (error) {
      console.error(error)
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <Grid gap={2} sx={{ width: '100%', m: 12 }} columns={[2]}>
      <div
        sx={{
          padding: 1,
          border: '1px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          height={130}
          width={130}
          alt={item.variant.image.altText || 'Product Image'}
          src={item.variant.image.src}
        />
      </div>
      <div>
        <Link
          href={`/product/${item.variant.product.handle}/`}
          sx={{ fontSize: 3, m: 0, fontWeight: 700 }}
        >
          <>
            {item.title}
            <Text
              sx={{
                fontSize: 4,
                fontWeight: 700,
                display: 'block',
                marginLeft: 'auto',
              }}
            >
              {getPrice(
                item.variant.priceV2.amount,
                item.variant.priceV2.currencyCode || 'USD'
              )}
            </Text>
          </>
        </Link>
        <ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: 'none' }}>
          <li>
            <div sx={{ display: 'flex', justifyItems: 'center' }}>
              <IconButton onClick={() => increaseQuantity(-1)}>
                <Minus width={18} height={18} />
              </IconButton>

              <label>
                <Input
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                  type="number"
                  max={99}
                  min={0}
                  value={quantity}
                  onChange={handleQuantity}
                  onBlur={handleBlur}
                />
              </label>
              <IconButton onClick={() => increaseQuantity(1)}>
                <Plus width={18} height={18} />
              </IconButton>
            </div>
          </li>
          {item.variant.selectedOptions.map((option: any) => (
            <li key={option.value}>
              {option.name}:{option.value}
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  )
}

/**
 *         

 */

export default CartItem
