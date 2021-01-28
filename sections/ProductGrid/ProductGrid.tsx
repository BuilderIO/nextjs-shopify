import { FC, useEffect, useState, useMemo } from 'react'
import {
  Grid,
  GridProps,
  LoadingDots,
  Marquee,
  MarqueeProps,
} from '@components/ui'
import { ProductCard, ProductCardProps } from '@components/product'
import {
  getCollection,
  getProduct,
  searchProducts,
} from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import builderConfig from '@config/builder'
interface HighlightedCardProps extends ProductCardProps {
  index: number
}

export interface ProductGridProps {
  gridProps?: GridProps
  products?: ShopifyBuy.Product[]
  productsList: Array<{ product: string }>
  collection?: string | any // ShopifyBuy.Collection
  offset: number
  limit: number
  cardProps: ProductCardProps
  highlightCard?: HighlightedCardProps
  marquee?: boolean
  marqueeOptions?: MarqueeProps
}

export const ProductGrid: FC<ProductGridProps> = ({
  products: initialProducts,
  collection,
  productsList,
  offset = 0,
  limit = 10,
  cardProps,
  highlightCard,
  gridProps,
  marquee,
  marqueeOptions,
}) => {
  const [products, setProducts] = useState(initialProducts || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const promises = productsList
        .map((entry) => entry.product)
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

  const children = products
    .slice(offset, limit)
    .map((product, i) => (
      <ProductCard
        key={String(product.id)}
        {...(!marquee && highlightCard?.index === i
          ? highlightCard
          : cardProps)}
        product={product}
      />
    ))

  if (marquee) {
    return <Marquee {...marqueeOptions}>{children}</Marquee>
  }
  return <Grid {...gridProps}>{children}</Grid>
}
