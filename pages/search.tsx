import cn from 'classnames'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { Container, Grid, LoadingDots, Skeleton } from '@components/ui'
import builderConfig from '@config/builder'
import rangeMap from '@lib/range-map'
import { ProductCard } from '@components/product'
import { searchProducts } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import NoSSR from '@components/common/NoSSR/NoSSR'

const castIfNumber = (num: any) => {
  const res = Number(num)
  if (!isNaN(res)) {
    return res
  }
}

export async function getServerSideProps({
  preview,
  locale,
}: GetServerSidePropsContext) {
  // Maybe ssr search results?
  return {
    props: { products: [] as ShopifyBuy.Product[] },
  }
}

export default function Search({
  products: initialProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { q, limit, offset } = router.query
  const [products, setProducts] = useState(initialProducts || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true)
      const results = await searchProducts(
        builderConfig,
        String(q),
        castIfNumber(limit),
        castIfNumber(offset)
      )
      setProducts(results)
      setLoading(false)
    }
    if (q && !initialProducts.length) {
      getProducts()
    }
  }, [q, limit, offset, initialProducts])

  const skeleton = (
    <Grid layout="normal">
      {rangeMap(12, (i) => (
        <Skeleton key={i} className="w-full animated fadeIn" height={325} />
      ))}
    </Grid>
  )

  return (
    <Container>
      <div className="mt-3 mb-20">
        <NoSSR skeleton={skeleton}>
          {products.length ? (
            <Grid layout="normal">
              {products.map((product: ShopifyBuy.Product) => (
                <ProductCard
                  variant="simple"
                  key={product.id}
                  className="animated fadeIn"
                  product={product}
                  imgWidth={480}
                  imgHeight={480}
                />
              ))}
            </Grid>
          ) : loading ? (
            skeleton
          ) : (
            <span
              className={cn('animated', {
                fadeIn: !loading && !products.length,
                hidden: products.length > 0,
              })}
            >
              {q ? (
                <>
                  There are no products that match "<strong>{q}</strong>"
                </>
              ) : (
                <>Search for something ...</>
              )}
            </span>
          )}
        </NoSSR>
      </div>
    </Container>
  )
}

Search.Layout = Layout
