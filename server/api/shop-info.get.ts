export default defineEventHandler(async (event) => {
  const client = useShopifyClient()

  if (!client) {
    throw createError({ statusCode: 503, statusMessage: 'Shopify client not available' })
  }

  const query = `#graphql
    query Shop {
      shop {
        name
        description
        email
        phone
        privacyPolicy {
          url
        }
        termsOfService {
          url
        }
        refundPolicy {
          url
        }
        shippingPolicy {
          url
        }
      }
    }
  `

  const { data, errors } = await client.request(query)

  if (errors?.length) {
    throw createError({
      statusCode: 500,
      statusMessage: `Shopify API error: ${errors[0].message}`
    })
  }

  const { shop } = data

  return {
    source: 'shopify',
    shop: {
      name: shop.name,
      description: shop.description,
      email: shop.email,
      phone: shop.phone,
      policies: {
        privacy: shop.privacyPolicy?.url,
        terms: shop.termsOfService?.url,
        returns: shop.refundPolicy?.url,
        shipping: shop.shippingPolicy?.url
      }
    }
  }
})
