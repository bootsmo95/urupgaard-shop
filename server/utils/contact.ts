import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

export type ContactSubmission = {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
  notified: boolean
}

const contactFile = join(process.cwd(), 'data', 'contact-submissions.json')

async function ensureContactFile() {
  await fs.mkdir(dirname(contactFile), { recursive: true })

  try {
    await fs.access(contactFile)
  }
  catch {
    await fs.writeFile(contactFile, '[]\n', 'utf8')
  }
}

export async function readContactSubmissions(): Promise<ContactSubmission[]> {
  await ensureContactFile()

  const raw = await fs.readFile(contactFile, 'utf8')

  try {
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  }
  catch {
    return []
  }
}

export async function saveContactSubmission(submission: ContactSubmission) {
  const submissions = await readContactSubmissions()
  submissions.unshift(submission)
  await fs.writeFile(contactFile, `${JSON.stringify(submissions, null, 2)}\n`, 'utf8')
  return submission
}
