import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'
import { Input } from '@builder.io/sdk'
const LazyProductGrid = dynamic(async () => {
  return (await import('./ProductGrid')).ProductGrid
})
const isDemo = Boolean(process.env.IS_DEMO)

const productCardFields: Input[] = [
  {
    name: 'imgWidth',
    type: 'number',
    defaultValue: 540,
  },
  {
    name: 'imgHeight',
    type: 'number',
    defaultValue: 540,
  },
  {
    name: 'imgPriority',
    type: 'boolean',
    advanced: true,
    defaultValue: true,
  },
  {
    name: 'imgLoading',
    type: 'enum',
    advanced: true,
    defaultValue: 'lazy',
    enum: ['eager', 'lazy'],
  },
  {
    name: 'imgLayout',
    type: 'enum',
    enum: ['fixed', 'intrinsic', 'responsive', 'fill'],
    advanced: true,
    defaultValue: 'fill',
  },
]

export const productGridSchema: Input[] = [
  {
    name: 'cardProps',
    defaultValue: {
      imgPriority: true,
      imgLayout: 'responsive',
      imgLoading: 'eager',
      imgWidth: 540,
      imgHeight: 540,
      layout: 'fixed',
    },
    type: 'object',
    subFields: productCardFields,
  },
  {
    name: 'offset',
    type: 'number',
    defaultValue: 0,
  },
  {
    name: 'limit',
    type: 'number',
    defaultValue: 9,
  },
]

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductGrid',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/play-list-add.svg',
  description: 'Pick products free form',
  inputs: [
    {
      name: 'productsList',
      type: 'list',
      subFields: [
        {
          name: 'product',
          type: `${isDemo ? 'ShopifyStore' : 'Shopify'}ProductHandle`,
        },
      ],
    },
  ].concat(productGridSchema as any),
})

Builder.registerComponent(LazyProductGrid, {
  name: 'ProductCollectionGrid',
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/display-grid.svg',
  description: 'Choose a collection to show its products in a grid',
  inputs: [
    {
      name: 'collection',
      type: `${isDemo ? 'ShopifyStore' : 'Shopify'}CollectionHandle`,
    },
  ].concat(productGridSchema),
})
