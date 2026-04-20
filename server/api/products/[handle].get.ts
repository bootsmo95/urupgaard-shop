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
        featuredImage {
          url
          altText
        }
        images(first: 50) {
          nodes {
            url
            altText
          }
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
  const images = [data.product.featuredImage, ...(data.product.images?.nodes ?? [])]
    .filter((image: any) => image?.url)
    .filter((image: any, index: number, all: any[]) => all.findIndex((entry) => entry.url === image.url) === index)
    .map((image: any) => ({
      url: image.url,
      alt: image.altText ?? data.product.title
    }))

  return {
    source: 'shopify',
    product: {
      id: data.product.id,
      handle: data.product.handle,
      title: data.product.title,
      description: data.product.description,
      image: images[0]?.url,
      images,
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
