/** @jsxRuntime classic */
/** @jsx jsx */
import React, { FC, useState, useEffect } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'
import { useCart } from '@lib/shopify/storefront-data-hooks'
import { jsx, Box, useThemeUI, Heading, Button } from 'theme-ui'
import { useUI } from '@components/common/context'
import Image from 'next/legacy/image'
import Searchbar from './Searchbar'
import Link from '@components/common/Link'
import { Bag } from '@components/icons'

const Navbar: FC = () => {
  const [announcement, setAnnouncement] = useState()
  const { theme } = useThemeUI()
  const { navigationLinks, logo, openSidebar } = useUI()
  const cart = useCart()

  useEffect(() => {
    async function fetchContent() {
      const items = cart?.lineItems || []
      const anouncementContent = await builder
        .get('announcement-bar', {
          cacheSeconds: 120,
          userAttributes: {
            itemInCart: items.map((item: any) => item.variant.product.handle),
          } as any,
        })
        .toPromise()
      setAnnouncement(anouncementContent)
    }
    fetchContent()
  }, [cart?.lineItems])

  return (
    <React.Fragment>
      <BuilderComponent
        content={announcement}
        data={{ theme }}
        model="announcement-bar"
      />
      <Box
        as="header"
        sx={{
          margin: `0 auto`,
          maxWidth: 1920,
          py: 2,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: ['none', 'none', 'flex'],
            flexBasis: 0,
            minWidth: 240,
            justifyContent: 'space-evenly',
          }}
        >
          {navigationLinks?.map((link, index) => (
            <Link key={index} sx={{ padding: 10 }} href={link.link || '//'}>
              {link.title}
            </Link>
          ))}
        </Box>
        <Box
          sx={{
            transform: 'translateX(-50%)',
            left: '50%',
            position: 'absolute',
          }}
        >
          <Heading
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {logo && logo.image && (
              <Link
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                <Image
                  alt="Logo"
                  width={logo.width}
                  height={logo.height}
                  src={logo.image}
                ></Image>
              </Link>
            )}
            {logo && logo.text && !logo.image && (
              <Link
                href="/"
                sx={{
                  letterSpacing: -1,
                  textDecoration: `none`,
                  paddingLeft: '5px',
                }}
              >
                {logo.text}
              </Link>
            )}
          </Heading>
        </Box>
        <Box
          sx={{
            display: 'flex',
            minWidth: 140,
            width: '100%',
            justifyContent: ['space-between', 'flex-end'],
          }}
        >
          <Searchbar />
          <Button onClick={openSidebar} aria-label="Cart">
            <Bag />
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Navbar
