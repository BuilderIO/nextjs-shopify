import { Builder, builder } from '@builder.io/react'
import dynamic from 'next/dynamic'

const LazyProductView = dynamic(
  () => import(`blocks/ProductView/ProductView`),
  { ssr: true }
)

Builder.registerComponent(LazyProductView, {
  name: 'ProductView',
  description:
    'Dynamic product details, included in SSR, should only be used in product pages',
  defaults: {
    bindings: {
      'component.options.product': 'state.product',
      'component.options.title': 'state.product.title',
      'component.options.description': 'state.product.descriptionHtml',
    },
  },
})
