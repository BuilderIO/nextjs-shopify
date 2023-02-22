/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { getProduct } from '@lib/shopify/storefront-data-hooks/src/api/operations'
import shopifyConfig from '@config/shopify'

interface Props {
  className?: string
  children: (product: any) => React.ReactElement
  product: string | ShopifyBuy.Product
}

const ProductLoader: React.FC<Props> = ({
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
    return <div>Loading...</div>
  }
  return children(product)
}

export default ProductLoader
