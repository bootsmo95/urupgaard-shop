import type { CartSummary } from '~/types/shop'

export function useCart() {
  const cart = useState<CartSummary>('cart', () => ({
    id: 'loading',
    checkoutUrl: '/checkout-placeholder',
    totalQuantity: 0,
    totalAmount: '0 DKK',
    lines: []
  }))

  const loading = useState<boolean>('cart-loading', () => false)

  async function refreshCart() {
    loading.value = true
    try {
      cart.value = await $fetch<CartSummary>('/api/cart')
    } finally {
      loading.value = false
    }
  }

  async function addToCart(payload: {
    merchandiseId: string
    quantity?: number
    title?: string
    price?: string
    image?: string
  }) {
    loading.value = true
    try {
      cart.value = await $fetch<CartSummary>('/api/cart/add', {
        method: 'POST',
        body: payload
      })
    } finally {
      loading.value = false
    }
  }

  async function checkout() {
    if (!cart.value.checkoutUrl) {
      await refreshCart()
    }

    if (process.client && cart.value.checkoutUrl) {
      window.location.href = cart.value.checkoutUrl
    }
  }

  return {
    cart,
    loading,
    refreshCart,
    addToCart,
    checkout
  }
}
