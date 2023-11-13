/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { ThemeProvider, jsx } from 'theme-ui'
import dynamic from 'next/dynamic'
import { Button } from 'theme-ui'
import { ManagedUIContext, useUI } from '@components/common/context'
import Head from '@components/common/Head'
import Navbar from '@components/common/Navbar'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import Sidebar from '@components/common/Sidebar'
import { CartSidebarView } from '@components/cart'
import { CommerceProvider } from '@lib/shopify/storefront-data-hooks'
import shopifyConfig from '@config/shopify'
import { builder, BuilderContent, Builder } from '@builder.io/react'
import themesMap from '@config/theme'
import seoConfig from '@config/seo.json'
import NoSSR from './NoSSR'

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ssr: false,
})

const Layout: React.FC<{ pageProps: any; children: React.ReactNode }> = ({
  children,
  pageProps,
}) => {
  const builderTheme = pageProps.theme
  return (
    <CommerceProvider {...shopifyConfig}>
      <BuilderContent content={builderTheme} modelName="theme">
        {(data, loading) => {
          if (loading && !builderTheme) {
            return 'loading ...'
          }
          const siteSettings = data?.siteSettings
          const colorOverrides = data?.colorOverrides
          const siteSeoInfo = data?.siteInformation
          return (
            <ManagedUIContext key={data?.id} siteSettings={siteSettings}>
              <Head seoInfo={siteSeoInfo || seoConfig} />
              <InnerLayout
                themeName={data?.theme || 'base'}
                colorOverrides={colorOverrides}
              >
                {children}
              </InnerLayout>
            </ManagedUIContext>
          )
        }}
      </BuilderContent>
    </CommerceProvider>
  )
}

const InnerLayout: React.FC<{
  themeName: string
  children: React.ReactNode
  colorOverrides?: {
    text?: string
    background?: string
    primary?: string
    secondary?: string
    muted?: string
  }
}> = ({ themeName, children, colorOverrides }) => {
  const theme = {
    ...themesMap[themeName],
    colors: {
      ...themesMap[themeName].colors,
      ...colorOverrides,
    },
  }
  const { displaySidebar, closeSidebar } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div
        sx={{
          margin: `0 auto`,
          px: 20,
          maxWidth: 1920,
          minWidth: '60vw',
          minHeight: 800,
        }}
      >
        <main>{children}</main>
      </div>

      <Sidebar
        open={
          displaySidebar ||
          (builder.editingModel || Builder.previewingModel) ===
            'cart-upsell-sidebar'
        }
        onClose={closeSidebar}
      >
        <CartSidebarView />
      </Sidebar>
      <NoSSR>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={Builder.isEditing ? true : acceptedCookies}
          action={
            <Button onClick={() => onAcceptCookies()}>Accept cookies</Button>
          }
        />
      </NoSSR>
    </ThemeProvider>
  )
}

export default Layout
