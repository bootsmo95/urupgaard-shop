export default defineEventHandler(async () => {
  const client = useShopifyClient()

  if (!client) {
    return {
      source: 'fallback',
      collections: [
        { id: 'fallback-keramik', handle: 'keramik', title: 'Keramik', description: 'Håndlavet keramik fra gårdbutikken.' }
      ]
    }
  }

  const query = `#graphql
    query Collections {
      collections(first: 12) {
        nodes {
          id
          handle
          title
          description
        }
      }
    }
  `

  const { data, errors } = await client.request(query)

  if (errors?.length) {
    return {
      source: 'fallback',
      errors,
      collections: [
        { id: 'fallback-keramik', handle: 'keramik', title: 'Keramik', description: 'Håndlavet keramik fra gårdbutikken.' }
      ]
    }
  }

  return {
    source: 'shopify',
    collections: data?.collections?.nodes ?? []
  }
})
