import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import React, { FC } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, LoadingDots } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { CommerceProvider } from '@lib/shopify/storefront-data-hooks'
import shopifyConfig from '@config/shopify'
import { builder } from '@builder.io/react'

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ssr: false,
})

const Layout: FC = ({ children }) => {
  const { displaySidebar, closeSidebar } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  return (
    <CommerceProvider {...shopifyConfig}>
      <div className={cn(s.root)}>
        <Navbar />
        <main className="fit">{children}</main>
        <Footer />

        <Sidebar
          open={
            displaySidebar || builder.editingModel === 'cart-upsell-sidebar'
          }
          onClose={closeSidebar}
        >
          <CartSidebarView />
        </Sidebar>

        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
      </div>
    </CommerceProvider>
  )
}

export default Layout
