import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../components/ProductGrid/ProductGrid.builder'
import '../components/CollectionView/CollectionView.builder'
import '../components/ProductView/ProductView.builder'
import '../components/CloudinaryImage/CloudinaryImage.builder'

Builder.register('insertMenu', {
  name: 'Shopify Collections Components',
  items: [
    { name: 'CollectionBox', label: 'Collection stuff' },
    { name: 'ProductCollectionGrid' },
    { name: 'CollectionView' },
  ],
})

Builder.register('insertMenu', {
  name: 'Shopify Products Components',
  items: [
    { name: 'ProductGrid' },
    { name: 'ProductBox' },
    { name: 'ProductView' },
  ],
})

Builder.register('insertMenu', {
  name: 'Cloudinary Components',
  items: [{ name: 'CloudinaryImage' }],
})

const Noop = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }) {
  const Layout = (Component).Layout || Noop
  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
