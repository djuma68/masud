// src/views/ProductDetail.vue
<template>
  <div class="product-detail-page">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <router-link to="/products" class="btn">Back to Products</router-link>
    </div>
    
    <div v-else class="product-container">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <div class="product-rating">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= product.rating }">★</span>
          </div>
          <span class="reviews-count">({{ product.reviewCount || 0 }} reviews)</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">{{ formatPrice(product.price) }}</span>
          <span v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
            {{ formatPrice(product.originalPrice) }}
          </span>
        </div>
        
        <div class="product-description">
          <p>{{ product.description }}</p>
        </div>
        
        <div class="product-availability" :class="product.inStock ? 'in-stock' : 'out-of-stock'">
          <span v-if="product.inStock">In Stock</span>
          <span v-else>Out of Stock</span>
        </div>
        
        <div class="product-actions">
          <div class="quantity-selector">
            <button 
              @click="quantity > 1 ? quantity-- : quantity" 
              class="quantity-btn"
              :disabled="!product.inStock"
            >−</button>
            <input 
              type="number" 
              v-model.number="quantity" 
              min="1" 
              :disabled="!product.inStock"
            />
            <button 
              @click="quantity++" 
              class="quantity-btn"
              :disabled="!product.inStock"
            >+</button>
          </div>
          
          <div class="action-buttons">
            <button 
              @click="addToCart" 
              class="btn"
              :disabled="!product.inStock"
            >
              Add to Cart
            </button>
            
            <button 
              @click="buyNow" 
              class="btn btn-highlight"
              :disabled="!product.inStock"
            >
              Buy Now
            </button>
          </div>
        </div>
        
        <div class="product-details">
          <h3>Product Details</h3>
          <ul>
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div v-if="product" class="related-products">
      <h2>You Might Also Like</h2>
      <div class="related-products-grid">
        <!-- Related products would go here -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      quantity: 1
    };
  },
  created() {
    this.fetchProductDetails();
  },
  watch: {
    '$route.params.id': function() {
      this.fetchProductDetails();
    }
  },
  methods: {
    async fetchProductDetails() {
      this.loading = true;
      this.error = null;
      
      try {
         // In a real app, you would fetch from an API
         const response = await fetch(`/api/products/${this.$route.params.id}`);
         const data = await response.json();
        
        // For demo, we'll simulate a product
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get product ID from route
        const productId = this.$route.params.id;
        
        // Generate a sample product based on the ID
        this.product = {
          id: productId,
          name: `Premium Electronic Device ${productId}`,
          price: 299.99,
          originalPrice: 349.99,
          description: 'This high-quality electronic device offers state-of-the-art features and exceptional performance. Perfect for both professional and personal use.',
          image: '/api/placeholder/500/500',
          rating: 4.5,
          reviewCount: 127,
          inStock: true,
          features: [
            'Advanced technology for superior performance',
            'Energy-efficient design',
            'Durable construction built to last',
            'Smart connectivity with other devices',
            '1-year manufacturer warranty'
          ]
        };
      } catch (error) {
        console.error('Error fetching product:', error);
        this.error = 'Failed to load product details. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
    addToCart() {
      if (!this.product.inStock) return;
      
      // Create product object to emit
      const product = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image
      };
      
      // Add to cart the specified number of times
      for (let i = 0; i < this.quantity; i++) {
        this.$emit('add-to-cart', product);
      }
      
      // Reset quantity
      this.quantity = 1;
    },
    buyNow() {
      if (!this.product.inStock) return;
      
      // First add to cart
      this.addToCart();
      
      // Then navigate to cart
      this.$router.push('/cart');
    }
  }
};
</script>

<style scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1a73e8;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.product-image {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-info h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stars {
  display: flex;
}

.star {
  color: #d4d4d4;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.reviews-count {
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  margin: 0.5rem 0;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.original-price {
  font-size: 1.1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
}

.product-description {
  line-height: 1.6;
  color: #444;
  margin-bottom: 1rem;
}

.product-availability {
  font-weight: 600;
  padding: 0.5rem 0;
}

.in-stock {
  color: #2e7d32;
}

.out-of-stock {
  color: #c62828;
}

.product-actions {
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-btn {
  background: #f5f7fa;
  border: none;
  height: 42px;
  width: 42px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quantity-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.quantity-btn:hover:not(:disabled) {
  background: #e9ecef;
}

.quantity-selector input {
  width: 50px;
  height: 42px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 1rem;
}

.quantity-selector input::-webkit-inner-spin-button,
.quantity-selector input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  min-width: 150px;
}

.btn-highlight {
  background-color: #ff6b01;
}

.btn-highlight:hover {
  background-color: #e06000;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.product-details {
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.product-details h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.product-details ul {
  padding-left: 1.2rem;
}

.product-details li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.related-products {
  margin-top: 3rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.related-products h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>