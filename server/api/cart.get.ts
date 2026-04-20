import { buildFallbackCheckoutUrl, getSessionCart, setSessionCart } from '../utils/cart'
import { getShopifyCart } from '../utils/shopify-cart'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'ug_session') || crypto.randomUUID()
  setCookie(event, 'ug_session', sessionId, { path: '/', httpOnly: false, sameSite: 'lax' })

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
