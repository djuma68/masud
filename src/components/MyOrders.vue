// src/views/MyOrders.vue
<template>
  <div class="orders-page">
    <div class="orders-header">
      <h1>My Orders</h1>
      <p v-if="currentUser" class="welcome-message">Welcome back, {{ currentUser.name }}!</p>
    </div>

    <div v-if="!currentUser" class="auth-required">
      <div class="auth-message">
        <i class="lock-icon">🔒</i>
        <h2>Authentication Required</h2>
        <p>Please log in to view your orders.</p>
        <router-link to="/login" class="btn">Log In</router-link>
      </div>
    </div>

    <div v-else-if="orders.length === 0" class="empty-state">
      <div class="empty-icon">📦</div>
      <h2>No orders yet</h2>
      <p>You haven't placed any orders yet.</p>
      <router-link to="/products" class="btn">Start Shopping</router-link>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <h3>Order #{{ order.id }}</h3>
            <span class="order-date">{{ formatDate(order.date) }}</span>
          </div>
          <div class="order-status" :class="order.status.toLowerCase()">
            {{ order.status }}
          </div>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <div class="item-image" @click="viewProductDetails(item.id)">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-details" @click="viewProductDetails(item.id)">
              <h4>{{ item.name }}</h4>
              <p class="item-price">{{ formatPrice(item.price) }} × {{ item.quantity }}</p>
            </div>
            <div class="item-total">
              {{ formatPrice(item.price * item.quantity) }}
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>{{ formatPrice(calculateSubtotal(order.items)) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>{{ formatPrice(order.shipping) }}</span>
            </div>
            <div class="summary-row">
              <span>Tax:</span>
              <span>{{ formatPrice(order.tax) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>{{ formatPrice(calculateTotal(order)) }}</span>
            </div>
          </div>
          <div class="order-actions">
            <button class="btn btn-outline" @click="viewOrderDetails(order.id)">Order Details</button>
            <button 
              v-if="order.status === 'Delivered'" 
              class="btn btn-outline"
              @click="reorder(order)"
            >
              Buy Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyOrders',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      // In a real application, you would fetch orders from an API
      // For demo purposes, we'll create some sample orders
      
      if (!this.currentUser) return;
      
      // Try to load orders from localStorage
      const savedOrders = localStorage.getItem(`orders_${this.currentUser.id}`);
      
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
        return;
      }
      
      // If no saved orders, create sample ones
      this.generateSampleOrders();
    },
    generateSampleOrders() {
      // Use some cart items to create sample orders
      const statuses = ['Processing', 'Shipped', 'Delivered', 'Delivered'];
      const sampleOrders = [];
      
      // Create a past date based on days ago
      const getDateDaysAgo = (daysAgo) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString();
      };
      
      // If cart is empty, create some sample products
      const sampleProducts = this.cartItems.length > 0 ? this.cartItems : [
        {
          id: '1',
          name: 'Smart Watch Pro',
          price: 249.99,
          image: '/api/placeholder/100/100',
          quantity: 1
        },
        {
          id: '2',
          name: 'Wireless Earbuds',
          price: 129.99,
          image: '/api/placeholder/100/100',
          quantity: 1
        },
        {
          id: '3',
          name: 'Bluetooth Speaker',
          price: 79.99,
          image: '/api/placeholder/100/100',
          quantity: 2
        }
      ];
      
      // Create orders with different dates and statuses
      for (let i = 0; i < 4; i++) {
        const subtotal = this.calculateSubtotal(sampleProducts);
        const shipping = i === 0 ? 12.99 : 0; // First order has shipping fee
        const tax = subtotal * 0.08;
        
        sampleOrders.push({
          id: `ORDER${Math.floor(100000 + Math.random() * 900000)}`,
          date: getDateDaysAgo(i * 5), // Each order is 5 days apart
          status: statuses[i],
          items: JSON.parse(JSON.stringify(sampleProducts)), // Deep copy
          shipping: shipping,
          tax: tax,
          total: subtotal + shipping + tax,
          address: '123 Main St, Anytown, ST 12345'
        });
      }
      
      this.orders = sampleOrders;
      
      // Save to localStorage
      if (this.currentUser) {
        localStorage.setItem(`orders_${this.currentUser.id}`, JSON.stringify(sampleOrders));
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    calculateSubtotal(items) {
      return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    calculateTotal(order) {
      return this.calculateSubtotal(order.items) + order.shipping + order.tax;
    },
    reorder(order) {
      // Add all items from this order to the cart
      order.items.forEach(item => {
        this.$emit('add-to-cart', item);
      });
      
      this.$toast.success('All items added to cart!', {
        position: 'top-right',
        duration: 2000
      });
      
      // Navigate to cart
      this.$router.push('/cart');
    },
    viewProductDetails(productId) {
      // Navigate to product detail page with the product id
      this.$router.push(`/products/${productId}`);
    },
    viewOrderDetails(orderId) {
      // In a real app, this would navigate to an order details page
      // For now, we'll show an alert
      alert(`Viewing details for order ${orderId}`);
      // Alternatively, you could navigate to a dedicated order details page:
      // this.$router.push(`/orders/${orderId}`);
    }
  }
};
</script>

<style scoped>
.orders-page {
  max-width: 900px;
  margin: 0 auto;
}

.orders-header {
  margin-bottom: 2rem;
}

.orders-header h1 {
  font-size: 1.75rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.welcome-message {
  color: #666;
}

.auth-required,
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 2rem;
}

.auth-message,
.empty-state {
  max-width: 400px;
}

.lock-icon,
.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.auth-required h2,
.empty-state h2 {
  margin-bottom: 1rem;
  color: #333;
}

.auth-required p,
.empty-state p {
  margin-bottom: 1.5rem;
  color: #666;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.order-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.order-date {
  font-size: 0.9rem;
  color: #666;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}

.order-status.processing {
  background-color: #fff8e1;
  color: #ff8f00;
}

.order-status.shipped {
  background-color: #e1f5fe;
  color: #0288d1;
}

.order-status.delivered {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.order-status.cancelled {
  background-color: #fbe9e7;
  color: #d32f2f;
}

.order-items {
  padding: 1rem 1.25rem;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 70px;
  height: 70px;
  border-radius: 6px;
  overflow: hidden;
  margin-right: 1rem;
  border: 1px solid #eee;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
}

.item-details:hover h4 {
  color: #1a73e8; /* Change color on hover to indicate it's clickable */
  text-decoration: underline;
}

.item-details h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  transition: color 0.2s ease;
}

.item-price {
  font-size: 0.9rem;
  color: #666;
}

.item-total {
  font-weight: 600;
  color: #333;
}

.order-footer {
  padding: 1.25rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}

.order-summary {
  flex: 1;
  min-width: 200px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.summary-row.total {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed #eee;
}

.order-actions {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .order-status {
    margin-top: 0.5rem;
  }
  
  .order-item {
    flex-wrap: wrap;
  }
  
  .item-total {
    width: 100%;
    margin-top: 0.5rem;
    text-align: right;
  }
  
  .order-footer {
    flex-direction: column;
  }
  
  .order-actions {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>