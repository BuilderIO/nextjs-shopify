import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'

export interface ProductCardProps {
  className?: string
  product: ShopifyBuy.Product
  variant?: 'slim' | 'simple'
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: FC<ProductCardProps> = ({
  className,
  product: p,
  variant,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const src = p.images[0].src
  const productVariant: any = p.variants[0]
  const price = getPrice(
    productVariant.priceV2.amount,
    productVariant.priceV2.currencyCode
  )

  return (
    <Link href={`/product/${(p as any).handle}`}>
      <a
        className={cn(s.root, { [s.simple]: variant === 'simple' }, className)}
      >
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.title}
              </span>
            </div>
            <Image
              quality="85"
              width={imgWidth}
              sizes={imgSizes}
              height={imgHeight}
              layout={imgLayout}
              loading={imgLoading}
              priority={imgPriority}
              src={p.images?.[0]?.src!}
              alt={p.title}
            />
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{p.title}</span>
                </h3>
                <span className={s.productPrice}>{price}</span>
              </div>
            </div>
            <div className={s.imageContainer}>
              <Image
                quality="85"
                src={src}
                alt={p.title}
                className={s.productImage}
                width={imgWidth}
                sizes={imgSizes}
                height={imgHeight}
                layout={imgLayout}
                loading={imgLoading}
                priority={imgPriority}
              />
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
