import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

export type ProductReview = {
  name: string
  email: string
  rating: number
  comment: string
  createdAt: string
}

type ReviewStore = Record<string, ProductReview[]>

const reviewsFile = join(process.cwd(), 'data', 'reviews.json')

async function ensureReviewsFile() {
  await fs.mkdir(dirname(reviewsFile), { recursive: true })

  try {
    await fs.access(reviewsFile)
  }
  catch {
    await fs.writeFile(reviewsFile, '{}\n', 'utf8')
  }
}

export async function readReviewsStore(): Promise<ReviewStore> {
  await ensureReviewsFile()

  const raw = await fs.readFile(reviewsFile, 'utf8')

  try {
    const parsed = JSON.parse(raw || '{}')
    return typeof parsed === 'object' && parsed ? parsed : {}
  }
  catch {
    return {}
  }
}

export async function writeReviewsStore(store: ReviewStore) {
  await ensureReviewsFile()
  await fs.writeFile(reviewsFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8')
}

export async function getReviews(productId: string) {
  const store = await readReviewsStore()
  return [...(store[productId] ?? [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export async function addReview(productId: string, review: ProductReview) {
  const store = await readReviewsStore()
  const reviews = store[productId] ?? []

  store[productId] = [review, ...reviews]
  await writeReviewsStore(store)

  return store[productId]
}
