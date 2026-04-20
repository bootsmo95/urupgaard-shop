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

function getUserErrors(payload: any) {
  return payload?.userErrors ?? []
}

function throwOnUserErrors(source: string, payload: any) {
  const userErrors = getUserErrors(payload)

  if (userErrors.length) {
    const message = userErrors
      .map((error: any) => `${error.field?.join('.') || source}: ${error.message}`)
      .join(' | ')

    throw createError({
      statusCode: 400,
      statusMessage: `${source} failed`,
      data: { source, userErrors },
      message
    })
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
                  title
                  availableForSale
                  quantityAvailable
                  price { amount currencyCode }
                  product {
                    id
                    title
                    handle
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { lines }
  })

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartCreate request failed',
      data: { errors }
    })
  }

  throwOnUserErrors('cartCreate', data?.cartCreate)

  if (!data?.cartCreate?.cart) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartCreate returned no cart'
    })
  }

  return {
    cart: mapCart(data.cartCreate.cart),
    debug: {
      operation: 'cartCreate',
      input: { lines },
      userErrors: getUserErrors(data?.cartCreate),
      rawCart: data?.cartCreate?.cart
    }
  }
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
                  title
                  availableForSale
                  quantityAvailable
                  price { amount currencyCode }
                  product {
                    id
                    title
                    handle
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { cartId, lines }
  })

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesAdd request failed',
      data: { errors }
    })
  }

  throwOnUserErrors('cartLinesAdd', data?.cartLinesAdd)

  if (!data?.cartLinesAdd?.cart) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesAdd returned no cart'
    })
  }

  return {
    cart: mapCart(data.cartLinesAdd.cart),
    debug: {
      operation: 'cartLinesAdd',
      input: { cartId, lines },
      userErrors: getUserErrors(data?.cartLinesAdd),
      rawCart: data?.cartLinesAdd?.cart
    }
  }
}

export async function updateShopifyCartLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const client = useShopifyClient()
  if (!client) return null

  const query = `#graphql
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
                  title
                  availableForSale
                  quantityAvailable
                  price { amount currencyCode }
                  product {
                    id
                    title
                    handle
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { cartId, lines }
  })

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesUpdate request failed',
      data: { errors }
    })
  }

  throwOnUserErrors('cartLinesUpdate', data?.cartLinesUpdate)

  if (!data?.cartLinesUpdate?.cart) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesUpdate returned no cart'
    })
  }

  return {
    cart: mapCart(data.cartLinesUpdate.cart),
    debug: {
      operation: 'cartLinesUpdate',
      input: { cartId, lines },
      userErrors: getUserErrors(data?.cartLinesUpdate),
      rawCart: data?.cartLinesUpdate?.cart
    }
  }
}

export async function removeShopifyCartLines(cartId: string, lineIds: string[]) {
  const client = useShopifyClient()
  if (!client) return null

  const query = `#graphql
    mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
                  title
                  availableForSale
                  quantityAvailable
                  price { amount currencyCode }
                  product {
                    id
                    title
                    handle
                    featuredImage { url }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const { data, errors } = await client.request(query, {
    variables: { cartId, lineIds }
  })

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesRemove request failed',
      data: { errors }
    })
  }

  throwOnUserErrors('cartLinesRemove', data?.cartLinesRemove)

  if (!data?.cartLinesRemove?.cart) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cartLinesRemove returned no cart'
    })
  }

  return {
    cart: mapCart(data.cartLinesRemove.cart),
    debug: {
      operation: 'cartLinesRemove',
      input: { cartId, lineIds },
      userErrors: getUserErrors(data?.cartLinesRemove),
      rawCart: data?.cartLinesRemove?.cart
    }
  }
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
                title
                availableForSale
                quantityAvailable
                price { amount currencyCode }
                product {
                  id
                  title
                  handle
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

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Shopify cart query failed',
      data: { errors }
    })
  }

  if (!data?.cart) return null
  return {
    cart: mapCart(data.cart),
    debug: {
      operation: 'getCart',
      input: { cartId },
      rawCart: data.cart
    }
  }
}
