import type { CartSummary } from '~/types/shop'

const fallbackCartBySession = new Map<string, CartSummary>()

export function getSessionCart(sessionId: string) {
  return fallbackCartBySession.get(sessionId) ?? {
    id: `local-${sessionId}`,
    checkoutUrl: '/checkout-placeholder',
    totalQuantity: 0,
    totalAmount: '0 DKK',
    lines: []
  }
}

export function setSessionCart(sessionId: string, cart: CartSummary) {
  fallbackCartBySession.set(sessionId, cart)
}

export function buildFallbackCheckoutUrl(cartId: string) {
  return `/checkout-placeholder?cart=${encodeURIComponent(cartId)}`
}
