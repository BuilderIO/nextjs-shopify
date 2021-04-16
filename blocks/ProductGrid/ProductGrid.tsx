/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { FC, useEffect, useState } from 'react'
import { LoadingDots } from '@components/ui'
import { Grid } from '@theme-ui/components'
import { ProductCard, ProductCardProps } from '@components/common/product-card'
import { ProductCardDemo } from '@components/common/ProductCardDemo'

import {
  getCollection,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import builderConfig from '@config/builder'
interface HighlightedCardProps extends ProductCardProps {
  index: number
}

export interface ProductGridProps {
  products?: ShopifyBuy.Product[]
  productsList: Array<{ product: string }>
  collection?: string | any // ShopifyBuy.Collection
  offset: number
  limit: number
  cardProps: ProductCardProps
  highlightCard?: HighlightedCardProps
}

export const ProductGrid: FC<ProductGridProps> = ({
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
        .filter((handle: string | undefined) => typeof handle === 'string')
        .map(
          async (handle: string) => await getProduct(builderConfig, { handle })
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
      const result = await getCollection(builderConfig, {
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
  const ProductComponent: any = process.env.IS_DEMO
    ? ProductCardDemo
    : ProductCard

  return (
    <Grid
      sx={{
        maxWidth: [500, 1200, 1920],
        margin: '0 auto',
      }}
      gap={2}
      columns={[1, 2, 3]}
    >
      {products.slice(offset, limit).map((product, i) => (
        <ProductComponent
          key={String(product.id)}
          {...(highlightCard?.index === i ? highlightCard : cardProps)}
          product={product}
        />
      ))}
    </Grid>
  )
}
