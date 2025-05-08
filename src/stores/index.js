import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: []
    },
    user: null,
    isAuthenticated: false,
    categories: [
      { id: 1, name: 'Phones', slug: 'phones' },
      { id: 2, name: 'Laptops', slug: 'laptops' },
      { id: 3, name: 'Accessories', slug: 'accessories' },
      { id: 4, name: 'Audio', slug: 'audio' },
      { id: 5, name: 'Wearables', slug: 'wearables' }
    ]
  },
  getters: {
    cartItemCount: state => {
      return state.cart.items.length
    },
    cartTotal: state => {
      return state.cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart
    },
    addToCart(state, item) {
      const existingItem = state.cart.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.items.push({...item, quantity: 1})
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, itemId) {
      const index = state.cart.items.findIndex(item => item.id === itemId)
      if (index > -1) {
        state.cart.items.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    setUser(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    }
  },
  actions: {
    initializeCart({ commit }) {
      try {
        const cart = JSON.parse(localStorage.getItem('cart')) || { items: [] }
        commit('setCart', cart)
      } catch (error) {
        console.error('Error initializing cart:', error)
        commit('setCart', { items: [] })
      }
    },
    async login({ commit }, credentials) {
      try {
        // In production, call your API endpoint here
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          localStorage.setItem('user-token', data.token)
          commit('setUser', data.user)
          return { success: true }
        } else {
          return { success: false, message: data.message }
        }
      } catch (error) {
        console.error('Login error:', error)
        return { success: false, message: 'Network error' }
      }
    },
    logout({ commit }) {
      localStorage.removeItem('user-token')
      commit('setUser', null)
    }
  }
})