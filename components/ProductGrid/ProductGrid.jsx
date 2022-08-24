/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react'
import { LoadingDots } from '@components'
import { Grid } from '@theme-ui/components'
import { ProductCardDemo, ProductCard } from '@components'

import {
  getCollection,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations'
import shopifyConfig from '@config/shopify'

export const ProductGrid = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
}) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const promises = productsList
        .map((entry) => entry.product)
        .filter((handle) => typeof handle === 'string')
        .map(
          async (handle) => await getProduct(shopifyConfig, { handle })
        )
      setProducts(await Promise.all(promises))
      setLoading(false)
    }
    if (productsList && !initialProducts) {
      getProducts()
    }
  }, [productsList, initialProducts])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(shopifyConfig, {
        handle: collection,
      })
      setProducts(result.products)
      setLoading(false)
    }
    if (typeof collection === 'string' && !initialProducts) {
      fetchCollection()
    }
  }, [collection])

  if (loading) {
    return <LoadingDots />
  }
  const ProductComponent = process.env.IS_DEMO
    ? ProductCardDemo
    : ProductCard

  return (
    <Grid gap={2} width={['100%', '40%', '24%']}>
      {products.slice(offset, limit).map((product, i) => (
        <ProductComponent
          key={String(product.id) + i}
          {...(highlightCard?.index === i ? highlightCard : cardProps)}
          product={product}
        />
      ))}
    </Grid>
  )
}
