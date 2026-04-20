export default defineEventHandler(async (event) => {
  assertMethod(event, ['GET'])
  const handle = String(getQuery(event).handle ?? '') || getRouterParam(event, 'handle')
  const client = useShopifyClient()
  const limit = Math.min(Math.max(Number(getQuery(event).limit ?? 5) || 5, 4), 6)

  if (!handle) {
    throw createError({ statusCode: 400, statusMessage: 'Missing product handle' })
  }

  if (!client) {
    return {
      source: 'fallback',
      products: []
    }
  }

  const query = `#graphql
    query RelatedProducts($handle: String!, $productsFirst: Int!) {
      product(handle: $handle) {
        id
        handle
        productType
        tags
        collections(first: 6) {
          nodes {
            handle
            title
          }
        }
      }
      products(first: $productsFirst, sortKey: BEST_SELLING) {
        nodes {
          id
          handle
          title
          description
          productType
          tags
          featuredImage {
            url
          }
          collections(first: 3) {
            nodes {
              handle
              title
            }
          }
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
  `

  const { data, errors } = await client.request(query, {
    variables: {
      handle,
      productsFirst: 60
    }
  })

  const hasErrors = Array.isArray(errors) && errors.length > 0

  if (hasErrors || !data?.product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const currentProduct = data.product
  const currentCollectionHandles = new Set((currentProduct.collections?.nodes ?? []).map((collection: any) => collection.handle))
  const currentTags = new Set((currentProduct.tags ?? []).map((tag: string) => tag.trim().toLowerCase()).filter(Boolean))
  const currentProductType = String(currentProduct.productType || '').trim().toLowerCase()

  const relatedProducts = (data.products?.nodes ?? [])
    .filter((product: any) => product.handle !== currentProduct.handle)
    .map((product: any) => {
      const productTags = (product.tags ?? []).map((tag: string) => tag.trim().toLowerCase()).filter(Boolean)
      const productCollections = product.collections?.nodes ?? []
      const sharedTags = productTags.filter((tag: string) => currentTags.has(tag)).length
      const sharedCollections = productCollections.filter((collection: any) => currentCollectionHandles.has(collection.handle)).length
      const sameProductType = currentProductType && String(product.productType || '').trim().toLowerCase() === currentProductType ? 1 : 0
      const score = (sharedTags * 4) + (sharedCollections * 3) + (sameProductType * 2)

      return {
        id: product.id,
        handle: product.handle,
        title: product.title,
        description: product.description,
        image: product.featuredImage?.url,
        price: `${Number(product.priceRange.minVariantPrice.amount).toFixed(0)} ${product.priceRange.minVariantPrice.currencyCode}`,
        variantId: product.variants?.nodes?.[0]?.id,
        collectionHandle: productCollections[0]?.handle ?? null,
        score
      }
    })
    .filter((product: any) => product.score > 0)
    .sort((a: any, b: any) => b.score - a.score || a.title.localeCompare(b.title, 'da'))
    .slice(0, limit)
    .map(({ score, ...product }: any) => product)

  return {
    source: 'shopify',
    basis: {
      tags: Array.from(currentTags),
      productType: currentProductType,
      collections: Array.from(currentCollectionHandles)
    },
    products: relatedProducts
  }
})
