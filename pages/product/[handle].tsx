import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import '../../blocks/ProductView/ProductView.builder'
import builderConfig from '@config/builder'
import shopifyConfig from '@config/shopify'
import {
  getAllProductPaths,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { useThemeUI } from 'theme-ui'
import { getLayoutProps } from '@lib/get-layout-props'
builder.init(builderConfig.apiKey!)

const builderModel = 'product-page'

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ handle: string }>) {
  const product = await getProduct(shopifyConfig, {
    handle: params?.handle,
  })

  const page = await resolveBuilderContent(builderModel, locale, {
    productHandle: params?.handle,
  })

  return {
    notFound: !product,
    revalidate: 30,
    props: {
      page: page,
      product: product,
      ...(await getLayoutProps()),
    },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getAllProductPaths(shopifyConfig)
  return {
    paths: paths.map((path) => `/product/${path}`),
    fallback: 'blocking',
  }
}

export default function Handle({
  product,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isLive = !useIsPreviewing()
  const { theme } = useThemeUI()
  // This includes setting the noindex header because static files always return a status 200 but the rendered not found page page should obviously not be indexed
  if (!product && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return router.isFallback && isLive ? (
    <h1>Loading...</h1>
  ) : (
    <BuilderComponent
      key={product!.id}
      model={builderModel}
      options={{ enrich: true }}
      data={{ product, theme }}
      content={page}
    />
  )
}
