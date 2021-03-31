import { FC, useState, useMemo, useEffect } from 'react'
import cn from 'classnames'
import { NextSeo } from 'next-seo'

import s from './CollectionView.module.css'
import { LoadingDots, Text } from '@components/ui'
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

  return (
    <>
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
      <div className={cn(s.root, 'fit')}>
        <div className={s.nameBox}>
          <h1 className={s.name}>{title}</h1>
          <div className="pb-14 w-full">
            <Text html={description} />
          </div>
        </div>

        <div className={s.products}>
          <ProductGrid {...productGridOptions} products={products} />
        </div>
      </div>
    </>
  )
}

export default CollectionPreview
