export default defineEventHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')
  const client = useShopifyClient()

  if (!handle) {
    throw createError({ statusCode: 400, statusMessage: 'Missing collection handle' })
  }

  if (!client) {
    return { error: 'No Shopify client', client: null }
  }

  const query = `#graphql
    query Collection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        products(first: 24) {
          nodes {
            id
            handle
            title
            description
            featuredImage { url }
            variants(first: 1) {
              nodes {
                id
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { handle }
  })

  return {
    handle,
    query,
    errors,
    rawData: data
  }
})
