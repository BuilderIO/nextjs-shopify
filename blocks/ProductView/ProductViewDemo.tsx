/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button } from '@theme-ui/components'
import Thumbnail from '@components/common/Thumbnail'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import Image from 'next/image'
import NoSSR from '@components/common/NoSSR'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product & Record<string, any>
}

const ProductView: React.FC<Props> = ({ product }) => {
  const variants = product.variants as any[]
  const images = product.images
  const variant = variants.find((v) => v.available) || variants[0]
  const price = getPrice(variant.compare_at_price || variant.price, 'USD')
  const [image, setImage] = useState(
    variant.featured_image || product.images[0]
  )

  const gallery =
    images.length > 1 ? (
      <NoSSR>
        <Grid gap={1} columns={[4, 7]}>
          {images.map(({ src }) => (
            <Thumbnail
              width={60}
              height={80}
              src={src}
              onHover={() => setImage({ src })}
            />
          ))}
        </Grid>
      </NoSSR>
    ) : null

  return (
    <React.Fragment>
      <NextSeo
        title={product.title}
        description={product.body_html}
        openGraph={{
          type: 'website',
          title: product.title,
          description: product.body_html,
          images: [
            {
              url: product.images?.[0]?.src!,
              width: 800,
              height: 600,
              alt: product.title,
            },
          ],
        }}
      />
      <Grid gap={4} columns={[1, 2]}>
        <div>
          <div
            sx={{
              border: '1px solid gray',
              padding: 2,
              marginBottom: 2,
            }}
          >
            {image && (
              <Image
                src={image.src}
                alt={product.title}
                width={1050}
                height={1050}
                priority
                quality={85}
              />
            )}
          </div>
          {gallery}
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <Themed.h1>{product.title}</Themed.h1>
            <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
              {price}
            </Themed.h4>
          </span>
          <div dangerouslySetInnerHTML={{ __html: product.body_html }} />
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

export default ProductView
