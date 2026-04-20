import type { ProductCard } from '~/types/shop'

interface SearchProduct extends ProductCard {
  tags?: string[]
  collectionHandle?: string
  collectionTitle?: string
}

const fallbackProducts: SearchProduct[] = [
  {
    id: 'sample-1',
    handle: 'rustik-kop-sand',
    title: 'Rustik kop, sand',
    description: 'Hånddrejet kop med blød glasur og varm, naturlig tone.',
    price: '249 DKK',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-rustik-kop-sand',
    tags: ['kop', 'sand', 'hverdagsfavorit'],
    collectionHandle: 'keramik',
    collectionTitle: 'Keramik'
  },
  {
    id: 'sample-2',
    handle: 'middagstallerken-ler',
    title: 'Middagstallerken, ler',
    description: 'Stor tallerken med rolig overflade og tydeligt håndværk.',
    price: '399 DKK',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-middagstallerken-ler',
    tags: ['tallerken', 'ler', 'servering'],
    collectionHandle: 'keramik',
    collectionTitle: 'Keramik'
  },
  {
    id: 'sample-3',
    handle: 'serveringsfad-gra',
    title: 'Serveringsfad, grå',
    description: 'Et fad til hverdagsbordet og de særlige anledninger.',
    price: '649 DKK',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-serveringsfad-gra',
    tags: ['fad', 'grå', 'middagsbord'],
    collectionHandle: 'keramik',
    collectionTitle: 'Keramik'
  }
]

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function matchesSearch(products: SearchProduct[], search: string, tags: string[]) {
  return products.filter((product) => {
    const haystack = [product.title, product.description, ...(product.tags ?? [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    const matchesQuery = !search || haystack.includes(search)
    const matchesTags = !tags.length || tags.every((tag) => (product.tags ?? []).map(normalize).includes(tag))

    return matchesQuery && matchesTags
  })
}

function getAvailableTags(products: SearchProduct[]) {
  return [...new Set(products.flatMap((product) => product.tags ?? []).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'da'))
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = typeof query.q === 'string' ? normalize(query.q) : ''
  const tags = typeof query.tags === 'string'
    ? query.tags.split(',').map(normalize).filter(Boolean)
    : []

  const client = useShopifyClient()

  if (!client) {
    return {
      source: 'fallback',
      products: matchesSearch(fallbackProducts, search, tags),
      availableTags: getAvailableTags(fallbackProducts)
    }
  }

  const productQueryParts = [
    search ? `title:*${search}*` : '',
    ...tags.map((tag) => `tag:${JSON.stringify(tag)}`)
  ].filter(Boolean)

  const productQuery = `#graphql
    query SearchProducts($search: String) {
      products(first: 48, sortKey: TITLE, query: $search) {
        nodes {
          id
          handle
          title
          description
          tags
          featuredImage {
            url
          }
          collections(first: 1) {
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

  const tagQuery = `#graphql
    query ProductTags {
      products(first: 100, sortKey: TITLE) {
        nodes {
          tags
        }
      }
    }
  `

  const [{ data: productData, errors }, { data: tagData, errors: tagErrors }] = await Promise.all([
    client.request(productQuery, {
      variables: {
        search: productQueryParts.length ? productQueryParts.join(' AND ') : null
      }
    }),
    client.request(tagQuery)
  ])

  if (errors?.length || tagErrors?.length) {
    return {
      source: 'fallback',
      errors: [...(errors ?? []), ...(tagErrors ?? [])],
      products: matchesSearch(fallbackProducts, search, tags),
      availableTags: getAvailableTags(fallbackProducts)
    }
  }

  const products: SearchProduct[] = (productData?.products?.nodes ?? []).map((product: any) => ({
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    price: `${Number(product.priceRange.minVariantPrice.amount).toFixed(0)} ${product.priceRange.minVariantPrice.currencyCode}`,
    variantId: product.variants?.nodes?.[0]?.id,
    tags: (product.tags ?? []).map((tag: string) => tag.trim()).filter(Boolean),
    collectionHandle: product.collections?.nodes?.[0]?.handle,
    collectionTitle: product.collections?.nodes?.[0]?.title
  }))

  const availableTags = getAvailableTags(
    (tagData?.products?.nodes ?? []).map((product: any, index: number) => ({
      id: String(index),
      handle: '',
      title: '',
      price: '',
      tags: product.tags
    }))
  )

  return {
    source: 'shopify',
    products,
    availableTags
  }
})
