import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'
import Builder from '@components/icons/Builder'

interface Props {
  className?: string
  children?: any
}


const Footer: FC<Props> = ({ className }) => {
  const rootClassName = cn(className)

  return (
    <footer className={rootClassName}>
            <div className="flex items-center h-10 justify-between p-7">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-gray-700 mr-2">
                  <Logo />
                </span>
                <span>ACME</span>
              </a>
            </Link>
            <div className="flex items-center text-primary">
            <span className="text-primary">Crafted by</span>
            <a
              rel="noopener"
              href="https://builder.io"
              aria-label="Builder.io Link"
              target="_blank"
              className="text-primary"
            >
              <Builder
                className="inline-block h-6 ml-4 text-primary"
                alt="Builder.io Logo"
              />
            </a>

            <a
              rel="noopener"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              <Vercel
                className="inline-block h-6 ml-4 text-primary"
                alt="Vercel.com Logo"
              />
            </a>
          </div>

            <div className="flex space-x-6 items-center h-10">
              <a
                aria-label="Github Repository"
                href="https://github.com/BuilderIO/nextjs-shopify"
                className={s.link}
              >
                <Github />
              </a>
              <I18nWidget />
              </div>
            </div>
    </footer>
  )
}

export default Footer
