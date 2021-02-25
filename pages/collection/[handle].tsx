import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import builderConfig from '@config/builder'
import {
  getCollection,
  getAllCollectionPaths,
} from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'

builder.init(builderConfig.apiKey!)
Builder.isStatic = true
const builderModel = 'collection-page'

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ handle: string }>) {
  const collection = await getCollection(builderConfig, {
    handle: params?.handle,
  })

  const page = await resolveBuilderContent(builderModel, {
    collectionHandle: params?.handle,
    locale,
  })

  return {
    props: {
      page,
      collection,
    },
    // 4 hours in production, 1s in development
    // todo: 14400
    revalidate: 1,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getAllCollectionPaths(builderConfig)
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
  const isLive = !Builder.isEditing && !Builder.isPreviewing

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
      data={{ collection }}
      {...(isLive && page && { content: page })}
    />
  )
}

Handle.Layout = Layout
