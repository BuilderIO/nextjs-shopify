import { buildClient } from 'shopify-buy'

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

export function getProduct(
  config: ShopifyBuy.Config,
  options: { id?: string; handle?: string }
) {
  const client = buildClient(config)
  if (options.handle) {
    return client.product.fetchByHandle(options.handle)
  }
  if (!options.id) {
    throw new Error('A product ID or handle is required')
  }
  return client.product.fetch(options.id)
}
