import { buildClient } from 'shopify-buy'

const fastClone = (obj: any) => JSON.parse(JSON.stringify(obj))

export function getAllProducts(config: ShopifyBuy.Config, limit?: number) {
  const client = buildClient(config)
  return client.product.fetchAll(limit)
}

export async function getAllProductPaths(
  config: ShopifyBuy.Config,
  limit?: number
): Promise<string[]> {
  const client = buildClient(config)
  // interface need update
  const products: any[] = await client.product.fetchAll(limit)
  return products.map((val) => val.handle)
}

export async function getProduct(
  config: ShopifyBuy.Config,
  options: { id?: string; handle?: string }
) {
  const client = buildClient(config)
  if (options.handle) {
    return fastClone(await client.product.fetchByHandle(options.handle))
  }
  if (!options.id) {
    throw new Error('A product ID or handle is required')
  }
  return fastClone(await client.product.fetch(options.id))
}

export function getAllCollections(config: ShopifyBuy.Config, limit?: number) {
  const client = buildClient(config)
  return client.collection.fetchAll(limit)
}

export async function getAllCollectionPaths(
  config: ShopifyBuy.Config,
  limit?: number
): Promise<string[]> {
  const client = buildClient(config)
  // interface need update
  const collections: any[] = await client.collection.fetchAll(limit)
  return collections.map((val) => val.handle)
}

export async function getCollection(
  config: ShopifyBuy.Config,
  options: { id?: string; handle?: string }
) {
  const client = buildClient(config)
  if (options.handle) {
    return fastClone(await client.collection.fetchByHandle(options.handle))
  }
  if (!options.id) {
    throw new Error('A collection ID or handle is required')
  }
  return fastClone(await client.collection.fetch(options.id))
}

export async function searchProducts(
  config: ShopifyBuy.Config,
  searchString: string
) {
  const client = buildClient(config)
  return client.product.fetchQuery({
    query: searchString ? `title:*${searchString}*` : '',
    sortBy: 'title',
  })
}
