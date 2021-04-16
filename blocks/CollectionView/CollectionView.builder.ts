import { Builder } from '@builder.io/react'
import { Input } from '@builder.io/sdk'
import dynamic from 'next/dynamic'
import { productGridSchema } from '../ProductGrid/ProductGrid.builder'
import builderConfig from '@config/builder'
const LazyCollectionView = dynamic(() => import(`./CollectionView`))

const collectionBoxSchema: Input[] = [
  {
    name: 'productGridOptions',
    type: 'object',
    subFields: productGridSchema,
    defaultValue: {
      cardProps: {
        variant: 'simple',
        imgPriority: true,
        imgLayout: 'responsive',
        imgLoading: 'eager',
        imgWidth: 540,
        imgHeight: 540,
        layout: 'fixed',
      },
      gridProps: {
        variant: 'default',
        layout: 'normal',
      },
    },
  },
  {
    type: 'boolean',
    name: 'renderSeo',
    advanced: true,
    helperText:
      'toggle to render seo info on page, only use for collection pages',
  },
]

Builder.registerComponent(LazyCollectionView, {
  name: 'CollectionBox',
  description: 'Dynamic collection detaills',
  inputs: collectionBoxSchema
    .concat([
      {
        name: 'collection',
        // ShopifyCollectionHandle is a custom type defined in @builder.io/plugin-shopify that let's the user pick a collection from a picker and resolves to it's handle
        type: `${
          builderConfig.isDemo ? 'ShopifyStore' : 'Shopify'
        }CollectionHandle`,
      },
    ])
    .reverse(),
})

Builder.registerComponent(LazyCollectionView, {
  name: 'CollectionView',
  description:
    'Dynamic collection detaills, autobinds to the collection in context, use only on collection pages',
  inputs: collectionBoxSchema,
  defaults: {
    bindings: {
      'component.options.collection': 'state.collection',
      'component.options.renderSeo': 'true',
    },
  },
})
