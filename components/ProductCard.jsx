/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import { Card, Text } from '@theme-ui/components'
import { Link, ImageCarousel } from '@components'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'

const ProductCard = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = (product).handle
  const productVariant = product.variants[0]
  const price = getPrice(
    productVariant.priceV2.amount,
    productVariant.priceV2.currencyCode
  )

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={product.images ? product.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.title}
            images={
              product.images.length ? product.images : [{
                src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
              }]
            }
          />
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.title}
          </Themed.h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
