import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import { randomUUID } from 'node:crypto'

export type StoredReview = {
  id: string
  handle: string
  name: string
  email?: string
  rating: number
  comment: string
  createdAt: string
}

export type ReviewInput = {
  handle: string
  name: string
  email?: string
  rating: number
  comment: string
}

type ReviewStore = {
  reviews: StoredReview[]
}

const reviewsFile = join(process.cwd(), 'server', 'data', 'reviews.json')
const rateLimitWindowMs = 15 * 60 * 1000
const rateLimitMaxEntries = 3
const rateLimitStore = new Map<string, number[]>()

async function ensureReviewsFile() {
  await fs.mkdir(dirname(reviewsFile), { recursive: true })

  try {
    await fs.access(reviewsFile)
  }
  catch {
    await fs.writeFile(reviewsFile, '{\n  "reviews": []\n}\n', 'utf8')
  }
}

async function readReviewsStore(): Promise<ReviewStore> {
  await ensureReviewsFile()

  try {
    const raw = await fs.readFile(reviewsFile, 'utf8')
    const parsed = JSON.parse(raw || '{}')

    if (Array.isArray(parsed)) {
      return { reviews: parsed }
    }

    if (Array.isArray(parsed?.reviews)) {
      return { reviews: parsed.reviews }
    }
  }
  catch {
    // ignore malformed file and fall back to empty store
  }

  return { reviews: [] }
}

async function writeReviewsStore(store: ReviewStore) {
  await ensureReviewsFile()
  await fs.writeFile(reviewsFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export async function getReviewsByHandle(handle: string) {
  const normalizedHandle = handle.trim().toLowerCase()
  const store = await readReviewsStore()

  return store.reviews
    .filter(review => review.handle === normalizedHandle)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getReviewSummary(reviews: StoredReview[]) {
  const reviewCount = reviews.length
  const averageRating = reviewCount
    ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount).toFixed(1))
    : 0

  return {
    reviewCount,
    averageRating,
    reviews: reviews.map(({ email: _email, ...review }) => review)
  }
}

export async function createReview(input: ReviewInput) {
  const store = await readReviewsStore()
  const review: StoredReview = {
    id: randomUUID(),
    handle: input.handle.trim().toLowerCase(),
    name: input.name.trim(),
    email: input.email?.trim().toLowerCase() || undefined,
    rating: input.rating,
    comment: input.comment.trim(),
    createdAt: new Date().toISOString()
  }

  store.reviews.unshift(review)
  await writeReviewsStore(store)

  return review
}

export function enforceReviewRateLimit(key: string) {
  const now = Date.now()
  const recentHits = (rateLimitStore.get(key) ?? []).filter(timestamp => now - timestamp < rateLimitWindowMs)

  if (recentHits.length >= rateLimitMaxEntries) {
    const retryAfterSeconds = Math.ceil((rateLimitWindowMs - (now - recentHits[0])) / 1000)
    throw createError({
      statusCode: 429,
      statusMessage: 'Du har sendt mange anmeldelser på kort tid. Prøv igen lidt senere.',
      data: {
        retryAfter: retryAfterSeconds
      }
    })
  }

  recentHits.push(now)
  rateLimitStore.set(key, recentHits)
}
