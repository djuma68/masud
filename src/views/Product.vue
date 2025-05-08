<template>
  <div class="product-page">
    <h1>Featured Products</h1>
    
    <div class="product-filters">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search products..."
          @input="filterProducts"
        >
      </div>
      <div class="sort-options">
        <select v-model="sortBy" @change="filterProducts">
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
    
    <div class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image">
        </div>
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price.toFixed(2) }}</p>
        <p class="product-description">{{ product.description.substring(0, 80) }}...</p>
        <div class="product-actions">
          <button class="btn" @click="addToCart(product)">Add to Cart</button>
          <button class="btn btn-outline" @click="showProductDetails(product)">View Details</button>
        </div>
      </div>
    </div>
    
    <!-- Product Details Modal -->
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <div class="modal-product">
          <div class="modal-product-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name">
          </div>
          <div class="modal-product-details">
            <h2>{{ selectedProduct.name }}</h2>
            <p class="product-price">${{ selectedProduct.price.toFixed(2) }}</p>
            <div class="product-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= selectedProduct.rating }">★</span>
              <span class="rating-count">({{ selectedProduct.reviewCount }} reviews)</span>
            </div>
            <p class="product-description">{{ selectedProduct.description }}</p>
            <div class="product-specs">
              <h4>Specifications</h4>
              <ul>
                <li v-for="(spec, index) in selectedProduct.specs" :key="index">
                  <strong>{{ spec.name }}:</strong> {{ spec.value }}
                </li>
              </ul>
            </div>
            <div class="product-actions">
              <div class="quantity-selector">
                <button @click="decrementQuantity">-</button>
                <input type="number" v-model.number="productQuantity" min="1">
                <button @click="incrementQuantity">+</button>
              </div>
              <button class="btn" @click="addToCartWithQuantity(selectedProduct)">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsData from '@/data/products';

export default {
  data() {
    return {
      products: productsData,
      filteredProducts: [],
      searchQuery: '',
      sortBy: 'name',
      selectedProduct: null,
      productQuantity: 1
    };
  },
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.filterProducts();
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
    filterProducts() {
      // Filter by search query
      let result = this.products;
      
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      // Sort products
      switch(this.sortBy) {
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
      }
      
      this.filteredProducts = result;
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.productQuantity = 1;
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.selectedProduct = null;
      document.body.classList.remove('modal-open');
    },
    incrementQuantity() {
      this.productQuantity++;
    },
    decrementQuantity() {
      if (this.productQuantity > 1) {
        this.productQuantity--;
      }
    },
    addToCartWithQuantity(product) {
      for (let i = 0; i < this.productQuantity; i++) {
        this.addToCart(product);
      }
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.product-page {
  width: 100%;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
}

.product-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box input {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 250px;
  font-size: 0.9rem;
}

.sort-options select {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  font-size: 0.9rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-price {
  color: #1a73e8;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.product-actions {
  display: flex;
  gap: 0.75rem;
}

.product-actions button {
  flex: 1;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
}

.modal-product {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

@media (min-width: 768px) {
  .modal-product {
    flex-direction: row;
    gap: 2rem;
  }
}

.modal-product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-product-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.modal-product-details {
  flex: 1.5;
}

.product-rating {
  margin-bottom: 1rem;
}

.star {
  color: #ddd;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffb400;
}

.rating-count {
  color: #666;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.product-specs {
  margin: 1.5rem 0;
}

.product-specs h4 {
  margin-bottom: 0.5rem;
}

.product-specs ul {
  list-style: none;
}

.product-specs li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.quantity-selector button {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
}

.quantity-selector input {
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  font-size: 0.9rem;
}

/* Style to prevent body scrolling when modal is open */
:global(body.modal-open) {
  overflow: hidden;
}
</style>