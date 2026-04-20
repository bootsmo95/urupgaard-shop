import { getReviews } from '../../utils/reviews'

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, 'product-id')

  if (!productId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing product id' })
  }

  const reviews = await getReviews(productId)
  const reviewCount = reviews.length
  const averageRating = reviewCount
    ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1))
    : 0

  return {
    productId,
    reviewCount,
    averageRating,
    reviews: reviews.map(({ email: _email, ...review }) => review)
  }
})
