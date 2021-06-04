/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import ProductLoader from './ProductLoader'
import { ImageCarousel } from '@components/ui'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product & Record<string, any>
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo = true,
  description = product.body_html,
  title = product.title,
}) => {
  const variants = product.variants as any[]
  const images = product.images
  const variant = variants.find((v) => v.available) || variants[0]
  const price = getPrice(variant.compare_at_price || variant.price, 'USD')
  const [image, setImage] = useState(
    variant.featured_image || product.images[0]
  )

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.src!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <Grid gap={4} columns={[1, 2]}>
        <div
          sx={{
            border: '1px solid gray',
            padding: 2,
            marginBottom: 2,
          }}
        >
          <ImageCarousel
            showZoom
            alt={title}
            width={1050}
            height={1050}
            priority
            images={images}
          ></ImageCarousel>
        </div>

        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <Themed.h1>{title}</Themed.h1>
            <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
              {price}
            </Themed.h4>
          </span>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <div>
            <Grid padding={2} columns={2}>
              {product.options.map((opt: any) => {
                return (
                  <OptionPicker
                    key={opt.name}
                    name={opt.name}
                    options={opt.values}
                  />
                )
              })}
            </Grid>
          </div>
          <Button
            disabled
            name="add-to-cart"
            sx={{ margin: 2, display: 'block' }}
          >
            Add to Cart
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  )
}
const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
