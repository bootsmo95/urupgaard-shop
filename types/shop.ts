export interface ProductCard {
  id: string
  handle: string
  title: string
  description?: string
  price: string
  image?: string
  variantId?: string
}

export interface CartLineInput {
  merchandiseId: string
  quantity: number
}

export interface CartLine {
  id: string
  quantity: number
  title: string
  price: string
  image?: string
  merchandiseId: string
}

export interface CartSummary {
  id: string
  checkoutUrl: string
  totalQuantity: number
  totalAmount: string
  lines: CartLine[]
}
