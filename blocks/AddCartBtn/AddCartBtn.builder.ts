import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const AddToCart = dynamic(async () => {
  return (await import('./AddCartBtn')).default
})

Builder.registerComponent(AddToCart, {
  name: 'Add To Cart Button',
  inputs: [
    {
      name: 'product',
      type: `ShopifyProductHandle`,
      helperText: 'The product should have only ONE variant!',
    },
    {
      name: 'btn_name',
      type: `string`,
      defaultValue: 'Add To Cart',
    },
  ],
})
