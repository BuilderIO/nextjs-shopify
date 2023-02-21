/** @jsxRuntime classic */
/** @jsx jsx */
import { Heading, jsx } from 'theme-ui'
import Image from 'next/legacy/image'
import { Card, Text } from '@theme-ui/components'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useState } from 'react'
import NoSSR from './NoSSR'
import Link from '@components/common/Link'

export interface ProductCardProps {
  className?: string
  product: ShopifyBuy.Product
  imgWidth: number
  imgHeight: number
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCardDemo: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [showAlternate, setShowAlternate] = useState(false)
  const [canToggle, setCanToggle] = useState(false)
  const src = product.images[0].src
  const handle = (product as any).handle
  const productVariant: any = product.variants[0]
  const price = getPrice(
    productVariant.compare_at_price || productVariant.price,
    'USD'
  )
  const alternateImage = product.images[1]?.src

  return (
    <Card
      sx={{
        maxWidth: [700, 500],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOut={() => setShowAlternate(false)}
      onMouseOver={() => setShowAlternate(true)}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          {alternateImage && (
            <div
              sx={{ display: showAlternate && canToggle ? 'block' : 'none' }}
            >
              <NoSSR>
                <Image
                  quality="85"
                  src={alternateImage}
                  alt={product.title}
                  width={Number(imgWidth || 540)}
                  sizes={imgSizes}
                  height={Number(imgHeight || 540)}
                  onLoad={() => setCanToggle(true)}
                  loading="eager"
                />
              </NoSSR>
            </div>
          )}
          <div
            sx={{
              display:
                canToggle && showAlternate && alternateImage ? 'none' : 'block',
            }}
          >
            <Image
              quality="85"
              src={src}
              alt={product.title}
              width={imgWidth || 540}
              sizes={imgSizes}
              height={imgHeight || 540}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
            />
          </div>
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Heading as="h2" sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.title}
          </Heading>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCardDemo
