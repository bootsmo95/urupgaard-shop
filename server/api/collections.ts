import { useShopifyClient } from '../utils/shopify'

export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET'])

  const client = useShopifyClient()
  if (!client) {
    throw createError({ statusCode: 503, statusMessage: 'Shopify client not available' })
  }

  const query = /* GraphQL */ `
    query CollectionsList($first: Int!) {
      collections(first: $first, sortKey: UPDATED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            productsCount
            image {
              url
              altText
            }
          }
        }
      }
    }
  `

  const data = await client.request(query, { first: 6 })

  const collections = (data?.collections?.edges ?? []).map((e: any) => {
    const c = e.node
    return {
      id: c.id,
      handle: c.handle,
      title: c.title,
      productsCount: c.productsCount,
      image: c.image?.url ?? null,
      imageAlt: c.image?.altText ?? c.title
    }
  })

  return { collections }
})
