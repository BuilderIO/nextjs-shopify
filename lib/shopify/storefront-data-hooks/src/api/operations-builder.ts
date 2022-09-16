import * as qs from 'qs'

export interface BuillderConfig {
  apiKey: string
  productsModel: string
  collectionsModel: string
  isDemo?: boolean
}

export interface CollectionProductsQuery {
  handle: string
  limit?: number
  cursor?: string
  apiKey: string
}

export async function getAllProducts(
  config: BuillderConfig,
  limit = 100,
  offset = 0
) {
  const productsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${config.productsModel}?apiKey=${config.apiKey}&limit=${limit}&offset=${offset}&cachebust=true`
    ).then((res) => res.json())
  ).results

  return productsContent.map((pr: any) => pr.data)
}

export async function searchProducts(
  config: BuillderConfig,
  searchString: string,
  limit = 100,
  offset = 0
) {
  const query = qs.stringify(
    {
      fields: ['data'],
      limit,
      offset,
      apiKey: config.apiKey,
    },
    { allowDots: true }
  )

  const productsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${
        config.productsModel
      }?${query}&query.data.title=${JSON.stringify({
        $regex: `${searchString}`,
        $options: 'i',
      })}`
    ).then((res) => res.json())
  ).results
  return productsContent?.map((product: any) => product.data) || []
}

export async function getAllProductPaths(
  config: BuillderConfig,
  limit?: number
): Promise<string[]> {
  const products: any[] = await getAllProducts(config, limit)
  return products?.map((entry) => entry.handle) || []
}

export async function getProduct(
  config: BuillderConfig,
  options: { id?: string; handle?: string; withContent?: boolean }
) {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error('Either a handle or id is required')
  }
  const query = qs.stringify({
    limit: 1,
    apiKey: config.apiKey,
    query: {
      data: options.id
        ? {
            id: { $eq: options.id },
          }
        : {
            handle: { $eq: options.handle },
          },
    },
  })

  const productsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${config.productsModel}?${query}`
    ).then((res) => res.json())
  ).results

  if (options.withContent) {
    return productsContent[0]
  }
  return productsContent[0]?.data
}

/**
 * Collections
 */

export async function getAllCollections(
  config: BuillderConfig,
  limit = 20,
  offset = 0,
  fields?: string
) {
  const query = qs.stringify(
    {
      fields: fields || 'data',
      limit,
      offset,
      apiKey: config.apiKey,
      cachebust: true,
    },
    { allowDots: true }
  )

  const collectionsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${config.collectionsModel}?${query}`
    ).then((res) => res.json())
  ).results

  return collectionsContent?.map((entry: any) => entry.data) || []
}

export async function searchCollections(
  config: BuillderConfig,
  searchString: string,
  limit = 100,
  offset = 0
) {
  const query = qs.stringify(
    {
      fields: ['data'],
      limit,
      offset,
      apiKey: config.apiKey,
    },
    { allowDots: true }
  )

  const collectionsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${
        config.collectionsModel
      }?${query}&query.$or=${JSON.stringify([
        {
          'data.description': { $regex: `${searchString}` },
        },
        {
          'data.title': { $regex: `${searchString}` },
        },
      ])}`
    ).then((res) => res.json())
  ).results
  return collectionsContent?.map((entry: any) => entry.data) || []
}

export async function getAllCollectionPaths(
  config: BuillderConfig,
  limit?: number
): Promise<string[]> {
  const collections: any[] = await getAllCollections(config, limit)
  return collections?.map((entry) => entry.handle) || []
}

export async function getCollection(
  config: BuillderConfig,
  options: {
    id?: string
    handle?: string
    productsQuery?: Omit<CollectionProductsQuery, 'handle'>
  }
) {
  if (Boolean(options.id) === Boolean(options.handle)) {
    throw new Error('Either a handle or id is required')
  }
  const query = qs.stringify({
    limit: 1,
    apiKey: config.apiKey,
    cachebust: process.env.NODE_ENV !== 'production',
    query: {
      data: options.id
        ? {
            id: { $eq: options.id },
          }
        : {
            handle: { $eq: options.handle },
          },
    },
  })

  const collectionsContent = (
    await fetch(
      `https://cdn.builder.io/api/v2/content/${config.collectionsModel}?${query}`
    ).then((res) => res.json())
  ).results

  const collection = collectionsContent[0]?.data
  if (config.isDemo) {
    return collection
  }
  const productsQuery = {
    limit: 20,
    handle: collection?.handle,
    ...options.productsQuery,
    apiKey: config.apiKey,
  }
  const { products, nextPageCursor, hasNextPage } = await getCollectionProducts(
    productsQuery
  )

  return {
    ...collection,
    products,
    nextPageCursor,
    hasNextPage,
  }
}

export const getCollectionProducts = (
  productsQuery: CollectionProductsQuery
): Promise<{
  nextPageCursor: string
  products: any[]
  hasNextPage: boolean
}> => {
  const search = qs.stringify(productsQuery)
  return fetch(
    `https://cdn.builder.io/api/v1/shopify-sync/collection-products?${search}`
  ).then((res) => res.json())
}
