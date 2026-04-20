import { z } from 'zod'
import { addReview } from '../utils/reviews'

const reviewSchema = z.object({
  productId: z.string().min(1, 'Produkt-id mangler'),
  name: z.string().trim().min(2, 'Skriv dit navn').max(80, 'Navnet er for langt'),
  email: z.string().trim().email('Skriv en gyldig e-mailadresse').max(160, 'E-mailen er for lang'),
  rating: z.coerce.number().int().min(1, 'Vælg en vurdering fra 1 til 5').max(5, 'Vælg en vurdering fra 1 til 5'),
  comment: z.string().trim().min(10, 'Skriv mindst 10 tegn').max(1200, 'Kommentaren er for lang')
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = reviewSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Ugyldig anmeldelse'
    })
  }

  const review = {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    rating: parsed.data.rating,
    comment: parsed.data.comment,
    createdAt: new Date().toISOString()
  }

  const reviews = await addReview(parsed.data.productId, review)
  const reviewCount = reviews.length
  const averageRating = Number((reviews.reduce((sum, item) => sum + item.rating, 0) / reviewCount).toFixed(1))

  setResponseStatus(event, 201)

  const { email: _email, ...safeReview } = review

  return {
    success: true,
    reviewCount,
    averageRating,
    review: safeReview
  }
})
