import { useRouter } from 'next/router'
import { Layout } from '@components'
import { BuilderComponent, useIsPreviewing, builder } from '@builder.io/react'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import builderConfig from '@config/builder'
import shopifyConfig from '@config/shopify'
import {
  getCollection,
  getAllCollectionPaths,
} from '@lib/shopify/storefront-data-hooks/src/api/operations'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { useThemeUI } from '@theme-ui/core'
import { getLayoutProps } from '@lib/get-layout-props'

builder.init(builderConfig.apiKey)
const builderModel = 'collection-page'

export async function getStaticProps({
  params,
  locale,
}) {
  const collection = await getCollection(shopifyConfig, {
    handle: params?.handle,
  })

  const page = await resolveBuilderContent(builderModel, {
    collectionHandle: params?.handle,
    locale,
  })

  return {
    notFound: !page,
    props: {
      page: page || null,
      collection: collection || null,
      ...(await getLayoutProps()),
    },
  }
}

export async function getStaticPaths({ locales }) {
  const paths = await getAllCollectionPaths(shopifyConfig)
  return {
    paths: paths.map((path) => `/collection/${path}`),
    fallback: 'blocking',
  }
}

export default function Handle({
  collection,
  page,
}) {
  const router = useRouter()
  const isLive = !useIsPreviewing()
  const { theme } = useThemeUI()
  if (!collection && isLive) {
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
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <BuilderComponent
      isStatic
      key={collection.id}
      model={builderModel}
      data={{ collection, theme }}
      {...(page && { content: page })}
    />
  )
}

Handle.Layout = Layout
