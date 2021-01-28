const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = bundleAnalyzer({
  images: {
    domains: ['cdn.shopify.com', 'cdn.builder.io'],
  },
  env: {
    // expose env to the browser
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'es'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US',
  },
  rewrites() {
    return [
      // Rewrites for /search
      {
        source: '/:locale/search',
        destination: '/search',
      },
      {
        source: '/:locale/search/:path*',
        destination: '/search',
      },
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
        locale: false,
      },
    ]
  },
})
