import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../blocks/ProductGrid/ProductGrid.builder'
import '../blocks/CollectionView/CollectionView.builder'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
