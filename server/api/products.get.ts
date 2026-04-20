import type { ProductCard } from '~/types/shop'

const sampleProducts: ProductCard[] = [
  {
    id: 'sample-1',
    handle: 'rustik-kop-sand',
    title: 'Rustik kop, sand',
    description: 'Hånddrejet kop med blød glasur og varm, naturlig tone.',
    price: '249 DKK',
    image: 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-rustik-kop-sand'
  },
  {
    id: 'sample-2',
    handle: 'middagstallerken-ler',
    title: 'Middagstallerken, ler',
    description: 'Stor tallerken med rolig overflade og tydeligt håndværk.',
    price: '399 DKK',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-middagstallerken-ler'
  },
  {
    id: 'sample-3',
    handle: 'serveringsfad-gra',
    title: 'Serveringsfad, grå',
    description: 'Et fad til hverdagsbordet og de særlige anledninger.',
    price: '649 DKK',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    variantId: 'gid://shopify/ProductVariant/fallback-serveringsfad-gra'
  }
]

export default defineEventHandler(async () => {
  const client = useShopifyClient()

  if (!client) {
    return {
      source: 'fallback',
      products: sampleProducts
    }
  }

  const query = `#graphql
    query Products {
      products(first: 12) {
        nodes {
          id
          handle
          title
          description
          featuredImage {
            url
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

  const { data, errors } = await client.request(query)

  if (errors?.length) {
    return {
      source: 'fallback',
      errors,
      products: sampleProducts
    }
  }

  const products = (data?.products?.nodes ?? []).map((product: any) => ({
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    price: `${Number(product.priceRange.minVariantPrice.amount).toFixed(0)} ${product.priceRange.minVariantPrice.currencyCode}`,
    variantId: product.variants?.nodes?.[0]?.id
  }))

  return {
    source: 'shopify',
    products
  }
})
