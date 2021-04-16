/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { Themed, jsx } from 'theme-ui'
import { Grid } from '@theme-ui/components'
import Image from 'next/image';
import { LoadingDots } from '@components/ui'
import builderConfig from '@config/builder'
import { ProductGrid, ProductGridProps } from '../ProductGrid/ProductGrid'
import { getCollection } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'

interface Props {
  className?: string
  children?: any
  collection: string | any // ShopifyBuy.Collection once their types are up to date
  productGridOptions: ProductGridProps
  renderSeo?: boolean
}

const CollectionPreview: FC<Props> = ({
  collection: initalCollection,
  productGridOptions,
  renderSeo,
}) => {
  const [collection, setCollection] = useState(initalCollection)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true)
      const result = await getCollection(builderConfig, {
        handle: collection,
      })
      setCollection(result)
      setLoading(false)
    }
    if (typeof collection === 'string') {
      fetchCollection()
    }
  }, [collection, initalCollection])

  if (!collection || typeof collection === 'string' || loading) {
    return <LoadingDots />
  }

  const { title, description, products } = collection
  console.log('here c', collection);

  return (<React.Fragment>
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
                  {collection.image && (
              <Image
                src={collection.image.src}
                alt={collection.title}
                width={1050}
                height={400}
                priority
                quality={85}
              />
            )}

        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <Themed.h1>{collection.title}</Themed.h1>
          </span>
          <div dangerouslySetInnerHTML={{ __html: collection.description! }} />
      </div>
      <ProductGrid {...productGridOptions} products={products} />

    </React.Fragment>
  )
}

export default CollectionPreview
