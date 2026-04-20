import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

interface NewsletterSubscriber {
  email: string
  subscribedAt: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const storagePath = join(process.cwd(), 'server', 'data', 'newsletter-signups.json')

async function readSubscribers() {
  try {
    const content = await readFile(storagePath, 'utf8')
    return JSON.parse(content) as NewsletterSubscriber[]
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      return []
    }

    throw error
  }
}

export default defineEventHandler(async (event) => {
  assertMethod(event, ['POST'])
  const body = await readBody<{ email?: string }>(event)
  const email = body.email?.trim().toLowerCase()

  if (!email || !emailPattern.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ugyldig e-mailadresse'
    })
  }

  const subscribers = await readSubscribers()

  if (subscribers.some((entry) => entry.email === email)) {
    return {
      ok: true,
      message: 'Du er allerede tilmeldt nyhedsbrevet.'
    }
  }

  subscribers.push({
    email,
    subscribedAt: new Date().toISOString()
  })

  await mkdir(dirname(storagePath), { recursive: true })
  await writeFile(storagePath, JSON.stringify(subscribers, null, 2), 'utf8')

  return {
    ok: true,
    message: 'Tak, du er nu tilmeldt nyhedsbrevet.'
  }
})
