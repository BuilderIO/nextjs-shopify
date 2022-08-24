import { useContext } from 'react'
import { Context } from '../Context'

export function useClientUnsafe() {
  const { client } = useContext(Context)
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'Using client directly will hit shopify API and counts towards your storefront rate limit'
    )
  }
  return client
}
