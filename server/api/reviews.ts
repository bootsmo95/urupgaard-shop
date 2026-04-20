import { z } from 'zod'
import {
  createReview,
  enforceReviewRateLimit,
  getReviewsByHandle,
  getReviewSummary
} from '../utils/reviews'

const reviewSchema = z.object({
  handle: z.string().trim().min(1, 'Produktet mangler').max(160),
  name: z.string().trim().min(2, 'Skriv dit navn').max(80, 'Navnet er for langt'),
  email: z.union([
    z.literal(''),
    z.string().trim().email('E-mailadressen ser ikke rigtig ud.').max(160, 'E-mailen er for lang')
  ]).optional(),
  rating: z.coerce.number().int().min(1, 'Vælg 1 til 5 stjerner').max(5, 'Vælg 1 til 5 stjerner'),
  comment: z.string().trim().min(10, 'Skriv gerne lidt mere, mindst 10 tegn.').max(1200, 'Kommentaren er for lang'),
  company: z.string().trim().max(0).optional()
})

function getClientKey(event: Parameters<typeof defineEventHandler>[0]) {
  const forwardedFor = getHeader(event, 'x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || event.node.req.socket.remoteAddress || 'unknown'
  return `${ip}:${getHeader(event, 'user-agent') || 'unknown'}`
}

async function handleGet(event: Parameters<typeof defineEventHandler>[0]) {
  const query = getQuery(event)
  const handle = typeof query.handle === 'string' ? query.handle.trim().toLowerCase() : ''

  if (!handle) {
    throw createError({ statusCode: 400, statusMessage: 'Produkt-handle mangler' })
  }

  const reviews = await getReviewsByHandle(handle)

  return {
    handle,
    ...getReviewSummary(reviews)
  }
}

async function handlePost(event: Parameters<typeof defineEventHandler>[0]) {
  const body = await readBody(event)
  const parsed = reviewSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message || 'Ugyldig anmeldelse',
      data: {
        issues: parsed.error.issues.map(issue => ({
          field: String(issue.path[0] || ''),
          message: issue.message
        }))
      }
    })
  }

  if (parsed.data.company) {
    return {
      success: true,
      accepted: true
    }
  }

  enforceReviewRateLimit(getClientKey(event))

  await createReview({
    handle: parsed.data.handle,
    name: parsed.data.name,
    email: parsed.data.email,
    rating: parsed.data.rating,
    comment: parsed.data.comment
  })

  const reviews = await getReviewsByHandle(parsed.data.handle)

  setResponseStatus(event, 201)

  return {
    success: true,
    handle: parsed.data.handle.trim().toLowerCase(),
    ...getReviewSummary(reviews)
  }
}

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return handleGet(event)
  }

  if (event.method === 'POST') {
    return handlePost(event)
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Metoden er ikke tilladt'
  })
})
