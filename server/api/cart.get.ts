import { buildFallbackCheckoutUrl, getSessionCart, setSessionCart } from '../utils/cart'
import { getShopifyCart, addShopifyCartLines, createShopifyCart } from '../utils/shopify-cart'
import type { CartSummary } from '~/types/shop'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'ug_session') || crypto.randomUUID()
  setCookie(event, 'ug_session', sessionId, { path: '/', httpOnly: false, sameSite: 'lax' })

  if (event.method === 'POST') {
    const body = await readBody<{ merchandiseId?: string; quantity?: number; title?: string; price?: string; image?: string }>(event)

    if (!body?.merchandiseId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing merchandiseId' })
    }

    const quantity = Math.max(1, Number(body.quantity || 1))
    const existingCartId = getCookie(event, 'ug_cart_id')
    const lines = [{ merchandiseId: body.merchandiseId, quantity }]

    if (existingCartId) {
      const updated = await addShopifyCartLines(existingCartId, lines)
      if (updated) return updated
    }

    const created = await createShopifyCart(lines)
    if (created) {
      setCookie(event, 'ug_cart_id', created.id, { path: '/', httpOnly: false, sameSite: 'lax' })
      return created
    }

    const fallback = getSessionCart(sessionId)
    const nextCart: CartSummary = {
      ...fallback,
      lines: [...fallback.lines],
      totalQuantity: fallback.totalQuantity + quantity,
      totalAmount: fallback.totalAmount,
      checkoutUrl: buildFallbackCheckoutUrl(fallback.id)
    }

    const existingLine = nextCart.lines.find((line) => line.merchandiseId === body.merchandiseId)
    if (existingLine) {
      existingLine.quantity += quantity
    } else {
      nextCart.lines.push({
        id: `${body.merchandiseId}-${Date.now()}`,
        merchandiseId: body.merchandiseId,
        quantity,
        title: body.title || 'Produkt',
        price: body.price || '0 DKK',
        image: body.image
      })
    }

    nextCart.totalAmount = `${nextCart.lines.reduce((sum, line) => {
      const parsed = Number(String(line.price).split(' ')[0].replace(',', '.')) || 0
      return sum + parsed * line.quantity
    }, 0)} DKK`

    setSessionCart(sessionId, nextCart)
    return nextCart
  }

  const cartId = getCookie(event, 'ug_cart_id')

  if (cartId) {
    const shopifyCart = await getShopifyCart(cartId)
    if (shopifyCart) return shopifyCart
  }

  const fallbackCart = getSessionCart(sessionId)
  fallbackCart.checkoutUrl = buildFallbackCheckoutUrl(fallbackCart.id)
  setSessionCart(sessionId, fallbackCart)
  return fallbackCart
})
