export default defineEventHandler(async (event) => {
  const client = useShopifyClient()

  if (!client) {
    throw createError({ statusCode: 503, statusMessage: 'Shopify client not available' })
  }

  const query = `#graphql
    query Shop {
      shop {
        privacyPolicy {
          body
          title
          url
        }
        termsOfService {
          body
          title
          url
        }
        refundPolicy {
          body
          title
          url
        }
        shippingPolicy {
          body
          title
          url
        }
        subscriptionPolicy {
          body
          title
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

  // Map policies to standardized format
  const policies = {
    privacyPolicy: shop.privacyPolicy,
    termsOfService: shop.termsOfService,
    refundPolicy: shop.refundPolicy,
    shippingPolicy: shop.shippingPolicy,
    subscriptionPolicy: shop.subscriptionPolicy
  }

  return {
    source: 'shopify',
    policies
  }
})
