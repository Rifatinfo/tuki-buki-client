export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  size?: string
  variant?: string
}

export interface DeliveryOption {
  id: string
  title: string
  description: string
  price: number
}

export type PageView = 'cart' | 'checkout' | 'success'
