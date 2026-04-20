export default defineEventHandler((event) => {
  const allowRobots = process.env.ALLOW_ROBOTS !== 'false'

  const content = allowRobots
    ? 'User-agent: *\nAllow: /\n'
    : 'User-agent: *\nDisallow: /\n'

  setHeader(event, 'Content-Type', 'text/plain')
  return content
})
