export default defineEventHandler(async (event) => {
  const handle = getRouterParam(event, 'handle')
  const client = useShopifyClient()

  if (!handle) {
    throw createError({ statusCode: 400, statusMessage: 'Missing product handle' })
  }

  if (!client) {
    throw createError({ statusCode: 503, statusMessage: 'Shopify client not available' })
  }

  const query = `#graphql
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        featuredImage { url }
        images(first: 10) {
          nodes { url }
        }
        variants(first: 25) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { handle }
  })

  if (errors?.length || !data?.product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const firstVariant = data.product.variants?.nodes?.[0]

  return {
    source: 'shopify',
    product: {
      id: data.product.id,
      handle: data.product.handle,
      title: data.product.title,
      description: data.product.description,
      image: data.product.featuredImage?.url,
      images: data.product.images?.nodes?.map((image: any) => image.url) ?? [],
      price: firstVariant ? `${Number(firstVariant.price.amount).toFixed(0)} ${firstVariant.price.currencyCode}` : '0 DKK',
      variantId: firstVariant?.id,
      variants: (data.product.variants?.nodes ?? []).map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        price: `${Number(variant.price.amount).toFixed(0)} ${variant.price.currencyCode}`
      }))
    }
  }
})
