import type { CartLineInput, CartSummary } from '~/types/shop'

function money(amount?: string | number, currencyCode?: string) {
  return `${Number(amount ?? 0).toFixed(0)} ${currencyCode ?? 'DKK'}`
}

function mapCart(cart: any): CartSummary {
  const lines = (cart?.lines?.nodes ?? []).map((line: any) => ({
    id: line.id,
    quantity: line.quantity,
    title: line.merchandise?.product?.title ?? 'Produkt',
    price: money(line.merchandise?.price?.amount, line.merchandise?.price?.currencyCode),
    image: line.merchandise?.product?.featuredImage?.url,
    merchandiseId: line.merchandise?.id
  }))

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    totalAmount: money(cart.cost?.totalAmount?.amount, cart.cost?.totalAmount?.currencyCode),
    lines
  }
}

export async function createShopifyCart(lines: CartLineInput[] = []) {
  const client = useShopifyClient()
  if (!client) return null

  const query = `#graphql
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 20) {
            nodes {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { lines }
  })

  if (errors?.length || !data?.cartCreate?.cart) return null
  return mapCart(data.cartCreate.cart)
}

export async function addShopifyCartLines(cartId: string, lines: CartLineInput[]) {
  const client = useShopifyClient()
  if (!client) return null

  const query = `#graphql
    mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost { totalAmount { amount currencyCode } }
          lines(first: 20) {
            nodes {
              id
              quantity
              cost { totalAmount { amount currencyCode } }
              merchandise {
                ... on ProductVariant {
                  id
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { cartId, lines }
  })

  if (errors?.length || !data?.cartLinesAdd?.cart) return null
  return mapCart(data.cartLinesAdd.cart)
}

export async function getShopifyCart(cartId: string) {
  const client = useShopifyClient()
  if (!client) return null

  const query = `#graphql
    query Cart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost { totalAmount { amount currencyCode } }
        lines(first: 20) {
          nodes {
            id
            quantity
            cost { totalAmount { amount currencyCode } }
            merchandise {
              ... on ProductVariant {
                id
                price { amount currencyCode }
                product {
                  title
                  featuredImage { url }
                }
              }
            }
          }
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { cartId }
  })

  if (errors?.length || !data?.cart) return null
  return mapCart(data.cart)
}
