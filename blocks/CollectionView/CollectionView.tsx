/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { jsx } from 'theme-ui'
import { Box, Heading } from '@theme-ui/components'
import shopifyConfig from '@config/shopify'
import { ProductGrid, ProductGridProps } from '../ProductGrid/ProductGrid'
import { getCollection } from '@lib/shopify/storefront-data-hooks/src/api/operations'

interface Props {
  className?: string
  children?: any
  collection: string | any // ShopifyBuy.Collection once their types are up to date
  productGridOptions: ProductGridProps
  renderSeo?: boolean
}

const CollectionPreview: FC<Props> = ({
  collection: initialCollection,
  productGridOptions,
  renderSeo,
}) => {
  const [collection, setCollection] = useState(initialCollection)
  const [loading, setLoading] = useState(false)

  useEffect(() => setCollection(initialCollection), [initialCollection])

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(shopifyConfig, {
        handle: collection,
      })
      setCollection(result)
      setLoading(false)
    }
    if (typeof collection === 'string') {
      fetchCollection()
    }
  }, [collection])

  if (!collection || typeof collection === 'string' || loading) {
    return <Box>Loading...</Box>
  }

  const { title, description, products } = collection

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }} key={collection.id}>
      {renderSeo && (
        <NextSeo
          title={collection.title}
          description={collection.description}
          openGraph={{
            type: 'website',
            title,
            description,
          }}
        />
      )}
      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <span sx={{ mt: 0, mb: 2 }}>
          <Heading>{collection.title}</Heading>
        </span>
        <div dangerouslySetInnerHTML={{ __html: collection.description! }} />
      </div>
      <Box sx={{ p: 5 }}>
        <ProductGrid {...productGridOptions} products={products} />
      </Box>
    </Box>
  )
}

export default CollectionPreview
