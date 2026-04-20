import { buildFallbackCheckoutUrl, getSessionCart, setSessionCart } from '../utils/cart'
import { getShopifyCart, addShopifyCartLines, createShopifyCart, removeShopifyCartLines, updateShopifyCartLines } from '../utils/shopify-cart'
import type { CartSummary } from '~/types/shop'

function updateFallbackTotals(cart: CartSummary) {
  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0)
  cart.totalAmount = `${cart.lines.reduce((sum, line) => {
    const parsed = Number(String(line.price).split(' ')[0].replace(',', '.')) || 0
    return sum + parsed * line.quantity
  }, 0)} DKK`
  return cart
}

function withDebug(event: any, payload: any) {
  const debug = getQuery(event).debug === '1'
  if (!debug) {
    if (payload?.cart) return payload.cart
    return payload
  }

  return payload
}

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
      if (updated) return withDebug(event, updated)
    }

    const created = await createShopifyCart(lines)
    if (created) {
      setCookie(event, 'ug_cart_id', created.cart.id, { path: '/', httpOnly: false, sameSite: 'lax' })
      return withDebug(event, created)
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

    setSessionCart(sessionId, updateFallbackTotals(nextCart))
    return nextCart
  }

  if (event.method === 'PATCH') {
    const body = await readBody<{ lineId?: string; quantity?: number }>(event)

    if (!body?.lineId || body.quantity === undefined) {
      throw createError({ statusCode: 400, statusMessage: 'Missing lineId or quantity' })
    }

    const quantity = Math.max(0, Number(body.quantity))
    const cartId = getCookie(event, 'ug_cart_id')

    if (cartId) {
      if (quantity === 0) {
        const updated = await removeShopifyCartLines(cartId, [body.lineId])
        if (updated) return withDebug(event, updated)
      } else {
        const updated = await updateShopifyCartLines(cartId, [{ id: body.lineId, quantity }])
        if (updated) return withDebug(event, updated)
      }
    }

    const fallback = getSessionCart(sessionId)
    fallback.lines = fallback.lines
      .map((line) => line.id === body.lineId ? { ...line, quantity } : line)
      .filter((line) => line.quantity > 0)

    setSessionCart(sessionId, updateFallbackTotals(fallback))
    return fallback
  }

  if (event.method === 'DELETE') {
    const body = await readBody<{ lineId?: string }>(event)

    if (!body?.lineId) {
      throw createError({ statusCode: 400, statusMessage: 'Missing lineId' })
    }

    const cartId = getCookie(event, 'ug_cart_id')

    if (cartId) {
      const updated = await removeShopifyCartLines(cartId, [body.lineId])
      if (updated) return withDebug(event, updated)
    }

    const fallback = getSessionCart(sessionId)
    fallback.lines = fallback.lines.filter((line) => line.id !== body.lineId)
    setSessionCart(sessionId, updateFallbackTotals(fallback))
    return fallback
  }

  const cartId = getCookie(event, 'ug_cart_id')

  if (cartId) {
    const shopifyCart = await getShopifyCart(cartId)
    if (shopifyCart) return withDebug(event, shopifyCart)
  }

  const fallbackCart = getSessionCart(sessionId)
  fallbackCart.checkoutUrl = buildFallbackCheckoutUrl(fallbackCart.id)
  setSessionCart(sessionId, fallbackCart)
  return fallbackCart
})
