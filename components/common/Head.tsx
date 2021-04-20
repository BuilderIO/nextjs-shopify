import { FC } from 'react'
import NextHead from 'next/head'
import { DefaultSeo } from 'next-seo'

const Head: FC<{ seoInfo: any }> = (props) => {
  return (
    <>
      <DefaultSeo {...props.seoInfo} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
    </>
  )
}

export default Head
