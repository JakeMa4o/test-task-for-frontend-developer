
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),

  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(product) {
      this.cartItems = this.cartItems.filter(item => item.id !== product.id)
    },

    increaseQuantity(product) {
      const item = this.cartItems.find(item => item.id === product.id)
      if (item) item.quantity++
    },

    decreaseQuantity(product) {
      const item = this.cartItems.find(item => item.id === product.id)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeFromCart(product)
        }
      }
    },

    isInCart(product) {
      return this.cartItems.some(item => item.id === product.id)
    },
  },

  getters: {
    cartQuantity(state) {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0)
    },
  },
})
