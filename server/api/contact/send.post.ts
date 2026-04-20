import { z } from 'zod'
import { saveContactSubmission } from '../../utils/contact'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Skriv mindst 2 tegn i navnefeltet.').max(80, 'Navnet er for langt.'),
  email: z.string().trim().email('Skriv en gyldig e-mailadresse.').max(120, 'E-mailadressen er for lang.'),
  message: z.string().trim().min(10, 'Skriv mindst 10 tegn i beskeden.').max(2500, 'Beskeden er for lang.')
})

async function sendNotification(payload: { name: string, email: string, message: string, createdAt: string }) {
  const config = useRuntimeConfig()
  const webhookUrl = config.contactNotificationWebhookUrl

  if (!webhookUrl) return false

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      subject: `Ny kontaktformular fra ${payload.name}`,
      replyTo: payload.email,
      text: `Navn: ${payload.name}\nE-mail: ${payload.email}\nTidspunkt: ${payload.createdAt}\n\n${payload.message}`
    })
  })

  if (!response.ok) {
    throw new Error(`Notification webhook failed with status ${response.status}`)
  }

  return true
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ret venligst felterne og prøv igen.',
      data: {
        issues: parsed.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message
        }))
      }
    })
  }

  const createdAt = new Date().toISOString()
  let notified = false

  try {
    notified = await sendNotification({ ...parsed.data, createdAt })
  }
  catch (error) {
    console.error('Contact notification failed', error)
  }

  await saveContactSubmission({
    id: crypto.randomUUID(),
    createdAt,
    notified,
    ...parsed.data
  })

  return {
    ok: true,
    message: notified
      ? 'Tak for din besked. Vi har modtaget den og sendt en notifikation videre til teamet.'
      : 'Tak for din besked. Vi har modtaget den og vender tilbage hurtigst muligt.'
  }
})
