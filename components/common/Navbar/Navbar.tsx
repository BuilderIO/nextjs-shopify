import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import { getAllCollections } from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import builderConfig from '@config/builder'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [collections, setCollections] = useState([] as any[])

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const fetchCollections = async () => {
      const result = await getAllCollections(builderConfig, 3)
      setCollections(result)
    }
    fetchCollections()
  }, [])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>
      <Container>
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="hidden ml-6 space-x-4 lg:block">
              {collections.map((cl) => (
                <Link href={`/collection/${cl.handle}`}>
                  <a className={s.link}>{cl.title}</a>
                </Link>
              ))}
            </nav>
          </div>

          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>

          <div className="flex justify-end flex-1 space-x-8">
            <UserNav />
          </div>
        </div>

        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
