import { createStorefrontApiClient } from '@shopify/storefront-api-client'

export function useShopifyClient() {
  const config = useRuntimeConfig()

  if (!config.shopifyStoreDomain || !config.shopifyStorefrontToken) {
    return null
  }

  return createStorefrontApiClient({
    storeDomain: config.shopifyStoreDomain,
    publicAccessToken: config.shopifyStorefrontToken,
    apiVersion: '2025-10'
  })
}
