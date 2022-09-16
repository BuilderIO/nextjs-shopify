
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import ProductLoader from './ProductLoader'
import cn from 'classnames'
import {
  prepareVariantsWithOptions,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import { LoadingDots } from '@components/ui'
import styles from './ProductVariants.module.css'

interface Props {
  className?: string
  children?: any
  product: ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
  subtitle?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  subtitle,
  renderSeo = true,
  description = product?.description,
  title = product?.title,
}) => {
  console.warn({ product })

  const isLoaded = !!product?.variants
  const [loading, setLoading] = useState(false)
  const [currentVarianIndex, setCurrentVariantIndex] = useState(0)

  const variants = useMemo(
    () => !!product?.variants ? prepareVariantsWithOptions(product?.variants) : [],
    [product?.variants]
  )

  const price = isLoaded ? `$${parseInt(variants[currentVarianIndex].priceV2.amount, 10)} ${variants[currentVarianIndex].priceV2.currencyCode}` : null

  const addItem = useAddItemToCart()
  const { openSidebar } = useUI()

  const addToCart = async () => {
    if (loading) {
      return
    }

    setLoading(true)
    try {
      await addItem(variants[currentVarianIndex].id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={styles["lander-export-wrapper"]}>
      <div className={styles["lander-export"]}>
        <div className={styles["lander-export-title"]}>
          <div className={styles["desktop"]} style={{marginBottom: '50px'}}>
            <h1 style={{textAlign: 'center', lineHeight: '52px', margin: '0px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '36px'}}>{title}</span>
            </h1>
            <h2 style={{textAlign: 'center', lineHeight: '16px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '16px'}}>{subtitle}</span>
            </h2>
          </div>
          <div className={styles["tablet"]} style={{marginBottom: '50px'}}>
            <h1 style={{textAlign: 'center', lineHeight: '36px', margin: '0px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '26px'}}>{title}</span>
            </h1>
            <h2 style={{textAlign: 'center', lineHeight: '16px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '12px'}}>{subtitle}</span>
            </h2>
          </div>
          <div className={styles["mobile"]} style={{marginBottom: '30px'}}>
            <h1 style={{textAlign: 'center', lineHeight: '44px', margin: '0px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '28px', letterSpacing: 'normal'}}>{title}</span>
            </h1>
            <h2 style={{textAlign: 'center', lineHeight: '16px'}}>
              <span style={{fontFamily: 'Helvetica, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: 'normal'}}>{subtitle}</span>
            </h2>
          </div>
        </div>
        <div className={styles["lander-export-info"]}>
          <div className={styles["product-thumbnails"]}>
            <div className={styles["product-thumbnail"]}>
            {isLoaded ? variants.map((variant, variantIndex) => (
              <img
                key={variant?.image?.src}
                alt={variant?.image?.altText}
                className={cn(styles["shogun-image"], {
                  [styles.selected]: variantIndex === currentVarianIndex
                })}
                style={{
                  display: variantIndex === currentVarianIndex ? 'block' : 'none'
                }}
                src={variant?.image?.src}
              />
            )) : null}
            </div>
            <div className={styles["product-review"]}>
              <p>40,000</p>
              <img data-src="https://i.shgcdn.com/3532b372-6aa2-46f4-b176-55b591d423e7/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloaded"]} src="https://i.shgcdn.com/3532b372-6aa2-46f4-b176-55b591d423e7/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
              <p>Reviews</p>
            </div>
          </div>
          <div className={styles["product-info"]}>
            <div className={styles["product-price"]}>
              <div className={styles["desktop"]} style={{marginBottom: '30px'}}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>PRICE</span>
                </h1>
                <h2 style={{lineHeight: '32px'}}>
                  <span style={{fontFamily: 'HelveticaNeueMedium', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 'normal'}}>{price}</span>
                </h2>
              </div>
              <div className={styles["tablet"]} style={{marginBottom: '30px'}}>
                <h1 style={{lineHeight: '16px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '12px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>PRICE</span>
                </h1>
                <h2 style={{lineHeight: '16px'}}>
                  <span style={{fontFamily: 'HelveticaNeueMedium', fontSize: '12px', fontWeight: 'normal', color: '#232323', letterSpacing: 'normal'}}>{price}</span>
                </h2>
              </div>
              <div className={styles["mobile"]} style={{marginBottom: '30px'}}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>PRICE</span>
                </h1>
                <h2 style={{lineHeight: '32px'}}>
                  <span style={{fontFamily: 'HelveticaNeueMedium', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 'normal'}}>{price}</span>
                </h2>
              </div>
            </div>
            <div className={styles["color-swatch"]}>
              <div className={styles["desktop"]}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>COLOR/STYLE</span>
                </h1>
              </div>
              <div className={styles["tablet"]}>
                <h1 style={{lineHeight: '18px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '12px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>COLOR/STYLE</span>
                </h1>
              </div>
              <div className={styles["mobile"]}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 'normal', color: '#232323', letterSpacing: 2 }}>COLOR/STYLE</span>
                </h1>
              </div>
              <div className={styles["color-swatch-items"]}>
                {isLoaded ? variants.map((variant, variantIndex) => (
                  <div
                    key={variant?.image?.src}
                    className={cn(styles["color-swatch-item"], {
                      [styles.selected]: variantIndex === currentVarianIndex
                    })}
                  >
                    <img
                      alt={variant?.image?.altText}
                      className={styles["shogun-image"]}
                      src={variant?.image?.src}
                      onClick={() => setCurrentVariantIndex(variantIndex)}
                    />
                  </div>
                )) : null}
              </div>
            </div>
            <div className={styles["product-description"]}>
              <div className={styles["desktop"]} style={{marginTop: '30px', marginBottom: '20px'}}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{color: '#232323'}}><span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 800, letterSpacing: 2 }}>INCLUDES</span></span>
                </h1>
                <div className={styles["description"]} dangerouslySetInnerHTML={{ __html: description! }} />
              </div>
              <div className={styles["tablet"]} style={{marginTop: '30px', marginBottom: '10px'}}>
                <h1 style={{lineHeight: '18px'}}>
                  <span style={{color: '#232323', fontSize: '12px'}}><span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontWeight: 800, letterSpacing: 2 }}>INCLUDES</span></span>
                </h1>
                <div className={styles["description"]} dangerouslySetInnerHTML={{ __html: description! }} />
              </div>
              <div className={styles["mobile"]} style={{marginTop: '30px', marginBottom: '10px'}}>
                <h1 style={{lineHeight: '24px'}}>
                  <span style={{color: '#232323'}}><span style={{fontFamily: 'HelveticaNeue-CondensedBlack', fontSize: '16px', fontWeight: 800, letterSpacing: 2 }}>INCLUDES</span></span>
                </h1>
                <div className={styles["description"]} dangerouslySetInnerHTML={{ __html: description! }} />
              </div>
            </div>
            <button type="button" onClick={addToCart} disabled={loading} className={cn({ [styles["loading"]]: loading })}>
              <div className={styles["desktop"]} style={{width: '270px', height: '65px', fontSize: '16px', fontFamily: 'HelveticaNeue-CondensedBlack'}}>
                {loading ? <LoadingDots /> : 'ADD TO CART'}
              </div>
              <div className={styles["tablet"]} style={{width: '200px', height: '50px', fontSize: '14px', fontFamily: 'HelveticaNeue-CondensedBlack'}}>
                {loading ? <LoadingDots /> : 'ADD TO CART'}
              </div>
              <div className={styles["mobile"]} style={{width: '100%', height: '60px', fontSize: '16px', fontFamily: 'HelveticaNeue-CondensedBlack'}}>
                {loading ? <LoadingDots /> : 'ADD TO CART'}
              </div>
            </button>
            <div className={styles["extra-info-items"]}>
              <div className={styles["extra-info-item"]}>
                <div className={styles["desktop"]}>
                  <img data-src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloading shogun-lazyloaded"]} src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '12px', color: '#232323'}}>Free Shipping</span>
                  </p>
                </div>
                <div className={styles["tablet"]}>
                  <img data-src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloaded"]} src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '10px', color: '#232323'}}>Free Shipping</span>
                  </p>
                </div>
                <div className={styles["mobile"]}>
                  <img data-src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloading shogun-lazyloaded"]} src="https://i.shgcdn.com/bcc35888-44bd-4e67-b6bd-ad90f8efa37e/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '12px', color: '#232323'}}>Free Shipping</span>
                  </p>
                </div>
              </div>
              <div className={styles["extra-info-item"]}>
                <div className={styles["desktop"]}>
                  <img data-src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloading shogun-lazyloaded"]} src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '12px', color: '#232323'}}>45 Day Returns</span>
                  </p>
                </div>
                <div className={styles["tablet"]}>
                  <img data-src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloaded"]} src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '10px', color: '#232323'}}>45 Day Returns</span>
                  </p>
                </div>
                <div className={styles["mobile"]}>
                  <img data-src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" className={styles["shogun-image shogun-lazyloading shogun-lazyloaded"]} src="https://i.shgcdn.com/d545285a-f64f-4dec-8c7e-c446488dd052/-/format/auto/-/preview/3000x3000/-/quality/lighter/" />
                  <p style={{lineHeight: '12px'}}>
                    <span style={{fontFamily: '"HelveticaNeue Regular"', fontSize: '12px', color: '#232323'}}>45 Day Returns</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductVariants: React.FC<{
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
export default ProductVariants
