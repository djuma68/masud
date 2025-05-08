// src/stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    shipping: (state) =>
      state.items.length ? (state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100 ? 0 : 9.99) : 0,
    tax: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.07,
    total() {
      return this.subtotal + this.shipping + this.tax
    }
  },
  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId)
      if (item && quantity >= 1) {
        item.quantity = quantity
      }
    }
  }
})
