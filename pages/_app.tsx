import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { ManagedUIContext } from '@components/ui/context'
import { Head } from '@components/common'
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../sections/ProductGrid/ProductGrid.builder'
import '../sections/CollectionView/CollectionView.builder'
import '../sections/Hero/Hero.builder'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  return (
    <>
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
