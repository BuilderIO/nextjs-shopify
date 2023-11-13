import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react'
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

builder.init(builderConfig.apiKey!)
const builderModel = 'collection-page'

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ handle: string }>) {
  const collection = await getCollection(shopifyConfig, {
    handle: params?.handle,
  })

  const page = await resolveBuilderContent(builderModel, locale, {
    collectionHandle: params?.handle,
  })

  return {
    notFound: !collection,
    revalidate: 30,
    props: {
      page: page,
      collection: collection,
      ...(await getLayoutProps()),
    },
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getAllCollectionPaths(shopifyConfig)
  return {
    paths: paths.map((path) => `/collection/${path}`),
    fallback: 'blocking',
  }
}

export default function Handle({
  collection,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const isPreviewing = useIsPreviewing()
  const isLive = !isPreviewing
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
    <h1>Loading...</h1>
  ) : (
    <BuilderComponent
      key={collection.id}
      options={{ enrich: true }}
      model={builderModel}
      data={{ collection, theme }}
      content={page}
    />
  )
}
