import { builder } from '@builder.io/react'
import { getAsyncProps } from '@builder.io/utils'
import builderConfig from '@config/builder'
import shopifyConfig from '@config/shopify'
import {
  getCollection,
  getProduct,
} from './shopify/storefront-data-hooks/src/api/operations'
builder.init(builderConfig.apiKey)

export async function resolveBuilderContent(
  modelName,
  targetingAttributes,
) {
  let page = await builder
    .get(modelName, {
      userAttributes: targetingAttributes,
      includeRefs: true,
      cachebust: true,
    })
    .toPromise()

  if (page) {
    return await getAsyncProps(page, {
      async ProductGrid(props) {
        let products = []
        if (props.productsList) {
          const promises = props.productsList
            .map((entry) => entry.product)
            .filter((handle) => typeof handle === 'string')
            .map(
              async (handle) =>
                await getProduct(shopifyConfig, { handle })
            )
          products = await Promise.all(promises)
        }
        return {
          // resolve the query as `products` for ssr
          // used for example in ProductGrid.tsx as initialProducts
          products,
        }
      },
      async CollectionBox(props) {
        let collection = props.collection
        if (collection && typeof collection === 'string') {
          collection = await getCollection(shopifyConfig, {
            handle: collection,
          })
        }
        return {
          collection,
        }
      },
      async ProductBox(props) {
        let product = props.product
        if (product && typeof product === 'string') {
          product = await getProduct(shopifyConfig, {
            handle: product,
          })
        }
        return {
          product,
        }
      },

      async ProductCollectionGrid({ collection }) {
        if (collection && typeof collection === 'string') {
          const { products } = await getCollection(shopifyConfig, {
            handle: collection,
          })
          return {
            products,
          }
        }
      },
    })
  }
  return null
}
