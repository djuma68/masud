<template>
  <div class="cart-page">
    <h1>Your Shopping Cart</h1>
    
    <div v-if="!cartItems.length" class="empty-cart">
      <div class="empty-cart-message">
        <i class="cart-icon">🛒</i>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <router-link to="/" class="btn">Continue Shopping</router-link>
      </div>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decrementQuantity(item.id)" class="quantity-btn">-</button>
            <input 
              type="number" 
              v-model.number="item.quantity" 
              @change="updateQuantity(item.id, item.quantity)"
              min="1"
            >
            <button @click="incrementQuantity(item.id)" class="quantity-btn">+</button>
          </div>
          <div class="item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeFromCart(item.id)" class="remove-btn">
            &times;
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        <button class="btn checkout-btn" @click="checkout">Proceed to Checkout</button>
        <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    shipping() {
      return this.subtotal > 100 ? 0 : 9.99;
    },
    tax() {
      return this.subtotal * 0.07; // 7% tax
    },
    total() {
      return this.subtotal + this.shipping + this.tax;
    }
  },
  methods: {
    incrementQuantity(productId) {
      this.$emit('update-quantity', productId, this.getItemQuantity(productId) + 1);
    },
    decrementQuantity(productId) {
      const currentQuantity = this.getItemQuantity(productId);
      if (currentQuantity > 1) {
        this.$emit('update-quantity', productId, currentQuantity - 1);
      }
    },
    updateQuantity(productId, quantity) {
      this.$emit('update-quantity', productId, quantity);
    },
    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId);
    },
    getItemQuantity(productId) {
      const item = this.cartItems.find(item => item.id === productId);
      return item ? item.quantity : 0;
    },
    checkout() {
      // In a real application, this would redirect to a checkout page
      alert('Proceeding to checkout! In a real application, this would redirect to a payment gateway.');
    }
  }
};
</script>

<style scoped>
.cart-page {
  width: 100%;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  text-align: center;
}

.empty-cart-message {
  max-width: 500px;
}

.cart-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  display: block;
}

.empty-cart h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #666;
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .cart-content {
    grid-template-columns: 2fr 1fr;
  }
}

.cart-items {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.item-details h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.item-price {
  color: #666;
  font-size: 0.9rem;
}

.item-quantity {
  display: flex;
  align-items: center;
}

.quantity-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
}

.item-quantity input {
  width: 40px;
  height: 28px;
  text-align: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  font-size: 0.9rem;
}

.item-total {
  font-weight: 600;
  color: #1a73e8;
  width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #e53935;
  font-size: 1.2rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.cart-summary {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.checkout-btn {
  width: 100%;
  padding: 0.75rem;
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
}

.continue-shopping {
  display: block;
  text-align: center;
  color: #1a73e8;
  text-decoration: none;
  font-size: 0.9rem;
}

.continue-shopping:hover {
  text-decoration: underline;
}
</style>