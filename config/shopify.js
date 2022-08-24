if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing required environment variable SHOPIFY_STORE_DOMAIN')
}
if (!process.env.SHOPIFY_STOREFRONT_API_TOKEN) {
  throw new Error(
    'Missing required environment variable SHOPIFY_STOREFRONT_API_TOKEN'
  )
}

export default {
  domain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
}
