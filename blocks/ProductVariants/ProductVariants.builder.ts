import { restrictedRegister } from 'blocks/utils'
import ProductVariants from './ProductVariants'

restrictedRegister(
  ProductVariants,
  {
    name: 'ProductVariantsBox',
    inputs: [
      {
        name: 'product',
        type: `ShopifyProductHandle`,
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Override product title from shopify',
      },
      {
        name: 'subtitle',
        type: 'text',
        helperText: 'Additional subtitle',
      },
      {
        name: 'description',
        richText: true,
        type: 'html',
        helperText: 'Override product description from shopify',
      },
    ],
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
  },
  ['page', 'collection-page', 'theme']
)
