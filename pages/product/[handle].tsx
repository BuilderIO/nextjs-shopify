import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import '../../sections/ProductView/ProductView.builder'
import builderConfig from '@config/builder'
import {
  getAllProductPaths,
  getProduct,
} from '@lib/shopify/storefront-data-hooks/src/api/operations-builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'

builder.init(builderConfig.apiKey!)
Builder.isStatic = true

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ handle: string }>) {
  const product = await getProduct(builderConfig, {
    handle: params?.handle,
  })

  if (!product) {
    throw new Error(`Product with handle '${params!.handle}' not found`)
  }

  const page = await resolveBuilderContent('product-page-template', {
    productHandle: params?.handle,
    locale,
  })

  return {
    props: {
      page,
      product,
    },
    // 4 hours in production, 1s in development
    // todo: 14400
    revalidate: 1,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getAllProductPaths(builderConfig)
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
  const isLive = !Builder.isEditing && !Builder.isPreviewing
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

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <BuilderComponent
      isStatic
      key={product.id}
      model="product-page-template"
      data={{ product }}
      {...(isLive && page && { content: page })}
    />
  )
}

Handle.Layout = Layout
