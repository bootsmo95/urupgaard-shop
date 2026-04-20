export default defineEventHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')
  const client = useShopifyClient()

  if (!handle) {
    throw createError({ statusCode: 400, statusMessage: 'Missing collection handle' })
  }

  if (!client) {
    return {
      source: 'fallback',
      collection: {
        id: 'fallback-keramik',
        handle,
        title: handle,
        description: 'Midlertidig fallback collection.'
      },
      products: []
    }
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

  if (errors?.length || !data?.collection) {
    return {
      source: 'fallback',
      errors,
      collection: {
        id: 'fallback-keramik',
        handle,
        title: handle,
        description: 'Collection ikke fundet endnu i Shopify.'
      },
      products: []
    }
  }

  return {
    source: 'shopify',
    collection: {
      id: data.collection.id,
      handle: data.collection.handle,
      title: data.collection.title,
      description: data.collection.description
    },
    products: (data.collection.products.nodes ?? []).map((product: any) => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      image: product.featuredImage?.url,
      price: `${Number(product.priceRange.minVariantPrice.amount).toFixed(0)} ${product.priceRange.minVariantPrice.currencyCode}`,
      variantId: product.variants?.nodes?.[0]?.id
    }))
  }
})
