// AddCartBtn.tsx
import { prepareVariantsWithOptions } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import React, { useMemo, useState } from 'react'
import { LoadingDots } from '../../components/ui'
import { useUI } from '../../components/ui/context'
import { useAddItemToCart } from '../../lib/shopify/storefront-data-hooks'
import AddCartProductLoader from './AddCartProductLoader'

interface AddToCartBoxProps {
  btn_name: string
  product: ShopifyBuy.Product
}

const AddToCartBox: React.FC<AddToCartBoxProps> = ({ btn_name, product }) => {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const { openSidebar } = useUI()

  const variants = useMemo(
    () =>
      !!product?.variants ? prepareVariantsWithOptions(product?.variants) : [],
    [product?.variants]
  )

  const addToCart = async () => {
    if (loading) {
      return
    }
    setLoading(true)

    try {
      await addItem(variants[currentVariantIndex].id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <button onClick={addToCart} disabled={loading} className="addToCartBtn">
      {loading ? <LoadingDots /> : btn_name}
    </button>
  )
}

const AddToCart: React.FC<AddToCartBoxProps> = ({ product, ...props }) => {
  return (
    <>
      <AddCartProductLoader product={product}>
        {(productObject) => <AddToCartBox {...props} product={productObject} />}
      </AddCartProductLoader>
    </>
  )
}

export default AddToCart
