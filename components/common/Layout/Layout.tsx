import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, LoadingDots } from '@components/ui'
import { CartSidebarView } from '@components/cart'
import { CommerceProvider } from '@lib/shopify/storefront-data-hooks'
import shopifyConfig from '@config/shopify'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  loading: () => <Loading />,
})

const Layout: FC = ({ children }) => {
  const { displaySidebar, closeSidebar } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  return (
    <CommerceProvider {...shopifyConfig}>
      <div className={cn(s.root)}>
        <Navbar />
        <main className="fit max-w-8xl mx-auto">{children}</main>
        <Footer />

        <Sidebar open={displaySidebar} onClose={closeSidebar}>
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
