/** @jsxRuntime classic */
/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { getProduct } from '@lib/shopify/storefront-data-hooks/src/api/operations'
import shopifyConfig from '@config/shopify'
import { LoadingDots } from '@components'

const ProductLoader = ({
  product: initialProduct,
  children,
}) => {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(false)

  useEffect(() => setProduct(initialProduct), [initialProduct])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const result = await getProduct(shopifyConfig, {
        handle: String(product),
      })
      setProduct(result)
      setLoading(false)
    }
    if (typeof product === 'string') {
      fetchProduct()
    }
  }, [product])

  if (!product || typeof product === 'string' || loading) {
    return <LoadingDots />
  }
  return children(product)
}

export default ProductLoader
